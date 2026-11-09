window.UMISToast = {
  show(message, type = 'success') {
    const region = document.getElementById('toast-region');
    const item = document.createElement('div'); item.className = `toast toast-${type}`;
    item.innerHTML = `<span class="toast-mark">${type === 'success' ? '✓' : '!'}</span><span>${message}</span><button class="toast-close" aria-label="Dismiss">×</button>`;
    region.append(item); item.querySelector('button').onclick = () => item.remove();
    window.setTimeout(() => item.remove(), 4200);
  }
};
