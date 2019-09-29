# 一、创建数据库
## 1. 通过图形化数据库管理工具 Navicat
1. 创建数据库 graphql
2. 右键 graphql 数据库执行该项目的 sql 文件
3. 执行完成关闭数据库再重新打开数据库，即可看到表

## 2. 通过执行 shell 脚本
打开 git bash 工具执行命令`. initSql.sh` 即可

# 二、GraphQL 服务启动过程思路

![](.\images\graphql思路.svg)

# 三、2 种启动 GraphQL 服务方式

## 1. 方式一："notes/buildSchema.js"

> 简单应用

* （1）使用 `buildSchema` 直接声明一个 schema
* （2）`query` 和 `mutation` 类型用字符串形式
* （2）根解析器（根对象类型的返回值）在 `graphqlHTTP` 中

## 2. 方式二："notes/graphQLSchema.js"

> 复杂应用（灵活）

* （1）使用 `GraphQLSchema` 构造函数构建 schema
* （2）`query` 和 `mutation` 可用对象形式构造
* （3） 根解析器（根对象类型的返回值）在 `query` 和 `mutation` 类型上

# 四、多种请求方式测试 GraphQL 后端接口

> 运行 examples/graphqlHTTP.js，使得后端服务在 localhost:4000/graphql 开启

## 1. 使用终端查询

> 打开 git bash 复制粘贴以下代码

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql
```

## 2. 使用图形化用户界面查询

> examples/graphqlHTTP.js 中

```js
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // 设为 true
}));
```

> 或者下载 [insomnia](https://insomnia.rest/download/ )

# 3. 浏览器控制台

```js
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

