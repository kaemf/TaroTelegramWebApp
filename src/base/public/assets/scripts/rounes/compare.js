async function Compare(input){
    const correspodenceCombination = checkArrays((await getCombination()).value, input);

    if (correspodenceCombination.length){
        for (let i = 0; i < correspodenceCombination.length; i++) {
            if (correspodenceCombination[i].free) {
                if (!correspodenceCombination[i].users?.includes(getQueryParams().userId)){
                    if (correspodenceCombination[i].available_count === 1){
                        await deleteCombination(correspodenceCombination[i]._id);
                        return correspodenceCombination[i].func;
                    }
                    else{
                        await changeCountFreeCombination(correspodenceCombination[i]._id, correspodenceCombination[i].available_count - 1);
                        // await addUsersToCombination(correspodenceCombination[i]._id, getQueryParams().userId);
                        return correspodenceCombination[i].func;
                    }
                }
                else return false;
            }
            else{
                await deleteCombination(correspodenceCombination[i]._id);
                return correspodenceCombination[i].func;
            }
        }
    } 
}

function checkNumbers(oneArray, twoArray){
    if (oneArray.length === twoArray.length) {
        for (let i = 0; i < oneArray.length; i++) {
            if (oneArray[i] !== twoArray[i]) {
                return false;
            }
        }
        return true;
    }
}

function checkArrays(arrayCombination, arrayInputed){
    let arrayOfCorrespodence = [];
    for (let i = 0; i < arrayCombination.length; i++) {
        if (checkNumbers(arrayCombination[i].combination, arrayInputed)) {
            arrayOfCorrespodence.push(arrayCombination[i]);
        }
    }
    return arrayOfCorrespodence;
}