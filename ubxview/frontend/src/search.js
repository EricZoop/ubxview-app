// search.js
// Search bar injection/filtering and hexdb.io aircraft lookup for the stats panel

// ─── Search Bar ───────────────────────────────────────────────────────────────
const SEARCH_BAR_ID = 'stats-search-bar';
const SEARCH_WRAPPER_ID = 'stats-search-wrapper';

/**
 * Inject the search bar into the stats container if not already present.
 * Attaches input filtering and key-event isolation handlers.
 */
export function injectSearchBar(statsContainer) {
    if (document.getElementById(SEARCH_WRAPPER_ID)) return;

    const wrapper = document.createElement('div');
    wrapper.id = SEARCH_WRAPPER_ID;
    wrapper.className = 'stats-search-wrapper';

    const input = document.createElement('input');
    input.id = SEARCH_BAR_ID;
    input.type = 'text';
    input.placeholder = 'Search Airspace';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.className = 'stats-search-input';
    input.addEventListener('input', () => filterStatsPanels(input.value.trim().toLowerCase()));

    const stopProp = (e) => e.stopPropagation();
    input.addEventListener('keydown', stopProp);
    input.addEventListener('keyup', stopProp);
    input.addEventListener('keypress', stopProp);

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.classList.add('stats-search-icon');
    icon.setAttribute('viewBox', '0 0 512 512');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z');
    icon.appendChild(path);

    wrapper.appendChild(input);
    wrapper.appendChild(icon);
    statsContainer.insertBefore(wrapper, statsContainer.firstChild);
}

/**
 * Show or hide the search bar based on the number of visible stat panels.
 * Clears the search input when hidden.
 */
export function updateSearchBarVisibility(count) {
    const wrapper = document.getElementById(SEARCH_WRAPPER_ID);
    if (!wrapper) return;
    if (count > 3) {
        wrapper.style.display = 'block';
    } else {
        wrapper.style.display = 'none';
        const input = document.getElementById(SEARCH_BAR_ID);
        if (input && input.value !== '') {
            input.value = '';
            filterStatsPanels('');
        }
    }
}

/**
 * Filter stats panels by matching the query against header text and talker ID.
 * Adds a 'last-visible' class to the final matched panel for border-radius styling.
 */
export function filterStatsPanels(query) {
    const panels = document.querySelectorAll('#stats .stats-group');
    let lastVisible = null;
    panels.forEach(panel => {
        panel.classList.remove('last-visible');
        if (!query) { panel.style.display = ''; lastVisible = panel; return; }
        const header = panel.querySelector('.talker-header');
        const text = (header ? header.textContent : '').toLowerCase();
        const tid = (header?.dataset.talkerId || '').toLowerCase();
        const isMatch = text.includes(query) || tid.includes(query);
        panel.style.display = isMatch ? '' : 'none';
        if (isMatch) lastVisible = panel;
    });
    if (lastVisible) lastVisible.classList.add('last-visible');
}

/**
 * Return the current search bar query, or an empty string if not present.
 */
export function getCurrentSearchQuery() {
    const input = document.getElementById(SEARCH_BAR_ID);
    return input ? input.value.trim().toLowerCase() : '';
}

// ─── Aircraft Lookup Cache (hexdb.io) ────────────────────────────────────────
const aircraftCache = new Map();
const pendingFetches = new Set();

/**
 * Resolve a photo URL for an aircraft hex code via hexdb.io.
 * Returns null if no image is available or the request fails.
 */
async function resolveAircraftImage(hex) {
    const normalized = hex.toUpperCase();
    try {
        const resp = await fetch(`https://hexdb.io/hex-image?hex=${normalized}`);
        if (!resp.ok) return null;
        const url = (await resp.text()).trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) return url;
    } catch (_) {}
    return null;
}

/**
 * Fetch aircraft metadata from hexdb.io for a given ICAO hex address.
 * Results are stored in aircraftCache and applied to the DOM if already rendered.
 * No-ops if the hex is already cached or a fetch is already in-flight.
 */
export async function fetchAircraftInfo(hex) {
    const normalized = hex.toUpperCase();
    if (aircraftCache.has(normalized) || pendingFetches.has(normalized)) return;

    pendingFetches.add(normalized);
    try {
        const resp = await fetch(`https://hexdb.io/api/v1/aircraft/${normalized}`);
        if (!resp.ok) {
            aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
            return;
        }
        const data = await resp.json();
        if (data.error) {
            aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
            return;
        }
        aircraftCache.set(normalized, {
            model: data.Type || data.ICAOTypeCode || 'Unknown',
            manufacturer: data.Manufacturer || '',
            registration: data.Registration || '',
            operator: data.RegisteredOwners || '',
            type: data.ICAOTypeCode || '',
            fetched: true,
            imageResolved: false,
            imageUrl: null
        });

        applyAircraftInfoToDOM(hex);

        window.dispatchEvent(new CustomEvent('aircraftInfoLoaded', {
            detail: { talkerId: hex, model: data.Type || data.ICAOTypeCode || 'Unknown' }
        }));

    } catch (err) {
        console.warn(`hexdb.io lookup failed for ${hex}:`, err);
        aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
    } finally {
        pendingFetches.delete(normalized);
    }
}

/**
 * Apply cached aircraft info to the currently rendered ADS-B panel DOM elements.
 * Also triggers image resolution on first call if the model is known.
 */
export function applyAircraftInfoToDOM(hex) {
    const normalized = hex.toUpperCase();
    const info = aircraftCache.get(normalized);
    if (!info) return;

    const icao = hex;

    const headerEl = document.getElementById(`${icao}-header-model`);
    if (headerEl) {
        headerEl.textContent = (info.model && info.model !== 'Unknown') ? info.model : icao;
    }

    const regEl = document.getElementById(`${icao}-reg-stat`);
    if (regEl) regEl.textContent = info.registration || '--';

    const opEl = document.getElementById(`${icao}-operator-stat`);
    if (opEl) opEl.textContent = info.operator || '--';

    const imgEl = document.getElementById(`${icao}-aircraft-img`);
    if (imgEl && !info.imageResolved && info.model !== 'Unknown') {
        info.imageResolved = true;
        resolveAircraftImage(normalized).then(url => {
            if (url) {
                info.imageUrl = url;
                imgEl.src = url;
            }
        });
    } else if (imgEl && info.imageUrl) {
        if (!imgEl.src || imgEl.src !== info.imageUrl) imgEl.src = info.imageUrl;
    }
}

/**
 * Return the cached aircraft model string for a given ICAO hex address.
 * Triggers a background fetch if no data is cached yet.
 */
export function lookupAircraftModel(icaoAddress) {
    if (!icaoAddress) return 'Unknown';
    const normalized = icaoAddress.toUpperCase();
    const cached = aircraftCache.get(normalized);
    if (cached) return cached.model || 'Unknown';
    fetchAircraftInfo(icaoAddress);
    return 'Loading...';
}