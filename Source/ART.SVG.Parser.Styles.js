(function(){

var applyStyles = ART.SVG.Parser.prototype.applyStyles;

ART.SVG.Parser.implement({

	applyStyles: function(element, target){
		this.findCSS(element.ownerDocument).applyStyle(element, target);
		for (var key in target)
			if (target.hasOwnProperty(key) && target[key] == 'inherit')
				delete target[key];
		if (target.hasOwnProperty('fill')) target['fill_document'] = element.ownerDocument;
		applyStyles.call(this, element, target);
	},
	
	findCSS: function(document){
		if (this.cssDocument != document){
			this.cssDocument = document;
			var css = this.css = new Sheet.Cascade();
			Slick.search(document, 'style').forEach(css.addSheet, css);
			return css;
		} else {
			return this.css;
		}
	}

});

})();