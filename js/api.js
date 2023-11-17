export let countries_names;
export let country_item = [];

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
        country_item.unshift(await resp.json());
        country_item = country_item.slice(0, 5);
    }
    else {
        alert("Error - data not found.")
    }
};
