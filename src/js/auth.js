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

// toast
const toast = document.querySelector('.toast')
const toastIcon = document.querySelector('.toast-icon')
const toastTitle = document.querySelector('.toast-title')
const toastStatus = document.querySelector('.toast-status')
const toastMessage = document.querySelector('.toast-message')

//! signup elements 
const signupUsernam = document.querySelector('.signup-username-input')
const signupEmail = document.querySelector('.signup-email-input')
const signupPassword = document.querySelector('.signup-password-input')
const signupConfirmPassword = document.querySelector('.signup-confirm-password-input')
//signup alerts
const signupUsernameAlert = document.querySelector('.signup-username-alert')
const signupEmailAlert = document.querySelector('.signup-email-alert')
const signupPasswordAlert = document.querySelector('.signup-password-alert')
const signupPasswordNotTheSameAlert = document.querySelector('.signup-confirm-password-alert')
//signup btn
const signupBtn = document.querySelector('.signup-btn')
//! login elements
const loginEmail = document.querySelector('.login-email')
const loginPassword = document.querySelector('.login-password')
const loginBtn = document.querySelector('.login-btn')
//login alerts
const loginEmailAlert = document.querySelector('.login-email-alert')
const loginPasswordAlert = document.querySelector('.login-password-alert')



const onPageLoad = () => {
    themeHandler();
}


// sign up login
const signupFormValidator = (event) => {
    event.preventDefault()
    const username = signupUsernam.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();
    const confirmPassword = signupConfirmPassword.value.trim();


    const isUserNameValid = userNameValidator(username);

    const isEmailValid = emailValidator(email, signupEmailAlert)
    const isPasswordValid = passwordValidator(password, signupPasswordAlert)

    const isConfirmPasswordSame = confirmPasswordValidator(confirmPassword, password);

    let isValid = isUserNameValid && isEmailValid && isPasswordValid && isConfirmPasswordSame;
    console.log(isValid);

    if (isValid) {
        showloadingAnimation(signupBtn);
        signupAndLoginMockOperation()
            .then(() => {
                showToast('success');
                changeToastMessage('ثبت نام شما با موفقیت انجام شد');
                saveAuthDataInLocalstorage(username , email , password)
                moveToProfilePage()
            })
            .catch(() => {
                showToast('failed');
                changeToastMessage('ثبت نام شما انجام نشد');
            })
            .finally(() => {
                hideLoadingAnimation(signupBtn)
            })
    }

}


// mock login operation
const loginFormValidator = (event) => {
    event.preventDefault();
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    let isValid = true;

    const isEmailValid = emailValidator(email, loginEmailAlert)
    const isPasswordValid = passwordValidator(password, loginPasswordAlert)

    isValid = isPasswordValid && isEmailValid;

    if (isValid) {
        showloadingAnimation(loginBtn);
        signupAndLoginMockOperation()
            .then(() => {
                showToast('success');
                changeToastMessage('ورود به حساب کاربری با موفقیت انجام شد');
                saveAuthDataInLocalstorage(null , email , password)
                moveToProfilePage()
            })
            .catch(() => {
                showToast('failed');
                changeToastMessage('ورود به حساب کاربری انجام نشد');
            })
            .finally(() => {
                hideLoadingAnimation(loginBtn)
            })

    }
}

//! mock signup operation
const signupAndLoginMockOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })
}

// show and hide on click on the buttons to start the operation
const showloadingAnimation = (element) => {
    element.innerHTML = '';
    element.disabled = true
    element.insertAdjacentHTML('beforeend',
        `
        <div class="flex justify-center items-center w-full h-full loader-container">
            <div class="loader w-4 rounded-full animate-loader aspect-square"></div>
        </div>
        `
    )
}
const hideLoadingAnimation = (element) => {
    element.innerHTML = '';
}

//! password and connfirmPass and username and email validator
const userNameValidator = (username) => {
    if (!username.length || username.length < 6) {
        showAlert(signupUsernameAlert)
        return false;
    } else {
        hideAlert(signupUsernameAlert)
        return true;
    }
}
const passwordValidator = (input, alert) => {
    if (!input.length || input.length < 8) {
        showAlert(alert)
        return false;
    } else {
        hideAlert(alert)
        return true;
    }
}
const confirmPasswordValidator = (confirmPassword, password) => {
    if (confirmPassword !== password) {
        showAlert(signupPasswordNotTheSameAlert)
        return false;
    } else {
        hideAlert(signupPasswordNotTheSameAlert)
        return true;
    }
}
const emailValidator = (input, alert) => {
    if (!input || !input.includes('@gmail.com')) {
        showAlert(alert)
        return false;
    } else {
        hideAlert(alert)
        return true;
    }
}
// show toast after clicking on the buttons
const showToast = (status) => {
    toast.classList.add('toast-show')
    switch (status) {
        case 'success': {
            toastTitle.textContent = 'موفق'
            toastIcon.className = 'toast-icon fa-solid fa-check'
            toastStatus.classList.add('success');
            break;
        }
        case 'failed': {
            toastTitle.textContent = 'ناموفق'
            toastIcon.className = 'toast-icon fa-solid fa-xmark'
            toastStatus.classList.add('failed');
            break;
        }
    }
    setTimeout(() => {
        toast.classList.remove('toast-show')
    }, 2500);
}
//! change toast messsage 
const changeToastMessage = (message) => {
    toastMessage.textContent = message
}
// show alerts for not valid inputs data
const showAlert = (element) => {
    element.classList.remove('hidden')
}
const hideAlert = (element) => {
    element.classList.add('hidden')
}




//? auth current active page 
const currentActivePage = (event) => {
    const currentItem = event.target.closest('.auth-active')
    if (currentItem) {
        return
    } else {
        const activePage = document.querySelector('.auth-active')
        activePage.classList.remove('auth-active');
        event.target.classList.add('auth-active')
        const page = event.target.dataset.page;
        moveToAuthPages(page);
    }
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
}
const lightTheme = () => {
    document.documentElement.classList.remove('dark');
}

//! page loader
const pageloading = () => {
    pageLoader.classList.remove('fixed')
    pageLoader.classList.add('hidden')
}
const moveToProfilePage = () => {
    setTimeout(() => {
        location.replace('/profile.html')
    }, 3000)
}

const saveAuthDataInLocalstorage = (username = null , email , password) => {
    console.log('userName =>', username);
    console.log('email =>', email);
    console.log('password =>', password);

    

    const userData = {
        username,
        email,
        password
    }
    localStorage.setItem('userData', JSON.stringify(userData))
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

// signup btn 
signupBtn.addEventListener('click', signupFormValidator)
//login btn 
loginBtn.addEventListener('click', loginFormValidator)