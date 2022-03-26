import useProperty from "./use-property";
import {useEffect} from "react";


export default function useBooleanProperty(thing, name) {

    const {property, value, setValue} = useProperty(thing,name)

    useEffect(() => {

    }, [property])

    function setProperty(value) {
        setValue(value)
    }

    return {property, value, setValue: setProperty}
}