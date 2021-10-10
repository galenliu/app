import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from "@mui/material/List";
import {useTranslation} from "react-i18next";
import {CssBaseline, ListItemButton} from "@mui/material";
import clsx from "clsx";
import {AppContext} from "../App";
import Grid from "@mui/material/Grid";
import InstalledAddonsDialog from "./dialog/InstalledAddonsDialog";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {drawerWidth} from "../js/constant";
import {useNavigate} from "react-router";
import {SettingsList} from "../js/settingsList";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    listItem: {
        maxWidth: 400,
        minWidth: 300,
    }

}))


export default function Settings(props) {

    const classes = useStyles();
    const {t} = useTranslation();
    const {drawerOpen} = useContext(AppContext)
    const [addonsDialogShow, setAddonsDialogShow] = useState(false)
    const navigate = useNavigate()
    const {setAppNavTitle} = useContext(AppContext)

    useEffect(() => {
        setAppNavTitle(t("Settings"))
    }, [])

    function selectedItem(url) {
        if (url === "/addons") {
            setAddonsDialogShow(true)
        }
    }

    return (
        <>
            <CssBaseline/>
            {/*<TopBar add={false} title={t("Settings")}/>*/}
            <main className={clsx(classes.content, {
                [classes.contentShift]: !drawerOpen,
            })}>
                <Grid container justify="flex-start" alignItems="center" direction="column">
                    <div className={classes.drawerHeader}/>
                    <List component="nav" aria-label="main mailbox folders">
                        <Divider/>
                        {
                            Object.keys(SettingsList).map((k, index) => (
                                <>
                                    <ListItemButton key={index} button onClick={() => {
                                        selectedItem(SettingsList[k].Path)
                                    }} className={classes.listItem} variant="contained" elevation={2222}>
                                        <ListItemIcon>
                                            {SettingsList[k].ListItemIcon}
                                        </ListItemIcon>
                                        <ListItemText primary={t(SettingsList[k].Title)}/>
                                        <NavigateNextIcon/>
                                    </ListItemButton>
                                    <Divider/>
                                </>
                            ))
                        }

                    </List>
                </Grid>
            </main>
            <InstalledAddonsDialog open={addonsDialogShow} show={setAddonsDialogShow}/>
        </>
    )
}
