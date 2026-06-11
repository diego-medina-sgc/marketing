/* ============================================================
   The Georgian Network — Content (bilingual EN / ES)
   ============================================================ */

/* UI chrome strings */
const I18N = {
  en: {
    net_sub: 'Staff Intranet',
    search: 'Search the network…',
    live: 'Live',
    nav_label: 'Navigation',
    theme: 'Theme',
    updated: 'Network updated · Oct 2025',
    read_more: 'Read more',
    view_all: 'View all',
    apply: 'Apply by email',
    open: 'Open',
    open_folder: 'Open Drive folder',
    contact_us: 'Contact us',
    nav: {
      home: 'Home', policies: 'Policies', resources: 'Resources',
      admissions: 'Admissions', marketing: 'Marketing'
    }
  },
  es: {
    net_sub: 'Intranet del Staff',
    search: 'Buscar en la red…',
    live: 'En vivo',
    nav_label: 'Navegación',
    theme: 'Tema',
    updated: 'Red actualizada · Oct 2025',
    read_more: 'Leer más',
    view_all: 'Ver todo',
    apply: 'Postular por email',
    open: 'Abrir',
    open_folder: 'Abrir carpeta de Drive',
    contact_us: 'Contacto',
    nav: {
      home: 'Inicio', policies: 'Políticas', resources: 'Recursos',
      admissions: 'Admisiones', marketing: 'Marketing'
    }
  }
};

