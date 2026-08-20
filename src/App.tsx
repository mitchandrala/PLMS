import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import BookSlot from "./Pages/BookSlot";
import ViewAndManage from "./Pages/ViewAndManage";
import ParkingHistory from "./Pages/ParkingHistory";
import { ROUTES } from "./Routes/routes";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.BOOK_SLOT} element={<BookSlot />} />
        <Route path={ROUTES.VIEW_AND_MANAGE} element={<ViewAndManage />} />
        <Route path={ROUTES.PARKING_HISTORY} element={<ParkingHistory />} />
      </Routes>
    </>
  );
}

export default App;
