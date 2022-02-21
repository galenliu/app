import useOnOffSwitch from "./use-onOffSwitch";
import {useEffect, useState} from "react";
import Constants from "../js/constant";


export default function useLight(props) {
    const [on] = useOnOffSwitch(props.thing)
    const [level, setLevel] = useState(null)
    const [color, setColor] = useState(null)
    const [colorTemperature, setColorTemperature] = useState(null)
    const [colorMode, setColorMode] = useState(null)

    useEffect(() => {

        const updateLevel = (value) => {
            setLevel(value)
        }
        const updateColor = (value) => {
            setColor(value)
        }
        const updateColorTemperature = (value) => {
            setColorTemperature(value)
        }
        const updateColorMode = (value) => {
            setColorMode(value)
        }
        let {thing} = props
        let brightnessProperty = thing.properties[thing.brightnessProperty]
        let colorProperty = thing.properties[thing.colorProperty]
        let colorTemperatureProperty = thing.properties[thing.colorTemperatureProperty]
        let colorModeProperty = thing.properties[thing.colorModeProperty]

        if (brightnessProperty !== null) {
            brightnessProperty.on(Constants.VALUE_CHANGED, updateLevel)
        }
        if (colorProperty !== null) {
            colorProperty.on(Constants.VALUE_CHANGED, updateColor)
        }
        if (colorTemperatureProperty !== null) {
            colorTemperatureProperty.on(Constants.VALUE_CHANGED, updateColorTemperature)
        }
        if (colorModeProperty !== null) {
            colorModeProperty.on(Constants.VALUE_CHANGED, updateColorMode)
        }

        return () => {
            thing.removeListener(Constants.VALUE_CHANGED, updateLevel)
            thing.removeListener(Constants.VALUE_CHANGED, updateColor)
            thing.removeListener(Constants.VALUE_CHANGED, updateColorTemperature)
            thing.removeListener(Constants.VALUE_CHANGED, updateColorMode)
        }

    }, [])
    return [on, level, color, colorTemperature, colorMode]
}

