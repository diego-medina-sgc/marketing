/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Layout, 
  FileText, 
  Palette, 
  MessageSquare, 
  Bot,
  Calendar,
  FileSpreadsheet,
  Plus,
  Camera, 
  PlusCircle, 
  ExternalLink, 
  Info,
  CheckCircle2,
  Mail,
  User,
  MapPin,
  Briefcase,
  Copy,
  Download,
  BookOpen,
  Image
} from 'lucide-react';
import { UserInfo, AppStep, Template, Message } from './types';
import { 
  COLORS, 
  PRESENTATION_TEMPLATES, 
  DOCUMENT_TEMPLATES, 
  ALL_CANVA_TEMPLATES,
  CANVA_BRAND_KIT,
  LOGOS_COLLECTION 
} from './constants';
import { getDirectDriveUrl, copyToClipboard as copyUtil } from './utils';
import { getGeminiDraft } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

const STEPS: { id: AppStep; label: string; icon?: any }[] = [
  { id: 'identification', label: 'Identificación' },
  { id: 'menu', label: 'Menú Principal' },
  { id: 'option_a', label: 'Plantillas de Presentación', icon: Layout },
  { id: 'option_b', label: 'Plantillas de Documento', icon: FileText },
  { id: 'option_c', label: 'Diseño en Canva', icon: Palette },
  { id: 'option_d', label: 'Redactar Comunicación', icon: MessageSquare },
  { id: 'option_e', label: 'Cobertura de Evento', icon: Camera },
  { id: 'option_f', label: 'Solicitud Personalizada', icon: PlusCircle },
  { id: 'option_palette', label: 'Paleta de colores', icon: Palette },
];

