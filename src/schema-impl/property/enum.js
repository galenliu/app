

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

    attach() {
        this.select = this.thing.element.querySelector(`#${this.id}`);
        const setValue = Utils.debounce(500, this.set.bind(this));
        this.select.addEventListener('change', setValue);
    }


    update(value) {
        if (!this.select) {
            return;
        }

        this.select.value = value;
    }

    set() {
        this.thing.setProperty(this.name, this.select.value);
    }
}


