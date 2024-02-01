class DeleteSelectionView {
  #btnCompleted = document.querySelector(".btn--delete-completed");
  #btnAll = document.querySelector(".btn--delete-all");
  #list = document.querySelector(".list");

  addHandlerDeleteCompleted(p_handler) {
    this.#btnCompleted.addEventListener("click", p_handler);
  }

  addHandlerDeleteAll(p_handler) {
    this.#btnAll.addEventListener("click", () => {
      this.#list.textContent = "";
      p_handler();
    });
  }
}

export default new DeleteSelectionView();
