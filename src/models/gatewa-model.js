import Model from "./model";
import ReopeningWebSocket from "../models/reopening-web-socket";
import Constants from "../js/constant";
import ThingModel from "./thing-model";
import Api from "../js/api";


export default class GatewayModel extends Model {
    constructor() {
        super();
        this.things = new Map();
        this.thingModels = new Map();
        this.connectedThings = new Map();
        this.groups = new Map();
        this.onMessage = this.onMessage.bind(this)
        this.queue = Promise.resolve(true)
        this.connectWebSocket()
    }

    addQueue(job) {
        this.queue = this.queue.then(job).catch((e) => {
            console.error(e);
        });
        return this.queue;
    }

    subscribe(event, handler, immediate = false) {
        super.subscribe(event, handler);
        switch (event) {
            case Constants.REFRESH_THINGS:
                if (immediate) {
                    console.log("subscribe this.things:", this.things)
                    handler(this.things, this.groups);
                }
                break;
            case Constants.DELETE_THINGS:
                break;
            default:
                console.warn(`GatewayModel does not support event:${event}`);
                break;
        }
    }

    onMessage(event) {
        const message = JSON.parse(event.data);
        console.log("messageType:", message.messageType)
        switch (message.messageType) {
            case 'connected':
                this.connectedThings.set(message.id, message.data);
                break
            case 'thingAdded':
                this.refreshThings();
                break
            case 'thingModified':
                this.refreshThing(message.id);
                break
            default:
                break
        }

    }

    connectWebSocket() {
        // const thingsHref = `${window.location.origin}/things?jwt=${API.jwt}`;
        const thingsHref = `${window.location.origin}/things`;
        const wsHref = thingsHref.replace(/^http/, 'ws');
        this.ws = new ReopeningWebSocket(wsHref);
        this.ws.addEventListener('open', this.refreshThings.bind(this));
        this.ws.addEventListener('message', this.onMessage);
        //const groupsHref = `${window.location.origin}/groups?jwt=${API.jwt}`;
        // const groupsWsHref = groupsHref.replace(/^http/, 'ws');
        // this.groupsWs = new ReopeningWebSocket(groupsWsHref);
        //this.groupsWs.addEventListener('open', this.refreshThings.bind(this));
        //this.groupsWs.addEventListener('message', this.onMessage);
    }

    refreshThing(thingId) {

    }

    refreshThings() {
        return this.addQueue(() => {
            return Api.getThings()
                .then((things) => {
                    const fetchedIds = new Set();
                    things.forEach((description) => {
                        let thingId = decodeURIComponent(description.id);
                        fetchedIds.add(thingId);
                        this.setThing(thingId, description);

                    });
                    const removedIds = Array.from(this.thingModels.keys()).filter((id) => {
                        return !fetchedIds.has(id);
                    });

                    removedIds.forEach((thingId) => this.handleRemove(thingId, true));
                    //return API.getGroups();
                    return this.handleEvent(Constants.REFRESH_THINGS, this.things);
                })
                .catch((e) => {
                    console.error(`Get things or groups failed ${e}`);
                });
        });
    }

    setThing(thingId, description) {

        if (this.thingModels.has(thingId)) {
            let thingModel = this.thingModels.get(thingId)
            thingModel.updateFromDescription(description)
        } else {
            let thingModel = new ThingModel(description, this.ws)
            thingModel.subscribe(Constants.DELETE_THINGS, this.handleRemove.bind(this))
            thingModel.connected = this.connectedThings.has(thingId)
            this.thingModels.set(thingId, thingModel)
        }
        this.things.set(thingId, description)
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
            return this.handleEvent(Constants.DELETE_THINGS, this.things, this.groups);
        }
    }

    getThingModel(thingId) {
        if (this.thingModels.has(thingId)) {
            return this.thingModels.get(thingId)
        }
        return this.refreshThing(thingId).then(() => {
            return this.thingModels.get(thingId)
        })
    }

}