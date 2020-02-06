### 学习课程项目代码

#### Node.js 从零开发 web server博客项目 前端晋升全栈工程师必备 - 慕课网

```
./common-js      // node 模块化编程
./debugger-test  // debugger in vscode
./promise-test   // promise test
./mysql-test     // mysql test
./html           // web pages
./blog-1-origin  // 原生 node 开发的博客系统
```

nginx.conf
```
location / {
    proxy_pass http://localhost:8001;
}

location /api/ {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
}
```