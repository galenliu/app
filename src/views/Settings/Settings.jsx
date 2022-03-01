import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from "@mui/material/List";
import {useTranslation} from "react-i18next";
import {CssBaseline, ListItem, ListItemButton} from "@mui/material";
import clsx from "clsx";
import {AppContext} from "../../App";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import enTrans from "../../i18n/en-us.json"
import {useNavigate} from "react-router-dom";
import {SettingsList} from "../../js/settingsList";


const useStyles = makeStyles((theme) => ({

    listItem: {
        maxWidth: 400,
        minWidth: 300,
    }

}))


export default function Settings(props) {
    const {setTitle} = useContext(AppContext)
    const classes = useStyles();
    const {t} = useTranslation();
    const navigate = useNavigate()

    useEffect(() => {
        setTitle(t(enTrans.Settings))
    })

    return (
        <>
            <Grid sx={{marginTop: "40px", marginLeft: "12px", justifyContent: "center"}} container spacing={2}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {
                            Object.keys(SettingsList).map((k, index) => (
                                <ListItem disablePadding key={index} onClick={() => (navigate(SettingsList[k].Path))}>
                                    <ListItemButton className={classes.listItem}>
                                        <ListItemIcon>
                                            {SettingsList[k].ListItemIcon}
                                        </ListItemIcon>
                                        <ListItemText primary={t(SettingsList[k].Title)}/>
                                        <NavigateNextIcon/>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </nav>
            </Grid>
        </>
    )
}
