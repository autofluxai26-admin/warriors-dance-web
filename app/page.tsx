'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, ChevronRight, Play, Trophy, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    diaNac: '',
    mesNac: '',
    anioNac: '',
    curso: '',
    vacacionalCat: '',
    celular: '',
    correo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('enrollment_data', JSON.stringify(formData));
    }
    router.push('/checkout');
  };

  const services = [
    { id: 'jazz', name: 'JAZZ', desc: 'Técnica, fuerza y estilo en cada movimiento.' },
    { id: 'danza-contemporanea', name: 'DANZA CONTEMPORÁNEA', desc: 'Expresión libre, conexión y fluidez corporal.' },
    { id: 'ritmos-modernos', name: 'RITMOS MODERNOS', desc: 'Energía y tendencias coreográficas actuales.' },
    { id: 'ritmos-tropicales', name: 'RITMOS TROPICALES', desc: 'Salsa, bachata y merengue con precisión escénica.' },
    { id: 'danza-arabe', name: 'DANZA ÁRABE', desc: 'Control, aislamiento y misticismo.' },
    { id: 'flexibilidad', name: 'FLEXIBILIDAD', desc: 'Prepara tu cuerpo y mejora tu extensión.' },
    { id: 'acrobacias', name: 'ACROBACIAS', desc: 'Agilidad, control y poder aéreo.' },
    { id: 'preparacion-fisica', name: 'PREPARACIÓN FÍSICA', desc: 'Acondicionamiento para el máximo rendimiento.' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-blue-100/50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Oficial */}
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-[0_0_15px_rgba(37,99,235,0.4)] relative">
               <Image src="/logo_wd.jpg" alt="Warriors Dance Logo" fill className="object-cover" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-xl leading-tight text-blue-900 tracking-tight">Warriors Dance</span>
              <span className="text-xs text-blue-600 font-semibold tracking-wider uppercase">Centro Artístico</span>
            </div>
          </div>
          <nav className="hidden lg:flex gap-6 xl:gap-8 text-sm font-semibold tracking-wide text-slate-600">
            <a href="#inicio" className="hover:text-blue-600 transition-colors">INICIO</a>
            <a href="#nosotros" className="hover:text-blue-600 transition-colors">NOSOTROS</a>
            <a href="#cursos" className="hover:text-blue-600 transition-colors">OFERTA</a>
            <a href="#logros" className="hover:text-blue-600 transition-colors">LOGROS</a>
            <a href="#inscripcion" className="hover:text-blue-600 transition-colors">INSCRIPCIÓN</a>
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative group">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                onBlur={() => setTimeout(() => setIsProfileMenuOpen(false), 200)}
                className="flex items-center justify-center gap-1.5 md:gap-2 text-blue-600 font-bold text-sm md:text-sm tracking-wide hover:text-blue-800 transition-all py-2 px-1"
              >
                <div className="bg-blue-100 p-1.5 rounded-full md:bg-transparent md:p-0">
                  <User className="w-5 h-5 md:w-4 md:h-4" />
                </div>
                <span className="hidden sm:inline">Acceso a Perfil</span>
                <span className="inline sm:hidden">Perfil</span>
              </button>
              <div 
                className={`absolute top-full right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_rgba(37,99,235,0.15)] transition-all duration-200 overflow-hidden z-[100] ${isProfileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0`}
              >
                <Link href="/login?role=estudiante" className="block px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-slate-50">
                  Panel de Estudiantes
                </Link>
                <Link href="/login?role=profesor" className="block px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  Panel Profesor / Admin
                </Link>
              </div>
            </div>
            <a href="#inscripcion" className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 xl:px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all">
              Matricularse <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#inscripcion" className="flex sm:hidden items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-md active:bg-blue-700">
              Registrarse
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight uppercase leading-[1.1]">
              BIENVENIDOS A <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-sm">WARRIORS DANCE</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Transformamos la pasión en arte y disciplina. Únete al centro artístico de alto rendimiento y descubre tu verdadero potencial en el escenario.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <a href="#cursos" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300">
                Nuestras Clases
              </a>
              <a href="#logros" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 border border-blue-100 rounded-full font-bold text-lg shadow-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:-translate-y-1 transition-all duration-300">
                Ver Premiaciones
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-24 bg-white relative">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-square max-w-md mx-auto rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.2)] bg-slate-100 relative">
                     {/* Imagen ilustrativa nosotros */}
                     <Image src="/images/logros/trofeos.jpg" alt="Escuela de Danza" fill className="object-cover" />
                     <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10" />
               </div>
               <div className="w-full lg:w-1/2 space-y-10">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-4">¿QUIÉNES <span className="text-blue-600">SOMOS?</span></h2>
                    <p className="text-slate-600 text-lg">Más que una academia, somos una familia dedicada a la excelencia artística y la proyección nacional e internacional de nuestros talentos.</p>
                  </div>
                  
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                     <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                     <h3 className="text-2xl font-bold text-slate-800 mb-3">MISIÓN</h3>
                     <p className="text-slate-600 leading-relaxed">
                       En Warriors Dance, nuestra misión es formar artistas integrales y personas empoderadas, fomentando la pasión por la danza y el desarrollo personal en un entorno inclusivo y diverso, donde cada individuo se sienta valorado y apoyado para alcanzar su máximo potencial.
                     </p>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                     <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
                     <h3 className="text-2xl font-bold text-slate-800 mb-3">VISIÓN</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Ser una academia de danza líder a nivel internacional, reconocida por su excelencia artística y su compromiso con el desarrollo integral de sus alumnos. Aspiramos a proyectar a nuestros bailarines a escenarios nacionales e internacionales, fomentando la colaboración con artistas de renombre y promoviendo la cultura y la danza ecuatoriana en el mundo.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CLASES / CURSOS */}
      <section id="cursos" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm tracking-widest uppercase mb-4">Aprende con los mejores</span>
            <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">OFERTA <span className="text-blue-600">ACADÉMICA</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((curso) => (
              <div key={curso.id} className="group relative bg-white rounded-[2rem] p-8 hover:bg-blue-600 transition-colors duration-500 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] border border-slate-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-400 transition-colors duration-500 -mr-10 -mt-10" />
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-white relative z-10 mb-3 leading-tight">{curso.name}</h3>
                <p className="text-slate-600 text-sm group-hover:text-blue-100 relative z-10 mb-8">{curso.desc}</p>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600 group-hover:text-white uppercase tracking-wider">Detalles</span>
                  <Link href={`/servicios/${curso.id}`} className="w-12 h-12 rounded-full bg-slate-50 shadow-[0_0_15px_rgba(37,99,235,0.1)] group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center text-blue-600 group-hover:-rotate-45 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CURSOS VACACIONALES */}
          <div className="mt-20">
             <div className="bg-blue-600 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)]">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-white/50" />
                
                <div className="relative z-10 text-center mb-10">
                   <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4">CURSOS VACACIONALES 2026</h3>
                   <p className="text-blue-100 text-lg max-w-2xl mx-auto">La mejor experiencia para tu desarrollo artístico durante las vacaciones. Elige tu categoría según edad.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                   <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center hover:bg-white/20 transition cursor-default">
                      <h4 className="text-2xl font-bold text-white mb-2">BABYS</h4>
                      <p className="text-yellow-300 font-bold text-sm mb-4">3 a 6 años</p>
                      <div className="inline-block bg-white text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">3:00pm - 4:00pm</div>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center hover:bg-white/20 transition cursor-default">
                      <h4 className="text-2xl font-bold text-white mb-2">MINIS</h4>
                      <p className="text-yellow-300 font-bold text-sm mb-4">7 a 10 años</p>
                      <div className="inline-block bg-white text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">4:00pm - 5:30pm</div>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center hover:bg-white/20 transition cursor-default">
                      <h4 className="text-2xl font-bold text-white mb-2">ELITES</h4>
                      <p className="text-yellow-300 font-bold text-sm mb-4">11 años en adelante</p>
                      <div className="inline-block bg-white text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">5:30pm - 7:00pm</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* TÍTULOS Y LOGROS (CARRUSEL) */}
      <section id="logros" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold uppercase tracking-tight flex items-center justify-center gap-3">
              <Trophy className="text-yellow-400 w-10 h-10" /> 
              NUESTROS <span className="text-blue-400">LOGROS</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Ganadores del "Gran Campeón Salinas 2025" y múltiples galardones por esfuerzo, disciplina y pasión. Generamos confianza y garantizamos resultados.
            </p>
          </div>

          <div className="w-full overflow-hidden relative">
             <div className="flex gap-8 animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused] py-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="flex-none w-[280px] md:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden relative border-[6px] border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <Image src={`/images/logros/real${item}.jpeg`} alt={`Logro ${item}`} fill className="object-cover" />
                  </div>
                ))}
                {/* Duplicar para efecto infinito */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={`dup-${item}`} className="flex-none w-[280px] md:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden relative border-[6px] border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <Image src={`/images/logros/real${item}.jpeg`} alt={`Logro ${item}`} fill className="object-cover" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-3456px)); } /* ((400px + 32px) * 8) = 3456px */
          }
        `}} />
      </section>

      {/* VIDEO / MEDIA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(37,99,235,0.15)] p-4 md:p-8 relative overflow-hidden border border-slate-100">
             <div className="text-center mb-8 pt-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2 max-w-fit mx-auto">
                   <Play className="w-4 h-4 fill-red-600" /> Televisión Nacional
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Proyección y Espectáculo</h2>
                <p className="text-slate-500 mt-2">Nuestros alumnos presentes en los mejores escenarios.</p>
             </div>
             
             <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-slate-900 relative shadow-2xl border-4 border-white">
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/z8TXSng4PyI?rel=0" 
                  title="Presentación Warriors Dance" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* MATRÍCULA E INSCRIPCIÓN */}
      <section id="inscripcion" className="py-32 bg-gradient-to-b from-slate-50 to-blue-50/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] border border-blue-50 overflow-hidden">
            <div className="bg-blue-600 p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20" />
              <h2 className="text-4xl font-bold text-white relative z-10 mb-3">Comienza Tu Viaje Artístico</h2>
              <p className="text-blue-100 relative z-10 text-lg">Llena el formulario para iniciar tu proceso de inscripción.</p>
            </div>
            
            <form onSubmit={handleEnrollment} className="p-8 md:p-12 space-y-8">
              {/* Nombres Completos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nombres <span className="text-red-500">*</span></label>
                  <input required name="nombres" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400" placeholder="Ej. Juan" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Apellidos <span className="text-red-500">*</span></label>
                  <input required name="apellidos" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400" placeholder="Ej. Pérez" />
                </div>
              </div>

              {/* Edad y Fecha Nacimiento interactivo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Edad <span className="text-red-500">*</span></label>
                   <input required type="number" min="3" max="99" name="edad" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700" placeholder="Años" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600"/> Fecha de Nacimiento <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    <select required name="diaNac" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-3 py-4 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer font-medium text-slate-600">
                      <option value="">Día</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                    <select required name="mesNac" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-3 py-4 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer font-medium text-slate-600">
                       <option value="">Mes</option>
                       {['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'].map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                    </select>
                    <select required name="anioNac" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-3 py-4 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer font-medium text-slate-600">
                       <option value="">Año</option>
                       {Array.from({length: 40}, (_, i) => new Date().getFullYear() - i).map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Selector de Curso y Condicional */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Curso a inscribirse <span className="text-red-500">*</span></label>
                <select required name="curso" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer font-medium text-slate-700 appearance-none">
                  <option value="">Seleccione un programa o servicio...</option>
                  <option value="jazz">Jazz</option>
                  <option value="danzacontemporanea">Danza Contemporánea</option>
                  <option value="ritmosmodernos">Ritmos Modernos</option>
                  <option value="ritmostropicales">Ritmos Tropicales</option>
                  <option value="danzaarabe">Danza Árabe</option>
                  <option value="flexibilidad">Flexibilidad</option>
                  <option value="acrobacias">Acrobacias</option>
                  <option value="preparacionfisica">Preparación Física</option>
                  <option value="vacacional">Cursos Vacacional 2026</option>
                </select>
              </div>

              {/* Si Elige Vacacional, Mostramos Subcategorías */}
              {formData.curso === 'vacacional' && (
                <div className="space-y-3 bg-blue-50 p-6 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-4">
                   <label className="text-sm font-bold text-blue-900">Categoría Vacacional (Obligatoria)</label>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-400 transition-colors">
                         <input type="radio" required name="vacacionalCat" value="babys" onChange={handleChange} className="w-5 h-5 accent-blue-600" />
                         <span className="font-bold text-sm text-slate-700">Babys (3-6 años)</span>
                      </label>
                      <label className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-400 transition-colors">
                         <input type="radio" required name="vacacionalCat" value="minis" onChange={handleChange} className="w-5 h-5 accent-blue-600" />
                         <span className="font-bold text-sm text-slate-700">Minis (7-10 años)</span>
                      </label>
                      <label className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-400 transition-colors">
                         <input type="radio" required name="vacacionalCat" value="elites" onChange={handleChange} className="w-5 h-5 accent-blue-600" />
                         <span className="font-bold text-sm text-slate-700">Elites (11+ años)</span>
                      </label>
                   </div>
                </div>
              )}

              {/* Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nº Celular <span className="text-red-500">*</span></label>
                  <input required type="tel" name="celular" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700" placeholder="Ej. 0991234567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Correo Electrónico <span className="text-red-500">*</span></label>
                  <input required type="email" name="correo" onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700" placeholder="correo@ejemplo.com" />
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                  Inscribirse y continuar con el checkout
                  <ArrowRight className="w-6 h-6"/>
                </button>
                <p className="text-center text-xs font-semibold text-slate-400 mt-6 flex items-center justify-center gap-1">
                  Protegido por seguridad de Nivel Empresarial.
                </p>
              </div>

            </form>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-8 md:mb-0">
               <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] relative">
                  <Image src="/logo_wd.jpg" alt="Logo Warriors Dance" fill className="object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-xl leading-tight text-white tracking-tight">Warriors Dance</span>
                 <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase">Escuela de Danza</span>
               </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4 mt-8 md:mt-0">
               <div className="text-sm font-medium text-center md:text-right">
                  <p className="mb-2">Diseñado para la formación artística de alto nivel.</p>
                  <p>&copy; 2026 Warriors Dance. Todos los derechos reservados.</p>
               </div>
               <a 
                 href="https://www.instagram.com/warriorsdance.ec/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-slate-400 hover:text-[#E1306C] transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full font-bold text-sm"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                 </svg>
                 @warriorsdance.ec
               </a>
            </div>
         </div>
      </footer>
    </div>
  );
}
