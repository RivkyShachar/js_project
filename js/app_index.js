import { doApiNames} from "./api.js";
import { createSelectBoxBig, createNavBar, createCountrySmall} from "./functions.js";
import {declareEventsIndex} from "./events.js"
import { localStorageLastCountries } from "./local_storage.js";

window.onload = async() => {
    // get the names of all countries for the select box and creating the select box
    await doApiNames("all?fields=name");
    createSelectBoxBig("#id_select_box");

    createNavBar("#id_nav");
    declareEventsIndex();

    await localStorageLastCountries();
    createCountrySmall();
}


