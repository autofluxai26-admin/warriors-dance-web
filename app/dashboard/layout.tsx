import Link from "next/link";
import { LayoutDashboard, Calendar, MessageSquare, Award, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f2f4f6] flex text-[#191c1e]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e0e3e5] hidden md:flex flex-col">
        <div className="p-6 border-b border-[#e0e3e5]">
          <span className="font-extrabold text-2xl tracking-tighter text-[#000666]">
            WD<span className="text-[#2b5bb5]">.</span>
          </span>
          <p className="text-xs text-[#767683] mt-1 font-semibold uppercase">Portal del Estudiante</p>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e0e0ff] text-[#000666] font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Muro Social
          </Link>
          <Link href="/dashboard/horario" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#454652] hover:bg-[#f7f9fb] hover:text-[#000666] font-medium transition-colors">
            <Calendar className="w-5 h-5" />
            Mi Horario
          </Link>
          <Link href="/dashboard/logros" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#454652] hover:bg-[#f7f9fb] hover:text-[#000666] font-medium transition-colors">
            <Award className="w-5 h-5" />
            Logros
          </Link>
          <Link href="/dashboard/feedback" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#454652] hover:bg-[#f7f9fb] hover:text-[#000666] font-medium transition-colors">
            <MessageSquare className="w-5 h-5" />
            Feedback
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[#e0e3e5]">
           <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white bg-[#191c1e] hover:bg-[#2d3133] transition-colors font-semibold">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-[#000666]">Bienvenido de vuelta, Guerrero</h1>
            <div className="w-10 h-10 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-bold">
                A
            </div>
        </header>
        {children}
      </main>
    </div>
  );
}
