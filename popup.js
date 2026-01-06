const textArea = document.getElementById('noteArea');
const noteList = document.getElementById('noteList');
const saveButton = document.getElementById('saveBtn');
const cancelButton = document.getElementById('cancelBtn');
let editingIndex = null;

const displayNotes = (notes) => {
  noteList.innerHTML = notes.map((note, index) => 
    `<div>${note}</div><button class='deleteBtn' data-index="${index}">Delete</button><button class='editBtn' data-index="${index}">Edit</button>`
  ).join('');

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => button.addEventListener('click', () => {
    const index = button.dataset.index;
    notes.splice(index, 1);
    
    chrome.storage.local.set({ notes: notes }).then(() => {
      displayNotes(notes);
    });
  }));

  const editButtons = document.querySelectorAll('.editBtn');
  editButtons.forEach(button => button.addEventListener('click', () => {
    const index = button.dataset.index;
    textArea.value = notes[index];
    saveButton.textContent = 'Update';
    cancelButton.style.display = 'inline';
    editingIndex = index;
    textArea.focus();
  }));
};

cancelButton.addEventListener('click', () => {
  saveButton.textContent = 'Save';
  textArea.value = '';
  editingIndex = null;
  cancelButton.style.display = 'none';  
});

saveButton.addEventListener('click', () => {
  const text = textArea.value
  if (!text) return;

  chrome.storage.local.get(["notes"]).then((result) => {
    const notes = result.notes || [];

    if (editingIndex === null) {
      notes.push(text);
    } else {
      notes[editingIndex] = text;
      saveButton.textContent = 'Save';
      editingIndex = null;
      cancelButton.style.display = 'none';
    }

    chrome.storage.local.set({ notes: notes }).then(() => {
      console.log("Note saved");
      displayNotes(notes);
      textArea.value = '';
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {  
  chrome.storage.local.get(["notes"]).then((result) => {
    const savedNotes = result.notes || [];
    displayNotes(savedNotes);
  });
});