import axios from "axios";
import {Product, ProductFormData} from "../types";

const API_BASE_URL = `/api/v1`;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const productAPI = {
    getProducts: async (): Promise<Product[]> => {
        const response = await apiClient.get("/products");
        return response.data;
    },

    getProductById: async (id: number): Promise<Product> => {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (product: ProductFormData): Promise<Product> => {
        const response = await apiClient.post("/products", product);
        return response.data;
    },

    updateProduct: async (
        id: number,
        product: ProductFormData
    ): Promise<Product> => {
        const response = await apiClient.put(`/products/${id}`, product);
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await apiClient.delete(`/products/${id}`);
    },
};
