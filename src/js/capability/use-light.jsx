import {useEffect, useState} from "react";
import React from "react";
import useBooleanProperty from "../property/useBooleanProperty";
import useStringProperty from "../property/useStringProperty";
import useIntegerProperty from "../property/useIntegerProperty";
import useOnOffSwitch from "./use-on-off-switch";
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"


export function useLight(description) {
    if(!description){
        return null
    }
    const {t} = useTranslation();
    const {thing, onProperty} = useOnOffSwitch(description)
    const [state, setState] = useState("")
    const brightnessProperty = useBooleanProperty(thing, thing?.brightnessProperty)
    const colorProperty = useStringProperty(thing, thing?.colorProperty)
    const colorTemperatureProperty = useIntegerProperty(thing, thing?.colorTemperatureProperty)
    const colorModeProperty = useStringProperty(thing, thing?.colorModeProperty)

    useEffect(() => {
        if (!thing.connected) {
            setState(t(enTrans.disable))
        } else {
            if (onProperty.value) {
                if (brightnessProperty !== null && brightnessProperty.value !== 0) {
                    setState(brightnessProperty.value + "%")
                } else {
                    setState(enTrans.On)
                }

            } else {
                setState(enTrans.Off)
            }
        }

    }, [brightnessProperty?.value, thing?.connected])

    return {
        thing: {...thing, state: state},
        onProperty,
        brightnessProperty,
        colorProperty,
        colorTemperatureProperty,
        colorModeProperty
    }
}