import ActionDetail from '../action/action';
import AlarmDetail from '../property/alarm';
import API from 'src/js/api';
import App from '../../app';
import BooleanDetail from '../property/boolean';
import BrightnessDetail from '../property/brightness';
import ColorDetail from '../property/color';
import ColorModeDetail from '../property/color-mode';
import ColorTemperatureDetail from '../property/color-temperature';
import Constants from 'src/js/constants';
import CurrentDetail from '../property/current';
import EnumDetail from '../property/enum';
import FrequencyDetail from '../property/frequency';
import HeatingCoolingDetail from '../property/heating-cooling';
import ImageDetail from '../property/image';
import InstantaneousPowerDetail from '../property/instantaneous-power';
import InstantaneousPowerFactorDetail from '../property/instantaneous-power-factor';
import LeakDetail from '../property/leak';
import LevelDetail from '../property/level';
import LockActionDetail from '../action/lock';
import LockedDetail from '../property/locked';
import MotionDetail from '../property/motion';
import NumberDetail from '../property/number';
import OnOffDetail from '../property/on-off';
import OpenDetail from '../property/open';
import PushedDetail from '../property/pushed';
import SmokeDetail from '../property/smoke';
import StringDetail from '../property/string';
import TargetTemperatureDetail from '../property/target-temperature';
import TemperatureDetail from '../property/temperature';
import ThermostatModeDetail from '../property/thermostat-mode';
import ThingDetailLayout from './thing-detail-layout';
import UnlockActionDetail from '../action/unlock';
import {selectFormHref, adjustInputValue} from 'src/js/util';
import VideoDetail from '../property/video';
import VoltageDetail from '../property/voltage';
import Units from "src/js/units";

class Thing {
    /**
     * Thing constructor.
     *
     * @param model
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     * @param {Object} options Options for building the view.
     */
    constructor(model, description, format, options) {
        const opts = options || {};
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

        this.title = description.title;
        this.id = description.id
        this.model = model;
        this.listeners = [];
        this.connected = false;

        if (Array.isArray(description['@type']) && description['@type'].length > 0) {
            this['@type'] = description['@type'];
        } else {
            this['@type'] = [];
        }

        this.selectedCapability = description.selectedCapability;
        // this.floorplanVisibility = 'floorplanVisibility' in description !== false;
        // this.layoutIndex = description.layoutIndex;
        this.iconHref = description.iconHref || '';
        // this.baseIcon = opts.baseIcon || fluent.getMessage('thing-icons-thing-src');
        this.format = format;
        this.displayedProperties = this.displayedProperties || {};
        this.displayedActions = this.displayedActions || {};

        // if (format === Constants.ThingFormat.LINK_ICON) {
        //     this.container = document.getElementById('floorplan');
        //     this.x = description.floorplanX;
        //     this.y = description.floorplanY;
        // } else if (this.model.group_id) {
        //     this.container = document.querySelector(`#group-${this.model.group_id}`);
        // } else {
        //     this.container = document.getElementById('things');
        // }
        //
        // this.uiHref = null;
        // if (description.links) {
        //     for (const link of description.links) {
        //         if (link.rel === 'alternate' && link.type === 'text/html') {
        //             if (link.href.startsWith('/proxy/')) {
        //                 this.uiHref = `${link.href}?jwt=${API.jwt}`;
        //             } else if (
        //                 link.href.startsWith('http://') ||
        //                 link.href.startsWith('https://') ||
        //                 link.href.startsWith('/extensions/')
        //             ) {
        //                 this.uiHref = link.href;
        //             }
        //
        //             break;
        //         }
        //     }
        // }

        this.base = description.base ?? Constants.ORIGIN;
        // Parse base URL of Thing
        // if (description.href) {
        //     this.href = new URL(description.href, App.ORIGIN);
        //     // double-encode slashes to make page.js happy
        //     const params = new URLSearchParams();
        //     params.set('referrer', encodeURIComponent(this.href.pathname.replace(/%2F/g, '%252F')));
        //     this.eventsHref = `${this.href.pathname.replace(
        //         /%2F/g,
        //         '%252F'
        //     )}/events?${params.toString()}`;
        //     this.id = decodeURIComponent(this.href.pathname.split('/').pop());
        // }

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
                            convertedProperty.minimum = Units.convert(property.minimum, property.unit).value;
                        }

                        if (property.hasOwnProperty('maximum')) {
                            convertedProperty.maximum = Units.convert(property.maximum, property.unit).value;
                        }

                        if (property.hasOwnProperty('enum')) {
                            convertedProperty.enum = property.enum.map(
                                (v) => Units.convert(v, property.unit).value
                            );
                        }

                        if (property.hasOwnProperty('multipleOf')) {
                            // just delete this, as it's not really meaningful during
                            // conversions
                            delete convertedProperty.multipleOf;
                        }
                    }
                }

                const href = selectFormHref(
                    property.forms,
                    Constants.WoTOperation.READ_PROPERTY,
                    this.base
                );

                // if (!href) {
                //     continue;
                // }

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
                        detail = new InstantaneousPowerDetail(this, name, convertedProperty);
                        break;
                    case 'InstantaneousPowerFactorProperty':
                        detail = new InstantaneousPowerFactorDetail(this, name, convertedProperty);
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
                                    console.warn('Unable to build property detail for:', property);
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
        this.updateStatus();
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        // pass
    }

    getProperty(name){
        return this.displayedProperties[name]
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

            if (this.format === Constants.ThingFormat.EXPANDED) {
                this.displayedProperties[name].detail.update(value);
            }
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

        this.model.setProperty(name, value);
    }

    /**
     * Update the status of Thing.
     */
    updateStatus() {
        //this.model.subscribe(Constants.PROPERTY_STATUS, this.onPropertyStatus);
        // this.model.subscribe(Constants.EVENT_OCCURRED, this.onEvent);
        // this.model.subscribe(Constants.CONNECTED, this.onConnected);
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
        //this.model.unsubscribe(Constants.EVENT_OCCURRED, this.onEvent);
       // this.model.unsubscribe(Constants.CONNECTED, this.onConnected);
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

}

export default Thing;
