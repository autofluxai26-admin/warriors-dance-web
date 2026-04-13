'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, UserPlus, BookOpen, Trash2, Loader2, X } from 'lucide-react';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('estudiante');

  const fetchUsuarios = async () => {
    setLoading(true);
    // Fetch profiles
    const { data: perfiles } = await supabase.from('profiles').select('*');
    
    // Obtenemos asignaturas para los profesores
    const { data: asignaturas } = await supabase.from('teacher_subjects').select('*');

    if (perfiles) {
      const enriquecidos = perfiles.map(p => ({
        ...p,
        materias: asignaturas?.filter(a => a.teacher_id === p.id).map(a => a.subject) || []
      }));
      setUsuarios(enriquecidos);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setIsCreating(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No estás autenticado');

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create_user`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          email,
          password,
          full_name: nombre,
          role: rol
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear usuario');
      }

      // Éxito:
      setIsModalOpen(false);
      setNombre('');
      setEmail('');
      setPassword('');
      setRol('estudiante');
      await fetchUsuarios(); // Recargar usuarios
    } catch (err: any) {
      setCreateError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Gestión de Usuarios</h2>
          <p className="text-slate-500 text-sm mt-1">Administra accesos y asigna materias a los profesores.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Nuevo Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Perfiles Activos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Nombre / ID</th>
                  <th className="px-6 py-4">Rol en Sistema</th>
                  <th className="px-6 py-4">Asignaturas (Profesores)</th>
                  <th className="px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto" />
                    </td>
                  </tr>
                ) : usuarios.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{usr.full_name || 'Sin Nombre'}</div>
                      <div className="text-xs text-slate-400 truncate max-w-[150px]">{usr.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize
                        ${usr.role === 'admin' ? 'bg-purple-100 text-purple-700' : ''}
                        ${usr.role === 'profesor' ? 'bg-orange-100 text-orange-700' : ''}
                        ${usr.role === 'estudiante' ? 'bg-blue-100 text-blue-700' : ''}
                      `}>
                        {usr.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {usr.role === 'profesor' ? (
                        <div className="flex flex-wrap gap-1">
                          {usr.materias.map((mat: string) => (
                            <span key={mat} className="text-[10px] uppercase font-bold bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
                              {mat}
                            </span>
                          ))}
                          <button className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors border border-blue-200">
                            + ASIGNAR
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-300 italic text-xs">No aplica</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel lateral instruccional */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-sm text-white p-6 relative h-max overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Guía de Acceso
          </h3>
          <p className="text-blue-100 text-sm leading-relaxed mb-4">
            Como administrador, puedes registrar nuevas cuentas. Recuerda que:
          </p>
          <ul className="space-y-3 text-sm text-blue-50 font-medium">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
              Los <strong>Profesores</strong> solo verán a los alumnos inscritos en las materias que tú les asignes.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
              Los <strong>Estudiantes</strong> solo tienen acceso a su propio panel.
            </li>
          </ul>
        </div>
      </div>

      {/* MODAL CREAR USUARIO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-1">Crear Nuevo Usuario</h3>
              <p className="text-sm text-slate-500 mb-6">Ingresa los datos para registrar un profesor o estudiante.</p>
              
              {createError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 outline-none"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 outline-none"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña Temporal</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 outline-none"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rol del Usuario</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRol('estudiante')}
                      className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                        rol === 'estudiante' 
                          ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20' 
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      Estudiante
                    </button>
                    <button
                      type="button"
                      onClick={() => setRol('profesor')}
                      className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                        rol === 'profesor' 
                          ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20' 
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      Profesor
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                    Crear Cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
