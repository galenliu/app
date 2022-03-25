export default class EnumDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title || name;
        this.type = property.type;
        this.unit = property.unit ? Units.nameToAbbreviation(property.unit) : null;
        this.choices = property.enum;
        // this.id = `enum-${Utils.escapeHtmlForIdClass(this.name)}`;
    }

}


