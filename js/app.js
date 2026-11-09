(() => {
  function route() {
    const name=location.hash.replace(/^#\/?/,'').split('/')[0] || 'login';
    UMISPages.renderRoute(name);
  }
  window.addEventListener('hashchange',route);
  route();
})();
