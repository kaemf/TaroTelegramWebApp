function checkNumbers(oneArray: string[], twoArray: string[]){
    if (oneArray.length === twoArray.length) {
        for (let i = 0; i < oneArray.length; i++) {
            if (oneArray[i] !== twoArray[i]) {
                return false;
            }
        }
        return true;
    }
}

export default function checkArrays(arrayCombination: any[], arrayInputed: string[]){
    let arrayOfCorrespodence = [];
    for (let i = 0; i < arrayCombination.length; i++) {
        if (checkNumbers(arrayCombination[i].combination, arrayInputed)) {
            arrayOfCorrespodence.push(arrayCombination[i]);
        }
    }
    return !arrayOfCorrespodence.length;
}