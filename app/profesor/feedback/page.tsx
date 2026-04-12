import { Edit3, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

export default function FeedbackProfPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
         <h2 className="text-2xl font-bold text-[#1a237e] flex items-center gap-2 mb-1">
           <Edit3 className="w-6 h-6 text-[#2b5bb5]" /> Redactar Feedback a Alumno
         </h2>
         <p className="text-[#767683]">La retroalimentación constante construye campeones. Redacta observaciones sobre el rendimiento técnico.</p>
      </div>

      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-[#e0e3e5] space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-sm font-bold text-[#454652]">Seleccionar Clase</label>
               <select className="w-full bg-[#f2f4f6] text-[#191c1e] font-medium border-transparent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1a237e]/20 transition-all">
                  <option>Contemporáneo - Lunes 18:00</option>
                  <option>Jazz Principiantes - Miércoles 16:00</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-[#454652]">Seleccionar Alumno</label>
               <select className="w-full bg-[#f2f4f6] text-[#191c1e] font-medium border-transparent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1a237e]/20 transition-all">
                  <option>Lucía Fernández</option>
                  <option>Martina Robles</option>
               </select>
            </div>
         </div>

         <div className="space-y-2">
            <label className="text-sm font-bold text-[#454652]">Calificación Global de Desempeño</label>
            <div className="flex gap-4">
               <label className="flex-1 cursor-pointer group">
                  <input type="radio" name="perf" className="peer sr-only" />
                  <div className="p-4 rounded-xl border-2 border-[#e0e3e5] peer-checked:border-[#137333] peer-checked:bg-[#e6f4ea] text-center transition-all">
                     <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[#137333]" />
                     <span className="font-bold text-[#137333] text-sm">Destacado</span>
                  </div>
               </label>
               <label className="flex-1 cursor-pointer group">
                  <input type="radio" name="perf" className="peer sr-only" defaultChecked />
                  <div className="p-4 rounded-xl border-2 border-[#e0e3e5] peer-checked:border-[#ffb300] peer-checked:bg-[#fff8e1] text-center transition-all">
                     <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-[#f29900]" />
                     <span className="font-bold text-[#f29900] text-sm">Adecuado</span>
                  </div>
               </label>
               <label className="flex-1 cursor-pointer group">
                  <input type="radio" name="perf" className="peer sr-only" />
                  <div className="p-4 rounded-xl border-2 border-[#e0e3e5] peer-checked:border-[#d93025] peer-checked:bg-[#fad2cf] text-center transition-all">
                     <AlertCircle className="w-6 h-6 mx-auto mb-2 text-[#d93025]" />
                     <span className="font-bold text-[#d93025] text-sm">Requiere Refuerzo</span>
                  </div>
               </label>
            </div>
         </div>

         <div className="space-y-2">
            <label className="text-sm font-bold text-[#454652]">Detalle Observación (Visible para el estudiante)</label>
            <textarea 
               rows={4} 
               placeholder="Menciona puntos fuertes de técnica y qué ejercicios sugerir para mejorar posturas..."
               className="w-full bg-[#f2f4f6] text-[#191c1e] font-medium border-transparent rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#1a237e]/20 transition-all resize-none"
            ></textarea>
         </div>

         <div className="pt-4 flex justify-end gap-3 border-t border-[#e0e3e5]">
            <button className="px-6 py-3 rounded-xl font-bold bg-[#f2f4f6] text-[#454652] hover:bg-[#e0e3e5] transition-colors">
               Cancelar
            </button>
            <button className="px-8 py-3 rounded-xl font-bold bg-[#1a237e] text-white shadow-md hover:bg-[#000666] transition-colors flex items-center gap-2">
               Aprobar y Enviar (Notificar)
            </button>
         </div>
      </div>
    </div>
  );
}
