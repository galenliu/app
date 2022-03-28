import React, {useEffect, useState} from "react"
import {Circle, Wheel} from '@uiw/react-color';
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";
import Card from "@mui/material/Card";
import PropertyCard from "./PropertyCard";

export default function ColorProperty(props) {
    const {t} = useTranslation()
    const {property} = props
    const detail = property.property.detail
    const [colors, setColors] = useState(['#ff0000', '#00ff00', '#0000ff', '#f47920', '#2a5caa', '#45b97c', '#45b97c'])


    useEffect(() => {
        if (!colors.includes(property.value)) {
            let copy = colors
            copy.shift()
            copy.push(property.value)
            setColors([...copy])
        }
    }, [property.value])

    return (
        <PropertyCard>
            <Stack sx={{
                m: "20px", flexDirection: "center",
                alignItems: "center",
            }}>
                <Wheel
                    width={200}
                    height={200}
                    color={property.value ? property.value : ""}
                    onChange={(color) => property.setValue(color.hex)}
                />
                <Circle
                    style={{marginTop: 20}}
                    colors={colors}
                    color={property.value ? property.value : ""}
                    onChange={(color) => property.setValue(color.hex)}
                />
            </Stack>
        </PropertyCard>
    )
}


