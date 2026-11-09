/* Browser persistence and simple simulated data access. */
window.UMISStore = (() => {
  const key = 'umis-prototype-registration-v1';
  const defaults = { commenced: false, meal: null, residence: null, worship: null, courses: [], confirmedAt: {} };
  function read() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(key) || '{}') }; }
    catch { return { ...defaults }; }
  }
  function save(state) { localStorage.setItem(key, JSON.stringify(state)); }
  return {
    get: read,
    reset() { localStorage.removeItem(key); },
    commence() { const s = read(); s.commenced = true; save(s); return s; },
    confirm(field, value) {
      const s = read(); s[field] = value; s.confirmedAt[field] = new Date().toISOString(); save(s); return s;
    }
  };
})();
