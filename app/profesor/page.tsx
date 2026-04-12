import { Users, Clock, FileText, PlusCircle, Calendar as CalendarIcon, Check, Edit3 } from "lucide-react";

export default function ProfesorPage() {
  const todaysClasses = [
    { title: "Contemporáneo - Nivel Intermedio", time: "18:00 - 19:30", room: "Sala A", students: 15, status: "Próxima" },
    { title: "Acondicionamiento Físico", time: "19:30 - 20:30", room: "Gimnasio", students: 22, status: "Programada" }
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5] flex items-center gap-4">
            <div className="p-4 bg-[#e0e0ff] text-[#1a237e] rounded-2xl">
               <CalendarIcon className="w-8 h-8" />
            </div>
            <div>
               <p className="text-[#767683] text-sm font-semibold">Clases de Hoy</p>
               <h3 className="text-3xl font-black text-[#191c1e]">2</h3>
            </div>
         </div>
         <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5] flex items-center gap-4">
            <div className="p-4 bg-[#fff8e1] text-[#ffb300] rounded-2xl">
               <Users className="w-8 h-8" />
            </div>
            <div>
               <p className="text-[#767683] text-sm font-semibold">Alumnos Activos</p>
               <h3 className="text-3xl font-black text-[#191c1e]">37</h3>
            </div>
         </div>
         <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5] flex items-center gap-4">
            <div className="p-4 bg-[#e6f4ea] text-[#137333] rounded-2xl">
               <FileText className="w-8 h-8" />
            </div>
            <div>
               <p className="text-[#767683] text-sm font-semibold">Feedbacks Enviados</p>
               <h3 className="text-3xl font-black text-[#191c1e]">12</h3>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Mis Clases de Hoy */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-[#1a237e]">Horario del Día</h2>
               <button className="text-sm font-bold text-[#2b5bb5] hover:text-[#1a237e] flex items-center gap-1">
                  Ver semana completa
               </button>
            </div>
            
            <div className="space-y-4">
               {todaysClasses.map((cl, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-[#e0e3e5] hover:border-[#1a237e] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                        <h3 className="font-bold text-[#191c1e] text-lg mb-2">{cl.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#454652] font-medium">
                           <span className="flex items-center gap-1.5 bg-[#f2f4f6] px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4 text-[#767683]" /> {cl.time}</span>
                           <span className="flex items-center gap-1.5 bg-[#f2f4f6] px-3 py-1.5 rounded-lg"><Users className="w-4 h-4 text-[#767683]" /> {cl.students} Alumnos</span>
                        </div>
                     </div>
                     <div className="flex flex-col gap-2 min-w-[200px]">
                        <button className="w-full bg-[#1a237e] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#000666] transition-colors text-sm flex items-center justify-center gap-2">
                           <Check className="w-4 h-4" /> Registrar Asistencia
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Acciones Rápidas */}
         <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a237e] mb-4">Acciones Docentes</h2>
            
            <button className="w-full bg-white rounded-3xl p-6 shadow-sm border border-[#e0e3e5] hover:border-[#2b5bb5] hover:shadow-md transition-all text-left group">
               <div className="w-12 h-12 bg-[#e0e0ff] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Edit3 className="w-6 h-6 text-[#2b5bb5]" />
               </div>
               <h4 className="font-bold text-[#191c1e] mb-1">Redactar Evaluación</h4>
               <p className="text-sm text-[#767683]">Envía comentarios individuales del rendimiento a tus alumnos.</p>
            </button>

            <button className="w-full bg-white rounded-3xl p-6 shadow-sm border border-[#e0e3e5] hover:border-[#137333] hover:shadow-md transition-all text-left group">
               <div className="w-12 h-12 bg-[#e6f4ea] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlusCircle className="w-6 h-6 text-[#137333]" />
               </div>
               <h4 className="font-bold text-[#191c1e] mb-1">Subir Material Didáctico</h4>
               <p className="text-sm text-[#767683]">Comparte pistas de audio o videos de coreografía para que repasen.</p>
            </button>
         </div>
      </div>
    </div>
  );
}
