export function requiredData(dataIn, arrOfRequiredfieldsName){
    if(! arrOfRequiredfieldsName){
        return null;
    }
    let arrOfMissed = [];
    for (let index = 0; index < arrOfRequiredfieldsName.length; index++) {
        if(!dataIn[`${arrOfRequiredfieldsName[index]}`]){
            arrOfMissed.push(arrOfRequiredfieldsName[index]);
        }
    }
    return arrOfMissed;
}

export function responseOfMissedData(arrOfMissedData){
    if(! arrOfMissedData){
        return null;
    }
    // arrOfMissedData.foreach((element, index, arr) => {
    //     arr[index] = `${element} is a required field`;
    // })
    // return arrOfMissedData;

    let arr = [];
    for (let index = 0; index < arrOfMissedData.length; index++) {
        let str = `${arrOfMissedData[index]} is a required field`;
        arr.push(str);
    }
    return arr;
}

