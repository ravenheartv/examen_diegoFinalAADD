# Express VPS Examen Idaira

## Proyecto Express para Examen VPS
Este proyecto consiste en desplegar un servidor de Express en un VPS con soporte para HTTPS, configuración de CORS y despliegue mediante CI/CD.

---

## 🚀 **Instalación y Configuración**

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/express-vps-exam.git
cd express-vps-exam
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear el archivo `.env`:
```env
PORT=3000
USE_HTTPS=true
```

### 4. Crear certificados HTTPS (solo para pruebas)
```bash
mkdir cert
openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem
```

---

## 🌐 **Servidor Express**

### 📂 `app.js`
```javascript
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const useHttps = process.env.USE_HTTPS === 'true';

// Configurar CORS
app.use(cors());

// Rutas
app.use('/api', routes);

if (useHttps) {
  const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
  };

  https.createServer(options, app).listen(port, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${port}`);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`Servidor HTTP corriendo en http://localhost:${port}`);
  });
}
```

### 📂 `routes/index.js`
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: '¡Servidor funcionando estupendamente idaira momento! :3' });
});

module.exports = router;
```

---

## 🔐 **Configuración HTTPS en VPS**
```bash
sudo apt install certbot
sudo certbot --nginx
```

---

## ⚙️ **CI/CD con GitHub Actions**

📂 `.github/workflows/deploy.yml`
```yaml
name: Deploy Express App

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Start Server
        run: |
          npm install pm2 -g
          pm2 stop all || true
          pm2 start app.js --name "express-app"
```

---

## ✅ **Pruebas**
1. Prueba HTTP: `http://localhost:3000/api`
2. Prueba HTTPS: `https://localhost:3000/api`

---



