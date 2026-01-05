console.log('Script loaded');

document.getElementById('saveBtn').addEventListener('click', () => {
  const text = document.getElementById('noteArea').value;
  console.log(`Text: ${text}`)
});