/* shared image fallback gradient handled in CSS via onerror */
const NEWS = [
  {
    id: 'founders',
    cat: { en: 'Community', es: 'Comunidad' }, catColor: 'red',
    date: { en: 'Sat 4 October', es: 'Sáb 4 de octubre' },
    img: 'https://lh3.googleusercontent.com/sitesv/AA5AbUBU6kVz-RnVcjvU9_jjx03xsH_4PHPswsLGdmu22I-BCcGXJ443R8PSKvXPvh0IOm9MMRnITXFxbvo7X9RoO9k2zlzcwLfJIhL-B7Lr6fzV9w9pe2u2IopgMQYIRmk46oVHEcxGRvq2hAQdpHWvqM8OHLXH9yZmfLTuVwtDxNBefbwSC7KV05i1-J0673Y6P8oQghSutoK_xQrl024gXi-BxW6GZOpkaLGQetzkAKA=w1280',
    sign: { en: 'Roberto Prata · Interim Headmaster', es: 'Roberto Prata · Headmaster Interino' },
    title: {
      en: "Let's All Enjoy Founders' Day Together!",
      es: '¡Disfrutemos juntos el Founders\u2019 Day!'
    },
    excerpt: {
      en: "On Saturday 4th October we celebrate Founders' Day — a special occasion to connect with our community and strengthen the St George's spirit.",
      es: 'El sábado 4 de octubre celebramos el Founders\u2019 Day, una ocasión especial para conectar con nuestra comunidad y fortalecer el espíritu St George\u2019s.'
    },
    body: {
      en: "<p>Dear Team,</p><p>On <b>Saturday, 4th October</b>, we celebrate Founders' Day, a special occasion to connect with our community and strengthen the St George's spirit. This is an official working day: please arrive by <b>8:00 a.m.</b> and you may leave after Prize Giving.</p><p>The day ends with the traditional <b>Tea on the Headmaster's Lawn</b>, to which everyone is invited. There will be sports, music, and various activities.</p><p>Staff not involved with student events are encouraged to voluntarily support an activity <a href='https://docs.google.com/forms/d/e/1FAIpQLSe7AQaQ4Ymi_ZonzCc2V3Q9aavXafxVfKDUP--cz1-oRIuotA/viewform' target='_blank' rel='noopener'>here</a>.</p><p>Let's make it a memorable day together!</p>",
      es: '<p>Estimado equipo,</p><p>El <b>sábado 4 de octubre</b> celebramos el Founders\u2019 Day, una ocasión especial para conectar con nuestra comunidad y fortalecer el espíritu St George\u2019s. Es un día laboral oficial: por favor lleguen antes de las <b>8:00 a.m.</b> y podrán retirarse después del Prize Giving.</p><p>El día cierra con el tradicional <b>Tea on the Headmaster\u2019s Lawn</b>, al que todos están invitados. Habrá deportes, música y diversas actividades.</p><p>Quienes no estén a cargo de actividades con alumnos pueden ofrecerse como voluntarios para apoyar una actividad <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7AQaQ4Ymi_ZonzCc2V3Q9aavXafxVfKDUP--cz1-oRIuotA/viewform" target="_blank" rel="noopener">acá</a>.</p><p>¡Hagamos juntos un día memorable!</p>'
    }
  },
  {
    id: 'app-launch',
    cat: { en: 'Announcement', es: 'Anuncio' }, catColor: 'teal',
    date: { en: 'August', es: 'Agosto' },
    img: 'https://lh3.googleusercontent.com/sitesv/AA5AbUCLPkqcXzjoTSyQKPr98JoX5fNO6hbNAfTZzmXB_oqNlqNdBDAP-zM_db8ehEuTTpuKD6EUrJ0DT18IpVgxc4c2l27yYZ3MBD08jsBpOF5BmIPQOTFeMxVTnwjuZVrObdBiQa9dErrE_3vsCo747m7Kr8MzNZVsvG8p9lG--tmw9T1O2wiyszZzoj_ESVlrYhba-OzVPh1p9V9q49Ff42BIBB5rQMYAhWLTjx7Fb-g=w1280',
    sign: { en: 'Marketing & Communications', es: 'Marketing y Comunicación' },
    title: {
      en: 'Official App Launch',
      es: 'Lanzamiento oficial de la App'
    },
    excerpt: {
      en: 'From Monday, all communications with families will be sent exclusively through the St George\u2019s College App. Keep it open and check notifications.',
      es: 'Desde el lunes, todas las comunicaciones con las familias se enviarán exclusivamente por la App de St George\u2019s College. Mantenela abierta y revisá las notificaciones.'
    },
    body: {
      en: "<p>Dear Team,</p><p>We are excited to officially launch the <b>St George's College App</b> 🎉. Starting Monday, all communications with families will be sent exclusively through the app. Please remember to:</p><ul><li>Keep the app open and check notifications</li><li>Communicate with parents via the app</li><li>Post content in your assigned groups</li><li>Redirect any parent emails to the app</li></ul><p>You can find the User Guide, policies, and procedures on the intranet for any questions.</p><p><a href='https://app.fidu.la/login' target='_blank' rel='noopener'>Download the app here</a></p>",
      es: '<p>Estimado equipo,</p><p>Nos entusiasma lanzar oficialmente la <b>App de St George\u2019s College</b> 🎉. A partir del lunes, todas las comunicaciones con las familias se enviarán exclusivamente por la app. Recordá:</p><ul><li>Mantener la app abierta y revisar las notificaciones</li><li>Comunicarte con las familias por la app</li><li>Publicar contenido en tus grupos asignados</li><li>Redirigir cualquier email de familias a la app</li></ul><p>Encontrarás la Guía de Usuario, políticas y procedimientos en la intranet ante cualquier duda.</p><p><a href="https://app.fidu.la/login" target="_blank" rel="noopener">Descargá la app acá</a></p>'
    }
  },
  {
    id: 'steeplechase',
    cat: { en: 'Event', es: 'Evento' }, catColor: 'navy',
    date: { en: 'Save the date', es: 'Agendá la fecha' },
    img: 'https://lh3.googleusercontent.com/sitesv/AA5AbUB7FdV5Qr1QQpyAaJuIdC77lEGrl3cgmNDXglmSPRnCLypZR-q_BU5YBbs2u_6L8eSBqko-YS2lO9HsNqOuHjF03mtO6NhfZ787Lv126GGmsImqVxNr9j8_r764vu3eVwu9yNe6KIdfLngqUpBk7T9oZ0RK2SYmrVQzF_kPjwsFdbLEaGLIWC1IjzPg3qBwMFQ97pWYb8G6S2kqmNp2MYDkz8AaOnN2Dz7cU62wAVw=w1280',
    sign: { en: 'Sports Department', es: 'Departamento de Deportes' },
    title: {
      en: 'Steeplechase & Cross Country — Save the Date!',
      es: 'Steeplechase & Cross Country — ¡Agendá la fecha!'
    },
    excerpt: {
      en: "It's time to run again! More than a race, it's a symbol of community, spirit, and shared heritage. Choose how to register.",
      es: '¡Es momento de volver a correr! Más que una carrera, es un símbolo de comunidad, espíritu y herencia compartida. Elegí cómo inscribirte.'
    },
    body: {
      en: "<p>It's time to run again! More than a race, it's a symbol of community, spirit, and shared heritage. This year, you can choose how to register:</p><ul><li><b>Free</b> – participate at no cost</li><li><b>Runner's Kit ($35,000)</b> – includes official T-shirt & reusable bottle</li></ul><p>Bring your own bottle to help reduce plastic and support sustainability. Join us and be part of our tradition!</p><p><a href='https://docs.google.com/forms/d/e/1FAIpQLSfuvWGM6B0Jvb6WyC2QB1Hxjn-Qy9-s27M9sDwgcxzgJMsolQ/viewform' target='_blank' rel='noopener'>Want to run? Register here</a></p>",
      es: '<p>¡Es momento de volver a correr! Más que una carrera, es un símbolo de comunidad, espíritu y herencia compartida. Este año podés elegir cómo inscribirte:</p><ul><li><b>Gratis</b> – participá sin costo</li><li><b>Kit del Corredor ($35.000)</b> – incluye remera oficial y botella reutilizable</li></ul><p>Traé tu propia botella para reducir el plástico y apoyar la sustentabilidad. ¡Sumate y sé parte de nuestra tradición!</p><p><a href="https://docs.google.com/forms/d/e/1FAIpQLSfuvWGM6B0Jvb6WyC2QB1Hxjn-Qy9-s27M9sDwgcxzgJMsolQ/viewform" target="_blank" rel="noopener">¿Querés correr? Inscribite acá</a></p>'
    }
  },
  {
    id: 'app-trial',
    cat: { en: 'Announcement', es: 'Anuncio' }, catColor: 'teal',
    date: { en: 'Trial phase', es: 'Fase de prueba' },
    img: '',
    sign: { en: 'IT & Marketing', es: 'IT y Marketing' },
    title: {
      en: "St George's College App Launch — Trial Phase",
      es: 'Lanzamiento de la App — Fase de prueba'
    },
    excerpt: {
      en: 'We have entered the trial phase of our new app, with the official launch set for August 14. Begin exploring its features and testing posts.',
      es: 'Entramos en la fase de prueba de la nueva app, con lanzamiento oficial el 14 de agosto. Empezá a explorar sus funciones y a probar publicaciones.'
    },
    body: {
      en: "<p>We are pleased to inform you that we've entered the <b>trial phase</b> of our new app, with the official launch set for <b>August 14</b>. Starting that day, all school communications will be managed through the app.</p><p>We invite staff to begin exploring its features, checking permissions, and testing posts and messages. This step is essential to ensure a smooth launch.</p><p>We truly appreciate your cooperation and patience!</p>",
      es: '<p>Nos complace informarles que entramos en la <b>fase de prueba</b> de la nueva app, con lanzamiento oficial el <b>14 de agosto</b>. A partir de ese día, todas las comunicaciones del colegio se gestionarán por la app.</p><p>Invitamos al staff a explorar sus funciones, verificar permisos y probar publicaciones y mensajes. Este paso es esencial para asegurar un lanzamiento sin problemas.</p><p>¡Agradecemos mucho su colaboración y paciencia!</p>'
    }
  }
];

