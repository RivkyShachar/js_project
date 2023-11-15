import { countries_names, country_item, doApi} from "./app.js";
import County from "./county.js";

let nav_contries_arr = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

// export const createNavBar = (_parent) => {
//     let parent = document.querySelector(_parent);
//     parent.innerHTML = "";
//     nav_contries_arr.forEach(item => {
//         parent.innerHTML += `
//         <li id="${item.replace(/ /g, '_')}" class="nav-item">
//             <a class="nav-link active" href="index.html?name=${item}" onclick="createCountry(${item})">${item}</a>
//         </li>`;
//         let nav = document.querySelector(`#${item.replace(/ /g, '_')}`);
//         nav.addEventListener("click", () => createCountry(item));
//         console.log(nav.innerHTML);
//     })
// }

export const createNavBar = (_parent) => {
    let parent = document.querySelector(_parent);
    parent.innerHTML = "";

    nav_contries_arr.forEach(item => {
        let itemId = item.replace(/ /g, '_');

        // Creating li element
        let li = document.createElement("li");
        li.id = itemId;
        li.classList.add("nav-item");

        // Creating a element
        let a = document.createElement("a");
        a.classList.add("nav-link", "active");
        a.href = `index.html?name=${item}`;
        a.textContent = item;

        // Adding click event listener to a element
        a.addEventListener("click", () => createCountry(item));

        // Appending a element to li element
        li.appendChild(a);

        // Appending li element to parent
        parent.appendChild(li);

        console.log(li.innerHTML);
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
    countries_names.forEach(item => {
        option_parent.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`;
    })
}


export const doSomthing = async() => {
    let _name = "Israel"
    let url = `https://restcountries.com/v3.1/name/${_name}`;
    console.log(url)
    let resp = await fetch(url);
    let data = await resp.json();
    let county = new County("main", data);
    console.log(county);
    county.render();
}

export const getCountryByName = (_name) => {
    doApi(`name/${_name}`)
    let county = new County("main", country_item[0]);
    county.render();
}

export const createCountry = () => {
    let county = new County("main", country_item[0]);
    county.render();
}


