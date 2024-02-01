import icons from "url:../img/icons/sprite.svg";

class RenderView {
  #list = document.querySelector(".list");
  #contentAllTasks = document.querySelector(".filter__all");
  #contentCompletTasks = document.querySelector(".filter__completed");

  constructor() {}

  renderList(p_entries) {
    this.#list.textContent = "";
    let entriesArr = p_entries;

    if (!Array.isArray(p_entries)) entriesArr = Object.values(p_entries);

    entriesArr.forEach(p_entry => this.renderEntry(p_entry));
  }

  renderEntry(p_entry) {
    this.#list.insertAdjacentHTML("afterbegin", this.#getEntryMarkup(p_entry));
  }

  setNumberAllTasks(p_currentNr) {
    this.#contentAllTasks.textContent = `${p_currentNr}`;
  }

  setNumberCompletedTasks(p_currentNr) {
    this.#contentCompletTasks.textContent = `${p_currentNr}`;
  }

  #getEntryMarkup(p_entry) {
    return `
      <li class="list__entry">
        <p class="list__text ${
          p_entry.isCompleted ? "list__text--completed" : ""
        }" data-id="${p_entry.id}" draggable="true">
          ${p_entry.content}
        </p>
        <menu class="list__menu">
          <button title="Erledigt" class="btn btn--complete">
            <svg>
              <use href="${icons}#icon-check" />
            </svg>
          </button>
          <button title="Bearbeiten" class="btn btn--edit">
            <svg>
              <use href="${icons}#icon-pen" />
            </svg>
          </button>
          <button title="Löschen" class="btn btn--delete">
            <svg>
              <use href="${icons}#icon-trash" />
            </svg>
          </button>
        </menu>
      </li>
    `;
  }
}

export default new RenderView();
