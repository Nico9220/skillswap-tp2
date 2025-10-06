export default function Sponsors() {
  return (
    <section className="mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    
    {/*  Integrante 1  */}
    <div className="flex flex-col items-center text-center bg-gray-800/70 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700 text-3xl font-bold text-white mb-4">
        Dante
      </div>
      <h3 className="text-xl font-semibold text-gray-100">Dante Avila</h3>
      <p className="text-gray-400 text-sm mt-2">CMS</p>
    </div>

    {/*  Integrante 2  */}
    <div className="flex flex-col items-center text-center bg-gray-800/70 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700 text-3xl font-bold text-white mb-4">
        Nico
      </div>
      <h3 className="text-xl font-semibold text-gray-100">Nicolás Caretta</h3>
      <p className="text-gray-400 text-sm mt-2">Framework</p>
    </div>

    {/*  Integrante 3  */}
    <div className="flex flex-col items-center text-center bg-gray-800/70 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700 text-3xl font-bold text-white mb-4">
        Diego
      </div>
      <h3 className="text-xl font-semibold text-gray-100">Diego Marchandon</h3>
      <p className="text-gray-400 text-sm mt-2">Informe</p>
    </div>

  </div>
</section>

  );
}
