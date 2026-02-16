/**
 * Configuration for tile services.
 */
export const TILE_SERVICES = {
    satellite: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        name: "Satellite"
    },
    streetview: {
        url: "https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        name: "Topographic"
    }
};

/**
 * Default application settings.
 */
export const DEFAULTS = {
    initialOpacity: 0.5,
    initialTileService: 'satellite',
    zoomLevel: 17,           // NMEA / rover (< 5 km spread)
    adsbZoomLevel: 11,       // ADS-B / wide-area aircraft
    initialRenderDistance: 7
};