

export default class StringLabelDetail {
  constructor(thing, name, readOnly, label) {
    this.thing = thing;
    this.name = name;
    this.readOnly = readOnly;
    this.label = label;
    this.id = `label-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  attach() {
    this.labelElement = this.thing.element.querySelector(`#${this.id}`);
  }



  update(value) {
    if (!this.labelElement) {
      return;
    }

    this.labelElement.value = value;
  }
}
