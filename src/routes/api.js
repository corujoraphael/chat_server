
const router = require('express').Router()

router.use(function timeLog(req, res, next) {
   //console.log('Api Route - Time: ', new Date().toUTCString())
    next()
})

module.exports = router