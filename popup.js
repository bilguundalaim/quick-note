const noteList = document.getElementById('noteList');

const displayNotes = (notes) => {
  noteList.innerHTML = notes.map((note) => 
    `<div>${note}</div>`
  ).join('');
};

document.getElementById('saveBtn').addEventListener('click', () => {
  const textArea = document.getElementById('noteArea');
  const text = textArea.value
  if (!text) return;

  chrome.storage.local.get(["notes"]).then((result) => {
    const notes = result.notes || [];
    notes.push(text);

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