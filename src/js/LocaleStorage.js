class LocalStorage {
  setEntriesData(p_data) {
    localStorage.setItem("entries", JSON.stringify(p_data));
  }

  getEntries() {
    return JSON.parse(localStorage.getItem("entries"));
  }
}

export default new LocalStorage();
