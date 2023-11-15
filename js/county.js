export default class County{
    constructor(_parent, _item){
        this.parent = _parent;
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
        _item.hasOwnProperty('borders')? this.borders = _item.borders : this.borders = ["No borders"];
        this.joinBorders = this.borders==null? "": this.borders.join(', ');
        console.log(this.languages);
    }
    render = () => {
        let parent1 = document.querySelector(this.parent);

        // Convert each border to a link
        const borderLinks = this.borders.map(border => `<a href="https://restcountries.com/v3.1/alpha/${border}" target="_blank">${border}</a>`);

        parent1.innerHTML += `
            <div class="card mt-4">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${this.flag}" class="card-img" alt="${this.name} Flag">
                        <p>Borders: ${borderLinks.join(', ')}</p>
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">${this.name}</h5>
                            <p class="card-text">Population: ${this.pop}</p>
                            <p class="card-text">Region: ${this.region}</p>
                            <p class="card-text">Languages: ${this.joinLanguages}</p>
                            <p class="card-text">Coins: ${this.renderCoin(this.coin)}</p>
                            <p class="card-text">Capital: ${this.capital}</p>
                            <p class="card-text">Area: ${this.area} sq km</p>
                            <iframe class="mt-3" width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&hl=es&z=14&amp;output=embed">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCoin = (currencies) => {
        return Object.entries(currencies)
            .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
            .join(', ');
    }
}