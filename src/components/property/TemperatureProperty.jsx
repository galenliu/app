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

export default function TemperatureProperty({property}) {

    const {t} = useTranslation()

    const detail = property.detail

    useEffect(() => {

    }, [])

    return (
        <PropertyCard>
            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <Typography variant="subtitle2" sx={{color:"info.main"}}>
                        {t(detail?.label)}
                    </Typography>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h5">
                        {property.value}℃
                    </Typography>
                </Stack>
            </Stack>

        </PropertyCard>
    );
};