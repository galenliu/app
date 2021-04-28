/**
 * Abstract Model class.
 *
 */
'use strict';

class Model {
    constructor() {
        this.handlers = new Map();
        return this;
    }

    /**
     * Cleanup objects.
     */
    cleanup() {
        this.handlers.forEach((value) => {
            value.clear();
        });
        this.handlers.clear();
    }

    /**
     * Unsubscribe changing state events.
     * @param {string} event - an event the handler subscribed
     * @param {function} handler - the handler subscribed
     */
    unsubscribe(event, handler) {
        if (!this.handlers.has(event)) {
            return;
        }

        const eventHandlers = this.handlers.get(event);
        eventHandlers.delete(handler);
    }

    /**
     * Subscribe changing state events.
     * @param {string} event - an event the handler subscribe
     * @param {function} handler - the handler for getting state.
     */
    subscribe(event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Map());
        }

        const eventHandlers = this.handlers.get(event);
        eventHandlers.set(handler, handler);
    }

    /**
     * Call the handlers which subscribed.
     * @param {string} event - an event
     * @param {*} state - a state which is pushed to handlers
     */
    async handleEvent(event, state) {
        if (!this.handlers.has(event)) {
            return;
        }
        const eventHandlers = this.handlers.get(event);
        for (const handler of eventHandlers.keys()) {
            try {
                await handler(state);
            } catch (e) {
                console.log("handler:", handler, "state:", state)
                console.error(
                    `Error occurred in handler event:${event} state:${state} ${e}`
                );
            }
        }
    }
}

export default Model;
