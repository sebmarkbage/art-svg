new Request.XML({

	url: location.search.substr(1) || '../Demos/testcase.svg',

	onSuccess:  function(txt, doc){
	
		var klass = ART.SVG.parse(doc).toClass();
	
		var result = document.createElement('textarea');
		result.value = 'var Sample = ' + klass + ';';
		
		document.body.appendChild(result);
	}

}).get();