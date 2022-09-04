# app-de-futbol
https://docs.google.com/document/d/e/2PACX-1vQH_8-v-ilfakmjbRuLDKq-HdsBkVMC5c9z7_hM-BropC7B4k5pUqqmAzeGYsDyYdwwZSTNqWTl9HQo/pub


## Requisitos
- Instalar docker y docker-compose
- Node-16 para correr los tests y la app por fuera del container

## Para correr la app

### Desarrollo (hot reload):
`docker-compose up futbol-dev`

### Desarrollo (cuando instalamos una nueva dependencia):
`docker-compose up --build -V futbol-dev`

### Reconstruir Produ y correrlo
1. Fijarte en docker si tenes un contenedor de app-de-futbol y borrarlo
2. Si tenes una carpeta dist en el projecto, borrarla
3. `docker-compose up --build -V futbol-dev` (porque cuando se arma dev se vuelve a generar la carpeta dist)
4. `docker-compose up futbol-prod`

Despues vemos bien con que convencion creamos la imagen y si la tenemos que subir a algun lado

### ¿Como hacemos para debuggear? Hay 2 formas:
1. 
   - En el docker-compose-yaml cambiar el comando npm run start:dev por npm run start:debug
   - En VSC o Webstorm debuggear remoto el puerto 3100
   - Poner breakpoints! Debería andar de una
2. (Para mi la mejor)
   - Correr la app local (no en docker) usando npm run start:debug y ponerle el bichito que escuche en el 3100


Para otros comandos como correr los tests y tests de integración, revisar la parte de scripts del package-json
