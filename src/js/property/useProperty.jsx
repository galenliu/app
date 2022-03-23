import React, {useEffect, useState} from "react";
import BrightnessDetail from "../../schema-impl/property/brightness";

export default function useProperty(property) {
    const name = property.detail.name
    const readOnly = property.detail.readOnly
    const label = property.detail.label


    useEffect(() => {

    }, [value])

    function set(value) {
        console.log(value, name)
        thing.model.setProperty(name, value)
    }

    return {name}
}

