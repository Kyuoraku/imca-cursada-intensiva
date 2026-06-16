/* ============================================================
   LANDING SEMI-INTENSIVA — IMCA
   JS para Simple Custom CSS and JS (WordPress + OceanWP + Elementor Free)
   Pegar en: Simple Custom CSS and JS → campo JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var root = document.querySelector('.landing-semi-intensiva');
  if (!root) return;

  /* ----------------------------------------------------------
     1. CARGA DINÁMICA DE LUCIDE ICONS
        Elementor Free borra las etiquetas <script> del widget HTML,
        por lo que Lucide se carga creando el elemento <script>
        desde este bloque JS (que va en Simple Custom CSS and JS).
        createIcons() se llama dentro del onload del script de Lucide
        para garantizar que la librería ya esté disponible.
  ---------------------------------------------------------- */
  var lucideScript = document.createElement('script');
  lucideScript.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  lucideScript.onload = function () {
    if (window.lucide && typeof lucide.createIcons === 'function') {
      // Scopear al contenedor para no afectar el resto de la página
      lucide.createIcons({ scope: root });
    }
  };
  document.head.appendChild(lucideScript);

  /* ----------------------------------------------------------
     2. ACORDEÓN DE MÓDULOS
        - Un solo módulo abierto a la vez (comportamiento exclusivo).
        - El primer clic abre; un segundo clic en el mismo módulo lo cierra.
        - aria-expanded se actualiza para accesibilidad.
  ---------------------------------------------------------- */
  var modulos = root.querySelectorAll('.lsi-modulo');

  modulos.forEach(function (modulo) {
    var btn = modulo.querySelector('.lsi-modulo-titulo');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var yaEstabaAbierto = modulo.classList.contains('lsi-abierto');

      // Cerrar todos
      modulos.forEach(function (m) {
        m.classList.remove('lsi-abierto');
        var b = m.querySelector('.lsi-modulo-titulo');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Abrir el clickeado solo si no estaba abierto
      if (!yaEstabaAbierto) {
        modulo.classList.add('lsi-abierto');
        btn.setAttribute('aria-expanded', 'true');

        // Scroll suave para que el título quede visible en mobile
        setTimeout(function () {
          var offset = btn.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 50);
      }
    });
  });

});
