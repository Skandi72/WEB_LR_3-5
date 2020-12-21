import {
    postPerfume
} from "./api.js";

const TitleInput = document.getElementById("title");
const DescriptionInput = document.getElementById("description");
const VolumeInput = document.getElementById("volume");
const PriceInput = document.getElementById("price");
const submitButton = document.getElementById("submitButton");



export const getInputValues = () => {
    if(TitleInput.value === "") {
        alter("Write title");
        TitleInput.focus();
    } else if (DescriptionInput.value === "") {
        alert("Write Desk");
        DescriptionInput.focus();
    } else if (VolumeInput.value === "") {
        alert("Write valume");
        VolumeInput.focus();
    } else if (PriceInput.value === "") {
        alert("Write prica");
        PriceInput.focus();
    } else {
        return {
            title: TitleInput.value,
            description: DescriptionInput.value,
            volume: VolumeInput.value,
            price: PriceInput.value,
        };
    }
};
// clear input
export const clearInpust = () => {
    TitleInput.value = "";
    DescriptionInput.value = "";
    VolumeInput.value = "";
    PriceInput.value = "";
};
//submit
submitButton.addEventListener("click", (event) =>{
    event.preventDefault();
    const { title , description , volume , price } = getInputValues();
    clearInpust();
    postPerfume({
        title,
        description,
        volume,
        price,
    });
});