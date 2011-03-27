new Request.XML({

	url: location.search.substr(1) || '../Demos/testcase.svg',

	onSuccess:  function(txt, doc){
	
		var klass = ART.SVG.parse(doc).toClass();
		
		var statements = ART.Script.grabFontExpressions();
		statements.push(new AST.Variable('Sample').assign(klass));
		
		var result = document.createElement('textarea');
		result.value = AST.Block(statements);
		
		document.body.appendChild(result);
	}

}).get();