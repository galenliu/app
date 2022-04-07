import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PropertyCard from "./PropertyCard";

export default function LevelProperty({property}) {

    const {t} = useTranslation()
    const [value, setValue] = useState(property.value)


    useEffect(() => {
        property.setValue(value)
    }, [value])

    return (
        <PropertyCard>

            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <Typography variant="subtitle1">
                        {t(property?.label)}
                    </Typography>

                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h5">
                        {property.value}%
                    </Typography>
                    <Slider
                        sx={{mx: 5, width: "80%", mr: 4}}
                        defaultValue={100}
                        value={value}
                        aria-label="Default"
                        step={property.step || 1}
                        min={property?.min || 1}
                        max={property?.max || 100}
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