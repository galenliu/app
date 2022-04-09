import useOnOffSwitch from "./use-on-off-switch";
import {useEffect, useState} from "react";
import enTrans from "../i18n/en-us.json";
import {useTranslation} from "react-i18next";
import useThing from "./use-thing";
import MultiLevelSwitch from "../../schema-impl/capability/multi-level-switch";
import useProperty from "../property/use-property";

export function useMultiLevelSwitch(description) {


    const {t} = useTranslation();
    const {thingModel, connected} = useThing(description)

    const [state, setState] = useState("")
    //description新建一个OnOffSwitch类
    const thing = new MultiLevelSwitch(thingModel, description, null)


    const onProperty = useProperty(thing, thing?.onProperty, 50)
    const levelProperty = useProperty(thing, thing?.levelProperty)

    useEffect(() => {
        if (!connected) {
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
    }, [onProperty.value, levelProperty.value, connected])


    useEffect(() => {
    }, [])
    return {
        thing: {
            connected: connected,
            title: thing.title,
            id: thing.id,
            state: state,
            "@type": thing["@type"],
            selectedCapability: thing.selectedCapability
        }, onProperty, state, levelProperty
    }
}