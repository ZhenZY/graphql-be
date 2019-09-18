var fileStreamRotator = require('file-stream-rotator')
var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var logDir = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDir) || fs.mkdirSync(logDir)

// create a rotating write stream
var accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDir, 'access-%DATE%.log'),
  frequency: 'daily'
})

morgan.token('from', function(req, res) {
  return req.query.from || 'default return value';
});

var app = express()

// 使用自定义 format
app.use(morgan('morganFormatName', {
  stream: accessLogStream
}))

app.use(morgan('combined')); // 使用 Apache 标准组合日志输出
