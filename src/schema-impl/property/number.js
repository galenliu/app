import Units from "../../js/units";
import * as Utils from "../../js/util";


export default class NumberDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title || name;
        this.type = property.type;
        // this.unit = property.unit ? Units.nameToAbbreviation(property.unit) : null;
        this.unit = property.unit;

        if (property.type === 'integer') {
            this.precision = 0;
        } else if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
            this.precision = `${property.multipleOf}`.split('.')[1].length;
        } else {
            this.precision = 3;
        }

        if (property.hasOwnProperty('minimum')) {
            this.min = property.minimum;
        } else {
            this.min = null;
        }

        if (property.hasOwnProperty('maximum')) {
            this.max = property.maximum;
        } else {
            this.max = null;
        }

        if (property.hasOwnProperty('multipleOf')) {
            this.step = property.multipleOf;
        } else if (property.type === 'number') {
            this.step = 'any';
        } else {
            this.step = 1;
        }
    }

}


