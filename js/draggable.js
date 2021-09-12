const defaultConfig = {
  open: false,
  debug: true,
  animable: false,
};
export function draggable($element, config = defaultConfig) {
  if (!($element instanceof HTMLElement)) {
    return console.warn(
      `Invalid Element a HTMLElement was expected  and was recived ${$element}`
    );
  }

  let isOpen = config.open;
  let isDragging = false;
  const elementRect = $element.getBoundingClientRect();
  const ELEMENT_BLOCK_SIZE = elementRect.height;

  const $marker = $element.querySelector("[data-marker]");
  const MARVEL_BLOCK_SIZE = $marker.getBoundingClientRect().height;

  const VISIBLE_Y_POSITION = 0;
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARVEL_BLOCK_SIZE;
  let widgetPosition = VISIBLE_Y_POSITION;
  isOpen ? open() : close();
  let startY = 0;

  $marker.addEventListener("click", handleClick);
  $marker.addEventListener("pointerdown", handlePointerDown); //when arrastras hacia abajo
  $marker.addEventListener("pointermove", handlePointerMove); //when haces clic y arrastras.
  $marker.addEventListener("pointerup", handlePointerUp); //when sacas el dedo
  $marker.addEventListener("pointerout", handlePointerOut); // when sales de la pantalla
  $marker.addEventListener("pointercancel", handlePointerCancel); //when se cancela el evento o sales a otra app

  if (config.animable) {
    setAnimation();
  }

  function setAnimation() {
    $element.style.transition = "margin-bottom .2s";
  }

  function bounce() {
    if (widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
      return open();
    } else {
      return close();
    }
  }

  function handlePointerDown(event) {
    startDrag(event);
    logger("pointer down");
  }

  function handlePointerUp() {
    dragEnd();
    logger("pointer up");
  }

  function handlePointerOut() {
    logger("pointer out");
  }

  function handlePointerCancel() {
    logger("pointer cancel");
  }

  function handlePointerMove(event) {
    logger("pointer move");
    drag(event);
  }

  function pageY(event) {
    return event.pageY || event.touches[0].pageY;
  }

  function startDrag(event) {
    isDragging = true;

    startY = pageY(event);
  }

  function dragEnd() {
    logger("acabo de arrastrar");
    isDragging = false;
    bounce();
  }

  function drag(event) {
    const cursorY = pageY(event);
    const movementY = cursorY - startY;
    widgetPosition = widgetPosition + movementY;
    startY = cursorY;
    if (widgetPosition > HIDDEN_Y_POSITION) {
      return false;
    }
    setWidgetPosition(widgetPosition);
    logger(movementY);
  }

  function handleClick(event) {
    logger("CLICK");
    toggle(event);
  }

  function toggle() {
    if (!isDragging) {
      if (!isOpen) {
        open();
      } else {
        close();
      }
    }
  }

  function logger(message) {
    if (config.debug) {
      console.info(message);
    }
  }

  function open() {
    isOpen = true;
    widgetPosition = VISIBLE_Y_POSITION;
    setWidgetPosition(widgetPosition);

    logger("open widget");
  }

  function close() {
    isOpen = false;
    widgetPosition = HIDDEN_Y_POSITION;
    setWidgetPosition(widgetPosition);
    logger("close widget");
  }

  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`;
  }

  console.log($element);
}
