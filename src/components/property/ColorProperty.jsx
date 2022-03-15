import React, {useEffect, useState} from "react"
import {HexColorPicker} from "react-colorful";
import {useTranslation} from "react-i18next";
import {ListItem, ListItemText, ListSubheader} from "@mui/material";
import enTrans from "../../i18n/en-us.json";
import Switch from "@mui/material/Switch";
import useDebouncy from "use-debouncy/lib/effect";

export default function ColorProperty(props) {
    const {t} = useTranslation()
    const [value, setValue] = useState("");
    const {property} = props

    useDebouncy(
        () => property.setValue(value),
        800, // number of milliseconds to delay
        [value], // array values that the debounce depends (like as useEffect)
    );

    useEffect(() => {

    }, [])

    return (
        <ListItem className="colorListItem" sx={{mt: 1, borderStyle: "solid", justifyContent: "center"}}>
            <HexColorPicker color={property.value} onChange={(event) => setValue(event)}/>
        </ListItem>
    )
}


