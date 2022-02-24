import * as Utils from "../../utils";

export default  class OnOffDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title ||  'on-off';
    this.id = `on-off-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  update(on) {
    this.input.checked = on;
  }

  set() {
    this.thing.setProperty(this.name, this.input.checked);
  }
}


