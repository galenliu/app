

import StringLabelDetail from './string-label';


export default class LeakDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('leak'));
    // this.id = `leak-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = value ? fluent.getMessage('leak') : fluent.getMessage('dry');
    this.labelElement.inverted = value;
  }
}

