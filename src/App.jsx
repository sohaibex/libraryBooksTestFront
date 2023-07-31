import "./App.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import MainComponent from "./components/BooksGrid/index";

function App() {
  return (
    <div className="App">
      <MainComponent />
    </div>
  );
}

export default App;
