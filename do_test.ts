#!/usr/bin/env ts-node
import path from 'path'
import fs from 'fs'
import child_process from 'child_process'
import rimraf from 'rimraf'

if (process.argv.length !== 3) {
    console.error("usage: ./do_test.ts <test command>");
}
const testCommand = process.argv[2];

(() => {
    const inputDir = "./samples"
    const ansDir = "./answers"
    const outDir = "./outputs"
    if (fs.existsSync(outDir)) {
        rimraf.sync(outDir)
    }
    fs.mkdirSync(outDir)
    console.log(`<INFO> testing...`)

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
            const output = fs.readFileSync(outPath, {encoding: 'utf-8'}).match(/[^\s]+/g)
            const ans = fs.readFileSync(ansFile, {encoding: 'utf-8'}).match(/[^\s]+/g)
            if (!ans) {
                console.error(`no contents in ${ansFile}`)
                return
            }
            if (!output) {
                console.error(`no contents in ${outPath}`)
                return
            }
            if (!ans.every((v, i) => output[i] === v)) {
                console.log(`<RESULT> ==WA== : ${inputFile}`)
            } else {
                console.log(`<RESULT> ==AC== : ${inputFile}`)
            }
        }
    })
})()