

export  default class StringDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || name;
    // this.id = `string-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  /**
   * Attach to the view.
   */
  attach() {
    this.input = this.thing.element.querySelector(`#${this.id}`);
    this.input.addEventListener('change', () => {
      this.thing.setProperty(this.name, this.input.value);
    });
  }



  /**
   * Update the detail view with the new property value.
   */
  update(string) {
    if (!this.input) {
      return;
    }

    this.input.value = string;
  }
}


