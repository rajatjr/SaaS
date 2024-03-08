import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PublicRoutes from "./Routes/PublicRoutes";
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from "./Routes/PrivateRoutes";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/Adminhome";
import OrganizationSignUp from "./Components/Organization/OrganizationSignUp";
import Organizationlogin from "./Components/Organization/Organizationlogin";
import HomeOrganization from "./Components/Organization/HomeOrganization";
import UserSignupForm from "./Components/User/AddUsersignup";
import UserLogin from "./Components/User/UserLogin";
import UserDashboard from "./Components/User/UserDashboard";
import ProductDetails from './Components/User/ProductDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<PublicRoutes />}>
            <Route index element={<AdminLogin />}>
            </Route>

          </Route>

          <Route path="/adminhome" element={<PrivateRoutes />}>
            <Route index element={<AdminHome />}></Route>
          </Route>
          <Route path="/OrganizationSignUp" element={<OrganizationSignUp />}></Route>
          <Route path="/Organizationlogin" element={<Organizationlogin/>}></Route>
          <Route path="/homeorganization" element={<HomeOrganization />}></Route>
          <Route path="/usersignup" element={<UserSignupForm />}></Route>
          <Route path="/userlogin" element={<UserLogin />}></Route>
          <Route path="/userDashboard" element={<UserDashboard />}></Route>
          <Route path="/productDetails/:productId" element={<ProductDetails />} />


        
        </Routes>

        <ToastContainer />
      </BrowserRouter>



    </div>
  );
}

export default App;
