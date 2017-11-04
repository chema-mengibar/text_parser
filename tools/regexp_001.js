var through = require('through2');
var contents = require('file-contents');
var parseString = require('xml2js').parseString;
var htmlparser = require("htmlparser2");
var esprima = require('esprima');
var writeFile = require('write');
const writeJsonFile = require('write-json-file');
var beautify = require('js-beautify')

//##############################################################################

var PATH_TO_FILE  = './target/';
var FILE_TO_PARSE = 'dic.txt';

//##############################################################################

var toStream = function( fp ) {
  var stream = through.obj( );
  stream.write( {path: fp} );
  stream.end();
  return stream;
}

var getFileContent = function( PATH_TO_FILE, FILE_TO_PARSE ){
  toStream( PATH_TO_FILE + FILE_TO_PARSE )
  .pipe(contents())
  .on('data', function( file ){

    var fileContent = file.contents.toString( );

    var blocksMain = /([a-zA-Z]*)\s([a-zA-Z]*)\s\[([a-z]{3})\]\s(\d\.\s[\D]*)\s/g;
    var blocksText = /\d.\s([\w,\s.äü]*)\'([a-zA-Z\süäö.]*)'/g;

    var match = blocksMain.exec( fileContent );
    var result = {
      "word": match[1]
      ,"type": match[2]
      ,"article": match[3]
      ,"text": match[4]
    }

    var match = blocksText.exec( result.text );
    result.definition = match[1]
    result.example = match[2]

    writeJsonFile( './result/' + FILE_TO_PARSE + '__regexpResult.json', { result } );

  });
}

//##############################################################################

getFileContent( PATH_TO_FILE, FILE_TO_PARSE )
