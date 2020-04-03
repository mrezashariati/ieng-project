const winston = require('winston');
const defualtTransports = [
    new winston.transports.Console({level:'error'}),
    new winston.transports.File({filename:process.env.ROOT + 'logs/error.log',level:'error'}),
    new winston.transports.File({filename:process.env.ROOT + 'logs/info.log',level:'info'}),
    new winston.transports.File({filename:process.env.ROOT + 'logs/debug.log',level:'debug'}),
];
const defualtFormat = winston.format.combine(
    winston.format.timestamp({
        format : "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.json(),
);
const defualtLevel = 'debug'
let logger = undefined;

function initializeLogger(level = defualtLevel,format = defualtFormat,transports = defualtTransports){
    if(typeof logger === 'undefined'){
        logger = winston.createLogger({
            level : level,
            format : format,
            transports: transports,
        });
    }
}

function createLogger(level = defualtLevel,format = defualtFormat,transports = defualtTransports){
    let customeLogger = winston.createLogger({
        level : level,
        format : format,
        transports: transports,
    });
    return customeLogger;
}

function log(message,level='info',err=''){
    logger.log({
        level:level,
        message:message,
        error:err,
    })
}

function getLogger(){
    return logger;
}

module.exports = {initializeLogger,createLogger,log,getLogger}
