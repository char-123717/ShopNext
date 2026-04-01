import {api} from "./api";

//Fetch list of products with pagination
export const getProducts = async(limit = 30, skip = 0) => {
    const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return res.data;
}

//Fetch a single product by ID
export const getProductById = async(id:number) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

//Search products by keyword
export const searchProducts = async(query: string) => {
    const res = await api.get("/products/search", {params: {q: query}});
    return res.data;
}

//Fetch products in a specific category
export const getProductsByCategory = async(category: string) => {
    const res = await api.get(`/products/category/${category}`);
    return res.data;
}

//Get all available product categories
export const getCategories = async() => {
    const res = await api.get("/products/categories");
    return res.data;
}