/* Birthdays — December. dept codes: P Prep · S Secondary · M Mgmt/Admin · Bd Boarding · EF PE */
const DEPTS = [
  { v: 'A', l: 'Administración' },
  { v: 'Bd', l: 'Boarding House' },
  { v: 'C', l: 'Catequesis' },
  { v: 'Coun', l: 'School Counsellor' },
  { v: 'EF', l: 'Educación Física' },
  { v: 'G', l: 'Guardería' },
  { v: 'Gu', l: 'Guardavida' },
  { v: 'H', l: 'Headmaster' },
  { v: 'IC', l: 'Isams Coordinator' },
  { v: 'ICT', l: 'ICT' },
  { v: 'K', l: 'Kindergarten' },
  { v: 'L', l: 'Library' },
  { v: 'M', l: 'Maestranza' },
  { v: 'MKT', l: 'Marketing & Admissions' },
  { v: 'P', l: 'Primary' },
  { v: 'Pr', l: 'Principal' },
  { v: 'PS', l: 'Psicología' },
  { v: 'S', l: 'Secondary' },
  { v: 'San', l: 'Sanatorio' },
  { v: 'SC', l: 'Sports Club' },
  { v: 'Sh', l: 'Shop' },
  { v: 'TA', l: 'Teaching Assistant' },
  { v: 'The', l: 'Teatro' },
  { v: 'EOE', l: 'Equipo de Orientación Escolar' }
];
/* campus: q = Quilmes (red) · n = North (navy) · one = One School (ink).
   NOTE: campus values below are placeholders — edit each person's campus
   in the Back Office so the colour coding is accurate. */
