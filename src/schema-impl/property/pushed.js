
import StringLabelDetail from './string-label';


export default class PushedDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('pushed'));
    this.id = `pushed-${Utils.escapeHtmlForIdClass(this.name)}`;
  }


  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = value ? fluent.getMessage('pushed') : fluent.getMessage('not-pushed');
    this.labelElement.inverted = value;
  }
}

