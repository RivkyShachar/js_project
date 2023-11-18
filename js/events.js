import { getCountryByName } from "./functions.js"

export const declareEventsIndex = () => {
    let select_box = document.querySelector("#id_option");
    let input_search = document.querySelector("#id_input");
    let parent = document.querySelector("main")

    select_box.addEventListener("change", () => {
        window.location.href = `single.html?name=${select_box.value}`;
    });

    input_search.addEventListener("keydown", async(e) => {
        e.preventDefault();
        if (e.key === "Enter") {
            window.location.href = `single.html?name=${input_search.value}`;
        }
    });
}

export const declareEvents= () => {
    declareEventsIndex();
    let input_search = document.querySelector("#id_input");
    
    let search_btn = document.querySelector("#id_search_btn");
    search_btn.addEventListener("click", e => {
        e.preventDefault()
        getCountryByName(input_search.value);
    });
}