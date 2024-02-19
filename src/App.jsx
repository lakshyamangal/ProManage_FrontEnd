import { useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage"

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path="/Dashboard" element={<DashboardPage/>}/>
  {/*bhen ki chut*/}
 </Routes>
 </BrowserRouter>
  );
}

export default App;
