import axios from "axios";

const getProducts = async (skip, pageSize) => {
    try {
        const url = `https://dummyjson.com/products?skip=${skip}&limit=${pageSize}`;
        const response = await axios.get(url);
        return response;
    } 
    catch {
        return null;
    }
}

export const productService = {
    getProducts
}
