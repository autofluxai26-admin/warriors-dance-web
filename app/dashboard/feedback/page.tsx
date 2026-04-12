import { MessageSquare, ThumbsUp, Target, TrendingUp } from "lucide-react";

export default function FeedbackPage() {
  const feedbacks = [
    {
      prof: "Prof. Marcos", class: "Jazz",
      notes: "Muy buena retención coreográfica. Necesitas estirar más el empeine en los saltos de grand jeté. ¡Sigue así!",
      status: "Positivo"
    },
    {
      prof: "Prof. Elena Rostova", class: "Contemporáneo",
      notes: "Excelente conexión con el suelo. Trabajaremos la recuperación de las caídas para que sean más orgánicas.",
      status: "En Progreso"
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-[#000666] mb-6 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-[#2b5bb5]" /> Evaluaciones de tus Maestros
        </h2>
        {feedbacks.map((fb, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-[#e0e3e5]">
            <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-4 mb-4">
              <div>
                <h3 className="font-bold text-[#191c1e] text-lg">{fb.prof}</h3>
                <span className="text-sm font-semibold text-[#2b5bb5]">Clase de {fb.class}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${fb.status === 'Positivo' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-[#fff0e0] text-[#e65100]'}`}>
                {fb.status}
              </div>
            </div>
            <p className="text-[#454652] leading-relaxed italic border-l-4 border-[#2b5bb5] pl-4">"{fb.notes}"</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5] h-fit">
        <h3 className="font-bold text-[#191c1e] text-lg mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#000666]" /> Tu Rendimiento
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1 font-semibold text-[#454652]">
              <span>Técnica</span>
              <span className="text-[#2b5bb5]">85%</span>
            </div>
            <div className="w-full bg-[#f2f4f6] rounded-full h-2">
              <div className="bg-[#2b5bb5] h-2 rounded-full w-[85%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 font-semibold text-[#454652]">
              <span>Expresión Escénica</span>
              <span className="text-[#2b5bb5]">92%</span>
            </div>
            <div className="w-full bg-[#f2f4f6] rounded-full h-2">
              <div className="bg-[#2b5bb5] h-2 rounded-full w-[92%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 font-semibold text-[#454652]">
              <span>Flexibilidad</span>
              <span className="text-[#2b5bb5]">70%</span>
            </div>
            <div className="w-full bg-[#f2f4f6] rounded-full h-2">
              <div className="bg-[#2b5bb5] h-2 rounded-full w-[70%]" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#e0e3e5]">
           <button className="w-full bg-[#e0e0ff] text-[#000666] font-bold py-3 rounded-xl hover:bg-[#c2c2ff] transition-colors">
              Solicitar Mentoría 1 a 1
           </button>
        </div>
      </div>
    </div>
  );
}
