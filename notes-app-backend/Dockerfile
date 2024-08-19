FROM node:20-alpine
WORKDIR /notes-app-backend
COPY package*.json .
RUN npm install
COPY . .
CMD npm start