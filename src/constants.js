const Constants = {
    CONNECTED: 'connected',
    DELETE_THING: 'deleteThing',
    DELETE_THINGS: 'deleteThings',
    EVENT_OCCURRED: 'eventOccurred',
    PROPERTY_STATUS: 'propertyStatus',
    REFRESH_THINGS: 'refreshThings',
    DELETE_GROUP: 'deleteGroup',
    DELETE_GROUPS: 'deleteGroups',
    ThingFormat: {
        INTERACTIVE: 0,
        EXPANDED: 1,
        LINK_ICON: 2,
    },
    WoTOperation: {
        READ_PROPERTY: 'readproperty',
        WRITE_PROPERTY: 'writeproperty',
        INVOKE_ACTION: 'invokeaction',
        READ_ALL_PROPERTIES: 'readallproperties',
        WRITE_MULTIPLE_PROPERTIES: 'writemultipleproperties',
        SUBSCRIBE_ALL_EVENTS: 'subscribeallevents',
        UNSUBSCRIBE_ALL_EVENTS: 'unsubscribeallevents',
        QUERY_ALL_ACTIONS: 'queryallactions',
    },
    ORIGIN: window.location.origin
}
export default Constants
