import '../style.css'

const goBackToHomePageBtn = document.querySelector('.go-home-page')
//modal
const openExitModal = document.querySelector('.open-modal')
const exitModal = document.querySelector('.exit-modal')
const closeExitModal = document.querySelector('.close-exit-modal')
const exitAccountBtn = document.querySelector('.exit-account')


const mainPage = document.querySelector('.main-profile-page')
const fallHistoryPage = document.querySelector('.fall-history-page')
const settingPage = document.querySelector('.setting-page')
// setting checkboxes
const darkModeCheckbox = document.querySelector('.dark-mode-checkbox')

// menu items
const menuItems = document.querySelectorAll('.menu-items')

const onPageLoad = () => {
    themeHandler()
    darkModeHandler()
}

//? add active class to the clicked menu item
const activeClickedMenuItem = (event) => {
    const currentActiveItem = event.target.closest('.active')
    if (currentActiveItem) {
        console.log('nothing happend');

        return;
    } else {
        const page = event.target.dataset.page;
        menuItems.forEach(item => {
            if (item.classList.contains('active')) {
                item.classList.remove('active')
            }
        })
        event.target.classList.add('active')
        showClickedMenuItemPage(page)
    }
}

const showClickedMenuItemPage = (page) => {
    switch (page) {
        case 'mainPage': {
            removeHiddenClassFromActivePage(mainPage, fallHistoryPage, settingPage)
            break;
        }
        case 'fallHistoryPage': {
            removeHiddenClassFromActivePage(fallHistoryPage, mainPage, settingPage)
            break;
        }
        case 'settingPage': {
            removeHiddenClassFromActivePage(settingPage, mainPage, fallHistoryPage)
        }
    }
}
const removeHiddenClassFromActivePage = (active, hide, secondhide) => {
    active.classList.remove('hidden')
    hide.classList.add('hidden')
    secondhide.classList.add('hidden')
}
//! modal
const showModal = () => {
    exitModal.classList.remove('hidden')
    exitModal.classList.add('flex')
}
const hideModal = () => {
    exitModal.classList.add('hidden')
    exitModal.classList.remove('flex')
}
const hideModalWithEscapeKey = (event) => {
    if (event.key === 'Escape') {
        exitModal.classList.add('hidden')
        exitModal.classList.remove('flex')
    }
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
    document.documentElement.classList.add('dark');
    saveThemeInLocalStorage('true')
}
const lightTheme = () => {
    document.documentElement.classList.remove('dark');
    saveThemeInLocalStorage('false')
}
const saveThemeInLocalStorage = (isDarkMode) => {
    localStorage.setItem('isDarkMode', isDarkMode)
}

//! go to home page
const goHomePage = () => {
    location.replace('/index.html')
}
//! exit account 
const exitAccount = () => {
    localStorage.removeItem('userData');
    goHomePage()
}

//! setting page checkbox 
const darkModeHandler = () => {
    const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'))
    if (isDarkMode) {
        darkModeCheckbox.checked = true
    }
}
const darkModeCheckboxHandler = () => {
    console.log('click');
    if (darkModeCheckbox.checked) {
        darkTheme()
    } else {
        lightTheme()
    }
}
darkModeCheckbox.addEventListener('click', darkModeCheckboxHandler)
document.addEventListener('keydown', hideModalWithEscapeKey)
document.addEventListener('DOMContentLoaded', onPageLoad)
openExitModal.addEventListener('click', showModal)
closeExitModal.addEventListener('click', hideModal)
goBackToHomePageBtn.addEventListener('click', goHomePage)
exitAccountBtn.addEventListener('click', exitAccount)
menuItems.forEach(item => {
    item.addEventListener('click', activeClickedMenuItem)
})