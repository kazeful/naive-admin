export async function getFilesAsync(items) {
  const files = []

  async function recursive(entry) {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file) => {
          files.push(file)
          resolve()
        })
      }
      else {
        const reader = entry.createReader()
        reader.readEntries((entries) => {
          Promise.all(entries.map(entry => recursive(entry))).then(() => resolve())
        })
      }
    })
  }

  await Promise.all(items.filter(item => item.kind === 'file').map(item => recursive(item.webkitGetAsEntry())))

  return files
}
