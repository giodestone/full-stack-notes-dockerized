FROM node:20-alpine
WORKDIR /notes-app-frontend-maybe-fixed
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]