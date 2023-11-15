import { declareEvents } from "./events.js";
import {createNavBar, doSomthing} from "./functions.js"



window.onload = () => {
    createNavBar("#id_nav");
    doApi();
    declareEvents();
}

const doApi = async () => {
  let url = "https://restcountries.com/v3.1/all";
  let resp = await fetch(url);
  let data = await resp.json();
  doSomthing(data);
};
