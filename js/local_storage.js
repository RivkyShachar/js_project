import { doApi, country_item} from "./api.js";
import { nav_contries_arr } from "./functions.js";

export let last_countries = [];

export const localStorageLastCountries = async() => {
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

const initLastCountries = async() => {
    for(let i = 0; i < 4 ; i++){
        await doApi(`name/${nav_contries_arr[i]}`);
        last_countries.push(country_item[0]);
    }
}