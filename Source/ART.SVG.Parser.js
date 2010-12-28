if (!ART.SVG) ART.SVG = {};

(function(){

// Regular Expressions

var matchURL = /^\s*url\(\s*([^\)]*?)\s*\)/,
	number = '(?:(?:\\s+|\\s*,\\s*)([^\\s,\\)]+))?',
	matchViewBox = new RegExp('^\\s*([^\\s,]+)' + number + number + number),
	matchUnit = /^\s*([\+\-\d\.]+(?:e\d+)?)(|px|em|ex|in|pt|pc|mm|cm|%)\s*$/i;

// Environment Settings
var dpi = 72, emToEx = 0.5;

// Visitor

ART.SVG.Parser = new Class({

	inheritedStyles: {
		viewportWidth: 500,
		viewportHeight: 500,
		currentFontSize: 12
	},
	
	resolveURL: function(url){
		return url;
	},
	
	parse: function(element){
		if (element.documentElement){
			element = element.documentElement;
			var canvas = new ART(
				this.parseUnit(element.getAttribute('width') || '100%', 'x'),
				this.parseUnit(element.getAttribute('height') || '100%', 'y')
			);
			if (element.getAttribute('viewBox'))
				canvas.grab(this.parse(element));
			else
				this.container(element, canvas);
			return canvas;
		}
		var parseFunction = this[element.nodeName + 'Element'];
		return parseFunction ? parseFunction.call(this, element) : null;
	},
	
	findById: function(document, id){
		if (document.getElementById) return document.getElementById(id);
		var ids = this.ids || (this.ids = {});
		if (ids[id] != null) return ids[id];
		var root = document.documentElement, node = this.lastSweep || root;
		treewalker: while (node){
			if (node.nodeType == 1){
				var newID = node.getAttribute('id');
				if (newID && ids[newID] != null) ids[newID] = node;
				if (newID == id){
					this.lastSweep = node;
					return node;
				}
			}
			if (node.firstChild){
				node = node.firstChild;
			} else {
				while (!node.nextSibling){
					node = node.parentNode;
					if (!node || node == root) break treewalker;
				}
				node = node.nextSibling;
			}
		}
		return null;
	},
		
	fillElementStyles: function(element, target){
		var attributes = element.attributes;
		for (var i = 0, l = attributes.length; i < l; i++){
			var attribute = attributes[i];
			target[attribute.nodeName] = attribute.nodeValue;
		}
		return target;
	},

	getElementStyles: function(element){
		var styleSheet = function(){};
		styleSheet.prototype = this.inheritedStyles;
		var newSheet = new styleSheet();
		this.fillElementStyles(element, newSheet);
		if (newSheet.hasOwnProperty('font-size')){
			var newFontSize = this.parseUnit(newSheet['font-size'], 'font');
			if (newFontSize != null) newSheet.currentFontSize = newFontSize;
		}
		return newSheet;
	},
	
	parseUnit: function(value, dimension){
		var match = matchUnit.exec(value);
		if (!match) return null;
		var result = parseFloat(match[1]),
		    styles = this.inheritedStyles;
		switch(match[2]){
			case '': case 'px': return result;
			case 'em': return result * styles.currentFontSize;
			case 'ex': return result * styles.currentFontSize * emToEx;
			case 'in': return result * dpi;
			case 'pt': return result * dpi / 72;
			case 'pc': return result * dpi / 6;
			case 'mm': return result * dpi / 25.4;
			case 'cm': return result * dpi / 2.54;
			case '%':
				var w = styles.viewportWidth, h = styles.viewportHeight;
				if (dimension == 'font') return result * styles.currentFontSize / 100;
				if (dimension == 'x') return result * w / 100;
				if (dimension == 'y') return result * h / 100;
				return result * Math.sqrt(w * w + h * h) / Math.sqrt(2) / 100;
		}
	},
	
	container: function(element, container){
		var parentStyles = this.inheritedStyles;
		var styles = this.inheritedStyles = this.getElementStyles(element);
		if (container.width != null) styles.viewportWidth = container.width;
		if (container.height != null) styles.viewportHeight = container.height;
		if (styles.hasOwnProperty('opacity') && +styles.opacity != 1) target.blend(+styles.opacity);
		var node = element.firstChild;
		while (node){
			var art = this.parse(node);
			if (art) container.grab(art);
			node = node.nextSibling;
		}
		this.inheritedStyles = parentStyles;
		return container;
	},

	shape: function(element, target){
		this.transform(element, target);
		var styles = this.getElementStyles(element);
		if (styles.fill) this.fillShape(styles, target);
		if (styles.stroke) this.strokeShape(styles, target);
		if (styles.hasOwnProperty('opacity') && +styles.opacity != 1) target.blend(+styles.opacity);
		return target;
	},
	
	fillShape: function(styles, target){
		var match;
		if (match = matchURL.exec(styles.fill)){
			if (match[1][0] == '#'){
				var fill = this.findById(match[1].substr(1)),
					fillFunction = fill && this[fill.nodeName + 'Fill'];
				if (fillFunction) fillFunction.call(this, fill, target);
			}
		} else if (styles.fill != 'none') {
			var color = new Color(styles.fill);
			color.alpha = styles['fill-opacity'] == null ? 1 : +styles['fill-opacity'];
			target.fill(color);
		}
	},
	
	strokeShape: function(styles, target){
		var match;
		if (matchURL.test(styles.stroke)){
			// Advanced stroke colors are not supported, TODO: log
		} else if (styles.stroke != 'none'){
			var color = new Color(styles.stroke),
				width = styles['stroke-width'],
				cap = styles['stroke-linecap'] || 'butt',
				join = styles['stroke-linejoin'] || 'miter';
			color.alpha = styles['stroke-opacity'] == null ? 1 : +styles['stroke-opacity'];
			target.stroke(color, width == null ? 1 : width, cap, join);
		}
	},

	transform: function(element, target){
		var transform = element.getAttribute('transform'), match;
		var matchTransform = new RegExp('([a-z]+)\\s*\\(\\s*([^\\s,\\)]+)' + number + number + number + number + number + '\\s*\\)', 'gi');
		while(match = transform && matchTransform.exec(transform)){
			switch(match[1]){
				case 'matrix':
					target.transform(match[2], match[3], match[4], match[5], match[6], match[7]);
					break;
				case 'translate':
					target.transform(1, 0, 0, 1, match[2], match[3]);
					break;
				case 'scale':
					target.transform(match[2], 0, 0, match[3] == null ? match[2] : match[3]);
					break;
				case 'rotate':
					var rad = match[2] * Math.PI / 180, cos = Math.cos(rad), sin = Math.sin(rad);
					target.transform(1, 0, 0, 1, match[3], match[4])
						.transform(cos, sin, -sin, cos)
						.transform(1, 0, 0, 1, -match[3], -match[4]);
					break;
				case 'skewX':
					target.transform(1, 0, Math.tan(match[2] * Math.PI / 180), 1);
					break;
				case 'skewY':
					target.transform(1, Math.tan(match[2] * Math.PI / 180), 0, 1);
					break;
			}
		}
		return target;
	},
	
	svgElement: function(element){
		var viewbox = element.getAttribute('viewBox'),
		    match = matchViewBox.exec(viewbox),
		    group = match ? new ART.Group(+match[3], +match[4]).move(-match[1], -match[2]) : new ART.Group(),
		    width = this.parseUnit(element.getAttribute('width'), 'x'),
		    height = this.parseUnit(element.getAttribute('height'), 'y');
		if (width && height) group.resizeTo(width, height); // TODO: Aspect ratio
		return this.container(element, group);
	},
	
	gElement: function(element){
		var group = new ART.Group();
		this.transform(element, group);
		return this.container(element, group);
	},
	
	useElement: function(element){
		var href = element.getAttribute('xlink:href');
		if (href[0] != '#') return null;
		var target = this.findById(element.ownerDocument, href.substr(1));
		if (!target) return null;

		var parentStyles = this.inheritedStyles;
		this.inheritedStyles = this.getElementStyles(element);
		var symbol = (target.nodeName == 'symbol') ? this.svgElement(target) : this.parse(target);
		this.inheritedStyles = parentStyles;

		var width = element.getAttribute('width'), height = element.getAttribute('height');
		if (width && height) symbol.resizeTo(width, height); // TODO: Aspect ratio

		var targetTransform = new ART.Transform(symbol);

		// Reapply transform to avoid nested groups
		return this.transform(element, symbol.transformTo(1, 0, 0, 1))
			.move(element.getAttribute('x') || 0, element.getAttribute('y') || 0)
			.transform(targetTransform);
	},
	
	pathElement: function(element){
		var shape = new ART.Shape(element.getAttribute('d'));
		return this.shape(element, shape);
	},
	
	imageElement: function(element){
		var image = new ART.SVG.Image(
			this.resolveURL(element.getAttribute('xlink:href')),
			this.parseUnit(element.getAttribute('width'), 'x'),
			this.parseUnit(element.getAttribute('height'), 'y')
		);
		var styles = this.getElementStyles(element);
		if (styles.hasOwnProperty('opacity') && +styles.opacity != 1) target.blend(+styles.opacity);
		this.transform(element, image);
		image.transform(1, 0, 0, 1, this.parseUnit(element.getAttribute('x'), 'x'), this.parseUnit(element.getAttribute('y'), 'y'));
		return image;
	}

});

ART.SVG.parse = ART.SVG.Parser.prototype.parse.bind(ART.SVG.Parser.prototype);

})();