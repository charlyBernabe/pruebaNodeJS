############################################################
# Dockerfile para configurar aplicación en node.js - Express
############################################################

# Establece la imagen base
FROM node:latest

# Información de Metadata
LABEL "cl.apgca.appNode"="BACKEND PRUEBA"
LABEL maintainer="charly.bernabe.bernabe@gmail.com"
LABEL version="1.0"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

# Expone la aplicación en el puerto 8000
EXPOSE 3000

# Inicia la aplicación al iniciar al contenedor
CMD [ "npm", "start" ]