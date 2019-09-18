// GraphQLObjectType: 定义 graphql 对象类型
// GraphQLSchema: 定义 graphql schema
// schema 定义一套类型，用以描述你可能从那个服务查询到的数据
// 每当查询到来，服务器会根据 schema 验证并执行查询
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    
  }
})

// 每个 GraphQL 服务都有 Query 类型，可能有个 Mutation 类型
// 这两个类型定义了每个 GraphQL 查询的入口
// 任何导致数据写入的操作通过 mutation 来发送
export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})