import { doApiImage } from "./api.js";
import { getCountryByName, getNameOfCode } from "./functions.js"

export default class County {
    constructor(_parent, _item) {
        this.parent = document.querySelector(_parent);
        this.name = _item.name.common;
        this.pop = Number(_item.population).toLocaleString();
        this.region = _item.region;
        this.languages = _item.languages || { No: "No languages" };
        this.joinLanguages = Object.values(this.languages || {}).join(', ');
        this.coin = _item.currencies;
        this.capital = _item.capital || 'No Capital';
        this.flag = _item.flags.png;
        this.latlng = _item.latlng;
        this.area = Number(_item.area).toLocaleString();
        this.borders = _item.borders || [];
        this.joinBorders = this.borders.length > 0 ? this.borders.map(border => `<a href="../single.html" class="border-link" data-border="${border}">${border}</a>`).join(', ') : "No borders";
        this.zoom = this.getZoomLevel();
        this.image;
    }
    render = () => {
        this.parent.innerHTML = "";
        let div = document.createElement("div");
        div.className = "rounded border bg-secondary bg-opacity-75 text-white p-4 m-4";
        div.setAttribute("data-aos", "fade-up");
        div.setAttribute("data-aos-duration", "1500");
        div.style.minWidth = "70%";
        this.parent.append(div);
        div.innerHTML =
            `<img src="${this.flag}" alt="${this.name}" data-aos="zoom-in" data-aos-duration="3000" class="w-50 float-end mx-4 border border-dark">
            <div class="ms-4 ">
            <h2>${this.name}</h2>
            <div><strong>Population:</strong> ${this.pop} </div>
            <div><strong>Region:</strong> ${this.region}</div>
            <div><strong>Languages:</strong> ${this.joinLanguages}</div>
            <div><strong>Coin:</strong>  ${this.renderCoin(this.coin)}</div>
            <div><strong>Capital:</strong> ${this.capital}</div>
            <div><strong>Area:</strong> ${this.area}</div>
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
                        if (!country_name) {
                            return;
                        }
                        borderLink.innerHTML = country_name;
                        borderLink.className = "text-decoration-none text-white";
                        borderLink.addEventListener('click', (event) => {
                            event.preventDefault();
                            getCountryByName(country_name);
                        });
                    });
            }
        });
        doApiImage(this.name).then(data => {
            this.image = data
            console.log(data);
            console.log(this.image);
            this.parent.style.backgroundImage = `url('${this.image}')`;
            this.parent.style.backgroundSize = "cover";
        });
    }

    renderSmall = () => {
        let div = document.createElement("div");
        div.className = "col-6 col-lg-3 col-md-6 col-sm-12 px-3 mt-4 text-center box";
        div.setAttribute("data-aos", "fade-right");
        div.setAttribute("data-aos-duration", "2000");
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