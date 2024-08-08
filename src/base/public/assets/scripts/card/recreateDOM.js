function recreateElement() {
    if (document.querySelector('.content-text')) {
        document.querySelector('.content-text').parentNode.removeChild(document.querySelector('.content-text'));
    
        const newContent = document.createElement('div');
        newContent.className = 'content-text';
    
        conteiner.insertBefore(newContent, button);
    }
}