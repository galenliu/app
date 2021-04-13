import React, {useContext} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from 'react-i18next';
import {useHistory} from "react-router-dom";
import {drawerWidth} from "../js/constant"
import {AppContext} from "../App"
import SettingsIcon from '@material-ui/icons/Settings';
import ListSubheader from "@material-ui/core/ListSubheader";
import RoomIcon from '@material-ui/icons/Room';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}));

export default function SideBar() {

    const classes = useStyles();
    const theme = useTheme()
    const {drawerOpen, setDrawerOpen} = useContext(AppContext)
    const history = useHistory()

    const {t} = useTranslation();

    function handleClick(url) {
        setDrawerOpen(false)
        history.push(url)
    }

    return (
        <>
            <Drawer
                className={classes.drawer}
                width="240"
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>

                <List>

                    <ListItem button key={"home"} onClick={() => handleClick("/home")}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Things')}/>
                    </ListItem>

                    <ListItem button key={"rules"} onClick={() => handleClick("/rules")}>
                        <ListItemIcon>
                            <AlarmOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Rules')}/>
                    </ListItem>

                    <ListItem button key={"settings"} onClick={() => handleClick("/settings")}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Settings')}/>
                    </ListItem>

                </List>
                <Divider/>
                <List subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        房间列表
                    </ListSubheader>
                }>
                    {['客厅', '餐厅', '卧室'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon><RoomIcon/></ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </>
    );
}
