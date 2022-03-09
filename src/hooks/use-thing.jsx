import React, {useEffect, useState} from "react";
import useOnOffSwitch from "./use-onOffSwitch";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";


export default function useThing({gateway,thingId}) {

    const [thing,setThing] =useState(null)

    useEffect(()=>{
       gateway.getThing(thingId).then((thing)=>{
           createThingFromCapability()
       })
    },[])

    const setProperty = (name, value) => {
        const {thing} = props
        return thing.model.setProperty(name, value)
    }

    return [thing,setProperty]
}