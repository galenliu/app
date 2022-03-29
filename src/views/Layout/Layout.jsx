import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate} from "react-router-dom";
import {MenuList, DividerBottomList, Path} from "../../js/menuList";
import {drawerWidth} from "src/js/constants";
import {Fab} from "@mui/material";


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), // necessary for content to be below app bar
    ...theme.mixins.toolbar, justifyContent: 'flex-end',
}));


export default function Layout(props) {
    const theme = useTheme();
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleClick(url) {
        setOpen(false)
        navigate(url)
    }

    return (
        <>
            <Fab
                color="primary"
                size='medium'
                onClick={handleDrawerOpen}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    left: (theme) => theme.spacing(1),
                }}
            >
                <MenuIcon/>
            </Fab>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <Drawer
                    sx={{
                        width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                            width: drawerWidth, boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {Object.keys(MenuList).map((k, index) => (
                            <ListItem button key={index} onClick={() => handleClick(MenuList[k].Path)}>
                                <ListItemIcon>
                                    {MenuList[k].ListItemIcon}
                                </ListItemIcon>
                                <ListItemText primary={t(MenuList[k].Title)}/>
                            </ListItem>))}

                    </List>
                    <Divider/>
                    <List>
                        {Object.keys(DividerBottomList).map((k, index) => (
                            <ListItem button key={index} onClick={() => handleClick(DividerBottomList[k].Path)}>
                                <ListItemIcon>
                                    {DividerBottomList[k].ListItemIcon}
                                </ListItemIcon>
                                <ListItemText primary={t(DividerBottomList[k].Title)}/>
                            </ListItem>))}
                    </List>
                </Drawer>
            </Box>
            <Outlet/>
        </>);


}
