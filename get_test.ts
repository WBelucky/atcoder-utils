#!/usr/bin/env ts-node
import requestPromise = require('request-promise');
import * as jsdom from 'jsdom'
import * as fs from 'fs'
import rimraf from 'rimraf'

(() => {
    if (process.argv.length !== 4) {
        console.error('usage: ts-node main.ts <contest name> <problem>');
        return
    }

    const contestName = process.argv[2];
    const problem = process.argv[3]

    const sampleFolder = './samples'
    if (fs.existsSync(sampleFolder)) {
        rimraf.sync(sampleFolder)
    }

    const options = {
        uri: `https://atcoder.jp/contests/${contestName}/tasks/${contestName}_${problem}`
    };

    requestPromise(options)
        .then((body: string) => {
            new jsdom.JSDOM(body).window.document.querySelectorAll("h3").forEach((c) => {
                    if (c === null || c.textContent === null || c.nextElementSibling === null) return;

                    const inMatch = c.textContent.match(/入力例\s*(\d+)/)
                    if (inMatch) {
                        if (!fs.existsSync(sampleFolder)) {
                            fs.mkdirSync(sampleFolder)
                        }
                        const sampleFile = `${sampleFolder}/${inMatch[1]}.txt`
                        fs.writeFileSync(
                            sampleFile,
                            c.nextElementSibling.textContent + '\n',
                            { encoding: 'utf-8'}
                        )
                        console.log(`<INFO>: ${sampleFile} has created!`)
                        return
                    }
                    const outMatch = c.textContent.match(/出力例\s*(\d+)/)
                    if (outMatch) {
                        const ansFolder = "./answers"
                        if (!fs.existsSync(ansFolder)) {
                            fs.mkdirSync(ansFolder)
                        }
                        const ansFile = `${ansFolder}/${outMatch[1]}.txt`
                        fs.writeFileSync(
                            ansFile,
                            c.nextElementSibling.textContent + '\n',
                            { encoding: 'utf-8'}
                        )
                        console.log(`<INFO>: ${ansFile} has created!`)
                        return
                    }
                }
            )
        })
        .catch((e) => {
            throw e
        })
})()
