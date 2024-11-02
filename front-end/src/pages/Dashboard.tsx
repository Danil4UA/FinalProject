import GeneratePost from "../features/posts/GeneratePost"

import { Box } from "@mui/material"


const Dashboard = (): JSX.Element => {
    return (
        <>
        <Box style={{display: "flex"}}>
            <GeneratePost />
        </Box>
            
        </>
    )
}

export default Dashboard