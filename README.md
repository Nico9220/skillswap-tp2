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

