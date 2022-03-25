import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import {ListItem} from "@mui/material";
import {HexColorPicker} from "react-colorful";
import {Label} from "@mui/icons-material";

export default function ColorModeProperty(props) {
    const {t} = useTranslation()
    const {property} = props


    useEffect(() => {

    }, [])

    return (
        <ListItem className="colorListItem" sx={{mt: 1, borderStyle: "solid", justifyContent: "center"}}>
           <Label>{property.value}</Label>
        </ListItem>
    )
}