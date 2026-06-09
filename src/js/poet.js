import '../style.css'


const darkBtn = document.querySelector('.dark-btn')
const lightBtn = document.querySelector('.light-btn')

const pageLoader = document.querySelector('.page-loader')

//! poet detail

const skeletonLoader = document.querySelector('.skeleton-loader')

const poetImage = document.querySelector('.poet-image')
const poetName = document.querySelector('.poet-name')
const poetShortName = document.querySelector('.short-name')

const birthPlace = document.querySelectorAll('.birth-place')
const deathYear = document.querySelector('.death-year')
const deathPlace = document.querySelector('.death-place')
const birthYear = document.querySelector('.birth-year')

const aboutContainer = document.querySelector('.about-container')
const aboutTitle = document.querySelector('.about-title')
const aboutText = document.querySelector('.about-text')

const showAllAboutBtn = document.querySelector('.show-all-about-text-btn')

const poetNotFoundElement = document.querySelector('.not-found-poet-element');
const poetDetailsContainer = document.querySelector('.poet-Detail')

const url = 'https://api.ganjoor.net';
let isAllAboutTextActive = false;

const onPageLoad = () => {
    isPoetIdAvailable()
    themeHandler()
}

const isPoetIdAvailable = () => {
    const urlParametrs = new URLSearchParams(location.search);
    const isAvailable = urlParametrs.has('poetId');
    if (isAvailable) {
        fetchPoetData();
        return;
    }
    navigator.clipboard.writeText()
    poetNotFoundElement.classList.remove('hidden')
    poetNotFoundElement.classList.add('flex')

}

const fetchPoetData = () => {
    const poetId = takePoetId();
    fetch(`https://api.ganjoor.net/api/ganjoor/poet/${poetId}?catPoems=true`)
        .then(res => res.json())
        .then(data => {
            document.title = `گنجینه شعر فارسی | ${data.cat.title}`
            console.log(data)
            createPoetElements(data)
        })
        .catch(() => {

        })
        .finally(() => {
            skeletonLoader.classList.add('hidden');
            poetDetailsContainer.classList.remove('hidden')
        })
}
const takePoetId = () => {
    const searchParametrs = new URLSearchParams(location.search)
    const poetId = searchParametrs.get('poetId')
    return poetId
}

const centuries = {
    "2": 'قرن سوم',
    "3": 'قرن چهارم',
    "4": 'قرن پنجم',
    "5": 'قرن ششم',
    "6": 'قرن هفتم',
    "7": 'قرن هشتم',
    "8": 'قرن نهم',
    "9": 'قرن دهم',
    "10": 'قرن یازدهم',
    "11": 'قرن دوازدهم',
    "12": 'قرن سیزدهم',
    "13": 'قرن چهاردهم',
}
const centuryFormatter = (num) => {
    console.log(num.split(' '));

    return centuries.num;
}

//! create poet elements
const createPoetElements = (data) => {    
    poetImage.setAttribute('src', `${url}${data.poet.imageUrl}`);
    poetName.textContent = data.poet.name;
    birthPlace.forEach(element => {
        if (data.poet.birthPlace) {
            element.textContent = data.poet.birthPlace;
        } else {
            element.textContent = '__';
        }
    })

    validatePlacesAndYears(deathYear, data.poet.deathYearInLHijri, true)
    validatePlacesAndYears(deathPlace, data.poet.deathPlace, false)
    validatePlacesAndYears(birthYear, data.poet.birthYearInLHijri, true)

    aboutTitle.textContent = `درباره ${data.poet.name}`;
    aboutText.insertAdjacentHTML('beforeend', data.cat.descriptionHtml)
    const isOk = aboutText.scrollHeight > aboutText.offsetHeight;
    console.log(isOk);

}

const validatePlacesAndYears = (element, data, isYear) => {
    if (isYear) {
        if (data) {
            element.textContent = `${data} هجری`;
        } else {
            element.textContent = '__';
        }
    } else {
        if (data) {
            element.textContent = data;
        } else {
            element.textContent = '__';
        }
    }
}

const pageloading = () => {
    pageLoader.classList.remove('fixed')
    pageLoader.classList.add('hidden')
}

//! Theme handlers
const themeHandler = (isDarkMode) => {
    const status = JSON.parse(localStorage.getItem('isDarkMode'));
    if (!status) {
        lightTheme();
    } else {
        darkTheme();
    }
}
const darkTheme = () => {
    lightBtn.classList.remove('hidden')
    lightBtn.classList.add('flex')

    darkBtn.classList.add('hidden')
    darkBtn.classList.remove('flex')
    document.documentElement.classList.add('dark');
    saveThemeInLocalStorage('true')

}
const lightTheme = () => {
    darkBtn.classList.remove('hidden')
    darkBtn.classList.add('flex')
    lightBtn.classList.add('hidden')
    document.documentElement.classList.remove('dark');
    saveThemeInLocalStorage('false')
}
const saveThemeInLocalStorage = (isDarkMode) => {
    localStorage.setItem('isDarkMode', isDarkMode)
}


const showOtherAboutText = (event) => {
    if (!isAllAboutTextActive) {
        isAllAboutTextActive = true;
        event.target.textContent = 'نمایش کمتر';
        aboutContainer.classList.remove('h-60!')
        aboutContainer.style.height = `${aboutContainer.offsetHeight}px`
        aboutText.classList.remove('line-clamp-3')
        requestAnimationFrame(() => {
            aboutContainer.style.height = `${aboutContainer.scrollHeight}px`;
        })
        return;
    }
    console.log(aboutContainer.scrollHeight);
    isAllAboutTextActive = false;
    event.target.textContent = 'نمایش بیشتر';
    aboutContainer.style.height = `${aboutContainer.offsetHeight}px`
    aboutText.classList.add('line-clamp-3')
    aboutContainer.classList.add('h-60!')
    requestAnimationFrame(() => {
        aboutContainer.classList.add('h-60!')
    })
}

window.addEventListener('load', pageloading)
document.addEventListener('DOMContentLoaded', onPageLoad)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme)
showAllAboutBtn.addEventListener('click', showOtherAboutText)