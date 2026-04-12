import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const serviceData: Record<string, { title: string, subtitle: string, image: string, description: string, schedules: string[], benefits: string[] }> = {
  'jazz': {
    title: 'JAZZ',
    subtitle: 'Técnica, fuerza y estilo escénico',
    image: '/images/logros/logro1.jpg',
    description: 'El Jazz es una disciplina vibrante que combina técnicas del ballet clásico con movimientos rápidos y aislados. En esta clase desarrollarás una presencia escénica inigualable, musicalidad y expresión estilizada.',
    schedules: ['Lunes y Miércoles 4:00 PM', 'Martes y Jueves 5:30 PM'],
    benefits: ['Aumento de agilidad corporal', 'Mejora de la memoria coreográfica', 'Desarrollo de fuerza en el tren inferior']
  },
  'danza-contemporanea': {
    title: 'DANZA CONTEMPORÁNEA',
    subtitle: 'Expresión libre, conexión y fluidez corporal',
    image: '/images/logros/logro4.jpg',
    description: 'A través de la danza contemporánea explorarás las capacidades expresivas de tu cuerpo, el uso del espacio, caídas, recuperación y la respiración como motor principal del movimiento orgánico.',
    schedules: ['Lunes y Miércoles 5:30 PM', 'Viernes 3:00 PM'],
    benefits: ['Conciencia corporal profunda', 'Liberación emocional', 'Mejora del control de centro (core)']
  },
  'ritmos-modernos': {
    title: 'RITMOS MODERNOS',
    subtitle: 'Energía y tendencias coreográficas actuales',
    image: '/images/logros/logro2.jpg',
    description: 'Clases enfocadas en los ritmos urbanos y comerciales que dominan la industria actual (Hip-Hop, Reggaeton, K-pop). Aquí aprenderás a soltar el cuerpo, ganar agilidad y proyectar mucha actitud.',
    schedules: ['Viernes 4:30 PM', 'Sábados 10:00 AM'],
    benefits: ['Coordinación rápida', 'Cardio dinámico y divertido', 'Desarrollo del groove y estilo personal']
  },
  'ritmos-tropicales': {
    title: 'RITMOS TROPICALES',
    subtitle: 'Salsa, bachata y merengue con precisión escénica',
    image: '/images/logros/logro5.jpg',
    description: 'Domina los ritmos latinos con técnica de competencia. Se trabajan giros, disociación, secuencias de impacto y toda la sabrosura de la danza caribeña enfocada en shows.',
    schedules: ['Martes y Jueves 7:00 PM', 'Sábados 11:30 AM'],
    benefits: ['Resistencia cardiovascular', 'Disociación corporal (caderas y hombros)', 'Ritmo auditivo y musicalidad']
  },
  'danza-arabe': {
    title: 'DANZA ÁRABE',
    subtitle: 'Control, aislamiento y misticismo',
    image: '/images/logros/logro3.jpg',
    description: 'El Bellydance requiere una precisión técnica increíble. Aprenderás aislamientos musculares, movimientos ondulantes y secuencias rítmicas orientales mientras fortaleces los músculos internos.',
    schedules: ['Miércoles 6:30 PM', 'Sábados 9:00 AM'],
    benefits: ['Tonificación abdominal', 'Mejora de la flexibilidad de la columna', 'Control muscular aislado']
  },
  'flexibilidad': {
    title: 'FLEXIBILIDAD',
    subtitle: 'Prepara tu cuerpo y mejora tu extensión',
    image: '/images/logros/logro4.jpg',
    description: 'La clase esencial para todo bailarín. Utilizamos métodos biomecánicos y pasivos para aumentar el rango de movimiento de forma segura, logrando splits, arcos y extensiones máximas.',
    schedules: ['Lunes, Miércoles y Viernes 2:00 PM'],
    benefits: ['Prevención de lesiones articulares', 'Aumento del rango de movilidad', 'Postura correcta y balanceada']
  },
  'acrobacias': {
    title: 'ACROBACIAS',
    subtitle: 'Agilidad, control y poder aéreo',
    image: '/images/logros/logro1.jpg',
    description: 'Aprende los fundamentos de la gimnasia y la acrobacia aplicados a la danza. Desde rodadas, saltos mortales hasta equilibrios en brazos, superando tus propios límites corporales.',
    schedules: ['Martes y Jueves 4:00 PM', 'Sábados 1:00 PM'],
    benefits: ['Fuerza explosiva', 'Pérdida del miedo e incremento de adrenalina', 'Dominio espacial y equilibrio']
  },
  'preparacion-fisica': {
    title: 'PREPARACIÓN FÍSICA',
    subtitle: 'Acondicionamiento para el máximo rendimiento',
    image: '/images/logros/logro2.jpg',
    description: 'Un atleta de la danza necesita un motor fuerte. Rutinas intensivas de resistencia, hipertrofia muscular enfocada en ballet/danza y ejercicios pliométricos para preparar tu cuerpo ante rutinas demandantes.',
    schedules: ['Lunes a Viernes 8:00 AM', 'Lunes a Viernes 8:00 PM'],
    benefits: ['Resistencia cardíaca e hipertrofia funcional', 'Potencia en saltos', 'Estabilidad articular']
  }
};

