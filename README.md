- `./generate-cert.sh` - to generate cert

- `PORT=3000 docker compose up -d` - nginx-simple-static  
  use `docker exec -ti b49ee9147e4f bash && pws && ls && cd etc/nginx/ && ls` - to check files  
  use `apt update -y && apt install nano -y` and `nano nginx.conf` - if debian
