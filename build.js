var fs = require('fs')

require('shelljs/global')

// package information
var packageJson = JSON.parse(fs.readFileSync('package.json').toString())
var version = packageJson.version

// clone and build Green Turtle
rm('-rf', 'green-turtle')
exec('git clone git@github.com:alexmilowski/green-turtle.git green-turtle')
cd('green-turtle')
exec('ant')
cd('..')

/**
 * RDFaProcessor.js
 */
var RDFaProcessorJS = fs.readFileSync('green-turtle/build/RDFaProcessor.' + version + '.js').toString()

// replace constants with integer value
RDFaProcessorJS = RDFaProcessorJS.split('Node.ELEMENT_NODE').join('1')
RDFaProcessorJS = RDFaProcessorJS.split('Node.DOCUMENT_NODE').join('9')

// attach CommonJS export code
RDFaProcessorJS = RDFaProcessorJS + 'module.exports = RDFaProcessor\n'

fs.writeFileSync('RDFaProcessor.js', RDFaProcessorJS)
