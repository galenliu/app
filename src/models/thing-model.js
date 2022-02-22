import Model from "./model";
import Constants from "../constants";
import {selectFormHref} from "../utils.ts";


export default class ThingModel extends Model {
    constructor(description, ws) {
        super();
        this.connected = false;
        this.properties = new Map()
        this.propertiesDescriptions = {}
        this.eventsDescriptions = {}
        this.events = []
        this.title = description.title
        this.base = description.base ?? Constants.ORIGIN
        this.group_id = description.group_id
        this.id = description.includes
        this.initWS(ws)
        return this
    }

    initWS(ws){

    }


    updateFromDescription(description) {
        if (description.forms) {
            for (let form of description.forms) {
                let op = form[op]
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

        if (description.hasOwnProperty("properties")) {
            for (let propertyName in description.properties) {
                this.propertiesDescriptions[propertyName] = description.properties[propertyName]
            }
        }


        if (description.hasOwnProperty("events")) {
            for (let eventName in description.events) {
                this.eventsDescriptions[eventName] = description.events[eventName]
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
            case Constants.DELETE_THING:
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
        return API.removeThing(this.id).then(() => {
            this.handleEvent(Constants.DELETE_THING, this.id).then()
            this.cleanup()
        })
    }

    setProperty(name, value) {
        if (!this.propertiesDescriptions.hasOwnProperty(name)) {
            return Promise.reject(`unavailable property name ${name}`)
        }

        let property = this.propertiesDescriptions[name]
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

        return API.putJsonWithEmptyResponse(href, value)
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
        let updateProperties = {}
        for (let prop in data) {
            if (!this.propertiesDescriptions.hasOwnProperty(prop)) {
                continue
            }
            let value = data[prop]
            if (typeof value === "undefined" || value === null) {
                continue
            }
            this.properties.set(prop, value)
            updateProperties[prop] = value
        }
        return this.handleEvent(Constants.PROPERTY_STATUS, updateProperties)
    }


}