FROM nginx:1.23

RUN mkdir -p /app/static

COPY static /app/static
COPY nginx.conf /etc/nginx/conf.d/default.conf
