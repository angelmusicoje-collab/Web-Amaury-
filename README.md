# Meridiano 104

> Colima en el centro, el mundo alrededor.

Proyecto editorial digital construido con [Astro](https://astro.build) + MDX.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Build de produccion

```bash
npm run build
```

Genera el sitio estatico en `dist/`.

## Deploy en VPS (Ubuntu + Nginx)

1. Instala Node 20+ en el VPS:

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. Clona y construye:

   ```bash
   git clone <repo>
   cd web-amaury-
   npm install
   npm run build
   ```

3. Configura Nginx (`/etc/nginx/sites-available/meridiano104`):

   ```nginx
   server {
     listen 80;
     server_name _;
     root /var/www/meridiano104;
     index index.html;
     location / { try_files $uri $uri/ $uri.html =404; }
   }
   ```

4. Publica el build:

   ```bash
   sudo rm -rf /var/www/meridiano104
   sudo cp -r dist /var/www/meridiano104
   sudo ln -sf /etc/nginx/sites-available/meridiano104 /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

5. Listo: visita la IP del VPS.

## Donde subir fotos

- Centro historico (fotogaleria): `public/images/galeria/01.jpg` ... `08.jpg`
- Notas (portada/inline): `public/images/notas/<slug>.jpg`
- Equipo / avatares: `public/images/equipo/<alias>.jpg`

Cada placeholder se reemplaza automaticamente al hacer `git push` con la imagen del mismo nombre.

## Estructura

- `src/pages/` rutas del sitio
- `src/content/notes/` notas en MDX
- `src/components/` UI reusable
- `src/layouts/` layouts base
- `src/styles/` global.css con design tokens
- `public/images/` fotos (subir aqui)
