
docker run -p 8081:8080 -d --name server1 lego-web-server
docker run -p 81:80 -d -v /Users/didi/Desktop/data.html:/usr/share/nginx/html --name nginx2 nginx
-p: 端口
-d: 后台
-v: 映射本地文件

构建容器：docker-compose build <service-name>
启动所有服务容器 docker-compose up -d 后台启动
停止所有服务 docker-compose down
查看服务 docker-compose ps 