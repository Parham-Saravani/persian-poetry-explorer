import '../style.css'
import Swiper from 'swiper'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const darkBtn = document.querySelector('.dark-btn')
const lightBtn = document.querySelector('.light-btn')

const pageLoader = document.querySelector('.page-loader')

const randomPoemText = document.querySelector('.random-poem-text')
const randomPoemPoet = document.querySelector('.random-poem-poet')
const randomPoemGenerator = document.querySelector('.random-porm-btn')
const randomPoemContainer = document.querySelector('.loader-container')
const randomPoemTextContainer = document.querySelector('.random-poem-text-container')

//header auth btns
const profileBtn = document.querySelector('.go-to-profile-btn')
const authBtn = document.querySelector('.auth-btn')

const url = 'https://api.ganjoor.net';

new Swiper('.hero-slider', {
    modules: [Pagination, Autoplay],
    grabCursor: true,
    direction: 'horizontal',
    loop: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
})

const onPageLoad = () => {
    randomPoemHandler();
    themeHandler();
    validateUserLoggedIn();
}

// random poem handlers
const randomPoemHandler = () => {
    showLoader(randomPoemContainer, randomPoemTextContainer)
    fetch('https://api.ganjoor.net/api/ganjoor/poem/random')
        .then((res) => res.json())
        .then(data => {
            randomPoemTextHandler(data)
        })
        .catch(() => {
            randomPoemPoet.innerHTML = '';
            randomPoemText.innerHTML = '';
            randomPoemText.innerHTML = '<p class="font-vazir text-[14px] font-bold bg-red-600/20 py-6 px-16 text-red-600 rounded-2xl">مشکلی پیش آمده<br> لطفا مجدد تلاش نمایید </p>'
        })
        .finally(() => {
            hideLoader(randomPoemContainer, randomPoemTextContainer);
        })



    const randomPoemTextHandler = (data) => {
        randomPoemText.innerHTML = '';
        const alig = data.plainText.split('\r').slice(0, 4)
        alig.forEach((text) => {
            randomPoemText.insertAdjacentHTML('beforeend',
                `
                <p class="max-sm:text-[13px]">${text}<p>
                `
            )
        })

        const item = data.fullTitle.split('»')
        randomPoemPoet.textContent = `${item[0]} - ${item[1]}`
    }
}
const showLoader = (container, textContainer) => {
    if (textContainer) {
        textContainer.classList.add('hidden')
    }
    container.classList.remove('hidden')
    container.innerHTML = '<div class="loader w-4 rounded-full animate-loader aspect-square"></div>';
}
const hideLoader = (container, textContainer) => {
    if (textContainer) {
        textContainer.classList.remove('hidden')
    }
    container.classList.add('hidden')
}

//! theme Handler
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


const pageloading = () => {
    pageLoader.classList.remove('fixed')
    pageLoader.classList.add('hidden')
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

window.addEventListener('load', pageloading)
document.addEventListener('DOMContentLoaded', onPageLoad)
randomPoemGenerator.addEventListener('click', randomPoemHandler)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme);