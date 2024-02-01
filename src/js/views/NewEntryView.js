class NewEntryView {
  #form = document.querySelector(".new-entry");
  #inputField = document.querySelector(".new-entry__input");

  addHandlerNewEntry(p_handler) {
    this.#form.addEventListener("submit", e => {
      e.preventDefault();

      const entryValue = this.#inputField.value.trim();
      this.#form.reset();

      if (!entryValue) return;

      p_handler(entryValue);
    });
  }
}

export default new NewEntryView();
