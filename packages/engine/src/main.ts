import { argv } from 'process'
import {
    EngineOperation,
    EngineOperationType,
} from '@activepieces/shared'
import { EngineConstants } from './lib/handler/context/engine-constants'
import { execute } from './lib/operations'
import { utils } from './lib/utils'

async function executeFromFile(operationType: string): Promise<void> {
    const input: EngineOperation = await utils.parseJsonFile(EngineConstants.INPUT_FILE)
    const operationTypeCasted = operationType as EngineOperationType
    const result = await execute(operationTypeCasted, input)
    await utils.writeToJsonFile(EngineConstants.OUTPUT_FILE, result)
}

async function executeFromWorkerData(operation: EngineOperation, operationType: EngineOperationType): Promise<void> {
    try {
        const result = await execute(operationType, operation)
        const resultParsed = JSON.parse(JSON.stringify(result))
        process.send?.({
            type: 'result',
            message: resultParsed,
        })
    }
    catch (error) {
        process.send?.({
            type: 'error',
            message: error,
        })
    }
}

const operationType = argv[2]

if (operationType) {

    console.log("in engine main 38 line")
    executeFromFile(operationType).catch(e => console.error(e))
    console.log("in engine main 40 line")
}
else {
    console.log(1)
    if (process.send) {
        console.log(2)
        const originalLog = console.log
        console.log = function (...args) {
            process.send?.({
                type: 'stdout',
                message: args.join(' ') + '\n',
            })
            originalLog.apply(console, args)
        }
        console.log(3)
        const originalError = console.error
        console.error = function (...args) {
            process.send?.({
                type: 'stderr',
                message: args.join(' ') + '\n',
            })
            originalError.apply(console, args)
        }
        
        console.log(4)
        process.on('message', (m: { operation: EngineOperation, operationType: EngineOperationType }) => {
            executeFromWorkerData(m.operation, m.operationType).catch(e => {
                process.send?.({
                    type: 'error',
                    message: e,
                })
            })
        })
        console.log(5)
    }
}
