#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

fs.readdir(process.cwd(), (err, files) => {
  let renamedCount = 0

  files.forEach(file => {
    if (file.endsWith(process.argv[2])) {
      file = path.join(process.cwd(), file)
      const newFile = getRenamedFile(file, process.argv[3])
      fs.renameSync(file, newFile)
      renamedCount++
    }
  })

  logResults(renamedCount)
})

function getRenamedFile(file, extension) {
  const position = file.lastIndexOf(".")
  return file.substr(0, position < 0 ? file.length : position) + extension
}

function logResults(renamedCount) {
  if (renamedCount == 0) {
    console.log("No files found")
    return
  }

  if (renamedCount == 1) {
    console.log(`Renamed ${renamedCount} file. Done.`)
    return
  }

  console.log(`Renamed ${renamedCount} files. Done.`)
}
