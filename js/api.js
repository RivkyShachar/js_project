import { nav_contries_arr } from "./functions.js";

export let countries_names;
export let country_item;
export let last_countries = [];

// get the names off all the countries
export const doApiNames = async (_quary) => {
    let url = `https://restcountries.com/v3.1/${_quary}`;
    let resp = await fetch(url);
    countries_names = await resp.json(); 
};

// get a spesific country
export const doApi = async (_quary) => {
    let url = `https://restcountries.com/v3.1/${_quary}`;
    let resp = await fetch(url);
    if(resp.ok){
        country_item = await resp.json();
        localStorage.setItem('country_item', JSON.stringify(country_item)); 
    }
    else {
        alert("Error - data not found.")
    }
};


export const getLocalStorage = async () => {
    let storedCountry = localStorage.getItem("country_item");
    if (storedCountry != null) {
        country_item = await JSON.parse(storedCountry);
    }
    // store the last countries in local storage
    let storedList = localStorage.getItem('lastCountries');
    if (storedList == null) {
        await initLastCountries();
        // Save the updated product list to local storage
        localStorage.setItem("lastCountries", JSON.stringify(last_countries));
    } else {
        // last_countries = [];
        while (last_countries.length > 0) {
            last_countries.pop();
        }
        // Parse the JSON string from local storage
        last_countries.push(...JSON.parse(storedList));
        console.log(last_countries);
    }
}

const initLastCountries = async () => {
    for (let i = 0; i < 4; i++) {
        await doApi(`name/${nav_contries_arr[i]}`);
        last_countries.push(country_item[0]);
    }
}

export const doApiImage = async (_searchVal) => {
    let url = `https://pixabay.com/api/?key=35495136-199e51b164e4908b88f17572c&q=${_searchVal}&image_type=photo&pretty=true`;
    let resp = await fetch(url);
    let images = await resp.json();
    return images.hits[0].largeImageURL;
}
