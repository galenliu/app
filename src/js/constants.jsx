import DomainIcon from "@mui/icons-material/Domain";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import enTrans from "src/js/i18n/en-us.json"

export const PATHS = {
    Home: "/home",
    Rules: "/rules",
    Settings: "/settings",
    Login: "/login",
    Users: "/users",
    Register: "/register",
    InstalledAddons: "/installed_addons",
    DiscoverAddons: "/discover_addons",
    NewThings: "/new_things"
}

const Constants = {
    CONNECTED: 'connected',
    DELETE_THING: 'deleteThing',
    DELETE_THINGS: 'deleteThings',
    EVENT_OCCURRED: 'eventOccurred',
    PROPERTY_STATUS: 'propertyStatus',
    REFRESH_THINGS: 'refreshThings',
    DELETE_GROUP: 'deleteGroup',
    DELETE_GROUPS: 'deleteGroups',
    ThingFormat: {
        INTERACTIVE: 0,
        EXPANDED: 1,
        LINK_ICON: 2,
    },
    WoTOperation: {
        READ_PROPERTY: 'readproperty',
        WRITE_PROPERTY: 'writeproperty',
        INVOKE_ACTION: 'invokeaction',
        READ_ALL_PROPERTIES: 'readallproperties',
        WRITE_MULTIPLE_PROPERTIES: 'writemultipleproperties',
        SUBSCRIBE_ALL_EVENTS: 'subscribeallevents',
        UNSUBSCRIBE_ALL_EVENTS: 'unsubscribeallevents',
        QUERY_ALL_ACTIONS: 'queryallactions',
    },
    ORIGIN: window.location.origin
}

export const Capability = {
    Alarm: "Alarm",
    AirQualitySensor: "AirQualitySensor",
    BarometricPressureSensor: "BarometricPressureSensor",
    BinarySensor: "BinarySensor",
    Camera: "Camera",
    ColorControl: "ColorControl",
    ColorSensor: "ColorSensor",
    DoorSensor: "DoorSensor",
    EnergyMonitor: "EnergyMonitor",
    HumiditySensor: "HumiditySensor",
    LeakSensor: "LeakSensor",
    Light: "Light",
    Lock: "Lock",
    MotionSensor: "MotionSensor",
    MultiLevelSensor: "MultiLevelSensor",
    MultiLevelSwitch: "MultiLevelSwitch",
    OnOffSwitch: "OnOffSwitch",
    PushButton: "PushButton",
    SmartPlug: "SmartPlug",
    SmokeSensor: "SmokeSensor",
    TemperatureSensor: "TemperatureSensor",
    Thermostat: "Thermostat",
    VideoCamera: "VideoCamera",

}

export const Events = {
    CONNECTED: 'connected',
    DELETE_THING: 'deleteThing',
    DELETE_THINGS: 'deleteThings',
    EVENT_OCCURRED: 'eventOccurred',
    PROPERTY_STATUS: 'propertyStatus',
    ICON_STATUS: 'iconStatus',
    REFRESH_THINGS: 'refreshThings',
    VALUE_CHANGED: "valueChanged"
}

export const  drawerWidth = 20;

export const settingItems = {
    Domain: {
        ListItemIcon: <DomainIcon/>,
        Title: enTrans.Domain,
        Path: "/domain"
    },
    Addons: {
        ListItemIcon: <ExtensionIcon/>,
        Title: enTrans.Addons,
        Path: PATHS.InstalledAddons
    },
    Users: {
        ListItemIcon: <PersonIcon/>,
        Title: enTrans.Users,
        Path: "/users"
    },
    Time: {
        ListItemIcon: <AccessTimeIcon/>,
        Title: enTrans.Time,
        Path: "/time"
    }
}


export default Constants
