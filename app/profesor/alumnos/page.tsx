'use client';

import { Users, Phone, Mail, Award, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function AlumnosPage() {
  const [directory, setDirectory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('https://n8nautofluxweb.autofluxai26.com/webhook/warriors-students');
        if (response.ok) {
           const data = await response.json();
           let parsedData: any[] = [];
           if (Array.isArray(data)) {
              parsedData = data;
           } else if (data && typeof data === 'object') {
              if (data.data && Array.isArray(data.data)) {
                 parsedData = data.data;
              } else if (Object.keys(data).length > 0 && data.nombres) {
                 parsedData = [data];
              }
           }
           setDirectory(parsedData);
        } else {
           console.error("Error al obtener alumnos del webhook", await response.text());
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlumnos();
  }, []);

  return (
    <div className="space-y-6 text-[#191c1e]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-[#1a237e] flex items-center gap-2">
             <Users className="w-6 h-6 text-[#2b5bb5]" /> Directorio de Alumnos
           </h2>
           <p className="text-[#767683]">Gestiona perfiles, información de contacto y progresión técnica.</p>
        </div>
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a5aa]" />
           <input type="text" placeholder="Buscar alumno..." className="bg-white border text-sm border-[#e0e3e5] rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#1a237e] transition-colors w-full md:w-64 shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         {isLoading ? (
            <div className="col-span-2 flex flex-col items-center justify-center p-12 text-[#767683]">
               <Loader2 className="w-8 h-8 animate-spin text-[#1a237e] mb-4" />
               <p className="font-bold">Sincronizando con base de datos de estudiantes...</p>
            </div>
         ) : directory.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center p-12 text-[#767683] bg-white rounded-[2rem] border border-[#e0e3e5]">
               <Users className="w-12 h-12 text-[#bdc2ff] mb-4" />
               <p className="font-bold">No hay alumnos inscritos en este curso todavía.</p>
            </div>
         ) : (
            directory.map((al, idx) => (
             <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e0e3e5] hover:border-[#bdc2ff] transition-colors flex gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a237e] to-[#2b5bb5] text-white flex items-center justify-center text-2xl font-black shadow-inner flex-shrink-0">
                   {(al.nombres || '!').charAt(0)}
                </div>
                <div className="flex-1 space-y-3">
                   <div className="flex items-start justify-between">
                      <div>
                          <h3 className="font-extrabold text-lg leading-tight">{al.nombres} {al.apellidos}</h3>
                          <p className="text-[#a0a5aa] text-xs font-bold uppercase">{al.edad} años • Nivel Básico</p>
                      </div>
                      <span className="bg-[#f2f4f6] text-[#454652] py-1 px-3 text-xs font-bold rounded-lg truncate max-w-[120px] text-center">{al.curso}</span>
                   </div>
                   
                   <div className="pt-2 border-t border-[#f2f4f6] flex flex-col gap-1.5 text-sm">
                      <div className="flex items-center gap-2 text-[#454652]"><Phone className="w-4 h-4 text-[#767683]" /> Representante: {al.celular}</div>
                      <div className="flex items-center gap-2 text-[#454652]"><Mail className="w-4 h-4 text-[#767683]" /> {al.correo}</div>
                   </div>
                </div>
             </div>
           ))
         )}
      </div>
    </div>
  );
}
