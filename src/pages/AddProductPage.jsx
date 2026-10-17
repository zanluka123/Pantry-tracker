import { useState } from "react";
import { useNavigate } from "react-router";
import { useProductsDispatch } from "../context/PantryContext";
import useProduct from "../hooks/useProduct";

function AddProductPage() {
  const dispatch = useProductsDispatch();
  const navigate = useNavigate();
  const { product, isLoading, error, findProduct } = useProduct();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [barcode, setBarcode] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!name || !expiryDate) return;

    const newProduct = {
      id: crypto.randomUUID(),
      name: name,
      brand: brand,
      expiryDate: expiryDate,
      addedAt: new Date().toISOString(),
    };

    dispatch({ type: "addItem", payload: newProduct });
    console.log(newProduct);
    navigate("/");
  };

  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Barcode, e.g. 3017620422003"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={() => findProduct(barcode)}>Find Product</button>
      {isLoading && <p>Searching...</p>}
      {error && <p>{error}</p>}
      {product && <p>{product.name}</p>}
      <h1>Add product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name of the product"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={brand}
          placeholder="Brand (optional)"
          onChange={(e) => setBrand(e.target.value)}
        />
        <label htmlFor="expiryDate">Expiry date</label>
        <input
          id="expiryDate"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <button type="submit">Add product</button>
      </form>
    </div>
  );
}

export default AddProductPage;
