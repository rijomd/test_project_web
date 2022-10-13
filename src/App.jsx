import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryList, Header ,Home,ProductList} from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          <Route exact path="/"
            element={<Home />} />

          <Route exact path="/categoryList"
            element={<CategoryList />} />

          <Route exact path="/productList"
            element={<ProductList />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
