/* ============================================================
   Goku · Página fan — interacciones
   ============================================================ */

const formatoNumero = new Intl.NumberFormat("es-ES");

/* ---------- Datos de las transformaciones ---------- */

const transformaciones = {
  base: {
    nombre: "Goku base",
    descripcion: "Su estado natural: tranquilo, hambriento y siempre listo para entrenar.",
    poder: 10000,
    pelo: "#16181f",
    peloNombre: "Negro",
    aura: "#ffb347",
    auraNombre: "Blanca",
    aparicion: "Dragon Ball, cap. 1",
  },
  kaioken: {
    nombre: "Kaio-ken",
    descripcion: "Una técnica que multiplica el ki y la velocidad durante un instante. El cuerpo de Goku se tiñe de rojo.",
    poder: 40000,
    pelo: "#16181f",
    peloNombre: "Negro",
    aura: "#ff3b30",
    auraNombre: "Roja",
    aparicion: "Dragon Ball Z, saga de Vegeta",
  },
  ssj: {
    nombre: "Super Saiyan",
    descripcion: "La leyenda se hace realidad: cabello dorado y ojos verdes despiertan con la rabia y el dolor.",
    poder: 150000000,
    pelo: "#ffd93d",
    peloNombre: "Dorado",
    aura: "#ffd93d",
    auraNombre: "Dorada",
    aparicion: "Dragon Ball Z, saga de Freezer",
  },
  ssj2: {
    nombre: "Super Saiyan 2",
    descripcion: "La energía se vuelve más afilada, con chispas eléctricas recorriendo el aura dorada.",
    poder: 300000000,
    pelo: "#ffcc00",
    peloNombre: "Dorado",
    aura: "#ffb703",
    auraNombre: "Dorada con chispas",
    aparicion: "Dragon Ball Z, saga de Cell",
  },
  ssj3: {
    nombre: "Super Saiyan 3",
    descripcion: "Cabello larguísimo, cejas ausentes y un poder devastador que consume enormes cantidades de energía.",
    poder: 1200000000,
    pelo: "#ffb703",
    peloNombre: "Dorado",
    aura: "#ff8c00",
    auraNombre: "Naranja intensa",
    aparicion: "Dragon Ball Z, saga de Majin Buu",
  },
  god: {
    nombre: "Super Saiyan God",
    descripcion: "El ki divino fluye en un cuerpo esbelto y sereno. Un estado que solo los dioses conocían.",
    poder: 4000000000,
    pelo: "#ff4d6d",
    peloNombre: "Rojizo",
    aura: "#ff4d6d",
    auraNombre: "Rosa divina",
    aparicion: "Dragon Ball Z: La batalla de los dioses",
  },
  blue: {
    nombre: "Super Saiyan Blue",
    descripcion: "El Super Saiyan God con el ki controlado al máximo: un azul intenso, estable y letal.",
    poder: 9000000000,
    pelo: "#3ec1ff",
    peloNombre: "Azul",
    aura: "#38bdf8",
    auraNombre: "Azul cian",
    aparicion: "Dragon Ball Super, saga de Freezer",
  },
  ultra: {
    nombre: "Ultra Instinto",
    descripcion: "El cuerpo actúa por reflejo, esquivando y golpeando sin pensar. El estado de los ángeles.",
    poder: 50000000000,
    pelo: "#dfe7ff",
    peloNombre: "Plateado",
    aura: "#c7d2fe",
    auraNombre: "Plateada",
    aparicion: "Dragon Ball Super, Torneo del Poder",
  },
};

/* ---------- Referencias del DOM ---------- */

const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const enlacesNav = Array.from(navMenu.querySelectorAll("a"));
const tabs = Array.from(document.querySelectorAll(".tab"));
const panelForma = document.getElementById("forma-panel");
const formaNombre = document.getElementById("forma-nombre");
const formaDesc = document.getElementById("forma-desc");
const formaPoder = document.getElementById("forma-poder");
const datoCabello = document.getElementById("dato-cabello");
const datoAura = document.getElementById("dato-aura");
const datoAparicion = document.getElementById("dato-aparicion");
const btnKamehameha = document.getElementById("btn-kamehameha");
const energia = document.getElementById("energia");

/* ---------- Menú de navegación ---------- */

function cerrarMenu() {
  navMenu.classList.remove("abierto");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú");
}

navToggle.addEventListener("click", () => {
  const abierto = navMenu.classList.toggle("abierto");
  navToggle.setAttribute("aria-expanded", String(abierto));
  navToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});

