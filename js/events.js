import { getCountryByName } from "./functions.js"

export const declareEvents = () => {
    let select_box = document.querySelector("#id_option");
    let input_search = document.querySelector("#id_input");
    let search_btn = document.querySelector("#id_search_btn");
    let parent = document.querySelector("main")

    search_btn.addEventListener("click", e => {
        e.preventDefault()
        getCountryByName(input_search.value);
    });

    select_box.addEventListener("change", () => {
        getCountryByName(select_box.value);
        input_search.value = select_box.value;
    });

    input_search.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            getCountryByName(input_search.value);
            select_box.value = "Israel";
        }
    });



}