import NumericLabelDetail from "./numeric-label";

export default class CurrentDetail extends NumericLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('current'), 'A', 1);
    // this.id = `current-${Utils.escapeHtmlForIdClass(this.name)}`;

    if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
      this.precision = `${property.multipleOf}`.split('.')[1].length;
    } else {
      this.precision = 1;
    }
  }


}

