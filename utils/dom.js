export function createDOM(string) {
  const parser = new DOMParser();

  const html = parser.parseFromString(string, "text/html");
  return html.body.firstChild;
}
