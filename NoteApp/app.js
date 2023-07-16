// -------------Select Elements---------------
const header = document.querySelector("header");
const main = document.querySelector("main");

//-------------variables-------------
let editId = "";
let editFlag = false;
//-----------------Functions------------------
const editNote = (e) => {
  const element = e.target.classList.contains("edit")
    ? e.target.parentElement.parentElement
    : e.target.parentElement.parentElement.parentElement;
  const note = element.querySelector(".text");
  const elementId = element.dataset.id;
  const textarea = element.querySelector("textarea");
  const doneIcon = element.querySelector(".done");
  doneIcon.classList.remove("on-done");
  textarea.style.display = "flex";
  note.style.display = "none";
  textarea.innerHTML = note.innerHTML;
  console.log(elementId);
  editFlag = true;
};

const deleteNote = (e) => {
  const element = e.target.classList.contains("delete")
    ? e.target.parentElement.parentElement
    : e.target.parentElement.parentElement.parentElement;
  const elementId = element.dataset.id;
  main.removeChild(element);
  deleteNoteFromLocalStorage(elementId);
};

const completeNote = (textarea, textDisplayArea, done, id) => {
  textDisplayArea.innerText = textarea.value;
  textDisplayArea.style.display = "flex";
  textarea.style.display = "none";
  done.classList.add("on-done");
  !editFlag
    ? addNoteToLocalStorage(id, textarea.value)
    : editNoteToLocalStorage(id, textarea.value);
};

const createNote = () => {
  const id = new Date().getTime().toString();
  const section = document.createElement("section");
  const attribute = document.createAttribute("data-id");
  attribute.value = id;
  section.setAttributeNode(attribute);

  section.innerHTML = `  <div class="actions">
    <span class="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </span>
    <span class="delete">
      <i class="fa-solid fa-trash"></i>
    </span>
    <span class="done">
      <i class="fa-solid fa-check"></i>
    </span>
  </div>
  <textarea
    name="note"
    title="note"
    cols="30"
    rows="10"
    placeholder="Type here ..."
  ></textarea>
  <div class="text"></div>`;

  const editButton = section.querySelector(".edit");
  const deleteButton = section.querySelector(".delete");
  const doneButton = section.querySelector(".done");
  const textarea = section.querySelector("textarea");
  const textDisplayArea = section.querySelector(".text");
  editButton.addEventListener("click", editNote);
  deleteButton.addEventListener("click", deleteNote);
  doneButton.addEventListener("click", () =>
    completeNote(textarea, textDisplayArea, doneButton, id)
  );
  main.appendChild(section);
};

//-------------Event Listeners--------------

header.addEventListener("click", createNote);

//------------localStorage---------

const getNotesFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("notes")) || [];

const addNoteToLocalStorage = (id, note) => {
  const notes = getNotesFromLocalStorage();
  notes.push({ id, note });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const editNoteToLocalStorage = (id, modifiedNote) => {
  const notes = getNotesFromLocalStorage();
  const modifiedNotes = notes.map((note) => {
    if (note.id === id) {
      note.note = modifiedNote;
    }
    return note;
  });
  localStorage.setItem("notes", JSON.stringify(modifiedNotes));
  editFlag = false;
};

const deleteNoteFromLocalStorage = (id) => {
  const notes = getNotesFromLocalStorage();
  const modifiedNotes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(modifiedNotes));
};
