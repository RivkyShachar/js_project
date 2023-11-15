let nav_contries_arr = ["Israel", "USA", "United Kingdom", "France", "Thailand"]

window.onload = () => {
    console.log("onload");
    createNavBar("#id_nav");
}

const createNavBar = (_parent) => {
    let parent = document.querySelector(_parent);
    parent.innerHTML = "";
    nav_contries_arr.forEach( item =>{
        console.log("foreach");
        parent.innerHTML += `
        <li class="nav-item">
            <a class="nav-link active" href="#">${item}</a>
        </li>`
    })
    console.log("create");
}