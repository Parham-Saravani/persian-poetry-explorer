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

const popularPoetsContainer = document.querySelector('.popular-poets-container')
const popularPoetsLoader = document.querySelector('.popular-poets-loader')


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

new Swiper('.poets-slider', {
    modules: [Navigation],
    grabCursor: true,

    slidesPerView: 'auto',

    spaceBetween: 20,
    direction: 'horizontal',
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})


const onPageLoad = () => {
    randomPoemHandler();
    themeHandler();
    // fetchPopularPoets();
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
            randomPoemText.innerHTML = '<p class="font-vazir font-bold bg-red-600/20 py-6 px-16 text-red-600 rounded-2xl">مشکلی پیش آمده<br> لطفا مجدد تلاش نمایید </p>'
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

// //popular poets handlers
// const fetchPopularPoets = () => {
//     showLoader(popularPoetsLoader)
//     fetch(`https://api.ganjoor.net/api/ganjoor/poets`)
//         .then(res => res.json())
//         .then(data => {
//             const slicesdata = data.slice(20, 35)
//             createPopularPoetsElemets(slicesdata);
//         })
//         .catch()
//         .finally(() => {
//             hideLoader(popularPoetsLoader);
//         })
// }
// const createPopularPoetsElemets = (data) => {
//     popularPoetsContainer.innerHTML = '';
//     data.forEach(item => {
//         popularPoetsContainer.insertAdjacentHTML('beforeend',
//             `
//             <div class="swiper-slide relative gap-4 w-45! rounded-xl dark:bg-dark-card bg-light-card shadow-xl border-2 dark:border-dark-border border-light-border">
//                 <div class="h-full flex flex-col items-center gap-2">
//                         <img class="size-26 rounded-full popular-poet-img cursor-pointer" src="${url}${item.imageUrl}" alt="" data-poet="${item.fullUrl}">
//                         <p class="dark:text-dark-text text-light-text font-vazir text-card-header font-bold popular-poet-title cursor-pointer" data-poet="${item.fullUrl}">${item.name}</p>
//                 </div>
//             </div>
//             `
//         )
//     })
// }

// const navigateToPoetPage = (event) => {
//     const target = event.target.closest('[data-poet]')
//     if (target) {
//         location.assign(`/poet.html?name=${target.dataset.poet.slice(1)}`)
//     }
// }

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
randomPoemGenerator.addEventListener('click', randomPoemHandler)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme);
popularPoetsContainer.addEventListener('click', navigateToPoetPage)