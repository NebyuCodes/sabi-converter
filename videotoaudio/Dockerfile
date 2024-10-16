FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

COPY . .

RUN npm run build

CMD [ "npm","start" ]