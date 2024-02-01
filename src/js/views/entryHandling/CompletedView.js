import List from "./List";

class CompleteView extends List {
  addHandlerCompleted(p_handler) {
    this._list.addEventListener("click", e => {
      //? Schutzklausel
      if (!e.target.closest(".btn--complete")) return;

      const entry = this._getEntry(e);
      this.#toMark(entry);
      p_handler(this._getEntryId(entry), this.#isComplete(entry));
    });
  }

  #toMark(p_entry) {
    this._getEntryText(p_entry).classList.toggle("list__text--completed");
  }

  #isComplete(p_entry) {
    return this._getEntryText(p_entry).classList.contains(
      "list__text--completed"
    );
  }
}

export default new CompleteView();
