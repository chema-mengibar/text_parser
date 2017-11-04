var through = require( 'through2' );
var contents = require( 'file-contents' );
var parseString = require( 'xml2js' ).parseString;
var htmlparser = require( "htmlparser2" );
var esprima = require( 'esprima' );
var writeFile = require( 'write' );
const writeJsonFile = require( 'write-json-file' );
var beautify = require( 'js-beautify' )

//##############################################################################

var PATH_TO_FILE  = './target/'
var FILE_TO_PARSE = 'dic.txt'
var ANALYZER_FILE = 'analizer_002.js'

var analizer = require( "./parser_tools/" + ANALYZER_FILE )


//##############################################################################


var toStream = function( fp ){
  var stream = through.obj( );
  stream.write( {path: fp} );
  stream.end( );
  return stream;
}

var getFileContent = function( PATH_TO_FILE, FILE_TO_PARSE ){

  toStream( PATH_TO_FILE + FILE_TO_PARSE )
    .pipe( contents( ) )
    .on( 'data', function( file ){
      var fileContent = file.contents.toString( )
      //var obj = JSON.parse( fileContent )
      var contentElements =  esprima.tokenize( fileContent , { comment: true, tolerant:true } );
      writeJsonFile( './result/' + FILE_TO_PARSE + '__esprimaItems.json', { contentElements } );

      var RESPONSE = analizer.dictionary( contentElements );
      //console.log( RESPONSE )// beautify( RESPONSE[0] , {indent:1} )
      writeJsonFile( './result/' + FILE_TO_PARSE + '__esprimaResult.json', RESPONSE[0] );


    });
}

//##################################### RUN ####################################


getFileContent( PATH_TO_FILE, FILE_TO_PARSE )
