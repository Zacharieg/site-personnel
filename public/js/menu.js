cardData = {}
cards = document.querySelectorAll('.card')

cards.forEach(c => {
    createNewItem(c)
});

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;

    adaptScroll(scroll)
});

document.querySelector('.action-expand').addEventListener('click', () => {
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

document.querySelector(".contact").addEventListener("click", () => {
    document.querySelector(".popin-contact-back").setAttribute("style", "display:block")
    setTimeout(() => {
        document.querySelector(".popin-contact-back").classList.add("show")
    }, 20);
})

document.querySelector(".popin-contact .croix").addEventListener("click", () => {
    document.querySelector(".popin-contact-back").classList.remove("show")
    document.querySelector(".popin-contact-back").setAttribute("style", "display:none")
})

document.querySelectorAll(".info").forEach(elem => {
    let text = elem.querySelector('p').innerHTML.replaceAll(' ', '')

    elem.addEventListener("click", () => {
        document.execCommand('copy')
        elem.querySelector('span').setAttribute('style', 'opacity:1')
        setTimeout(() => {
            elem.querySelector('span').setAttribute('style', '')
        }, 2000);
    })

    elem.addEventListener("copy", (event) => {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", text);
            elem.querySelector('span').setAttribute('style', 'opacity:1')
            setTimeout(() => {
                elem.querySelector('span').setAttribute('style', '')
            }, 2000);
        }
    })
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

function randomForms() {
    let nb = 7
    let width = 250
    let dist = 230
    let src = ["triangle", "rond", "carré", "trait"]

    for (let i = 0;i<nb; i++) {
        
        let randChange = Math.random() * Math.PI / (nb)
        let val = i * ((Math.PI * 2)/nb) - Math.PI + randChange
        let randDist = dist + (Math.random()-0.5) * dist/2
        let left = Math.cos(val) * ((randDist + width)/2) + width/2
        let top = Math.sin(val) * ((randDist + width) / 2) + width/2
        let randImage = src[Math.floor(Math.random() * src.length)]
        let randRotate = Math.floor(Math.random() * 180)

        let img = document.createElement("img")
        img.classList.add("forme")
        img.setAttribute("src", "../ressources/" + randImage + ".svg")
        img.setAttribute("style", "top:" + top +"px; left:" + left + "px; transform: rotate(" + randRotate + "deg)")

        document.querySelector('#photo').appendChild(img)
    }
}

//Initialisation

adaptScroll(window.scrollY)
randomForms()