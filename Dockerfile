FROM node:18-alpine AS builder

WORKDIR /app
COPY . .


RUN yarn install --frozen-lockfile

#ajusta a permissao de acesso da pasta do prisma
#RUN [ -d "node_modules/.prisma" ] && chmod 777 -R -f "node_modules/.prisma" 

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]