"""
Fotos de producto en versión estudio: producto aislado sobre blanco, con sombra de apoyo.

  python3 catalogo-productos/estudio.py

Parte de los recortes sin fondo (.sin-fondo/, generados por preparar-imagenes.py) y aplica:
  - limpieza: elimina restos sueltos alrededor del producto;
  - retoques manuales (RETOQUES) para productos tapados por otros en la foto;
  - composición sobre blanco con sombra de contacto -> img/<id>-estudio.jpg (sin transparencia).
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from recortes import CROPS  # noqa: E402

ORIG = os.path.join(HERE, 'fotos-originales')
SRC = os.path.join(HERE, '.sin-fondo')
OUT = os.path.join(HERE, 'img')
BG = (255, 255, 255)


def photo(n):
    return ImageOps.exif_transpose(Image.open(f'{ORIG}/foto-{n:02d}.jpg')).convert('RGB')


def view_box(n, box):
    """Recorte con coordenadas de la vista 1500x2000."""
    im = photo(n)
    k = im.width / 1500
    return im.crop(tuple(int(v * k) for v in box))


def enhance(rgb):
    rgb = ImageOps.autocontrast(rgb, cutoff=0.5, preserve_tone=True)
    rgb = ImageEnhance.Brightness(rgb).enhance(1.04)
    return ImageEnhance.Sharpness(rgb).enhance(1.15)


def clean(im):
    """Conserva solo las piezas principales del producto (quita restos sueltos)."""
    a = np.array(im.getchannel('A'))
    a = np.where(a < 40, 0, np.minimum(255, (a.astype(int) - 40) * 2.2)).astype(np.uint8)
    lab, n = ndimage.label(a > 60)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(a), lab, range(1, n + 1))
        keep = [i + 1 for i, s in enumerate(sizes) if s >= sizes.max() * 0.04]
        a = np.where(np.isin(lab, keep), a, 0).astype(np.uint8)
    im.putalpha(Image.fromarray(a).filter(ImageFilter.GaussianBlur(0.6)))
    bbox = Image.fromarray(a).getbbox()
    return im.crop(bbox) if bbox else im


# — Retoques manuales (coordenadas sobre recortes de la vista 1500x2000) —
def caja_frio():
    # Cara impresa de la caja (la caja está tapada arriba y abajo en la foto)
    return view_box(4, (280 + 180 * 1500 / 1932, 105 * 1500 / 1932, 280 + 1030 * 1500 / 1932, 575 * 1500 / 1932)).convert('RGBA')


def caja_iso():
    return view_box(7, (240 + 40 * 1500 / 1932, 540 + 100 * 1500 / 1932, 240 + 1190 * 1500 / 1932, 540 + 420 * 1500 / 1932)).convert('RGBA')


def rollo_etiquetas():
    """Rollo de etiquetas: la mitad izquierda está completa; la derecha se reconstruye por simetría."""
    k = 1500 / 1932
    im = view_box(10, (240, 620, 240 + 875 * k, 620 + 721 * k))  # == chk-term (875x721 px)
    im = im.resize((875, 721))
    cx, x0, top, base = 430, 85, 125, 575
    rx, ry = cx - x0, 65
    W, H = im.size
    yy, xx = np.mgrid[0:H, 0:W]
    in_top = ((xx - cx) / rx) ** 2 + ((yy - top) / ry) ** 2 <= 1
    in_body = (xx >= x0) & (xx <= 2 * cx - x0) & (yy >= top) & (yy <= base)
    in_bot = ((xx - cx) / rx) ** 2 + ((yy - base) / ry) ** 2 <= 1
    mask = (in_top | in_body | (in_bot & (yy >= base))).astype(np.uint8) * 255
    arr = np.array(im)
    left = arr[:, x0:cx]
    mirrored = left[:, ::-1]
    body = arr.copy()
    y_from = top + ry  # por debajo de la cara superior
    body[y_from:, cx:cx + mirrored.shape[1]] = mirrored[y_from:, : max(0, min(mirrored.shape[1], W - cx))]
    out = Image.fromarray(body).convert('RGBA')
    out.putalpha(Image.fromarray(mask).filter(ImageFilter.GaussianBlur(1)))
    return out.crop(Image.fromarray(mask).getbbox())


RETOQUES = {'caja-frio-azul': caja_frio, 'caja-isotermica': caja_iso, 'etiquetas-termicas': rollo_etiquetas}
OMITIR = {'sobres-docs', 'caja-perf-mano', 'caja-hu-tapa', 'clip'}


def studio(im, flat=False):
    """Compone sobre blanco con sombra de contacto (o sombra suave para piezas planas)."""
    im.thumbnail((1150, 1150), Image.LANCZOS)  # lienzo final <= 1400 px: no se recomprime en el PDF
    w, h = im.size
    pad = int(max(w, h) * 0.08)
    W, H = w + pad * 2, h + pad * 2 + int(h * 0.06)
    canvas = Image.new('RGBA', (W, H), BG + (255,))
    sh = Image.new('L', (W, H), 0)
    if flat:
        sh.paste(im.getchannel('A').point(lambda v: int(v * 0.22)), (pad + int(pad * 0.25), pad + int(pad * 0.35)))
        sh = sh.filter(ImageFilter.GaussianBlur(pad * 0.3))
    else:
        # Sombra de apoyo: elipse bajo la base del producto + sombra difusa
        from PIL import ImageDraw
        d = ImageDraw.Draw(sh)
        base_y = pad + h
        d.ellipse([pad + w * 0.06, base_y - h * 0.035, pad + w * 0.94, base_y + h * 0.045], fill=70)
        sh = sh.filter(ImageFilter.GaussianBlur(max(6, h * 0.022)))
        soft = Image.new('L', (W, H), 0)
        soft.paste(im.getchannel('A').point(lambda v: int(v * 0.10)), (pad + int(pad * 0.15), pad + int(pad * 0.25)))
        sh = Image.fromarray(np.maximum(np.array(sh), np.array(soft.filter(ImageFilter.GaussianBlur(pad * 0.35)))))
    shadow = Image.new('RGBA', (W, H), (25, 32, 45, 0))
    shadow.putalpha(sh)
    canvas.alpha_composite(shadow)
    canvas.alpha_composite(im, (pad, pad))
    # Blanco puro en el fondo (evita un recuadro gris tenue al imprimir o ver el PDF)
    arr = np.array(canvas.convert('RGB')).astype(int)
    near = arr.min(axis=2) >= 246
    arr[near] = 255
    return Image.fromarray(arr.astype(np.uint8))


def main():
    os.makedirs(OUT, exist_ok=True)
    for name in CROPS:
        if name in OMITIR:
            continue
        if name in RETOQUES:
            im = RETOQUES[name]()
            flat = name != 'etiquetas-termicas'
        else:
            src = os.path.join(SRC, f'{name}.png')
            if not os.path.exists(src):
                print('! falta', src)
                continue
            im = clean(Image.open(src).convert('RGBA'))
            flat = False
        rgb = enhance(im.convert('RGB'))
        rgb.putalpha(im.getchannel('A'))
        studio(rgb, flat).save(os.path.join(OUT, f'{name}-estudio.jpg'), quality=88, optimize=True, progressive=True)
        print('✓', name)


if __name__ == '__main__':
    main()
