cardData = {}
cards = document.querySelectorAll('.card')

cards.forEach(c => {
    createNewItem(c)
});

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;

    adaptScroll(scroll)
});

document.querySelector('.expand-menu').addEventListener('click', () => {
    let menu = document.querySelector('.menu')
    let expandButtonImage = document.querySelector('.expand-menu img')
    if (menu.classList.contains("expanded")) {
        expandButtonImage.setAttribute('src', '../ressources/menu.png')
        menu.classList.remove("expanded")
    } else {
        expandButtonImage.setAttribute('src', '../ressources/cross.png')
        menu.classList.add("expanded")
    }
})

function adaptScroll(scroll) {

    document.querySelector(".top-bar").style.opacity = Math.max(0, scroll - 400) / 100

    if (scroll < 150) {
        clearSelectionItem()
    } else {
        card = getCardMoreSeen()
        if (card != null) {
            cardId = card.getAttribute('id')
            selectItem(cardId)
            setTopBar(cardId)
        } else {
            clearSelectionItem()
            setTopBar("")
        }
    }
}

function selectItem(cardId) {
    let item = cardData[cardId].item
    clearSelectionItem()
    item.classList.add("checked")
}

function setTopBar(cardId) {
    if (cardId != "") {
        document.querySelector(".top-bar p").innerHTML = cardData[cardId].name
    } else {
        document.querySelector(".top-bar p").innerHTML = ""
    }
}

function clearSelectionItem() {
    document.querySelectorAll(".menu-card-item").forEach(i => { i.classList.remove("checked") })
}

function createNewItem(card) {
    let name = card.getAttribute('data-title')

    let id = card.getAttribute('id')

    let item = document.querySelector(".template-menu-card-item").cloneNode(true)

    item.classList.remove("template-menu-card-item")
    item.classList.add("menu-card-item")
    item.querySelector(".menu-card-title").innerHTML = name
    document.querySelector(".menu-card-list").appendChild(item)

    item.querySelector(".menu-card-link").addEventListener('click', () => {
        selectItem(id)
    })

    cardData[id] = {
        name: name,
        item: item
    }

    item.addEventListener('click', () => {
        window.scrollTo({
            top: card.offsetTop - 100,
            behavior: 'smooth',
        })
    })

    return id
}

function getCardMoreSeen() {
    let cards = document.querySelectorAll(".card")

    let cardMoreSeen = null
    let maxSurf = 0 
    cards.forEach(c => {
        
        let surface = getSurfaceOnScreen(c)

        if (surface > maxSurf) {
            cardMoreSeen = c
            maxSurf = surface
        }
    })

    return cardMoreSeen
}

function getSurfaceOnScreen(elem) {
    let viewportHeight = window.innerHeight;
    let scrollTop = window.scrollY;

    let elementOffsetTop = elem.offsetTop;
    let elementHeight = elem.offsetHeight;

    let surface = elementHeight
        - Math.max(0, scrollTop - elementOffsetTop)
        - Math.max(0, (elementOffsetTop + elementHeight) - (scrollTop + viewportHeight)) 

    return surface
}


document.querySelectorAll('.card-3D').forEach(c => {
    c.addEventListener('mousemove', (e) => {
        mousePos = getMousePosOnElemCentered(c, e.pageX, e.pageY)
        let maxRotate = 10

        let ax = -mousePos.x * maxRotate
        let ay = mousePos.y * maxRotate
        
        c.setAttribute("style", "transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg) translateZ(-1px);-webkit-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg) translateZ(-1px);-moz-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg) translateZ(-1px)");
    })
})

function getMousePosOnElemCentered(elem, pageX, pageY) {

    let globalPos = getGlobal(elem)

    return {
        x: (pageX - globalPos.left - elem.offsetWidth/2)/elem.offsetWidth,
        y: (pageY - globalPos.top - elem.offsetHeight/2)/elem.offsetHeight
    }
}

function getGlobal(elem) {
    var top = 0
    var left = 0
    do {
        top += elem.offsetTop
        left += elem.offsetLeft
        elem = elem.offsetParent;
    } while (elem)
    return {
        top : top,
        left : left
    }
}

//Initialisation

adaptScroll(window.scrollY)