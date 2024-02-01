export const getIsCompletedEntries = function (p_entries, p_isCompleted) {
  const entriesArr = Object.values(p_entries);
  const filtered = entriesArr.filter(
    p_entry => p_entry.isCompleted === p_isCompleted
  );

  return filtered;
};

export const removeCompletedEntries = function (p_entries) {
  const entriesArr = Object.values(p_entries.all);

  entriesArr.forEach(p_entry => {
    if (p_entry.isCompleted === false) return;

    delete p_entries.all[p_entry.id];
    p_entries.nrCompleted--;
    p_entries.nrAllTasks--;
  });
};
