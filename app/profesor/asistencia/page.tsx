import { CheckSquare, Calendar, Users } from "lucide-react";

export default function AsistenciaPage() {
  const students = [
    { name: "Lucía Fernández", status: "presente" },
    { name: "Martina Robles", status: "ausente" },
    { name: "Carlos Villagómez", status: "presente" },
    { name: "Sofía Arango", status: "presente" },
    { name: "Joaquín Martínez", status: "justificado" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-[#e0e3e5] shadow-sm">
        <div>
           <h2 className="text-2xl font-bold text-[#1a237e] mb-2 flex items-center gap-2">
             <CheckSquare className="w-6 h-6 text-[#ffb300]" /> Tomar Asistencia
           </h2>
           <p className="text-[#767683]">Selecciona la clase y marca la asistencia correspondiente.</p>
        </div>
        <select className="bg-[#f2f4f6] border-none text-[#1a237e] font-bold rounded-xl px-4 py-3 cursor-pointer outline-none ring-2 ring-transparent focus:ring-[#1a237e]/20 transition-all">
           <option>Contemporáneo - 18:00 (Hoy)</option>
           <option>Acondicionamiento M. - 19:30 (Hoy)</option>
        </select>
      </div>

      <div className="bg-white rounded-[2rem] border border-[#e0e3e5] shadow-sm overflow-hidden">
        <div className="flex bg-[#f7f9fb] text-[#454652] p-4 border-b border-[#e0e3e5] font-semibold text-sm">
           <div className="w-12 text-center">#</div>
           <div className="flex-1">Nombre del Alumno</div>
           <div className="w-48 text-center">Estado</div>
        </div>
        <div className="divide-y divide-[#e0e3e5]">
           {students.map((student, i) => (
             <div key={i} className="flex items-center p-4 hover:bg-[#f7f9fb] transition-colors">
                <div className="w-12 text-center text-[#a0a5aa] font-bold">{i + 1}</div>
                <div className="flex-1 font-bold text-[#191c1e] flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center text-xs">
                     {student.name.charAt(0)}
                   </div>
                   {student.name}
                </div>
                <div className="w-48 flex items-center justify-center gap-2">
                   {/* Botones simulados de radio */}
                   <button className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${student.status === 'presente' ? 'border-[#137333] bg-[#e6f4ea] text-[#137333]' : 'border-[#e0e3e5] text-transparent hover:border-[#137333]'}`}>
                     P
                   </button>
                   <button className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${student.status === 'ausente' ? 'border-[#d93025] bg-[#fad2cf] text-[#d93025]' : 'border-[#e0e3e5] text-transparent hover:border-[#d93025]'}`}>
                     A
                   </button>
                   <button className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${student.status === 'justificado' ? 'border-[#f29900] bg-[#feefc3] text-[#f29900]' : 'border-[#e0e3e5] text-transparent hover:border-[#f29900]'}`}>
                     J
                   </button>
                </div>
             </div>
           ))}
        </div>
        <div className="p-4 bg-[#f7f9fb] border-t border-[#e0e3e5] flex justify-end">
           <button className="bg-[#1a237e] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#000666] transition-colors">
              Guardar Asistencia
           </button>
        </div>
      </div>
    </div>
  );
}
