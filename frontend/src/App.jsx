import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingsPage from "./BookingsPage";
import EquipmentRequestsPage from "./EquipmentRequestsPage";
import BookingsPage from "./pages/BookingsPage";
import Requests from ".pages/Requests";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/equipment-requests" element={<EquipmentRequestsPage />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/booking" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;


