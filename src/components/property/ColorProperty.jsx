import React, {useEffect, useState} from "react"
import {HexColorPicker} from "react-colorful";
import {useTranslation} from "react-i18next";
import {ListItem, ListItemText, ListSubheader} from "@mui/material";
import enTrans from "src/js/i18n/en-us.json";
import Switch from "@mui/material/Switch";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

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
        <Card className="colorListItem" sx={{
            width: "100%",
            borderRadius: 3,
            backgroundColor: [property.value ? "background.on" : "background.off"]
        }}>
            <Box sx={{m:"20px"}}>
            <HexColorPicker color={property.value? property.value: ""} onChange={(event) => setValue(event)}/>
            </Box>
        </Card>
    )
}


