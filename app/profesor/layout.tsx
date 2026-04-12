import Link from "next/link";
import { Users, Calendar, CheckSquare, Edit3, LogOut, Settings } from "lucide-react";

export default function ProfesorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f2f4f6] flex text-[#191c1e]">
      {/* Sidebar del Profesor */}
      <aside className="w-64 bg-white border-r border-[#e0e3e5] hidden md:flex flex-col">
        <div className="p-6 border-b border-[#e0e3e5]">
          <span className="font-extrabold text-2xl tracking-tighter text-[#1a237e]"> {/* Color diferente para diferenciar portal profesor */}
            WD<span className="text-[#ffb300]">.</span>
          </span>
          <p className="text-xs text-[#767683] mt-1 font-semibold uppercase">Portal del Docente</p>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/profesor" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#e0e0ff] hover:text-[#1a237e] text-[#454652] font-medium transition-colors">
            <Calendar className="w-5 h-5" />
            Mis Clases Hoy
          </Link>
          <Link href="/profesor/asistencia" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#454652] hover:bg-[#e0e0ff] hover:text-[#1a237e] font-medium transition-colors">
            <CheckSquare className="w-5 h-5" />
            Tomar Asistencia
          </Link>
          <Link href="/profesor/alumnos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#454652] hover:bg-[#e0e0ff] hover:text-[#1a237e] font-medium transition-colors">
            <Users className="w-5 h-5" />
            Directorio de Alumnos
          </Link>
          <Link href="/profesor/feedback" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#454652] hover:bg-[#e0e0ff] hover:text-[#1a237e] font-medium transition-colors">
            <Edit3 className="w-5 h-5" />
            Redactar Feedback
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[#e0e3e5] space-y-2">
           <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[#454652] border border-[#e0e3e5] hover:bg-[#f7f9fb] transition-colors font-semibold">
              <Settings className="w-4 h-4" />
              Configuración
           </button>
           <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white bg-[#1a237e] hover:bg-[#000666] transition-colors font-semibold">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <header className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-[#1a237e]">Panel de Control Docente</h1>
            <div className="w-10 h-10 rounded-full bg-[#ffb300] text-[#1a237e] flex items-center justify-center font-bold">
                E
            </div>
        </header>
        {children}
      </main>
    </div>
  );
}
