type StockRecord = {
    name: string
    increase: number
}

type MappedRecord = {
    [stockName in T]: {
        firstRecord: string
        lastRecord?: string
    }
}
