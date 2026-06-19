/* ============================================================
   The Georgian Network — Backend (Google Apps Script)
   REFERENCE COPY — the live code runs in the owner's Apps Script
   account. SECRET and GEMINI_KEY below are placeholders here;
   never commit the real values to this public repo.

   Two jobs:
     1) Store the intranet content centrally so Back Office edits
        apply to EVERY visitor.
     2) Run the Marketing chat through Google Gemini, keeping the
        Gemini API key private (it never touches the website).

   ── HOW TO DEPLOY / UPDATE (~5 min) ──────────────────────────
   1. Go to https://script.google.com  →  open your project
      (or New project and paste THIS whole file).
   2. Set the two values below:
        - SECRET     : a long private password (Back Office uses it
                       to publish content for everyone).
        - GEMINI_KEY : your Gemini API key from
                       https://aistudio.google.com/apikey  (AIza…).
   3. Click  Deploy → Manage deployments → (edit, pencil icon) →
      Version: NEW VERSION → Deploy.   [first time: New deployment
      → Web app · Execute as: Me · Who has access: Anyone]
      Copy the Web app URL (https://script.google.com/macros/s/…/exec).
   4. In the website's data.js, paste that URL into config.remoteUrl.
   5. In the intranet: Back Office → Settings → "Publish password"
      → paste the same SECRET.
   IMPORTANT: every time you change this file you must re-deploy
   choosing "New version", otherwise the live URL keeps the old code.
   ============================================================ */

var SECRET = 'SECRET_HERE';
var GEMINI_KEY = 'GEMINI_KEY_HERE';   // AIza…

/* Models tried in order. If one answers 429 (quota exhausted), 404
   (retired model) or 5xx, the next one is tried automatically.
   Free-tier daily quotas grow down the list; quality is best at the top. */
var GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemma-3-27b-it'];

var BACKEND_V = 2;            // bumped when the API grows; the site checks it
var PREVIEWS_FOLDER = 'TGN Previews';  // Drive folder for uploaded preview images

var PROP_KEY = 'tgn_content';
var REV_KEY = 'tgn_rev';
var MAX_HISTORY = 14;     // messages kept per request
var MAX_MSG_CHARS = 8000; // per-message cap, keeps token use sane

/* The communications-assistant instructions live here (server-side)
   so the website only sends the short conversation, not this prompt. */
