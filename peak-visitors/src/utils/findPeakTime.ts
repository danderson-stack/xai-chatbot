export const DEFAULT_DATA: number[][] = [
    [1487799425, 14, 1],
    [1487799425, 4, 0],
    [1487799425, 2, 0],
    [1487800378, 10, 1],
    [1487801478, 18, 0],
    [1487801478, 18, 1],
    [1487901013, 1, 0],
    [1487901211, 7, 1],
    [1487901211, 7, 0]
]

export const findPeakTime = (data: number[][]) => {
    let count = 0
    let maxCount = 0
    let maxTime = 0

    for (let i = 0; i < data.length; i++) {
        if (data[i][2] === 1) {
            count += data[i][1]
        } else if (data[i][2] === 0) {
            count -= data[i][1]
        }

        if (i < data.length - 1 && data[i][0] === data[i + 1][0]) {
            continue
        }

        if (count > maxCount) {
            maxCount = count
            maxTime = data[i][0]
        }
    }

    return { maxTime, maxCount }
}