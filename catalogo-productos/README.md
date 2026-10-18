# Catálogo de producto · Palex (edición de muestra)

Catálogo PDF (A4 horizontal) de equipos y consumibles de packaging y logística,
elaborado a partir de las fotografías de `fotos-originales/`.

| Paso | Comando |
|---|---|
| 1. Preparar fotos (recorte, fondo, luz) | `python3 catalogo-productos/preparar-imagenes.py` |
| 2. Generar el PDF | `node catalogo-productos/build.mjs` |

- **Contenido**: `productos.mjs`. Solo se afirma lo que se ve en el producto o en su impresión;
  lo demás figura como `[PENDIENTE DE CONFIRMAR]`.
- **Recortes**: `recortes.py` (coordenadas sobre cada foto, vista 1500×2000).
- **Salida**: `build/Catalogo_Productos_PALEX_muestra.pdf`.
- Requisitos: Python con `pillow` y `rembg[cpu]`; Node con `playwright` (Chromium).
