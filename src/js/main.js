const WEBSITE_NAME = document.title;
const GET_HTML = document.querySelector("html");
const GET_MAIN = document.querySelector("main");
import { Ele } from "./utilities/element.js"; // tagName, props, nest





// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cookie functions
// If localStorage, "cookiesIsAccepted" is NOT true, then run this code
if (localStorage.getItem("cookiesIsAccepted") != "true") {
    // Set the HTML's overflowY to hidden, so you can't scroll down
    GET_HTML.style.overflowY = "hidden";
    // Make a new element, called "modal"
    let modal = Ele.make("div", { class: "modal" }, [
        Ele.make("div", { class: "modal__background" }, [
            Ele.make("div", { class: "modal__content" }, [
                Ele.make("div", { class: "modal__text-container" }, [
                    // Text content
                    Ele.make("h1", {}, "Hjælp os med at forbedre din brugeroplevelse"),
                    Ele.make("p", {}, `${WEBSITE_NAME} ville gerne bruge dens egne cookies til at forbedre brugeroplevelsen.`),
                    Ele.make("p", {}, `Du kan tilpasse dit samtykke nedenfor. Dit samtykke kan til enhver tid ændres eller trækkes tilbage ved at klikke på menupunktet nede i bunden af siden.`),
                    Ele.make("p", {}, `${WEBSITE_NAME} bruger dog nogle cookies, der er nødvendige for at siden fungerer, og kan dermed ikke fravælges.`),
                    // 
                    // Buttons
                    Ele.make("div", { class: "flex" }, [
                        Ele.make("button", {
                            class: "btn btn--square btn--confirm-border flex--grow-1 w-50", id: "saveYourChoice", onclick: () => {
                                // Get the checkboxes
                                let quality = document.querySelector("#cookieQuality");
                                let functionality = document.querySelector("#cookieFunctionality");
                                // If both checkboxes are checked, accept all cookies
                                if (quality.checked && functionality.checked) {
                                    acceptCookies("all");
                                }
                                // If only quality is checked, accept quality cookies
                                else if (quality.checked) {
                                    acceptCookies("quality");
                                }
                                // If only functionality is checked, accept functionality cookies
                                else if (functionality.checked) {
                                    acceptCookies("function");
                                }
                                // If none is checked, accept only required cookies
                                else{
                                    acceptCookies();
                                }
                                // Close the modal
                                document.querySelector(".modal__content").style.top = "100vh";
                                setTimeout(() => {
                                    document.querySelector(".modal").remove();
                                    // Set the HTML's overflowY to inherit, so you can scroll down again
                                    GET_HTML.style.overflowY = "inherit";
                                }, 1000);
                            }
                        }, "Acceptér kun nødvendige cookies"),

                        Ele.make("button", {
                            class: "btn btn--square btn--confirm flex--grow-1 w-50", onclick: () => {
                                // accept all cookies
                                acceptCookies("all");
                                // Close the modal
                                document.querySelector(".modal__content").style.top = "100vh";
                                setTimeout(() => {
                                    document.querySelector(".modal").remove();
                                    // Set the HTML's overflowY to inherit, so you can scroll down again
                                    GET_HTML.style.overflowY = "inherit";
                                }, 1000);
                            }
                        }, "Acceptér alle cookies")
                    ]),
                    // 
                    // Checkboxes
                    Ele.make("div", { class: "flex" }, [
                        Ele.make("div", { class: " flex--grow-1 flex--justify-content-center flex--column text-align--center" }, [
                            Ele.make("b", { class: "offset__top--small" }, "Nødvendige"),
                            Ele.make("label", { class: "input__checkbox--round input__checkbox--disabled" }, [
                                Ele.make("input", { type: "checkbox", disabled: "", checked: "" }),
                                Ele.make("span", {}, "")
                            ])
                        ]),
                        Ele.make("div", { class: "flex--grow-1 flex--justify-content-center flex--column text-align--center" }, [
                            Ele.make("b", { class: "offset__top--small" }, "Livskvalitet"),
                            Ele.make("label", { class: "input__checkbox--round" }, [
                                Ele.make("input", { type: "checkbox", id: "cookieQuality", onclick: () => { checkCheckedCookies() } }),
                                Ele.make("span", {}, "")
                            ])
                        ]),
                        Ele.make("div", { class: "flex--grow-1 flex--justify-content-center flex--column text-align--center" }, [
                            Ele.make("b", { class: "offset__top--small" }, "Funktionalitet"),
                            Ele.make("label", { class: "input__checkbox--round" }, [
                                Ele.make("input", { type: "checkbox", id: "cookieFunctionality", onclick: () => { checkCheckedCookies() } }),
                                Ele.make("span", {}, "")
                            ])
                        ])
                    ]),
                    // 
                ])
            ])
        ])
    ]);
    // When the modal is loaded, set the top to 100px
    // And run checkCheckedCookies(), to make sure the button has the right text
    setTimeout(() => {
        document.querySelector(".modal__content").style.top = "100px";
        checkCheckedCookies();
    }, 1)
    // Add the modal to main
    GET_MAIN.appendChild(modal);
}
// Check if cookies are accepted / and which ones are accepted
function checkCheckedCookies() {
    let button = document.querySelector("#saveYourChoice");
    let checkboxes = document.querySelectorAll(".input__checkbox--round input");
    let checked = 0;
    // Make a loop to loop through all checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        // If checkbox is checked, increase the counter
        if (checkboxes[i].checked) { 
            checked++;
        }
        // If the counter is more than 1, change the button to "Acceptér valgte cookies"
        if (checked > 1){
            button.innerHTML = "Acceptér valgte cookies";
        }
        // Else change the button to "Acceptér kun nødvendige cookies"
        else{
            button.innerHTML = "Acceptér kun nødvendige cookies";
        }
    }
}
// Accept cookies
function acceptCookies(whichCookies) {
    switch (whichCookies) {
        // If whichCookies is "quality", accept required and quality cookies
        case "quality":
            cookiesRequired();
            cookiesQuality();
            break;
        // If whichCookies is "function", accept required and functionality cookies
        case "function":
            cookiesRequired();
            cookiesFunctionality();
            break;
        // If whichCookies is "all", accept all cookies
        case "all":
            cookiesRequired();
            cookiesQuality();
            cookiesFunctionality();
            break;
        // If whichCookies is "", accept only required cookies
        default: 
            cookiesRequired();
    }
}
// Set localStorage for the cookies
function cookiesRequired() {
    localStorage.setItem("requiredIsAccepted", "true");
    localStorage.setItem("cookiesIsAccepted", "true");
}
function cookiesQuality() {
    localStorage.setItem("qualityIsAccepted", "true");
}
function cookiesFunctionality() {
    localStorage.setItem("functionIsAccepted", "true");
}
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
