import { Outlet, useLocation, Navigate } from "react-router-dom";
import Aside from "./Aside"; 
import { Box } from "@mui/material";
import { useState } from "react";

const componentNames: Record<string, string> = {
    "/login": "Login",
    "/register": "Register",
    "/": "Dashboard",
    "/manage": "Posts",
    "/contact": "Contact Us"
   
};

const Layout = (): JSX.Element => {
    const location = useLocation();
    const hideLayout = location.pathname === "/login" || location.pathname === "/register" 
    
    const isEditorRoute = /^\/edit-post\/\d+$/.test(location.pathname);
    const componentName = isEditorRoute ? "Editor" : componentNames[location.pathname] || "Unknown Component";

    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed');
        return saved === 'true';
    });

    const toggleCollapse = () => {
        setCollapsed(prev => {
            const newValue = !prev;
            localStorage.setItem('sidebar-collapsed', newValue.toString());
            return newValue;
        });
    };

    if (!isAuthenticated && !hideLayout) {
        return <Navigate to="/login" replace />;
    }
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {!hideLayout && <Aside collapsed={collapsed} toggleCollapse={toggleCollapse} />}
            <Box component="main" sx={{ 
                flexGrow: 1, marginLeft: hideLayout ? "0" : collapsed ? "68px" : "220px", transition: "margin-left 0.3s ease",
                position: "relative", // relative

                }}>
                {!hideLayout && (
                    <div style={{ borderBottom: "1px solid rgb(233, 233, 233)", padding: "16px 24px", fontSize:"32px",                        



                         
                    }}>
                        {componentName}
                    </div>
                )}
                <Outlet />
            </Box>
        </Box>
    )
    
}

export default Layout