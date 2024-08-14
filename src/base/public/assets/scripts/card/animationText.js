async function typeText(element, text) {
    if (element) {
        element.innerHTML = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 15);
    }
}