const BIRTHDAYS = [
  { d: 1,  m: 6, name: 'Antón, Laura',           dept: 'P',   campus: 'q' },
  { d: 1,  m: 6, name: 'Pigun, Brenda',          dept: 'EF',  campus: 'q' },
  { d: 1,  m: 6, name: 'Grisolia, Samantha',     dept: 'P',   campus: 'q' },
  { d: 2,  m: 6, name: 'Suarez, Monica',         dept: 'M',   campus: 'one' },
  { d: 2,  m: 6, name: 'Barreto, Florencia',     dept: 'S',   campus: 'n' },
  { d: 3,  m: 6, name: 'De Gregorio, Mariela',   dept: 'P',   campus: 'q' },
  { d: 4,  m: 6, name: 'Santana, Verónica',      dept: 'K',   campus: 'n' },
  { d: 4,  m: 6, name: 'Aleso, Facundo',         dept: 'S',   campus: 'n' },
  { d: 4,  m: 6, name: 'Souza, Mariela',         dept: 'A',   campus: 'q' },
  { d: 5,  m: 6, name: 'Suarez, Gonzalo',        dept: 'EF',  campus: 'q' },
  { d: 7,  m: 6, name: 'Lobo, Francisco',        dept: 'M',   campus: 'one' },
  { d: 7,  m: 6, name: 'Cebey, Diego',           dept: 'EF',  campus: 'q' },
  { d: 9,  m: 6, name: 'Milana, Victor',         dept: 'A',   campus: 'q' },
  { d: 9,  m: 6, name: 'Filipe Martins, Eloisa', dept: 'K',   campus: 'n' },
  { d: 10, m: 6, name: 'Doxat, Connie',          dept: 'TA',  campus: 'one' },
  { d: 11, m: 6, name: 'Silva, Paula',           dept: 'S',   campus: 'n' },
  { d: 12, m: 6, name: 'Casas, Fabián',          dept: 'ICT', campus: 'n' },
  { d: 13, m: 6, name: 'Rojo, José',             dept: 'ICT', campus: 'n' },
  { d: 14, m: 6, name: 'Lettieri, Jesica',       dept: 'S',   campus: 'n' },
  { d: 15, m: 6, name: 'Gibson, Flora',          dept: 'P',   campus: 'q' },
  { d: 15, m: 6, name: 'Mazzini, Lautaro',       dept: 'S',   campus: 'n' },
  { d: 15, m: 6, name: 'Rossini, Lucila',        dept: 'K',   campus: 'n' },
  { d: 15, m: 6, name: 'Alberti, Victoria',      dept: 'S',   campus: 'n' },
  { d: 16, m: 6, name: 'Estrada, Eva',           dept: 'M',   campus: 'one' },
  { d: 16, m: 6, name: 'Welschbillig, Dora',     dept: 'EF',  campus: 'q' },
  { d: 18, m: 6, name: 'Molachino, M. Paz',      dept: 'K',   campus: 'n' },
  { d: 20, m: 6, name: 'Díaz, Gerardo',          dept: 'M',   campus: 'one' },
  { d: 21, m: 6, name: 'Serrano, Milton',        dept: 'M',   campus: 'one' },
  { d: 23, m: 6, name: 'Raffaelli, Candela',     dept: 'K',   campus: 'n' },
  { d: 23, m: 6, name: 'Godoy, Iván',            dept: 'A',   campus: 'q' },
  { d: 24, m: 6, name: 'Taboada, Juan Pablo',    dept: 'EF',  campus: 'q' },
  { d: 24, m: 6, name: 'Whitney, Lynn',          dept: 'A',   campus: 'q' },
  { d: 24, m: 6, name: 'Rojas, Osvaldo',         dept: 'M',   campus: 'one' },
  { d: 24, m: 6, name: 'Sciuso, Lucía',          dept: 'S',   campus: 'n' },
  { d: 25, m: 6, name: 'Balmaceda, Romina',      dept: 'S',   campus: 'n' },
  { d: 25, m: 6, name: 'Tristan, Jacob',         dept: 'S',   campus: 'n' },
  { d: 25, m: 6, name: 'Rojas, Juan',            dept: 'M',   campus: 'one' },
  { d: 25, m: 6, name: 'Molachino, Romina',      dept: 'P',   campus: 'q' },
  { d: 28, m: 6, name: 'Cardoso, Viviana',       dept: 'M',   campus: 'one' },
  { d: 29, m: 6, name: 'Belloso, M. Sol',        dept: 'K',   campus: 'n' },
  { d: 29, m: 6, name: 'Tangorra, Agustín',      dept: 'EOE', campus: 'q' },
  { d: 30, m: 6, name: 'Ciriani, Yanina',        dept: 'S',   campus: 'n' }
];

