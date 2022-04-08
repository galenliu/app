import React, {useContext, useEffect, useState} from "react";
import useThing from "./use-thing";
import useBooleanProperty from "../property/use-boolean-property";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import {AppContext} from "../../App";
import {createThingFromCapability} from "../../schema-impl/capability/capabilities";
import OnOffSwitch from "../../schema-impl/capability/on-off-switch";
import useProperty from "../property/use-property";

export default function useOnOffSwitch(description) {
    const {t} = useTranslation();
    const {thingModel, connected} = useThing(description)

    //description新建一个OnOffSwitch类
    const thing = new OnOffSwitch(thingModel, description, null)

    const onProperty = useProperty(thing, thing?.onProperty, 50)
    const [state, setState] = useState()

    useEffect(() => {
        if (connected) {
            if (onProperty.value) {
                setState(t(enTrans.On))
            } else {
                setState(t(enTrans.Off))
            }
        } else {
            setState(t(enTrans.Disconnected))
        }
    }, [connected, onProperty.value])

    useEffect(() => {
    }, [thing])

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
        connected,
        state,
    }
}