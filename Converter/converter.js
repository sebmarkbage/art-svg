ART.SVG.load(location.search.substr(1) || '../Demos/testcase.svg', function(surface){
	
	var klass = surface.toClass();
	
	var statements = ART.Script.grabFontExpressions();
	statements.push(new AST.Variable('Sample').assign(klass));
	
	var result = document.createElement('textarea');
	result.value = AST.Block(statements);
	
	document.body.appendChild(result);

});