import React, {useState, useEffect} from "react"
import constant from "../js/constant";
import Api from "../js/api";


export default function usePropertyValue({propertyModel}) {
    const [value, setValue] = useState()

    useEffect(() => {
        if (propertyModel.default !== undefined) {
            setValue(propertyModel.default)
        } else {
            if (propertyModel.min !== undefined) {
                setValue(propertyModel.min)
            }
        }
        function onPropertyValueChanged(value) {
            setValue(value)
        }
        propertyModel.subscribe(constant.PROPERTY_STATUS, onPropertyValueChanged)
        return () => {
            propertyModel.unsubscribe(constant.PROPERTY_STATUS, onPropertyValueChanged)
        }
    }, [])

    function setPropertyValue(value){
        Api.putJson(`/things/${encodeURIComponent(propertyModel.thingId)}/properties/${encodeURIComponent(propertyModel.name)}`, value)
            .then((json)=>{
            setValue(json)
        }).catch(
            (error)=>{
                console.error(error)
            }
        )
    }

    return [value,setPropertyValue]
}