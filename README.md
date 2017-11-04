# text_parser
This project compares two methods to parse and extract text with Javascript in Node.js context: Esprima and Regexp.

The parser script reads the file from the "target" folder, process the file content ans save the output in the "result" folder
./target  -> (*) -> result

## Usage
Install
```
npm install
```

## Methods:

### Esprima
This method use Esprima tokenizer to get the content items. Then an analizer will extract the selected content blocks.
Run
```
npm run parser
```
or
```
node ./tools/parser_001.js
```

### Regexp
This methods use regular expressions to extract the content blocks.
```
npm run regexp
```
or
```
node ./tools/regexp_001.js
```

## More Infos:
http://motuo.info/blog/#!/blog/post/85

# To do:
This is a test with simple text. The next part will be a Javascript Parser, to implemnting other projects:
https://github.com/eslint/espree
