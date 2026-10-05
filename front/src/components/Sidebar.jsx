import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery
} from "@mui/material";

import {
    Link
} from "react-router-dom";


const drawerWidth = 240;


function Sidebar(){

    const mobile =
        useMediaQuery("(max-width:900px)");



    return (

        <Drawer

            variant={
                mobile
                ?
                "temporary"
                :
                "permanent"
            }


            sx={{

                width: drawerWidth,


                flexShrink:0,


                "& .MuiDrawer-paper":{

                    width: drawerWidth,

                    boxSizing:"border-box"

                }

            }}

        >


            <List>


                <ListItem
                    component={Link}
                    to="/categories"
                >

                    <ListItemText
                        primary="Catégories"
                    />


                </ListItem>


            </List>


        </Drawer>

    );

}


export default Sidebar;