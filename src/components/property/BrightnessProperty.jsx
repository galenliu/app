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

export default function BrightnessProperty({property}) {

    const detail = property.property.detail
    const {t} = useTranslation()
    const [value, setValue] = useState(property.value)
    const brightLevels = ["#212121", '#616161', '#9e9e9e', '#e0e0e0', '#f5f5f5']

    useEffect(() => {
        property.setValue(value)
    }, [value])

    return (
        <PropertyCard>
            <Stack sx={{flexDirection: "column", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <Typography variant="subtitle2">
                        {t(property.property.detail.label)}
                    </Typography>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems:"center"}}>
                    <Typography variant="h5">
                        {property.value}%
                    </Typography>
                    <Slider
                        sx={{mx: 5,width: "80%",mr:4}}
                        aria-label="Default"
                        step={detail.step}
                        value={value}
                        min={detail.min}
                        max={detail.max}
                        valueLabelDisplay="auto"
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                </Stack>
                <Stack sx={{alignItems: "center"}}>
                    <Circle
                        style={{marginTop: 5,marginLeft: 20}}
                        colors={brightLevels}
                        // color={property.value ? property.value : ""}
                        onChange={(color) => {
                            switch (color.hex) {
                                case brightLevels[0]:
                                    property.setValue(10)
                                    break
                                case brightLevels[1]:
                                    property.setValue(30)
                                    break
                                case brightLevels[2]:
                                    property.setValue(50)
                                    break
                                case brightLevels[3]:
                                    property.setValue(70)
                                    break
                                case brightLevels[4]:
                                    property.setValue(90)
                                    break
                            }
                        }}
                    />
                </Stack>
            </Stack>
        </PropertyCard>
    );
};

