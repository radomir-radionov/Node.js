FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm run install
COPY . .
RUN npm run build

FROM nginx:1.23
RUN mkdir -p /app/static
COPY --from=builder /app /app/static
COPY nginx.conf /etc/nginx/conf.d/default.conf