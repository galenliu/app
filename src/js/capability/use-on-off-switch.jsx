import React, {useEffect} from "react";
import useThing from "./use-thing";
import useBooleanProperty from "../property/useBooleanProperty";


export default function useOnOffSwitch(description) {

    const thing = useThing(description)
    const onProperty = useBooleanProperty(thing,thing?.onProperty)

    useEffect(() => {

    }, [thing])

    return {thing, onProperty}
}