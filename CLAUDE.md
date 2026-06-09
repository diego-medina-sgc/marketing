# St George's College — Design System (extraído del Admissions Dashboard)

Sistema de diseño oficial para todos los productos internos de SGC. Reusar en The Georgian Network y futuros.

## Tipografía
- **Asap** (300/400/500/600/700) — cuerpo, títulos, UI. `font-family:'Asap',sans-serif`
- **Asap Condensed** (400/500/600/700) — labels, metadata, números tabulares, texto en mayúsculas, kickers.
- Import: `https://fonts.googleapis.com/css2?family=Asap:wght@300;400;500;600;700&family=Asap+Condensed:wght@400;500;600;700&display=swap`
- Títulos: `font-weight:700; letter-spacing:-.02em a -.045em` (más grande = más negativo)
- Labels/kickers: Asap Condensed, `font-size:.56-.62rem; font-weight:700; letter-spacing:.13-.18em; text-transform:uppercase; color:#9C968B`
- Números: `font-variant-numeric:tabular-nums`

## Paleta
```
--ink:#1A1F35      /* azul-tinta, texto principal y headers de tabla */
--red:#DC1E33      /* rojo institucional / acento / campus Quilmes */
--navy:#213463     /* azul / campus North */
--celeste:#6AB2E2  --violet:#6B6EB3  --teal:#109AA9   /* acentos secundarios */
--cream:#F1EDE5    /* fondo cálido suave */
--paper:#EAE5DB    /* tono papel */
--gray:#6A655C     /* texto secundario cálido */
--line:#E6E1D6  --hairline:#EDE9E0   /* bordes */
--green:#15803d (--green-lt:#dcfce7)   --amber:#b45309 (--amber-lt:#fef3c7)
--red-lt:#FBE9EB  --navy-lt:#E9ECF4  --ink-lt:#EDE8DE
body bg: #F6F5F1   surface: #fff
```
Tonos de campus: Quilmes=red, North=navy, "One School"/global=ink.

## Forma y elevación
```
--r-sm:8px;  --r:12px;  --r-lg:16px;
--card-shadow:0 1px 2px rgba(40,33,28,.04),0 4px 14px rgba(40,33,28,.05);
--card-shadow-hover:0 2px 6px rgba(40,33,28,.05),0 12px 30px rgba(40,33,28,.09);
```

## Shell / layout
- **Header** fijo, blanco, `height:58px`, `border-top:3px solid red`, sombra suave. Logo a la izquierda (alineado al ancho del sidebar).
- **Sidebar** fijo, blanco, `width:248px` (colapsable a 60px). Section label en Asap Condensed mayúscula. 
- **Nav item**: `padding:10px 12px; border-radius:9px; color:gray`. Hover → bg cream. **Activo** → `background:red-lt; color:red; font-weight:700; box-shadow:inset 3px 0 0 red`.
- **Content**: `margin-left:248px; margin-top:58px`. Panels con `padding:28px 32px; max-width:1520px`. Animación de entrada `panelIn` (fade + translateY 8px).

## Componentes clave
- **Page header**: `.page-title` 2.15rem peso 700 letter-spacing -.045em + `.page-sub` (Asap Condensed mayúscula). Borde inferior 1px line.
- **Section header** `.sec-hd`: título 1.16rem + underline gradiente (color de campus → transparente).
- **KPI card**: blanca, `border-radius:12px`, borde hairline, **barra de acento vertical a la izquierda** (3-4px), número grande (2.45rem) tabular, label condensada arriba, foot abajo. Hover: `translateY(-2px)` + sombra.
- **Stat strip**: banda con `linear-gradient(120deg,#243a6e,#1d2f5b,#172548)` + overlay rojo translúcido; items separados por borde blanco translúcido; números blancos grandes.
- **Card de contenido / chart card** `.cc`: blanca, header con título (con barrita de color antes) + subtítulo a la derecha, borde inferior hairline.
- **Tablas**: header `background:ink; color:#fff`, Asap Condensed mayúscula .64rem. Filas con hover cream, totales con bg cream, grupos por campus con bg/color tonal.
- **Tags/badges**: pill chico, Asap Condensed 700. nat=verde, exo=ámbar, act=rojo.
- **Pills / toggles**: grupo con bg cream, radius 20px; activo = bg ink (o color de campus) texto blanco.
- **Insight strip**: fila de cards con ícono cuadrado tintado (green/red/amber/teal) + label condensada + valor.
- **Switches** (tema/densidad): track 40x22, on = teal #109AA9.

## Iconografía
SVG stroke (`fill:none;stroke:currentColor;stroke-width:2`), estilo line, ~18px en nav. Sin emojis.

## Dark mode
Soportado vía `[data-theme="dark"]`: bg #13131F, surface #1C1C2C, text #EDEDF0. Logo cambia a versión blanca.

## Tono / voz
Institucional, bilingüe EN/ES, sobrio. Editorial + data. Nada de gradientes chillones ni emojis decorativos.

## Assets (del dashboard — pedir al usuario)
- `logo-v.png` (vertical, ~180-220px), `logo-h.png` (horizontal, 118x50), `logo-h-white.png` (dark mode), `favicon.png`.
