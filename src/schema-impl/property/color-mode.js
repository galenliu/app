import EnumDetail from "./enum";


export default class ColorModeDetail extends EnumDetail {
  constructor(thing, name, property) {
    super(thing, name, property);
    // this.id = `color-mode-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  attach() {
    if (this.readOnly) {
      this.labelElement = this.thing.element.querySelector(`#${this.id}`);
    } else {
      super.attach();
    }
  }



  update(value) {
    if (this.readOnly) {
      if (!this.labelElement) {

      }

    } else {
      super.update(value);
    }
  }
}

