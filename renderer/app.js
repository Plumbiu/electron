
const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')
const titleInput = document.getElementById('title')
const filePathElement = document.getElementById('filePath')
btn.addEventListener('click', () => {
  const title = titleInput.value
  window.electronApi.setTitle(title)
})
btn2.addEventListener('click', async () => {
  const filePath = await window.electronApi.openFile()
  filePathElement.innerText = filePath
})