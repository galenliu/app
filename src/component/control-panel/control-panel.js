import React from "react";
import {ThingType} from "../../js/constant";
import {LightControlPanel} from "./light-control-panel";


export default function ControlPanel(props) {

  if (props.selectedCapability === ThingType.Light) {
    return <LightControlPanel {...props}/>
  }

}
