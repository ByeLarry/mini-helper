FROM nginx:alpine

COPY html/css/ /usr/share/nginx/html/css/
COPY html/ /usr/share/nginx/html/
COPY html/scripts/ /usr/share/nginx/html/scripts/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]