import {useEffect, useState} from "react";
import React from "react";
import useBooleanProperty from "../property/use-boolean-property";
import useStringProperty from "../property/use-string-property";
import useIntegerProperty from "../property/use-integer-property";
import useOnOffSwitch from "./use-on-off-switch";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import {gateway} from "../../main";
import useNumberProperty from "../property/use-number-property";


export function useThermostat(description) {

    const {t} = useTranslation();
    const {thing} = useOnOffSwitch(description)
    const [state, setState] = useState("")
    const temperatureProperty = useNumberProperty(thing, thing?.temperatureProperty)

    useEffect(() => {

    }, [])


    useEffect(() => {
        if (!thing.connected) {
            setState(t(enTrans.Disconnected))
        } else {
            if (temperatureProperty.value) {
                if (temperatureProperty && temperatureProperty.value) {
                    setState(temperatureProperty.value + "%")
                } else {
                    setState(t(enTrans.On))
                }
            } else {
                setState(t(enTrans.Off))
            }
        }
    }, [temperatureProperty.value, thing.connected])

    return {
        thing,
        state,
        temperatureProperty,
    }
}