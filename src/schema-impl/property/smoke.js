

import StringLabelDetail from './string-label';


export default class SmokeDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('smoke'));
    // this.id = `smoke-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = value;
  }
}


