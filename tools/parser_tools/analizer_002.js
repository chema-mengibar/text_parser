
var writeFile = require('write');
const writeJsonFile = require('write-json-file');



exports.dictionary = function( esprimaItems ){
  //_______________________________________________________________________________________________________________________
  var i = esprimaItems;
  var il =  i.length ;
  var p = 0;  //pointer
  var c = 0; //cursor
  var RES_1 = "";
  var RES_2 = "";

  //Define flags for each searched block
  var flags = {
    "name":false,
    "article":false,
    "definition":false,
    "example":false,
  }

  //Obj to saved values
  var values = {
    "name" : "",
    "article" : "",
    "definition" : [],
    "example" : ""
  }



  // Run
  while( c < il ){

    // Flag to avoid some step
    stepFlag = true;

    //------------------------------------------- find name
    if( !flags.name &&
        i[c].type == "Identifier"
    ){
      values.name = i[c].value;
      flags.name = true;
    }

    //------------------------------------------- find article
    if( !flags.article
        && i[c].type == "Punctuator"
        && i[c].value == "["
        && i[c+2].value == "]"
    ){
      values.article = i[ c + 1 ].value;
      flags.article = true;
    }

    //------------------------------------------- capture definition
    if( flags.definition
        && i[c].type == "String"
    ){
      flags.definition = false
    }

    if( flags.definition ){
      values.definition.push( i[c].value );
    }

    if( !flags.definition
        && i[c].type == "Punctuator"
        && i[c].value == "]"
        && i[c+1].type == "Numeric"
    ){
      flags.definition = true
    }



    //-------------------------------------------find example
    if( !flags.example
        && i[c].type == "String"
    ){
      values.example= i[ c ].value;
      flags.example = true;
    }

    // increment cursor position always at least to the next item
    c++;
  } //end while


  return [ values ];
//_______________________________________________________________________________________________________________________
}
