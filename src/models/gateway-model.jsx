import Model from "./model";
import ReopeningWebSocket from "src/models/reopening-web-socket";
import Constants from "src/js/constants";
import ThingModel from "src/models/thing-model";
import Api from "src/js/api";


export default class GatewayModel extends Model {
    constructor() {
        super();
        this.thingModels = new Map();
        this.things = new Map();
        this.connectedThings = new Map();
        this.groups = new Map();
        this.onMessage = this.onMessage.bind(this);
        this.queue = Promise.resolve(true);
        this.refreshThings().then(() => {})
        this.connectWebSocket();
        return this;
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
                //console.log("subscribe event:", this.things)
                if (immediate) {
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
        switch (message.messageType) {
            case 'connected':
                console.log("gateway connected",message.data);
                this.connectedThings.set(message.id, message.data);
                break;
            case 'thingAdded':
                this.refreshThings().then();
                break;
            case 'thingModified':
                this.refreshThing(message.id);
                break;
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

    refreshThings() {
        return this.addQueue(() => {
            return Api.getThings()
                .then((things) => {
                    const fetchedIds = new Set();
                    things.forEach((description) => {
                        const thingId = decodeURIComponent(description.id);
                        fetchedIds.add(thingId);
                        this.setThing(thingId, description);
                    });
                    const removedIds = Array.from(this.thingModels.keys()).filter((id) => {
                        return !fetchedIds.has(id);
                    });
                    removedIds.forEach((thingId) => this.handleRemove(thingId, true));
                    return Api.getGroups();
                })
                .then((groups) => {
                    const fetchedIds = new Set();
                    if (Object.keys(groups).length !== 0) {
                        groups.forEach((description) => {
                            const groupId = decodeURIComponent(description.id.split('/').pop());
                            fetchedIds.add(groupId);
                            this.setGroup(groupId, description);
                        });

                        const removedIds = Array.from(this.groups.keys()).filter((id) => {
                            return !fetchedIds.has(id);
                        });
                        removedIds.forEach((groupId) => this.handleRemoveGroup(groupId, true));
                    }
                    return this.handleEvent(Constants.REFRESH_THINGS, this.things, this.groups);
                })
                .catch((e) => {
                    console.error(`Get things or groups failed ${e}`);
                });
        });
    }

    refreshThing(thingId) {

        return this.addQueue(() => {
            return Api.getThing(thingId)
                .then((description) => {
                    if (!description) {
                        throw new Error(`Unavailable Thing Description: ${description}`);
                    }
                    this.setThing(thingId, description);
                    return this.handleEvent(Constants.REFRESH_THINGS, this.things, this.groups);
                })
                .catch((e) => {
                    console.error(`Get thing id:${thingId} failed ${e}`);
                });
        });
    }

    setGroup(groupId, description) {
        this.groups.set(groupId, description);
    }

    handleRemoveGroup(groupId, skipEvent = false) {
        if (this.groups.has(groupId)) {
            this.groups.delete(groupId);
        }
        if (!skipEvent) {
            return this.handleEvent(Constants.DELETE_GROUPS, this.things, this.groups);
        }
    }

    setThing(thingId, description) {

        //console.log("gateway set thing:",thingId,description)
        if (this.thingModels.has(thingId)) {
            let thingModel = this.thingModels.get(thingId)
            thingModel.updateFromDescription(description)
        } else {
            let thingModel = new ThingModel(description, this.ws)
            thingModel.subscribe(Constants.DELETE_THINGS, this.handleRemove.bind(this))
            if (this.connectedThings.has(thingId)) {
                thingModel.onConnected(this.connectedThings.get(thingId));
            }
            this.thingModels.set(thingId, thingModel);
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


    getThing(thingId) {
        if (this.thingModels.has(thingId) && this.things.has(thingId)) {
            return Promise.resolve(this.things.get(thingId));
        }
        return this.refreshThing(thingId).then(() => {
            return this.things.get(thingId);
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
                this.refreshThing(thingId);
            });
        });
    }

}