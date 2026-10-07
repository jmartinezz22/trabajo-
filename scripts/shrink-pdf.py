"""
Reduce el peso de un PDF recomprimiendo sus fotografías (JPEG) a la resolución útil para A4,
sin tocar textos, degradados ni transparencias.

  python3 scripts/shrink-pdf.py entrada.pdf salida.pdf [ancho_max=1600] [calidad=80]
"""
import sys, io
import pikepdf
from pikepdf import PdfImage, Name
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
maxw = int(sys.argv[3]) if len(sys.argv) > 3 else 1600
q = int(sys.argv[4]) if len(sys.argv) > 4 else 80
pdf = pikepdf.open(src)
done = 0
for page in pdf.pages:
    for raw in page.get_images().values():
        try:
            img = PdfImage(raw).as_pil_image()
        except Exception:
            continue
        if img.width <= maxw and raw.get('/Filter') == Name.DCTDecode:
            continue
        if img.mode not in ('RGB', 'L'):
            img = img.convert('RGB')
        if img.width > maxw:
            img = img.resize((maxw, round(img.height * maxw / img.width)), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, 'JPEG', quality=q, optimize=True, progressive=True)
        raw.write(buf.getvalue(), filter=Name.DCTDecode)
        raw.Width, raw.Height = img.width, img.height
        raw.ColorSpace = Name.DeviceRGB if img.mode == 'RGB' else Name.DeviceGray
        raw.BitsPerComponent = 8
        for k in ('/DecodeParms', '/SMask', '/Decode'):
            if k in raw and k != '/SMask':
                del raw[k]
        done += 1
pdf.save(dst, compress_streams=True, object_stream_mode=pikepdf.ObjectStreamMode.generate)
print(dst, done)