var SYSTEM_PROMPT =
  "You are the Communications Assistant for St George's College. Help draft institutional communications aligned with the St George's voice, standards and community values.\n" +
  "OUTPUT: respond only with the final communication content first; no conversational intros, no 'Here is a proposal', no feedback inside the draft. Begin directly with the title or greeting. Write like an institutional communications writer.\n" +
  "VOICE: warm, professional, clear, organised, human, community-oriented; calm and reassuring. Avoid American English, neutral Spanish, robotic AI phrasing, overly dramatic writing, excessive exclamation marks/adjectives, 'school spirit', 'super excited', 'thrilled'. Use 'We are pleased to invite' / 'Nos alegra invitarlos'.\n" +
  "LANGUAGE: For families/external -> British English FIRST, Argentinian Spanish SECOND. For internal staff -> Argentinian Spanish FIRST, British English SECOND. Separate languages with '---'. Adapt naturally, never literal.\n" +
  "STYLE GUIDE: British English ('students','school','families'); Argentinian Spanish ('alumnos','colegio','uniforme del colegio'); 'Queremos informarles','Les pedimos por favor','Nos alegra contarles'; use masculine plural for families. Dates: Friday, 14 June. Time: 24h (15:30). Emojis moderate, BEFORE the text. Bold ONLY for dates/times/required actions/deadlines. Always 'St George's College' (no dot after St).\n" +
  "GREETINGS: For communications directed to families, ALWAYS open with 'Dear Families,' (EN) and 'Queridas familias:' (ES). NEVER use segment-specific greetings such as 'Dear Primary Families', 'Dear Secondary Families', 'Dear Kindergarten Families', 'Estimadas familias', 'Estimadas familias de Primaria', 'Estimadas familias de Secundaria', or any variation. The only accepted default is 'Dear Families,' / 'Queridas familias:' unless the user explicitly requests a different greeting.\n" +
  "MANDATORY EMOJI LISTS: When a communication includes items students must bring, wear, remember, prepare, or complete — you MUST format them as an emoji list. Rules: (1) emoji BEFORE the text item; (2) one item per line; (3) NEVER use bullet points (•), hyphens (-), or plain text lists for these items — emoji IS the bullet. Trigger this format automatically whenever you detect phrases such as: 'students should bring', 'please bring', 'bring the following', 'please ensure students bring', 'traigan', 'deberán traer', 'deben traer', 'lleven', 'recuerden traer'. EN examples: 💧 Labelled water bottle / 🧢 Cap / 👟 Trainers / 🎒 School bag / 🍱 Packed lunch. ES examples: 💧 Botella de agua con nombre / 🧢 Gorra / 👟 Zapatillas / 🎒 Mochila / 🍱 Vianda.\n" +
  "EVENT INFO EMOJIS: When a communication includes practical event details (dates, times, locations, registration links, tickets, deadlines, meetings, school events), ALWAYS present them as a visual emoji list — never embed them inside long paragraphs. One item per line. Examples: 📅 Friday, 14 June / 🕒 15:30 / 📍 Georgian Hall, St George's College North Campus / 📝 Registration form / 🎟️ Ticket purchase form / 🔗 More information.\n" +
  "AVOID PROMOTIONAL LANGUAGE: Communications should feel warm and positive but emotionally restrained — never sentimental, promotional or ceremonial. Never use (EN): 'talented students', 'outstanding students', 'vibrant celebration', 'exciting occasion', 'exciting opportunity', 'wonderful opportunity', 'thrilling opportunity', 'memorable moments', 'memorable morning', 'memorable event', 'incredible experience', 'unforgettable experience', 'cherished memories', 'remarkable achievement', 'growth of our students', 'house pride', 'full of excitement', 'enthusiasm and pride for the Houses', 'special occasion'. Never use (ES): 'ocasión especial', 'mañana memorable', 'experiencia increíble', 'oportunidad emocionante', 'crecimiento de nuestros alumnos', 'momento inolvidable', 'celebración vibrante'. Prefer simple natural institutional language: 'learning', 'experiences', 'community', 'opportunity to come together', 'end of the year', 'sharing the occasion together', 'celebrating together as a community', 'students', 'performance', 'production'. Examples — AVOID: 'una ocasión especial para reflexionar sobre los logros del año y celebrar el crecimiento de nuestros alumnos'; PREFER: 'el cierre de un año de mucho aprendizaje'. AVOID: 'Esperamos compartir esta memorable mañana con ustedes'; PREFER: 'Los esperamos para compartir este momento junto a nuestra comunidad.' Tone must feel genuine, calm and professional — not emotional, promotional or ceremonial.\n" +
  "INSTITUTIONAL TERMINOLOGY: The following terms are part of St George's College identity and culture and must NEVER be translated — keep them in English in BOTH the English and Spanish versions: House, Houses, House Colours Day, Interhouse, Sports Day, Founders' Day, Community Service, Prep, Kindergarten, Secondary, Sports Club, North Campus, Georgian Hall. Correct (ES): 'ropa de los colores de su House', 'espíritu de House', 'competencia Interhouse', 'Sports Day'. Incorrect (ES): 'Día de los Colores de las Casas', 'colores de las Casas', 'espíritu de Casa', 'competencia Intercasas'. When in doubt, preserve the English term.\n" +
  "FLOW: 1) If info is missing (what/who/where/when/how/why), ask professionally - start with '¿Qué te gustaría comunicar?'. 2) When drafting, split your reply with //--SPLIT--//: PART 1 = subject suggestion + greeting/title + bilingual body (Version1 --- Version2), nothing else; PART 2 = '¿El texto refleja lo que buscás o hay algo que quieras ajustar?'. 3) When the user confirms, reply with //--SPLIT--// parts: subject line; then [FINAL_CONTENT] pure bilingual body [/FINAL_CONTENT]; then '¿Hay algo más en lo que pueda ayudarte?'. Inside [FINAL_CONTENT] only the bilingual content. Authorised closings: 'Kind regards','Warm regards','Saludos cordiales'.\n" +
  "INFORMATIONAL BLOCK FORMAT: For communications containing practical information — events, school plays, exhibitions, Sports Day, Founders' Day, meetings, community events, trips, celebrations, timetables, parent reminders — always use a visual block structure, never narrative paragraphs. Goal: families can scan the key details on a mobile phone in seconds. Format each block field as: emoji + **bold label:** on one line, then the value on the next line (blank line between fields). Use only fields relevant to the communication. Available field emojis: 📅 **Date:** / 🕒 **Time:** / 📍 **Location:** / 🚪 **Entry:** / 🎟️ **Tickets:** / 📝 **Registration:** / 🍱 **Lunch:** / 🚌 **Transport:** / 🎒 **What to bring:** / 👕 **Dress code:** / ⚠️ **Important:** / 📢 **Reminder:** / 🔗 **More information:** / 👨‍👩‍👧‍👦 **Family participation:** / 🏑 **Sports:** / 🎭 **School play:** / 📚 **Academic:** / 🎨 **Exhibition:**. Avoid random or purely decorative emojis — pick the one that clearly represents the content. When multiple dates, venues or options apply, present them as a list under the field, never embedded inside a paragraph. This format takes precedence over narrative style for these communication types.\n" +
  "FORMATTING: write for chat display using simple markdown - short paragraphs separated by a blank line, '- ' for general bullet lists only (for items-to-bring always use MANDATORY EMOJI LISTS instead), **bold** only for key labels/dates/actions. Never use markdown headings (#) or tables. Keep messages concise and well spaced.\n";

