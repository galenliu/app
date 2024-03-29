import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider, Stack, SvgIcon} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Circle} from "@uiw/react-color";
import PropertyCard from "./PropertyCard";
import {PropertyCardState, PropertyCardTitle} from "../typography";

export default function ColorTemperatureProperty({property}) {

    const {t} = useTranslation()
    const [value, setValue] = useState(property.value)

    useEffect(() => {
        property.setValue(value)
    }, [value])

    useEffect(() => {
        setValue(value)
    }, [property.value])


    return (
        <PropertyCard>
            <Stack sx={{flexDirection: "column", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <PropertyCardTitle>
                        {t(property.label)}
                    </PropertyCardTitle>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <PropertyCardState>
                        {property?.value}K
                    </PropertyCardState>
                    <Slider
                        sx={{mx: 5, width: "80%", mr: 4}}
                        aria-label="Default"
                        step={property.step}
                        value={value}
                        min={property.min}
                        max={property.max}
                        valueLabelDisplay="auto"
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                </Stack>

            </Stack>
        </PropertyCard>
    );
};

