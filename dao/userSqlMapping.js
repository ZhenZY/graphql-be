/**
 * CRUD SQL语句
 */
export const userSqlMapping = {
  insert: 'INSERT INTO gl_users(id, name, age) VALUES(0,?,?)',
  update: 'update gl_users set name=? age=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from gl_users where id=?',
  queryAll:"SELECT * FROM `gl_users`",
  addUser:'INSERT INTO gl_users( name, sex,intro) VALUES(?,?,?)',
  courses:"SELECT * FROM `gl_course`",
  courseById:"SELECT * FROM `gl_course`  where userId= ? limit 10",
}