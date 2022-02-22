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
        let {thing} = props
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

        return () => {
            thing.unsubscribe(Constants.PROPERTY_STATUS, updateProperty)
        }
    }, [])

    return [on, level, color, colorTemperature, colorMode]
}

