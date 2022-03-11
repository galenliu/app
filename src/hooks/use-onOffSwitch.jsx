import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";
import useProperty from "./useProperty";


export default function useOnOffSwitch(thing) {
    const {value: on, setValue} = useProperty(thing, thing.onProperty)

    function setOn() {
        if (thing) {
            setValue(!on)
        }
    }

    return {on, setOn}
}