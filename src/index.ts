import fs from "fs"
import path from "path"

function findLargestAbsoluteIncrease(): void {
    console.time()
    const dataArray = csv2Array(`./values.csv`)
    let stocks: any = {}
    let largest = null

    // Mapping
    for (let i = 0; i < dataArray.length; i++) {
        const { name, value } = dataArray[i]

        if (stocks.hasOwnProperty(name)) {
            stocks[name].lastRecord = value
        } else {
            stocks[name] = {
                firstRecord: value,
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

function csv2Array(filePath: string): StockRecord[] {
    const data = fs.readFileSync(path.resolve(__dirname, filePath)).toString()

    return data
        .split("\n")
        .filter((row, index) => index !== 0 && isValidRecord(row.split(",")[3]))
        .map((row) => {
            const fields = row.split(",")
            return {
                name: fields[0],
                value: fields[3],
            }
        })
}

findLargestAbsoluteIncrease()
