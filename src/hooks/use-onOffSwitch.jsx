import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";



export default function useOnOffSwitch(thing) {
    const [on, SetOn] = useState(Boolean)
   console.log("111111111111111",thing)
    const setOn= ()=>{
        thing.model.setProperty(thing.onProperty,!on)
    }

    useEffect(() => {
        const updateProperty = (name,value) => {
            if(name === thing.onProperty){
                SetOn(value)
            }
        }
        thing.model.subscribe(Constants.PROPERTY_STATUS, updateProperty)
        return ()=>{
            thing.model.unsubscribe(Constants.PROPERTY_STATUS, updateProperty)
        }
    })
    return [on,setOn]
}