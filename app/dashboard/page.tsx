import { Heart, MessageCircle, Share2, Award } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Social Wall / Feed */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5]">
           <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-full bg-[#primary_container] flex items-center justify-center font-bold text-[#1a237e] bg-[#e0e0ff]">
                   P
               </div>
               <div>
                   <h4 className="font-bold text-[#000666]">Prof. Elena Rostova</h4>
                   <p className="text-sm text-[#767683]">Hace 2 horas</p>
               </div>
           </div>
           <p className="text-[#454652] mb-6 leading-relaxed">
             ¡Increíble la energía en la clase de Contemporáneo hoy! Todos mostraron un avance espectacular en la coreografía final. No olviden estirar. ¡Nos vemos el miércoles! 💃🕺
           </p>
           {/* Placeholder for Media */}
           <div className="w-full aspect-video bg-[#eceef0] rounded-2xl mb-4 flex items-center justify-center text-[#a0a5aa]">
               [ Video / Foto de la Clase ]
           </div>
           
           <div className="border-t border-[#e0e3e5] pt-4 flex gap-6 text-[#767683]">
               <button className="flex items-center gap-2 hover:text-[#ba1a1a] transition-colors">
                   <Heart className="w-5 h-5" /> 24
               </button>
               <button className="flex items-center gap-2 hover:text-[#2b5bb5] transition-colors">
                   <MessageCircle className="w-5 h-5" /> 5
               </button>
           </div>
        </div>
      </div>

      {/* Sidebar Widget: Achievements & Mini Schedule */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Next Class */}
        <div className="bg-[#1a237e] text-white rounded-[2rem] p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <h3 className="font-bold text-[#bdc2ff] mb-4 text-sm uppercase tracking-wider">Siguiente Clase</h3>
            <p className="text-2xl font-extrabold mb-1">Ballet Intermedio</p>
            <p className="text-[#e0e0ff] mb-6">Hoy, 18:00 - Sala A</p>
            <button className="w-full py-3 bg-white text-[#000666] font-bold rounded-xl hover:bg-[#f2f4f6] transition-colors">
                Confirmar Asistencia
            </button>
        </div>

        {/* Latest Achievement */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5] text-center">
            <div className="w-16 h-16 mx-auto bg-[#fff8e1] text-[#ffb300] rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-[#000666] text-xl mb-2">¡Asistencia Perfecta!</h3>
            <p className="text-sm text-[#454652]">Completaste todas tus clases del mes de marzo. Sigue con esa disciplina.</p>
        </div>
      </div>
    </div>
  );
}
