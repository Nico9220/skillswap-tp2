import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sponsors from '@/components/Sponsors'

import CursosSection from '@/components/CursosSection'
import HabilidadesSection from '@/components/HabilidadesSection'

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <Header />
      
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
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
                See a Demo
              </Link>
            </div>
          </div>

          <div className="relative w-full py-10 mx-auto text-center md:py-24 md:my-12 md:w-10/12">
            <img
              className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
              src="/images/placeholder.webp"
              alt="Placeholder"
            />
            <p className="z-10 my-8 text-sm font-medium text-gray-500">
              Maybe we&apos;re bringing brightness too?
            </p>
          </div>
        </div>
      </section>

      <Sponsors />

      {/* SECCIONES ANCLADAS */}
      <CursosSection />        {/* id="cursos" */}
      <HabilidadesSection />   {/* id="habilidades" */}

      <Footer />
    </div>
  )
}
