import fs from "fs"
import path from "path"

function findLargestAbsoluteIncrease(): void {
    console.time()
    let mappedStocks: MappedRecord = {}
    let largest: StockRecord | null = null
    const data = fs
        .readFileSync(path.resolve(__dirname, "./values.csv"))
        .toString()

    // Mapping and filtering
    data.split("\n")
        .filter((row, index) => index !== 0 && isValidRecord(row.split(",")[3]))
        .map((row) => {
            const [name, data, notes, value, change] = row.split(",")

            if (mappedStocks.hasOwnProperty(name)) {
                mappedStocks[name].lastRecord = value
            } else {
                mappedStocks[name] = {
                    firstRecord: value,
                }
            }
        })

    // Find largest
    for (const stock in mappedStocks) {
        const values = mappedStocks[stock]
        let currentIncrease =
            +(values.lastRecord || values.firstRecord) - +values.firstRecord

        if (!largest) {
            largest = {
                name: stock,
                increase: currentIncrease,
            }
            continue
        }

        if (currentIncrease > largest.increase) {
            largest = {
                name: stock,
                increase: currentIncrease,
            }
        }
    }

    console.log("Stock with the largest absolute increase:", largest?.name)
    console.timeLog()
}

function isValidRecord(value: string) {
    return !isNaN(parseFloat(value))
}

findLargestAbsoluteIncrease()
