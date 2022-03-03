import API from "../../js/api";


export function fetchAvailableAddonList() {
    return new Promise(function (resolve, reject) {
        return API.getAddonsInfo().then((data) => {
            if (!data.nodeVersion || !data.version || !data.architecture || !data.urls || !data) {
                return;
            }
            const params = new URLSearchParams();
            //params.set('arch', data.architecture);
            params.set('arch', "linux-arm");
            params.set('version', data.version);
            if (data.pythonVersions && data.pythonVersions.length > 0) {
                params.set('python', data.pythonVersions.join(','));
            }
            if (data.testAddons) {
                params.set('test', '1');
            }
            const promises = [];
            for (const url of data.urls) {
                console.log("url , params :", url, params.toString())
                promises.push(fetch(`${url}?${params.toString()}`, {
                    method: 'GET',
                    cache: 'reload',
                    headers: {
                        Accept: 'application/json',
                    },
                }));
            }
            return Promise.all(promises)
        }).then(
            (responses) => {
                const promises = []
                for (const resp of responses) {
                    promises.push(resp.json())
                }
                return Promise.all(promises)
            }).then((bodies) => {
                let availableAddons = new Map()
                for (const body of bodies) {
                    for (const addon of body) {
                        const entry = {
                            id: addon.id,
                            name: addon.name,
                            description: addon.description,
                            author: addon.author,
                            homepage_url: addon.homepage_url,
                            license_url: addon.license_url,
                            version: addon.version,
                            url: addon.url,
                            checksum: addon.checksum,
                            primary_type: addon.primary_type,
                            //installed: installedAddons.has(addon.id),
                        }

                        // if (installedAddons.has(addon.id)) {
                        //     continue;
                        // }

                        availableAddons.set(addon.id, entry)
                    }
                }
                resolve(availableAddons);
            }
        ).catch((e) => {
            reject(e)
        })
    })
}



