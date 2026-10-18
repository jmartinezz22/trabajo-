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


if __name__ == '__main__':
    main()
