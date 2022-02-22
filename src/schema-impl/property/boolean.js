


class BooleanDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || name;
    this.id = `boolean-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  /**
   * Attach to the view.
   */
  attach() {
    this.input = this.thing.element.querySelector(`#${this.id}`);
    const setChecked = Utils.debounce(500, this.set.bind(this));
    this.input.addEventListener('change', setChecked);
  }



  /**
   * Update the detail view with the new property value.
   */
  update(bool) {
    if (!this.input || bool == this.input.checked) {
      return;
    }

    this.input.checked = bool;
  }

  set() {
    this.thing.setProperty(this.name, this.input.checked);
  }
}

export default BooleanDetail;
