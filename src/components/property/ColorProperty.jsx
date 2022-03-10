import React, {useEffect, useState} from "react"
import {HexColorPicker} from "react-colorful";
import {useTranslation} from "react-i18next";

export default function ColorProperty(props) {
    const {t} = useTranslation()
    const {property} = props
    const [color, setColor] = useState(property.value)

    useEffect(()=>{

    },[color])

    return (
        <HexColorPicker color={property.value? property.value:"#ffffff"} onChange={property.setValue}/>
    )
}