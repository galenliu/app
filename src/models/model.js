export default class Model {

    constructor() {
        this.handlers = new Map();
        return this
    }

    cleanup() {
        this.handlers.forEach((value) => {
            value.clear()
        })
        this.handlers.clear()
    }

    subscribe(event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event,new Map())
        }
        const eventHandlers = this.handlers.get(event)
        eventHandlers.set(handler, handler)
    }

    unsubscribe(event, handler) {
        if (!this.handlers.has(event)) {
         return
        }
        const eventHandlers = this.handlers.get(event)
        eventHandlers.delete(handler)

    }

    async handleEvent(event, ...state) {

        if (!this.handlers.has(event)) {
            return;
        }
        const eventHandlers = this.handlers.get(event);
        console.log(`handle event:${event},state:${state}`)
        for (const handler of eventHandlers.keys()) {
            try {
                await handler(...state)
            } catch (e) {
                console.error(`Error occurred in handler event:${event} state:${state} ${e}`);
            }
        }

    }
}
