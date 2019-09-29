// 通过 express 跑起一个服务器，通过 express-graphql 把 graphql 挂载到服务器上
import express from 'express';
import path from 'path';

// graphql
import graphQLHTTP from 'express-graphql';
import { schema } from './graphql/users/schema';
import { getMorganMid } from './utils/morgan';
var index = require('./routes/index');

const APP_PORT = 6001;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置views路径映射到views文件夹
app.set('view engine', 'jade'); // 设置默认的模板引擎

app.use(getMorganMid());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
// 凡是请求经过 /graphql 的 url 的请求，都经过中间件 express-graphql 处理
app.use('/graphql', graphQLHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(APP_PORT, () => {
  `App is now running on http://localhost:${APP_PORT}`
});