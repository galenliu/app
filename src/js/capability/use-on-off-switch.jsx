import React, {useEffect, useState} from "react";
import useThing from "./use-thing";
import useBooleanProperty from "../property/use-boolean-property";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"

export default function useOnOffSwitch(description) {
    const {t} = useTranslation();
    const thing = useThing(description)
    const onProperty = useBooleanProperty(thing, thing?.onProperty)
    const [state, setState] = useState()


    useEffect(() => {
        if (thing.connected) {
            if (onProperty.value) {
                setState(t(enTrans.On))
            } else {
                setState(t(enTrans.Off))
            }
        } else {
            setState(t(enTrans.Disconnected))
        }

    }, [thing.connected, onProperty.value])

    useEffect(() => {

    }, [thing])

    return {thing, state, onProperty}
}