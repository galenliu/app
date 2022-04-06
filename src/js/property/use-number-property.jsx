import {useEffect, useState} from "react";
import Constants from "src/js/constants";
import useDebouncy from "use-debouncy/lib/effect";
import useProperty from "./use-property";


export default function useNumberProperty(thing, name) {

    const {property, value, setValue} = useProperty(thing, name)

    function setProperty(value) {

        if (typeof value === "number") {
            setValue(value)
        }
    }

    return {...property, value, setValue: setProperty}
}