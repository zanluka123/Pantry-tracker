import { PantryProvider } from "./context/PantryContext";
import Test from "./components/test";

function App() {
  return (
    <PantryProvider>
      <div className="main-container">
        <Test />
      </div>
    </PantryProvider>
  );
}

export default App;
