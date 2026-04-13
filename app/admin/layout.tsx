'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, LogOut, Users, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?role=profesor');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        router.push('/login?role=profesor');
        return;
      }

      setProfile(profile);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <ShieldCheck className="w-6 h-6 text-blue-500 mr-3" />
          <span className="font-bold text-white text-lg tracking-wide">Admin Pannel</span>
        </div>
        
        <div className="flex-1 py-8 flex flex-col gap-2 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5" />
            Estudiantes
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Usuarios y Roles
          </Link>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="px-4 py-3 mb-4">
            <p className="text-sm font-semibold text-white">{profile.full_name}</p>
            <p className="text-xs text-slate-500 capitalize">{profile.role}</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">Panel de Control - Warriors Dance</h1>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
