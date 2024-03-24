const container = document.querySelector(".container");
const userInput = document.querySelector("#placement");
const submitBtn = document.querySelector("#generate");
const downLoadBtn = document.querySelector("#download");
const sizeOption = document.querySelector(".size");
const Bgcolor = document.querySelector("#color1");
const Fgcolor = document.querySelector("#color2");

let QR_Code;
let sizechoise = 100;
let Bgcolorchoise = "#000000";
let Fgcolorchoise = "#ffffff";

sizeOption.addEventListener("change", () => {
    sizechoise = sizeOption.value;
});

Bgcolor.addEventListener("input", () => {
    Bgcolorchoise = Bgcolor.value;
});

Fgcolor.addEventListener("input", () => {
    Fgcolorchoise = Fgcolor.value;
});

userInput.addEventListener("input", () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downLoadBtn.href = "";
        downLoadBtn.classList.add("hide");
    } else {
        submitBtn.disabled = false;
    }
});

const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
};

const generarQRCode = async () => {
    container.innerHTML = "";

    QR_Code = await new QRCode(container, {
        text: userInput.value,
        width: sizechoise,
        height: sizechoise,
        colorDark: Fgcolorchoise,
        colorLight: Bgcolorchoise
    });

    const src = container.firstChild.toDataURL("image/png");
    downLoadBtn.href = src;

    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }
    downLoadBtn.download = `${userValue}QR`;
    downLoadBtn.classList.remove("hide");
};

window.onload = () => {
    container.innerHTML = "";
    sizeOption.value = sizechoise;
    userInput.value = "";
    Bgcolor.value = Bgcolorchoise;
    Fgcolor.value = Fgcolorchoise;
    downLoadBtn.classList.add("hide");
    submitBtn.disabled = true;
};

submitBtn.addEventListener("click", generarQRCode);
