import requestPromise = require('request-promise');
import * as jsdom from 'jsdom'
import * as fs from 'fs'


if (process.argv.length !== 4) {
    throw new Error('usage: ts-node main.ts <contest name> <problem>');
}

const contestName = process.argv[2];
const problem = process.argv[3]

const options = {
    uri: `https://atcoder.jp/contests/${contestName}/tasks/${contestName}_${problem}`
};

requestPromise(options)
    .then((body: string) => {
        new jsdom.JSDOM(body).window.document.querySelectorAll("section").forEach((a) => {
            for (let i = 0; i < a.children.length; i++) {
                const c = a.children.item(i)
                if (c === null || c.textContent === null || c.nextElementSibling === null) continue;
                const inMatch = c.textContent.match(/入力例\s*(\d+)/)
                if (inMatch) {
                    fs.writeFileSync(
                        `./sample${inMatch[1]}.txt`,
                        c.nextElementSibling.textContent + '\n',
                        { encoding: 'utf-8'}
                    )
                    continue;
                } 
                const outMatch = c.textContent.match(/出力例\s*(\d+)/)
                if (outMatch) {
                    fs.writeFileSync(
                        `./ans${outMatch[1]}.txt`,
                        c.nextElementSibling.textContent + '\n',
                        { encoding: 'utf-8'}
                    )
                    continue;
                }
            }
        })
    })
    .catch((e) => {
        throw e
    })
