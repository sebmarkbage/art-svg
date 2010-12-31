(function(){

var applyStyles = ART.SVG.Parser.prototype.applyStyles;

ART.SVG.Parser.implement({

	applyStyles: function(element, target){
		var css;
		if (this.cssDocument != element.ownerDocument){
			this.cssDocument = element.ownerDocument;
			this.css = css = new Sheet.Cascade();
			Slick.search(element.ownerDocument, 'style').forEach(css.addSheet, css);
		} else {
			css = this.css;
		}
		css.applyStyle(element, target);
		for (var key in target)
			if (target.hasOwnProperty(key) && target[key] == 'inherit')
				delete target[key];
		applyStyles.call(this, element, target);
	}

});

})();