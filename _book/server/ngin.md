# nginx

#### nginx服务器

>nginx-服务器文件夹目录中不能有中文目录
>
>dist 打包文件夹  放入nginx服务器  文件夹目录中  
>
>每次改完文件，都需要重新加载
>
>需要在 阿里云  加入安全组  添加80端口



#### 命令行

```js
.\nginx.exe -c conf\kerwin.conf //加载kerwin.conf 并启动服务器
.\nginx.exe -s stop   //关闭nginx服务器
.\nginx.exe -s reload  //重新加载 
```



#### conf/kerwin.conf 文件夹

```js
#user  nobody;
worker_processes  1;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    upstream  kerwin-server {
       server   localhost:3001 weight=1;
       server   localhost:3002 weight=1;
    }

    server {
        listen       80; //访问域名
        server_name  localhost; //访问协议


        location / {
            root   dist; //加载的文件夹名
            index  index.html index.htm;
        }

        error_page  404              /404.html;

        error_page   500 502 503 504  /50x.html;
        location /ajax/ { //反向代理配置
             proxy_pass https://m.maoyan.com;
        }

    }
}

```

