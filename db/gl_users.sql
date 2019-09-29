-- ----------------------------
--  Table structure for `gl_user`
-- ----------------------------
DROP TABLE IF EXISTS `gl_users`;
CREATE TABLE `gl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT '1',
  `intro` varchar(255) DEFAULT NULL,
  `stature` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `gl_user`
-- ----------------------------
BEGIN;
INSERT INTO `gl_users` VALUES ('1', 'xiaoming', '1', '5555555555', '111'), ('2', '2', '1', 'sdfasdfasdfasdfasdf', '222'), ('3', '2333', '444', 'zhaiqianfeng', '111'), ('59', 'yaqoiao', '11', '123123', null), ('60', 'yaqoiao', '11', '123123', null), ('61', '222222', '2', '33', null), ('62', '222222', '2', '33', null), ('63', '222222', '2', '33', null);
COMMIT;