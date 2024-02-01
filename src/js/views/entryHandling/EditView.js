import List from "./List";

class EditView extends List {
  #handlerEdit;
  #entryContent;
  #entryId;

  addHandlerEdit(p_handler) {
    this._list.addEventListener("click", e => {
      const entry = this._getEntry(e);

      //? Schutzklausel
      if (!this.#isTarget(e, entry)) return;

      this.#handlerEdit = p_handler;
      this.#entryContent = this._getEntryText(entry);
      this.#entryId = this._getEntryId(entry);
      this.#activateEditable(entry);
    });
  }

  #activateEditable() {
    this.#entryContent.setAttribute("contenteditable", "true");
    this.#entryContent.focus();
    this.#addEventDisableEditable();
  }

  #addEventDisableEditable() {
    this.#entryContent.addEventListener("keydown", e => {
      if (e.key === "Enter") this.#disableEditableMode();
    });

    this.#entryContent.addEventListener("focusout", e => {
      //? Schutzklausel
      if (e.relatedTarget?.classList.contains("btn--edit")) return;

      this.#disableEditableMode();
    });
  }

  #disableEditableMode() {
    this.#entryContent.removeAttribute("contenteditable");

    //? Angehangene Events wieder entfernen
    this.#entryContent.replaceWith(this.#entryContent.cloneNode(true));

    this.#handlerEdit(this.#entryId, this.#entryContent.textContent.trim());
  }

  #isTarget(p_e, p_entry) {
    if (!p_e.target.closest(".btn--edit")) return false;

    if (p_entry.firstElementChild.hasAttribute("contenteditable")) {
      this.#disableEditableMode();
      return false;
    }

    return true;
  }
}

export default new EditView();
