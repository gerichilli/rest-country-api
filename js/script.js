const darkMode = document.querySelector('.header__theme--dark');
const lightMode = document.querySelector('.header__theme--light');
const themeSwitchBtn = document.getElementById('theme-switch');

const filterBox = document.querySelector('.filter');
const chervonDownIcon = document.querySelector('.filter__icon');
const filterList = document.querySelector('.filter__show');
const filterLabel = document.querySelector('.filter__label');

const countryWrapper = document.querySelector('.country');
const loader = document.querySelector('.loader');
let filterRegion;

let countryCount = 0;
let totalCountryCount = 0;
let ready = false;

let apiUrl = 'https://restcountries.eu/rest/v2/all';

// Work with data
const region = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function renderCountry(dataArr) {
    let html = '';
    dataArr.forEach((data) => {
        html += `
        <div class="country__item" data-name="${data.name}">
            <div class="country__flag">
                <img src="${data.flag}" alt="">
            </div>
            <div class="country__information">
                <div class="country__name">${data.name}</div>
                <div class="country__population"><span class="country__label">Population: </span>${formatNumber(data.population)}</div>
                <div class="country__region"><span class="country__label">Region: </span>${data.region}</div>
                <div class="country__capital"><span class="country__label">Capital: </span>${data.capital}</div>
            </div>
        </div>
        `
    });
    loader.hidden = true;
    countryWrapper.innerHTML = html;
}

function renderFilter() {
    let html = '';
    region.forEach((r) => {
        html += `<div class="filter__item" data-region="${r}">${r}</div>`;
        filterList.innerHTML = html;
    })
}

const getCountryData = function(url) {
    fetch(url).
    then(response => response.json()).
    then(dataArr => {
        renderCountry(dataArr);
    })
    
}

// Render all region in filter 
renderFilter();
// Get all country data
getCountryData(apiUrl);

// Work with Event 
let body = document.body;
body.setAttribute('data-theme', 'default');

themeSwitchBtn.addEventListener('change', function(e){
    e.preventDefault();
    if (themeSwitchBtn.checked) {
        darkMode.classList.add('header__theme--active');
        lightMode.classList.remove('header__theme--active');
        body.setAttribute('data-theme', 'dark')
    } else {
        darkMode.classList.remove('header__theme--active');
        lightMode.classList.add('header__theme--active');
        body.setAttribute('data-theme', 'default')
    }
});

filterBox.addEventListener('click', function(e){
    e.preventDefault();
    chervonDownIcon.classList.toggle('filter__icon--rotate');
    filterList.classList.toggle('filter__show--active');

    if(e.target.classList.contains('filter__item')) {
        filterLabel.innerHTML = e.target.innerHTML;
        filterRegion = e.target.innerHTML;
        apiUrl = `https://restcountries.eu/rest/v2/region/${filterRegion}`;
        getCountryData(apiUrl);
    };  
})

window.addEventListener('scroll', function(){
    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
    //     getCountryData(apiUrl);
    // }
})