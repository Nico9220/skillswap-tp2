import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sponsors from '@/components/Sponsors'

import CursosSection from '@/components/CursosSection'
import HabilidadesSection from '@/components/HabilidadesSection'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-700 to-teal-500">
      <Header />
      
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <h1 style={{fontFamily: 'VT323'}} className="tracking-wide subpixel-antialiased mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              Bienvenidos a SkillSwap!
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-500 dark:via-purple-400 dark:to-indigo-500">
                skill x skill.
              </span>
            </h1>
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400">
              SkillSwap está basado en Next.js y TailwindCSS para el front, y Laravel para el back.
              Su misión es unir a las personas que buscan aprender y enseñar nuevas habilidades en un
              ecosistema colaborativo.
            </p>
            <div className="mt-6 text-center">
              <Link
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-gray-300 transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white"
                href="https://github.com/Nico9220/skillswap-tp2"
              >
                GitHub Link
              </Link>
              <Link
                className="inline-flex items-center px-5 py-3 mt-2 ml-2 text-sm font-medium text-gray-700 transition duration-300 border rounded shadow dark:hover:border-gray-500 hover:shadow-md dark:text-gray-300"
                href="/404"
              >
                CMS Link
              </Link>
            </div>
          </div>

          <div className="relative w-full py-10 mx-auto text-center md:py-24 md:my-12 md:w-10/12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/*  Reseña 1 */}
        <div className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105 bg-gray-800/70 p-6 backdrop-blur-sm">
          <p className="text-gray-300 text-sm italic mb-4">
            “El sitio tiene una estética impecable y una navegación muy fluida.
            Cada sección se siente pulida y moderna.”
          </p>
          <span className="block text-gray-400 text-xs">— Esteban Quito</span>
        </div>

        {/*  Reseña 2  */}
        <div className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105 bg-gray-800/70 p-6 backdrop-blur-sm">
          <p className="text-gray-300 text-sm italic mb-4">
            “Me encantó el diseño oscuro y el uso de tipografía.  
            Da una sensación profesional sin perder originalidad.”
          </p>
          <span className="block text-gray-400 text-xs">— Armando Paredes</span>
        </div>

        {/*  Reseña 3  */}
        <div className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105 bg-gray-800/70 p-6 backdrop-blur-sm">
          <p className="text-gray-300 text-sm italic mb-4">
            “Se nota una atención al detalle impresionante.  
            Las transiciones y efectos están perfectamente calibrados.”
          </p>
          <span className="block text-gray-400 text-xs">— Elsa Pato</span>
        </div>

        {/*  Reseña 4  */}
        <div className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105 bg-gray-800/70 p-6 backdrop-blur-sm">
          <p className="text-gray-300 text-sm italic mb-4">
            “La estructura del sitio es clara y eficiente.  
            Cada elemento se siente bien pensado y coherente.”
          </p>
          <span className="block text-gray-400 text-xs">— Lucas Caron</span>
        </div>

      </div>
    </div>

        </div>
      </section>
      <div>
      <p style={{fontFamily: 'VT323'}} className='flex justify-center text-3xl font-bold '>Integrantes y Roles Tentativos</p>
      <Sponsors />
      </div>

      {/* SECCIONES ANCLADAS */}
      <CursosSection />        {/* id="cursos" */}
      <HabilidadesSection />   {/* id="habilidades" */}

      <Footer />
    </div>
  )
}
