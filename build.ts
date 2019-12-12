import nexe = require('nexe')
import process from 'process'

(() => {
    if (process.argv.length !== 4) {
        console.error(`usage: ts-node build <js file> <out file>`)
        return 
    }
    nexe.compile({
        input: process.argv[2],
        output: process.argv[3],
        //resource: []
    }, function(err) {
        throw err
    }).catch((e) => {
        // pass
    })

})()