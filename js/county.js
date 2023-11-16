import { getCountryByName, getNameOfCode } from "./functions.js"

export default class County {
    constructor(_parent, _item) {
        this.parent = document.querySelector(_parent);
        this.name = _item.name.common;
        this.pop = Number(_item.population).toLocaleString();
        this.region = _item.region;
        this.languages = _item.languages;
        this.joinLanguages = Object.values(this.languages).join(', ');
        this.coin = _item.currencies;
        this.capital = _item.capital;
        this.flag = _item.flags.png;
        this.latlng = _item.latlng;
        this.area = Number(_item.area).toLocaleString();
        this.borders = _item.borders || [];
        this.joinBorders = this.borders.length > 0 ? this.borders.map(border => `<a href="#" class="border-link" data-border="${border}">${border}</a>`).join(', ') : "No borders";
        console.log(this.languages);
    }
    render = () => {
        this.parent.innerHTML = "";
        let div = document.createElement("div");
        div.className = "border bg-secondary bg-opacity-50 p-4 w-50";
        this.parent.append(div);
        div.innerHTML =
            `<img src="${this.flag}" alt="${this.name}" class="w-50 float-end mx-4">
            <div class="ms-4 ">

    <h2>${this.name}</h2>
    <div>POP: ${this.pop} </div>
    <div>Region: ${this.region}</div>
    <div>Languages: ${this.joinLanguages}</div>
    <div>Coin:  ${this.renderCoin(this.coin)}</div>
    <div>Capital: ${this.capital}</div>
    <div class="mt-3 "><strong>States with borders:</strong><br>
    <div id="id_borders" class="borders_div"> ${this.joinBorders}</div>
    </div>
    </div>
    
    <iframe class="mt-3 col-12 px-4" height="300" src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
   `

        // this.parent.innerHTML = `
        //     <div class="card mt-4">
        //         <div class="row g-0">
        //             <div class="col-md-2">
        //                 <img src="${this.flag}" class="card-img" alt="${this.name} Flag">
        //                 <p>Borders: ${this.joinBorders}</p>
        //             </div>
        //             <div class="col-md-10">
        //                 <div class="card-body">
        //                     <h5 class="card-title">${this.name}</h5>
        //                     <p class="card-text">Population: ${this.pop}</p>
        //                     <p class="card-text">Region: ${this.region}</p>
        //                     <p class="card-text">Languages: ${this.joinLanguages}</p>
        //                     <p class="card-text">Coins: ${this.renderCoin(this.coin)}</p>
        //                     <p class="card-text">Capital: ${this.capital}</p>
        //                     <p class="card-text">Area: ${this.area} sq km</p>
        //                     <iframe class="mt-3" width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        //                         src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&hl=es&z=14&amp;output=embed">
        //                     </iframe>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // `;


        // Add click event listeners to border links
        this.borders.forEach(border => {
            const borderLink = document.querySelector(`.border-link[data-border="${border}"]`);
            if (borderLink) {
                let country_name;
                getNameOfCode(border)
                    .then(data => {
                        country_name = data
                        console.log(country_name);
                        if (!country_name) {
                            return;
                        }
                        borderLink.innerHTML = country_name;
                        borderLink.addEventListener('click', (event) => {
                            event.preventDefault();
                            getCountryByName(country_name);
                        });
                    });
            }
        });
    }

    renderCoin = (currencies) => {
        return Object.entries(currencies)
            .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
            .join(', ');
    }
}