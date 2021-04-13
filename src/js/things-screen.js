import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {App} from "../App";
import Constants from "./constant";

const ThingsScreen = {

    // init: function () {
    //
    //     this.refreshThings = this.refreshThings.bind(this);
    //     this.things = []
    //
    // },
    //
    // renderThing: function (thingModel, description, format) {
    //     const thing = createThingFromCapability(
    //         description.selectedCapability,
    //         thingModel,
    //         description,
    //         format
    //     );
    //     this.things.push(thing);
    //     console.log("thing screen add thing:", thing)
    //     return thing;
    // },
    //
    // getThing: function (thingID) {
    //     let th = {}
    //     this.things.forEach((thing) => {
    //         if (thing.id === thingID) {
    //             console.log("thing screen get thing:", thing)
    //             th = thing
    //         }
    //     })
    //     return th
    // },
    //
    // refreshThings: function (things) {
    //
    //     let thing;
    //     while (typeof (thing = this.things.pop()) !== 'undefined') {
    //         thing.cleanup();
    //     }
    //     if (things.size === 0) {
    //         this.things = []
    //     } else {
    //
    //         things.forEach((description, thingId) => {
    //             App.gatewayModel.getThingModel(thingId).then((thingModel) => {
    //                 this.renderThing(thingModel, description);
    //             });
    //         });
    //     }
    // },
    //
    // showThings: function () {
    //     App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, this.refreshThing);
    //     App.gatewayModel.unsubscribe(Constants.DELETE_THINGS, this.refreshThing);
    //     App.gatewayModel.subscribe(Constants.DELETE_THINGS, this.refreshThings);
    //     App.gatewayModel.subscribe(Constants.REFRESH_THINGS, this.refreshThings, true);
    // },


}


export default ThingsScreen;