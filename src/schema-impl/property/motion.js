
import StringLabelDetail from './string-label';



export default class MotionDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('motion'));
    // this.id = `motion-${Utils.escapeHtmlForIdClass(this.name)}`;
  }


  update(value) {
    if (!this.label) {
      return;
    }

    // this.labelElement.value = value ? fluent.getMessage('motion') : fluent.getMessage('no-motion');
    this.labelElement.inverted = value;
  }
}


