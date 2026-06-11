import '../style.css'

const onPageLoad = () => {
    themeHandler()
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

document.addEventListener('DOMContentLoaded', onPageLoad)
