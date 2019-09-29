import mysql from'mysql'
import dbConfig from'../conf/dbConfig'

class MySQLConnector {

    // 这种类似常量的 getter 将用于连接到 MySQL
    get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || config.user }
    get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || config.database }
    get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || config.password }
    get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || config.host }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || dbConfig.poolSize }

    constructor() {

        // 实例化连接池
        this.internalPool = mysql.createPool({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD,
            connectionLimit: this.MYSQL_DB_POOL_SIZE,
            waitForConnections: true
        })
        this.registerThreadCounter()
    }

    /**
     * 
     * 注册一个事件列表，以便在打开新连接时捕获
     * 此方法使用 console.log
     * 但在生产环境中可能会使用异步日志写，比如 winston，因为 console.log 被阻塞了
     * 
     */
    registerThreadCounter() {
        this.internalPool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))
    }

    /**
     * 
     * 
     * Retrieves the connection pool
     * 
     */
    get pool() {
        return this.internalPool
    }
}

// 导出包装器使用的连接器单例
module.exports = new MySQLConnector()