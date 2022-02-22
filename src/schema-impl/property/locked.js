

import StringLabelDetail from  './string-label';


export default class LockedDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('locked'));
    // this.id = `locked-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  update(value) {
    if (!this.label) {
      return;
    }

    if (!['locked', 'unlocked', 'unknown', 'jammed'].includes(value)) {
      value = 'unknown';
    }

    this.labelElement.inverted = value !== 'locked';
  }
}


