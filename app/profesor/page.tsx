'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, BookOpen, AlertCircle } from 'lucide-react';

export default function ProfesorDashboard() {
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [misMaterias, setMisMaterias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDatos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Obtenemos materias
        const { data: materias } = await supabase
          .from('teacher_subjects')
          .select('subject')
          .eq('teacher_id', session.user.id);
          
        if (materias) {
          setMisMaterias(materias.map(m => m.subject));
        }

        // Obtener estudiantes. 
        // Supabase filtrará MÁGICAMENTE los datos gracias a las políticas RLS. 
        // El profesor solo verá alumnos asignados a sus materias.
        const { data: alumnos } = await supabase
          .from('estudiantes_data')
          .select('*')
          .order('nombres', { ascending: true });
          
        if (alumnos) {
          setEstudiantes(alumnos);
        }
      }
      setLoading(false);
    };

    fetchDatos();
  }, []);

  const filteredEstudiantes = estudiantes.filter(est => 
    est.nombres.toLowerCase().includes(search.toLowerCase()) || 
    est.apellidos.toLowerCase().includes(search.toLowerCase()) ||
    est.curso_asignado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Banner Motivacional */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <BookOpen className="w-48 h-48 -mr-10 -mt-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">¡Hola, Profesor!</h2>
        <p className="text-indigo-100 max-w-2xl text-lg font-medium">Guiando a la próxima generación de campeones. ¡Tu esfuerzo y dedicación de hoy se convertirán en sus medallas del mañana!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                Mis Alumnos
              </h2>
              <p className="text-slate-500 text-sm mt-1">Directorio de estudiantes inscritos en tus materias asignadas.</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar alumno..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 bg-white shadow-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Estudiante</th>
                    <th className="px-6 py-4">Asignatura</th>
                    <th className="px-6 py-4">Edad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto" />
                      </td>
                    </tr>
                  ) : filteredEstudiantes.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                        {misMaterias.length === 0 
                          ? 'No tienes materias asignadas todavía. Pide a Administración que te asigne tus horarios.'
                          : 'No se encontraron estudiantes para tus asignaturas.'}
                      </td>
                    </tr>
                  ) : (
                    filteredEstudiantes.map((est) => (
                      <tr key={est.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800">
                          {est.nombres} {est.apellidos}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            <BookOpen className="w-3.5 h-3.5" />
                            {est.curso_asignado}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-600">
                          {est.edad} años
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info lateral */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Asignaturas a Cargo</h3>
          
          {loading ? (
             <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
          ) : misMaterias.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {misMaterias.map(m => (
                <span key={m} className="bg-slate-100 text-slate-700 font-bold border border-slate-200 px-3 py-1.5 rounded-lg text-sm">
                  {m}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 text-amber-800 p-4 rounded-xl text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>Tu perfil aún no tiene materias vinculadas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
