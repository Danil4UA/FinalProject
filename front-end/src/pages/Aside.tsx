
import { Box } from "@mui/material";
import { Home, PostAdd, ContactMail, ArrowBack, ArrowForward  } from '@mui/icons-material';
import Profile from "./Profile";

interface AsideProps {
    collapsed: boolean
    toggleCollapse: ()=> void
}

const Aside = ({ collapsed, toggleCollapse }: AsideProps): JSX.Element => {

   
    return (
        <Box className={`side-bar ${collapsed ? 'collapsed' : ''}`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
                <div className={!collapsed ? "logo" : ""}>
                    {/* Logo */}
                </div>

                <div onClick={toggleCollapse} style={{ height: "25px", width: "25px", padding: "0", margin: "0" }}>
                    {collapsed ? <ArrowForward /> : <ArrowBack />}
                </div>

            </div>
            <div className="pages">
                <a href="/" className="page-button">
                    <Home sx={{ marginRight: "8px" }} /> {!collapsed && "Dashboard"}
                </a>
                <a href="/manage" className="page-button">
                    <PostAdd sx={{ marginRight: "8px" }} /> {!collapsed && "Posts"}
                </a>
                <a href="/contact" className="page-button">
                    <ContactMail sx={{ marginRight: "8px" }} /> {!collapsed && "Contact us"}
                </a>
            </div>
            <Profile collapsed={collapsed} />
        </Box>
    );
};

export default Aside;