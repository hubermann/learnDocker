# Basicos de Docker

`docker images`

Lista las imagenes disponibles.

`docker pull node`

Baja la ultima imagen de node por defecto (`:latest`). Ahora, si agregamos por ejemplo `node:18` bajara la version detallada. 

`docker image rm node`

Elimina la imagen indicada. Se puede indicar tambien con la version especifica. `docker image rm node:18`

`docker create mongo`

Crea un contenedor usando la imagen de mongo y devuelve un id. Luego podemos levantar ese contenedor con

 `docker start xxIDxx`

 `docker ps`

 Muestra los contenedores corriendo.

 `docker stop xxIDxx` o `docker stop nombre` Podemos parar la ejecucion del contenedor 

`volumes:` permite crear una carpeta dentro del sistema anfitrio y cada vez que limines un contendor no va a borrar la data ahi guardada. podemos utilziar los volumnes para dejar data si quitamos el contenedor





## Ambientes:
Podemos crear archivos especificos por ambientes de acuerdo a sus necesidades

### Dockerfile.dev
```
FROM node:18

# Instala nodemon de forma global
RUN npm i -g nodemon

# Crea el directorio de la aplicación
RUN mkdir -p /home/app

# Establece el directorio de trabajo
WORKDIR /home/app

# Copia los archivos de la aplicación al contenedor
COPY . /home/app

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación con nodemon
CMD ["nodemon", "index.js"]
```

### docker-compose-dev.yml
YML requiere una correcta identacion ;)
```
version: "3.9"

services:
  # Configuración del contenedor de la aplicación que se conecta a MongoDB
  appwritertomongocontainer:
    build: 
      context: .
      dockerfile: Dockerfile.dev #Dockerfile de la application
    ports:
      - "3000:3000"  # Mapeo de puertos para acceder a la aplicación desde el host
    links:
      - mongocontainer  # Conexión con el contenedor de MongoDB
    volumes:
      - .:/home/app  # Volumen para montar el código fuente en el contenedor
    
  # Configuración del contenedor de MongoDB
  mongocontainer:
    image: mongo
    ports:
      - "27017:27017"  # Mapeo de puertos para acceder a MongoDB desde el host
    environment:
      - MONGO_INITDB_ROOT_USERNAME=gabriel
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo-data:/data/db  # Volumen para persistir los datos de MongoDB  

# Definición de volúmenes
volumes: 
  mongo-data:  # Volumen para los datos de MongoDB
  docker-data:  # Volumen genérico
  mongocontainer:  # Volumen para el contenedor de MongoDB

# Comando recomendado para ejecutar el contenedor
# docker-compose -f docker-compose-dev.yml up 
# Se encargará de crear las imágenes y conectarlos en su propia red

```

Con `docker compose up` construira los contenedores y mostrar los logs

Luego con `docker compose down` bajamos los containers y quitamos la red

