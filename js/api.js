export let countries_names;
export let country_item;
export let last_countries = []

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
    }
    else {
        alert("Error - data not found.")
    }
};
