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

