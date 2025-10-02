import Image from "next/image";
import Usuarios from "@/components/Usuarios";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sponsors from "../components/Sponsors";
import Nosotros from "../components/Nosotros";
import Habilidades from "../components/Habilidades";
{/* <Usuarios /> */}
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
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
              SkillSwap está basado en Next.js y TailwindCSS para el front, y Laravel para el back. 
              Su misión es unir a las personas que buscan aprender y enseñar nuevas habilidades, en 
              un ecosistema colaborativo donde prima el intercambio de conocimiendo, y 
              en donde el dinero no sea un impedimento para aprender.
            </p>
            <div className="mt-6 text-center md:ml-6">
              <Link
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-gray-300 transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white"
                aria-label="learn more"
                rel="noreferrer"
                href="https://github.com/Nico9220/skillswap-tp2"
              >
                <span className="flex justify-center">GitHub Link</span>
              </Link>
              <br className="sm:hidden" />
              <Link 
                  className="inline-flex items-center px-5 py-3 mt-2 ml-0 text-sm font-medium text-gray-700 transition duration-300 border rounded shadow dark:hover:border-gray-500 hover:shadow-md md:ml-2 dark:text-gray-300"
                  aria-label="learn more" 
                  href="404">
                  <span className="flex justify-center">See a Demo</span>
              </Link>
            </div>
          </div>
          <div className="relative w-full py-10 mx-auto text-center md:py-32 md:my-12 md:w-10/12">
            <div className="relative z-10">
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://unsplash.com/photos/e9TrFZZ72DQ"
              >
                <img
                  className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
                  src="/images/placeholder.webp"
                  alt="Placeholder Image"
                />
              </Link>
            </div>
            <p className="z-10 my-8 text-sm font-medium text-gray-500">
              Maybe we&apos;re bringing brightness too?
            </p>
          </div>
        </div>
      </section>
      <Sponsors />
      <Nosotros />
      <Habilidades />
      <Footer />
    </div>
  );
}
