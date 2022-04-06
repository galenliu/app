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

export default function ThermostatModelProperty({property}) {

    const {t} = useTranslation()
    const [value, setValue] = useState(property.value)
    const detail = property.detail

    const [model, setModel] = useState(property.value)

    useEffect(() => {
        console.log("1111", property)
        property.setValue(value)
    }, [value])

    return (
        <PropertyCard>
            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <Typography variant="subtitle1">
                        {t(detail?.label)}
                    </Typography>
                </Stack>
                <FormControl sx={{mr:4}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={model}
                        label="Age"
                        // onChange={}
                    >
                        {
                            property.detail.choices.map(i =>
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Stack>

        </PropertyCard>
    );
};