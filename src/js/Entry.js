export default class Entry {
  content;
  id;
  isCompleted = false;

  constructor(p_content) {
    this.content = p_content;
    this.#setId();
  }

  #setId() {
    this.id = Date.now();
  }
}
