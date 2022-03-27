import React, {useEffect, useState} from "react"
import {Circle, Wheel} from '@uiw/react-color';
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";
import Card from "@mui/material/Card";

export default function ColorProperty(props) {
    const {t} = useTranslation()
    const {property} = props
    const detail = property.property.detail
    const [colors, setColors] = useState(['#ff0000', '#00ff00', '#0000ff', '#DBDF00', '#F44E3B', '#FE9200', '#FCDC00'])


    useEffect(() => {
        if (!colors.includes(property.value)) {
            let copy = colors
            copy.shift()
            copy.push(property.value)
            setColors([...copy])
        }
    }, [property.value])

    return (
        <Card
            sx={{
                boxShadow: 3,
                borderRadius: 3,
            }}>
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
        </Card>
    )
}


