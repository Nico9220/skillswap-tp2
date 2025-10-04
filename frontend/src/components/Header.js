'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// 👇 importa auth + modal
import { currentUser, logout } from "../lib/auth";
import AuthModal from "./AuthModal";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // estado de sesión + modales
  const [me, setMe] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  useEffect(() => {
    setMounted(true);
    // intento de obtener sesión al montar
    currentUser().then(setMe).catch(() => setMe(null));
  }, []);

  // helpers para cerrar modales y refrescar sesión
  const closeLogin = async () => {
    setOpenLogin(false);
    const u = await currentUser().catch(() => null);
    if (u) setMe(u);
  };
  const closeRegister = async () => {
    setOpenRegister(false);
    const u = await currentUser().catch(() => null);
    if (u) setMe(u);
  };

  if (!mounted) return null;

  return (
    <header className="w-full sticky-nav">
      <div className="flex flex-col flex-wrap max-w-5xl p-2.5 mx-auto md:flex-row">
        <div className="flex flex-row items-center justify-between p-2 md:p-1">
          <Link
            href="/"
            className="mb-4 text-2xl font-medium text-black transition duration-300 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white md:mb-0"
          >
            SKILLSWAP
          </Link>

          <button
            className="px-3 py-1 pb-4 ml-auto text-black outline-none dark:text-gray-300 md:hidden"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="w-6 h-6">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={( "md:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden"))}>
          {/* links de navegación */}
          <div className="flex flex-wrap items-center justify-center pt-1 pl-2 ml-1 space-x-8 md:space-x-16 md:mx-auto md:pl-14">
            <Link
              href="/#cursos" 
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Cursos
            </Link>
            <Link
              href="/#habilidades"
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Habilidades
            </Link>
            <Link
              href="/PlantillaDefault"
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Plantilla
            </Link>
          </div>

          {/* theme toggle */}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 ml-5 mr-0 bg-gray-200 rounded md:ml-0 md:mr-5 dark:bg-gray-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor" stroke="currentColor"
                className="w-4 h-4 text-gray-800 dark:text-gray-200">
                {theme === "dark" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                ) : (
                  <svg className="svg-icon" viewBox="0 0 20 20">
                    <path fill="none"
                      d="M10.544 8.717l1.166-.855 1.166.855-.467-1.399 1.012-.778h-1.244l-.467-1.243-.466 1.244H10l1.011.778-.467 1.398zm5.442.855l-.467 1.244h-1.244l1.011.777-.467 1.4 1.167-.855 1.165.855-.466-1.4 1.011-.777h-1.244l-.466-1.244zm-8.979-3.02c0-2.259.795-4.33 2.117-5.955A9.418 9.418 0 00.594 9.98c0 5.207 4.211 9.426 9.406 9.426 2.94 0 5.972-1.354 7.696-3.472-.289.026-.987.044-1.283.044-5.194.001-9.406-4.219-9.406-9.426M10 18.55c-4.715 0-8.551-3.845-8.551-8.57 0-3.783 2.407-6.999 5.842-8.131a10.32 10.32 0 00-1.139 4.703c0 5.368 4.125 9.788 9.365 10.245A9.733 9.733 0 0110 18.55m9.406-16.246h-1.71l-.642-1.71-.642 1.71h-1.71l1.39 1.069-.642 1.924 1.604-1.176 1.604 1.176-.642-1.924 1.39-1.069z" />
                  </svg>
                )}
              </svg>
            )}
          </button>

          {/* acciones auth */}
          {!me ? (
            <>
              <button
                onClick={() => setOpenLogin(true)}
                className="invisible md:visible mr-4 text-black border px-3 py-1.5 rounded dark:text-gray-300 transition hover:shadow-md dark:hover:border-gray-500"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setOpenRegister(true)}
                className="invisible md:visible px-3 py-1.5 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black bg-black dark:bg-white rounded"
              >
                Registrarse
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 pr-2">
              <Link
                href="/habilidades/nueva"
                className="px-3 py-1.5 rounded border transition hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Nueva habilidad
              </Link>
              <button
                onClick={async () => { await logout(); setMe(null); }}
                className="px-3 py-1.5 rounded border transition hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <AuthModal open={openLogin} onClose={closeLogin} mode="login" />
      <AuthModal open={openRegister} onClose={closeRegister} mode="register" />
    </header>
  );
}
