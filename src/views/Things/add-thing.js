/**
 * Create a new "pair" action on the gateway.
 */
import {useState} from "react";

export default function UsePairing() {
    const [newThings, setNewThings] = useState()
    const [actionUrl, setActionUrl] = useState()

    const startPairing = () => {

        // Timeout, in seconds.
        let timeout = 60;
        let proto = 'ws:';
        if (window.location.protocol === 'https:') {
            proto = 'wss:';
        }
        const wsHref = window.location.origin.replace(/^http/, proto);
        const path = `${wsHref}/new_things?jwt=${API.jwt}`;

        // Create a websocket to start listening for new things
        let socket = new WebSocket(path);

        const close = () => {

            if (
                this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING
            ) {
                this.socket.close();
            }
        };
        window.addEventListener('beforeunload', close);

        socket.onmessage = (event) => {

        };
        API.startPairing(timeout)
            .then((json) => {
                setActionUrl(json.pair.href)

                this.pairingTimeout = setTimeout(() => {
                    cancelPairing();
                }, timeout * 1000);
            })
            .catch((error) => {
                console.error(`Pairing request failed: ${error}`);
            });
    }

    const cancelPairing = () => {
        if (this.pairingTimeout !== null) {
            clearTimeout(this.pairingTimeout);
            this.pairingTimeout = null;
        }
        // Close websocket.
        if (typeof this.socket !== 'undefined') {
            this.socket.close();
            delete this.socket;
        }

        const url = this.actionUrl;
        if (!url) {
            return;
        }

        API.cancelPairing(url)
            .then(() => {
                this.actionUrl = null;
            })
            .catch((error) => {
                console.error(`Error cancelling pairing request ${error}`);
            });

    }

    const addThing = (thing) => {
        return API.addThing(thing)
    }


    return [newThings, addThing, startPairing, cancelPairing]
}

