import ActionDetail from './action';



export default class UnlockActionDetail extends ActionDetail {
    constructor(thing, name, action, href) {
        super(thing, name, action, href);
        // this.id = `unlock-action-button-${Utils.escapeHtmlForIdClass(this.name)}`;
    }
}

