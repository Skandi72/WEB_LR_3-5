import { deletePerfume } from "./api.js";
import { refetchPerfume} from "./main.js";
const ProductContainer = document.getElementById("products_container");

const getProductID = (id) => `product-${id}`;

export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = 'delete-button-';

const ProductTemplate = ({ id, title, description, volume, price}) => ` 
<li id="${getProductID(id)}" class="">
     <img src="images/p1.jpg" class="product-image" alt="card">
     <div class="">
        <h5 class="product-name"> ${title}</h5>
        <p class="product-brand"> ${description}</p>
        <p class="product-price"> ${volume}ml</p>
        <p class="product-price">${price}$</p>
        <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">Edit</button>
        <button id="${DELETE_BUTTON_PREFIX}${id}" class="Remove_button" type="button">Delete</button>
    </div>
</li>` ;

export const addProductToPage = ({ _id: id , title, description, volume, price }, onEditProduct) => {
    ProductContainer.insertAdjacentHTML(
        "afterbegin",
        ProductTemplate({id , title, description, volume, price})
    );
    const element = document.getElementById(id);
    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
    editButton.addEventListener("click", onEditProduct);

    const deleteButton =document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
    deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deletePerfume(id).then(refetchPerfume);
    });
};
export const renderProductList = (products, onEditProduct) =>{
    ProductContainer.innerHTML = "";

    for (const product of products) {
        addProductToPage(product, onEditProduct);
    }
};