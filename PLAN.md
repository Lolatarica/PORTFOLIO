# Plan de mejoras del portfolio

## 1. Base visual
- Paleta y tipografía: **por ahora queda como está**.
- [x] Limpiar CSS: borrados `App.css` (plantilla de Vite, no se usaba), `ProjectPreview.css` y archivos vacíos; Coolvetica se importa una sola vez en `index.css`; sacada Druk Wide (no se usaba); reglas sin uso del timeline.
- [x] Imágenes a WebP: teléfono (5 × 1,3 MB → ~70 KB), carcasa, pantallas, mail, foto y fondo del inicio (1 MB → 135 KB).

## 2. Sección del teléfono
- [x] Ondas (MagicRings) en tonos rosa / naranja como el inicio. Hoy: `#f8c6ff` + `#84d8ff` (celeste). Propuesta: `#ff8fd0` + `#ffa25c`.
- [x] Puerta de scroll (solo compu, > 1100 px): la primera vez el scroll frena en el celular y la rueda/teclado recorren el menú; en "Proyectos" se libera. El menú hamburguesa a Proyectos/Contacto también la libera. Se recuerda por pestaña (sessionStorage).
- [ ] Pensar si en celular hace falta algo parecido (hoy el scroll es libre).
- [x] Pista para usar el teléfono ("presioná ●" + pulso en el botón del medio).

## 3. Menú
- [x] Sacar "Blog" por ahora.
- [x] Agregar "Sobre mí" (lleva a la sección del teléfono).
- [ ] Más adelante: menú con el tocadiscos 3D (ver punto 7).

## 4. Proyectos
- [ ] Cargar los proyectos reales (inventario en `PROYECTOS.md`).
- [ ] Título "Proyectos" en la tipografía pixelada.
- [ ] Nombre, categoría y año grandes; "ver proyecto" al pasar el mouse.
- [x] Scroll del carrusel: un gesto de scroll = un proyecto (nunca queda a mitad), tarjetas pegadas como antes, menos scroll muerto (7200 → 4680 px), ← → solo con el carrusel en pantalla, clic en tarjeta lateral la trae al centro.
- [ ] Hueco vacío a la izquierda al entrar (la primera tarjeta queda centrada).
- [ ] Página de cada proyecto (`/proyecto/:id`) con la misma estética.

## 5. Contacto: computadora interactiva
- [x] Prototipo: compu apagada (luz titilando) → se prende con efecto CRT → escritorio con íconos + ventana de mail.
- [x] Foto polaroid lleva a "Sobre mí".
- [x] Formulario con diálogo "Enviando…", globito de "Mensaje enviado" y ventana de error estilo XP.
- [x] Easter egg: el sticker de la serpiente abre un Snake jugable (flechas/WASD, deslizar en celular, Esc cierra).
- [ ] Completar links de Instagram y LinkedIn y el PDF del CV (en `CONTACT`, arriba de `Contact.jsx`).
- [ ] Íconos que faltan: WhatsApp y Mail.
- [ ] Conectar el envío real: crear cuenta en Web3Forms y pegar la clave en `FORM_ACCESS_KEY` (hoy se simula).
- [ ] Título de la ventana: dice "test" (viene de `mail.png`).
- [ ] Contexto/fondo del escritorio.
- [ ] Versión celular: la ventana de mail queda muy chica.
- [x] Pasar las imágenes a WebP.

## 6. Footer
- [x] Footer mínimo de una línea: "© año Lola Tarica · Diseñadora Multimedia" + "↑ volver arriba" (sin repetir redes, ya están en la compu).

## 7. Tocadiscos 3D (más adelante)
- [ ] Idea: el menú es un tocadiscos; cada sección es un disco/pista y al elegirla gira y "suena" esa sección.

## 8. Continuidad entre secciones (en pausa: Lola va a pasar imágenes de fondo)
- [ ] Que el resplandor violeta/rosa del inicio siga bajando como fondo.
- [ ] Repetir estrellas, espiral y puntitos en cada sección.

---

## Proyectos: qué hay y qué falta

Hoy los 8 proyectos de `src/data/projects.js` son de relleno: usan solo 4 imágenes repetidas, todos los textos son "Lorem ipsum" y los años y herramientas están puestos de ejemplo.

| # | En la página hoy | Imagen que usa | ¿Es real? |
|---|---|---|---|
| 1 | Prismo | Póster "Prismo Time" | Imagen real, textos de relleno |
| 2 | Proyecto Griego | Fuente/templo 3D | Imagen real, textos de relleno |
| 3 | App Móvil | Pantallas de app ("Agregar materia") | Imagen real, textos de relleno |
| 4 | Visual III | Póster "The Sovereign returns" | Imagen real, textos de relleno |
| 5 | Proyecto Griego 2 | (repite la 2) | Relleno |
| 6 | Prismo II | (repite la 1) | Relleno |
| 7 | App Móvil II | (repite la 3) | Relleno |
| 8 | Visual IV | (repite la 4) | Relleno |

### Lo que hace falta de cada proyecto real
- [ ] Nombre
- [ ] Categoría (Diseño gráfico, UI/UX, 3D, Identidad, Motion…)
- [ ] Año
- [ ] Herramientas usadas
- [ ] Descripción corta (1–2 líneas, para el carrusel)
- [ ] Texto largo (el proceso, el desafío, qué hiciste)
- [ ] Imagen de portada (horizontal o vertical, buena calidad)
- [ ] 3 o más imágenes extra (proceso, detalles, mockups)
- [ ] Opcional: video, link a Behance, al prototipo de Figma o al sitio

### Candidatos que vi en tu carpeta
- Tamagotchi 3D (`3DS/tamagochi.blend`)
- Tocadiscos 3D (`3DS/tocadiscos.blend`)
- ¿Este mismo portfolio como proyecto web?
