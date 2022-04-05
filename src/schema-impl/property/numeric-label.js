import Units from "../../js/units";
import * as Utils from "../../js/util";

export default class NumericLabelDetail {
  constructor(thing, name, readOnly, label, unit, precision) {
    this.thing = thing;
    this.name = name;
    this.readOnly = readOnly;
    this.label = label;
    this.precision = precision;
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


