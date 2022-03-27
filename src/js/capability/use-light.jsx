import {useEffect, useState} from "react";
import React from "react";
import useBooleanProperty from "../property/use-boolean-property";
import useStringProperty from "../property/use-string-property";
import useIntegerProperty from "../property/use-integer-property";
import useOnOffSwitch from "./use-on-off-switch";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"


export function useLight(description) {

    const {t} = useTranslation();
    const {thing, onProperty} = useOnOffSwitch(description)
    const [state, setState] = useState("")
    const brightnessProperty = useIntegerProperty(thing, thing?.brightnessProperty)
    const colorProperty = useStringProperty(thing, thing?.colorProperty)
    const colorTemperatureProperty = useIntegerProperty(thing, thing?.colorTemperatureProperty)
    const colorModeProperty = useStringProperty(thing, thing?.colorModeProperty)

    useEffect(() => {

    }, [])


    useEffect(() => {
        if (!thing.connected) {
            setState(t(enTrans.Disconnected))
        } else {
            if (onProperty.value) {
                if (brightnessProperty && brightnessProperty.value !== undefined && brightnessProperty.value !== 0) {
                    setState(brightnessProperty.value + "%")
                } else {
                    setState(t(enTrans.On))
                }
            } else {
                setState(t(enTrans.Off))
            }
        }
    }, [onProperty, brightnessProperty, thing.connected])

    return {
        thing,
        state,
        onProperty,
        brightnessProperty,
        colorProperty,
        colorTemperatureProperty,
        colorModeProperty
    }
}