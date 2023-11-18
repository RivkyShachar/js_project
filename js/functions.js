import {countries_names, country_item, doApi} from "./api.js";
import County from "./county.js";
import {last_countries} from "./local_storage.js"

export let nav_contries_arr = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

export const createNavBar = (_parent) => {
    let parent = document.querySelector(_parent);

    nav_contries_arr.forEach(item => {
        // Creating li element
        let li = document.createElement("li");
        li.className = "nav-item";

        // Creating a element
        let a = document.createElement("a");
        a.className = "nav-link active";
        a.href = "single.html";
        a.innerHTML = item;

        // Adding click event listener to a element
        a.addEventListener("click", () => {
            console.log(`click ${item}`);
            getCountryByName(item);
        });
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
    createCountry();
}

export const createCountry = async () => {
    console.log(country_item);
    console.log(country_item[0]);
    last_countries.unshift(country_item[0]);
    console.log(last_countries);
    for (let i = last_countries.length; i > 4; i--)
    {
        last_countries.pop()
    }
    console.log(last_countries);
    let county = new County("main", country_item[0]);
    await county.render();
    createCountrySmall();
}

export const createCountrySmall = async () => {
    localStorage.setItem("lastCountries", JSON.stringify(last_countries));
    console.log(last_countries.length);
    for (let i = 0; i < last_countries.length; i++) {
        console.log(last_countries[i]);
        // let county = new County("#last_search", last_countries[i]);
        let county = new County("footer", last_countries[i]);
        await county.renderSmall();
    }
}

export const getNameOfCode = async (_code) => {
    await doApi(`alpha/${_code}`)
    return country_item[0].name.common;
}


