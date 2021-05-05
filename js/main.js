const localStorage = window.localStorage

if (localStorage.getItem('active') == null || localStorage.getItem('active') === 'true') {
    setTimeout('initSlides()', 5000)
}

let currentSlide = 0
const slideContents = [
    '<h2>Quote of the Day</h2>' +
    '<p>The biggest adventure you can take is to live the life of your dreams.</p>' +
    '<p class="author">- Oprah Winfrey</p>',
    '<h2>My favorite One</h2>' +
    '<p>Write it on your heart that every day is the best day in the year.</p>' +
    '<p class="author">- Ralph Waldo Emerson</p>',
    '<h2>No Idea</h2>' +
    '<p>I have no idea what to write here.</p>' +
    '<p class="author">- Me</p>',
    '<h2>Last Slide</h2>' +
    '<p>Hello! No matter who you are - I wish you good day!</p>' +
    '<p>Follow your dream!</p>'
]

const modalWindowElement = document.getElementById('modal-window')
const closeElement = document.getElementById('close')
const slideElement = document.getElementById('slide')
const disableTipsCheckBox = document.getElementById('disable-tips')
const leftArrowElement = document.getElementById('left-arrow')
const rightArrowElement = document.getElementById('right-arrow')
const dots = []

closeElement.onclick = function () {
    modalWindowElement.style.display = 'none'
}

disableTipsCheckBox.onclick = function () {
    (disableTipsCheckBox.checked) ? localStorage.setItem('active', 'false') : localStorage.setItem('active', 'true')
}

leftArrowElement.onclick = moveToLeftSlide
rightArrowElement.onclick = moveToRightSlide

function createDot() {
    let dotElement = document.createElement('i')
    dotElement.className = 'dot'
    dotElement.classList.add('fas', 'fa-circle')
    return dotElement
}

function moveToLeftSlide() {
    dots[currentSlide].classList.remove('selected')
    currentSlide = (currentSlide + slideContents.length - 1) % slideContents.length
    dots[currentSlide].classList.add('selected')
    slideElement.innerHTML = slideContents[currentSlide]
}

function moveToRightSlide() {
    dots[currentSlide].classList.remove('selected')
    currentSlide = (currentSlide + 1) % slideContents.length
    dots[currentSlide].classList.add('selected')
    slideElement.innerHTML = slideContents[currentSlide]
}

function initSlides() {
    let previousNode = leftArrowElement
    for (let i = 0; i < slideContents.length; i++) {
        const dot = createDot()
        dot.onclick = function () {
            if (currentSlide !== i) {
                dots[currentSlide].classList.remove('selected')
                currentSlide = i
                slideElement.innerHTML = slideContents[currentSlide]
                dot.classList.add('selected')
            }
        }
        previousNode.after(dot)
        previousNode = dot
        dots.push(dot)
    }
    dots[currentSlide].classList.add('selected')
    slideElement.innerHTML = slideContents[currentSlide]
    modalWindowElement.classList.toggle('visible')
}

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'ArrowLeft':
            moveToLeftSlide()
            break
        case 'ArrowRight':
            moveToRightSlide()
            break
        case 'Escape':
            modalWindowElement.classList.toggle('visible')
            break
    }
})