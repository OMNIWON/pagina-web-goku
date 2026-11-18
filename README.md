# 🐉 pagina-web-goku

Página web fan de **Goku**, el guerrero saiyan más famoso del universo. Hecha con HTML, CSS y JavaScript puro: sin frameworks, sin dependencias y sin build.

## Vista rápida

- Hero animado con aura de ki y botón **¡Kamehameha!**
- Línea de tiempo con la historia del personaje
- Selector interactivo de **8 transformaciones** (de Goku base a Ultra Instinto) con nivel de poder animado
- Galería de técnicas legendarias
- Contadores animados y aparición de secciones al hacer scroll
- Diseño responsive (móvil, tablet y escritorio)

## Cómo abrirla en VS Code

1. Abre la carpeta en VS Code:

   ```bash
   code C:\Users\Lenovo\pagina-web-goku
   ```

2. Opción rápida: abre `index.html` y usa **Open with Live Server** (extensión *Live Server* de Ritwick Dey).
   - Si no la tienes, VS Code te la recomendará automáticamente (`.vscode/extensions.json`).
3. Opción sin extensiones: haz doble clic en `index.html` y se abrirá en tu navegador.

También puedes levantar un servidor local con Python:

```bash
python -m http.server 5500
```

Y visitar <http://localhost:5500>.

## Estructura

```
pagina-web-goku/
├── index.html      # Estructura y contenido de la página
├── style.css       # Estilos, animaciones y diseño responsive
├── script.js       # Transformaciones, menú, contadores y efectos
├── README.md       # Este archivo
└── .vscode/
    └── extensions.json
```

## Personalización

- **Transformaciones:** edita el objeto `transformaciones` al inicio de `script.js`. Cada forma tiene nombre, descripción, poder, color de pelo, color de aura y aparición.
- **Colores del tema:** cambia las variables en `:root` dentro de `style.css` (`--naranja`, `--azul`, `--fondo`…).
- **Contenido:** todo el texto vive en `index.html`, en secciones comentadas.

## Créditos

Página fan sin ánimo de lucro. *Dragon Ball* y sus personajes son propiedad de Akira Toriyama, Toei Animation y sus licenciantes.
