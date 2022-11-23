FROM node:lts as builder

# Create app directory
WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN=ufsMzXm1-PCsmWnV2VsF

COPY package*.json ./
COPY .npmrc ./

# Install app dependencies
#321
RUN npm install glob rimraf

RUN npm install
RUN rm -f .npmrc

COPY . .

RUN npm run build

FROM node:lts-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

COPY . .

EXPOSE 50054
CMD ["npm", "run", "migration:run"]
CMD ["node", "dist/main"]
