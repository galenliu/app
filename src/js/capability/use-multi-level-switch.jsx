import useOnOffSwitch from "./use-on-off-switch";
import {useEffect} from "react";
import useNumberProperty from "../property/use-number-property";

export function useMultiLevelSwitch(description) {

    const {thing,onProperty} = useOnOffSwitch(description)
    const levelProperty = useNumberProperty(thing, thing?.levelProperty)

    useEffect(() => {
    }, [])
    return {onProperty, levelProperty}
}