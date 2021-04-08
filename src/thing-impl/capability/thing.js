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

import {App} from "../../App"
import {adjustInputValue} from "../../utils"
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

export const ThingStates = {
    NoResponse: "No Response"
}

export default class Thing {
    /**
     * Thing constructor.
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     * @param {Object} options Options for building the view.
     */
    constructor(model, description, format, options) {
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
        this.id = description.id
        this.title = description.title;
        this.model = model;
        this.listeners = [];
        this.connected = this.model.connected;
        this.state = ThingStates.NoResponse

        if (Array.isArray(description['@type']) &&
            description['@type'].length > 0) {
            this['@type'] = description['@type'];
        } else {
            this['@type'] = [];
        }

        this.selectedCapability = description.selectedCapability;
        this.layoutIndex = description.layoutIndex;
        this.icon = {}

        this.format = format;
        this.displayedProperties = this.displayedProperties || {};
        this.displayedActions = this.displayedActions || {};

        // Parse base URL of Thing
        if (description.href) {
            this.href = new URL(description.href, App.ORIGIN);
            // double-encode slashes to make page.js happy
            const params = new URLSearchParams();
            params.set(
                'referrer',
                encodeURIComponent(this.href.pathname.replace(/%2F/g, '%252F'))
            );
            this.eventsHref =
                `${this.href.pathname.replace(/%2F/g, '%252F')}/events?${
                    params.toString()}`;
            this.id = decodeURIComponent(this.href.pathname.split('/').pop());
        }


        // Parse properties
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

                this.displayedProperties[name] = {
                    href,
                    detail,
                    property,
                    convertedProperty,
                };
            }
        }

        this.findProperties();

        this.onPropertyStatus = this.onPropertyStatus.bind(this);
        this.onEvent = this.onEvent.bind(this);
        this.onConnected = this.onConnected.bind(this);
        this.updateStatus();

    }


    findProperties() {
        this.iconLable = "";
    }

    toggle() {

    }

    /**
     * Update the display for the provided property.
     *
     * @param {String} name Name of the property
     * @param {*} value Value of the property
     */
    updateProperty(name, value) {
        if (this.displayedProperties.hasOwnProperty(name)) {
            // Convert units, if necessary
            value = Units.convert(
                value,
                this.displayedProperties[name].property.unit,
                this.displayedProperties[name].convertedProperty.unit
            ).value;

        }

        return value;
    }

    /**
     * Set the provided property.
     *
     * @param {String} name Name of the property
     * @param {*} value Value of the property
     */
    setProperty(name, value) {
        // Convert units, if necessary
        value = Units.convert(
            value,
            this.displayedProperties[name].convertedProperty.unit,
            this.displayedProperties[name].property.unit
        ).value;

        // Adjust the value to match property limits
        const property = this.displayedProperties[name].property;
        value = adjustInputValue(value, property);

        try {
            this.model.setProperty(name, value);
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Update the status of Thing.
     */
    updateStatus() {
        this.model.subscribe(Constants.PROPERTY_STATUS, this.onPropertyStatus);
        this.model.subscribe(Constants.EVENT_OCCURRED, this.onEvent);
        this.model.subscribe(Constants.CONNECTED, this.onConnected);
    }

    /**
     * Add event listener and store params to cleanup listeners
     * @param {Element} element
     * @param {Event} event
     * @param {Function} handler
     */
    registerEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        this.listeners.push({element, event, handler});
    }

    /**
     * Cleanup added listeners and subscribed events
     */
    cleanup() {
        let listener;
        while (typeof (listener = this.listeners.pop()) !== 'undefined') {
            listener.element.removeEventListener(listener.event, listener.handler);
        }
        this.model.unsubscribe(Constants.PROPERTY_STATUS, this.onPropertyStatus);
        this.model.unsubscribe(Constants.EVENT_OCCURRED, this.onEvent);
        this.model.unsubscribe(Constants.CONNECTED, this.onConnected);
    }


    /**
     * Handle a 'propertyStatus' message.
     * @param {Object} data Property data
     */
    onPropertyStatus(data) {

        for (const prop in data) {
            if (!this.displayedProperties.hasOwnProperty(prop)) {
                continue;
            }

            const value = data[prop];
            if (typeof value === 'undefined' || value === null) {
                continue;
            }

            this.updateProperty(prop, value);
        }
    }

    /**
     * Handle an 'event' message.
     * @param {Object} data Event data
     */
    onEvent(data) {
        if (!this.displayEvents) {
            return;
        }

        for (const name in data) {
            App.showMessage();
        }
    }


    /**
     * Handle a 'connected' message.
     * @param {boolean} connected - New connectivity state
     */
    onConnected(connected) {
        this.connected = connected;
    }
}


