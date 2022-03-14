import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";
import useProperty from "./useProperty";


export default function useOnOffSwitch(thing) {
    const {value: on, set} = useProperty(thing, thing.onProperty)

    function setOn() {
        if (thing) {
            set(!on)
        }
    }

    return {on, setOn}
}