export default async function ServicioPage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  // Normalize params to handle browser URL encoding like "danza%20contemporanea" -> "danza-contemporanea"
  const slug = decodeURIComponent(curso).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-');
  const data = serviceData[slug] || {
    title: 'Programa Especializado',
    subtitle: 'Descubre nuestra metodología Artística',
    image: '/images/logros/logro3.jpg',
    description: 'Este es uno de nuestros exclusivos programas de formación artística en Warriors Dance. Contáctanos para conocer horarios y niveles disponibles en nuestra escuela.',
    schedules: ['Horarios a convenir según disponibilidad'],
    benefits: ['Desarrollo artístico asegurado', 'Clases dictadas por profesionales']
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
       <div className="container mx-auto p-4 md:p-8">
          <Link href="/#cursos" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors mb-8 bg-blue-50/50 hover:bg-blue-100 px-4 py-2 rounded-full w-fit">
            <ArrowLeft className="w-5 h-5" /> Volver a los cursos
          </Link>

          <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.1)] overflow-hidden border border-slate-100 max-w-6xl mx-auto flex flex-col lg:flex-row">
             {/* Lado Imagen */}
             <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-slate-900 to-slate-900"></div>
                </div>
                {/* Geometría abstracta para modernidad */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
                
                <div className="relative z-10 w-64 h-64 md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_60px_rgba(37,99,235,0.2)]">
                   <Image src="/logo_wd.jpg" alt="Warriors Dance Oficial" fill className="object-contain bg-white" />
                </div>
                
                <div className="absolute bottom-8 left-8 z-20">
                   <span className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg border border-blue-400/30">Warriors Dance</span>
                </div>
             </div>

             {/* Lado Contenido */}
             <div className="w-full lg:w-1/2 p-8 md:p-14 space-y-10">
                <div>
                   <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-3">{data.title}</h1>
                   <p className="text-xl font-medium text-blue-600">{data.subtitle}</p>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed">
                   {data.description}
                </p>

                <div className="space-y-6">
                   <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-blue-500 w-5 h-5" /> Beneficios principales
                      </h3>
                      <ul className="space-y-3">
                         {data.benefits.map((bene, i) => (
                           <li key={i} className="flex gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                             <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                             <span>{bene}</span>
                           </li>
                         ))}
                      </ul>
                   </div>

                   <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Clock className="text-blue-600 w-5 h-5" /> Horarios de clases
                      </h3>
                      <ul className="space-y-2">
                         {data.schedules.map((hr, idx) => (
                           <li key={idx} className="flex gap-2 items-center text-slate-700 font-medium">
                             <Calendar className="w-4 h-4 text-blue-400" /> {hr}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="pt-6">
                   <Link href="/#inscripcion" className="inline-flex w-full sm:w-auto items-center justify-center bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.5)] hover:-translate-y-1 hover:bg-blue-500 transition-all">
                     Separar mi cupo
                   </Link>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
