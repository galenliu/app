import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";


export default function useOnOffSwitch(props) {
    const [on, SetOn] = useState()

    useEffect(() => {
        let {thing} = props
        const updateProperty = (data) => {
            let {thing} = props
            for (let name in data) {
                if (name === thing.onProperty) {
                    SetOn(value)
                }
            }
        }
        thing.model.subscribe(Constants.PROPERTY_STATUS, updateProperty)
    })
    return [on]
}