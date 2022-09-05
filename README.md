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


## Definiendo los endpoints

User Stories

1. Como usuario quiero crear un partido, estableciendo fecha, hora y lugar. El sistema se encargará de darme un ID.

Post a /partidos

```js
{
   fechaYHora: en formato iso con horas y minuto,
   lugar: string
}
```

retorna 200 con: 
```js
{
   id: string
   fechaYHora: en formato iso con horas y minuto,
   lugar: string
}
```

2. Como usuario quiero anotarme a un partido ya creado ingresando mis datos de contacto (teléfono y mail). Si el partido ya cuenta con el máximo de jugadores titulares y suplentes no debería permitir que me anote.

Post /partidos/:id/jugadores

con:
```js
{
   telefono: string,
   mail: string,
   nombre: string
}
```

si ya hay 13 jugadores anotados:
retorna 400 con
{
   error: "el partido ya cuenta con el maximo de jugadores"
}

si hay menos entonces: 

retorna 200
con:
```js
{
   idPartido: id,
   telefono: string,
   mail: string,
   nombre: string
}
```

3. Como usuario quiero poder ver los datos de un partido y la lista de jugadores titulares (los primeros 10) y suplentes (los siguientes 3).

Get /partidos/:id

retorna 200:
```js
{
   fechaYHora: en formato iso con horas y minuto,
   lugar: string,
   jugadores: [nombres de jugador]
}
```

4. A fines de monitoreo (y marketing) se solicita ver un contador con la cantidad de partidos creados y jugadores anotados en las últimas 2 horas. Este dato debe ser tan preciso como sea posible.

Pensamos 2 opciones:
1. Hacer un endpoint que te dé los contadores y pegarle cada 1 minuto
2. Hacer websockets, que actualizen el frontend cada 1 minuto / haya un nuevo anotado

Nos quedamos con la opción 1, porque nos pareció más simple y no necesitamos tener updates tan dinamicos

Get /estadisticas

retorna 200;
{
   partidosCreados: number,
   jugadoresAnotados: number
}