const VACANCIES = [
  {
    campus: 'q', isNew: true,
    title: { en: 'Biology Teacher', es: 'Profesor/a de Biología' },
    site: { en: 'Quilmes · Secondary · 2026', es: 'Quilmes · Secundaria · 2026' },
    desc: {
      en: 'A dedicated and inspiring Biology Teacher for Secondary School starting in 2026. Bilingual, with a degree and practical experience, and IB experience. Applicants with a Chemistry background will be highly considered.',
      es: 'Profesor/a de Biología dedicado/a e inspirador/a para Secundaria a partir de 2026. Bilingüe, con título y experiencia práctica, y experiencia en IB. Se valorará especialmente formación en Química.'
    },
    email: 'jobs.rrhh@stgeorges.edu.ar',
    contact: 'Cindy López'
  },
  {
    campus: 'q', isNew: true,
    title: { en: 'Kinder Teacher', es: 'Maestro/a de Kínder' },
    site: { en: 'Quilmes · Kinder', es: 'Quilmes · Kínder' },
    desc: {
      en: 'A dedicated and inspiring Kinder Teacher for our Quilmes site. Qualified, with a degree and practical experience. Bilingual candidates with PYP experience will be highly considered.',
      es: 'Maestro/a de Kínder dedicado/a e inspirador/a para nuestra sede de Quilmes. Titulado/a, con experiencia práctica. Se valorará perfil bilingüe con experiencia en PYP.'
    },
    email: 'jobs.rrhh@stgeorges.edu.ar',
    contact: 'Cindy López'
  },
  {
    campus: 'q', isNew: false,
    title: { en: 'Finance & Administration Leader', es: 'Líder de Finanzas y Administración' },
    site: { en: 'Quilmes · Min. 4 days on-site', es: 'Quilmes · Mín. 4 días presencial' },
    desc: {
      en: 'A proactive, detail-oriented Public Accountant to support financial and administrative operations across Treasury, Accounting, Planning, Internal Controls, Systems and General Administration. Fluent English and comfort with technology essential.',
      es: 'Contador/a Público/a proactivo/a y detallista para apoyar operaciones financieras y administrativas en Tesorería, Contabilidad, Planeamiento, Controles Internos, Sistemas y Administración General. Inglés fluido y manejo de tecnología, esenciales.'
    },
    email: 'jobs.rrhh@stgeorges.edu.ar',
    contact: 'Cindy López'
  }
];

const EXTENSIONS = [
  { campus: 'q', label: { en: 'Quilmes', es: 'Quilmes' }, name: { en: 'Internal directory 2024', es: 'Listado de internos 2024' }, url: '#' },
  { campus: 'n', label: { en: 'North', es: 'North' }, name: { en: 'Internal directory 2024', es: 'Listado de internos 2024' }, url: '#' }
];

const MENUS = [
  { campus: 'q', label: { en: 'Quilmes', es: 'Quilmes' }, name: { en: 'Dining hall menu', es: 'Menú del comedor' }, url: 'https://docs.google.com/spreadsheets/d/10BfywG4-lwHkB5BjkJ2YR9j5r5ueE4bZ/edit' },
  { campus: 'n', label: { en: 'North', es: 'North' }, name: { en: 'Dining hall menu', es: 'Menú del comedor' }, url: 'https://docs.google.com/spreadsheets/d/1pxC8GWFwV32mH2001q_KAzaBJ_glajMe/edit' }
];

/* ─── RESOURCES ─── */
const QUICK_LINKS = [
  { abbr: 'iS', name: 'iSAMS · Parents',  desc: { en: 'Parents portal',          es: 'Portal de familias' },       url: 'https://stgeorgescollege.parents.isamshosting.cloud/',          accent: 'var(--navy)',   img: 'assets/isams parents.jpg' },
  { abbr: 'iS', name: 'iSAMS · Teacher',  desc: { en: 'Staff framework',          es: 'Framework del staff' },      url: 'https://stgeorgescollege.isamshosting.cloud/main/framework',     accent: 'var(--navy)',   img: 'assets/isams teacher.jpg' },
  { abbr: 'iS', name: 'iSAMS · Students', desc: { en: 'Students homepage',        es: 'Inicio de alumnos' },        url: 'https://stgeorgescollege.students.isamshosting.cloud/api/homepage/', accent: 'var(--navy)', img: 'assets/isams student.jpg' },
  { abbr: 'Mb', name: 'ManageBac',        desc: { en: 'IB management',            es: 'Gestión IB' },          url: 'https://stgeorges.managebac.com/login',                          accent: 'var(--teal)',   img: 'assets/managebac.jpg' },
  { abbr: 'Td', name: 'Toddle',           desc: { en: 'Teaching & learning',      es: 'Enseñanza y aprendizaje' }, url: 'https://web.toddleapp.com/?type=loginHome',                 accent: 'var(--violet)' },
  { abbr: 'SG', name: "St George's App",  desc: { en: 'Family communications',    es: 'Comunicación con familias' }, url: 'https://app.fidu.la/login',                              accent: 'var(--red)',    img: 'assets/st georges college app.png' },
  { abbr: '$',  name: 'Payslip Portal',   desc: { en: 'Portia · payroll',    es: 'Portia · liquidaciones' }, url: 'https://stgeorges.aj5portia.com.ar/index.aspx',              accent: 'var(--green)', img: 'assets/portal de recibos.png' }
];

