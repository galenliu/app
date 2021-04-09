/**
 * On/Off Switch.
 *
 * UI element representing an On/Off Switch.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import Thing from "./thing";
import {useState} from "react";

function useOnProperty(props) {
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
    return onProperty
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


