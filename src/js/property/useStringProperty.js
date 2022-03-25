import {useEffect, useState} from "react";
import useProperty from "./useProperty";


export default function useStringProperty(thing, name) {
    if (!thing || !name) {
        return null
    }

    const {property, value, setValue} = useProperty(thing, name)

    function setProperty(value) {

        setValue(value)

    }

    return {...property, value, setValue: setProperty}
}