class FilterView {
  #filterDropdown = document.querySelector(".filter__content");

  addHandlerFilter(p_handler) {
    this.#filterDropdown.addEventListener("click", e => {
      e.preventDefault();

      if (e.target.getAttribute("data-filter") === "all") p_handler("all");

      if (e.target.getAttribute("data-filter") === "pending")
        p_handler("pending");

      if (e.target.getAttribute("data-filter") === "complete")
        p_handler("complete");
    });
  }
}

export default new FilterView();
