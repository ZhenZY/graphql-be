
import mysql from 'mysql';
import { dbConfig } from'../conf/dbConfig';
import { rejects } from 'assert';
import { resolve } from 'path';
const pool  = mysql.createPool(dbConfig);

export function getConnection(sql) {
  return new Promise ((resolve, reject) => {
      pool.getConnection(function (err, connection) {
      connection.query(sql, function (err, result) {
        connection.release();
        if (err) {
          reject(err)
        }
        if (result.insertId) {
          result.user_id = result.insertId;
        }
        resolve(result);
      });
    })
  })
}