import Model from "./model";
import ReopeningWebSocket from "../models1/reopening-web-socket";
import Constants from "../js/constant";


export default class GatewayModel extends Model{
    constructor() {
        super();
        this.thing = new Map();
        this.thingModles = new Map();
        this.connectedThing = new Map();
        this.groups = new Map();
        this.onMessage = this.onMessage.bind(this)
        this.queue = Promise.resolve(true)
        this.connectWebSocket()
    }


    onMessage(event){

    }

    connectWebSocket(){
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

    refreshThings(){
        return this.addQueue(() => {
            return API.getThings()
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

}