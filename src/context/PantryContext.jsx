import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext();
const DispatchContext = createContext();

const initialState = {
  products: [],
};

const reducer = function (state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "deleteItem":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      throw new Error("Unknown action" + action.type);
  }
};

export function PantryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = state;
  return (
    <ProductsContext.Provider value={products}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts was used outside of inventory provider");
  }
  return context;
}
export function useProductsDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useProductsDispatch was used outside of inventory provider");
  }
  return context;
}