export default function App() {
  const [step, setStep] = useState<AppStep>('identification');
  const [user, setUser] = useState<UserInfo>({ name: '', campus: '', role: '' });
  const [history, setHistory] = useState<AppStep[]>([]);

  const goTo = (nextStep: AppStep) => {
    setHistory([...history, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setStep(prevStep);
    }
  };

  const isFormValid = user.name && user.campus && user.role;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 w-full overflow-x-hidden p-4 md:p-8">
      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`bg-white rounded-2xl shadow-xl border border-slate-200 ${step === 'option_d' ? 'overflow-visible' : 'overflow-hidden'}`}
            >
              {step !== 'identification' && step !== 'menu' && (
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                  <button 
                    onClick={goBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#D71920] transition-colors font-medium text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Volver
                  </button>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {STEPS.find(s => s.id === step)?.label}
                  </span>
                </div>
              )}

              <div className={step === 'option_d' ? 'p-0' : 'p-6 md:p-10'}>
                {renderStep()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );

  function renderStep() {
    switch (step) {
      case 'identification':
        return (
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-[#002147] font-serif tracking-tight">Bienvenido/a</h2>
              <p className="text-slate-500">Marketing & Communications Support</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <User className="w-4 h-4 text-brand-red" /> Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Ej: María García"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <Briefcase className="w-4 h-4 text-brand-red" /> Rol o Área
                  </label>
                  <input 
                    type="text" 
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    placeholder="Ej: Coordinadora Académica"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-brand-red" /> Campus
                  </label>
                  <div className="grid grid-cols-2 gap-3 font-sans">
                    {['Quilmes', 'North'].map((campus) => (
                      <button
                        key={campus}
                        onClick={() => setUser({ ...user, campus: campus as any })}
                        className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                          user.campus === campus 
                            ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        {campus}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 md:pt-10">
                  <button 
                    disabled={!isFormValid}
                    onClick={() => goTo('menu')}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg font-serif ${
                      isFormValid 
                        ? 'bg-brand-red text-white hover:bg-brand-red/90 hover:-translate-y-0.5 active:translate-y-0' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    Continuar
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold font-serif flex items-center gap-1">
                  <span className="text-brand-navy">¡</span>
                  <span className="text-brand-red">Hola {user.name.split(' ')[0]}</span>
                  <span className="text-brand-navy">!</span>
                </h2>
                <p className="text-slate-500 text-sm font-sans">¿En qué podemos ayudarte desde Marketing?</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                <MapPin className="w-3 h-3" /> {user.campus}
              </div>
            </div>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="grid grid-cols-3 md:grid-cols-6 gap-2"
            >
              {[
                { id: 'option_a', title: 'Presentaciones', icon: FileSpreadsheet, color: 'bg-green-50 text-green-700' },
                { id: 'option_b', title: 'Documentos', icon: FileText, color: 'bg-blue-50 text-blue-700' },
                { id: 'option_c', title: 'Diseños', icon: Palette, color: 'bg-indigo-50 text-indigo-700' },
                { id: 'option_d', title: 'Redacciones', icon: MessageSquare, color: 'bg-[#D71920]/10 text-[#D71920]' },
                { id: 'option_e', title: 'Eventos', icon: Calendar, color: 'bg-amber-50 text-amber-700' },
                { id: 'option_f', title: 'Otra solicitud', icon: Plus, color: 'bg-slate-50 text-slate-700' },
              ].map((opt) => (
                <motion.button
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 }
                  }}
                  key={opt.id}
                  onClick={() => goTo(opt.id as AppStep)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 transition-all text-center gap-1.5 ${opt.color} hover:shadow-sm hover:scale-[1.02] active:scale-95`}
                >
                  <opt.icon className="w-5 h-5" />
                  <span className="text-[10px] font-bold leading-tight line-clamp-2">{opt.title}</span>
                </motion.button>
              ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-2">
              <a 
                href="https://drive.google.com/file/d/1U9Allg_THwmLJU70oPqLS8t5S_8QX1be/view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 md:gap-3 p-4 bg-white border border-slate-200 text-brand-navy rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                <BookOpen className="w-5 h-5 text-brand-red shrink-0" />
                <span className="text-xs md:text-sm">Manual de Marca</span>
              </a>
              <button 
                onClick={() => goTo('option_palette')}
                className="flex items-center justify-center gap-2 md:gap-3 p-4 bg-white border border-slate-200 text-brand-navy rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                <Palette className="w-5 h-5 text-brand-red shrink-0" />
                <span className="text-xs md:text-sm">Paleta de colores</span>
              </button>

              <button 
                onClick={() => goTo('option_logos')}
                className="col-span-2 flex items-center justify-center gap-3 p-4 bg-white border border-slate-200 text-[#D71920] rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                <Briefcase className="w-5 h-5 text-brand-navy" />
                <span>Logos SGC</span>
              </button>
            </div>
          </div>
        );

      case 'option_a':
        return (
          <div className="space-y-8">
            <div className="bg-brand-navy text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">Galería de Plantillas</h3>
                </div>
                <p className="text-slate-300 text-sm max-w-md">
                  Accedé a las presentaciones oficiales de St George's College. Recordá seleccionar la pestaña <strong>"St George's College"</strong> dentro de la galería de Google Slides.
                </p>
                <a 
                  href="https://docs.google.com/presentation/u/0/?tgif=d&ftv=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#D71920] hover:bg-[#b0141a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-sm"
                >
                  Abrir Galería de Slides <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                Plantillas Directas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRESENTATION_TEMPLATES.map((tmpl, idx) => (
                  <a
                    key={idx}
                    href={tmpl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-xl border border-slate-200 hover:border-brand-red hover:bg-slate-50 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700">{tmpl.name}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-brand-red" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        );

      case 'option_b':
        return (
          <div className="space-y-8">
            <div className="bg-slate-800 text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">Hojas Membretadas</h3>
                </div>
                <p className="text-slate-300 text-sm max-w-md">
                  Accedé a los documentos oficiales de la institución. Seleccioná la pestaña <strong>"St George's College"</strong> para ver las hojas membretadas de cada campus.
                </p>
                <a 
                  href="https://docs.google.com/document/u/0/?tgif=d&ftv=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#D71920] hover:bg-[#b0141a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-sm"
                >
                  Abrir Galería de Documentos <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { title: `Campus ${user.campus}`, items: DOCUMENT_TEMPLATES[user.campus as keyof typeof DOCUMENT_TEMPLATES] },
                { title: 'One School (Ambos Campus)', items: DOCUMENT_TEMPLATES.OneSchool },
              ].map((section, sidx) => (
                <div key={sidx} className="space-y-3">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">{section.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.items.map((tmpl, idx) => (
                      <a
                        key={idx}
                        href={tmpl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl border border-slate-200 hover:border-brand-red hover:bg-slate-50 flex items-center justify-between group transition-all"
                      >
                        <span className="font-medium text-slate-700 truncate">{tmpl.name}</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-red" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'option_c':
        return (
          <div className="space-y-8">
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900 text-white p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="rounded-xl overflow-hidden h-12 flex items-center justify-center">
                  <img src={getDirectDriveUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mMpnzeq1ZoNUbRp7fFMmcodtDwuD-AjR1g&s")} alt="Canva" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Canva Brand Kit</h3>
                  <p className="text-slate-400 text-sm">Accedé a todos los logos y recursos oficiales</p>
                </div>
              </div>
              <a 
                href={CANVA_BRAND_KIT}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#D71920] hover:bg-[#b0141a] text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                Abrir Brand Kit <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Procedimiento:</h3>
              <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                {[
                  { step: '1', text: 'Clic en el link del template' },
                  { step: '2', text: 'Clic en "Usar esta plantilla de la marca"' },
                  { step: '3', text: 'Editá textos y descargas' },
                  { step: '4', text: 'Descargá (PNG p/digital, PDF p/impresión)' },
                ].map((s) => (
                  <li key={s.step} className="p-3 bg-slate-50 rounded-lg flex gap-3 items-center font-sans">
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-red text-white rounded-full flex items-center justify-center font-bold">{s.step}</span>
                    <span className="text-slate-600 leading-tight">{s.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-10">
              {Object.entries(ALL_CANVA_TEMPLATES).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-serif">
                    <span className="w-2 h-8 bg-brand-red rounded-full"></span>
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {items.map((tmpl, idx) => (
                      <div key={idx}>
                        <CanvaCard template={tmpl} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'option_d':
        return <RedactionFlow user={user} goToMenu={() => goTo('menu')} />;

      case 'option_e':
        return <CoverageFlow user={user} goToMenu={() => goTo('menu')} />;

      case 'option_f':
        return <CustomRequestFlow user={user} goToMenu={() => goTo('menu')} />;

      case 'option_palette':
        return <PaletteFlow goToMenu={() => goTo('menu')} />;

      case 'option_logos':
        return <LogosFlow goToMenu={() => goTo('menu')} />;

      case 'success':
        return (
          <div className="text-center py-10 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-serif flex items-center justify-center gap-1">
                <span className="text-brand-navy">¡</span>
                <span className="text-brand-red">Enviado con éxito</span>
                <span className="text-brand-navy">!</span>
              </h2>
              <p className="text-slate-500 font-sans">Tu solicitud ha sido procesada correctamente.</p>
            </div>
            <button 
              onClick={() => goTo('menu')}
              className="px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red/90 transition-all shadow-lg font-serif"
            >
              Volver al inicio
            </button>
          </div>
        );

      default:
        return <div>WIP</div>;
    }
  }
}

function CanvaCard({ template }: { template: Template }) {
  const transformedPreviewUrl = getDirectDriveUrl(template.previewUrl);
  
  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden group hover:border-brand-red hover:shadow-xl transition-all bg-white h-full font-sans">
      <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
        {template.previewUrl ? (
          <img 
            src={transformedPreviewUrl} 
            alt={template.name} 
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4 bg-slate-50">
            <div className="grid grid-cols-2 gap-2 h-full w-full">
              {template.variations?.map((v, i) => (
                <div key={i} className="bg-white rounded border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-300 relative overflow-hidden">
                  <img src={getDirectDriveUrl(v.preview)} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-1 right-1 bg-brand-red text-white rounded px-1 text-[8px]">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
           <p className="text-white text-[10px] font-medium leading-tight">Uso: {template.usage}</p>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h4 className="font-bold text-slate-900 group-hover:text-[#D71920] transition-colors">{template.name}</h4>
        <p className="text-xs text-slate-500 mb-4 mt-1 leading-relaxed">
          <strong>Campos:</strong> {template.fields?.join(', ')}
        </p>
        <div className="mt-auto">
          <a 
            href={template.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-slate-100 hover:bg-[#D71920] hover:text-white text-[#002147] font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Usar Template <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Sub-flows components
function RedactionFlow({ user, goToMenu }: { user: UserInfo; goToMenu: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `¡Hola ${user.name.split(' ')[0]}! ¿En qué puedo ayudarte hoy?\n\n¿Qué te gustaría comunicar?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (copiedIndex !== null) {
      const timer = setTimeout(() => setCopiedIndex(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedIndex]);

  const handleSend = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getGeminiDraft(newMessages, user);
      if (response) {
        // Split response by //--SPLIT--// to create separate messages
        const parts = response.split('//--SPLIT--//').map(p => p.trim()).filter(p => p !== '');
        
        if (parts.length > 1) {
          const newModelMessages = parts.map(text => ({ role: 'model', text } as Message));
          setMessages([...newMessages, ...newModelMessages]);
        } else {
          setMessages([...newMessages, { role: 'model', text: response }]);
        }
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'model', text: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyAction = async (text: string, index: number) => {
    // Extract content within [FINAL_CONTENT] markers if present
    const finalContentMatch = text.match(/\[FINAL_CONTENT\]([\s\S]*?)\[\/FINAL_CONTENT\]/);
    let contentToCopy = finalContentMatch ? finalContentMatch[1].trim() : text;
    
    // Safety check: remove any leading/trailing empty lines
    contentToCopy = contentToCopy.replace(/^\s+|\s+$/g, '');
    
    const success = await copyUtil(contentToCopy);
    if (success) {
      setCopiedIndex(index);
    }
  };

  const renderMessageText = (text: string) => {
    const finalContentMatch = text.match(/\[FINAL_CONTENT\]([\s\S]*?)\[\/FINAL_CONTENT\]/);
    
    if (finalContentMatch) {
      const cleanContent = finalContentMatch[1].trim();
      const beforeContent = text.split('[FINAL_CONTENT]')[0];
      const afterContent = text.split('[/FINAL_CONTENT]')[1];
      
      return (
        <div className="space-y-4">
          {beforeContent && (
            <div className="markdown-message">
              <ReactMarkdown>{beforeContent}</ReactMarkdown>
            </div>
          )}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-red opacity-50"></div>
            <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-sans">{cleanContent}</div>
          </div>
          {afterContent && (
            <div className="markdown-message">
              <ReactMarkdown>{afterContent}</ReactMarkdown>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="markdown-message whitespace-pre-wrap">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-auto w-full mx-auto" style={{ height: 'auto', overflow: 'visible' }}>
      <div 
        ref={scrollRef}
        className="h-auto p-4 md:p-8 space-y-6 font-sans bg-slate-50/10"
        style={{ height: 'auto', overflow: 'visible' }}
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[95%] md:max-w-[85%] p-4 md:p-6 rounded-2xl text-sm md:text-base border shadow-sm transition-all ${
                m.role === 'user' 
                  ? 'bg-brand-navy text-white rounded-tr-none border-brand-navy' 
                  : 'bg-white text-slate-800 rounded-tl-none border-slate-200'
              }`}
            >
              <div className="whitespace-pre-wrap break-words leading-relaxed">{renderMessageText(m.text)}</div>
              {m.role === 'model' && i > 0 && m.text.includes('[FINAL_CONTENT]') && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => handleCopyAction(m.text, i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                      copiedIndex === i 
                        ? 'text-green-600 border-green-200 bg-green-50' 
                        : 'text-slate-500 border-slate-200 hover:text-brand-red hover:border-brand-red bg-slate-50'
                    }`}
                  >
                    {copiedIndex === i ? (
                      <>✨ ¡Copiado!</>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copiar para FIDU/Email
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 flex gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-slate-100">
        <div className="relative flex items-end gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-200 focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red transition-all shadow-inner">
          <textarea 
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí aquí tu respuesta..."
            className="flex-grow px-2 py-1 bg-transparent outline-none text-sm md:text-base resize-none min-h-[24px] max-h-[200px] overflow-y-auto no-scrollbar"
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-xl transition-all flex-shrink-0 ${
              input.trim() && !isTyping 
                ? 'bg-brand-red text-white shadow-md transform active:scale-95' 
                : 'bg-slate-200 text-white'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-4">
          <span>Enter para enviar</span>
          <span>Shift + Enter para nueva línea</span>
        </p>
      </div>
    </div>
  );
}

function CoverageFlow({ user, goToMenu }: { user: UserInfo; goToMenu: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    location: '',
    objective: '',
    needs: [] as string[],
    hasAttachments: false
  });

  const toggleNeed = (need: string) => {
    if (formData.needs.includes(need)) {
      setFormData({ ...formData, needs: formData.needs.filter(n => n !== need) });
    } else {
      setFormData({ ...formData, needs: [...formData.needs, need] });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
    setSubmitted(true);
  };

  const [copied, setCopied] = useState(false);

  const { subject, body } = useMemo(() => {
    const s = `Solicitud de Cobertura de Evento - ${formData.eventName}`;
    const b = `Estimado equipo de Marketing,

Solicito cobertura de un evento.

Debajo toda la info recopilada:
--------------------------------------------------
• Evento: ${formData.eventName}
• Fecha: ${formData.eventDate}
• Hora: ${formData.eventTime}
• Lugar: ${formData.location}
• ¿Contiene adjuntos?: ${formData.hasAttachments ? 'Sí' : 'No'}
• Necesidades: ${formData.needs.join(', ') || 'No especificado'}
• Objetivo/Comentarios: ${formData.objective || 'Sin comentarios'}
--------------------------------------------------

Saludos,

--
${user.name}
${user.role}
Campus ${user.campus}`;
    return { subject: s, body: b };
  }, [formData, user, submitted]);

  if (submitted) {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=marketing@stgeorges.edu.ar&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const copyEmailBody = async () => {
      const textToCopy = body;
      const success = await copyUtil(textToCopy);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="text-center py-6 space-y-6 font-sans">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>
        <div className="space-y-2 px-4">
          <h2 className="text-2xl font-bold font-serif text-brand-navy">¡Solicitud Lista!</h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Para finalizar, debés enviar el mail que preparamos para vos. 
          </p>
          {formData.hasAttachments && (
            <div className="bg-amber-50 text-amber-700 p-3 rounded-lg text-xs mt-4 flex gap-2 text-left max-w-sm mx-auto border border-amber-100">
              <Info className="w-4 h-4 shrink-0" />
              <p><strong>Recordatorio:</strong> Indicaste que tenés adjuntos. Recordá subirlos manualmente una vez que se abra Gmail.</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto">
          <a 
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#D71920] text-white font-bold rounded-xl hover:bg-[#b0141a] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" /> Abrir en Gmail
          </a>
          
          <button 
            type="button"
            onClick={copyEmailBody}
            className={`w-full py-3 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-green-50 border-green-500 text-green-600' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-red hover:text-brand-red'
            }`}
          >
            {copied ? (
              <><CheckCircle2 className="w-4 h-4" /> ¡Cuerpo Copiado!</>
            ) : (
              <><Copy className="w-4 h-4" /> Copiar Cuerpo para pegar</>
            )}
          </button>
        </div>

        <div className="pt-4 mt-6 border-t border-slate-100">
          <button 
            onClick={goToMenu}
            className="text-brand-navy font-bold hover:underline"
          >
            Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-brand-navy font-serif">Solicitud de Cobertura</h2>
        <p className="text-slate-500 text-sm">Completá los detalles del evento para que podamos coordinar la cobertura.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Nombre del Evento</label>
            <input 
              required
              type="text" 
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Lugar/Sala</label>
            <input 
              required
              type="text" 
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Fecha</label>
            <input 
              required
              type="date" 
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Hora</label>
            <input 
              required
              type="time" 
              value={formData.eventTime}
              onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700">¿Qué necesitás?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Fotos', 'Video', 'Redes Sociales', 'Streaming'].map((need) => (
              <button
                type="button"
                key={need}
                onClick={() => toggleNeed(need)}
                className={`py-3 px-2 rounded-lg border-2 transition-all text-sm font-bold ${
                  formData.needs.includes(need) 
                    ? 'border-brand-red bg-brand-red text-white' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                {need}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 px-1">
          <label className="text-sm font-semibold text-slate-700 font-sans">¿Contiene adjuntos para enviar por mail (fotos, listas, etc)?</label>
          <div className="flex gap-4">
            {[
              { label: 'Sí', value: true },
              { label: 'No', value: false },
            ].map((opt) => (
              <button
                type="button"
                key={String(opt.value)}
                onClick={() => setFormData({ ...formData, hasAttachments: opt.value })}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-bold ${
                  formData.hasAttachments === opt.value 
                    ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Objetivo de la cobertura / Comentarios</label>
          <textarea 
            rows={3}
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all resize-none"
            placeholder="Ej: Publicar en el newsletter semanal..."
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-brand-navy text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 font-serif"
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}

function CustomRequestFlow({ user, goToMenu }: { user: UserInfo; goToMenu: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    hasAttachments: false
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
    setSubmitted(true);
  };

  const [copied, setCopied] = useState(false);

  const { subject, body } = useMemo(() => {
    const s = `Otra Solicitud de Comunicación - ${formData.title}`;
    const b = `Estimado equipo de Marketing,

Solicito una solicitud de comunicación.

Debajo toda la info recopilada:
--------------------------------------------------
• Título: ${formData.title}
• Descripción: ${formData.description}
• Fecha de entrega deseada: ${formData.deadline}
• ¿Contiene adjuntos?: ${formData.hasAttachments ? 'Sí' : 'No'}
--------------------------------------------------

Saludos,

--
${user.name}
${user.role}
Campus ${user.campus}`;
    return { subject: s, body: b };
  }, [formData, user, submitted]);

  if (submitted) {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=marketing@stgeorges.edu.ar&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const copyCustomRequest = async () => {
      const finalBody = body;
      const success = await copyUtil(finalBody);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="text-center py-6 space-y-6 font-sans">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>
        <div className="space-y-2 px-4">
          <h2 className="text-2xl font-bold font-serif text-brand-navy">¡Solicitud Lista!</h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Para finalizar, debés enviar el mail que preparamos para vos. 
          </p>
          {formData.hasAttachments && (
            <div className="bg-amber-50 text-amber-700 p-3 rounded-lg text-xs mt-4 flex gap-2 text-left max-w-sm mx-auto border border-amber-100">
              <Info className="w-4 h-4 shrink-0" />
              <p><strong>Recordatorio:</strong> Indicaste que tenés adjuntos. Recordá subirlos manualmente una vez que se abra Gmail.</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto">
          <a 
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#D71920] text-white font-bold rounded-xl hover:bg-[#b0141a] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" /> Abrir en Gmail
          </a>
          
          <button 
            type="button"
            onClick={copyCustomRequest}
            className={`w-full py-3 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-green-50 border-green-500 text-green-600' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-red hover:text-brand-red'
            }`}
          >
            {copied ? (
              <><CheckCircle2 className="w-4 h-4" /> ¡Cuerpo Copiado!</>
            ) : (
              <><Copy className="w-4 h-4" /> Copiar Cuerpo para pegar</>
            )}
          </button>
        </div>

        <div className="pt-4 mt-6 border-t border-slate-100">
          <button 
            onClick={goToMenu}
            className="text-brand-navy font-bold hover:underline"
          >
            Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-brand-navy font-serif">Otra Solicitud</h2>
        <p className="text-slate-500 text-sm">¿Tenés una necesidad específica? Contanos los detalles aquí.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Título de la solicitud</label>
          <input 
            required
            type="text" 
            placeholder="Ej: Diseño de banner para pasillo"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Descripción detallada</label>
          <textarea 
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all resize-none"
            placeholder="Explicá lo que necesitás, medidas, formato, etc..."
          />
        </div>

        <div className="space-y-1.5 px-1">
          <label className="text-sm font-semibold text-slate-700">¿Contiene adjuntos para enviar por mail (fotos, listas, etc)?</label>
          <div className="flex gap-4">
            {[
              { label: 'Sí', value: true },
              { label: 'No', value: false },
            ].map((opt) => (
              <button
                type="button"
                key={String(opt.value)}
                onClick={() => setFormData({ ...formData, hasAttachments: opt.value })}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-bold ${
                  formData.hasAttachments === opt.value 
                    ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Fecha de entrega deseada</label>
            <input 
              required
              type="date" 
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-red outline-none transition-all"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-brand-navy text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 font-serif"
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}

function LogosFlow({ goToMenu }: { goToMenu: () => void }) {
  return (
    <div className="space-y-8 font-sans">
      <div className="bg-brand-navy text-white p-8 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold font-serif">Galería de Logos</h3>
          </div>
          <p className="text-slate-300 text-sm max-w-md">
            Descargá los logos oficiales de St George's College. Hacé clic en cualquier elemento para abrirlo en el Drive y descargarlo.
          </p>
          <a 
            href="https://drive.google.com/drive/folders/1-5TiU6M4OZyXSR9VEj9rpfxLvDuD464e?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D71920] hover:bg-[#b0141a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-sm"
          >
            Abrir Carpeta Completa <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...LOGOS_COLLECTION].sort((a, b) => a.name.localeCompare(b.name)).map((logo, idx) => (
            <a
              key={idx}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-brand-red hover:bg-slate-50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 group-hover:bg-red-50 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-slate-400 group-hover:text-brand-red" />
                </div>
                <span className="font-normal text-slate-700 font-sans text-sm">{logo.name}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-brand-red" />
            </a>
          ))}
        </div>
      </div>

      <div className="pt-10 flex justify-center border-t border-slate-100">
        <button 
          onClick={goToMenu}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-serif"
        >
          <ChevronLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>
    </div>
  );
}

function PaletteFlow({ goToMenu }: { goToMenu: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const colors = [
    { 
      id: 'primary-red', 
      name: 'Rojo Institucional', 
      category: 'Paleta Primaria',
      hex: '#dc1e33', 
      rgb: 'R.220 G.30 B.51', 
      pantone: '199C', 
      cmyk: 'C.7 M.100 Y.87 K.1',
      bgClass: 'bg-[#dc1e33]'
    },
    { 
      id: 'primary-navy', 
      name: 'Azul Institucional', 
      category: 'Paleta Primaria',
      hex: '#213469', 
      rgb: 'R.33 G.52 B.105', 
      pantone: '294C', 
      cmyk: 'C.100 M.90 Y.29 K.19',
      bgClass: 'bg-[#213469]'
    },
    { 
      id: 'sky-blue', 
      name: 'Celeste', 
      category: 'Paleta Secundaria',
      hex: '#6ab2e2', 
      rgb: 'R.107 G.178 B.226', 
      pantone: '292C', 
      cmyk: 'C.55 M.16 Y.0 K.0',
      bgClass: 'bg-[#6ab2e2]'
    },
    { 
      id: 'violet', 
      name: 'Violeta', 
      category: 'Paleta Secundaria',
      hex: '#6b6eb3', 
      rgb: 'R.107 G.110 B.179', 
      pantone: '2124C', 
      cmyk: 'C.69 M.60 Y.0 K.0',
      bgClass: 'bg-[#6b6eb3]'
    },
    { 
      id: 'teal', 
      name: 'Turquesa', 
      category: 'Paleta Secundaria',
      hex: '#109aa9', 
      rgb: 'R.16 G.154 B.169', 
      pantone: '320C', 
      cmyk: 'C.80 M.22 Y.32 K.0',
      bgClass: 'bg-[#109aa9]'
    },
  ];

  const copy = async (val: string, id: string) => {
    const success = await copyUtil(val);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-brand-navy font-serif">Paleta de colores</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Programa de Identidad Visual / St George's College</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colors.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group/card">
            <div className={`h-24 ${c.bgClass} relative p-4 flex flex-col justify-end overflow-hidden`}>
               <div className="absolute top-0 right-0 p-2 opacity-20 group-hover/card:opacity-40 transition-opacity">
                 <Palette className="w-12 h-12 text-black" />
               </div>
               <span className="text-[10px] uppercase font-bold text-white/70 relative z-10">{c.category}</span>
               <h4 className="text-white font-bold relative z-10">{c.name}</h4>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => copy(c.hex, `${c.id}-hex`)}>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">HTML / HEX</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700">{c.hex}</span>
                    <Copy className={`w-3 h-3 ${copiedId === `${c.id}-hex` ? 'text-green-500' : 'text-slate-300 group-hover:text-brand-red'}`} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => copy(c.rgb, `${c.id}-rgb`)}>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">RGB</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700">{c.rgb}</span>
                    <Copy className={`w-3 h-3 ${copiedId === `${c.id}-rgb` ? 'text-green-500' : 'text-slate-300 group-hover:text-brand-red'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between group cursor-pointer" onClick={() => copy(c.pantone, `${c.id}-pantone`)}>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">PANTONE</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand-navy">{c.pantone}</span>
                    <Copy className={`w-3 h-3 ${copiedId === `${c.id}-pantone` ? 'text-green-500' : 'text-slate-300 group-hover:text-brand-red'}`} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 bg-slate-50/50 -mx-5 -mb-5 p-5">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1 h-3 bg-brand-red rounded-full"></span>
                  Cuatricromía (CMYK)
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-600 tracking-tight">{c.cmyk}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 flex justify-center">
        <button 
          onClick={goToMenu}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-serif"
        >
          <ChevronLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>
    </div>
  );
}
