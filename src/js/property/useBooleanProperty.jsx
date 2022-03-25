import useProperty from "./useProperty";
import {useEffect} from "react";


export default function useBooleanProperty(thing,name) {

    console.log("@@@@thing,name", thing,name)

    if (!thing || !name) {
        return null
    }
    const {property, value, setValue} = useProperty(thing, thing.onProperty)

    useEffect(() => {

    },[property])

    function setProperty(value) {
        // if(typeof value === "boolean"){
        setValue(value)
        // }
    }

    return {property, value, setValue: setProperty}
}