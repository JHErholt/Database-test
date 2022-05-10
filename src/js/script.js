
// Toggle Burger menu   
function toggleMenuIcon(x) {
    x.style.transtiton = '0.4s';
    x.classList.toggle("toggle-menu");
    document.querySelector("nav").classList.toggle("block");
    document.querySelector("header").classList.toggle("activated");
}
function toggleDropdown(current) {
    let rewriteCurrent = current - 1;
    let getDropdowns = document.querySelectorAll('.dropdown');
    let clickedDropdown = getDropdowns[rewriteCurrent];
    let getArrows = document.querySelectorAll('.arrow');
    let clickedArrow = getArrows[rewriteCurrent];
    if(clickedDropdown.classList.contains('dropdown-active')){
        clickedArrow.innerHTML = '▼';
    }else{
        clickedArrow.innerHTML = '▲';
    }
    clickedDropdown.classList.toggle('dropdown-active');
}

// Validate
document.querySelectorAll(".validate").forEach((ele) => 
    ele.addEventListener("input", validate)
);
function validate(e) {
    let regex = /[^\d\w\sæåø?!-]+/gi;
    e = e || event;
    let initialValue = e.target.value;
    e.target.value = e.target.value.replaceAll(regex, "");
    if (e.target.value != initialValue) {
        e.target.classList.add("input--danger");
        setTimeout((e) => (e.target.classList.remove("input--danger")), 300, e);
    }
};

function openBlogPost(e){
    e = e || event;
    window.location.href = e.target.value;
};