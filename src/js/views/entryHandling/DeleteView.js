import List from "./List";

class DeleteView extends List {
  addHandlerDelete(p_handler) {
    this._list.addEventListener("click", e => {
      //? Schutzklausel
      if (!e.target.closest(".btn--delete")) return;

      const entry = this._getEntry(e);
      this.#removeEntry(entry);
      p_handler(this._getEntryId(entry));
    });
  }

  #removeEntry(p_entry) {
    p_entry.remove();
  }
}

export default new DeleteView();
