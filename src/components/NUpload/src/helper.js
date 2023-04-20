export async function getFilesAsync(items) {
  const files = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.kind === 'file') {
      if (typeof item.webkitGetAsEntry === 'function') {
        const entry = item.webkitGetAsEntry()
        const entryContent = await readEntryContentAsync(entry)
        files.push(...entryContent)
        continue
      }

      const file = item.getAsFile()
      if (file)
        files.push(file)
    }
  }

  return files
}

function readEntryContentAsync(entry) {
  return new Promise((resolve) => {
    let reading = 0
    const contents = []
    readEntry(entry)

    function readEntry(entry) {
      if (isFile(entry)) {
        reading++
        entry.file((file) => {
          reading--
          contents.push(file)
          if (reading === 0)
            resolve(contents)
        })
      }
      else if (isDirectory(entry)) {
        readReaderContent(entry.createReader())
      }
    }

    function readReaderContent(reader) {
      reading++
      reader.readEntries((entries) => {
        reading--
        for (const entry of entries)
          readEntry(entry)

        if (reading === 0)
          resolve(contents)
      })
    }
  })
}

function isDirectory(entry) {
  return entry.isDirectory
}

function isFile(entry) {
  return entry.isFile
}
