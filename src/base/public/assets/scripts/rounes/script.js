async function rounerun() {
    if ((await getAllKeys()).value.includes(getQueryParams().userId)) {
        const userData = (await getData(getQueryParams().userId)).value,
            stage = !parseInt(userData.stage) ? -1 : parseInt(userData.stage);
        if ((stage === -1 && userData.subscribe === true) || stage === 0 || stage === 1 || stage === 2) {
            transitionBetweenRounesAndTaro();
            if (stage === -1) await setData(getQueryParams().userId, 'stage', 0);
            run();
        }
        else{
            ShowRounes();
            let userCombination = [];
        
            mainElements.forEach(element => {
                element.addEventListener('click', (e) => {
                    RouneVibrate(element);
                    const index = element.getAttribute('index'),
                        indexInMassive = userCombination.indexOf(index),
                        child = event.currentTarget;
    
                    if (indexInMassive === -1) {
                        userCombination.push(index);
        
                        if (isMob()) {
                            child.querySelector('.no-active').style.filter = 'drop-shadow(0px 5px 10px rgba(255, 255, 255, 0.5))';
                        }
                        else{
                            child.querySelector('.no-active').style.opacity = 0;
                            child.querySelector('.active').style.opacity = 1;
                        }
                    } else {
                        userCombination.splice(indexInMassive, 1);
                        if (isMob()) {
                            child.querySelector('.no-active').style.filter = 'none';
                        }
                        else{
                            child.querySelector('.no-active').style.opacity = 1;
                            child.querySelector('.active').style.opacity = 0;
                        }
                    }
                });
            })
        
            button_roune_submit.addEventListener('click', async () => {
                if (userCombination.length){
                    alert(userCombination);
                    const compare = await Compare(userCombination);
                    if (compare) {
                        console.warn('Комбинация найдена');
                        if (compare !== 'day_card'){
                            switch (compare) {
                                case "love":
                                    await setData(getQueryParams().userId, 'rasklad', 0);
                                    break;

                                case "full":
                                    await setData(getQueryParams().userId, 'rasklad', 0);
                                    break;
                                    
                                case "cards":
                                    await setData(getQueryParams().userId, 'rasklad', getRandomInt(0, 7));
                                    break;

                                default:
                                    await setData(getQueryParams().userId, 'rasklad', 0);
                                    alert('Uncorrect parametr in function name transition');
                                    break;
                            }
                            window.location.href = `/taroapp?active=${compare}&userId=${getQueryParams().userId}`;
                        }
                        else{
                            transitionBetweenRounesAndTaro();
                            await setData(getQueryParams().userId, 'stage', 0);
                            run();
                        }

                        alert('Комбинация найдена');
                    }
                    else{
                        console.warn('Комбинация не найдена');
                        alert('Комбинация не найдена');
                    }
                    userCombination = [];
                    mainElements.forEach(element => {
                        if (isMob()) {
                            element.querySelector('.no-active').style.filter = 'none';
                        }
                        else{
                            element.querySelector('.no-active').style.opacity = 1;
                            element.querySelector('.active').style.opacity = 0;
                        }
                    });
                }
                else alert('Вы не ввели ни одной комбинации');
            })
        }
    }
    else window.location.href = 'web.html';
}

rounerun();