import '../style.css'

const goBackToHomePageBtn = document.querySelector('.go-home-page')
//modal
const openExitModal = document.querySelector('.open-modal')
const exitModal = document.querySelector('.exit-modal')
const closeExitModal = document.querySelector('.close-exit-modal')
const exitAccountBtn = document.querySelector('.exit-account')

// menu items
const menuItems = document.querySelectorAll('.menu-items')

const onPageLoad = () => {
    themeHandler()
}

//? add active class to the clicked menu item
const activeClickedMenuItem = (event) => {
    const currentActiveItem = event.target.closest('.active')
    if(currentActiveItem) {
        console.log('nothing happend');
        
        return;
    }else{        
        menuItems.forEach(item => {
            if(item.classList.contains('active')){
                item.classList.remove('active')
            }
        })
        event.target.classList.add('active')
    }
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
document.addEventListener('keydown', hideModalWithEscapeKey)
document.addEventListener('DOMContentLoaded', onPageLoad)
openExitModal.addEventListener('click', showModal)
closeExitModal.addEventListener('click', hideModal)
goBackToHomePageBtn.addEventListener('click', goHomePage)
exitAccountBtn.addEventListener('click', exitAccount)
menuItems.forEach(item => {
    item.addEventListener('click', activeClickedMenuItem)
})