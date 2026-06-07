import '../style.css';

const darkBtn = document.querySelector('.dark-btn')
const lightBtn = document.querySelector('.light-btn')

const poetsContainer = document.querySelector('.poets-container')
const loadMorePoetsBtn = document.querySelector('.load-more-poets-btn')
const poetsContentContainer = document.querySelector('.container-loadmore--wrapper')
const loaderContainer = document.querySelector('.loader-container')

const sortBtn = document.querySelector('.sorte-btn')
const sortItems = document.querySelectorAll('.sort-by-century-items')
const sortContainer = document.querySelector('.sort-container')

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
            <div class="relative gap-4 w-51 max-sm:w-55 max-md:w-50 max-lg:w-44 max-xl:w-38.5 max-2xl:w-36 py-4 rounded-xl dark:bg-dark-card bg-light-card shadow-xl border-2 dark:border-dark-border border-light-border">
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
    loaderContainer.classList.add('h-160')
}
const hideLoader = () => {
    poetsContentContainer.classList.remove('hidden')
    loaderContainer.innerHTML = '';
    loaderContainer.classList.remove('h-160')
}

//sort poets 
const sortPoetsHandler = (event) => {
    const totalPoetsItem = event.target.closest('.total-poets')
    const items = event.target.closest('.sort-by-century-items')
    loadMorePoetsBtn.classList.add('hidden')
    if (items) {
        const currentActiveItem = document.querySelector('.sort-by-century-items.active')
        if (event.target === currentActiveItem) return;
        if (currentActiveItem) {
            currentActiveItem.classList.remove('active');
            event.target.classList.add('active')
            fetchSortData(event.target.dataset.century);
            sortContainer.classList.add('hidden');
            sortBtn.textContent = event.target.textContent;
        }
        if (totalPoetsItem) {
            count = 1;
            fetchPoetsData();
            poetsElementHandler();
            loadMorePoetsBtn.classList.remove('hidden')
            return;
        }
    }
}

const fetchSortData = (century) => {
    showLoader();
    fetch('https://api.ganjoor.net/api/ganjoor/centuries')
        .then(res => res.json())
        .then(data => {
            console.log(century);
            const clickedCentury = data.find(item => item.name === century);
            totalpoets = clickedCentury.poets;
            poetsElementHandler();

        })
        .catch(() => { console.log('There is a problem') })
        .finally(() => {
            hideLoader();
        })
}

const sortContainerOpener = () => {
    sortContainer.classList.remove('hidden')
}
const sortCloseHandler = (event) => {
    const sortOpen = event.target.closest('.sorte-btn')
    const items = event.target.closest('.sort-by-century-items')
    const container = event.target.closest('.sort-container')
    if (items || container) return
    if (sortOpen) {
        sortContainerOpener();
        return;
    }
    sortContainer.classList.add('hidden')
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

document.addEventListener('click', sortCloseHandler)

document.addEventListener('DOMContentLoaded', onPageLoad)
darkBtn.addEventListener('click', darkTheme)
lightBtn.addEventListener('click', lightTheme)
loadMorePoetsBtn.addEventListener('click', countHandler)
sortContainer.addEventListener('click', sortPoetsHandler)
sortBtn.addEventListener('click', sortContainerOpener)