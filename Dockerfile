FROM node:10.18-alpine

EXPOSE 80
EXPOSE 3030

RUN apk add apache2 --no-cache && apk add openrc --no-cache

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

COPY packages/api /root/api
COPY packages/gui/dist /var/www/localhost/htdocs
COPY docker-entrypoint.sh /root/api

WORKDIR /root/api

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
