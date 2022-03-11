import React, {useEffect, useState} from "react"
import {HexColorPicker} from "react-colorful";
import {useTranslation} from "react-i18next";
import {ListItem, ListItemText, ListSubheader} from "@mui/material";
import enTrans from "../../i18n/en-us.json";
import Switch from "@mui/material/Switch";

export default function ColorProperty(props) {
    const {t} = useTranslation()

    useEffect(() => {

    }, [])

    return (
        <ListItem sx={{mt:1,borderStyle: "solid",justifyContent:"center"}} >
            <HexColorPicker sx={{width:"100%"}} color={props.value ? props.value : "#ffffff"} onChange={(event)=>props.setColor(event)}/>
        </ListItem>
    )
}


