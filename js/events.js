import {getCountryByName} from "./functions.js"

export const declareEvents = () => {
    let select_box = document.querySelector("#id_option");
    let input_search = document.querySelector("#id_input");
    let search_btn = document.querySelector("#id_search_btn");
    let parent = document.querySelector("main")

    search_btn.addEventListener("submit", e => {
        e.preventDefault()
        getCountryByName(input_search.value);
    })

    select_box.addEventListener("change", () => {
        parent.innerHTML = "";
        getCountryByName(select_box.value);
        input_search.value = select_box.value;
    })



}