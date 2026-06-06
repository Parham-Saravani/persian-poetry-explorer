import '../style.css';

const darkBtn = document.querySelector('.dark-btn')
const lightBtn = document.querySelector('.light-btn')

const poetsContainer = document.querySelector('.poets-container')
const loadMorePoetsBtn = document.querySelector('.load-more-poets-btn')
const poetsContentContainer = document.querySelector('.container-loadmore--wrapper')
const loaderContainer = document.querySelector('.loader-container')

const sortBtn = document.querySelector('.sorte-btn')
const sortItems = document.querySelectorAll('.sort-by-century-items')
const sortContainer = document.querySelector('.sort-items')

console.log(sortItems);


const url = 'https://api.ganjoor.net';
let count = 1;
let totalpoets = [];

const onPageLoad = () => {
    themeHandler();
    fetchPoetsData()
}

//take poets lists
const fetchPoetsData = () => {
    showLoader()
    fetch('https://api.ganjoor.net/api/ganjoor/poets')
        .then(res => res.json())
        .then(data => {
            totalpoets = data;
            poetsElementHandler();
        })
        .catch(() => {
            
        })
        .finally(() => {
            hideLoader();
        })
}
const poetsElementHandler = () => {
    poetsContainer.innerHTML = '';
    totalpoets.slice(0, 23 * count).forEach(item => {
        poetsContainer.insertAdjacentHTML('beforeend',
            `
            <div class="relative gap-4 w-51 py-4 rounded-xl dark:bg-dark-card bg-light-card shadow-xl border-2 dark:border-dark-border border-light-border">
                <div class="h-full flex flex-col items-center gap-2">
                    <img class="size-26 rounded-full popular-poet-img cursor-pointer" src="${url}${item.imageUrl}" alt="" data-poet="${item.fullUrl}">
                    <p class="dark:text-dark-text text-light-text font-vazir text-card-header font-bold popular-poet-title cursor-pointer" data-poet="${item.fullUrl}">${item.name}</p>
                </div>
            </div>            
            `
        )
    })

}
const countHandler = () => {
    count++;
    poetsElementHandler()
    if (count >= 9) {
        loadMorePoetsBtn.classList.add('hidden')
        return;
    }
}

const showLoader = () => {
    poetsContentContainer.classList.add('hidden')
    loaderContainer.innerHTML = '<div class="loader w-4 rounded-full animate-loader aspect-square"></div>';

}
const hideLoader = () => {
    poetsContentContainer.classList.remove('hidden')
    loaderContainer.innerHTML = '';
    loaderContainer.classList.remove('h-160')
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


document.addEventListener('DOMContentLoaded', onPageLoad)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme)
loadMorePoetsBtn.addEventListener('click', countHandler)
sortContainer.addEventListener('click', function(){
    console.log('s');
    
})