const TOOL_GROUPS = [
  { name: { en: 'Whole School', es: 'Todo el colegio' }, accent: 'var(--ink)', links: [
    { name: 'Twinkl', url: 'https://www.twinkl.ar/' }
  ]},
  { name: { en: 'Kinder', es: 'Kínder' }, accent: 'var(--celeste)', links: [
    { name: 'Wordwall', url: 'https://wordwall.net/es/account/login' }
  ]},
  { name: { en: 'Prep School', es: 'Prep School' }, accent: 'var(--teal)', links: [
    { name: 'Epic!', url: 'https://www.getepic.com/sign-in' },
    { name: 'Genially', url: 'https://genially.com/es/' },
    { name: 'Loqueleo', url: 'https://www.loqueleo.com/ar/' },
    { name: 'Oxford Reading Buddy', url: 'https://www.oxfordreadingbuddy.com/uk' },
    { name: 'Padlet', url: 'https://padlet.com/auth/login' }
  ]},
  { name: { en: 'College', es: 'College' }, accent: 'var(--navy)', links: [
    { name: 'Teachit.co.uk', url: 'http://teachit.co.uk/' },
    { name: 'TheoryofKnowledge.net', url: 'http://theoryofknowledge.net' },
    { name: 'Toddle', url: 'https://web.toddleapp.com/?type=loginHome' },
    { name: 'Turnitin', url: 'https://www.turnitin.com/login_page.asp?lang=es' },
    { name: 'Kognity', url: 'https://app.kognity.com/' }
  ]}
];

/* ─── PAGE TEXTS ─── */
const PAGES = {
  policies: {
    kicker: { en: 'Institutional', es: 'Institucional' },
    title: { en: 'Policies & Procedures', es: 'Políticas y Procedimientos' },
    sub: { en: 'Key policies that guide our operations', es: 'Políticas clave que guían nuestras operaciones' },
    intro: {
      en: "Here we share key <b>policies and procedures</b> that guide our operations and help us maintain an organised, transparent environment aligned with the values of St George's College. We invite you to review these policies, which are essential to the smooth functioning of our educational community.",
      es: 'Acá compartimos las <b>políticas y procedimientos</b> clave que guían nuestras operaciones y nos ayudan a mantener un entorno organizado y transparente, alineado con los valores de St George\u2019s College. Te invitamos a revisarlas: son esenciales para el buen funcionamiento de nuestra comunidad educativa.'
    },
    folderId: '1oRXYKK-4k8Od3Mc7GibC6n9eEMmVHlP7'
  },
  resources: {
    kicker: { en: 'Tools & links', es: 'Herramientas y enlaces' },
    title: { en: 'Resources', es: 'Recursos' },
    sub: { en: 'Quick access to the platforms you use every day', es: 'Acceso rápido a las plataformas que usás cada día' },
    isamsNote: {
      en: "If you'd like to learn more about iSAMS, refer to the tutorial <a href='https://www.youtube.com/playlist?list=PL-lAXIYISnu-TX2hkWUl_ZGOZGpfqo7iJ' target='_blank' rel='noopener'>videos</a> and <a href='https://drive.google.com/drive/folders/1ff9_jSuxIvPSHvZWU_y5caPozzQERc5A' target='_blank' rel='noopener'>documents</a>.",
      es: 'Si querés aprender más sobre iSAMS, mirá los <a href="https://www.youtube.com/playlist?list=PL-lAXIYISnu-TX2hkWUl_ZGOZGpfqo7iJ" target="_blank" rel="noopener">videos</a> tutoriales y <a href="https://drive.google.com/drive/folders/1ff9_jSuxIvPSHvZWU_y5caPozzQERc5A" target="_blank" rel="noopener">documentos</a>.'
    },
    strategies: {
      title: { en: 'Resources & Strategies', es: 'Recursos y Estrategias' },
      desc: {
        en: 'Learn more about Chromebooks, Google for Education, Communication, Interactive Lessons, Voice & Choice, Assessment, Accessibility, Resources and Strategies.',
        es: 'Aprendé más sobre Chromebooks, Google for Education, Comunicación, Clases Interactivas, Voice & Choice, Evaluación, Accesibilidad, Recursos y Estrategias.'
      },
      link: 'https://docs.google.com/presentation/d/1njGEfbWih6d0iu2FJjuhsk-rXMp3Cq1FMJq72kgy_uk/present',
      embed: 'https://docs.google.com/presentation/d/1njGEfbWih6d0iu2FJjuhsk-rXMp3Cq1FMJq72kgy_uk/embed?start=false&loop=false&delayms=5000',
      linkLabel: { en: '2024 SGN Digital Onboarding', es: '2024 SGN Digital Onboarding' }
    }
  },
  admissions: {
    kicker: { en: 'Admissions', es: 'Admisiones' },
    title: { en: 'Admissions', es: 'Admisiones' },
    sub: { en: 'Families & students interview process', es: 'Proceso de entrevistas a familias y alumnos' },
    intro: {
      en: 'The forms for each level and section required for the <b>student and family interview process</b> are available for staff to complete. Please fill out the appropriate form based on your area of responsibility to ensure each interview is properly recorded and the information flow stays organised.',
      es: 'Los formularios de cada nivel y sección requeridos para el <b>proceso de entrevista a alumnos y familias</b> están disponibles para que el staff los complete. Por favor completá el formulario correspondiente según tu área de responsabilidad, para que cada entrevista quede bien registrada y el flujo de información se mantenga ordenado.'
    }
  },
  marketing: {
    kicker: { en: 'Marketing & Communications', es: 'Marketing y Comunicación' },
    title: { en: 'Marketing', es: 'Marketing' },
    sub: { en: 'Brand, requests, templates & team', es: 'Marca, pedidos, plantillas y equipo' }
  }
};

