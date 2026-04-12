import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export default function HorarioPage() {
  const schedule = [
    { day: "Lunes", classes: [{ name: "Jazz Principiantes", time: "16:00 - 17:30", room: "Sala B" }, { name: "Contemporáneo", time: "18:00 - 19:30", room: "Sala A" }] },
    { day: "Martes", classes: [{ name: "Acrobacias", time: "16:00 - 17:30", room: "Gym" }] },
    { day: "Miércoles", classes: [{ name: "Jazz Principiantes", time: "16:00 - 17:30", room: "Sala B" }, { name: "Contemporáneo", time: "18:00 - 19:30", room: "Sala A" }] },
    { day: "Jueves", classes: [{ name: "Acrobacias", time: "16:00 - 17:30", room: "Gym" }] },
    { day: "Viernes", classes: [{ name: "Preparación Física", time: "17:00 - 18:00", room: "Exteriores" }] },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#e0e3e5]">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#e0e0ff] rounded-xl text-[#000666]">
          <CalendarIcon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#000666]">Mi Horario Semanal</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {schedule.map((dayPlan, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="bg-[#1a237e] text-white py-3 text-center rounded-t-xl font-bold mb-2">
              {dayPlan.day}
            </div>
            <div className="flex-1 bg-[#f7f9fb] rounded-b-xl p-3 space-y-3">
              {dayPlan.classes.length === 0 ? (
                <div className="text-center text-[#a0a5aa] text-sm py-4">Libre</div>
              ) : (
                dayPlan.classes.map((c, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#e0e3e5] hover:border-[#2b5bb5] transition-colors">
                    <h4 className="font-bold text-[#191c1e] text-sm mb-2">{c.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-[#767683] mb-1">
                      <Clock className="w-3 h-3 text-[#2b5bb5]" /> {c.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#767683]">
                      <MapPin className="w-3 h-3 text-[#bdc2ff]" /> {c.room}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
