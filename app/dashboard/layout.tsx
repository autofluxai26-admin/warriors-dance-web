'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, Calendar, MessageSquare, Award, LogOut, Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkEstudiante = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?role=estudiante');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', session.user.id)
        .single();

      if (!profile || (profile.role !== 'estudiante' && profile.role !== 'admin')) {
        router.push('/login?role=estudiante');
        return;
      }

      setProfile(profile);
      setLoading(false);
    };

    checkEstudiante();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f4f6]">
        <Loader2 className="w-10 h-10 animate-spin text-[#000666]" />
      </div>
    );
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Guerrero';
  const initial = firstName.charAt(0).toUpperCase();

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
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white bg-[#191c1e] hover:bg-[#2d3133] transition-colors font-semibold">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 p-6 bg-gradient-to-r from-[#000666] to-[#1a237e] rounded-2xl text-white shadow-md relative overflow-hidden flex items-start justify-between">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Award className="w-48 h-48 -mr-10 -mt-10" />
          </div>
          <div className="relative z-10 w-full flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">Bienvenido de vuelta, {firstName}</h1>
              <p className="text-[#a0c4ff] max-w-xl text-lg font-medium leading-relaxed">
                El verdadero talento es la suma de horas de disciplina. ¡Hoy somos mejores que ayer! Sigue brillando en la pista de baile.
              </p>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-white text-[#000666] flex items-center justify-center font-bold text-xl shadow-inner shrink-0 ml-4 hidden sm:flex border-2 border-[#a0c4ff]">
                {initial}
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
