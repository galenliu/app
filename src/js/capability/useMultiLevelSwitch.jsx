import useOnOffSwitch from "./use-on-off-switch";
import {useEffect} from "react";
import useNumberProperty from "../property/useNumberProperty";

export function useMultiLevelSwitch(description) {

    const {thing,onProperty} = useOnOffSwitch(description)
    const levelProperty = useNumberProperty(thing, thing?.levelProperty)

    useEffect(() => {
        console.log("useMultiLevelSwitch:", thing)
        console.log("useMultiLevelSwitch description:", description)
    }, [])
    return {onProperty, levelProperty}
}