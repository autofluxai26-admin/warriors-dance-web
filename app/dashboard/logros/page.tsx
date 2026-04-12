import { Award, Trophy, Star, Medal } from "lucide-react";

export default function LogrosPage() {
  const achievements = [
    { icon: <Award className="w-8 h-8 text-[#ffb300]" />, title: "Asistencia Perfecta", desc: "Completaste el 100% de clases en marzo.", date: "Hace 1 semana" },
    { icon: <Trophy className="w-8 h-8 text-[#000666]" />, title: "Gran Campeón Salinas", desc: "Participación estelar en la categoría Coreografía Grupal.", date: "Mayo 2025" },
    { icon: <Star className="w-8 h-8 text-[#2b5bb5]" />, title: "Mejor Expresión Escénica", desc: "Reconocimiento interno en Masterclass.", date: "Enero 2026" },
    { icon: <Medal className="w-8 h-8 text-[#a0a5aa]" />, title: "Superando Límites", desc: "Dominaste el split frontal en Flexibilidad.", date: "Hace 3 días" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#1a237e] text-white rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
         <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
         <div>
            <h2 className="text-3xl font-extrabold mb-2">Sala de Trofeos</h2>
            <p className="text-[#bdc2ff] max-w-md">Tu dedicación rinde frutos. Aquí guardamos tu progreso e hitos más importantes dentro de Warriors Dance.</p>
         </div>
         <div className="mt-6 md:mt-0 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 text-white font-bold text-2xl shadow-xl">
            LVL 5
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 flex items-start gap-5 shadow-sm border border-[#e0e3e5] hover:-translate-y-1 transition-transform group">
            <div className="p-4 bg-[#fff8e1] rounded-2xl group-hover:bg-[#ffedb3] transition-colors">
              {ach.icon}
            </div>
            <div>
              <h3 className="font-bold text-[#191c1e] text-lg mb-1">{ach.title}</h3>
              <p className="text-[#454652] text-sm mb-2 leading-relaxed">{ach.desc}</p>
              <span className="text-xs font-semibold text-[#a0a5aa] bg-[#f7f9fb] px-2 py-1 rounded-md">{ach.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
