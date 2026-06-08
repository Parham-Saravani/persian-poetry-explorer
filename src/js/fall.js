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
            console.log(data);

            createFallHandler(data);
            isDone = true;
        })
        .catch((error) => {
            console.log(error);

            isDone = false
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
    console.log(poetText);

    const poets = document.querySelectorAll('.b')
    poets.forEach(poet => {
        const firstChildText = poet.firstElementChild.firstElementChild.textContent.trim();
        const secondChildText = poet.lastElementChild.firstElementChild.textContent.trim();
       

        poet.innerHTML = '';
        const container = document.createElement('div')
        container.className = 'relative flex justify-center';

        container.insertAdjacentHTML('beforeend', `<span class="right-poet">${firstChildText}</span> <span class="divider">*</span> <span class="left-poet">${secondChildText}</span>`)

        const divider = container.querySelector('.divider')
        divider.className += 'absolute font-bold text-xl dark:text-dark-primary text-light-primary font-vazir';

        const rightPoet = container.querySelector('.right-poet')
        rightPoet.className += 'block w-80 absolute -right-90 font-vazir max-xl:-right-76 max-xl:w-70 max-xl:text-[13px] max-lg:text-[15px] max-md:text-[12px] max-md:w-56 max-md:-right-70 max-sm:text-[10px] max-sm:-right-45 max-sm:w-43'

        const leftPoet = container.querySelector('.left-poet')
        leftPoet.className += 'block w-80 absolute -left-110 font-vazir max-xl:-left-86 max-xl:w-70 max-xl:text-[13px] max-lg:text-[15px] max-md:text-[12px] max-md:w-56 max-md:-left-75 max-sm:text-[10px] max-sm:-left-46 max-sm:w-43';

        poet.append(container)
    })
}

const errorHandler = () => {
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