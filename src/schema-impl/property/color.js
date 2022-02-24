import * as Utils from "../../utils";

class ColorDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || 'color';
    this.id = `color-${Utils.escapeHtmlForIdClass(this.name)}`;
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
