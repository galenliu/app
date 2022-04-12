


class BooleanDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || name;
    this.id = `boolean-${Utils.escapeHtmlForIdClass(this.name)}`;
  }



  set() {
    this.thing.setProperty(this.name, this.input.checked);
  }
}

export default BooleanDetail;



