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
     2. LIGHTBOX CON ZOOM Y DRAG
        Aplica a imágenes con clase .lsi-lightbox-trigger.
        - Abre a pantalla completa ajustada al viewport (fit).
        - Scroll / botones +/- hacen zoom centrado en el cursor.
        - Drag arrastra la imagen cuando está ampliada.
        - Pinch hace zoom en mobile.
        - Click fuera, botón × o Escape cierran.
  ---------------------------------------------------------- */
  (function () {
    var overlay = document.createElement('div');
    overlay.className = 'lsi-lightbox-overlay';
    overlay.innerHTML =
      '<div class="lsi-lightbox-toolbar">' +
        '<button class="lsi-lightbox-btn" id="lsi-lb-zoom-out" aria-label="Alejar">−</button>' +
        '<span class="lsi-lightbox-zoom-label" id="lsi-lb-zoom-label">100%</span>' +
        '<button class="lsi-lightbox-btn" id="lsi-lb-zoom-in" aria-label="Acercar">+</button>' +
        '<button class="lsi-lightbox-btn lsi-lightbox-close" id="lsi-lb-close" aria-label="Cerrar">✕</button>' +
      '</div>' +
      '<div class="lsi-lightbox-stage">' +
        '<div class="lsi-lightbox-inner">' +
          '<img class="lsi-lightbox-img" id="lsi-lb-img" src="" alt="">' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var img      = overlay.querySelector('#lsi-lb-img');
    var label    = overlay.querySelector('#lsi-lb-zoom-label');
    var btnIn    = overlay.querySelector('#lsi-lb-zoom-in');
    var btnOut   = overlay.querySelector('#lsi-lb-zoom-out');
    var btnClose = overlay.querySelector('#lsi-lb-close');
    var stage    = overlay.querySelector('.lsi-lightbox-stage');
    var inner    = overlay.querySelector('.lsi-lightbox-inner');
    var scale    = 1, MIN = 0.25, MAX = 4, STEP = 0.25;

    function setScale(s, cx, cy) {
      var prev = scale;
      scale = Math.min(MAX, Math.max(MIN, s));
      var sl = stage.scrollLeft, st = stage.scrollTop;
      img.style.width  = Math.round(img.naturalWidth  * scale) + 'px';
      img.style.height = Math.round(img.naturalHeight * scale) + 'px';
      label.textContent = Math.round(scale * 100) + '%';
      if (cx !== undefined) {
        var r = stage.getBoundingClientRect();
        stage.scrollLeft = (sl + cx - r.left) * (scale / prev) - (cx - r.left);
        stage.scrollTop  = (st + cy - r.top)  * (scale / prev) - (cy - r.top);
      }
    }

    function open(src, alt) {
      img.src = src; img.alt = alt || '';
      img.style.width = 'auto'; img.style.height = 'auto';
      overlay.classList.add('lsi-lightbox-visible');
      document.body.style.overflow = 'hidden';
      function fit() {
        var sw = stage.clientWidth - 48, sh = stage.clientHeight - 48;
        scale = Math.min(sw / img.naturalWidth, sh / img.naturalHeight, 1);
        img.style.width  = Math.round(img.naturalWidth  * scale) + 'px';
        img.style.height = Math.round(img.naturalHeight * scale) + 'px';
        label.textContent = Math.round(scale * 100) + '%';
        stage.scrollLeft = (stage.scrollWidth  - stage.clientWidth)  / 2;
        stage.scrollTop  = (stage.scrollHeight - stage.clientHeight) / 2;
      }
      if (img.complete && img.naturalWidth) { fit(); } else { img.onload = fit; }
    }

    function close() {
      overlay.classList.remove('lsi-lightbox-visible');
      document.body.style.overflow = '';
      img.src = '';
    }

    btnIn.addEventListener('click', function () {
      var r = stage.getBoundingClientRect();
      setScale(scale + STEP, r.left + r.width / 2, r.top + r.height / 2);
    });
    btnOut.addEventListener('click', function () {
      var r = stage.getBoundingClientRect();
      setScale(scale - STEP, r.left + r.width / 2, r.top + r.height / 2);
    });
    btnClose.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lsi-lightbox-visible')) return;
      var r = stage.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') setScale(scale + STEP, cx, cy);
      if (e.key === '-') setScale(scale - STEP, cx, cy);
    });

    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      setScale(scale + (e.deltaY < 0 ? STEP : -STEP), e.clientX, e.clientY);
    }, { passive: false });

    // Drag para panear
    var dragging = false, moved = false, sx, sy, ox, oy;
    stage.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      dragging = true; moved = false;
      sx = e.clientX; sy = e.clientY;
      ox = stage.scrollLeft; oy = stage.scrollTop;
      stage.classList.add('lsi-lb-grabbing');
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
      stage.scrollLeft = ox - dx;
      stage.scrollTop  = oy - dy;
    });
    document.addEventListener('mouseup', function (e) {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('lsi-lb-grabbing');
      if (!moved && (e.target === overlay || e.target === stage || e.target === inner)) close();
    });

    // Pinch zoom (mobile)
    var lastDist = null;
    stage.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 2) return;
      e.preventDefault();
      var dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if (lastDist !== null) setScale(scale * (dist / lastDist), cx, cy);
      lastDist = dist;
    }, { passive: false });
    stage.addEventListener('touchend', function () { lastDist = null; });

    root.querySelectorAll('.lsi-lightbox-trigger').forEach(function (el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function () { open(el.src, el.alt); });
    });
  }());

  /* ----------------------------------------------------------
     3. ACORDEÓN DE MÓDULOS
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
