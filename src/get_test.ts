import requestPromise = require('request-promise');
import * as jsdom from 'jsdom'
import * as fs from 'fs'
import rimraf = require('rimraf')
import { inputDir, ansDir, info } from './setting';

export const fetchTest = (contestName: string, problem: string) => {

    if (fs.existsSync(inputDir)) {
        rimraf.sync(inputDir)
    }
    if (fs.existsSync(ansDir)) {
        rimraf.sync(ansDir)
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
                        if (!fs.existsSync(inputDir)) {
                            fs.mkdirSync(inputDir)
                        }
                        const sampleFile = `${inputDir}/${inMatch[1]}.txt`
                        fs.writeFileSync(
                            sampleFile,
                            c.nextElementSibling.textContent + '\n',
                            { encoding: 'utf-8'}
                        )
                        console.log(`${info}: ${sampleFile} has created!`)
                        return
                    }
                    const outMatch = c.textContent.match(/出力例\s*(\d+)/)
                    if (outMatch) {
                        if (!fs.existsSync(ansDir)) {
                            fs.mkdirSync(ansDir)
                        }
                        const ansFile = `${ansDir}/${outMatch[1]}.txt`
                        fs.writeFileSync(
                            ansFile,
                            c.nextElementSibling.textContent + '\n',
                            { encoding: 'utf-8'}
                        )
                        console.log(`${info}: ${ansFile} has created!`)
                        return
                    }
                }
            )
        })
        .catch((e) => {
            throw e
        })
}
