import '../style.css'

const darkBtn = document.querySelector('.dark-btn')
const lightBtn = document.querySelector('.light-btn')

const takeFallBtn = document.querySelector('.take-fall')

const pageLoader = document.querySelector('.page-loader')

const poetNumberText = document.querySelector('.fall-poet-number')
const poetText = document.querySelector('.fall-poet')
const poetSummeryText = document.querySelector('.fall-summery')

const fallPoetContent = document.querySelector('.fall-poet-content')
const fallSummaryContent = document.querySelector('.fall-summary-content')

const fallPoetContainer = document.querySelector('.fall-poet-container')
const fallSummaryContainer = document.querySelector('.fall-summary-container')

const loaderContainer = document.querySelector('.loader-container')
const errorElement = document.querySelector('.error-element')

let isDone = false;
const onPageLoad = () => {
    themeHandler();
}

const fetchFall = () => {
    showLoader();
    fetch('https://api.ganjoor.net/api/ganjoor/hafez/faal')
        .then(res => res.json())
        .then(data => {
            isDone = true;
            createFallHandler(data);
        })
        .catch(() => {
            isDone = false;
            errorHandler();
        })
        .finally(() => {
            hideLoader()
        })
}

const createFallHandler = (data) => {
    poetNumberText.innerHTML = '';
    poetText.innerHTML = '';
    poetSummeryText.innerHTML = '';
    poetNumberText.insertAdjacentHTML('beforeend', `${data.title} از دیوان حافظ`)
    poetText.insertAdjacentHTML('beforeend', data.htmlText)
    poetSummeryText.insertAdjacentHTML('beforeend', data.poemSummary)

}

const errorHandler = () => {
    console.log(isDone);
    fallSummaryContent.classList.add('hidden')
    fallSummaryContainer.classList.remove('hidden')
    errorElement.classList.remove('hidden')
    errorElement.classList.add('flex')
}

const showLoader = () => {
    fallSummaryContainer.classList.add('hidden')
    fallPoetContainer.classList.remove('hidden')

    fallPoetContent.classList.add('hidden')

    loaderContainer.classList.remove('hidden')
    loaderContainer.classList.add('h-60')
    loaderContainer.innerHTML = '<div class="loader w-4 rounded-full animate-loader aspect-square"></div>'
}
const hideLoader = () => {
    fallPoetContainer.classList.add('hidden')
    if (isDone) {
        fallSummaryContainer.classList.remove('hidden')
        fallPoetContainer.classList.remove('hidden')
        fallPoetContent.classList.remove('hidden')
        fallPoetContent.classList.add('flex')
    }
    loaderContainer.classList.remove('h-60')
    loaderContainer.classList.add('hidden')
}

//! theme Handler
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


const pageloading = () => {
    pageLoader.classList.remove('fixed')
    pageLoader.classList.add('hidden')
}

window.addEventListener('load', pageloading)
document.addEventListener('DOMContentLoaded', onPageLoad)
takeFallBtn.addEventListener('click', fetchFall)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme);