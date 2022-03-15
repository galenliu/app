import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";

export default function BrightnessProperty(props) {

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
        <ListItem>
            <Slider
                defaultValue={70}
                aria-label="Default"
                step={property.detail.step}
                min={property.detail.min}
                max={property.detail.max}
                valueLabelDisplay="auto"
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            />
        </ListItem>
    );
};