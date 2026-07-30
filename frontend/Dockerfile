FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL

ENV NODE_ENV=production
RUN npm run build

RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
