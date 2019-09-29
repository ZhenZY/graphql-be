import path from 'path';
import fs from 'fs';
import fileStreamRotator from 'file-stream-rotator';
import morgan from 'morgan';

const logDir = path.join(__dirname, '../log');

// ensure log directory exists
fs.existsSync(logDir) || fs.mkdirSync(logDir)

// 日志切割
const accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDir, 'request_%DATE%.log'),
  frequency: 'daily'
});

morgan.token('local-time', function(req, res) {
  return `[Local time: ${new Date().toLocaleString()}]`;
});

const customLogFormat = ':remote-addr - :remote-user :local-time ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

export function getMorganMid() {
  return morgan(customLogFormat, {
    stream: accessLogStream // 日志的输出流配置
  })
}

