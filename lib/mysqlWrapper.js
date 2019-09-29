const mySQLConnector = require('./mysqlConnector')

module.exports = class MySQLWrapper {
    
    /**
     * 
     * 
     * 查询数据库
     * @param {String} query - 查询本身
     * @param {Array} params - 要传递给 MySQL 的参数
     * @returns {Promise} - 返回查询结果的 Promise
     * 
     */
    static createQuery({query, params}) {

        return new Promise((resolve, reject) => {
            mySQLConnector.pool.getConnection((err, connection) => {

                // 如果在获取连接时发生错误，返回 reject 给调用者
                if (err) {
                    return reject(err)
                }

                // 执行查询
                connection.query(query, params, (err, rows) => {

                    // 释放连接池
                    connection.release()

                    // 如果在查询时发生错误，返回 reject 给调用者
                    if (err) {
                        return reject(err)
                    }

                    // 都成功返回 resolve
                    return resolve(rows)
                })
            })
        })
    }

    /**
     * 
     * 
     * 执行事务查询
     * @param {MySQL.Connection} connection - The connection whose transaction will be used
     * @param {String} query - The query itself
     * @param {Array} params - The parameters to be passed to MySQL
     * @returns {Promise} - A promise to a query result
     * 
     */
    static createTransactionalQuery({query, params, connection}) {
        
        return new Promise((resolve, reject) => {

            connection.query(query, params, (err, rows) => {
                
                // 如果在执行查询时发生错误，返回 reject 给调用者
                if (err) {
                    return reject(err)
                }
                return resolve(rows)
            })
        })
    }
    
    /**
     * 
     * 
     * 回滚事务
     * @param {MySQL.Connection} connection - 被回滚的那个连接的事务
     * @returns {Promise}
     * 
     */
    static rollback(connection) {

        return new Promise((resolve, reject) => {

            try {
                connection.rollback(() => resolve())
            } catch (e) {
                return reject(e)
            } finally {
                connection.release()
            }

        })
    }

    /**
     * 
     * 
     * 提交一个事务
     * @param {MySQL.Connection} connection - 连接的事务会被提交
     * @returns {Promise}
     * 
     */
    static commit(connection) {
        return new Promise((resolve, reject) => {
            try {
                connection.commit(err => { 
                    if (err) { 
                        return rollback(connection, err)
                    }
                    return resolve()
                })
            } catch (e) {
                return reject(e)
            } finally {
                connection.release()
            }

        })

    }

    /**
     * 
     * 
     * 从池中检索事务的连接
     * @param {MySQL.Connection} connection
     * 
     */
    static getConnectionFromPool() {
        return new Promise((resolve, reject) => {

            mySQLConnector.pool.getConnection((err, connection) => {

                // 如果连接无法检索，返回 reject
                if (err) {
                    return reject(err)
                }

                // 返回一个连接
                return resolve(connection)
            })
        })
    }

    /**
     * 
     * 
     * 在连接中开启一个新的事务
     * @param {MySQL.Connection} connection
     * 
     */
    static beginTransaction(connection) {
        return new Promise((resolve, reject) => {

            connection.beginTransaction(err => {

                // 不能开启
                if (err) {
                    return reject(err)
                }
                return resolve(connection)
            })
        })
    }
}
