import { doApiNames, doApi, last_countries, country_item} from "./api.js";
import { createSelectBoxBig, createNavBar, createCountrySmall} from "./functions.js";
import {declareEventsIndex} from "./events.js"

window.onload = async() => {
    await doApiNames("all?fields=name");
    createSelectBoxBig("#id_select_box");
    createNavBar("#id_nav");
    declareEventsIndex();
    await doApi(`name/Aruba`);
    last_countries.push(await country_item[0]);
    await doApi(`name/Israel`);
    last_countries.push(await country_item[0]);
    await doApi(`name/USA`);
    last_countries.push(await country_item[0]);
    await doApi(`name/Aruba`);
    last_countries.push(await country_item[0]);
    let storedList = localStorage.getItem('lastCountries');
    if (storedList == null) {
        // Save the updated product list to local storage
        localStorage.setItem("lastCountries", JSON.stringify(last_countries));
    } else {
        // Parse the JSON string from local storage
        // last_countries = JSON.parse(storedList);
        // last_countries = await storedList;
    }
    
    createCountrySmall();
}


