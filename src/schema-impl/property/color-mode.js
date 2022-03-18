import EnumDetail from "./enum";


export default class ColorModeDetail extends EnumDetail {
  constructor(thing, name, property) {
    super(thing, name, property);
    // this.id = `color-mode-${Utils.escapeHtmlForIdClass(this.name)}`;
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

