#!/bin/bash
# 使用 git bash 执行该脚本
mysql -uroot -p123456 --default-character-set=utf8 <<EOF
drop database if exists graphql;
create database graphql character set utf8;
use graphql;
source graphql.sql;
EOF