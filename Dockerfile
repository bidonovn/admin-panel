ARG docker_registry="artifactory.akbars.tech/docker/"
FROM ${docker_registry}nginxinc/nginx-unprivileged

COPY ./packages/result/build /usr/share/nginx/html/result
COPY ./packages/146/build /usr/share/nginx/html/146
COPY ./packages/147/build /usr/share/nginx/html/147
COPY ./packages/loader/build/loader.js /usr/share/nginx/html/
COPY ./packages/loader/build/types /usr/share/nginx/html/

COPY ./conf/default.conf /etc/nginx/conf.d

EXPOSE 5000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
