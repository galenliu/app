import {useEffect, useState} from "react";
import useProperty from "./use-property";


export default function useStringProperty(thing, name) {

    const {property, value, setValue} = useProperty(thing, name,100)

    function setProperty(value) {
        setValue(value)
    }
    useEffect(()=>{
        console.log("string value:",thing.title,"name:",name,value)
    })
    return {property, value, setValue: setProperty}
}