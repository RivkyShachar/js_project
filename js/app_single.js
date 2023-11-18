import {createSelectBox, createNavBar} from "./functions.js"
import { declareEvents } from "./events.js";
import {doApiNames} from "./api.js"

window.onload = async() => {

    // get the names of all countries for the select box and creating the select box
    await doApiNames("all?fields=name");
    createSelectBox("#id_select_box");

    createNavBar("#id_nav");

    declareEvents();
}

