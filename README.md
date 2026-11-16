# TERRA+ · prototipo listo para publicar

Aplicación web de demostración para el proyecto AgTech TERRA+. Mantiene las dos vistas (Práctica y Técnica), el simulador de escenarios, las recomendaciones, los dos mapas, la gestión básica de lotes, las tareas y el chat de muestra.

## Antes de empezar

Este proyecto es un prototipo visual e interactivo. Las métricas, mapas, capas y respuestas son valores ilustrativos: **no hay conexión real con NASA, una API meteorológica ni un servicio de inteligencia artificial**. El mapa es esquemático. Compruebe las decisiones con observaciones de campo y fuentes oficiales.

## Publicarlo con Vercel (camino recomendado)

La opción más sencilla para tener una URL pública es poner esta carpeta en un repositorio de GitHub y conectar ese repositorio a Vercel. Vercel compila la aplicación y entrega una dirección web.

1. Descomprima `TERRA-Plus-Prototipo.zip` en su computadora.
2. Cree un repositorio nuevo en GitHub y suba el contenido de la carpeta descomprimida. Si nunca usó GitHub, puede crear el repositorio desde la página web y elegir la opción para subir archivos.
3. Entre a [Vercel](https://vercel.com), cree una cuenta o inicie sesión y elija **Add New → Project**.
4. Importe el repositorio de GitHub que acaba de crear. Si pide configuración, use **Framework: Vite**, **Build Command: `npm run build`**, **Output Directory: `dist`**.
5. Pulse **Deploy**. Cuando termine, Vercel mostrará la URL pública para compartir y presentar.

Si todavía no tiene cuenta de GitHub, también puede hacer la publicación desde Netlify conectando un repositorio, o pedir ayuda para crear el repositorio. No hace falta cambiar el código para publicarlo.

## Abrirlo en su computadora (opcional)

Se necesita Node.js instalado. Abra una terminal en esta carpeta y ejecute:

```bash
npm install
npm run dev
```

Para generar la versión de publicación:

```bash
npm run build
```

La carpeta que se publica manualmente en Netlify es `dist`. Vercel puede crearla automáticamente al importar el repositorio.

## Qué se mejoró

- Los cuatro indicadores se calculan desde los lotes. Salud y humedad son promedios ponderados por hectáreas.
- El alta de lotes valida nombre y superficie positiva, genera identificadores únicos y actualiza los indicadores.
- Cada opción del menú abre su módulo. Las tareas se pueden marcar completas.
- Los controles de vista e idioma, horizonte, eventos y capas son accesibles con teclado y exponen su estado.
- El simulador se identifica como escenario y no como pronóstico. Las capas y respuestas declaran que son demostrativas.
- Se completaron textos para español e inglés y se adaptó el diseño a pantallas pequeñas.
- El alta de archivos es deliberadamente solo una selección local; no sube ni analiza documentos.

## Estructura

- `src/App.jsx`: interfaz, estados e interacciones.
- `src/styles.css`: estilos adaptables.
- `index.html`, `vite.config.js`, `netlify.toml`, `vercel.json`: configuración de la aplicación y publicación.

Los lotes y tareas agregados se guardan solo en el navegador de quien los crea; no se comparten con otras personas ni se sincronizan entre dispositivos. El prototipo no recibe datos en vivo. Esas integraciones pueden agregarse como una siguiente etapa sin cambiar el concepto de producto.
