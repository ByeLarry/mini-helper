FROM nginx:alpine

WORKDIR /usr/share/nginx/html/
COPY html/css/ ./css/
COPY html/ .
COPY html/scripts/ ./scripts/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]