/**
 * Thing.
 *
 * Represents an individual web thing.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import Constants from "../../js/constant"
import Units from "../../js/units"
import BrightnessDetail from '../property/brightness'
import ColorDetail from '../property/color'
import ColorModeDetail from '../property/color-mode'
import ColorTemperatureDetail from '../property/color-temperature'
import CurrentDetail from '../property/current'
import EnumDetail from '../property/enum'
import FrequencyDetail from '../property/frequency'
import HeatingCoolingDetail from '../property/heating-cooling'
import ImageDetail from '../property/image'
import InstantaneousPowerDetail from '../property/instantaneous-power'
import LeakDetail from '../property/leak'
import LevelDetail from '../property/level'
import LockedDetail from '../property/locked'
import MotionDetail from '../property/motion'
import NumberDetail from '../property/number'
import OnOffDetail from '../property/on-off'
import OpenDetail from '../property/open'
import PushedDetail from '../property/pushed'
import SmokeDetail from '../property/smoke'
import StringDetail from '../property/string'
import TargetTemperatureDetail from '../property/target-temperature'
import TemperatureDetail from '../property/temperature'
import ThermostatModeDetail from '../property/thermostat-mode'
import VideoDetail from '../property/video'
import VoltageDetail from '../property/voltage'
import AlarmDetail from '../property/alarm'
import BooleanDetail from '../property/boolean'
import InstantaneousPowerFactorDetail from "../property/instantaneous-power-factor"
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ThingIcons, {ActionsIcon} from "../../component/icons";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

export const ThingStates = {
    NoResponse: "No Response"
}

const useStyles = makeStyles((theme) => ({
    thingCard: {
        borderRadius: 12,
        display: 'flex',
        minWidth: 160,
        maxWidth: 160,
        justifyContent: "space-between",
        flexDirection: "column",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTop: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginRight: 5,
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },
    cardBot: {
        display: "flex",
        marginLeft: 4,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))


const defaults = {
    on: OnOffDetail,
    level: LevelDetail,
    instantaneousPower: InstantaneousPowerDetail,
    voltage: VoltageDetail,
    current: CurrentDetail,
    frequency: FrequencyDetail,
    brightness: BrightnessDetail,
    color: ColorDetail,
    colorTemperature: ColorTemperatureDetail,
};


// Parse properties
function useDisplayProperties(description) {
    const displayedProperties = Map()
    if (description.properties) {
        for (const name in description.properties) {
            const property = description.properties[name];

            // Convert units, if necessary
            const convertedProperty = JSON.parse(JSON.stringify(property));
            if (property.unit) {
                const newUnit = Units.convert(0, property.unit).unit;
                if (newUnit !== property.unit) {
                    convertedProperty.unit = newUnit;

                    if (property.hasOwnProperty('minimum')) {
                        convertedProperty.minimum =
                            Units.convert(property.minimum, property.unit).value;
                    }

                    if (property.hasOwnProperty('maximum')) {
                        convertedProperty.maximum =
                            Units.convert(property.maximum, property.unit).value;
                    }

                    if (property.hasOwnProperty('enum')) {
                        convertedProperty.enum =
                            property.enum.map((v) => Units.convert(v, property.unit).value);
                    }

                    if (property.hasOwnProperty('multipleOf')) {
                        // just delete this, as it's not really meaningful during
                        // conversions
                        delete convertedProperty.multipleOf;
                    }
                }
            }

            let href;
            for (const link of property.forms) {
                if (!link.rel || link.rel === 'property') {
                    href = link.href;
                    break;
                }
            }

            if (!href) {
                continue;
            }

            let detail;
            switch (property['@type']) {
                case 'BooleanProperty':
                    detail = new BooleanDetail(this, name, convertedProperty);
                    break;
                case 'OnOffProperty':
                    detail = new OnOffDetail(this, name, convertedProperty);
                    break;
                case 'LevelProperty':
                    detail = new LevelDetail(this, name, convertedProperty);
                    break;
                case 'BrightnessProperty':
                    detail = new BrightnessDetail(this, name, convertedProperty);
                    break;
                case 'ColorProperty':
                    detail = new ColorDetail(this, name, convertedProperty);
                    break;
                case 'ColorModeProperty':
                    detail = new ColorModeDetail(this, name, convertedProperty);
                    break;
                case 'ColorTemperatureProperty':
                    detail = new ColorTemperatureDetail(this, name, convertedProperty);
                    break;
                case 'InstantaneousPowerProperty':
                    detail =
                        new InstantaneousPowerDetail(this, name, convertedProperty);
                    break;
                case 'InstantaneousPowerFactorProperty':
                    detail =
                        new InstantaneousPowerFactorDetail(this, name, convertedProperty);
                    break;
                case 'CurrentProperty':
                    detail = new CurrentDetail(this, name, convertedProperty);
                    break;
                case 'VoltageProperty':
                    detail = new VoltageDetail(this, name, convertedProperty);
                    break;
                case 'FrequencyProperty':
                    detail = new FrequencyDetail(this, name, convertedProperty);
                    break;
                case 'MotionProperty':
                    detail = new MotionDetail(this, name, convertedProperty);
                    break;
                case 'OpenProperty':
                    detail = new OpenDetail(this, name, convertedProperty);
                    break;
                case 'LeakProperty':
                    detail = new LeakDetail(this, name, convertedProperty);
                    break;
                case 'SmokeProperty':
                    detail = new SmokeDetail(this, name, convertedProperty);
                    break;
                case 'PushedProperty':
                    detail = new PushedDetail(this, name, convertedProperty);
                    break;
                case 'ImageProperty':
                    detail = new ImageDetail(this, name, convertedProperty);
                    break;
                case 'VideoProperty':
                    detail = new VideoDetail(this, name, convertedProperty);
                    break;
                case 'TemperatureProperty':
                    detail = new TemperatureDetail(this, name, convertedProperty);
                    break;
                case 'AlarmProperty':
                    detail = new AlarmDetail(this, name, convertedProperty);
                    break;
                case 'TargetTemperatureProperty':
                    detail = new TargetTemperatureDetail(this, name, convertedProperty);
                    break;
                case 'ThermostatModeProperty':
                    detail = new ThermostatModeDetail(this, name, convertedProperty);
                    break;
                case 'HeatingCoolingProperty':
                    detail = new HeatingCoolingDetail(this, name, convertedProperty);
                    break;
                case 'LockedProperty':
                    detail = new LockedDetail(this, name, convertedProperty);
                    break;
                default:
                    if (defaults.hasOwnProperty(name)) {
                        let detailType = defaults[name];
                        if (name === 'level' && this['@type'].includes('Light')) {
                            detailType = defaults.brightness;
                        }

                        detail = new detailType(this, name, convertedProperty);
                    } else if (property.enum) {
                        detail = new EnumDetail(this, name, convertedProperty);
                    } else {
                        switch (property.type) {
                            case 'string':
                                detail = new StringDetail(this, name, convertedProperty);
                                break;
                            case 'integer':
                            case 'number':
                                detail = new NumberDetail(this, name, convertedProperty);
                                break;
                            case 'boolean':
                                detail = new BooleanDetail(this, name, convertedProperty);
                                break;
                            default:
                                console.warn('Unable to build property detail for:',
                                    property);
                                continue;
                        }
                    }
            }

            displayedProperties[name] = {
                href,
                detail,
                property,
                convertedProperty,
            };
        }
    }

    return displayedProperties
}


export default function Thing(thingModel, description) {

    const classes = useStyles()
    const {t} = useTranslation();

    const [displayedProperties] = useDisplayProperties(description)
    const [properties, setProperties] = useState({})


    const [connected, setConnected] = useState(false)
    const [label, setLabel] = useState()
    const [on, setOn] = useState()


    useEffect(() => {

        function onConnected(connected) {
            setConnected(connected)
        }

        function onEvent(event) {

        }

        function updateProperty(name, value) {
            if (!description.properties.hasOwnProperty(name)) {
                return;
            }
            if (name === displayProperties.brightnessProperty) {
                value = parseInt(value, 10);
                setProperties({...properties, name: value})
            } else if (name === displayProperties.colorProperty) {
                setProperties({...properties, name: value})
            } else if (name === displayProperties.colorTemperatureProperty) {
                value = parseInt(value, 10);
                setProperties({...properties, name: value})
            } else if (name === displayProperties.colorModeProperty) {
                setProperties({...properties, name: value})
            }
        }


        thingModel.subscribe(Constants.CONNECTED, onConnected);
        thingModel.subscribe(Constants.EVENT_OCCURRED, onEvent);
        thingModel.subscribe(Constants.PROPERTY_STATUS, updateProperty)


        return () => {
            thingModel.unsubscribe(Constants.CONNECTED, onConnected)
            thingModel.unsubscribe(Constants.EVENT_OCCURRED, onEvent)
            thingModel.unsubscribe(Constants.PROPERTY_STATUS, updateProperty)
        }
    }, [])


    return (
        <>
            <Grid item className={classes.root}>
                <Card elevation={10} className={classes.thingCard}>
                    <div className={classes.cardTop}>
                        <ThingIcons type={description.selectedCapability} style={{color: icon.color}}
                                    state={on ? "on" : "off"}/>
                        <ActionsIcon type={description.selectedCapability} onClick={props.handleClick}/>
                    </div>
                    <div className={classes.cardBot}>
                        <Typography variant={"body1"}>
                            {description.title}
                        </Typography>
                        <Typography t={2}>
                            {t(label)}
                        </Typography>
                    </div>
                </Card>
            </Grid>
        </>
    )
}


