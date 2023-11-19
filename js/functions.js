import { countries_names, country_item, doApi, last_countries } from "./api.js";
import County from "./county.js";

export let nav_contries_arr = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

export const createNavBar = (_parent) => {
    let parent = document.querySelector(_parent);

    nav_contries_arr.forEach(item => {

        let li = document.createElement("li");
        li.className = "nav-item";

        let a = document.createElement("a");
        a.className = "nav-link active";
        a.href = `single.html?name=${item}`;
        a.innerHTML = item;
        li.append(a);
        parent.append(li);
    });
}

export const createSelectBox = (_parent) => {
    let parent = document.querySelector(_parent);
    parent.innerHTML = `
    <select id="id_option" class="form-select" aria-label="Default select example"
    style="width: 200px">
    <option value="Israel" selected>Choose a country</option>
    </select>`;
    let option_parent = document.querySelector("#id_option");
    let orderedList = _.sortBy(countries_names, ['name.common']);
    orderedList.forEach(item => {
        option_parent.innerHTML += `<option value="${item.name.common}">${item.name.common} </option>`;
    })
}
export const createSelectBoxBig = (_parent) => {
    let parent = document.querySelector(_parent);
    parent.innerHTML = `
    <select id="id_option" class="form-select bg-body bg-opacity-50" aria-label="Default select example">
    <option value="Israel" selected>Choose a country</option>
    </select>`;
    let option_parent = document.querySelector("#id_option");
    let orderedList = _.sortBy(countries_names, ['name.common']);
    orderedList.forEach(item => {
        option_parent.innerHTML += `<option value="${item.name.common}">${item.name.common} </option>`;
    })
}

export const getCountryByName = async (_name) => {
    await doApi(`name/${_name}`)
    await createCountry();
}

export const createCountry = async () => {
    // Check if the country is already in the list
    const existingIndex = last_countries.findIndex(item => JSON.stringify(item) === JSON.stringify(country_item[0]));

    // If the country is already in the list, move it to the first position
    if (existingIndex !== -1) {
        last_countries.unshift(last_countries.splice(existingIndex, 1)[0]);
    } else {
        // If the country is not in the list, add it to the first position
        last_countries.unshift(country_item[0]);
    }

    for (let i = last_countries.length; i > 4; i--) {
        last_countries.pop()
    }
    let county = new County("main", country_item[0]);
    county.render();
    // save the updated last countries in memory
    localStorage.setItem("lastCountries", JSON.stringify(last_countries));

}


export const createCountrySmall = async () => {
    for (let i = 0; i < last_countries.length; i++) {
        let county = new County("#last_search", last_countries[i]);
        await county.renderSmall();
    }
}

export const getNameOfCode = async (_code) => {
    await doApi(`alpha/${_code}`)
    return country_item[0].name.common;
}


