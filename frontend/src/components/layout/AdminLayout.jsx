import { Outlet } from "react-router-dom";

import Navbar from '../navbar/NavbarTemp1'

const AdminLayout = () => {
    return (
        <div className="">
          
                <Navbar />
                <Outlet /> 
        
        </div>
    );
};

export default AdminLayout;
