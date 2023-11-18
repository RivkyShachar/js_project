import { getCountryByName, getNameOfCode } from "./functions.js"

export default class County {
    constructor(_parent, _item) {
        this.parent = document.querySelector(_parent);
        this.name = _item.name.common;
        this.pop = Number(_item.population).toLocaleString();
        this.region = _item.region;
        this.languages = _item.languages || {No: "No languages"};
        this.joinLanguages = Object.values(this.languages || {}).join(', ');
        this.coin = _item.currencies;
        this.capital = _item.capital || 'No Capital';
        this.flag = _item.flags.png;
        this.latlng = _item.latlng;
        this.area = Number(_item.area).toLocaleString();
        this.borders = _item.borders || [];
        this.joinBorders = this.borders.length > 0 ? this.borders.map(border => `<a href="../single.html" class="border-link" data-border="${border}">${border}</a>`).join(', ') : "No borders";
        this.zoom = this.getZoomLevel();
    }
    render = () => {
        this.parent.innerHTML = "";
        let div = document.createElement("div");
        div.className = "border border-dark p-4 w-50 my-4";
        div.style.background = "#E6D15F";
        this.parent.append(div);
        div.innerHTML =
            `<img src="${this.flag}" alt="${this.name}" class="w-50 float-end mx-4 border border-dark">
            <div class="ms-4 ">
            <h2>${this.name}</h2>
            <div>Population: ${this.pop} </div>
            <div>Region: ${this.region}</div>
            <div>Languages: ${this.joinLanguages}</div>
            <div>Coin:  ${this.renderCoin(this.coin)}</div>
            <div>Capital: ${this.capital}</div>
            <div>Area: ${this.area}</div>
            <div class="mt-3 "><strong>States with borders:</strong><br>
            <div id="id_borders" class="borders_div"> ${this.joinBorders}</div>
             </div>
            </div>
            <iframe class="mt-3 mb-4 col-12 border border-dark" height="300" src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&z=${this.zoom}&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>`;
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

    renderSmall = () => {
        let div = document.createElement("div");
        div.className = "col-6 col-lg-3 col-md-6 col-sm-12 px-3 mt-4 text-center box";
        this.parent.append(div);
        let img = document.createElement("img");
        img.src = this.flag;
        img.alt = this.name;
        img.className = "col-10 "
        img.addEventListener("click", () => {
            window.location.href = `single.html?name=${this.name}`;
        });
        div.append(img);
        let h2 = document.createElement("h2");
        h2.textContent = this.name;
        h2.className = "my-3"
        h2.style.fontWeight = "700";
        div.append(h2);
    }

    renderCoin = (currencies) => {
        currencies = currencies || {};
        return Object.entries(currencies)
            .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
            .join(', ');
    }

    getZoomLevel = () => {
        const area = Number(this.area.replace(/,/g, '')); // Remove commas from the area

        // Calculate the logarithm base 10 of the area and map it to the zoom level
        const logArea = Math.log10(area);
        const zoomLevel = Math.round(-0.3633 * logArea + 7.93);

        // Ensure the zoom level is within reasonable bounds
        return Math.min(Math.max(zoomLevel, 1), 20);
    }
}