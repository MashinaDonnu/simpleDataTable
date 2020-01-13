
function createChips(color = '#000', time = 3000, message = 'some message') {

    let chips = document.createElement('div');
    chips.classList.add('chips-item');
    chips.style.background = color;
    chips.innerHTML = message;
    createChipsWrapp(chips);
    setTimeout(function () {
        chips.remove();
        let chipsAll = document.querySelectorAll('.chips-wrapp .chips-item')
        if (chipsAll.length == 0) {
            document.querySelector('.chips-wrapp').remove();
        }
    }, time);
}

function createChipsWrapp(chips) {
    let chipsWrapp = document.querySelector('.chips-wrapp');
    if (!chipsWrapp) {
        chipsWrapp = document.createElement('div');
    }
    chipsWrapp.classList.add('chips-wrapp');
    chipsWrapp.appendChild(chips);
    document.querySelector('body').appendChild(chipsWrapp);
}