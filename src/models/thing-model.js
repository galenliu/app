'use strict';

import API from "../js/api";
import Model from "./model";
import Constants from "../js/constant";
import {App} from "../App"


class ThingModel extends Model {
  constructor(description, ws) {
    super();
    this.properties = {};
    this.events = [];
    this.connected = false;

    this.updateFromDescription(description);

    this.initWebSocket(ws);
    this.updateEvents()
    this.iconData = {}
    return this;
  }

  updateFromDescription(description) {
    this.title = description.title;
    this.id = decodeURIComponent(description.id.split('/').pop());
    this.href = new URL(description.id, App.ORIGIN);

    // Parse events URL
    for (const form of description.forms) {
      if (form.rel === null) {
        continue
      }
      switch (form.rel) {
        case 'events':
          this.eventsHref = new URL(form.href, App.ORIGIN);
          break;
        case 'properties':
          this.propertiesHref = new URL(form.href, App.ORIGIN);
          break;
        default:
          break;
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

  /**
   * Remove the thing.
   */
  removeThing() {
    return API.removeThing(this.id).then(() => {
      this.handleEvent(Constants.DELETE_THING, this.id).then();
      this.cleanup();
    });
  }

  /**
   * Update the thing.
   */
  updateThing(updates) {
    return API.updateThing(this.id, updates);
  }

  /**
   * Initialize websocket.
   */
  initWebSocket(globalWs) {
    if (!this.hasOwnProperty('href')) {
      return;
    }
    this.ws = globalWs;

    // After the websocket is open, add subscriptions for all events.
    this.ws.addEventListener('open', () => {
      if (Object.keys(this.eventDescriptions).length === 0) {
        return;
      }
      const msg = {
        id: this.id,
        messageType: 'addEventSubscription',
        data: {},
      };
      for (const name in this.eventDescriptions) {
        msg.data[name] = {};
      }
      this.ws.send(JSON.stringify(msg));
    });

    const onEvent = (event) => {

      const message = JSON.parse(event.data);
      if (message.hasOwnProperty('id') && message.id !== this.id) {
        return;
      }
      console.log("++++++++++++++++++++++++++++propertyStatus:", message, "thing id:", message.id)
      switch (message.messageType) {
        case 'propertyStatus':
          this.onPropertyStatus(message.data)
          break;
        case 'event':
          this.onEvent(message.data)
          break;
        case 'connected':
          this.onConnected(message.data)
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

  subscribe(event, handler) {
    super.subscribe(event, handler);
    switch (event) {
      case Constants.EVENT_OCCURRED:
        break;
      case Constants.PROPERTY_STATUS:
        handler(this.properties);
        break;
      case Constants.DELETE_THING:
        break;
      case Constants.CONNECTED:
        handler(this.connected);
        break;
      case Constants.ICON_STATUS:
        handler(this.iconData);
        break;
      default:
        console.warn(`ThingModel does not support event:${event}`);
        break;
    }
  }

  /**
   * Set value of the property.
   *
   * @param {string} name - name of the property
   * @param {*} value - value of the property
   * @return {Promise} which resolves to the property set.
   */
  setProperty(name, value) {
    console.log("set property:", value)
    if (!this.propertyDescriptions.hasOwnProperty(name)) {
      return Promise.reject(`Unavailable property name ${name}`);
    }
    switch (this.propertyDescriptions[name].type) {
      case 'number':
        value = parseFloat(value);
        break;
      case 'integer':
        value = parseInt(value);
        break;
      case 'boolean':
        value = Boolean(value);
        break;
    }
    const property = this.propertyDescriptions[name];

    let href;
    for (const form of property.forms) {
      if (!form.rel || form.rel === 'property') {
        href = form.href;
        break;
      }
    }
    return API.putJson(href, value).then((json) => {
      this.onPropertyStatus(json)
    }).catch((error) => {
      console.error(error);
      //throw new Error(`Error trying to set ${name}`);
    });
  }

  /**
   * Update the Properties of Thing.
   */
  updateProperties() {
    let getPropertiesPromise;
    if (typeof this.propertiesHref === 'undefined') {
      const urls = Object.values(this.propertyDescriptions).map((v) => {
        for (const link of v.forms) {
          if (!link.rel || link.rel === 'property') {
            return link.href;
          }
        }
      });
      const requests = urls.map((u) => API.getJson(u));
      getPropertiesPromise = Promise.all(requests).then((responses) => {
        let properties = {};
        responses.forEach((response) => {
          properties = Object.assign(properties, response);
        });
        return properties;
      });
    } else {
      getPropertiesPromise = API.getJson(this.propertiesHref);
    }

    getPropertiesPromise.then((properties) => {
      this.onPropertyStatus(properties)
    }).catch((error) => {
      console.error(`Error fetching ${this.title} status: ${error}`);
    });
  }

  /**
   * Handle a 'propertyStatus' message.
   * @param {Object} data Property data
   */
  onPropertyStatus(data) {
    const updatedProperties = {};

    for (const prop in data) {
      if (!this.propertyDescriptions.hasOwnProperty(prop)) {
        continue;
      }
      const value = data[prop];
      if (typeof value === 'undefined' || value === null) {
        continue;
      }

      this.properties[prop] = value;
      updatedProperties[prop] = value;
    }
    return this.handleEvent(Constants.PROPERTY_STATUS, updatedProperties);
  }

  /**
   * Get the list of existing events.
   */
  updateEvents() {
    if (typeof this.eventsHref === 'undefined') {
      return;
    }

    return API.getJson(this.eventsHref).then((events) => {
      this.events = events;
    }).catch((e) => {
      console.error(`Error fetching events: ${e}`);
    });
  }

  /**
   * Handle an 'event' message.
   * @param {Object} events Event data
   */
  onEvent(data) {
    const events = {};
    for (const event in data) {
      if (!this.eventDescriptions.hasOwnProperty(event)) {
        continue;
      }
      events[event] = data[event];
      this.events.push({[event]: data[event]});
    }
    return this.handleEvent(Constants.EVENT_OCCURRED, events);
  }

  /**
   * Handle a 'connected' message.
   * @param {boolean} connected - Connected state
   */
  onConnected(connected) {
    this.connected = connected;
    console.log("thing on connected:", this.id, ":", connected)
    if (connected) {
      this.updateProperties();
    }
    return this.handleEvent(Constants.CONNECTED, connected);
  }
}

export default ThingModel;
