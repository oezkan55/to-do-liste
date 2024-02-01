export default class List {
  _list = document.querySelector(".list");

  _getEntry(e) {
    return e.target.closest(".list__entry");
  }

  _getEntryId(p_entry) {
    return p_entry.firstElementChild.dataset.id;
  }

  _getEntryText(p_entry) {
    return p_entry.firstElementChild;
  }
}
