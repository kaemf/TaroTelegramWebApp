async function getData(userId) {
    try{
        const response = await fetch(`/api/get?userId=${userId}`);
        if (response.ok) {
            return response.json();
        } else {
            return response.statusText;
        }
    }
    catch(error){
        return error;
    }
}

async function setData(userId, key, value) {
    const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, key, value })
    });
    if (response.ok) {
        return response.json();
    } else {
        return response.statusText;
    }
}

async function getGPTAnswer(cardName, promptInputed) {
    try {
        const response = await fetch('/api/getPrediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardName, promptInputed })
        });

        if (!response.ok) {
            return `Ошибка HTTP: ${response.status}`;
        }

        const data = await response.json();
        return data.prediction;
    } catch (error) {
        return 'Произошла ошибка при выполнении запроса:'+error;
    }
}

async function getCombination() {
    try {
        const response = await fetch('/api/getCombination');
        if (response.ok) {
            return response.json();
        } else {
            return response.statusText;
        }
    }
    catch(error){
        return error;
    }
}

async function postCombination(value) {
    const response = await fetch('/api/postCombination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({value})
    });
    if (response.ok) {
        return response.json();
    } else {
        return response.statusText;
    }
}

async function deleteCombination(_id) {
    const response = await fetch('/api/deleteCombination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
    });
    if (response.ok) {
        return response.json();
    } else {
        return response.statusText;
    }
}

async function changeCountFreeCombination(_id, count) {
    const response = await fetch('/api/changeCountFreeCombination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id, count })
    });
    if (response.ok) {
        return response.json();
    } else {
        return response.statusText;
    }
}

async function addUsersToCombination(_id, users) {
    const response = await fetch('/api/addUsersToCombination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id, users })
    });
    if (response.ok) {
        return response.json();
    } else {
        return response.statusText;
    }
}

async function getAllKeys() {
    try {
        const response = await fetch('/api/getAllKeys');
        if (response.ok) {
            return response.json();
        } else {
            return response.statusText;
        }
    }
    catch(error){
        return error;
    }
}
