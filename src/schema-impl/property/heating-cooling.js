

import StringLabelDetail from './string-label';


export default class HeatingCoolingDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('off'));
    this.id = `heating-cooling-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = `${value}`.toUpperCase();
  }
}

