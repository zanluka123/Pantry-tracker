import { useEffect } from "react";
import ProductList from "../components/productList";
import { useProducts } from "../context/PantryContext";
import fetchProductsBarCode from "../services/fetchProductsBarCode";


  return (
    <div>
      <h1>Pantry page</h1>
      <ProductList />
    </div>
  );
}

export default PantryPage;
