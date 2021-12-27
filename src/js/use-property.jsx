import React, {useEffect, useState} from "react"
import constant from "./constant";


export default function UseProperty({thingModel,name}) {
    const [value, setValue] = useState()
    useEffect(() => {
            function onPropertyValueChanged(value) {
                setValue(value)
            }
            thingModel.subscribe(constant.PROPERTY_STATUS,name,onPropertyValueChanged)
            return () => {
                thingModel.unsubscribe(constant.PROPERTY_STATUS,name, onPropertyValueChanged)
            }
        }, []
    )

    function setPropertyValue(value) {
        thingModel.handleSetPropertyValue(name,value)
    }

    return [value, setPropertyValue]
}