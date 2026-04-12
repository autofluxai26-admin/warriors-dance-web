'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Lock, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [studentData, setStudentData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Recuperar datos de inscripción guardados
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('enrollment_data');
      if (stored) {
        setStudentData(JSON.parse(stored));
      }
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Preparar el payload para N8N (Google Sheets)
    const payload = {
       ...studentData,
       fechaInscripcion: new Date().toISOString(),
       estadoPago: 'Pagado'
    };

    try {
      // 1. Enviar datos a N8N Webhook (POST)
      const response = await fetch('https://n8nautofluxweb.autofluxai26.com/webhook/warriors-enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.warn('Advertencia: El webhook devolvió un estado no exitoso.', await response.text());
      }
      
      // 2. Simular tiempo de validación bancaria estética
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        // Limpiar el localStorage después del pago exitoso
        localStorage.removeItem('enrollment_data');
        setTimeout(() => router.push('/dashboard'), 3000);
      }, 1500);

    } catch (error) {
      console.error('Error al contactar con N8N:', error);
      setIsProcessing(false);
      alert('Hubo un error al procesar la inscripción. Por favor inténtalo de nuevo.');
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.15)] text-center max-w-md w-full border border-slate-100 flex flex-col items-center animate-in fade-in zoom-in duration-500">
           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
           </div>
           <h2 className="text-3xl font-black text-slate-900 mb-2">¡Inscripción Exitosa!</h2>
           <p className="text-slate-600 mb-8">
             Bienvenido a la familia Warriors Dance, {studentData?.nombres}. Tu pago ha sido procesado correctamente.
           </p>
           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-600 w-full animate-[pulse_1s_ease-in-out_infinite]" />
           </div>
           <p className="text-sm font-bold text-slate-400 mt-4">Redirigiendo a tu portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <div className="mb-8">
           <Link href="/#inscripcion" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm w-fit border border-slate-200">
             <ArrowLeft className="w-4 h-4" /> Volver
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Lado Derecho: Resumen del Pedido (Se muestra a la izquierda en desktop) */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
             <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                   Resumen de Inscripción
                </h3>

                {studentData ? (
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Estudiante</p>
                      <p className="text-lg font-bold">{studentData.nombres} {studentData.apellidos}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Programa Seleccionado</p>
                      <p className="text-lg font-bold capitalize">{studentData.curso === 'vacacional' ? `Vacacional - ${studentData.vacacionalCat}` : studentData.curso.replace(/-/g, ' ')}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Correo Electrónico</p>
                      <p className="text-lg font-bold truncate">{studentData.correo}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-blue-200 mb-8 bg-blue-900/50 p-4 rounded-xl">No se encontraron datos de inscripción. ¿Llenaste el formulario completo?</p>
                )}

                <div className="space-y-3 pt-6 border-t border-white/10">
                   <div className="flex justify-between text-blue-100">
                      <span>Matrícula Anual</span>
                      <span className="font-bold">$40.00</span>
                   </div>
                   <div className="flex justify-between text-blue-100">
                      <span>Mensualidad (Primer Mes)</span>
                      <span className="font-bold">$60.00</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/20">
                      <span className="text-xl font-bold text-white">Total a Pagar</span>
                      <span className="text-3xl font-black text-yellow-400">$100.00</span>
                   </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex gap-4 items-start">
                <ShieldCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Garantía Warriors Dance</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Te garantizamos potenciar tu desarrollo artístico en los primeros 3 meses. Pagos procesados a través de servidores encriptados (SSL 256-bit).</p>
                </div>
             </div>
          </div>

          {/* Lado Izquierdo: Formulario de Pago (Se muestra a la derecha en desktop) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
             <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.1)] border border-slate-100">
                <div className="mb-10">
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Método de Pago</h2>
                   <p className="text-slate-500 font-medium">Completa tu registro seguro para apartar tu cupo en Warriors Dance.</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-8">
                   {/* Tarjeta Mockup UI */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-full p-4 border-2 border-blue-600 bg-blue-50/50 rounded-2xl flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                               <CreditCard className="w-6 h-6 text-blue-600" />
                               <span className="font-bold text-blue-900">Tarjeta de Crédito / Débito</span>
                            </div>
                            <div className="w-5 h-5 rounded-full border-4 border-blue-600 bg-white" />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Nombre en la tarjeta</label>
                         <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 uppercase" placeholder="JOHN DOE" />
                      </div>

                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Número de Tarjeta</label>
                         <div className="relative">
                            <input required type="text" maxLength={19} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 tracking-widest placeholder:tracking-normal" placeholder="0000 0000 0000 0000" />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Vencimiento</label>
                            <input required type="text" maxLength={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700" placeholder="MM/YY" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                               <span>CVC</span>
                               <span className="text-xs text-slate-400 font-normal">3 dígitos</span>
                            </label>
                            <input required type="password" maxLength={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700" placeholder="•••" />
                         </div>
                      </div>
                   </div>

                   <hr className="border-slate-100" />

                   <button 
                     type="submit" 
                     disabled={isProcessing || !studentData}
                     className="w-full py-5 bg-slate-900 disabled:opacity-70 text-white rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:bg-black hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
                   >
                     {isProcessing ? (
                       <span className="animate-pulse flex items-center gap-2"><Lock className="w-5 h-5"/> Procesando Pago...</span>
                     ) : (
                       <>
                          Pagar $100.00 Seguro
                          <ChevronRight className="w-5 h-5" />
                       </>
                     )}
                   </button>
                   <p className="text-center text-xs font-semibold text-slate-400 flex items-center justify-center gap-1">
                     <Lock className="w-3 h-3" /> Transacción encriptada y protegida
                   </p>
                </form>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
