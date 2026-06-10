import { act } from 'react'
import '../style.css'


const authStatusContainer = document.querySelector('.auth-status-container')
const authCurrentPage = document.querySelectorAll('.auth-current-content')
const loginPage = document.querySelector('.login-content')
const signupPage = document.querySelector('.signup-content')
const forgetPasswordPage = document.querySelector('.forget-password-page')

const backToLoginPageBtn = document.querySelector('.back-to-login-page-btn')

const dontHaveAccountBtn = document.querySelector('.move-to-signup')
const haveAccountBtn = document.querySelector('.move-to-login')
const forgetPasswordBtn = document.querySelector('.forget-password-btn')

const showPassword = document.querySelectorAll('.show-password')

const pageLoader = document.querySelector('.page-loader')

let isPasswordShowing = false

const onPageLoad = () => {
    themeHandler();
}


//? auth current active page 
const currentActivePage = (event) => {
    const currentItem = event.target.closest('.auth-active')
    if (currentItem) {
        return
    } else {
        addActiveClassToClickedPage()
        const activePage = document.querySelector('.auth-active')
        activePage.classList.remove('auth-active');
        event.target.classList.add('auth-active')
        const page = event.target.dataset.page;
        moveToAuthPages(page);
    }
}
const addActiveClassToClickedPage = () => {



}

//move to signup page
const dontHaveAccoutHandler = () => {
    noAccountHaveAccountShortFunction('[data-page="login"]', '[data-page="signup"]', 'auth-active', moveToAuthPages, 'signup')
}
//move to login page
const haveAccoutHandler = () => {
    noAccountHaveAccountShortFunction('[data-page="signup"]', '[data-page="login"]', 'auth-active', moveToAuthPages, 'login')
}
const noAccountHaveAccountShortFunction = (active, clicked, classname, callback, parametr) => {
    const currentActiveItem = document.querySelector(active)
    const clickedItem = document.querySelector(clicked)
    currentActiveItem.classList.remove(classname);
    clickedItem.classList.add(classname)
    moveToAuthPages(parametr)
}

//move to forget password page
const moveToForgetPasswordPage = () => {
    console.log('sssss');
    moveToAuthPages('forget-pass')
}
//move back to login page
const moveBackToLoginPageHandler = () => {
    moveToAuthPages('move-back-to-login-page');
    authStatusContainer.classList.remove('hidden')
}


const moveToAuthPages = (status) => {
    switch (status) {
        case 'login': {
            document.title = 'ورود به حساب کاربری'
            authActivePageClassHandler(signupPage, loginPage)
            break;
        }
        case 'signup': {
            document.title = 'ثبت نام در آوین'
            authActivePageClassHandler(loginPage, signupPage)
            break;
        };
        case 'forget-pass': {
            authActivePageClassHandler(loginPage, forgetPasswordPage);
            authStatusContainer.classList.add('hidden')
            break;
        }
        case 'move-back-to-login-page': {
            authActivePageClassHandler(forgetPasswordPage, loginPage)
            break;
        }
    }
}
const authActivePageClassHandler = (active, notactive) => {
    notactive.classList.remove('hidden')
    notactive.classList.remove('opacity-0')
    notactive.classList.add('animate-authpage')

    active.classList.add('opacity-0')
    active.classList.add('hidden')
    active.classList.remove('animate-authpage')
}

//? show password 
const showPasswordHandler = (event) => {
    const type = event.target.parentElement.previousElementSibling.type;
    if (type === 'password') {
        event.target.className = '';
        event.target.className = 'fa-solid fa-eye-slash';
        event.target.parentElement.previousElementSibling.setAttribute('type', 'text')
    } else {
        event.target.className = '';
        event.target.className = 'fa-solid fa-eye';
        event.target.parentElement.previousElementSibling.setAttribute('type', 'password')
    }
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
    document.documentElement.classList.add('dark');
}
const lightTheme = () => {
    document.documentElement.classList.remove('dark');
}

//! page loader
const pageloading = () => {
    pageLoader.classList.remove('fixed')
    pageLoader.classList.add('hidden')
}

window.addEventListener('load', pageloading)
document.addEventListener('DOMContentLoaded', onPageLoad)
forgetPasswordBtn.addEventListener('click', moveToForgetPasswordPage)
backToLoginPageBtn.addEventListener('click', moveBackToLoginPageHandler)

authCurrentPage.forEach(btn => {
    btn.addEventListener('click', currentActivePage)
})
dontHaveAccountBtn.addEventListener('click', dontHaveAccoutHandler)
haveAccountBtn.addEventListener('click', haveAccoutHandler)

showPassword.forEach(element => {
    element.addEventListener('click', showPasswordHandler)
})
