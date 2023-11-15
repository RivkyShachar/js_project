import { declareEvents } from "./events.js";
import {createNavBar, doSomthing, createSelectBox, createCountry} from "./functions.js"
export let countries_names;
export let country_item;


window.onload = () => {
    let _name = "Israel"
    doApiNamesAndInit("all?fields=name");
    doApi(`name/${_name}`);
    createNavBar("#id_nav");
}

export const doApiNamesAndInit = async (_quary) => {
    let url = `https://restcountries.com/v3.1/${_quary}`;
    console.log(url)
    let resp = await fetch(url);
    countries_names = await resp.json(); 
    createSelectBox("#id_select_box");
    declareEvents();
};
export const doApi = async (_quary) => {
    let url = `https://restcountries.com/v3.1/${_quary}`;
    console.log(url)
    let resp = await fetch(url);
    country_item = await resp.json(); 
    console.log(country_item);
    createCountry()
};

