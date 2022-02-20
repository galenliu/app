import Alarm from './alarm' ;
import AirQualitySensor from './air-quality-sensor';
import BarometricPressureSensor from './barometric-pressure-sensor';
import BinarySensor from './binary-sensor';
import Camera from './camera';
import ColorControl from './color-control';
import ColorSensor from './color-sensor';
import DoorSensor from './door-sensor';
import EnergyMonitor from './energy-monitor';
import HumiditySensor from './humidity-sensor';
import LeakSensor from './leak-sensor';
import Light from './light';
import Lock from './lock';
import MotionSensor from './motion-sensor';
import MultiLevelSensor from './multi-level-sensor';
import MultiLevelSwitch from './multi-level-switch';
import OnOffSwitch from './on-off-switch';
import PushButton from './push-button';
import SmartPlug from './smart-plug';
import SmokeSensor from './smoke-sensor';
import TemperatureSensor from './temperature-sensor';
import Thermostat from './thermostat';
import Thing from './thing';
import VideoCamera from './video-camera';

function createThingFromCapability(capability, thingModel, description, format) {
    if (capability) {
        switch (capability) {
            case 'OnOffSwitch':
                return new OnOffSwitch(thingModel, description, format);
            case 'MultiLevelSwitch':
                return new MultiLevelSwitch(thingModel, description, format);
            case 'ColorControl':
                return new ColorControl(thingModel, description, format);
            case 'ColorSensor':
                return new ColorSensor(thingModel, description, format);
            case 'EnergyMonitor':
                return new EnergyMonitor(thingModel, description, format);
            case 'BinarySensor':
                return new BinarySensor(thingModel, description, format);
            case 'MultiLevelSensor':
                return new MultiLevelSensor(thingModel, description, format);
            case 'SmartPlug':
                return new SmartPlug(thingModel, description, format);
            case 'Light':
                return new Light(thingModel, description, format);
            case 'DoorSensor':
                return new DoorSensor(thingModel, description, format);
            case 'MotionSensor':
                return new MotionSensor(thingModel, description, format);
            case 'LeakSensor':
                return new LeakSensor(thingModel, description, format);
            case 'SmokeSensor':
                return new SmokeSensor(thingModel, description, format);
            case 'PushButton':
                return new PushButton(thingModel, description, format);
            case 'VideoCamera':
                return new VideoCamera(thingModel, description, format);
            case 'Camera':
                return new Camera(thingModel, description, format);
            case 'TemperatureSensor':
                return new TemperatureSensor(thingModel, description, format);
            case 'HumiditySensor':
                return new HumiditySensor(thingModel, description, format);
            case 'Alarm':
                return new Alarm(thingModel, description, format);
            case 'Thermostat':
                return new Thermostat(thingModel, description, format);
            case 'Lock':
                return new Lock(thingModel, description, format);
            case 'BarometricPressureSensor':
                return new BarometricPressureSensor(thingModel, description, format);
            case 'AirQualitySensor':
                return new AirQualitySensor(thingModel, description, format);
        }
    }

    return new Thing(thingModel, description, format);
}

function getClassFromCapability(capability) {
    switch (capability) {
        case 'OnOffSwitch':
            return 'on-off-switch';
        case 'MultiLevelSwitch':
            return 'multi-level-switch';
        case 'ColorControl':
            return 'color-control';
        case 'ColorSensor':
            return 'color-sensor';
        case 'EnergyMonitor':
            return 'energy-monitor';
        case 'BinarySensor':
            return 'binary-sensor';
        case 'MultiLevelSensor':
            return 'multi-level-sensor';
        case 'SmartPlug':
            return 'smart-plug';
        case 'Light':
            return 'light';
        case 'DoorSensor':
            return 'door-sensor';
        case 'MotionSensor':
            return 'motion-sensor';
        case 'LeakSensor':
            return 'leak-sensor';
        case 'SmokeSensor':
            return 'smoke-sensor';
        case 'PushButton':
            return 'push-button';
        case 'VideoCamera':
            return 'video-camera';
        case 'Camera':
            return 'camera';
        case 'TemperatureSensor':
            return 'temperature-sensor';
        case 'HumiditySensor':
            return 'humidity-sensor';
        case 'Alarm':
            return 'alarm';
        case 'Thermostat':
            return 'thermostat';
        case 'Lock':
            return 'lock';
        case 'BarometricPressureSensor':
            return 'barometric-pressure-sensor';
        case 'AirQualitySensor':
            return 'air-quality-sensor';
    }
    return '';
}

export {createThingFromCapability, getClassFromCapability};
