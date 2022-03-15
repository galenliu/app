import useOnOffSwitch from "./use-onOffSwitch";
import {useEffect, useState} from "react";
import Constants from "../js/constant";
import useProperty from "./useProperty";


export default function useLight(thing) {

    const {onProperty} = useOnOffSwitch(thing)
    const brightnessProperty = useProperty(thing, thing.brightnessProperty)
    const colorProperty = useProperty(thing, thing.colorProperty)
    const colorTemperatureProperty = useProperty(thing, thing.colorTemperatureProperty)
    const colorModeProperty = useProperty(thing, thing.colorModeProperty)


    return {onProperty, brightnessProperty, colorProperty, colorTemperatureProperty, colorModeProperty}
}

