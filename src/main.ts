#!/usr/bin/env ts-node

import { fetchTest } from "./get_test";
import { runTest } from "./do_test";
import * as process from 'process'

(() => {
    if (process.argv.length < 3) {
        console.log(`usage: atc <command> <args>`)
        console.log(`commands:`)
        console.log(`\tfetch\t`)
        console.log(`\ttest\t`)
    }
    switch (process.argv[2]) {
        case "fetch":
            console.log(process.argv.length)
            if (process.argv.length !== 5) {
                console.log("usage: atc fetch <contest> <problem>")
                return
            }
            fetchTest(process.argv[3], process.argv[4])
            return
        case "test":
            if (process.argv.length !== 4) {
                console.log("usage: atc test <test command>")
                return
            }
            runTest(process.argv[3])
            return
        default:
            break;
    }
})()
