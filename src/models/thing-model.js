import Model from "src/models/model";
import Constants from "src/js/constants";
import {selectFormHref} from "src/js/util";
import Api from "src/js/api";


export default class ThingModel extends Model {
    constructor(description, ws) {
        super();
        this.connected = false;
        this.properties = {}
        this.events = []
        this.updateFromDescription(description);
        this.initWebSocket(ws)
        return this
    }

    initWebSocket(globalWs) {

        this.ws = globalWs

        const onEvent = (event) => {

            const message = JSON.parse(event.data);
            if (message.hasOwnProperty('id') && message.id !== this.id) {
                return;
            }
            switch (message.messageType) {
                case "propertyStatus":
                    this.onPropertyStatus(message.data);
                    break;
                case 'event':
                    this.onEvent(message.data);
                    break;
                case 'connected':
                    this.onConnected(message.data);
                    break;
                case 'error':
                    // status 404 means that the Thing already removed.
                    if (message.data.status === '404 Not Found') {
                        console.log('Successfully removed Thing.');
                        this.handleEvent(Constants.DELETE_THING, this.id);
                        this.cleanup();
                    }
                    break;
                case 'thingRemoved':
                    this.handleEvent(Constants.DELETE_THING, this.id);
                    this.cleanup();
                    break;
            }
        };
        this.ws.addEventListener('message', onEvent);
    }

    onConnected(connected) {
        this.connected = connected;
        return this.handleEvent(Constants.CONNECTED, connected);
    }

    updateFromDescription(description) {

        this.title = description.title;
        this.base = description.base ?? Constants.ORIGIN;
        // Parse base URL of Thing
        if (description.href) {
            this.href = new URL(description.href, Constants.ORIGIN);
            this.id = decodeURIComponent(this.href.pathname.split('/').pop());
        } else {
            this.id = decodeURIComponent(description.id)
        }

        // Parse group id of Thing
        this.group_id = description.group_id;

        if (description.forms) {
            for (let form of description.forms) {
                let op = form.op
                if ((typeof op == "string" && op === Constants.WoTOperation.READ_ALL_PROPERTIES) ||
                    (Array.isArray(op) && op.includes(Constants.WoTOperation.READ_ALL_PROPERTIES))) {
                    this.propertiesHref = new URL(form.href, this.base)
                } else if (
                    (typeof op === "string" && op === Constants.WoTOperation.SUBSCRIBE_ALL_EVENTS) ||
                    (Array.isArray(op) && op.includes(Constants.WoTOperation.SUBSCRIBE_ALL_EVENTS))) {
                    this.eventsHref = new URL(form.href, this.base)
                }
            }
        }


        // Parse properties
        this.propertyDescriptions = {};
        if (description.hasOwnProperty('properties')) {
            for (const propertyName in description.properties) {
                const property = description.properties[propertyName];

                this.propertyDescriptions[propertyName] = property;
            }
        }


        // Parse events
        this.eventDescriptions = {};
        if (description.hasOwnProperty('events')) {
            for (const eventName in description.events) {
                const event = description.events[eventName];
                this.eventDescriptions[eventName] = event;
            }
        }

    }

    subscribe(event, handler) {
        super.subscribe(event, handler);
        switch (event) {
            case Constants.EVENT_OCCURRED:
                break
            case Constants.PROPERTY_STATUS:
                handler(this.properties);
                break
            case Constants.DELETE_THINGS:
                break
            case Constants.CONNECTED:
                handler(this.connected)
                break
            default:
                console.warn(`ThingModel does not support event ${event}`)
                break
        }
    }

    removeThing() {
        return Api.removeThing(this.id).then(() => {
            this.handleEvent(Constants.DELETE_THING, this.id).then()
            this.cleanup()
        })
    }

    setProperty(name, value) {

        if (!this.propertyDescriptions.hasOwnProperty(name)) {
            return Promise.reject(`unavailable property name ${name}`)
        }

        let property = this.propertyDescriptions[name]
        switch (property.type) {
            case "number":
                value = parseFloat(value)
                break
            case "integer":
                value = parseInt(value)
                break
            case "boolean":
                value = Boolean(value)
                break
        }
        const href = selectFormHref(property.forms, Constants.WoTOperation.READ_PROPERTY)
        return Api.putJsonWithEmptyResponse(href, value)
            .then(() => {
                let result = {}
                result[name] = value;
                this.onPropertyStatus(result)
            }).catch((error) => {
                console.error(error)
                throw new Error(`error trying to set ${name}`)
            })

    }

    onPropertyStatus(data) {
        if (Object.keys(data).length === 0) {
            return
        }
        let updateProperties = {}
        for (let propName in data) {
            if (!this.propertyDescriptions.hasOwnProperty(propName)) {
                continue
            }
            let value = data[propName]
            if (typeof value === "undefined" || value === null) {
                continue
            }

            this.properties[propName] = value
            updateProperties[propName] = value

        }
        return this.handleEvent(Constants.PROPERTY_STATUS, updateProperties)
    }
}