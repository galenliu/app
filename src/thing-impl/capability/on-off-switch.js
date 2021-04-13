import React, {useState} from "react";
import Thing from "./thing";

'use strict';


function useOnProperty(props) {
    const [property, setOnproperty] = useState()

    let onProperty = null
    for (const name in props.displayedProperties) {
        const type = props.displayedProperties[name].property['@type'];
        if (type === 'OnOffProperty') {
            onProperty = name;
            break;
        }
        if (onProperty === null && props.displayedProperties.hasOwnProperty('on')) {
            onProperty = 'on';
        }
    }
    setOnproperty(onProperty)
    return [property]
}

export default function OnOffSwitch(props) {

    const [OnProperty] = useOnProperty(props)
    const [on, setOn] = useState()

    function handleClick() {
        if (OnProperty === null && !props.displayedProperties.hasOwnProperty(OnProperty)) {
            return
        }
        props.displayedProperties[OnProperty].model.setProperty(OnProperty, !on)
    }


    return (
        <Thing {...props} handleClick={handleClick}/>
    )
}


