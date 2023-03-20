
const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')
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
// 剪贴板
btn3.addEventListener('click', () => {
  window.electronApi.copy()
})
btn4.addEventListener('click', () => {
  window.electronApi.paste()
})