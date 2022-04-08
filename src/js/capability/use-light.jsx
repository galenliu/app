import {useEffect, useState} from "react";
import React from "react";
import useBooleanProperty from "../property/use-boolean-property";
import useStringProperty from "../property/use-string-property";
import useIntegerProperty from "../property/use-integer-property";
import useOnOffSwitch from "./use-on-off-switch";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import {gateway} from "../../main";
import useThing from "./use-thing";
import Light from "../../schema-impl/capability/light";
import useProperty from "../property/use-property";


export function useLight(description) {

    const {t} = useTranslation();
    const {thingModel, connected} = useThing(description)

    const [state, setState] = useState("")
    //description新建一个OnOffSwitch类
    const thing = new Light(thingModel, description, null)


    const onProperty = useProperty(thing, thing?.onProperty, 50)
    const brightnessProperty = useProperty(thing, thing?.brightnessProperty)
    const colorProperty = useProperty(thing, thing?.colorProperty)
    const colorTemperatureProperty = useProperty(thing, thing?.colorTemperatureProperty)
    const colorModeProperty = useProperty(thing, thing?.colorModeProperty, 50)


    useEffect(() => {
        if (!connected) {
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
    }, [onProperty, brightnessProperty, connected])

    return {
        thing: {
            connected: connected,
            title: thing.title,
            id: thing.id,
            state: state,
            "@type": thing["@type"],
            selectedCapability: thing.selectedCapability
        },
        onProperty,
        brightnessProperty,
        colorProperty,
        colorTemperatureProperty,
        colorModeProperty
    }
}