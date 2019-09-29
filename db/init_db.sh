#!/bin/bash
# 使用 git bash 执行该脚本
mysql -uroot -p123456 --default-character-set=utf8 <<EOF
drop database if exists gl_db;
create database gl_db character set utf8;
use gl_db;
source init_gl.sql;
EOF