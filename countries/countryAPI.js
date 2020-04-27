const express = require('express');
const router = express.Router();
let countyUtils = require('./countryUtils');
let {initializeLogger,createLogger,log,getLogger} = require('../logger.js')

router.use('/statistics',(req,res,next)=>{
    log(message = '/countries/statistics access')
    next()
})

router.get('/statistics',(req,res)=>{

        countyUtils.fetch_data().then((data)=>{
            res.render('grid',{'locations':data.locations})
        }).catch(err => {
            log(message="internal error",level='error',err.toString())
            res.status(500).json("Internal error occured");
        })
        
    })

module.exports = router