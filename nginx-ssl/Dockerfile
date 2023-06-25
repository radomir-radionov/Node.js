FROM nginx:1.23

RUN mkdir -p /app/static
RUN mkdir -p /app/keys

COPY static /app/static
COPY keys /app/keys
COPY nginx.conf /etc/nginx/conf.d/default.conf
