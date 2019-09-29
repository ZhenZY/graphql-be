
import { userSqlMapping } from'../../dao/userSqlMapping';
import { getConnection } from '../../utils/connection';
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

//定义schema及resolver
const UnitType = new GraphQLEnumType({
    name:'UnitType',
    description:"单位",
    values: {
        MM: {value: 'MM'},
        cm: {value: 'cm'},
        mm: {value: 'mm'},
    }
});

const UserType = new GraphQLObjectType({
    name:'UserType',
    description:"用户信息实体",
    fields: () => {
        return ({
            user_id: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            user_name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            sex: {
              type: new GraphQLNonNull(GraphQLString)
            },
            intro: {
              type: new GraphQLNonNull(GraphQLString)
            },
            stature: {
                type: GraphQLFloat,
                args: {
                    unit: {type: UnitType}
                },
                resolve: function (user, {UnitType}) {
                    if (unit == 'MM') {
                        return user.stature/100;
                    } if (unit == 'cm') {
                        return user.stature;
                    }else if (unit == 'mm') {
                        return user.stature*10;
                    }
                }
            },
        });
    },
});
const  UserInput = new GraphQLInputObjectType({
    name:'UserInput',
    description:"用户信息Input实体",
    fields:()=>({
        name:{
          type: new GraphQLNonNull(GraphQLString)
        },
        sex:{
          type: new GraphQLNonNull(GraphQLString)
        },
        intro:{
          type: new GraphQLNonNull(GraphQLString)
        },
        skills:{
          type: new GraphQLList(GraphQLString)
        },
        stature:{
          type: UnitType
        },
    }),
});

module.exports = {
    query:{
        users:{
            type: new GraphQLList(UserType),
            description:'查询全部用户列表',
            resolve:async function () {
              return await getConnection(userSqlMapping.queryAll, (res) => {
                  
                  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                  console.log(res)
                  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                  return res;
                });
            }
        }
    }
};