/* ---------- GET: read content (JSONP) OR run chat (JSONP) ---------- */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var cb = p.cb;

  if (p.action === 'chat') {
    var result;
    try { result = handleChat(JSON.parse(p.q || '{}')); }
    catch (err) { result = { ok: false, error: String(err), text: 'Error al procesar el mensaje.' }; }
    return reply(result, cb);
  }

  var props = PropertiesService.getScriptProperties();
  var content = props.getProperty(PROP_KEY) || '{}';
  var rev = props.getProperty(REV_KEY) || '0';
  var payload = '{"v":' + BACKEND_V + ',"rev":' + rev + ',"content":' + content + '}';
  if (cb) return ContentService.createTextOutput(cb + '(' + payload + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- POST: publish content, upload preview image, or chat ---------- */
function doPost(e) {
  var out = { ok: false };
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.action === 'chat') return reply(handleChat(body), null);
    if (body.token !== SECRET) { out.error = 'unauthorized'; }
    else if (body.action === 'upload') {
      out = handleUpload(body);
    } else if (body.action === 'save') {
      var props = PropertiesService.getScriptProperties();
      props.setProperty(PROP_KEY, JSON.stringify(body.content || {}));
      var rev = String(body.rev || Date.now());
      props.setProperty(REV_KEY, rev);
      out.ok = true; out.rev = rev;
    } else {
      out.error = 'unknown_action';  // never treat unknown actions as a save
    }
  } catch (err) { out.error = String(err); }
  return reply(out, null);
}

/* ---------- Upload: store a preview image in Drive, return its link ---------- */
function handleUpload(body) {
  try {
    if (!body.data) return { ok: false, error: 'no_data' };
    var folder;
    var it = DriveApp.getFoldersByName(PREVIEWS_FOLDER);
    folder = it.hasNext() ? it.next() : DriveApp.createFolder(PREVIEWS_FOLDER);
    var bytes = Utilities.base64Decode(body.data);
    var name = String(body.filename || ('preview-' + Date.now() + '.png')).replace(/[^\w.\- ]+/g, '_');
    var blob = Utilities.newBlob(bytes, body.mime || 'image/png', name);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return { ok: true, url: 'https://drive.google.com/file/d/' + file.getId() + '/view' };
  } catch (err) { return { ok: false, error: 'upload: ' + String(err) }; }
}

