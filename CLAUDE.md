# CLAUDE.md — Landing Cursada Semi-Intensiva IMCA

## Qué es este proyecto

Landing page para la cursada semi-intensiva "Educación Vincular Positiva" del Instituto MCA (educación canina profesional con orientación antrozoológica). Es una página estática que se embebe dentro de WordPress (OceanWP + Elementor Free) usando el plugin **Simple Custom CSS and JS**.

## Archivos

| Archivo | Propósito |
|---|---|
| `index.html` | HTML completo de la landing. Se pega en un widget HTML de Elementor. |
| `landing-evento.css` | Todos los estilos. Se pega en Simple Custom CSS and JS → campo CSS. |
| `index.js` | JS del acordeón y carga de Lucide icons. Se pega en Simple Custom CSS and JS → campo JS. |

## Reglas de código

- **Todos los estilos van en `landing-evento.css`**. El `index.html` solo tiene un `<style>` de una línea con el reset global de `html, body` (necesario para previsualizar el archivo en local; en WordPress no se usa).
- Todos los selectores CSS están anclados a `.landing-semi-intensiva` para no pisar estilos de OceanWP/Elementor.
- Las variables CSS están en `.landing-semi-intensiva { --lsi-... }`, nunca en `:root`.
- El box-sizing está en `.landing-semi-intensiva, .landing-semi-intensiva *, ...` (no global).

## Contexto WordPress

- **Elementor Free** elimina los `<script>` del widget HTML → Lucide icons se carga dinámicamente desde `index.js`.
- El CSS tiene un bloque al final (sección 21) que resetea `padding: 0 / margin: 0` en los contenedores de Elementor para evitar el margen blanco alrededor de la landing.
- `font-size: 16px !important` en `html body .landing-semi-intensiva` neutraliza el override de OceanWP que setea `html { font-size: 10px }`.

## Contenido clave actual

- **Inicio de cursada:** Lunes 3 de agosto 2026
- **Descuento anticipado:** 20% EXTRA (antes del 30 de junio)
- **WhatsApp CTA:** `+54 9 11 6880-5874` → `wa.me/5491168805874`
- **Hero foto:** `http://institutomca.com/wp-content/uploads/2026/06/IMG_9256-scaled.jpg` (centrada con `background-position: center center`)
- **Logo:** `https://storage.mlcdn.com/account_image/1527428/qKOTVmposr8oxnZnDvwPIBpv7XOT3FpD44iq3BpK.png`
- **Fotos de docentes:** todas en `http://institutomca.com/wp-content/uploads/2026/06/`

## Mejoras pendientes (aprobadas, sin ejecutar)

Ver plan completo en `.claude/plans/los-comentarios-de-nacho-fluffy-dijkstra.md`.

Resumen:
- **A1** "¿De qué se trata?" → reemplazar párrafo por 3 pilares visuales con ícono
- **A2** Prácticas profesionales → acortar descripciones + badge de formato (EN VIVO / GRABADO)
- **A3** Role Playing → darle sección propia como diferenciador comercial
- **B1** Split layout con foto en "¿De qué se trata?" *(necesita foto de Nacho)*
- **B2** Imagen de fondo en sección "Preparación Profesional" *(necesita foto de Nacho)*
- **B3** Fotos de disertantes de Master Classes — faltan: Dra. Paula Calvo, Keyla Bernal, Patricia Rech
- **B4** Imagen de fondo en CTA final *(necesita foto de Nacho)*
