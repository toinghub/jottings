# git

```js
git init //初始化仓库
git add . //添加到暂存区
git status //查看git此时提交状态
git commit -m '提交备注' //提交到本地仓库
git log  //查看提交记录
git reset --hard HEAD~1 //回退上一个版本，~2就是回退两个版本
git reflog  //操作记录
git reset --hard 6位版本号 //切换提交版本  操作记录处获取版本号

git remote add 别名(origin)  远程仓库地址 //绑定git远程仓库
git push -u  origin  推送的分支名称 //将内容推送到远程仓库，-u记住地址，下次直接git push origin  推送的分支名称

git clone 仓库地址   //项目克隆
git pull 远程仓库地址 分支名称  //拉取远程仓库

git branch -a //查看所有分支
git checkout -b aa //创建新的分支aa
git checkout aa //切换到aa分支的
git push origin aa //推送aa分支到远程仓库aa分支
git push origin master:aa //推送master分支到远程仓库aa分支
git push origin :aa //删除远程仓库aa分支
git branch -d aa //删除本地aa分支
```

#### .gitigonre   忽略文件

```js
node_modules //忽略node_modules 文件夹
/dist   //忽略dist 文件夹
```



#### nginx服务器

>nginx服务器文件夹目录中不能有中文目录
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

