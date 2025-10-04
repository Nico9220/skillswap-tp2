# skillswap-tp2


## Pasos de instalación detallados:

### Laravel

1) creamos el proyecto con composer: `composer create-project laravel/laravel mi-proyecto`.
2) Entramos a la carpeta: `cd mi-proyecto`.
3) Generamos la clave de la app: `php artisan key:generate`.
4) Configuramos bien nuestro .env, sobre todo la URL: `APP_URL = http://localhost:8000`.
5) Levantamos el servidor local: `php artisan serve`.

### Next.js 

1) Creamos la carpeta frontend/ a la par de la de nuestro backend: `npx create-next-app frontend`.
2) Lo corremos (se abrirá en http://localhost:3000): `cd frontend` y luego `npm run dev`.
3) probamos conectando Next.js con Laravel a través de un fetch (teniendo Laravel corriendo también) Ejemplo: 
```js
useEffect(() => {
  fetch("http://localhost:8000/api/usuarios")
    .then(res => res.json())
    .then(data => console.log(data));
}, []);
```.
4) habilitamos las CORS por estas en dominios distintos y así evitar bloqueos del navegador. En /config/cors.php:
```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],
```

## estructura del proyecto:
skillswap-tp2/                   # raíz del proyecto  
│  
├── laravel-api/             # backend (Laravel API)  
│   └── laravel/  
│       ├── app/  
│       ├── routes/  
│       ├── config/  
│       ├── .env  
│       └── ...  
│  
├── frontend/                # frontend (Next.js)  
│   ├── app/ o pages/        # depende de la versión de Next.js  
│   ├── public/  
│   ├── package.json  
│   └── ...  
│  
└── README.md  

## información técnica del proceso de migración de Plutonium en nuestro proyecto:

### 1. Estructura y correspondencia de archivos

Durante la migración se realizaron los siguientes reemplazos y adaptaciones de estructura para compatibilizar el template original (basado en una versión antigua de React y Next.js) con la arquitectura de Next 13+ (App Router):

`index.js` → `page.js`
El contenido del archivo index.js del template se migró al archivo page.js principal del proyecto.

`/pages/example.js` → `/app/example/page.js`
Las páginas ubicadas en la carpeta `/pages` se movieron a la estructura `/app`, siguiendo el nuevo esquema de rutas del App Router.

`/styles/global.css` → `src/styles/global.css`
Los estilos globales fueron trasladados al directorio src, para mantener consistencia con la nueva organización del proyecto.

### 2. Adaptaciones necesarias para compatibilidad con Next 13+

Se modificaron los componentes que usan hooks (`useRouter`, `useState`, `useEffect`) agregando la directiva 'use client', ya que en Next 13+ solo funcionan en Client Components.

Se instaló la dependencia `next-seo` para gestionar etiquetas meta y SEO dinámico.

Se instaló la librería `next-themes` para manejar el modo oscuro y claro del sitio.

Se reemplazaron todas las etiquetas `<a>` dentro de componentes `<Link>`, conforme a las prácticas recomendadas de Next.js.

### 3. Problemas de compatibilidad de versiones

El template original utilizaba **React 19.1.0**, pero la última versión de **Next 15.5.4** aún no es compatible con **React 19**, lo que generaba el siguiente error persistente:

> “Invalid hook call”

Debido a esto, se decidió volver a **React 18**, lo que permitió continuar con la adaptación del proyecto.

### 4. Problemas específicos encontrados

#### 4.1. Errores en componentes `<Link>`

Algunos componentes `<Link>` del template no incluían la propiedad href, debido a que estaban anidados o duplicados (uno interno con estilos y otro externo con navegación).
Esto provocaba el error:

> Failed prop type: The prop 'href' expects a 'string' or 'object' in `<Link>`, but got 'undefined' instead.

#### 4.2. Problemas de hidratación (Hydration Mismatch)

Durante el renderizado, Next.js mostró inconsistencias entre el HTML generado en el servidor y el renderizado en el cliente:

> “A tree hydrated but some attributes of the server rendered HTML didn't match the client properties…”

Las causas detectadas fueron:

Diferencias generadas por el uso de next-themes, al cambiar atributos en tiempo de ejecución.

Estructuras HTML incorrectas heredadas del template, como `<ul>` (listas desordenadas) dentro de `<p>` (párrafos) en componentes como `Features.js` y `Pricing.js`.
Este tipo de anidación no válida provoca problemas de hidratación en Next.js.

### 5. Problema más complejo: incompatibilidad entre versiones de React

El conflicto más difícil de resolver fue el siguiente error:

> “A React Element from an older version of React was rendered. This is not supported.”

Causas posibles (según la documentación):

- Uso de múltiples copias de React.

- Librerías preempaquetadas con versiones antiguas de react o react/jsx-runtime.

- Compiladores que “inlinan” JSX en lugar de usar el runtime correspondiente.

#### Dificultad principal
El error no indicaba la línea ni el archivo específico, lo que obligó a realizar múltiples pruebas:
- Revertir versiones de React y Next.
- Verificar coincidencia entre las versiones de react y react-dom.
- Inspeccionar dependencias en package.json.
- Listar versiones de React con NPM para detectar duplicados.

#### Solución 
Ninguna de estas acciones resolvía el problema, por lo que se procedió a comentar código progresivamente, archivo por archivo, para aislar el origen del error.
Finalmente se descubrió que provenía de la librería **next-seo** incluida en el `page.js` principal del template.
Esta librería, desactualizada desde 2022, utilizaba internamente elementos y métodos obsoletos de React, generando la incompatibilidad.

### 6. Consideraciones sobre la “PlantillaDefault.js”

Dentro del proyecto se conserva una versión denominada `PlantillaDefault.js`, que replica la apariencia original del template sin modificaciones posteriores.
Este archivo es más extenso que el resto porque:

Contiene copias completas de componentes del template original.

Se evitó importar los componentes directamente, para que las modificaciones futuras no alteren el aspecto de la plantilla base.

De esta manera, se garantiza que la plantilla inicial se mantenga como referencia visual del diseño original.