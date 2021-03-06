import React, {createContext, useState} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = createContext();


const ProductProvider = ({children}) => {
const [getProduct, setGetProduct] = useState({

    products: storeProducts,
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    
    
});
const getItem = (id) =>{
    const product = getProduct.products.find(items => items.id === id);
    return product;
}
const handleDetail = (id) =>{
    const product = getItem(id);
    setGetProduct(()=>{
        return {...getProduct, detailProduct: product}
    });
}
const addToCart = (id) =>{
    let tempProducts = [...getProduct.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    setGetProduct(()=>{
        return {...getProduct, product: tempProducts, cart: [...getProduct.cart, product]}
    })
}

const openModal = id =>{
    const product = getItem(id);

    setGetProduct(()=>{
        return {...getProduct, modalProduct: product, modalOpen: true}
    })
}
const closeModal = () =>{
    setGetProduct(()=>{
        return {...getProduct, modalOpen: false}
    })
}
    return(
       <ProductContext.Provider value={{
           ...getProduct,
           handleDetail: handleDetail,
           addToCart: addToCart,
           openModal: openModal,
           closeModal: closeModal
           
       }} >
           {children}
       </ProductContext.Provider>
    );
}

const ProductConsumer = ProductContext.Consumer;

export {ProductConsumer, ProductProvider}






// font-family: 'Lato', sans-serif;
// font-family: 'Montserrat Alternates', sans-serif;
// font-family: 'Sansita Swashed', cursive;