/* ─── ADMISSIONS — interview forms by level ─── */
const ADMISSIONS = {
  groups: [
    { level: { en: 'Kinder', es: 'Kínder' }, accent: 'var(--celeste)', forms: [
      { name: { en: 'EOE Interview', es: 'Entrevista EOE' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSd4g7g4WZZDkd_nZ-2i0txRuipiEqgF2yezgKSn8x01yeZFKQ/viewform?usp=sharing' },
      { name: { en: 'Head of Section Interview', es: 'Entrevista Head of Section' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSePAqpyFfufGZTGR9W5kMFPCZ5JDlQmDoa6_OiG3HQdiIlJ-w/viewform?usp=sharing' }
    ]},
    { level: { en: 'Prep School', es: 'Prep School' }, accent: 'var(--teal)', forms: [
      { name: { en: 'Academic Interview', es: 'Entrevista Académica' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSf0ypLvPpMephesemGY1ggDhNpYSwt3-DDWpPwqN86HU5Pcyg/viewform?usp=sharing' },
      { name: { en: 'Pastoral Interview', es: 'Entrevista Pastoral' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSfMFWcwWDiH0FiyqRbANjQ9D74f59snFnbjnhHRFFKTgpF60g/viewform?usp=sharing' },
      { name: { en: 'EOE Interview', es: 'Entrevista EOE' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSdk4Jf8kVHJCeEfHnnrs7fxHzmVw90rY59WRUNM5PKCZbBS-Q/viewform?usp=sharing' },
      { name: { en: 'Head of Section Interview', es: 'Entrevista Head of Section' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLScXs-Lnv-VV584onuycbhwaPGNOzlHom6N9qk8BTF7rMgjmBQ/viewform?usp=sharing' }
    ]},
    { level: { en: 'College', es: 'College' }, accent: 'var(--navy)', forms: [
      { name: { en: 'Academic Interview', es: 'Entrevista Académica' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSeofINzVKrJYc5rwZnkUgOfWou_i6oiR8-lkqFF2DZjo7FeHA/viewform?usp=sharing' },
      { name: { en: 'Pastoral Interview', es: 'Entrevista Pastoral' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSeXNImKZc77stQdMUKUlNhGqoqoQRasDiNC7q9owZI_fpvrcg/viewform?usp=sharing' },
      { name: { en: 'EOE Interview', es: 'Entrevista EOE' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSfp79JTR-AmlgbI6VM6vb3nQRCwh14WESAeEXP5suUruVL8bg/viewform?usp=sharing' },
      { name: { en: 'Head of Section Interview', es: 'Entrevista Head of Section' }, url: 'https://docs.google.com/forms/d/e/1FAIpQLSfU-71ECIsDfb3El2OwdHga7r7_3Y5-XuKFm-seEoxqTEtt2A/viewform?usp=sharing' }
    ]}
  ],
  contact: {
    quilmesEmail: 'infoquilmes@stgeorges.edu.ar', northEmail: 'informes@stgeorges.edu.ar',
    quilmesWa: { label: '+54 9 11 5577-8040', url: 'https://wa.me/+5491155778040' },
    northWa: { label: '+54 9 11 5798-6594', url: 'https://wa.me/+5491157986594' }
  }
};

/* ─── MARKETING — requests, brand, templates, team ─── */
const MARKETING = {
  order: { url: 'https://docs.google.com/forms/d/e/1FAIpQLSehnIw43xuxyBSmLx8btsAtULuyIlDuY3an2hUFLLHlAadaeg/viewform' },
  resources: [
    { abbr: 'PT', accent: 'var(--violet)',
      name: { en: 'Design templates', es: 'Plantillas de diseño' },
      desc: { en: 'PowerPoint & Word templates for North, Quilmes and One School.', es: 'Plantillas de PowerPoint y Word para North, Quilmes y One School.' },
      url: 'https://docs.google.com/folderview?id=14ylbFWERKD0m5ah9hcP3iNmK6x_xVzic' },
    { abbr: 'BM', accent: 'var(--ink)',
      name: { en: 'Brand Manual', es: 'Manual de Marca' },
      desc: { en: 'Logo usage, colour, typography and visual guidelines.', es: 'Uso del logo, color, tipografía y lineamientos visuales.' },
      url: 'https://drive.google.com/file/d/1U9Allg_THwmLJU70oPqLS8t5S_8QX1be/view?usp=drive_link' },
    { abbr: 'CP', accent: 'var(--red)',
      name: { en: 'Colour Palette', es: 'Paleta de Colores' },
      desc: { en: 'Primary & secondary colours with their exact codes.', es: 'Colores primarios y secundarios con sus códigos exactos.' },
      url: 'https://drive.google.com/file/d/1TGKPTZwtpCSTHI_5_vVFRQn82zYwUH8I/view?usp=drive_link' }
  ],
  templatesFolderId: '14ylbFWERKD0m5ah9hcP3iNmK6x_xVzic',
  team: [
    { name: 'Diego Medina', role: { en: 'Head of Marketing & Admissions', es: 'Head of Marketing & Admissions' }, email: 'diego.medina@stgeorges.edu.ar', lead: true },
    { name: 'Victoria Cañete', role: { en: 'Marketing Analyst', es: 'Analista de Marketing' }, email: 'victoria.canete@stgeorges.edu.ar' },
    { name: 'Rocío Bellver', role: { en: 'Marketing Analyst', es: 'Analista de Marketing' }, email: 'rocio.bellver@stgeorges.edu.ar' },
    { name: 'Agustina López Costa', role: { en: 'Marketing Analyst', es: 'Analista de Marketing' }, email: 'agustina.lopez@stgeorges.edu.ar' },
    { name: 'Valentina Santangelo', role: { en: 'Marketing Intern', es: 'Pasante de Marketing' }, email: 'valentina.santangelo@stgeorges.edu.ar' }
  ],
  contact: {
    email: 'marketing@stgeorges.edu.ar',
    quilmesWa: { label: '+54 9 11 5577-8044', url: 'https://wa.me/+5491155778044' },
    northWa: { label: '+54 9 11 4083-6823', url: 'https://wa.me/+5491140836823' }
  }
};

const SOCIAL = [
  { name: 'Website', url: 'https://www.stgeorges.edu.ar/', icon: 'globe' },
  { name: 'Facebook', url: 'https://www.facebook.com/stgeorgesargentina/', icon: 'facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/stgeorgesargofficial/', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/school/stgeorgesargentina', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://www.youtube.com/StGeorgesCollegeMedia', icon: 'youtube' }
];

/* ─── CMS overlay: defaults above, edits from Back Office applied here ─── */
window.TGN_DEFAULTS = {
  news: NEWS, birthdays: BIRTHDAYS, vacancies: VACANCIES,
  quicklinks: QUICK_LINKS, tools: TOOL_GROUPS, interviewforms: ADMISSIONS.groups
};
const _ov = function (k, def) { return (window.TGNStore ? TGNStore.get(k, def) : def); };
window.TGN = {
  I18N: I18N,
  DEPTS: DEPTS,
  EXTENSIONS: EXTENSIONS,
  MENUS: MENUS,
  PAGES: PAGES,
  SOCIAL: SOCIAL,
  config: {
    driveApiKey: '',
    remoteUrl: 'https://script.google.com/macros/s/AKfycbweYv9vKruF54ln44O6LlEDRbYaasrBYy6FS-7na2JzprLq3VzEQaIKgG2mQxVjl0mV/exec'
  },

  NEWS: _ov('news', NEWS),
  BIRTHDAYS: _ov('birthdays', BIRTHDAYS),
  VACANCIES: _ov('vacancies', VACANCIES),
  QUICK_LINKS: _ov('quicklinks', QUICK_LINKS),
  TOOL_GROUPS: _ov('tools', TOOL_GROUPS),
  ADMISSIONS: Object.assign({}, ADMISSIONS, { groups: _ov('interviewforms', ADMISSIONS.groups) }),
  MARKETING: MARKETING
};
