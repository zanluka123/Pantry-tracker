async function fetchProductsBarCode(barcode) {
  const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
  if (!res.ok) throw new Error("Problem fetching data");
  const data = await res.json();
  if (data.status === 0) throw new Error("Product not found");
  return {
    barcode: barcode,
    name: data.product.product_name || "Unknown product",
    brand: data.product.brands,
    image: data.product.image_front_small_url,
  };
}

export default fetchProductsBarCode;
