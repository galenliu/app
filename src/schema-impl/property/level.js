export default class LevelDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title || "level";
        this.unit = property.unit // ? Units.nameToAbbreviation(property.unit) : null;

        if (property.hasOwnProperty('minimum')) {
            this.min = property.minimum;
        } else {
            this.min = 0;
        }

        if (property.hasOwnProperty('maximum')) {
            this.max = property.maximum;
        } else {
            this.max = 100;
        }

        this.precision = 0;
        if (property.hasOwnProperty('multipleOf')) {
            this.step = property.multipleOf;

            if (`${property.multipleOf}`.includes('.')) {
                this.precision = `${property.multipleOf}`.split('.')[1].length;
            }
        } else if (property.type === 'number') {
            this.step = 1;
        } else {
            this.step = 1;
        }

    }
}


