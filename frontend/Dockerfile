# Usamos una imagen oficial de Node.js
FROM node:20.9.0

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copiamos el resto de los archivos
COPY . .

# Construimos la aplicación
 RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Servimos la aplicación estática con un servidor simple
#RUN npm install -g serve

# Copia los archivos generados en el build de React
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80
 
# Inicia el servidor
 CMD ["nginx", "-g", "daemon off;"]

 # Exponemos el puerto 3000
#EXPOSE 3000

# Comando para ejecutar el servidor
#CMD ["serve", "-s", "build", "--single"]