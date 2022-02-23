import React, {useState} from "react";
import useOnOffSwitch from "./use-onOffSwitch";


export default function useThing(props) {
    const setProperty = (name, value) => {
        const {thing} = props
        return thing.model.setProperty(name, value)
    }
    return [setProperty]
}