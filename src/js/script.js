import RenderView from "./RenderView";
import CompleteView from "./views/entryHandling/CompletedView";
import DragAndDrop from "./DragAndDrop";
import EditView from "./views/entryHandling/EditView";
import Entry from "./Entry";
import NewEntryView from "./views/NewEntryView";
import DeleteView from "./views/entryHandling/DeleteView";
import DeleteSelectionView from "./views/DeleteSelectionView";
import FilterView from "./views/FilterView";
import { getIsCompletedEntries, removeCompletedEntries } from "./helpers";
import LocaleStorage from "./LocaleStorage";

let entries = {
  all: {},
  nrCompleted: 0,
  nrAllTasks: 0,
};

const controlLocalStorage = function () {
  const dataEntries = LocaleStorage.getEntries();

  if (!dataEntries) return;

  entries = dataEntries;
  RenderView.renderList(Object.values(entries.all));
  RenderView.setNumberCompletedTasks(entries.nrCompleted);
  RenderView.setNumberAllTasks(entries.nrAllTasks);
  DragAndDrop.updateEventForNewList();
};

const controlNewEntry = function (p_entryText) {
  const entry = new Entry(p_entryText);
  entries.all[entry.id] = entry;

  RenderView.renderEntry(entry);
  RenderView.setNumberAllTasks(++entries.nrAllTasks);
  DragAndDrop.updateEventForNewEntry(entry.id);
  LocaleStorage.setEntriesData(entries);
};

const controlDeleteAllCompleted = function () {
  if (!entries.nrCompleted) return;

  removeCompletedEntries(entries);
  RenderView.renderList(Object.values(entries.all));
  RenderView.setNumberCompletedTasks(entries.nrCompleted);
  RenderView.setNumberAllTasks(entries.nrAllTasks);
  DragAndDrop.updateEventForNewList();
  LocaleStorage.setEntriesData(entries);
};

const controlDeleteAll = function () {
  if (!entries.nrAllTasks) return;

  entries.nrAllTasks = 0;
  entries.nrCompleted = 0;

  entries.all = {};
  RenderView.setNumberCompletedTasks(entries.nrCompleted);
  RenderView.setNumberAllTasks(entries.nrAllTasks);
  LocaleStorage.setEntriesData(entries);
};

const controlEntryCompleted = function (p_entryId, p_isCompleted) {
  entries.all[p_entryId].isCompleted = p_isCompleted;
  p_isCompleted ? entries.nrCompleted++ : entries.nrCompleted--;
  RenderView.setNumberCompletedTasks(entries.nrCompleted);
  LocaleStorage.setEntriesData(entries);
};

const controlEntryEdit = function (p_entryId, p_newText) {
  entries.all[p_entryId].content = p_newText;
  DragAndDrop.updateEventForNewEntry(p_entryId);
  LocaleStorage.setEntriesData(entries);
};

const controlEntryDelete = function (p_entryId) {
  if (entries.all[p_entryId].isCompleted)
    RenderView.setNumberCompletedTasks(--entries.nrCompleted);

  delete entries.all[p_entryId];
  RenderView.setNumberAllTasks(--entries.nrAllTasks);
  LocaleStorage.setEntriesData(entries);
};

const controlFilter = function (p_filterWord) {
  if (p_filterWord === "all") RenderView.renderList(entries.all);

  if (p_filterWord === "pending")
    RenderView.renderList(getIsCompletedEntries(entries.all, false));

  if (p_filterWord === "complete")
    RenderView.renderList(getIsCompletedEntries(entries.all, true));

  DragAndDrop.updateEventForNewList();
};

const init = function () {
  controlLocalStorage();
  DragAndDrop;

  NewEntryView.addHandlerNewEntry(controlNewEntry);
  DeleteSelectionView.addHandlerDeleteCompleted(controlDeleteAllCompleted);
  DeleteSelectionView.addHandlerDeleteAll(controlDeleteAll);

  CompleteView.addHandlerCompleted(controlEntryCompleted);
  EditView.addHandlerEdit(controlEntryEdit);
  DeleteView.addHandlerDelete(controlEntryDelete);

  FilterView.addHandlerFilter(controlFilter);
};
init();
