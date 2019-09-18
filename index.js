// 通过 express 跑起一个服务器，通过 express-graphql 把 graphql 挂载到服务器上
import express from 'express';

//graphql
import graphQLHTTP from 'express-graphql';
import { userSchema } from './models/user/userSchame';

const APP_PORT = 6000;

const app = express();

// 在 /graphql 端点上建立一个 GraphQL 服务器，它知道如何处理请求
app.use('/graphql', graphQLHTTP({
  schema: userSchema,
  graphiql: true
}));

app.listen(APP_PORT, () => {
  `App is now running on http://localhost:${APP_PORT}`
});