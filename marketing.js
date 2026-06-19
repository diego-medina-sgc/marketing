/* ============================================================
   The Georgian Network — Marketing Assistant
   Ported from "St George's Marketing Assistant" into the
   intranet design system. Self-contained module.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- DATA ---------- */
  const DEFAULT_PRESENTATIONS = [
    { name: 'Plantilla para presentaciones (Recomendada)', url: 'https://docs.google.com/presentation/d/1J21ynfJnQhb_sTvnmILNE8TTrpepIln2uQ3jmxnTF7w/edit' },
    { name: 'One School V2 op1', url: 'https://docs.google.com/presentation/d/1h2Ve8pfTao5fkv4l4I52Wb8WKrwdclC72fDSYuPtgDw/edit' }
  ];

  const DEFAULT_DOCUMENTS = {
    North: [
      { name: 'Prep School North', url: 'https://docs.google.com/document/d/1W4Gsv-tgW81RxiuqIK1Na_H-0cjTavurgKPzVvxMmqw/edit' },
      { name: 'Admisiones North', url: 'https://docs.google.com/document/d/1Or-t4BPosC_KPV0gQdTQ1swb8pYoENxGGXod2sSrfwY/edit' },
      { name: 'Admisiones North (Alt)', url: 'https://docs.google.com/document/d/1jDRTgKXhXfSw_J7k03_AjLSpFvjC7VH3wRYAJ9JziMQ/edit' },
      { name: 'Actas Kinder North', url: 'https://drive.google.com/file/d/1ZlMeVrGB6Blo8V0ooMYFOE0lv7x8bjFT/view' },
      { name: 'Actas Prep School North', url: 'https://drive.google.com/file/d/1LRK5S_LfPHsF8PXLNABciGofyCWAebPj/view' },
      { name: 'Actas College North', url: 'https://drive.google.com/file/d/1gyK6YHA5iRx5Sn2AkcLOQsyqu9TbRn7y/view' }
    ],
    Quilmes: [
      { name: 'Kindergarten', url: 'https://docs.google.com/document/d/1xp7Z837xIdx71yV0I1bEUiB_OUsnn-T1T46MFLnc6Ug/edit' },
      { name: 'Kindergarten Oficial', url: 'https://docs.google.com/document/d/1wgffT9hcYsqjsfTh3s6WdWWOEy7Jg-CrWk25IZ9uE78/edit' },
      { name: 'Prep', url: 'https://docs.google.com/document/d/1m6DImsRycGKrFbS6TkiG6giK_3nXNBnWonxUaLmZdpM/edit' },
      { name: 'Prep Oficial', url: 'https://docs.google.com/document/d/11uyc3fB8D0cL61wAYQ20mI_EHaehx238GJWD0saKmaw/edit' },
      { name: 'College', url: 'https://docs.google.com/document/d/1bJHIfP6-7H0NfhoJH_BvyVaG-Yp8BRO7GV5Vj9POGFs/edit' },
      { name: 'College Oficial', url: 'https://docs.google.com/document/d/1QGtqm4hkZskI0ooXtM-uLjoJd4FpdS1kX1weRpBKiCI/edit' },
      { name: 'Acceptance Letter', url: 'https://docs.google.com/document/d/114UlDnt_9Y2F_0qiu6Ld1WxzmaOaBl3wXbH0EyYRasM/edit' },
      { name: 'Actas Kinder', url: 'https://docs.google.com/document/d/1-q2ylSlYHsgOLx7NYeRPR2Za_ANtJvtOtrI1i6APFEo/edit' }
    ],
    OneSchool: [
      { name: 'Admisiones', url: 'https://docs.google.com/document/d/1Da1VkHOLdANxg6hCfWdCHV808lpp9GDTE1rvSW15I7o/edit' },
      { name: 'Badges', url: 'https://docs.google.com/document/d/1qYsVZxgYqhkvfktOfzASGcWDHnTtsHxGvG3Dyys6QZE/edit' },
      { name: 'Op2 One School', url: 'https://drive.google.com/file/d/1lK_jGX8TW1Ai7hiq8O4MKewO12OBw-Vo/view' }
    ]
  };

  const PRESENTATIONS = (window.TGNStore ? TGNStore.get('presentations', DEFAULT_PRESENTATIONS) : DEFAULT_PRESENTATIONS);
  const DOCUMENTS = (window.TGNStore ? TGNStore.get('documents', DEFAULT_DOCUMENTS) : DEFAULT_DOCUMENTS);

  const CANVA_BRAND_KIT = 'https://www.canva.com/brand/kAFKKx1idKs';

  /* Managed in the Back Office (Designs panel) and published for everyone.
     This object is only the factory default / seed — migrated from the
     "Canva Brand Templates" sheet on 2026-06-11. */
  const DEFAULT_CANVA = {
    'Flyers y Carteles': [
      { name: 'Flyer | Opción 1', url: 'https://www.canva.com/brand/brand-templates/EAHI5pxvIEI', preview: 'https://drive.google.com/file/d/1ucx9-jXxic0qUaMhL1BHXybephRARl5U/view', usage: 'Variante sin foto', fields: ['Título', 'Subtítulo', 'Fecha', 'Hora', 'Campus'] },
      { name: 'Flyer | Opción 2', url: 'https://www.canva.com/brand/brand-templates/EAHJizGKnrU', preview: 'https://drive.google.com/file/d/1ucx9-jXxic0qUaMhL1BHXybephRARl5U/view', usage: 'Variante del mismo template', fields: [] },
      { name: 'Flyer | Opción 3', url: 'https://www.canva.com/brand/brand-templates/EAHI5twdtsQ', preview: 'https://drive.google.com/file/d/1EjRjfVL-NHqACrQEHWpItGQ6NxmA54np/view', usage: 'Comunicaciones generales sin foto', fields: ['Título', 'Subtítulo', 'Fecha', 'Hora', 'Campus'] },
      { name: 'Flyer | Opción 4', url: 'https://www.canva.com/brand/brand-templates/EAHI6uG-Ubo', preview: 'https://drive.google.com/file/d/1dhJPr7_-Gzmz46g0NVwJB7z3BQfSTgLI/view', usage: 'Eventos institucionales generales', fields: ['Título 1', 'Título 2', 'Subtítulo', 'Fecha', 'Hora', 'Ubicación | Campus'] },
      { name: 'Flyer | Con foto | Opción 1', url: 'https://www.canva.com/brand/brand-templates/EAHI5SOaZSY', preview: 'https://drive.google.com/file/d/1Ps0Moj17kVqomPcxXpSlzV-RQZ9nnP9T/view', usage: 'Flyer horizontal con foto', fields: ['Foto', 'Título', 'Subtítulo', 'Fecha', 'Hora', 'Campus'] },
      { name: 'Flyer | Con foto | Opción 2', url: 'https://www.canva.com/brand/brand-templates/EAHI6lbyXCs', preview: 'https://drive.google.com/file/d/1Ps0Moj17kVqomPcxXpSlzV-RQZ9nnP9T/view', usage: 'Variante del mismo template', fields: [] },
      { name: 'Flyer | Save the Date', url: 'https://www.canva.com/brand/brand-templates/EAHJFX4UhCI', preview: 'https://drive.google.com/file/d/1ID671l0RgxKGq954s2OjG3su9GPv5jAo/view', usage: 'Anuncios anticipados de eventos', fields: ['Nombre del evento', 'Fecha', 'Hora', 'Ubicación', 'Campus'] },
      { name: 'Flyer | Vertical con foto', url: 'https://www.canva.com/brand/brand-templates/EAHI5bFuOJc', preview: 'https://drive.google.com/file/d/1RM9OWqYhZqy9cKKcduHHdk0rdex_WgmC/view', usage: 'Eventos con foto vertical', fields: ['Foto', 'Título', 'Subtítulo', 'Fecha', 'Hora', 'Campus'] },
      { name: 'Flyer | Prep & Kinder', url: 'https://www.canva.com/brand/brand-templates/EAHI5uNdOmE', usage: '4 estilos para nivel inicial', fields: ['Título', 'Subtítulo', 'Fecha', 'Campus'], variations: [
        { label: 'A', preview: 'https://drive.google.com/file/d/1gr1w_Mi5ds4Wo2avt4B4akb6sgUodcbU/view' },
        { label: 'B', preview: 'https://drive.google.com/file/d/1T3UIhbwfrStUYaVCPqWM6BBOq5FhjgyZ/view' },
        { label: 'C', preview: 'https://drive.google.com/file/d/1ZqTFpJ4lUmyQ1aS8-8gQyjXji1CciWF4/view' },
        { label: 'D', preview: 'https://drive.google.com/file/d/1Tn7azzrTPZp2TSXnUW1AUH4GrcsfX_6F/view' }
      ] },
      { name: 'Flyer | evento Prep & Kinder', url: 'https://www.canva.com/brand/brand-templates/EAHJF6VCHjk', preview: 'https://drive.google.com/file/d/1R1panfZohfsFrU6KLU93iRWKxAvaUdPd/view', usage: 'Eventos del nivel inicial', fields: ['Nombre del evento', 'Fecha', 'Hora', 'Ubicación', 'Campus'] },
      { name: 'Flyer | Actos patrios', url: 'https://www.canva.com/brand/brand-templates/EAHJdlW7xkk', preview: '', usage: 'Efemérides y actos escolares', fields: [] },
      { name: 'Flyer | A5', url: 'https://www.canva.com/brand/brand-templates/EAHJeAoSHwA', preview: '', usage: '', fields: [] },
      { name: 'Cartel institucional', url: 'https://www.canva.com/brand/brand-templates/EAHI5Siy2bY', usage: 'Cartel cuadrado para redes/impresión', fields: ['Título', 'Subtítulo', 'Fecha', 'Hora', 'Campus'], variations: [
        { label: 'A', preview: 'https://drive.google.com/file/d/1HTGWj9Dwa2ijfFePsu9-PYHetRUNFup0/view' },
        { label: 'B', preview: 'https://drive.google.com/file/d/19NvndngX1ZxGQ1WgMLepkP46dKID0j-X/view' },
        { label: 'C', preview: 'https://drive.google.com/file/d/1j0pQ1IxYysMwLq0FCppAO3s9ALQ6O9b4/view' }
      ] }
    ],
    'Banners': [
      { name: 'Banners | Google Forms', url: 'https://www.canva.com/brand/brand-templates/EAHI5kDWJ8k', usage: 'Encabezado formularios', fields: [], variations: [
        { label: 'A', preview: 'https://drive.google.com/file/d/1Vbhyo1tn5lKXG6gTZa7k9Jn51iSz0m3f/view' },
        { label: 'B', preview: 'https://drive.google.com/file/d/1mvz1Nkc_VJlP5TLMEfTy286B_BPwkx5c/view' },
        { label: 'C', preview: 'https://drive.google.com/file/d/124dgjHVhXVrbxCpI98MHPDk4ipeRUZw7/view' },
        { label: 'D', preview: 'https://drive.google.com/file/d/16-0Y_BKzxYUhWd14jfjwGARAImuqls9K/view' },
        { label: 'E', preview: 'https://drive.google.com/file/d/1LkDrnQ7Xd4U7IZufaWIlgsrSdW_g9kb6/view' },
        { label: 'F', preview: 'https://drive.google.com/file/d/1rK8ggkoecPqnUI50CVAEqjNzpKqohkQw/view' }
      ] },
      { name: 'Banners | LinkedIn', url: 'https://www.canva.com/brand/brand-templates/EAHJjiHARxc', preview: '', usage: '', fields: [] }
    ],
    'Credenciales': [
      { name: 'Name tags | Opción 1', url: 'https://www.canva.com/brand/brand-templates/EAHI5fY39MI', preview: 'https://drive.google.com/file/d/1YMghiHbolaSDt_axqAfHaMx0c41jzDKg/view', usage: 'Credenciales eventos', fields: ['Nombre', 'Apellido', 'Rol', 'Campus'] },
      { name: 'Name tags | Opción 2', url: 'https://www.canva.com/brand/brand-templates/EAHJjAqx4tE', preview: 'https://drive.google.com/file/d/1YMghiHbolaSDt_axqAfHaMx0c41jzDKg/view', usage: 'Variante del mismo template', fields: [] },
      { name: 'Credencial', url: 'https://www.canva.com/brand/brand-templates/EAHJjudKeDg', preview: '', usage: '', fields: [] }
    ],
    'Diplomas': [
      { name: 'Diploma genérico', url: 'https://www.canva.com/brand/brand-templates/EAHI5jzhC-c', preview: 'https://drive.google.com/file/d/18Dc9oqD1TMEJsHwkofhv98CPEmalfsqR/view', usage: 'Reconocimientos generales', fields: ['Nombre', 'Motivo', 'Fecha', 'Firma'] },
      { name: 'Diploma graduación', url: 'https://www.canva.com/brand/brand-templates/EAHI5n5TcS8', preview: 'https://drive.google.com/file/d/1k6NvE1J6HxGUqyFzq8bEEcDzoMtbqmIq/view', usage: 'Ceremonia graduación', fields: ['Nombre', 'Año', 'Fecha', 'Firma'] }
    ],
    'Hojas y Encabezados': [
      { name: 'Encabezado Google Docs | Opción 1', url: 'https://www.canva.com/brand/brand-templates/EAHI_J1AFpg', preview: 'https://drive.google.com/file/d/1y0bmNY17RWVnsYnQQaVIbw8PtILQAc59/view', usage: 'Banner para Google Docs', fields: [] },
      { name: 'Encabezado Google Docs | Opción 2', url: 'https://www.canva.com/brand/brand-templates/EAHJGF6BDy0', preview: 'https://drive.google.com/file/d/1f_EbZi8U5LqxhXu1Mf2d4olPRtn16GWm/view', usage: 'Banner para Google Docs', fields: [] },
      { name: 'Hojas membretadas docs', url: 'https://www.canva.com/brand/brand-templates/EAHI_M4jq0o', preview: 'https://drive.google.com/file/d/1z_HGXSnGUvyTTt9bLVy8auwl664JoDkr/view', usage: 'Documentos con membrete', fields: ['Contenido'] }
    ],
    'Etiquetas': [
      { name: 'Etiquetas individuales', url: 'https://www.canva.com/brand/brand-templates/EAHJjMkgvMo', preview: '', usage: '', fields: [] },
      { name: 'Etiquetas premios', url: 'https://www.canva.com/brand/brand-templates/EAHJjHIpwcQ', preview: '', usage: '', fields: [] }
    ],
    'Otros': [
      { name: 'Lunch menu', url: 'https://www.canva.com/brand/brand-templates/EAHKB1G7LpE', preview: '', usage: '', fields: [] },
      { name: 'Mapa | North Campus', url: 'https://www.canva.com/brand/brand-templates/EAHJwujbuHA', preview: '', usage: '', fields: [] },
      { name: 'Portada para videos', url: 'https://www.canva.com/brand/brand-templates/EAHI_OGAKG0', preview: 'https://drive.google.com/file/d/1pkjzQQZJLXS9WY2JBy1sY5q_E3GviTEq/view', usage: 'YouTube / Reels', fields: ['Título', 'Fecha', 'Campus'] },
      { name: 'Upcoming Events', url: 'https://www.canva.com/brand/brand-templates/EAHI0jyKJjg', preview: 'https://drive.google.com/file/d/1slWrJ1XbiwT03XhcIAaiEEcv_TDApxX7/view', usage: 'Resumen de calendario', fields: ['Lista de eventos'] }
    ]
  };

  /* ─── Canva designs: managed in the Back Office, published for everyone ─── */
  const CANVA = (window.TGNStore ? TGNStore.get('designs', DEFAULT_CANVA) : DEFAULT_CANVA);

  const LOGOS = [
    { name: 'Logotipo · Blanco horizontal (sin fondo)', url: 'https://drive.google.com/file/d/1vCsh-n9K4I_I8_D-zWfB1-yLNR9b_1yA/view' },
    { name: 'Logotipo · Rojo horizontal (sin fondo)', url: 'https://drive.google.com/file/d/1Y5YQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view' },
    { name: 'Logotipo · Rojo vertical (sin fondo)', url: 'https://drive.google.com/file/d/1Z5ZQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view' },
    { name: 'Isotipo rojo (sin fondo)', url: 'https://drive.google.com/file/d/1B5BQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view' },
    { name: 'Isotipo blanco (sin fondo)', url: 'https://drive.google.com/file/d/1A5AQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view' }
  ];
  const LOGOS_FOLDER = 'https://drive.google.com/drive/folders/1-5TiU6M4OZyXSR9VEj9rpfxLvDuD464e?usp=sharing';

  const PALETTE = [
    { name: 'Rojo Institucional', cat: 'Paleta Primaria', hex: '#dc1e33', rgb: 'R.220 G.30 B.51', pantone: '199C', cmyk: 'C.7 M.100 Y.87 K.1' },
    { name: 'Azul Institucional', cat: 'Paleta Primaria', hex: '#213469', rgb: 'R.33 G.52 B.105', pantone: '294C', cmyk: 'C.100 M.90 Y.29 K.19' },
    { name: 'Celeste', cat: 'Paleta Secundaria', hex: '#6ab2e2', rgb: 'R.107 G.178 B.226', pantone: '292C', cmyk: 'C.55 M.16 Y.0 K.0' },
    { name: 'Violeta', cat: 'Paleta Secundaria', hex: '#6b6eb3', rgb: 'R.107 G.110 B.179', pantone: '2124C', cmyk: 'C.69 M.60 Y.0 K.0' },
    { name: 'Turquesa', cat: 'Paleta Secundaria', hex: '#109aa9', rgb: 'R.16 G.154 B.169', pantone: '320C', cmyk: 'C.80 M.22 Y.32 K.0' }
  ];
  const BRAND_MANUAL = 'https://drive.google.com/file/d/1U9Allg_THwmLJU70oPqLS8t5S_8QX1be/view';

  const MENU_OPTIONS = [
    { id: 'pres', t: { en: 'Presentations', es: 'Presentaciones' }, ico: 'slides', c: 'var(--green)' },
    { id: 'docs', t: { en: 'Documents', es: 'Documentos' }, ico: 'doc', c: 'var(--navy)' },
    { id: 'canva', t: { en: 'Designs', es: 'Diseños' }, ico: 'palette', c: 'var(--violet)' },
    { id: 'draft', t: { en: 'Communications ', es: 'Comunicaciones' }, ico: 'chat', c: 'var(--red)' },
    { id: 'event', t: { en: 'Events', es: 'Eventos' }, ico: 'calendar', c: 'var(--amber)' },
    { id: 'custom', t: { en: 'Other request', es: 'Otra solicitud' }, ico: 'plus', c: 'var(--teal)' }
  ];

  /* ---------- ICONS ---------- */
  const I = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
    slides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M12 17v3M9 20h6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 1 2-4h1a4 4 0 0 0 4-4 9 9 0 0 0-9-8z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h13"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>',
    sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    clip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8"/></svg>'
  };

  /* ---------- i18n ---------- */
  const L = {
    en: { back: 'Back', menu_back: 'Back to menu', cont: 'Continue', name: 'Full name', role: 'Role or area', campus: 'Campus',
      welcome: 'Welcome', wsub: 'Marketing & Communications Support', hi: 'Hi', q: 'How can Marketing help you?',
      brand_manual: 'Brand Manual', palette: 'Colour Palette', logos: 'SGC Logos', open: 'Open', use: 'Use template',
      ext_gallery: 'Open gallery', proc: 'Procedure', send_req: 'Send request', open_gmail: 'Open in Gmail', copy_body: 'Copy body to paste',
      ready: 'Request ready!', ready_sub: 'To finish, send the email we prepared for you.', copied: 'Copied!',
      reset: 'Change user' },
    es: { back: 'Volver', menu_back: 'Volver al menú', cont: 'Continuar', name: 'Nombre completo', role: 'Rol o área', campus: 'Campus',
      welcome: 'Bienvenido/a', wsub: 'Soporte de Marketing y Comunicación', hi: 'Hola', q: '¿En qué podemos ayudarte desde Marketing?',
      brand_manual: 'Manual de Marca', palette: 'Paleta de colores', logos: 'Logos SGC', open: 'Abrir', use: 'Usar template',
      ext_gallery: 'Abrir galería', proc: 'Procedimiento', send_req: 'Enviar solicitud', open_gmail: 'Abrir en Gmail', copy_body: 'Copiar cuerpo para pegar',
      ready: '¡Solicitud lista!', ready_sub: 'Para finalizar, enviá el mail que preparamos para vos.', copied: '¡Copiado!',
      reset: 'Cambiar usuario' }
  };

  /* ---------- STATE ---------- */
  let root = null, lang = 'es';
  let user = JSON.parse(localStorage.getItem('tgn-mkt-user') || '{"name":"","campus":"","role":""}');
  let step = 'menu';
  let history = [];
  const t = (k) => (L[lang] && L[lang][k]) || L.es[k] || k;
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  /* lightweight markdown → HTML for chat bubbles */
  function mdInline(s) {
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return s;
  }
  function mdToHtml(text) {
    const lines = String(text == null ? '' : text).replace(/\r/g, '').split('\n');
    let html = '', inList = false, para = [];
    const closeList = function () { if (inList) { html += '</ul>'; inList = false; } };
    const flushPara = function () { if (para.length) { html += '<p>' + para.join('<br>') + '</p>'; para = []; } };
    lines.forEach(function (raw) {
      const line = raw.trim();
      if (line === '') { closeList(); flushPara(); return; }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) { closeList(); flushPara(); html += '<hr class="mk-md-hr"/>'; return; }
      const b = line.match(/^[-•]\s+(.*)$/);
      if (b) { flushPara(); if (!inList) { html += '<ul class="mk-md-ul">'; inList = true; } html += '<li>' + mdInline(b[1]) + '</li>'; return; }
      closeList(); para.push(mdInline(line));
    });
    closeList(); flushPara();
    return html;
  }
  const driveUrl = (u) => { if (!u) return ''; const m = u.match(/\/d\/([\w-]+)/) || u.match(/[?&]id=([\w-]+)/); return m ? 'https://lh3.googleusercontent.com/u/0/d/' + m[1] : u; };
  const FALLBACK = "this.onerror=null;this.style.display='none';this.parentNode.classList.add('mk-noimg');";

  function go(s) { history.push(step); step = s; render(); window.scrollTo({ top: 0 }); }
  function back() { step = history.pop() || 'menu'; render(); window.scrollTo({ top: 0 }); }
  function toMenu() { history = []; step = 'menu'; render(); window.scrollTo({ top: 0 }); }

  /* ---------- SHELL ---------- */
  function render() {
    if (!root) return;
    const showHead = step !== 'id' && step !== 'menu';
    let h = '<div class="mk-shell">';
    if (showHead) {
      h += '<div class="mk-bar"><button class="mk-back" data-act="back">' + I.back + t('back') + '</button>' +
        '<span class="mk-step-lbl">' + esc(stepLabel()) + '</span></div>';
    }
    h += '<div class="mk-body">' + views[step]() + '</div></div>';
    root.innerHTML = h;
    bind();
  }
  function stepLabel() {
    const map = { pres: { en: 'Presentation Templates', es: 'Plantillas de Presentación' }, docs: { en: 'Document Templates', es: 'Plantillas de Documento' },
      canva: { en: 'Canva Designs', es: 'Diseño en Canva' }, draft: { en: 'Draft Communication', es: 'Redactar Comunicación' },
      event: { en: 'Event Coverage', es: 'Cobertura de Evento' }, custom: { en: 'Custom Request', es: 'Solicitud Personalizada' },
      palette: { en: 'Colour Palette', es: 'Paleta de colores' }, logos: { en: 'SGC Logos', es: 'Logos SGC' } };
    const o = map[step]; return o ? o[lang] : '';
  }

  /* ---------- VIEWS ---------- */
  const views = {};

  views.id = function () {
    return '<div class="mk-id">' +
      '<div class="mk-id-head"><div class="mk-id-badge">' + I.briefcase + '</div>' +
      '<h2 class="mk-h2">' + t('welcome') + '</h2><p class="mk-sub">' + t('wsub') + '</p></div>' +
      '<div class="mk-id-grid">' +
      '<label class="mk-field"><span class="mk-label">' + I.user + t('name') + '</span>' +
      '<input class="mk-input" id="mk-name" type="text" value="' + esc(user.name) + '" placeholder="' + (lang === 'es' ? 'Ej: María García' : 'e.g. María García') + '"/></label>' +
      '<label class="mk-field"><span class="mk-label">' + I.briefcase + t('role') + '</span>' +
      '<input class="mk-input" id="mk-role" type="text" value="' + esc(user.role) + '" placeholder="' + (lang === 'es' ? 'Ej: Coordinadora Académica' : 'e.g. Academic Coordinator') + '"/></label>' +
      '<div class="mk-field mk-field-full"><span class="mk-label">' + I.pin + t('campus') + '</span>' +
      '<div class="mk-campus" id="mk-campus">' +
      '<button class="mk-campus-btn' + (user.campus === 'Quilmes' ? ' on q' : '') + '" data-campus="Quilmes">Quilmes</button>' +
      '<button class="mk-campus-btn' + (user.campus === 'North' ? ' on n' : '') + '" data-campus="North">North</button>' +
      '</div></div></div>' +
      '<button class="mk-btn mk-btn-red" id="mk-continue">' + t('cont') + ' ' + I.next + '</button>' +
      '</div>';
  };

  views.menu = function () {
    const first = (user.name || '').split(' ')[0] || '';
    let h = '<div class="mk-menu-head"><div><h2 class="mk-h2"><span class="mk-accent-n">¡</span><span class="mk-accent-r">' + t('hi') + ' ' + esc(first) + '</span><span class="mk-accent-n">!</span></h2>' +
      '<p class="mk-sub">' + t('q') + '</p></div>' +
      '<button class="mk-pill-campus" data-act="reset" title="' + (lang === 'es' ? 'Editar nombre, rol y sede' : 'Edit name, role & campus') + '">' + I.user + '<span class="mk-pill-txt">' + esc(user.name || '') + '<span class="mk-pill-campus-tag">' + I.pin + esc(user.campus) + '</span></span>' + I.edit + '</button></div>';
    h += '<div class="mk-opt-grid">';
    MENU_OPTIONS.forEach(function (o) {
      h += '<button class="mk-opt" style="--c:' + o.c + '" data-go="' + o.id + '"><span class="mk-opt-ico">' + I[o.ico] + '</span>' +
        '<span class="mk-opt-t">' + o.t[lang] + '</span></button>';
    });
    h += '</div>';
    h += '<div class="mk-quick">' +
      '<a class="mk-quick-btn" href="' + BRAND_MANUAL + '" target="_blank" rel="noopener">' + I.book + t('brand_manual') + '</a>' +
      '<button class="mk-quick-btn" data-go="palette">' + I.palette + t('palette') + '</button>' +
      '<button class="mk-quick-btn mk-quick-wide" data-go="logos">' + I.briefcase + t('logos') + '</button>' +
      '</div>';
    return h;
  };

  function heroBlock(ico, title, text, btnText, btnUrl, dark) {
    return '<div class="mk-hero' + (dark ? ' slate' : '') + '"><div class="mk-hero-ico">' + I[ico] + '</div>' +
      '<h3 class="mk-hero-t">' + esc(title) + '</h3><p class="mk-hero-p">' + text + '</p>' +
      '<a class="mk-btn mk-btn-red mk-hero-btn" href="' + btnUrl + '" target="_blank" rel="noopener">' + esc(btnText) + ' ' + I.ext + '</a></div>';
  }

  function linkRow(name, url, accent) {
    return '<a class="mk-row" style="--c:' + (accent || 'var(--navy)') + '" href="' + url + '" target="_blank" rel="noopener">' +
      '<span class="mk-row-name">' + esc(name) + '</span><span class="mk-row-arrow">' + I.ext + '</span></a>';
  }

  views.pres = function () {
    let h = heroBlock('layout', lang === 'es' ? 'Galería de Plantillas' : 'Templates Gallery',
      (lang === 'es' ? 'Accedé a las presentaciones oficiales de St George\'s College. Recordá seleccionar la pestaña <b>"St George\'s College"</b> dentro de la galería de Google Slides.'
        : 'Access the official St George\'s College presentations. Remember to select the <b>"St George\'s College"</b> tab inside the Google Slides gallery.'),
      lang === 'es' ? 'Abrir galería de Slides' : 'Open Slides gallery', 'https://docs.google.com/presentation/u/0/?tgif=d&ftv=1');
    h += '<div class="mk-sec"><div class="mk-sec-lbl"><span class="mk-dot"></span>' + (lang === 'es' ? 'Plantillas directas' : 'Direct templates') + '</div>' +
      '<div class="mk-grid2">';
    PRESENTATIONS.forEach(function (p) { h += linkRow(p.name, p.url, 'var(--navy)'); });
    h += '</div></div>';
    return h;
  };

  views.docs = function () {
    const campus = user.campus || 'Quilmes';
    let h = heroBlock('doc', lang === 'es' ? 'Hojas Membretadas' : 'Letterheads',
      (lang === 'es' ? 'Accedé a los documentos oficiales. Seleccioná la pestaña <b>"St George\'s College"</b> para ver las hojas membretadas de cada campus.'
        : 'Access the official documents. Select the <b>"St George\'s College"</b> tab to see each campus letterhead.'),
      lang === 'es' ? 'Abrir galería de Documentos' : 'Open Documents gallery', 'https://docs.google.com/document/u/0/?tgif=d&ftv=1', true);
    [{ title: (lang === 'es' ? 'Campus ' : 'Campus ') + campus, items: DOCUMENTS[campus], c: campus === 'North' ? 'var(--navy)' : 'var(--red)' },
     { title: 'One School', items: DOCUMENTS.OneSchool, c: 'var(--ink)' }].forEach(function (sec) {
      h += '<div class="mk-sec"><div class="mk-sec-lbl"><span class="mk-dot"></span>' + esc(sec.title) + '</div><div class="mk-grid2">';
      sec.items.forEach(function (it) { h += linkRow(it.name, it.url, sec.c); });
      h += '</div></div>';
    });
    return h;
  };

  views.canva = function () {
    let h = '<div class="mk-hero slate mk-hero-row"><div class="mk-hero-l"><div class="mk-hero-ico">' + I.palette + '</div>' +
      '<div><h3 class="mk-hero-t">Canva Brand Kit</h3><p class="mk-hero-p">' + (lang === 'es' ? 'Accedé a todos los logos y recursos oficiales.' : 'Access all official logos and resources.') + '</p></div></div>' +
      '<a class="mk-btn mk-btn-red" href="' + CANVA_BRAND_KIT + '" target="_blank" rel="noopener">' + (lang === 'es' ? 'Abrir Brand Kit' : 'Open Brand Kit') + ' ' + I.ext + '</a></div>';
    // procedure
    const steps = lang === 'es'
      ? ['Clic en el link del template', 'Clic en "Usar esta plantilla de la marca"', 'Editá textos y elementos', 'Descargá (PNG digital, PDF impresión)']
      : ['Click the template link', 'Click "Use this brand template"', 'Edit texts and elements', 'Download (PNG digital, PDF print)'];
    h += '<div class="mk-sec"><div class="mk-sec-lbl"><span class="mk-dot"></span>' + t('proc') + '</div><div class="mk-proc">';
    steps.forEach(function (s, i) { h += '<div class="mk-proc-step"><span class="mk-proc-n">' + (i + 1) + '</span><span>' + esc(s) + '</span></div>'; });
    h += '</div></div>';
    // grouped templates
    Object.keys(CANVA).forEach(function (cat) {
      h += '<div class="mk-sec"><h3 class="mk-cat"><span class="mk-cat-bar"></span>' + esc(cat) + '</h3><div class="mk-canva-grid">';
      CANVA[cat].forEach(function (tpl) { h += canvaCard(tpl); });
      h += '</div></div>';
    });
    return h;
  };

  function canvaCard(tpl) {
    let media;
    if (tpl.preview) {
      media = '<div class="mk-canva-media"><img src="' + driveUrl(tpl.preview) + '" alt="" referrerpolicy="no-referrer" onerror="' + FALLBACK + '"/></div>';
    } else if (tpl.variations) {
      media = '<div class="mk-canva-media mk-canva-vars">' + tpl.variations.map(function (v) {
        return '<div class="mk-var"><img src="' + driveUrl(v.preview) + '" referrerpolicy="no-referrer" onerror="' + FALLBACK + '"/><span class="mk-var-lbl">' + v.label + '</span></div>';
      }).join('') + '</div>';
    } else { media = '<div class="mk-canva-media mk-noimg"></div>'; }
    return '<div class="mk-canva"><div class="mk-canva-top">' + media + '</div>' +
      '<div class="mk-canva-body"><h4 class="mk-canva-name">' + esc(tpl.name) + '</h4>' +
      (tpl.usage ? '<p class="mk-canva-fields">' + esc(tpl.usage) + '</p>' : '') +
      (tpl.fields && tpl.fields.length ? '<p class="mk-canva-fields"><b>' + (lang === 'es' ? 'Campos:' : 'Fields:') + '</b> ' + esc(tpl.fields.join(', ')) + '</p>' : '') +
      '<a class="mk-canva-use" href="' + tpl.url + '" target="_blank" rel="noopener">' + t('use') + ' ' + I.ext + '</a></div></div>';
  }

  views.palette = function () {
    let h = '<div class="mk-pal-head"><h2 class="mk-h2">' + t('palette') + '</h2><p class="mk-kicker">' + (lang === 'es' ? 'Programa de Identidad Visual · St George\'s College' : 'Visual Identity Programme · St George\'s College') + '</p></div>';
    h += '<div class="mk-pal-grid">';
    PALETTE.forEach(function (c) {
      h += '<div class="mk-pal-card"><div class="mk-pal-swatch" style="background:' + c.hex + '"><span class="mk-pal-cat">' + esc(c.cat) + '</span><span class="mk-pal-name">' + esc(c.name) + '</span></div>' +
        '<div class="mk-pal-body">' +
        palRow('HTML / HEX', c.hex, c.hex) + palRow('RGB', c.rgb, c.rgb) + palRow('PANTONE', c.pantone, c.pantone) +
        '<div class="mk-pal-cmyk"><div class="mk-pal-cmyk-l"><span class="mk-bar-mini"></span>CMYK</div><div class="mk-pal-cmyk-v">' + esc(c.cmyk) + '</div></div>' +
        '</div></div>';
    });
    h += '</div>';
    h += backBtn();
    return h;
  };
  function palRow(label, value, copyVal) {
    return '<div class="mk-pal-row" data-copy="' + esc(copyVal) + '"><span class="mk-pal-row-l">' + label + '</span>' +
      '<span class="mk-pal-row-v">' + esc(value) + ' ' + I.copy + '</span></div>';
  }

  views.logos = function () {
    let h = heroBlock('briefcase', lang === 'es' ? 'Galería de Logos' : 'Logo Gallery',
      (lang === 'es' ? 'Descargá los logos oficiales de St George\'s College. Hacé clic en cualquier elemento para abrirlo en Drive.' : 'Download the official St George\'s College logos. Click any item to open it in Drive.'),
      lang === 'es' ? 'Abrir carpeta completa' : 'Open full folder', LOGOS_FOLDER);
    h += '<div class="mk-grid2">';
    LOGOS.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (l) {
      h += '<a class="mk-row" style="--c:var(--red)" href="' + l.url + '" target="_blank" rel="noopener"><span class="mk-row-ico">' + I.image + '</span><span class="mk-row-name">' + esc(l.name) + '</span><span class="mk-row-arrow">' + I.ext + '</span></a>';
    });
    h += '</div>' + backBtn();
    return h;
  };

  function backBtn() {
    return '<div class="mk-backbar"><button class="mk-btn mk-btn-soft" data-act="menu">' + I.back + ' ' + t('menu_back') + '</button></div>';
  }

  /* ---------- EVENT / CUSTOM forms ---------- */
  let formState = {};
  views.event = function () {
    if (formState._sent === 'event') return successView(buildEventEmail());
    const f = formState.event || (formState.event = { eventName: '', location: '', eventDate: '', eventTime: '', needs: [], hasAttachments: null, objective: '' });
    const needs = ['Fotos', 'Video', 'Redes Sociales', 'Streaming'];
    return '<div class="mk-form"><div class="mk-form-head"><h2 class="mk-h2">' + (lang === 'es' ? 'Solicitud de Cobertura' : 'Coverage Request') + '</h2>' +
      '<p class="mk-sub">' + (lang === 'es' ? 'Completá los detalles del evento para coordinar la cobertura.' : 'Complete the event details so we can coordinate coverage.') + '</p></div>' +
      '<div class="mk-grid2">' +
      field('eventName', lang === 'es' ? 'Nombre del Evento' : 'Event name', f.eventName) +
      field('location', lang === 'es' ? 'Lugar / Sala' : 'Location / Room', f.location) +
      field('eventDate', 'Fecha', f.eventDate, 'date') +
      field('eventTime', 'Hora', f.eventTime, 'time') + '</div>' +
      '<div class="mk-field-block"><span class="mk-label">' + (lang === 'es' ? '¿Qué necesitás?' : 'What do you need?') + '</span>' +
      '<div class="mk-chips">' + needs.map(function (n) { return '<button class="mk-chip' + (f.needs.indexOf(n) > -1 ? ' on' : '') + '" data-need="' + n + '">' + n + '</button>'; }).join('') + '</div></div>' +
      '<div class="mk-field-block"><span class="mk-label">' + (lang === 'es' ? '¿Contiene adjuntos para enviar por mail?' : 'Any attachments to email?') + '</span>' +
      '<div class="mk-yesno">' + yn(f.hasAttachments) + '</div></div>' +
      '<label class="mk-field"><span class="mk-label">' + (lang === 'es' ? 'Objetivo / Comentarios' : 'Objective / Comments') + '</span>' +
      '<textarea class="mk-input mk-textarea" data-f="objective" rows="3" placeholder="' + (lang === 'es' ? 'Ej: Publicar en el newsletter semanal…' : 'e.g. Publish in the weekly newsletter…') + '">' + esc(f.objective) + '</textarea></label>' +
      '<button class="mk-btn mk-btn-navy" data-act="send-event">' + t('send_req') + '</button></div>';
  };

  views.custom = function () {
    if (formState._sent === 'custom') return successView(buildCustomEmail());
    const f = formState.custom || (formState.custom = { title: '', description: '', deadline: '', hasAttachments: null });
    return '<div class="mk-form"><div class="mk-form-head"><h2 class="mk-h2">' + (lang === 'es' ? 'Otra Solicitud' : 'Other Request') + '</h2>' +
      '<p class="mk-sub">' + (lang === 'es' ? '¿Tenés una necesidad específica? Contanos los detalles.' : 'Have a specific need? Tell us the details.') + '</p></div>' +
      field('title', lang === 'es' ? 'Título de la solicitud' : 'Request title', f.title, 'text', 'Ej: Diseño de banner para pasillo') +
      '<label class="mk-field"><span class="mk-label">' + (lang === 'es' ? 'Descripción detallada' : 'Detailed description') + '</span>' +
      '<textarea class="mk-input mk-textarea" data-f="description" rows="4" placeholder="' + (lang === 'es' ? 'Explicá lo que necesitás, medidas, formato…' : 'Explain what you need, sizes, format…') + '">' + esc(f.description) + '</textarea></label>' +
      '<div class="mk-field-block"><span class="mk-label">' + (lang === 'es' ? '¿Contiene adjuntos para enviar por mail?' : 'Any attachments to email?') + '</span><div class="mk-yesno">' + yn(f.hasAttachments) + '</div></div>' +
      field('deadline', lang === 'es' ? 'Fecha de entrega deseada' : 'Desired delivery date', f.deadline, 'date') +
      '<button class="mk-btn mk-btn-navy" data-act="send-custom">' + t('send_req') + '</button></div>';
  };

  function field(key, label, val, type, ph) {
    return '<label class="mk-field"><span class="mk-label">' + esc(label) + '</span>' +
      '<input class="mk-input" data-f="' + key + '" type="' + (type || 'text') + '" value="' + esc(val) + '" placeholder="' + esc(ph || '') + '"/></label>';
  }
  function yn(v) {
    return '<button class="mk-yn' + (v === true ? ' on' : '') + '" data-yn="1">' + (lang === 'es' ? 'Sí' : 'Yes') + '</button>' +
      '<button class="mk-yn' + (v === false ? ' on' : '') + '" data-yn="0">No</button>';
  }

  function buildEventEmail() {
    const f = formState.event;
    const subject = 'Solicitud de Cobertura de Evento - ' + f.eventName;
    const body = 'Estimado equipo de Marketing,\n\nSolicito cobertura de un evento.\n\nDebajo toda la info recopilada:\n--------------------------------------------------\n' +
      '• Evento: ' + f.eventName + '\n• Fecha: ' + f.eventDate + '\n• Hora: ' + f.eventTime + '\n• Lugar: ' + f.location +
      '\n• ¿Contiene adjuntos?: ' + (f.hasAttachments ? 'Sí' : 'No') + '\n• Necesidades: ' + (f.needs.join(', ') || 'No especificado') +
      '\n• Objetivo/Comentarios: ' + (f.objective || 'Sin comentarios') +
      '\n--------------------------------------------------\n\nSaludos,\n\n--\n' + user.name + '\n' + user.role + '\nCampus ' + user.campus;
    return { subject: subject, body: body, attach: f.hasAttachments };
  }
  function buildCustomEmail() {
    const f = formState.custom;
    const subject = 'Otra Solicitud de Comunicación - ' + f.title;
    const body = 'Estimado equipo de Marketing,\n\nSolicitud de soporte de marketing y comunicación.\n\nDebajo toda la info recopilada:\n--------------------------------------------------\n' +
      '• Título: ' + f.title + '\n• Descripción: ' + f.description + '\n• Fecha de entrega deseada: ' + f.deadline +
      '\n• ¿Contiene adjuntos?: ' + (f.hasAttachments ? 'Sí' : 'No') +
      '\n--------------------------------------------------\n\nSaludos,\n\n--\n' + user.name + '\n' + user.role + '\nCampus ' + user.campus;
    return { subject: subject, body: body, attach: f.hasAttachments };
  }

  function successView(email) {
    const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=marketing@stgeorges.edu.ar&su=' + encodeURIComponent(email.subject) + '&body=' + encodeURIComponent(email.body);
    return '<div class="mk-success"><div class="mk-success-ico">' + I.check + '</div>' +
      '<h2 class="mk-h2">' + t('ready') + '</h2><p class="mk-sub">' + t('ready_sub') + '</p>' +
      (email.attach ? '<div class="mk-note">' + I.info + '<span><b>' + (lang === 'es' ? 'Recordatorio:' : 'Reminder:') + '</b> ' + (lang === 'es' ? 'indicaste que tenés adjuntos. Subílos manualmente cuando se abra Gmail.' : 'you indicated attachments. Upload them manually once Gmail opens.') + '</span></div>' : '') +
      '<div class="mk-success-actions">' +
      '<a class="mk-btn mk-btn-red" href="' + gmail + '" target="_blank" rel="noopener">' + I.mail + ' ' + t('open_gmail') + '</a>' +
      '<button class="mk-btn mk-btn-soft" data-copy-email="1">' + I.copy + ' ' + t('copy_body') + '</button>' +
      '</div><div class="mk-backbar"><button class="mk-linklike" data-act="menu">' + t('menu_back') + '</button></div></div>';
  }

  /* ---------- DRAFTING (AI chat) ---------- */
  let chat = null;
  let pendingMedia = null;
  let isRecording = false, mediaRec = null, recChunks = [], recSecs = 0, recInterval = null;
  const SYSTEM = "You are the Communications Assistant for St George's College. Help draft institutional communications aligned with the St George's voice, standards and community values.\n" +
    "OUTPUT: respond only with the final communication content first; no conversational intros, no 'Here is a proposal', no feedback inside the draft. Begin directly with the title or greeting. Write like an institutional communications writer.\n" +
    "VOICE: warm, professional, clear, organised, human, community-oriented; calm and reassuring. Avoid American English, neutral Spanish, robotic AI phrasing, overly dramatic writing, excessive exclamation marks/adjectives, 'school spirit', 'super excited', 'thrilled'. Use 'We are pleased to invite' / 'Nos alegra invitarlos'.\n" +
    "LANGUAGE: For families/external → British English FIRST, Argentinian Spanish SECOND. For internal staff → Argentinian Spanish FIRST, British English SECOND. Separate languages with '---'. Adapt naturally, never literal.\n" +
    "STYLE GUIDE: British English ('students','school','families'); Argentinian Spanish ('alumnos','colegio','uniforme del colegio'); 'Queremos informarles','Les pedimos por favor','Nos alegra contarles'; use masculine plural for families. Dates: Friday, 14 June. Time: 24h (15:30). Emojis moderate, as bullets, BEFORE the text. Bold ONLY for dates/times/required actions/deadlines. Always 'St George's College' (no dot after St).\n" +
    "FLOW: 1) If info is missing (what/who/where/when/how/why), ask professionally — start with '¿Qué te gustaría comunicar?'. 2) When drafting, split your reply with //--SPLIT--//: PART 1 = subject suggestion + greeting/title + bilingual body (Version1 --- Version2), nothing else; PART 2 = '¿El texto refleja lo que buscás o hay algo que quieras ajustar?'. 3) When the user confirms, reply with //--SPLIT--// parts: subject line; then [FINAL_CONTENT] pure bilingual body [/FINAL_CONTENT]; then '¿Hay algo más en lo que pueda ayudarte?'. Inside [FINAL_CONTENT] only the bilingual content. Authorised closings: 'Kind regards','Warm regards','Saludos cordiales'.\n" +
    "FORMATTING: write for chat display using simple markdown — short paragraphs separated by a blank line, '- ' for bullet points, **bold** only for key labels/dates/actions. Never use markdown headings (#) or tables. Keep messages concise and well spaced.\n";

  views.draft = function () {
    if (!chat) {
      const first = (user.name || '').split(' ')[0] || '';
      chat = [{ role: 'model', text: lang === 'es'
        ? '¡Hola ' + first + '! Soy tu **asistente de comunicaciones**. Puedo ayudarte a redactar comunicados institucionales — anuncios, invitaciones, recordatorios o cambios de procedimiento — en **inglés y español**, alineados con la voz de St George\'s.\n\nPara empezar, contame: ¿qué te gustaría comunicar?'
        : 'Hi ' + first + '! I\'m your **communications assistant**. I can help you draft institutional communications — announcements, invitations, reminders or procedure changes — in **English and Spanish**, aligned with the St George\'s voice.\n\nTo begin, tell me: what would you like to communicate?' }];
    }
    let h = '<div class="mk-chat"><div class="mk-chat-scroll" id="mk-chat-scroll">';
    chat.forEach(function (m, i) { h += bubble(m, i); });
    h += '</div><div class="mk-chat-input"><div id="mk-pend-zone"></div><div class="mk-chat-box">' +
      '<input type="file" id="mk-img-in" accept="image/*" style="display:none">' +
      '<button class="mk-chat-tool" id="mk-btn-img" title="' + (lang === 'es' ? 'Adjuntar imagen' : 'Attach image') + '">' + I.clip + '</button>' +
      '<button class="mk-chat-tool' + (isRecording ? ' mk-tool-rec' : '') + '" id="mk-btn-mic" title="' + (lang === 'es' ? 'Grabar audio' : 'Record audio') + '">' + (isRecording ? '<span class="mk-rec-dot"></span><span id="mk-rec-secs">' + recSecs + 's</span>' : I.mic) + '</button>' +
      '<textarea id="mk-chat-text" class="mk-chat-ta" rows="1" placeholder="' + (lang === 'es' ? 'Escribí tu respuesta…' : 'Type your reply…') + '"></textarea>' +
      '<button class="mk-chat-send" id="mk-chat-send">' + I.send + '</button></div>' +
      '<p class="mk-chat-hint">' + (lang === 'es' ? 'Enter para enviar · Shift+Enter nueva línea' : 'Enter to send · Shift+Enter new line') + '</p></div></div>';
    return h;
  };
  function bubble(m, i) {
    if (m.typing) return '<div class="mk-msg model"><div class="mk-bub model mk-typing"><span></span><span></span><span></span></div></div>';
    const isUser = m.role === 'user';
    let inner;
    const fm = m.text.match(/\[FINAL_CONTENT\]([\s\S]*?)\[\/FINAL_CONTENT\]/);
    if (fm) {
      const before = m.text.split('[FINAL_CONTENT]')[0].trim();
      const after = (m.text.split('[/FINAL_CONTENT]')[1] || '').trim();
      inner = (before ? '<div class="mk-bub-txt">' + mdToHtml(before) + '</div>' : '') +
        '<div class="mk-final">' + mdToHtml(fm[1].trim()) + '</div>' +
        (after ? '<div class="mk-bub-txt">' + mdToHtml(after) + '</div>' : '');
    } else {
      inner = '<div class="mk-bub-txt">' + mdToHtml(m.text) + '</div>';
    }
    let copyBtn = '';
    if (!isUser && i > 0 && /\[FINAL_CONTENT\]/.test(m.text)) {
      copyBtn = '<div class="mk-bub-foot"><button class="mk-copy-final" data-copy-msg="' + i + '">' + I.copy + ' ' + (lang === 'es' ? 'Copiar para FIDU/Email' : 'Copy for FIDU/Email') + '</button></div>';
    }
    let mediaPart = '';
    if (isUser && m.image && m.image.preview) mediaPart = '<div class="mk-bub-media"><img class="mk-bub-img" src="' + m.image.preview + '" alt=""></div>';
    if (isUser && m.audio && m.audio.preview) mediaPart = '<div class="mk-bub-media"><audio class="mk-bub-audio" src="' + m.audio.preview + '" controls></audio></div>';
    return '<div class="mk-msg ' + (isUser ? 'user' : 'model') + '"><div class="mk-bub ' + (isUser ? 'user' : 'model') + '">' + mediaPart + inner + copyBtn + '</div></div>';
  }
  async function sendChat() {
    const ta = document.getElementById('mk-chat-text');
    if (!ta) return;
    const val = ta.value.trim();
    if ((!val && !pendingMedia) || chat._busy) return;
    const msg = { role: 'user', text: val };
    if (pendingMedia) { msg[pendingMedia.type] = { mime: pendingMedia.mime, data: pendingMedia.data, preview: pendingMedia.preview }; pendingMedia = null; renderPendingZone(); }
    chat.push(msg);
    chat._busy = true;
    ta.value = ''; ta.style.height = 'auto';
    renderChatOnly(true);
    try {
      const msgs = chat.filter(function (m) { return !m.typing; }).map(function (m, idx, arr) {
        var o = { role: m.role === 'user' ? 'user' : 'model', text: m.text };
        if (idx === arr.length - 1) {
          if (m.image) o.image = { mime: m.image.mime, data: m.image.data };
          if (m.audio) o.audio = { mime: m.audio.mime, data: m.audio.data };
        }
        return o;
      }).slice(-14);
      let out;
      const remoteUrl = (window.TGN && window.TGN.config && window.TGN.config.remoteUrl) || '';
      if (remoteUrl) {
        out = await chatViaBackend(remoteUrl, msgs);
      } else if (window.claude && window.claude.complete) {
        const convo = msgs.map(function (m) { return (m.role === 'user' ? 'Usuario' : 'Asistente') + ': ' + m.text; }).join('\n\n');
        out = await window.claude.complete(SYSTEM + '\nDatos del usuario — Nombre: ' + user.name + ', Campus: ' + user.campus + ', Rol: ' + user.role + '.\n\n[Conversación]\n' + convo + '\n\nAsistente:');
      } else {
        throw new Error('no-backend');
      }
      const parts = String(out || '').split('//--SPLIT--//').map(function (p) { return p.trim(); }).filter(Boolean);
      if (parts.length > 1) parts.forEach(function (p) { chat.push({ role: 'model', text: p }); });
      else chat.push({ role: 'model', text: out || (lang === 'es' ? 'No pude generar una respuesta. Probá de nuevo.' : 'Could not generate a reply. Try again.') });
    } catch (e) {
      const friendly = (e && e.friendly) ? e.friendly : '';
      chat.push({ role: 'model', text: friendly || (lang === 'es' ? 'Hubo un error al procesar. Probá de nuevo.' : 'There was an error. Please try again.') });
    } finally {
      chat._busy = false;
      renderChatOnly(false);
    }
  }
  /* POST to the Apps Script backend. text/plain avoids a CORS preflight and
     Apps Script serves the redirected response with CORS *, so the JSON result
     is readable — no JSONP URL-length limit, full conversations travel fine. */
  function chatViaBackend(remoteUrl, msgs) {
    const ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    const timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 45000) : null;
    return fetch(remoteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'chat', messages: msgs, user: { name: user.name, campus: user.campus, role: user.role } }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (timer) clearTimeout(timer);
      if (data && data.ok && data.text) return data.text;
      const err = new Error((data && data.error) || 'backend');
      err.friendly = (data && data.text) || '';
      throw err;
    }).catch(function (e) {
      if (timer) clearTimeout(timer);
      throw e;
    });
  }
  function renderChatOnly(typing) {
    const scroll = document.getElementById('mk-chat-scroll');
    if (!scroll) return;
    let h = '';
    chat.forEach(function (m, i) { h += bubble(m, i); });
    if (typing) h += bubble({ typing: true }, -1);
    scroll.innerHTML = h;
    scroll.scrollTop = scroll.scrollHeight;
    bindChatCopies();
    const ta = document.getElementById('mk-chat-text'); if (ta && !typing) { ta.value = ''; ta.style.height = 'auto'; ta.focus(); }
  }
  function bindChatCopies() {
    document.querySelectorAll('[data-copy-msg]').forEach(function (b) {
      b.addEventListener('click', function () {
        const m = chat[+b.getAttribute('data-copy-msg')];
        const fm = m.text.match(/\[FINAL_CONTENT\]([\s\S]*?)\[\/FINAL_CONTENT\]/);
        copyText(fm ? fm[1].trim() : m.text, b, lang === 'es' ? '✨ ¡Copiado!' : '✨ Copied!');
      });
    });
  }

  /* ---------- COPY ---------- */
  function copyText(text, btn, okLabel) {
    const done = function () { if (btn) { const o = btn.innerHTML; btn.innerHTML = okLabel || (I.check + ' ' + t('copied')); btn.classList.add('ok'); setTimeout(function () { btn.innerHTML = o; btn.classList.remove('ok'); }, 1800); } };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done).catch(fallback); }
    else fallback();
    function fallback() { try { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); } catch (e) {} }
  }

  /* ---------- BIND ---------- */
  function bind() {
    root.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        const a = b.getAttribute('data-act');
        if (a === 'back') back();
        else if (a === 'menu') toMenu();
        else if (a === 'reset') { localStorage.removeItem('tgn-mkt-user'); user = { name: '', campus: '', role: '' }; step = 'id'; history = []; render(); }
        else if (a === 'send-event') { if (validateEvent()) { formState._sent = 'event'; render(); } }
        else if (a === 'send-custom') { if (validateCustom()) { formState._sent = 'custom'; render(); } }
      });
    });
    root.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { go(b.getAttribute('data-go')); });
    });

    if (step === 'id') bindId();
    if (step === 'event' && formState._sent !== 'event') bindForm('event');
    if (step === 'custom' && formState._sent !== 'custom') bindForm('custom');
    if (step === 'palette') root.querySelectorAll('[data-copy]').forEach(function (r) { r.addEventListener('click', function () { copyText(r.getAttribute('data-copy'), r.querySelector('.mk-pal-row-v'), null); }); });
    if (step === 'draft') bindChat();
    root.querySelectorAll('[data-copy-email]').forEach(function (b) {
      b.addEventListener('click', function () { const email = formState._sent === 'event' ? buildEventEmail() : buildCustomEmail(); copyText(email.body, b, I.check + ' ' + t('copied')); });
    });
  }

  function bindId() {
    const nameEl = root.querySelector('#mk-name'), roleEl = root.querySelector('#mk-role');
    root.querySelectorAll('[data-campus]').forEach(function (b) {
      b.addEventListener('click', function () { user.campus = b.getAttribute('data-campus'); render(); root.querySelector('#mk-name').focus(); });
    });
    const cont = root.querySelector('#mk-continue');
    cont.addEventListener('click', function () {
      user.name = (nameEl.value || '').trim(); user.role = (roleEl.value || '').trim();
      if (!user.name || !user.role || !user.campus) { if (!user.name) nameEl.focus(); else if (!user.role) roleEl.focus(); cont.classList.add('shake'); setTimeout(function () { cont.classList.remove('shake'); }, 400); return; }
      localStorage.setItem('tgn-mkt-user', JSON.stringify(user)); toMenu();
    });
    [nameEl, roleEl].forEach(function (el) { el.addEventListener('input', function () { user[el === nameEl ? 'name' : 'role'] = el.value; }); });
  }

  function bindForm(which) {
    const f = formState[which];
    root.querySelectorAll('[data-f]').forEach(function (el) { el.addEventListener('input', function () { f[el.getAttribute('data-f')] = el.value; }); });
    root.querySelectorAll('[data-need]').forEach(function (b) {
      b.addEventListener('click', function () { const n = b.getAttribute('data-need'); const idx = f.needs.indexOf(n); if (idx > -1) f.needs.splice(idx, 1); else f.needs.push(n); b.classList.toggle('on'); });
    });
    root.querySelectorAll('[data-yn]').forEach(function (b) {
      b.addEventListener('click', function () { f.hasAttachments = b.getAttribute('data-yn') === '1'; root.querySelectorAll('[data-yn]').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); });
    });
  }
  function validateEvent() { const f = formState.event; if (!f.eventName || !f.location || !f.eventDate || !f.eventTime) { flash(); return false; } return true; }
  function validateCustom() { const f = formState.custom; if (!f.title || !f.description || !f.deadline) { flash(); return false; } return true; }
  function flash() { const b = root.querySelector('.mk-btn-navy'); if (b) { b.classList.add('shake'); setTimeout(function () { b.classList.remove('shake'); }, 400); } }

  function bindChat() {
    const ta = document.getElementById('mk-chat-text'), send = document.getElementById('mk-chat-send'), scroll = document.getElementById('mk-chat-scroll');
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
    bindChatCopies();
    if (ta) {
      ta.addEventListener('input', function () { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'; });
      ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } });
    }
    if (send) send.addEventListener('click', sendChat);
    bindChatMedia();
    renderPendingZone();
  }
  function bindChatMedia() {
    const imgIn = document.getElementById('mk-img-in');
    const btnImg = document.getElementById('mk-btn-img');
    const btnMic = document.getElementById('mk-btn-mic');
    if (btnImg && imgIn) {
      btnImg.addEventListener('click', function () { imgIn.click(); });
      imgIn.addEventListener('change', function () {
        const file = imgIn.files && imgIn.files[0];
        if (!file) return;
        if (file.size > 4 * 1024 * 1024) { alert(lang === 'es' ? 'La imagen no puede superar 4 MB.' : 'Image must be under 4 MB.'); imgIn.value = ''; return; }
        const fr = new FileReader();
        fr.onload = function (e) {
          pendingMedia = { type: 'image', mime: file.type || 'image/jpeg', data: e.target.result.split(',')[1], preview: e.target.result };
          renderPendingZone();
        };
        fr.readAsDataURL(file);
        imgIn.value = '';
      });
    }
    if (btnMic) {
      btnMic.addEventListener('click', function () { if (!isRecording) startRecording(); else stopRecording(); });
    }
  }
  function renderPendingZone() {
    const zone = document.getElementById('mk-pend-zone');
    if (!zone) return;
    if (!pendingMedia) { zone.innerHTML = ''; return; }
    if (pendingMedia.type === 'image') {
      zone.innerHTML = '<div class="mk-pend-media"><img class="mk-pend-img" src="' + pendingMedia.preview + '" alt=""><button class="mk-pend-clear" id="mk-pend-clear">&#10005;</button></div>';
    } else {
      zone.innerHTML = '<div class="mk-pend-media"><audio class="mk-pend-audio" src="' + pendingMedia.preview + '" controls></audio><button class="mk-pend-clear" id="mk-pend-clear">&#10005;</button></div>';
    }
    const clr = document.getElementById('mk-pend-clear');
    if (clr) clr.addEventListener('click', function () { pendingMedia = null; zone.innerHTML = ''; });
  }
  function updateMicBtn() {
    const btn = document.getElementById('mk-btn-mic');
    if (!btn) return;
    if (isRecording) {
      btn.classList.add('mk-tool-rec');
      btn.innerHTML = '<span class="mk-rec-dot"></span><span id="mk-rec-secs">' + recSecs + 's</span>';
    } else {
      btn.classList.remove('mk-tool-rec');
      btn.innerHTML = I.mic;
    }
  }
  function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(lang === 'es' ? 'Tu navegador no soporta grabación de audio.' : 'Your browser does not support audio recording.');
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      const mime = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) ? 'audio/webm;codecs=opus' : 'audio/webm';
      mediaRec = new MediaRecorder(stream, { mimeType: mime });
      recChunks = []; recSecs = 0;
      mediaRec.ondataavailable = function (e) { if (e.data && e.data.size > 0) recChunks.push(e.data); };
      mediaRec.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        clearInterval(recInterval); recInterval = null;
        const baseMime = mime.split(';')[0];
        const blob = new Blob(recChunks, { type: baseMime });
        const url = URL.createObjectURL(blob);
        const fr = new FileReader();
        fr.onload = function (ev) {
          pendingMedia = { type: 'audio', mime: baseMime, data: ev.target.result.split(',')[1], preview: url };
          isRecording = false;
          updateMicBtn();
          renderPendingZone();
        };
        fr.readAsDataURL(blob);
      };
      mediaRec.start(200);
      isRecording = true;
      updateMicBtn();
      recInterval = setInterval(function () {
        recSecs++;
        const el = document.getElementById('mk-rec-secs');
        if (el) el.textContent = recSecs + 's';
        if (recSecs >= 120) stopRecording();
      }, 1000);
    }).catch(function () {
      alert(lang === 'es' ? 'No se pudo acceder al micrófono.' : 'Could not access the microphone.');
    });
  }
  function stopRecording() {
    if (mediaRec && mediaRec.state !== 'inactive') mediaRec.stop();
  }

  /* ---------- MOUNT ---------- */
  function mount(container, language) {
    root = container; lang = language || 'es';
    step = 'menu';
    render();
  }
  window.MKT = { mount: mount };
  window.MKT_DEFAULTS = { presentations: DEFAULT_PRESENTATIONS, documents: DEFAULT_DOCUMENTS, designs: DEFAULT_CANVA };
})();
