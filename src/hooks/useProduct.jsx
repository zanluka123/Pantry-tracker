import { useState } from "react";
import fetchProductsBarCode from "../services/fetchProductsBarCode";

function useProduct() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const findProduct = async function (barcode) {
    if (!barcode) return;
    setIsLoading(true);
    setError("");
    setProduct(null);
    try {
      const result = await fetchProductsBarCode(barcode);
      setProduct(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { product, isLoading, error, findProduct };
}

export default useProduct;