enlacesNav.forEach((enlace) => enlace.addEventListener("click", cerrarMenu));

document.addEventListener("click", (evento) => {
  if (!navMenu.classList.contains("abierto")) return;
  if (navMenu.contains(evento.target) || navToggle.contains(evento.target)) return;
  cerrarMenu();
});

/* ---------- Header con fondo al hacer scroll ---------- */

function actualizarHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

actualizarHeader();
window.addEventListener("scroll", actualizarHeader, { passive: true });

/* ---------- Sección activa en el menú ---------- */

const secciones = Array.from(document.querySelectorAll("main section[id]"));

const observadorSecciones = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const id = entrada.target.id;
      enlacesNav.forEach((enlace) => {
        enlace.classList.toggle("activo", enlace.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

secciones.forEach((seccion) => observadorSecciones.observe(seccion));

/* ---------- Animación de números ---------- */

function animarNumero(elemento, destino, duracion = 700) {
  const inicio = Number(elemento.dataset.valorActual || 0);
  const tiempoInicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - tiempoInicio) / duracion, 1);
    const suavizado = 1 - Math.pow(1 - progreso, 3);
    const valor = Math.round(inicio + (destino - inicio) * suavizado);
    elemento.textContent = formatoNumero.format(valor);

    if (progreso < 1) {
      requestAnimationFrame(paso);
    } else {
      elemento.dataset.valorActual = String(destino);
    }
  }

  requestAnimationFrame(paso);
}

/* ---------- Transformaciones ---------- */

function mostrarForma(clave) {
  const forma = transformaciones[clave];
  if (!forma) return;

  tabs.forEach((tab) => {
    const activo = tab.dataset.forma === clave;
    tab.classList.toggle("activo", activo);
    tab.setAttribute("aria-selected", String(activo));
    tab.tabIndex = activo ? 0 : -1;
  });

  panelForma.style.setProperty("--aura", forma.aura);
  panelForma.style.setProperty("--pelo", forma.pelo);

  formaNombre.textContent = forma.nombre;
  formaDesc.textContent = forma.descripcion;
  datoCabello.textContent = forma.peloNombre;
  datoAura.textContent = forma.auraNombre;
  datoAparicion.textContent = forma.aparicion;

  animarNumero(formaPoder, forma.poder);
}

tabs.forEach((tab) => {
  tab.tabIndex = tab.classList.contains("activo") ? 0 : -1;

  tab.addEventListener("click", () => mostrarForma(tab.dataset.forma));

  tab.addEventListener("keydown", (evento) => {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
    evento.preventDefault();

    const indice = tabs.indexOf(tab);
    const salto = evento.key === "ArrowRight" ? 1 : -1;
    const siguiente = tabs[(indice + salto + tabs.length) % tabs.length];

    siguiente.focus();
    mostrarForma(siguiente.dataset.forma);
  });
});

/* ---------- Kamehameha ---------- */

if (btnKamehameha && energia) {
  btnKamehameha.addEventListener("click", () => {
    energia.classList.remove("activa");
    void energia.offsetWidth;
    energia.classList.add("activa");
  });

  energia.addEventListener("animationend", () => {
    energia.classList.remove("activa");
  });
}

/* ---------- Contadores de estadísticas ---------- */

function activarContador(elemento) {
  if (elemento.dataset.animado === "true") return;
  elemento.dataset.animado = "true";

  const destino = Number(elemento.dataset.contador);
  const sufijo = elemento.dataset.sufijo || "";
  const duracion = 1100;
  const tiempoInicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - tiempoInicio) / duracion, 1);
    const suavizado = 1 - Math.pow(1 - progreso, 3);
    elemento.textContent = Math.round(destino * suavizado) + sufijo;

    if (progreso < 1) requestAnimationFrame(paso);
  }

  requestAnimationFrame(paso);
}

/* ---------- Aparición al hacer scroll ---------- */

const elementosReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observadorReveal = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        entrada.target.classList.add("visible");
        observadorReveal.unobserve(entrada.target);

        const contador = entrada.target.querySelector("[data-contador]");
        if (contador) activarContador(contador);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elementosReveal.forEach((elemento) => observadorReveal.observe(elemento));
} else {
  elementosReveal.forEach((elemento) => elemento.classList.add("visible"));
  document.querySelectorAll("[data-contador]").forEach(activarContador);
}

/* ---------- Arranque ---------- */

mostrarForma("base");
formaPoder.dataset.valorActual = String(transformaciones.base.poder);
