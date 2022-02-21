import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";


export  default function  useOnOffSwitch(props){
    const [on,SetOn] = useState()

    useEffect(()=>{
       const onChange=(value)=>{
           SetOn(value)
        }
        let {thing} = props
        const prop =thing.properties[thing.onProperty]
        if(thing.onProperty != null){
             if(prop!== null &&prop!== undefined){
                 prop.on(Constants.VALUE_CHANGED,onChange)
             }
        }
    })
    return [on]
}