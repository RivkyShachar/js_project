import { doApiNames, doApi, last_countries, country_item} from "./api.js";
import { createSelectBoxBig, createNavBar, createCountrySmall, nav_contries_arr} from "./functions.js";
import {declareEventsIndex} from "./events.js"

window.onload = async() => {
    // get the names of all countries for the select box and creating the select box
    await doApiNames("all?fields=name");
    createSelectBoxBig("#id_select_box");

    createNavBar("#id_nav");
    declareEventsIndex();

    // store the last countries in local storage
    let storedList = localStorage.getItem('lastCountries');
    if (storedList == null) {
        initLastCountries();
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
    createCountrySmall();
}

const initLastCountries = async() => {
    for(let i = 0; i < 4 ; i++){
        await doApi(`name/${nav_contries_arr[i]}`);
        last_countries.push(country_item[0]);
    }
}


