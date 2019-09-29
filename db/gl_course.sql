SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `gl_course`
-- ----------------------------
-- ENGINE=InnoDB：存储引擎为 InnoDB
-- AUTO_INCREMENT=5：插入新纪录时，自动创建主键的值，从 5 开始
DROP TABLE IF EXISTS `gl_course`;
CREATE TABLE `gl_course` (
  `coure_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) DEFAULT NULL,
  `score` int(5) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`coure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `gl_course`
-- ----------------------------
BEGIN;
INSERT INTO `gl_course` VALUES ('1', '数学', '33', '1'), ('2', '语文', '55', '3'), ('3', '数学', '55', '2'), ('4', '历史', '44', '2');
COMMIT;