import useOnOffSwitch from "./use-onOffSwitch";
import {useEffect, useState} from "react";
import Constants from "../js/constant";
import useProperty from "./useProperty";


export default function useLight(thing) {

    const {on, setOn} = useOnOffSwitch(thing)
    const {level, set: setLevel} = useProperty(thing, thing.brightnessProperty)
    const {color, set: setColor} = useProperty(thing, thing.colorProperty)
    const {colorTemperature, set: setColorTemperature} = useProperty(thing, thing.colorTemperatureProperty)
    const {colorMode, set: setColorMode} = useProperty(thing, thing.colorModeProperty)

    useEffect(() => {
        console.log("use light date:", thing)
        if (thing === undefined) {
            return
        }
        const updateProperty = (name, value) => {
            if (name === thing.brightnessProperty) {
                setLevel(value)
            }
            if (name === thing.colorTemperatureProperty) {
                setColor(value)
            }
            if (name === thing.colorModeProperty) {
                setColorMode(value)
            }
            if (name === thing.colorTemperatureProperty) {
                setColorTemperature(value)
            }

        }
        console.log("use thing date:", thing)

        return () => {
            thing.unsubscribe(Constants.PROPERTY_STATUS, updateProperty)
        }
    }, [])

    return {on, setOn, level, setLevel, color, setColor, colorTemperature, setColorTemperature, colorMode, setColorMode}
}

