import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {InputLabel, ListItem, MenuItem, Select, Slider, Stack, SvgIcon} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Circle} from "@uiw/react-color";
import PropertyCard from "./PropertyCard";
import FormControl from "@mui/material/FormControl";
import {PropertyCardTitle} from "../typography";

export default function ThermostatModelProperty({property}) {

    const {t} = useTranslation()


    const [mode, setMode] = useState(property.value)

    useEffect(() => {
        setMode(property.value)
    }, [property.value])

    useEffect(() => {
    }, [property])


    const handleChange = (event) => {
        property.setValue(event.target.value);
    };

    return (
        <PropertyCard>
            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <PropertyCardTitle>
                        {t(property?.label)}
                    </PropertyCardTitle>
                </Stack>
                <FormControl sx={{mr: 4}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mode}
                        label="Age"
                        onChange={handleChange}
                    >
                        {
                            property?.choices.map(i =>
                                <MenuItem sx={{color: "info.main"}} key={i} value={i}>{t(i)}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Stack>

        </PropertyCard>
    );
};