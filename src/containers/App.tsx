import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoxBookManage from "../components/AdminProfile/BoxBooksManage";
import BoxOrdersManage from "../components/AdminProfile/BoxOrdersManage";

import BoxLogin from "../components/BoxLogin/BoxLogin";
import BoxProfile from "../components/BoxProfile/BoxProfile";
import BoxRegister from "../components/BoxRegister/BoxRegister";
import PayuCallback from "../components/PayU/PayuCallback";
import CustomPage from "./pages/CustomPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CustomPage title={"Strona główna"} box={MainPage} />}
        />
        <Route
          path="/cart"
          element={<CustomPage title={"Koszyk"} box={BoxProfile} />}
        />
        <Route
          path="/login"
          element={<CustomPage title={"Logowanie"} box={BoxLogin} />}
        />
        <Route
          path="/register"
          element={<CustomPage title={"Rejestracja"} box={BoxRegister} />}
        />
        <Route
          path="/manage/books"
          element={<CustomPage title={"Zarządzanie"} box={BoxBookManage} />}
        />
        <Route
          path="/manage/orders"
          element={<CustomPage title={"Zarządzanie"} box={BoxOrdersManage} />}
        />
        <Route
          path="/payu-callback"
          element={<CustomPage title={"Gratulacje"} box={PayuCallback} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
