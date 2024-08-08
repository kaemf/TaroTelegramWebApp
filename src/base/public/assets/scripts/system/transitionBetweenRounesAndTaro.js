function transitionBetweenRounesAndTaro() {
    document.querySelector('.main-roune-block').style.display = 'none';
    document.querySelector('.button-submit-roune').style.display = 'none';
    document.querySelector(".title-roune").style.display = 'none';
    document.querySelector(".content-text").style.display = 'block';
    document.querySelector(".button-next").style.display = 'block';
    document.querySelector(".title").style.display = 'block';
}

function ShowRounes(){
    document.querySelector('.main-roune-block').style.display = 'flex';
    document.querySelector('.button-submit-roune').style.display = 'block';
    document.querySelector(".title-roune").style.display = 'block';
    document.querySelector(".content-text").style.display = 'none';
    document.querySelector(".button-next").style.display = 'none';
    document.querySelector(".title").style.display = 'none';
    document.querySelectorAll('.main-roune-block > .roune-item').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 400);
    });
}