import useOnOffSwitch from "./use-on-off-switch";
import {useEffect, useState} from "react";
import useNumberProperty from "../property/use-number-property";
import enTrans from "../i18n/en-us.json";
import {useTranslation} from "react-i18next";

export function useMultiLevelSwitch(description) {

    const {t} = useTranslation();
    const {thing, onProperty} = useOnOffSwitch(description)
    const levelProperty = useNumberProperty(thing, thing?.levelProperty)
    const [state, setState] = useState("")

    useEffect(() => {
        if (!thing.connected) {
            setState(t(enTrans.Disconnected))
        } else {
            if (onProperty.value) {
                if (levelProperty && levelProperty.value !== undefined && levelProperty.value !== 0) {
                    setState(levelProperty.value.toString() + "%")
                } else {
                    setState(t(enTrans.On))
                }
            } else {
                setState(t(enTrans.Off))
            }
        }
    }, [onProperty, levelProperty, thing.connected])


    useEffect(() => {
    }, [])
    return {thing,onProperty, state, levelProperty}
}