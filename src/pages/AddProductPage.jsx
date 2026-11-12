import { useState } from "react";
import { useNavigate } from "react-router";
import { useProductsDispatch } from "../context/PantryContext";
import useProduct from "../hooks/useProduct";
import styles from "./AddProductPage.module.css";
function AddProductPage() {
  const dispatch = useProductsDispatch();
  const navigate = useNavigate();
  const { product, isLoading, error, findProduct } = useProduct();

  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [formError, setFormError] = useState("");

  // search the product by barcode and fill the form
  const handleFind = async function () {
    const foundItem = await findProduct(barcode);
    if (foundItem) {
      setName(foundItem.name);
      setBrand(foundItem.brand);
    }
  };

  // add the product to the pantry
  const handleSubmit = function (e) {
    e.preventDefault();

    if (!name || !expiryDate) {
      setFormError("Please enter a name and expiry date");
      return;
    }

    setFormError("");

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      brand,
      expiryDate,
      barcode,
      image: product?.image || "",
      addedAt: new Date().toISOString(),
    };

    dispatch({ type: "addItem", payload: newProduct });
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <h1>Add product</h1>

      {/* 1. barcode search */}
      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          inputMode="numeric"
          placeholder="Barcode, e.g. 3017620422003"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <button className={styles.secondaryButton} onClick={handleFind}>
          Find
        </button>
      </div>

      {isLoading && <p className={styles.info}>Searching...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* 2. found product preview */}
      {product && (
        <div className={styles.found}>
          {product.image && (
            <img className={styles.foundImage} src={product.image} alt={product.name} />
          )}
          <div>
            <p className={styles.foundLabel}>Found in Open Food Facts</p>
            <p className={styles.foundName}>{product.name}</p>
          </div>
        </div>
      )}

      {/* 3. the form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Brand (optional)
          <input
            className={styles.input}
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Expiry date
          <input
            className={styles.input}
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>

        {formError && <p className={styles.error}>{formError}</p>}

        <button className={styles.primaryButton} type="submit">
          Add to pantry
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
