import fs from "fs"
import path from "path"
import csv from "csvtojson"

async function findLargestAbsoluteIncrease(): Promise<void> {
    console.time()
    const dataArray = await csv2Array(`./values.csv`)
    let stocks: any = {}
    let largest = null

    // Mapping
    for (let i = 0; i < dataArray.length; i++) {
        const { Value, Name }: StockRecord = dataArray[i]

        if (!isValidRecord(Value)) continue

        if (stocks.hasOwnProperty(Name)) {
            stocks[Name].lastRecord = Value
        } else {
            stocks[Name] = {
                firstRecord: Value,
            }
        }
    }

    // Find largest
    for (const stock in stocks) {
        const values = stocks[stock]
        let increase = +values.lastRecord - +values.firstRecord

        if (!largest) {
            largest = {
                name: stock,
                value: increase,
            }
            continue
        }

        if (increase > largest.value) {
            largest = {
                name: stock,
                value: increase,
            }
        }
    }

    console.log("Stock with the largest absolute increase:", largest?.name)
    console.timeLog()
}

function isValidRecord(value: string) {
    return !isNaN(parseFloat(value))
}

async function csv2Array(filePath: string): Promise<any[]> {
    try {
        const data = fs
            .readFileSync(path.resolve(__dirname, filePath))
            .toString()
        return await csv().fromString(data)
    } catch (error: any) {
        throw new Error(error)
    }
}

findLargestAbsoluteIncrease()
