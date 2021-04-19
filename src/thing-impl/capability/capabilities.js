'use strict';

import React from "react";
import {Light} from "./light"
import Thing from "./thing";
import {ThingType} from "../../js/constant";
import OnOffSwitch from "./on-off-switch";


export function createThingFromCapability(capability, thingModel, description) {
    if (capability) {
        switch (capability) {
            case ThingType.Light:
                return Light(thingModel, description);
            case ThingType.OnOffSwitch:
                return OnOffSwitch(thingModel, description);
        }
    }

    return Thing(thingModel, description);
}


// export function getClassFromCapability(capability) {
//     switch (capability) {
//         case 'OnOffSwitch':
//             return 'on-off-switch';
//         case 'MultiLevelSwitch':
//             return 'multi-level-switch';
//         case 'ColorControl':
//             return 'color-control';
//         case 'ColorSensor':
//             return 'color-sensor';
//         case 'EnergyMonitor':
//             return 'energy-monitor';
//         case 'BinarySensor':
//             return 'binary-sensor';
//         case 'MultiLevelSensor':
//             return 'multi-level-sensor';
//         case 'SmartPlug':
//             return 'smart-plug';
//         case 'Light':
//             return 'light';
//         case 'DoorSensor':
//             return 'door-sensor';
//         case 'MotionSensor':
//             return 'motion-sensor';
//         case 'LeakSensor':
//             return 'leak-sensor';
//         case 'SmokeSensor':
//             return 'smoke-sensor';
//         case 'PushButton':
//             return 'push-button';
//         case 'VideoCamera':
//             return 'video-camera';
//         case 'Camera':
//             return 'camera';
//         case 'TemperatureSensor':
//             return 'temperature-sensor';
//         case 'HumiditySensor':
//             return 'humidity-sensor';
//         case 'Alarm':
//             return 'alarm';
//         case 'Thermostat':
//             return 'thermostat';
//         case 'Lock':
//             return 'lock';
//         case 'BarometricPressureSensor':
//             return 'barometric-pressure-sensor';
//         case 'AirQualitySensor':
//             return 'air-quality-sensor';
//     }
//
//     return '';
// }

