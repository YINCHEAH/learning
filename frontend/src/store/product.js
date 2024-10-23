import { create } from "/node_modules/.vite/deps/zustand.js?v=5db21575";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    
    createProduct: async (newProduct) => {
        // Basic field validation
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields" };
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            // Check if the response was successful
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Failed to create product" };
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));

            return { success: true, message: "Product created successfully" };
        } catch (error) {
            return { success: false, message: "An error occurred while creating the product" };
        }
    },
}));
