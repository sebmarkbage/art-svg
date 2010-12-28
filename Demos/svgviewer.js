new Request.XML({

	url: 'testcase.svg',

	onSuccess:  function(txt, doc){

		new ART(1000, 500)
			.grab(ART.SVG.parse(doc.documentElement).scale(3))
			.inject(document.body);

		ART.SVG.parse(doc).inject(document.body);

	}

}).get();