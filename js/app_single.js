window.onload = async() => {
    await doApiNames("all?fields=name");
    createSelectBoxSmall("#id_select_box");
    createSelectBox1("#id_select_box1");
    createNavBar("#id_nav");
    declareEvents();
    await doApi(`name/Israel`);
    createCountry();
}

