
export default class NumericLabelDetail {
  constructor(thing, name, readOnly, label, unit, precision) {
    this.thing = thing;
    this.name = name;
    this.readOnly = readOnly;
    this.label = label;
    this.unit = Units.nameToAbbreviation(unit);
    this.precision = precision;
    this.id = `label-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  attach() {
    this.labelElement = this.thing.element.querySelector(`#${this.id}`);
  }



  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = parseFloat(value) || 0;
  }
}


