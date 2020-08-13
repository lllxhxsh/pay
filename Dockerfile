FROM nginx:alpine
EXPOSE 15001
ADD /dist /var/www/web
ADD /nginx.conf /etc/nginx/conf.d/nginx.conf
RUN nginx -c /etc/nginx/nginx.conf
ENTRYPOINT ["/usr/sbin/nginx","-g", "daemon off;"]