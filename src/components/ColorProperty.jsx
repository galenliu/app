import React, {useEffect, useState} from "react"
import {HexColorPicker} from "react-colorful";


export default function ColorProperty(props) {
    const {property} = props
    const [color, setColor] = useState(property.value)

    useEffect(()=>{

    },[color])

    return (
        <HexColorPicker color={color? color:"#ffffff"} onChange={setColor}/>
    )
}