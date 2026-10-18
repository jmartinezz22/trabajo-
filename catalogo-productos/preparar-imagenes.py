"""
Prepara las fotos de producto del catálogo.

  1. Recorta cada producto de la foto original (coordenadas en recortes.py).
  2. Elimina el fondo (rembg, modelo birefnet-general) -> producto aislado, como foto de estudio.
  3. Ajusta luz y contraste, recorta al contorno del producto y limita el tamaño.

  python3 catalogo-productos/preparar-imagenes.py [--sin-fondo-dir DIR] [ids...]

Si ya existen los recortes sin fondo en --sin-fondo-dir, se reutilizan (el paso 2 es lento en CPU).
Productos en FONDO_ORIGINAL se dejan con su fondo (el recorte automático no los aísla bien).
"""
import argparse, os, sys
from PIL import Image, ImageEnhance, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from recortes import CROPS  # noqa: E402

ORIG = os.path.join(HERE, 'fotos-originales')
OUT = os.path.join(HERE, 'img')
MAX = 1400
FONDO_ORIGINAL: set[str] = {'caja-frio-azul', 'caja-isotermica', 'etiquetas-termicas', 'sobres-docs'}


def crop(name):
    n, box = CROPS[name]
    im = ImageOps.exif_transpose(Image.open(f'{ORIG}/foto-{n:02d}.jpg')).convert('RGB')
    k = im.width / 1500
    return im.crop(tuple(int(v * k) for v in box))


def enhance(rgb):
    # Contraste sobre la luminancia: no altera el tono de cada color
    rgb = ImageOps.autocontrast(rgb, cutoff=0.5, preserve_tone=True)
    rgb = ImageEnhance.Brightness(rgb).enhance(1.04)
    rgb = ImageEnhance.Color(rgb).enhance(1.05)
    return ImageEnhance.Sharpness(rgb).enhance(1.15)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sin-fondo-dir', default=os.path.join(HERE, '.sin-fondo'))
    ap.add_argument('ids', nargs='*')
    a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(a.sin_fondo_dir, exist_ok=True)
    session = None
    for name in a.ids or CROPS:
        src = os.path.join(a.sin_fondo_dir, f'{name}.png')
        if name in FONDO_ORIGINAL:
            im = crop(name).convert('RGBA')
        else:
            if not os.path.exists(src):
                from rembg import new_session, remove
                session = session or new_session('birefnet-general')
                remove(crop(name), session=session, post_process_mask=True).save(src)
            im = Image.open(src).convert('RGBA')
        # Contorno más sólido: evita productos 'lavados' por bordes semitransparentes
        alpha = im.getchannel('A').point(lambda v: 0 if v < 40 else min(255, int((v - 40) * 2.2)))
        im.putalpha(alpha)
        bbox = alpha.point(lambda v: 255 if v > 24 else 0).getbbox() or (0, 0, im.width, im.height)
        im = im.crop(bbox)
        rgb = enhance(im.convert('RGB'))
        rgb.putalpha(im.getchannel('A'))
        rgb.thumbnail((MAX, MAX), Image.LANCZOS)
        rgb.save(os.path.join(OUT, f'{name}.png'), optimize=True)
        print('✓', name, rgb.size)


if __name__ == '__main__' and '--plano' not in sys.argv and '--escena' not in sys.argv:
    main()
    flatten_all()


# — Versión plana (JPEG sin transparencia) para el PDF —
# Algunos visores de PDF (sobre todo en móvil) no muestran bien imágenes con transparencia.
# Se integra cada producto sobre el color de fondo del catálogo con una sombra suave.
TINT = (236, 238, 234)


def flatten_all():
    from PIL import ImageFilter
    for f in sorted(os.listdir(OUT)):
        if not f.endswith('.png'):
            continue
        im = Image.open(os.path.join(OUT, f)).convert('RGBA')
        pad = int(max(im.size) * 0.06)
        W, H = im.width + pad * 2, im.height + pad * 2
        canvas = Image.new('RGBA', (W, H), TINT + (255,))
        a = im.getchannel('A')
        shadow = Image.new('RGBA', (W, H), (20, 30, 40, 0))
        sh_a = Image.new('L', (W, H), 0)
        sh_a.paste(a.point(lambda v: int(v * 0.28)), (pad, pad + int(pad * 0.45)))
        sh_a = sh_a.filter(ImageFilter.GaussianBlur(pad * 0.35))
        shadow.putalpha(sh_a)
        canvas.alpha_composite(shadow)
        canvas.alpha_composite(im, (pad, pad))
        canvas.convert('RGB').save(os.path.join(OUT, f[:-4] + '.jpg'), quality=88, optimize=True, progressive=True)
    print('✓ versiones planas (.jpg) generadas')


if __name__ == '__main__' and '--plano' in sys.argv:
    flatten_all()


# — Fotos de escena (con su fondo real) para el catálogo de imprenta —
def scene_all(margin=0.10):
    for name, (n, box) in CROPS.items():
        im = ImageOps.exif_transpose(Image.open(f'{ORIG}/foto-{n:02d}.jpg')).convert('RGB')
        k = im.width / 1500
        x0, y0, x1, y1 = (v * k for v in box)
        mx, my = (x1 - x0) * margin, (y1 - y0) * margin
        b = (max(0, int(x0 - mx)), max(0, int(y0 - my)), min(im.width, int(x1 + mx)), min(im.height, int(y1 + my)))
        out = enhance(im.crop(b))
        out.thumbnail((1800, 1800), Image.LANCZOS)
        out.save(os.path.join(OUT, f'{name}-foto.jpg'), quality=86, optimize=True, progressive=True)
    for n in range(1, 11):
        im = enhance(ImageOps.exif_transpose(Image.open(f'{ORIG}/foto-{n:02d}.jpg')).convert('RGB'))
        im.thumbnail((1800, 1800), Image.LANCZOS)
        im.save(os.path.join(OUT, f'escena-{n:02d}.jpg'), quality=86, optimize=True, progressive=True)
    print('✓ fotos de escena generadas')


if __name__ == '__main__' and '--escena' in sys.argv:
    scene_all()
