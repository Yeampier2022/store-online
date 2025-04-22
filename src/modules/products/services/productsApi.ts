import http from "@/api/http";
import type { products, categories } from "../types";

export const productService = {
  async getProducts(): Promise<products> {
    const response = await http.get("product");
    return response.data;
  },
};
