const fs = require('node:fs')
const path = require('node:path')
const tinify = require('tinify')

tinify.key = 'Yy368J0ZrP6k7pWw1C35CzgWw13nKHDr'

const inputFolderPath = path.resolve('src/assets/images')
const outputFolderPath = inputFolderPath

async function processFolder(inputFolderPath, outputFolderPath) {
  if (!fs.existsSync(outputFolderPath))
    fs.mkdirSync(outputFolderPath, { recursive: true })

  const files = fs.readdirSync(inputFolderPath)

  for (const file of files) {
    const filePath = path.join(inputFolderPath, file)
    const outputFilePath = path.join(outputFolderPath, path.relative(inputFolderPath, filePath))

    if (fs.statSync(filePath).isDirectory()) {
      const subFolder = path.join(outputFolderPath, path.relative(inputFolderPath, filePath))
      await processFolder(filePath, subFolder)
    }
    else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp')) {
      try {
        const source = tinify.fromFile(filePath)
        await source.toFile(outputFilePath)
        // eslint-disable-next-line no-console
        console.log(`File compressed: ${outputFilePath}`)
      }
      catch (error) {
        console.error(`Error compressing file ${outputFilePath}: ${error.message}`)
      }
    }
  }
}

processFolder(inputFolderPath, outputFolderPath)
