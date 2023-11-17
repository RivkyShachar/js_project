import { declareEvents } from "./events.js";
import {createNavBar, createSelectBox, createCountry} from "./functions.js";




window.onload = async() => {
    await doApiNames("all?fields=name");
    createSelectBox("#id_select_box");
    createSelectBox1("#id_select_box1");
    createNavBar("#id_nav");
    declareEvents();
    await doApi(`name/Israel`);
    createCountry();
}

