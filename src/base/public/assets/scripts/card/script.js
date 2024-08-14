async function run() {
    try {
        const userId = getQueryParams().userId,
            user = await getData(userId);

        let stage = !parseInt(user.value.stage) ? 0 : parseInt(user.value.stage);

        switch (stage) {
            case 0:
                ShowNewContent(`КАРТА ДНЯ`, startMessage[getRandomInt(1, 4)], 'closed', 'Открыть карту', 600);
                break;
            
            case 1:
                const dayCard = user.value.card;
                ShowNewContent(dayCard, '', 'opening', 'Что она значит?', 10000);
                break;
            
            case 2:
                const gptAnswer = user.value.answer ?? await gptAnswer(user.value.card);
                button.style.marginTop = '10px';
                ShowNewContent(user.value.card, gptAnswer, 'open', 'ЖДЁМ ВАС ЗАВТРА', 300, true);
                break;
        }

        button.addEventListener('click', async () => {
            if (stage++ === 2) {
                await setData(userId, 'stage', -1);
                Telegram.WebApp.close();
                return;
            }

            switch (stage) {
                case 0:
                    ShowNewContent(`КАРТА ДНЯ`, startMessage[getRandomInt(1, 4)], 'closed', 'Открыть карту', 300);
                    await setData(userId, 'stage', 0);
                    break;
                
                case 1:
                    const dayCard = CardBase[getRandomInt(1, 78)];
                    ShowNewContent(dayCard, '', 'opening', 'Что она значит?', 10000);
                    await setData(userId, 'card', dayCard);
                    await setData(userId, 'stage', 1);
                    break;
                
                case 2:
                    await setData(userId, 'stage', 2);
                    const _dayCard = (await getData(userId)).value.card;
                    ShowNewContent(_dayCard, "", 'open', 'ЗАГРУЗКА');
                    const gptRespond = await getGPTAnswer(_dayCard);
                    await setData(userId, 'answer', gptRespond);
                    button.style.marginTop = '10px';
                    ShowNewContent(_dayCard, gptRespond, '', 'ЖДЁМ ВАС ЗАВТРА!');
                    button.style.cursor = 'pointer';
                    break;
            }
        });
    } catch (error) {
        title.innerHTML = 'Error: ' + error.message;
    }
}