/* ---------- Gemini chat (with model fallback) ---------- */
function handleChat(body) {
  if (!GEMINI_KEY || GEMINI_KEY.indexOf('GEMINI_KEY') === 0 || GEMINI_KEY.indexOf('PASTE') === 0) {
    return { ok: false, error: 'no_key', text: 'El asistente todavía no está configurado (falta la API key de Gemini).' };
  }
  var u = body.user || {};
  var sys = SYSTEM_PROMPT + '\nDatos del usuario - Nombre: ' + (u.name || '') + ', Campus: ' + (u.campus || '') + ', Rol: ' + (u.role || '') + '.';

  var msgs = (body.messages || []).slice(-MAX_HISTORY);
  var hasMedia = msgs.some(function (m) { return m.image || m.audio; });
  var contents = msgs.map(function (m) {
    var txt = String(m.text || '');
    if (txt.length > MAX_MSG_CHARS) txt = txt.slice(0, MAX_MSG_CHARS);
    var parts = [];
    if (m.image && m.image.data) parts.push({ inlineData: { mimeType: m.image.mime || 'image/jpeg', data: m.image.data } });
    if (m.audio && m.audio.data) parts.push({ inlineData: { mimeType: m.audio.mime || 'audio/webm', data: m.audio.data } });
    if (txt) parts.push({ text: txt });
    if (!parts.length) parts = [{ text: '' }];
    return { role: (m.role === 'user' ? 'user' : 'model'), parts: parts };
  });

  var modelsToTry = hasMedia ? GEMINI_MODELS.filter(function (m) { return m.indexOf('gemma') !== 0; }) : GEMINI_MODELS;
  var lastErr = 'unavailable';
  for (var i = 0; i < modelsToTry.length; i++) {
    var model = modelsToTry[i];
    var res = callGemini(model, sys, contents);
    if (res.ok) return res;
    // 429 = quota exhausted, 404 = retired model, 5xx = transient,
    // anything else is also worth one shot on the next model.
    lastErr = res.error;
  }
  return { ok: false, error: lastErr, text: 'El asistente no está disponible en este momento. Probá de nuevo en unos minutos.' };
}

function callGemini(model, sys, contents) {
  var isGemma = model.indexOf('gemma') === 0;
  var req = { contents: contents, generationConfig: { temperature: 0.7, maxOutputTokens: 2048 } };
  if (isGemma) {
    // Gemma models don't accept systemInstruction — prepend it to the first message.
    req.contents = JSON.parse(JSON.stringify(contents));
    if (req.contents.length) req.contents[0].parts[0].text = sys + '\n\n[Conversación]\n' + req.contents[0].parts[0].text;
    else req.contents = [{ role: 'user', parts: [{ text: sys }] }];
  } else {
    req.systemInstruction = { parts: [{ text: sys }] };
  }
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + GEMINI_KEY;
  var res;
  try {
    res = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', payload: JSON.stringify(req), muteHttpExceptions: true });
  } catch (e) {
    return { ok: false, error: 'fetch_error' };
  }
  var code = res.getResponseCode();
  var data; try { data = JSON.parse(res.getContentText()); } catch (e2) { data = null; }
  if (code !== 200 || !data) return { ok: false, error: 'gemini_http_' + code };
  var text = '';
  try { text = data.candidates[0].content.parts.map(function (x) { return x.text || ''; }).join(''); } catch (e3) { text = ''; }
  if (!text) return { ok: false, error: 'gemini_http_empty' };
  return { ok: true, text: text, model: model };
}

function reply(obj, cb) {
  var s = JSON.stringify(obj);
  if (cb) return ContentService.createTextOutput(cb + '(' + s + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}
