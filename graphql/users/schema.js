var {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');

const userSchema = require('./user');

const Query = new GraphQLObjectType({
    name:'UserQuery',
    description:'用户信息查询',
    fields:()=>(Object.assign({},
        userSchema.query
    )),
});
export const schema = new GraphQLSchema({
    query: Query
});