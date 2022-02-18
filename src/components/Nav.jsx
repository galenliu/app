import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate} from "react-router";
import {useContext} from "react";
import {AppContext} from "../App";
import {DividerList, DividerBottomList} from "../js/dividerList";
import AddIcon from "@mui/icons-material/Add";
import {drawerWidth} from "../js/constant";


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    flexGrow: 1, padding: theme.spacing(3), transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), marginLeft: `-${drawerWidth}px`, ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }), marginLeft: 0,
    }),
}),);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), // necessary for content to be below app bar
    ...theme.mixins.toolbar, justifyContent: 'flex-end',
}));


export default function Nav(props) {
    const theme = useTheme();
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false);
    const {appNavTitle, setNewThingShow, addSButtonShow} = useContext(AppContext)

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

    return (<>

        <IconButton
            style={{
                float: "left",
                margin: "5px 5px"
            }}
            color="inherit"
            float="left"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
        >
            <MenuIcon/>
        </IconButton>

        <Box sx={{display: 'flex'}} >
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
                    {Object.keys(DividerList).map((k, index) => (
                        <ListItem button key={index} onClick={() => handleClick(DividerList[k].Path)}>
                            <ListItemIcon>
                                {DividerList[k].ListItemIcon}
                            </ListItemIcon>
                            <ListItemText primary={t(DividerList[k].Title)}/>
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

            <Main>
                <Outlet/>
            </Main>
        </Box></>);
}
