let nav_contries_arr = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

export const createNavBar = (_parent) => {
    let parent = document.querySelector(_parent);
    parent.innerHTML = "";
    nav_contries_arr.forEach( item =>{
        parent.innerHTML += `
        <li class="nav-item">
            <a class="nav-link active" href="#">${item}</a>
        </li>`
    })
}

export const doSomthing = (_data) => {
    console.log(_data)
}