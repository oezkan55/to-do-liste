class DragAndDrop {
  entries = [...document.querySelectorAll(".list__entry")];
  #entriesText = document.querySelectorAll(".list__text");

  #dragedEl;
  #initZone;

  //?== Mobile-Touch ==
  #isDraged = false;
  #elInitX;
  #elInitY;
  #cursorStartX;
  #cursorStartY;

  constructor() {
    this.#addEvents(...this.#entriesText);
  }

  updateEventForNewEntry(p_elementId) {
    const newEl = document.querySelector(`[data-id="${p_elementId}"]`);
    console.log(newEl);
    this.#addEvents(newEl);
  }

  updateEventForNewList() {
    const list = document.querySelectorAll(".list__text");
    this.#addEvents(...list);
  }

  #getDragedElAndInitZone(e) {
    this.#dragedEl = e.target;
    this.#initZone = e.target.parentNode;
  }

  #touchElNewPosition(p_x, p_y) {
    this.#dragedEl.style.left = `${p_x}px`;
    this.#dragedEl.style.top = `${p_y}px`;
  }

  #dragDrop(p_targEl, p_targZone) {
    p_targZone.prepend(this.#dragedEl);
    this.#initZone.prepend(p_targEl);
  }

  #touchStart(e) {
    this.#isDraged = true;

    this.#getDragedElAndInitZone(e);

    this.#elInitX = this.#dragedEl.getBoundingClientRect().x;
    this.#elInitY = this.#dragedEl.getBoundingClientRect().y + scrollY;

    this.#touchElNewPosition(this.#elInitX, this.#elInitY);

    this.#cursorStartX = e.touches[0].clientX;
    this.#cursorStartY = e.touches[0].clientY;

    this.#dragedEl.classList.add("list__text--touch");
  }

  #touchMove(e) {
    e.preventDefault();

    if (!this.#isDraged) return;

    const distanceX = this.#cursorStartX - e.touches[0].clientX;
    const distanceY = this.#cursorStartY - e.touches[0].clientY;

    const elNewXpos = this.#elInitX - distanceX;
    const elNewYpos = this.#elInitY - distanceY;

    this.#touchElNewPosition(elNewXpos, elNewYpos);
  }

  #touchEnd(e) {
    this.#isDraged = false;

    this.#dragedEl.classList.remove("list__text--touch");
    this.#dragedEl.style = "";

    const targetEl = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );

    if (
      this.#dragedEl === targetEl ||
      !targetEl.classList.contains("list__text")
    )
      return;

    const targetZone = targetEl.parentNode;
    this.#dragDrop(targetEl, targetZone);
  }

  #dragStart(e) {
    //? Damit die Phase "Eintrag Bearbeiten" beendet wird bei "Drag" Handlungen
    document.activeElement.blur();

    this.#getDragedElAndInitZone(e);
  }

  #drag() {
    this.#dragedEl.classList.add("list__text--drag");
  }

  #dragEnd() {
    this.#dragedEl.classList.remove("list__text--drag");
  }

  #dragLeave(e) {
    e.target.parentElement.classList.remove("list__entry--drop-target");
  }

  #dragEnter(e) {
    if (this.#dragedEl === e.target) return;

    e.target.parentElement.classList.add("list__entry--drop-target");
  }

  #drop(e) {
    this.#dragedEl.classList.remove("list__text--drag");
    e.target.parentElement.classList.remove("list__entry--drop-target");

    if (this.#dragedEl === e.target) return;

    const targetEl = e.target;
    const targetZone = e.target.parentNode;
    this.#dragDrop(targetEl, targetZone);
  }

  #addEvents(...p_dragElements) {
    p_dragElements.forEach(p_el => {
      //?== Desktop ==
      p_el.addEventListener("dragover", e => e.preventDefault());
      p_el.addEventListener("dragstart", this.#dragStart.bind(this));
      p_el.addEventListener("drag", this.#drag.bind(this));
      p_el.addEventListener("dragend", this.#dragEnd.bind(this));
      p_el.addEventListener("dragleave", this.#dragLeave.bind(this));
      p_el.addEventListener("dragenter", this.#dragEnter.bind(this));
      p_el.addEventListener("drop", this.#drop.bind(this));

      //?== Mobile touch ==
      p_el.addEventListener("touchstart", this.#touchStart.bind(this));
      p_el.addEventListener("touchmove", this.#touchMove.bind(this));
      p_el.addEventListener("touchend", this.#touchEnd.bind(this));
    });
  }
}

export default new DragAndDrop();
