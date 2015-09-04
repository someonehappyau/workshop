'use strict';

var natural=require('natural');

var tokenizer=new natural.WordTokenizer();

distance('cbr600rr', 'cbr 600');
distance('cbr600f4', 'cbr 600');
distance('cbr600f3','cbr 600');
distance('cbr600f2','cbr 600');

function distance(a,b){
	console.log(natural.JaroWinklerDistance(a,b));
};


var NGrams = natural.NGrams;

console.log(NGrams.bigrams('some words here'));
console.log(NGrams.bigrams(['some',  'words',  'here']));
