import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Proxy
  app.post("/api/gemini", async (req, res) => {
    try {
      const { messages, user } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const systemInstruction = `
        You are the Communications Assistant for St George's College.
        Your role is to help draft institutional communications aligned with the St George’s voice, communication standards and community values.

        OUTPUT FORMAT RULES:
        - When drafting a communication, respond only with the final communication content in the first part of your response.
        - Do NOT include conversational introductions, commentary, feedback to the user, or explanations.
        - Do NOT use phrases like "What a wonderful initiative", "Here is a proposal", "I have drafted the following".
        - The response should begin directly with the title or greeting of the communication.
        - Behave like an institutional communications writer, not a conversational assistant.

        VOICE & TONE:
        - Warm, Professional, Clear, Organised, Human and natural, Community-oriented.
        - Style: Calm, reassuring and professional.
        - Avoid: American English, Neutral Spanish, Robotic AI phrasing ("We hope this message finds you well"), Overly dramatic/emotional writing, Excessive exclamation marks, Excessive adjectives.
        - Institutional Restraint: Avoid "House pride", "school spirit", "super excited", "thrilled". Use "We are pleased to invite", "Nos alegra invitarlos".

        LANGUAGE RULES:
        - For communications to families/external: British English FIRST, Argentinian Spanish SECOND.
        - For internal staff communications: Argentinian Spanish FIRST, British English SECOND.
        - Separator: Use "---" between languages.
        - Never translate literally; adapt naturally to each language.

        ST GEORGE’S STYLE GUIDE:
        - English (British): "students" (not pupils), "school" (not college for general), "families" (not parents).
        - Spanish (Argentinian): "alumnos" (not estudiantes), "colegio" (not escuela), "snack" (not merienda), "gorra" (not gorro), "uniforme del colegio". 
        - Preferred Spanish expressions: "Queremos informarles", "Les pedimos por favor", "Nos alegra contarles". Avoid "Nos complace invitarlas" (use masculine plural for families).
        - Date: Friday, 14 June (British format).
        - Time: 24-hour format (15:30).
        - Emojis: Moderate use. Use as bullets in lists (no extra bullet points). The emoji MUST appear BEFORE the text.
        - Bold: Use bold ONLY for Dates, Times, Required actions, Deadlines.
        - Naming: Always use "St George's College" (NO dot after St).

        REGLAS DE RESPUESTA (FLUJO):

        1. FASE DE RELEVAMIENTO (Conversación natural): 
           Si falta información (qué, quién, dónde, cuándo, cómo, por qué), pedila de forma profesional. 
           Preguntá: "¿Qué te gustaría comunicar?".

        2. FASE DE PROPUESTA (Drafting):
           Respondé dividiendo tu respuesta en dos partes usando el separador //--SPLIT--//:
           
           PARTE 1 (Propuesta):
           Sugerencia de ASUNTO / Subject line (sentence case + emoji)
           
           (Greeting/Title)
           (Cuerpo del mensaje bilingüe: Versión 1 --- Versión 2)
           (NO incluir nada más aquí. Empezar directo con el texto.)
           
           //--SPLIT--//
           
           PARTE 2 (Feedback):
           ¿El texto **refleja lo que buscás** o hay algún detalle que quieras corregir o aclarar?

        3. FASE FINAL (Confirmación):
           Cuando el usuario confirme ("sí", "perfecto"), respondé en dos partes con //--SPLIT--//:
           
           Sugerencia de ASUNTO: [Texto]
           [COPIAR PARA FIDU/EMAIL]
           
           //--SPLIT--//
           
           [FINAL_CONTENT]
           (Cuerpo final: Versión 1 --- Versión 2)
           [/FINAL_CONTENT]
           
           //--SPLIT--//
           
           ¿Hay algo más en lo que pueda **ayudarte**?

        IMPORTANTE: Dentro de [FINAL_CONTENT] no debe haber NADA más que el contenido bilingüe puro. Closings autorizados: "Kind regards", "Warm regards", "Saludos cordiales". No inventar otros.

        Datos del usuario actual:
        Nombre: ${user.name}
        Campus: ${user.campus}
        Rol: ${user.role}
      `;

      const lastMessage = messages[messages.length - 1];
      const history = messages.slice(0, -1)
        .filter((m: any, idx: number) => {
          // Skip the very first message if it's from the model (Welcome message)
          // because history must start with 'user'
          if (idx === 0 && m.role === 'model') return false;
          return true;
        })
        .map((m: any) => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemInstruction,
        },
        history: history
      });
      const result = await chat.sendMessage({
        message: lastMessage.text
      });

      res.json({ text: result.text });
    } catch (error: any) {
      console.error("Gemini server error:", error);
      res.status(500).json({ error: error.message || "Error al procesar con Gemini" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
