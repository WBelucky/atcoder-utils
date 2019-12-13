import * as path from 'path'
import * as fs from 'fs'
import * as child_process from 'child_process'
import rimraf = require('rimraf')
import { outDir, inputDir, ansDir, color, info } from './setting';

export const runTest = (testCommand: string) => {
    if (fs.existsSync(outDir)) {
        rimraf.sync(outDir)
    }
    fs.mkdirSync(outDir)
    console.log(`${info} testing...`)

    fs.readdir(inputDir, (err, filenames) => {
        if (err) {
            console.error(err);
        }
        for (const f of filenames) {
            const inputFile = path.join(inputDir, f)
            const outPath = path.join(outDir, f)
            const ansFile = path.join(ansDir, f)
            if (!fs.existsSync(ansFile)) {
                console.error(`cannot find ${ansFile}`)
                return
            }
            child_process.execSync(`cat ${inputFile} | ${testCommand} > ${outPath}`)
            const o = fs.readFileSync(outPath, {encoding: 'utf-8'})
            const a = fs.readFileSync(ansFile, {encoding: 'utf-8'})
            const output = o.match(/[^\s]+/g)
            const ans = a.match(/[^\s]+/g)
            if (!ans) {
                console.error(`no contents in ${ansFile}`)
                return
            }
            if (!output) {
                console.error(`no contents in ${outPath}`)
                return
            }
            if (!ans.every((v, i) => output[i] === v)) {
                console.log(`${color.blue}<RESULT>${color.white} ${color.red}==WA==${color.white} : ${inputFile} => ${outPath}`)
                console.log()
                console.log(`${info}${color.green} Answer:`)
                console.log(a)
                console.log(`${info}${color.red} Your output`)
                console.log(o)
            } else {
                console.log(`${color.blue}<RESULT>${color.white} ${color.green}==AC==${color.white} : ${inputFile} => ${outPath}`)
            }
        }
    })
}