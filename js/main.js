import { renderProductList,EDIT_BUTTON_PREFIX } from "./dom.js";
import {
    getAllPerfumes,
    editPerfume
} from "./api.js";
const findButton = document.getElementById("buttonfind");
const findInput = document.getElementById("inputfind");
const cancelFindButton = document.getElementById("buttonclear");
const countButton = document.getElementById("buttoncount");
const sortButton = document.getElementById("buttonsort");
const sumOut = document.getElementById("Totalprice");
const empty = document.getElementById("products_container");
const TitleInput = document.getElementById("title");
const DescriptionInput = document.getElementById("description");
const VolumeInput = document.getElementById("volume");
const PriceInput = document.getElementById("price");

let perfumes = [];
//edit
const onEditProduct = async(element) => {
    const id = element.target.id.replace(EDIT_BUTTON_PREFIX, "");
    const { title, description, volume, price } = getInputValues();
    clearInpust();
    editPerfume(id, {
        title,
        description,
        volume,
        price
    }).then(refetchPerfume);
};
//get Product from api
export const refetchPerfume = async() => {
    const Perfumes =await getAllPerfumes();
    perfumes = Perfumes;
    renderProductList(perfumes, onEditProduct);
};

findButton.addEventListener("click", ()=> {
    const foundPefume = perfumes.filter(perfume => perfume.title.search(findInput.value) !== -1);
    if (foundPefume.length !=0) {
        renderProductList(foundPefume, onEditProduct);
    } else {
        empty.innerHTML = ("Not found!");
    }
});

cancelFindButton.addEventListener("click", () => {
    renderProductList(perfumes, onEditProduct);
    findInput.value = "";
});

//function sort
function compareFromDescending(a, b) {
    if(a.price < b.price ) {
        return -1;
    }
    if (a.price > b.price){
        return 1;
    }
    return 0;
}

function compareAscending(a, b) {
    if(a.price > b.price ) {
        return -1;
    }
    if (a.price < b.price){
        return 1;
    }
    return 0;
}
sortButton.addEventListener("change", function() {
    if (this.checked) {
        const sortedPerfumes = perfumes.sort(compareFromDescending);
        renderProductList(sortedPerfumes, onEditProduct);
    } else {
        const sortedPerfumes = perfumes.sort(compareAscending);
        renderProductList(sortedPerfumes, onEditProduct);
    }
}) ;
// sum 
countButton.addEventListener("click", () => {
    const SumPrice = perfumes.reduce(((sum, perfumes) => sum + perfumes.price), 0);
    sumOut.innerHTML = `${SumPrice}$`;
});


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

renderProductList(perfumes, onEditProduct);
refetchPerfume();