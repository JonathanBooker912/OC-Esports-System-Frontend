// {
//     id: 1,
//     value: "97.2",
//     metricId: 11,
//     metricName: "Avg Accuracy"
//  }

const parseDataPoint = (metric, dataType) => {
    const parsedData = {id: metric.date}
    if(dataType == "Integer"){
        const value = parseInt(metric.value)
        parsedData.value = value
    }
    else if(dataType == "Float"){
        const value = parseFloat(metric.value)
        parsedData.value = value
    }
    return parsedData;
}

export default parseDataPoint;