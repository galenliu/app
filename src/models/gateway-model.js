/**
 * Gateway Model.
 *
 */

'use strict';

import API from "../js/api"
import Constants from "../js/constant"
import Model from "./model";
import ReopeningWebSocket from "./reopening-web-socket";
import ThingModel from "./thing-model";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";

class GatewayModel extends Model {
  constructor() {
    super();
    this.thingModels = new Map();
    // this.things = new Map();
    this.Things = new Map()
    this.connectedThings = new Map();
    this.onMessage = this.onMessage.bind(this);
    this.queue = Promise.resolve(true);
    this.connectWebSocket();
    return this;
  }

  addQueue(job) {

    this.queue = this.queue.then(job)
      .catch((e) => {
        console.error(e);
      });
    return this.queue;
  }


  subscribe(event, handler, immediate = false) {
    super.subscribe(event, handler);
    switch (event) {
      case Constants.REFRESH_THINGS:
        if (immediate) {
          handler(this.things);
        }
        break;
      case Constants.DELETE_THINGS:
        break;
      default:
        console.warn(`GatewayModel does not support event:${event}`);
        break;
    }
  }

  setThing(thingId, description) {
    if (description === null || description === undefined) {
      return
    }
    try {
      console.log("setThing thingId: \t\n", thingId, " \t\n description:\t\n", description)
      if (this.thingModels.has(thingId)) {
        const thingModel = this.thingModels.get(thingId);
        thingModel.updateFromDescription(description);
        this.Things.set(thingId, createThingFromCapability(description.selectedCapability, thingModel, description))
      } else {
        const thingModel = new ThingModel(description, this.ws);
        thingModel.subscribe(
          Constants.DELETE_THING,
          this.handleRemove.bind(this)
        );
        if (this.connectedThings.has(thingId)) {
          thingModel.onConnected(this.connectedThings.get(thingId))
        }
        this.thingModels.set(thingId, thingModel)
        this.Things.set(thingId, createThingFromCapability(description.selectedCapability, thingModel, description))
      }
    } catch (e) {
      console.log(e)
    }
  }

  // getThing(thingId) {
  //     if (this.thingModels.has(thingId) && this.things.has(thingId)) {
  //         return Promise.resolve(this.things.get(thingId));
  //     }
  //     return this.refreshThing(thingId).then(() => {
  //         return this.things.get(thingId);
  //     });
  // }

  getThing(thingId) {
    if (this.thingModels.has(thingId) && this.Things.has(thingId)) {
      return Promise.resolve(this.Things.get(thingId));
    }
    return this.refreshThing(thingId).then(() => {
      return this.Things.get(thingId);
    });
  }

  getThingModel(thingId) {
    if (this.thingModels.has(thingId)) {
      return Promise.resolve(this.thingModels.get(thingId));
    }
    return this.refreshThing(thingId).then(() => {
      return this.thingModels.get(thingId);
    });
  }

  removeThing(thingId) {
    if (!this.thingModels.has(thingId)) {
      return Promise.reject(`No Thing id:${thingId}`);
    }
    return this.addQueue(() => {
      if (!this.thingModels.has(thingId)) {
        throw new Error(`Thing id:${thingId} already removed`);
      }
      const thingModel = this.thingModels.get(thingId);
      return thingModel.removeThing();
    });
  }

  updateThing(thingId, updates) {
    if (!this.thingModels.has(thingId)) {
      return Promise.reject(`No Thing id:${thingId}`);
    }
    return this.addQueue(() => {
      if (!this.thingModels.has(thingId)) {
        throw new Error(`Thing id:${thingId} already removed`);
      }
      const thingModel = this.thingModels.get(thingId);
      return thingModel.updateThing(updates).then(() => {
        this.refreshThing(thingId)
      });
    });
  }

  handleRemove(thingId, skipEvent = false) {
    if (this.thingModels.has(thingId)) {
      this.thingModels.get(thingId).cleanup();
      this.thingModels.delete(thingId);
    }
    if (this.things.has(thingId)) {
      this.things.delete(thingId);
    }

    if (!skipEvent) {
      return this.handleEvent(Constants.DELETE_THINGS, this.things);
    }
  }

  connectWebSocket() {
    try {
      const thingsHref = `${window.location.origin}/things`;
      const wsHref = thingsHref.replace(/^http/, 'ws');
      console.log("websocket url:", wsHref)
      this.ws = new ReopeningWebSocket(wsHref);
      this.ws.addEventListener('open', this.refreshThings.bind(this));
      this.ws.addEventListener('message', this.onMessage);
    } catch (e) {
      console.log("app websocket err: ", e)
    }

  }

  onMessage(event) {
    const message = JSON.parse(event.data);
    switch (message.messageType) {
      case 'connected':
        this.connectedThings.set(message.id, message.data);
        break;
      case 'thingAdded':
        this.refreshThings().then(r => {
        });
        break;
      case 'thingModified':
        this.refreshThing(message.id).then(r => {
        });
        break;
      default:
        break;
    }
  }

  refreshThings() {
    return this.addQueue(() => {
      return API.getThings().then((things) => {
        const fetchedIds = new Set();
        if (things == null) {
          throw new Error("things null")
        }
        things.forEach((description) => {
          const thingId = decodeURIComponent(description.id.split('/').pop());
          fetchedIds.add(thingId);
          this.setThing(thingId, description);
        });

        const removedIds = Array.from(this.thingModels.keys()).filter((id) => {
          return !fetchedIds.has(id);
        });
        removedIds.forEach((thingId) => this.handleRemove(thingId, true));

        return this.handleEvent(Constants.REFRESH_THINGS, this.Things);
      }).catch((e) => {
        console.error(`Get things failed ${e}`);
        this.thingModels = new Map()
        this.things = new Map()

        return this.handleEvent(Constants.REFRESH_THINGS, new Map());

      });
    });
  }

  refreshThing(thingId) {
    return this.addQueue(() => {
      return API.getThing(thingId).then((description) => {
        if (!description) {
          throw new Error(`Unavailable Thing Description: ${description}`);
        }
        this.setThing(thingId, description);
        return this.handleEvent(Constants.REFRESH_THINGS, this.Things);
      }).catch((e) => {
        console.error(`Get thing id:${thingId} failed ${e}`);
      });
    });
  }
}

export default GatewayModel;
