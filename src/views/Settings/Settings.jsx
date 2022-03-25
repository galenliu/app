import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from "@mui/material/List";
import {useTranslation} from "react-i18next";
import {CssBaseline, ListItem, ListItemButton, Stack} from "@mui/material";
import clsx from "clsx";
import {AppContext} from "../../App";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import enTrans from "src/js/i18n/en-us.json"
import {useNavigate} from "react-router-dom";
import {settingItems} from "src/js/constants";
import Box from "@mui/material/Box";


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
                        <Divider/>
                        {
                            Object.keys(settingItems).map((k, index) => (
                                <Stack key={index} spacing={0.5}>
                                    <ListItem disablePadding
                                              onClick={() => (navigate(settingItems[k].Path))}>
                                        <ListItemButton className={classes.listItem}>
                                            <ListItemIcon>
                                                {settingItems[k].ListItemIcon}
                                            </ListItemIcon>
                                            <ListItemText primary={t(settingItems[k].Title)}/>
                                            <NavigateNextIcon/>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider/>
                                </Stack>
                            ))
                        }
                    </List>
                </nav>
            </Grid>
        </>
    )
}
