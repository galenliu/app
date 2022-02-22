
class ColorDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || fluent.getMessage('color');
    this.id = `color-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  attach() {
    this.color = this.thing.element.querySelector(`#${this.id}`);
    this.color.addEventListener('change', this.set.bind(this));
  }

  view() {
    const readOnly = this.readOnly ? 'data-read-only="true"' : '';
    return `
      <webthing-color-property data-name="${Utils.escapeHtml(this.label)}"
        id="${this.id}" ${readOnly}>
      </webthing-color-property>`;
  }

  update(color) {
    if (!this.color) {
      return;
    }

    this.color.value = color;
  }

  set() {
    this.thing.setProperty(this.name, this.color.value);
  }
}

 export default  ColorDetail;
