export function getViewPort() {
  return window.innerHeight;
}

export function setViewPortSize($el) {
  const size = getViewPort();
  $el.style.blockSize = `${size}px`;
}

export function onViewPortRezise(callback) {
  window.addEventListener("resize", callback);
}

export function offViewPortRezise(callback) {
  window.removeEventListener("resize", callback);
}

export function viewPortSize($el) {
  setViewPortSize($el);

  onViewPortRezise(() => setViewPortSize($el));
}
