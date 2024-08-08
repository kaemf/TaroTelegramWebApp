function ShowNewContent(_title, _content, _media, _button, duration = 300, end, stage2 = false) {
    title.style.opacity = 0;
    document.querySelector('.content-text').style.opacity = 0;
    button.style.opacity = 0;
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    switch (_media) {
        case 'closed':
            if (stage2) closed_background.currentTime = 0;
            closed_background.pause(); // TO USE SET PLAY
            open_background.pause();
            opening_background.pause();

            if (open_background.classList.contains('fade-in')){
                setTimeout(() => {
                    open_background.classList.remove('fade-in');
                }, 300);
                if (!open_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        open_background.classList.add('fade-out');
                    }, 300);
                }
            }
            else if (opening_background.classList.contains('fade-in')){
                setTimeout(() => {
                    opening_background.classList.remove('fade-in');
                }, 300);
                if (!opening_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        opening_background.classList.add('fade-out');
                    }, 300);
                }
            }
            else if (!closed_background.classList.contains('fade-in')){
                setTimeout(() => {
                    closed_background.classList.add('fade-in');
                }, 300);
                if (closed_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        closed_background.classList.remove('fade-out');
                    }, 300);
                }
            }
            break;
        case 'opening':
            opening_background.currentTime = 0;
            closed_background.pause();
            open_background.pause();
            opening_background.play();

            if (open_background.classList.contains('fade-in')){
                setTimeout(() => {
                    open_background.classList.remove('fade-in');
                }, 300);
                if (!open_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        open_background.classList.add('fade-out');
                    }, 300);
                }
            }
            else if (!opening_background.classList.contains('fade-in')){
                setTimeout(() => {
                    opening_background.classList.add('fade-in');
                }, 300)
                if (opening_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        opening_background.classList.remove('fade-out');
                    }, 300);
                }
            }
            else if (closed_background.classList.contains('fade-in')){
                setTimeout(() => {
                    closed_background.classList.remove('fade-in');
                }, 300);
                if (!closed_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        closed_background.classList.add('fade-out');
                    }, 300);
                }
            }

            opening_background.addEventListener('ended', () => {
                open_background.currentTime = 0;
                closed_background.pause();
                open_background.play();
                opening_background.pause();

                if (!open_background.classList.contains('fade-in')){
                    setTimeout(() => {
                        open_background.classList.add('fade-in');
                    }, 300);
                    if (open_background.classList.contains('fade-out')){
                        setTimeout(() => {
                            open_background.classList.remove('fade-out');
                        }, 300);
                    }
                }
                else if (!opening_background.classList.contains('fade-in')){
                    setTimeout(() => {
                        opening_background.classList.add('fade-in');
                    }, 300);
                    if (opening_background.classList.contains('fade-out')){
                        setTimeout(() => {
                            opening_background.classList.remove('fade-out');
                        }, 300);
                    }
                }
                else if (closed_background.classList.contains('fade-in')){
                    setTimeout(() => {
                        closed_background.classList.remove('fade-in');
                    }, 300);
                    if (!closed_background.classList.contains('fade-out')){
                        setTimeout(() => {
                            closed_background.classList.add('fade-out');
                        }, 300);
                    }
                }
            })
            break;
        case 'open':
            open_background.currentTime = 0;
            closed_background.pause();
            open_background.play();
            opening_background.pause();

            if (!open_background.classList.contains('fade-in')){
                if (open_background.classList.contains('fade-out')){
                    setTimeout(() => {
                        open_background.classList.remove('fade-out');
                    }, 300);
                }
                setTimeout(() => {
                    open_background.classList.add('fade-in');
                }, 300);
            }
            else if (!opening_background.classList.contains('fade-out')){
                if (opening_background.classList.contains('fade-in')){
                    setTimeout(() => {
                        opening_background.classList.remove('fade-in');
                    }, 300)
                }
                setTimeout(() => {
                    opening_background.classList.add('fade-out');
                }, 300);
            }
            else if (closed_background.classList.contains('fade-in')){
                if (!closed_background.classList.contains('fade-out')){
                    closed_background.classList.add('fade-out');
                }
                setTimeout(() => {
                    closed_background.classList.remove('fade-in');
                }, 300)
            }
            break;
        default:
            break;
    }

    // if (_media) {
    //     var source = media.getElementsByTagName('source')[0];
    //     if (source.getAttribute('src') !== _media) {
    //         source.setAttribute('src', _media);
    //         media.load();
    //         media.play().catch(error => {
    //             console.error('Помилка відтворення відео:', error);
    //         });
    //     }
    //     media.addEventListener('playing', function runplay() {
    //         media.classList.remove('fade-out');
    //         media.classList.add('fade-in');
            
    //         setTimeout(() => {
    //             recreateElement();
    //             title.innerHTML = _title;
    //             button.textContent = _button;
    //             title.style.opacity = 1;
    //             content.style.opacity = 1;
    //             button.style.opacity = 1;
    //             overlay.style.backgroundColor = 'rgba(0, 0, 0, .5)';
    //             end ? 
    //             document.querySelector('.content-text').innerHTML = _content
    //             :
    //             typeText(document.querySelector('.content-text'), _content);
    //         }, duration);

    //         media.removeEventListener('playing', runplay);
    //     })
    // }
    // else{
    // }
    setTimeout(() => {
        recreateElement();
        title.innerHTML = _title;
        button.textContent = _button;
        title.style.opacity = 1;
        content.style.opacity = 1;
        button.style.opacity = 1;
        overlay.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        end? 
        document.querySelector('.content-text').innerHTML = _content
        :
        typeText(document.querySelector('.content-text'), _content);
    }, duration);

    // if (!loop){
    //     media.removeAttribute('loop');
    //     media.addEventListener('ended', () => {
    //         var source = media.getElementsByTagName('source')[0];
    //         source.setAttribute('src', 'content-background/open_card_background.mp4');
    //         media.load();
    //         media.play().catch(error => {
    //             console.error('Помилка відтворення відео:', error);
    //         });
    //         media.setAttribute('loop', true);
    //     })
    // }
    
    // setTimeout(() => {
    // }, 300)

    // setTimeout(() => {
    //     recreateElement();
    //     title.innerHTML = _title;
    //     button.textContent = _button;
    //     title.style.opacity = 1;
    //     content.style.opacity = 1;
    //     button.style.opacity = 1;
    //     overlay.style.backgroundColor = 'rgba(0, 0, 0, .5)';
    //     typeText(document.querySelector('.content-text'), _content);
    // }, duration);
}

// function ShowNewContentAfterLoad(_media, callback) {
//     overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
//     title.style.opacity = 0;
//     document.querySelector('.content-text').style.opacity = 0;
//     button.style.opacity = 0;
//     if (_media) {
//         setTimeout(() => {
//             var source = media.getElementsByTagName('source')[0];
//             source.setAttribute('src', _media);
//             media.load();
//             media.play().then(() => {}).catch(error => {
//                 console.error('Помилка відтворення відео:', error);
//             });
//             // overlay.style.backgroundColor = 'rgba(0, 0, 0, .5)';
//         }, 300);
//     }
//     if (callback){
//         media.addEventListener('ended', callback());
//         // media.onended = callback();
//     }
// }