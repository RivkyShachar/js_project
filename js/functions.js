import { countries_names, country_item, doApi} from "./app_single.js";
import County from "./county.js";

let nav_contries_arr = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

export const createNavBar = (_parent) => {
    let parent = document.querySelector(_parent);

    nav_contries_arr.forEach(item => {
        // Creating li element
        let li = document.createElement("li");
        li.className ="nav-item";

        // Creating a element
        let a = document.createElement("a");
        a.className = "nav-link active";
        a.href = "#";//`index.html?name=${item}`;
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
    let orderedList = _.sortBy(countries_names,['name.common']);
    orderedList.forEach(item => {
        option_parent.innerHTML += `<option value="${item.name.common}">${item.name.common} </option>`;
    })
}
export const createSelectBox1 = (_parent) => {
    let parent = document.querySelector(_parent);
    parent.innerHTML = `
    <select id="id_option" class="form-select" aria-label="Default select example"
    style="width: 200px">
    <option value="Israel" selected>Choose a country</option>
    </select>`;
    let option_parent = document.querySelector("#id_option");
    let orderedList = _.sortBy(countries_names,['name.common']);
    orderedList.forEach(item => {
        option_parent.innerHTML += `<option value="${item.name.common}">${item.name.common} </option>`;
    })
}

export const getCountryByName = async(_name) => {
    await doApi(`name/${_name}`)
    createCountry();
}

export const createCountry = async() => {
    let county = new County("main", country_item[0]);
    await county.render();
}

export const getNameOfCode = async(_code) => {
    await doApi(`alpha/${_code}`)
    return country_item[0].name.common;
}


