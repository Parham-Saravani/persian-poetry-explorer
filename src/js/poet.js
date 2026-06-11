import '../style.css'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css';

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 'auto',
    grabCursor: true,
    spaceBetween: 20,
    Pagination: {
        el: '.swiper-pagination'
    }
})


const darkBtn = document.querySelector('.dark-btn')
const lightBtn = document.querySelector('.light-btn')

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

const worksTotalContainer = document.querySelector('.works-total-container')
const poetWorksContainer = document.querySelector('.works-container')
const poemsContainer = document.querySelector('.poems-container')

//header auth btns
const profileBtn = document.querySelector('.go-to-profile-btn')
const authBtn = document.querySelector('.auth-btn')

const url = 'https://api.ganjoor.net';
let isAllAboutTextActive = false;

const onPageLoad = () => {
    isPoetIdAvailable()
    themeHandler()
    validateUserLoggedIn();
}

const isPoetIdAvailable = () => {
    const urlParametrs = new URLSearchParams(location.search);
    const isAvailable = urlParametrs.has('poetId');
    if (isAvailable) {
        fetchPoetData();
        return;
    }
    poetNotFoundElement.classList.remove('hidden')
    poetNotFoundElement.classList.add('flex')
    skeletonLoader.classList.add('hidden')
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

//! create poet elements
const createPoetElements = (data) => {
    console.log(data);

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


    poemWorksValidator(data.cat.children, poetWorksContainer)
    poemValidator(data.cat.poems, poemsContainer)
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

const poemValidator = (data, element) => {
    if (!data.length) {
        element.insertAdjacentHTML('beforeend',
            `
            <p class="flex justify-center text-[14px] text-center font-vazir font-bold bg-red-600/20 py-3 px-16 text-red-600 rounded-xl">برای این شاعر شعری یافت نشد</p>
            `
        )
    } else {
        data.forEach((poem) => {
            element.insertAdjacentHTML('beforeend',
                `
            <div class="w-full flex justify-between items-center py-3 px-5 rounded-xl dark:bg-dark-surface bg-light-surface transition-normal duration-300">
                <div class="max-sm:gap-5 flex items-center gap-10">
                    <i class="fa-solid fa-book-open dark:text-dark-primary text-light-primary"></i>
                    <a>
                        <h1 class="max-sm:text-xs font-vazir font-bold text-[16px] dark:text-dark-text text-light-text transition-normal duration-300 hover:scale-105 cursor-pointer">${poem.title}</h1>
                    </a>
                </div>
                <a href="" class="max-sm:text-xs py-1 px-1.5 text-[15px] rounded-full dark:text-dark-text text-light-text dark:bg-dark-card transition-normal duration-300 hover:scale-105">
                     <i
                    class="fa-solid fa-chevron-left flex items-center justify-center"></i>
                </a>
            </div>
            `
            )
        })

    }
}
const poemWorksValidator = (data, element) => {
    if (!data.length) {
        element.parentElement.remove();
        worksTotalContainer.insertAdjacentHTML('beforeend',
            `
            <p class="mt-3 flex justify-center text-[14px] text-center font-vazir font-bold bg-red-600/20 py-3 px-16 text-red-600 rounded-xl">برای این شاعر اثری یافت نشد</p>
            `
        )
    } else {
        data.forEach((work) => {
            element.insertAdjacentHTML('beforeend',
                `
            <a class="swiper-slide relative flex flex-col dark:bg-dark-surface bg-light-surface rounded-xl py-5 px-10 h-25! w-50! max-sm:w-45! max-sm:h-20! cursor-pointer transition-normal duration-300">
                <i class="fa-solid fa-book-open absolute left-4 top-5.5 max-sm:top-5 text-5xl max-sm:text-4xl dark:text-dark-primary text-light-primary"></i>
                <h1 class="absolute right-0 top-9 font-vazir text-[18px] max-sm:text-[17px] max-sm:right-0 max-sm:top-6 w-30 leading-6 text-center font-normal dark:text-dark-text text-light-text death-year">${work.title}</h1>
            </a>
            `
            )
        })
    }

}

//! Theme handlers
const themeHandler = () => {
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

const validateUserLoggedIn = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData) {
        authBtn.classList.add('hidden')
        profileBtn.classList.remove('hidden')
        profileBtn.classList.add('flex')
    } else {
        authBtn.classList.remove('hidden')
        profileBtn.classList.add('hidden')
        profileBtn.classList.remove('flex')

    }
}

document.addEventListener('DOMContentLoaded', onPageLoad)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme)
showAllAboutBtn.addEventListener('click', showOtherAboutText)