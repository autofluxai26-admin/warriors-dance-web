'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Filter, Loader2, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEstudiantes = async () => {
      const { data, error } = await supabase
        .from('estudiantes_data')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setEstudiantes(data);
      }
      setLoading(false);
    };

    fetchEstudiantes();
  }, []);

  const filteredEstudiantes = estudiantes.filter(est => 
    est.nombres.toLowerCase().includes(search.toLowerCase()) || 
    est.apellidos.toLowerCase().includes(search.toLowerCase()) ||
    est.curso_asignado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Directorio de Estudiantes</h2>
          <p className="text-slate-500 text-sm mt-1">Base de datos central con todos los alumnos matriculados.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar alumno o curso..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 bg-white shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Curso Asignado</th>
                <th className="px-6 py-4">Edad / Fecha Nac.</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Fecha Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto" />
                  </td>
                </tr>
              ) : filteredEstudiantes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No se encontraron estudiantes registrados.
                  </td>
                </tr>
              ) : (
                filteredEstudiantes.map((est) => (
                  <tr key={est.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {est.nombres} {est.apellidos}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        <BookOpen className="w-3.5 h-3.5" />
                        {est.curso_asignado}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {est.edad} años
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">{est.celular || 'N/A'}</span>
                        <span className="text-xs text-slate-400">{est.correo || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {new Date(est.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
