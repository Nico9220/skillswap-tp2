'use client';
import Image from "next/image";
import Usuarios from "@/components/Usuarios";
import Head from "next/head";
import Link from "next/link";
import Footer from "../../components/Footer";
import Sponsors from "../../components/Sponsors";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

{/* <Usuarios /> */}
export default function PlantillaDefault() {

  // lógica del header original
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Minicomponente de Pricing.js (Habilidades.js)
  const Feature = () => {
    return (
      <li className="flex mb-1 space-x-3">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500 w-7"
          aria-hidden="true"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </span>
      </li>
    );
  };


  return (
    <div className="bg-white dark:bg-black">

      {/* <Header /> */}
      <header className="w-full sticky-nav">
      <div className="flex flex-col flex-wrap max-w-5xl p-2.5 mx-auto md:flex-row">
        <div className="flex flex-row items-center justify-between p-2 md:p-1">
          <Link href="/" className="mb-4 text-2xl font-medium text-black transition duration-300 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white md:mb-0">
            SKILLSWAP
          </Link>
          <button
            className="px-3 py-1 pb-4 ml-auto text-black outline-none dark:text-gray-300 md:hidden"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="3" y1="6" y2="6" x2="21"></line>
              <line x1="3" y1="12" y2="12" x2="21"></line>
              <line x1="3" y1="18" y2="18" x2="21"></line>
            </svg>
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="flex flex-wrap items-center justify-center pt-1 pl-2 ml-1 space-x-8 md:space-x-16 md:mx-auto md:pl-14">
            <Link
              href="#features"
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Pricing
            </Link>
            <Link href="/404" className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300">
              Demo
            </Link>
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 ml-5 mr-0 bg-gray-200 rounded md:ml-0 md:mr-5 dark:bg-gray-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-gray-800 dark:text-gray-200"
              >
                {theme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <svg className="svg-icon" viewBox="0 0 20 20">
                    <path
                      fill="none"
                      d="M10.544 8.717l1.166-.855 1.166.855-.467-1.399 1.012-.778h-1.244l-.467-1.243-.466 1.244H10l1.011.778-.467 1.398zm5.442.855l-.467 1.244h-1.244l1.011.777-.467 1.4 1.167-.855 1.165.855-.466-1.4 1.011-.777h-1.244l-.466-1.244zm-8.979-3.02c0-2.259.795-4.33 2.117-5.955A9.418 9.418 0 00.594 9.98c0 5.207 4.211 9.426 9.406 9.426 2.94 0 5.972-1.354 7.696-3.472-.289.026-.987.044-1.283.044-5.194.001-9.406-4.219-9.406-9.426M10 18.55c-4.715 0-8.551-3.845-8.551-8.57 0-3.783 2.407-6.999 5.842-8.131a10.32 10.32 0 00-1.139 4.703c0 5.368 4.125 9.788 9.365 10.245A9.733 9.733 0 0110 18.55m9.406-16.246h-1.71l-.642-1.71-.642 1.71h-1.71l1.39 1.069-.642 1.924 1.604-1.176 1.604 1.176-.642-1.924 1.39-1.069z"
                    />
                  </svg>
                )}
              </svg>
            )}
          </button>
          <Link
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible dark:hover:border-gray-500 hover:shadow-md transition duration-300 mr-4 text-black border px-3 py-1.5 rounded dark:text-gray-300 md:visible"
          >
            Sign In
          </Link>
          <Link
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible md:visible px-3 py-1.5 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black bg-black dark:bg-white rounded"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
      {/* PlantillaDefault.js */}
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              Bringing darkness
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-500 dark:via-purple-400 dark:to-indigo-500">
                straight to the web.
              </span>
            </h1>
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
              Plutonium is a Next.js template styled with TailwindCSS. It boasts
              built-in dark-mode support, configured Next-SEO for the best SEO
              optimizations, and clean, organized, easy-to-edit code.
            </p>
            <div className="mt-6 text-center md:ml-6">
              <Link
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-gray-300 transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white"
                aria-label="learn more"
                rel="noreferrer"
                href="https://github.com/minor/plutonium/"
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
      {/* Features.js (Nosotros.js) */}
      <section id="features" className="py-12">
      <div className="max-w-xl px-4 py-12 mx-auto sm:px-6 lg:max-w-6xl lg:px-8">
        <h1 className="mb-8 text-2xl font-bold tracking-normal text-center text-gray-800 md:leading-tight md:tracking-normal dark:text-gray-200 md:text-4xl">
          Supporting the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-indigo-400">
            finest
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 dark:from-indigo-400 dark:via-fuchsia-400 dark:to-rose-400">
            richest
          </span>{" "}
          features.
        </h1>
        <p className="max-w-md mx-auto mb-10 text-lg text-gray-600 dark:text-gray-400 md:text-lg">
          We&apos;re introducing a new wave of template designs that sky-rocket
          the interaction between users and <b>your</b> app.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-10 space-y-6">
            <h1 className="text-xl font-bold text-center text-rose-600 dark:text-rose-300 md:text-2xl sm:text-left">
              Next.js 11
            </h1>
            <div className="h-auto">
              <Link
                href="https://unsplash.com/photos/ymVslcVAzg8"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                  src="/images/placeholder-2.webp"
                  alt="Placeholder for Next.js"
                />
              </Link>
            </div>
            <div className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul className="mr-0 md:mr-10">
                <li className="mb-2">
                  <span className="font-semibold">Conformance</span>: A system
                  that provides carefully crafted solutions to support optimal
                  UX.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Improved Performance</span>:
                  Further optimizations to improve cold startup time so you can
                  start coding faster.
                </li>
                <li className="mb-2">
                  <span className="text-purple-500 dark:text-purple-400 px-1 py-0.75 border border-gray-200 dark:border-gray-800 rounded-md bg-gray-100 dark:bg-gray-900">
                    `next/script`
                  </span>{" "}
                  updates
                </li>
                <li className="mb-2">
                  <span className="text-purple-500 dark:text-purple-400 px-1 py-0.75 border border-gray-200 dark:border-gray-800 rounded-md bg-gray-100 dark:bg-gray-900">
                    `next/image`
                  </span>{" "}
                  updates
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-10 space-y-6">
            <h1 className="text-xl font-bold text-center text-rose-600 dark:text-rose-300 md:text-2xl sm:text-left">
              TailwindCSS JIT
            </h1>
            <div className="h-auto">
              <Link
                href="https://unsplash.com/photos/qOEiV-8w-MQ"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                  src="/images/placeholder-3.webp"
                  alt="Placeholder for TailwindCSS JIT"
                />
              </Link>
            </div>
            <div className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul className="mr-0 md:mr-10">
                <li className="mb-2">
                  <span className="font-semibold">Just-in-Time Mode</span>: A
                  faster, more powerful, on-demand engine for Tailwind CSS
                  v2.1+.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">
                    Lightning fast build times
                  </span>
                </li>
                <li className="mb-2">
                  <span className="font-semibold">
                    Identical CSS in development and production
                  </span>
                </li>
                <li className="mb-2">
                  <span className="font-semibold">
                    Better browser performance in development
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-purple-500 dark:text-purple-400 px-1 py-0.75 border border-gray-200 dark:border-gray-800 rounded-md bg-gray-100 dark:bg-gray-900">
                    `mode: &apos;jit&apos;`
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-10 space-y-6">
            <h1 className="text-xl font-bold text-center text-rose-600 dark:text-rose-300 md:text-2xl sm:text-left">
              Dark Mode
            </h1>
            <div className="h-auto">
              <Link
                href="https://unsplash.com/photos/p7o0qrl8hv8"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                  src="/images/placeholder-4.webp"
                  alt="Placeholder for Dark Mode"
                />
              </Link>
            </div>
            <div className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul className="mr-0 md:mr-10">
                <li className="mb-2">
                  <Link
                    href="https://github.com/pacocoursey/next-themes"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold"
                  >
                    next-themes
                  </Link>
                  : An abstraction for themes in your Next.js app.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">System settings</span>: Uses
                  system settings to activate dark mode/light mode.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">No flash</span>: No flash on
                  switching themes or load in both SSG and SSR.
                </li>
                <li className="mb-2">
                  <span className="text-purple-500 dark:text-purple-400 px-1 py-0.75 border border-gray-200 dark:border-gray-800 rounded-md bg-gray-100 dark:bg-gray-900">
                    `useTheme`
                  </span>{" "}
                  hook
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-10 space-y-6">
            <h1 className="text-xl font-bold text-center text-rose-600 dark:text-rose-300 md:text-2xl sm:text-left">
              Next-SEO
            </h1>
            <div className="h-auto">
              <Link
                href="https://unsplash.com/photos/_CrD1UmfWqc"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                  src="/images/placeholder-5.webp"
                  alt="Placeholder for Next-SEO"
                />
              </Link>
            </div>
            <div className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul className="mr-0 md:mr-10">
                <li className="mb-2">
                  <Link
                    href="https://github.com/garmeeh/next-seo"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold"
                  >
                    next-seo
                  </Link>
                  : A plugin that makes managing your SEO easier in Next.js
                  projects.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Renders to head</span>: All
                  props passed into{" "}
                  <span className="text-purple-500 dark:text-purple-400 px-1 py-0.75 border border-gray-200 dark:border-gray-800 rounded-md bg-gray-100 dark:bg-gray-900">
                    `next-seo`
                  </span>{" "}
                  will render tags into the{" "}
                  <span className="text-purple-500 dark:text-purple-400 px-1 py-0.75 border border-gray-200 dark:border-gray-800 rounded-md bg-gray-100 dark:bg-gray-900">
                    {"`<head>`"}
                  </span>{" "}
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Bare minimum</span>: Next-SEO
                  should at least have access to a description & a title.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Pricing.js (Habilidades.js) */}
    <section id="pricing" className="py-12">
      <div className="max-w-xl px-4 py-12 mx-auto sm:px-6 lg:max-w-6xl lg:px-8">
        <h1 className="mb-8 text-2xl font-bold tracking-normal text-center text-gray-800 md:leading-tight md:tracking-normal dark:text-gray-200 md:text-4xl">
          All with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 dark:from-indigo-400 dark:via-fuchsia-400 dark:to-rose-400">
            affordable
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-indigo-400">
            friendly
          </span>{" "}
          pricing.
        </h1>
        <p className="max-w-md mx-auto mb-12 text-lg text-gray-600 dark:text-gray-400 md:text-lg">
          Plutonium is a <b>free</b> template to kickstart your app, business,
          or portfolio. We don&apos;t take a single penny.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-5 mt-5 mb-10 space-y-6 border shadow-md rounded-2xl">
            <h1 className="text-xl font-bold text-center text-teal-600 dark:text-teal-300 md:text-2xl sm:text-left">
              Hobby
            </h1>
            <p className="text-gray-600 text-md dark:text-gray-400">
              All the basics for your side project.
            </p>
            <div className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                $10
              </span>
              <span className="text-base font-medium text-gray-500">/mo</span>
              <Link
                href="#"
                className="block w-full py-2 mt-8 text-sm font-semibold text-center text-gray-300 transition duration-300 bg-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-800"
              >
                Buy Hobby
              </Link>
            </div>
            <div className="w-full border border-gray-300 dark:border-gray-500" />
            <h1 className="text-sm font-semibold text-gray-500 uppercase">
              What&apos;s included
            </h1>
            <div className="font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul>
                <Feature />
                <Feature />
              </ul>
            </div>
          </div>
          <div className="p-5 mb-10 space-y-6 border-2 border-rose-500 dark:border-rose-300 rounded-2xl">
            <h1 className="text-xl font-bold text-center text-teal-600 dark:text-teal-300 md:text-2xl sm:text-left">
              Freelancer
            </h1>
            <p className="text-gray-600 text-md dark:text-gray-400">
              All the basics for starting your business.
            </p>
            <div className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                $20
              </span>
              <span className="text-base font-medium text-gray-500">/mo</span>
              <Link
                href="#"
                className="block w-full py-2 mt-8 text-sm font-semibold text-center text-gray-300 transition duration-300 bg-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-800"
              >
                Buy Freelancer
              </Link>
            </div>
            <div className="w-full border border-gray-300 dark:border-gray-500" />
            <h1 className="text-sm font-semibold text-gray-500 uppercase">
              What&apos;s included
            </h1>
            <div className="font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul>
                <Feature />
                <Feature />
                <Feature />
                <Feature />
              </ul>
            </div>
          </div>
          <div className="p-5 mt-5 mb-10 space-y-6 border shadow-md rounded-2xl">
            <h1 className="text-xl font-bold text-center text-teal-600 dark:text-teal-300 md:text-2xl sm:text-left">
              Enterprise
            </h1>
            <p className="text-gray-600 text-md dark:text-gray-400">
              All the basics for your enterprise.
            </p>
            <div className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                $30
              </span>
              <span className="text-base font-medium text-gray-500">/mo</span>
              <Link
                href="#"
                className="block w-full py-2 mt-8 text-sm font-semibold text-center text-gray-300 transition duration-300 bg-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-800"
              >
                Buy Enterprise
              </Link>
            </div>
            <div className="w-full border border-gray-300 dark:border-gray-500" />
            <h1 className="text-sm font-semibold text-gray-500 uppercase">
              What&apos;s included
            </h1>
            <div className="font-normal text-gray-500 dark:text-gray-400 text-md">
              <ul>
                <Feature />
                <Feature />
                <Feature />
                <Feature />
                <Feature />
                <Feature />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
      <Footer />
    </div>
  );
}
