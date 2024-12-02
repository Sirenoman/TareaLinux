# Usamos una imagen oficial de Node.js
FROM node:20.9.0

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copiamos el resto de los archivos
COPY . .

# Exponemos el puerto 5000
EXPOSE 5000

# Comando para ejecutar el servidor
CMD ["npm", "start"]
