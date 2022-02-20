
import StringLabelDetail  from './string-label';
import {escapeHtml} from '../../utils';


class AlarmDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('alarm'));
    this.readOnly = !!property.readOnly;
    this.id = `alarm-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  attach() {
    super.attach();

    if (!this.readOnly) {
      this.input = this.labelElement;
      const setChecked = Utils.debounce(500, this.set.bind(this));
      this.input.addEventListener('change', setChecked);
    }
  }

  view() {
    if (this.readOnly) {
      return `
        <webthing-alarm-property data-value="OK"
          data-name="${escapeHtml(this.label)}" id="${this.id}">
        </webthing-alarm-property>`;
    } else {
      return `
        <webthing-boolean-property
          data-name="${escapeHtml(this.label)}" id="${this.id}">
        </webthing-boolean-property>`;
    }
  }

  update(value) {
    if (!this.labelElement) {
      return;
    }

    if (this.readOnly) {
      this.labelElement.value = value ? 'ALARM' : 'OK';
      this.labelElement.inverted = value;
    } else {
      if (value == this.input.checked) {
        return;
      }

      this.input.checked = value;
    }
  }

  set() {
    this.thing.setProperty(this.name, this.input.checked);
  }
}

module.exports = AlarmDetail;
