import { declareEvents } from "./events.js";
import {createNavBar, createSelectBox, createCountry} from "./functions.js";

export let countries_names;
export let country_item;


window.onload = async() => {
    await doApiNames("all?fields=name");
    createSelectBox("#id_select_box");
    createNavBar("#id_nav");
    declareEvents();
    await doApi(`name/Israel`);
    createCountry();
}

export const doApiNames = async (_quary) => {
    let url = `https://restcountries.com/v3.1/${_quary}`;
    let resp = await fetch(url);
    countries_names = await resp.json(); 
};
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
