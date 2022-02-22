
import StringLabelDetail from './string-label';


export default class OpenDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('open'));
    this.id = `open-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = value ? fluent.getMessage('open') : fluent.getMessage('closed');
    this.labelElement.inverted = value;
  }
}


