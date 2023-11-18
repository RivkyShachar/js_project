import { createSelectBox, createNavBar, getCountryByName } from "./functions.js"
import { declareEvents } from "./events.js";
import { doApiNames, getLocalStorage } from "./api.js";

window.onload = async () => {

    // get the names of all countries for the select box and creating the select box
    await doApiNames("all?fields=name");
    createSelectBox("#id_select_box");

    await getLocalStorage();

    createNavBar("#id_nav");

    declareEvents();

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    console.log(name);
    await getCountryByName(name);
}

