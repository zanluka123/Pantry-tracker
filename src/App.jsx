import { PantryProvider } from "./context/PantryContext";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import PantryPage from "./pages/PantryPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <BrowserRouter>
      <PantryProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PantryPage />} />
            <Route path="/AddProduct" element={<AddProductPage />} />
          </Route>
        </Routes>
      </PantryProvider>
    </BrowserRouter>
  );
}

export default App;
