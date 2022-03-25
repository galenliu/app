import {escapeHtmlForIdClass} from "src/js/util";

export default class OnOffDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title || 'on-off';
        this.id = `on-off-${escapeHtmlForIdClass(this.name)}`;
    }
}


