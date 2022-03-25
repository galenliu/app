import React, {useEffect} from "react";
import useThing from "./use-thing";
import useBooleanProperty from "../property/useBooleanProperty";


export default function useOnOffSwitch(description) {
    if (!description) {
        return null
    }
    const thing = useThing(description)
    const onProperty = useBooleanProperty(thing, thing?.onProperty)

    useEffect(() => {
        console.log("useThing:", thing, "description:", description)
    })

    return {thing, onProperty}
}