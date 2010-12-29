if (!ART.SVG) ART.SVG = {};

(function(){

// Regular Expressions

var matchURL = /^\s*url\(\s*([^\)]*?)\s*\)/,
	number = '(?:(?:\\s+|\\s*,\\s*)([^\\s,\\)]+))?',
	matchViewBox = new RegExp('^\\s*([^\\s,]+)' + number + number + number),
	matchUnit = /^\s*([\+\-\d\.]+(?:e\d+)?)(|px|em|ex|in|pt|pc|mm|cm|%)\s*$/i;

// Environment Settings
var dpi = 72, emToEx = 0.5;

var styleSheet = function(){},
	defaultStyles = {
		viewportWidth: 500,
		viewportHeight: 500,
		'font-size': 12,
		color: 'black'
	};

// Visitor

ART.SVG.Parser = new Class({

	parse: function(element, styles){
		if (!styles) styles = defaultStyles;
		else
			for (var style in defaultStyles)
				if (!(styles in styles)) styles[styles] = defaultStyles[styles];
		
		if (element.documentElement){
			element = element.documentElement;
			var canvas = new ART(
				this.parseLength(element.getAttribute('width') || '100%', styles, 'x'),
				this.parseLength(element.getAttribute('height') || '100%', styles, 'y')
			);
			if (element.getAttribute('viewBox'))
				canvas.grab(this.parse(element, styles));
			else
				this.container(element, this.parseStyles(element, styles), canvas);
			return canvas;
		}
		if (element.nodeType != 1) return null;
		styles = this.parseStyles(element, styles);
		var parseFunction = this[element.nodeName + 'Element'];
		return parseFunction ? parseFunction.call(this, element, styles) : null;
	},
	
	parseStyles: function(element, styles){
		styleSheet.prototype = styles;
		var newSheet = new styleSheet();
		this.fillElementStyles(element, newSheet);
		if (newSheet.hasOwnProperty('font-size')){
			var newFontSize = this.parseLength(newSheet['font-size'], styles, 'font');
			if (newFontSize != null) newSheet['font-size'] = newFontSize;
		}
		return newSheet;
	},
	
	fillElementStyles: function(element, target){
		var attributes = element.attributes;
		for (var i = 0, l = attributes.length; i < l; i++){
			var attribute = attributes[i];
			if (attribute.nodeValue != 'inherit')
				target[attribute.nodeName] = attribute.nodeValue;
		}
		return target;
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
	
	findByURL: function(document, url){
		if (url != '#') return null; // External document references are not supported
		return this.findById(document, url.substr(1));
	},

	resolveURL: function(url){
		return url;
	},
	
	parseLength: function(value, styles, dimension){
		var match = matchUnit.exec(value);
		if (!match) return null;
		var result = parseFloat(match[1]);
		switch(match[2]){
			case '': case 'px': return result;
			case 'em': return result * styles['font-size'];
			case 'ex': return result * styles['font-size'] * emToEx;
			case 'in': return result * dpi;
			case 'pt': return result * dpi / 72;
			case 'pc': return result * dpi / 6;
			case 'mm': return result * dpi / 25.4;
			case 'cm': return result * dpi / 2.54;
			case '%':
				var w = styles.viewportWidth, h = styles.viewportHeight;
				if (dimension == 'font') return result * styles['font-size'] / 100;
				if (dimension == 'x') return result * w / 100;
				if (dimension == 'y') return result * h / 100;
				return result * Math.sqrt(w * w + h * h) / Math.sqrt(2) / 100;
		}
	},
	
	parseColor: function(value, opacity, styles){
		var color = new Color(value == 'currentColor' ? styles.color : value);
		color.alpha = opacity == null ? 1 : +opacity;
		return color;
	},
	
	container: function(element, styles, container){
		if (container.width != null) styles.viewportWidth = container.width;
		if (container.height != null) styles.viewportHeight = container.height;
		this.filter(element, styles, container);
		var node = element.firstChild;
		while (node){
			var art = this.parse(node, styles);
			if (art) container.grab(art);
			node = node.nextSibling;
		}
		return container;
	},

	shape: function(element, styles, target){
		this.transform(element, target);
		this.fill(element, styles, target);
		this.stroke(element, styles, target);
		this.filter(element, styles, target);
		return target;
	},
	
	fill: function(element, styles, target){
		if (!styles.fill || styles.fill == 'none') return;
		var match;
		if (match = matchURL.exec(styles.fill)){
			var fill = this.findByURL(element.ownerDocument, match[1]),
			    fillFunction = fill && this[fill.nodeName + 'Fill'];
			if (fillFunction) fillFunction.call(this, fill, target);
		} else {
			target.fill(this.parseColor(styles.fill, styles['fill-opacity'], styles));
		}
	},
	
	stroke: function(element, styles, target){
		if (!styles.stroke || styles.stroke == 'none' || matchURL.test(styles.stroke)) return; // Advanced stroke colors are not supported, TODO: log
		var color = this.parseColor(styles.stroke, styles['stroke-opacity'], styles),
			width = this.parseLength(styles['stroke-width'], styles),
			cap = styles['stroke-linecap'] || 'butt',
			join = styles['stroke-linejoin'] || 'miter';
		target.stroke(color, width == null ? 1 : width, cap, join);
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
	},
	
	filter: function(element, styles, target){
		if (styles.hasOwnProperty('opacity') && styles.opacity != 1) target.blend(styles.opacity);
	},
	
	svgElement: function(element, styles){
		var viewbox = element.getAttribute('viewBox'),
		    match = matchViewBox.exec(viewbox),
		    group = match ? new ART.Group(+match[3], +match[4]).move(-match[1], -match[2]) : new ART.Group(),
		    width = this.parseLength(element.getAttribute('width'), styles, 'x'),
		    height = this.parseLength(element.getAttribute('height'), styles, 'y');
		if (width && height) group.resizeTo(width, height); // TODO: Aspect ratio
		this.container(element, styles, group);
		return group;
	},
	
	gElement: function(element, styles){
		var group = new ART.Group();
		this.transform(element, group);
		this.container(element, styles, group);
		return group;
	},
	
	useElement: function(element, styles){
		var target = this.findByURL(element.ownerDocument, element.getAttribute('xlink:href'));
		if (!target) return null;

		var symbol = (target.nodeName == 'symbol') ? this.svgElement(target, this.parseStyles(target, styles)) : this.parse(target, styles);

		var width = element.getAttribute('width'), height = element.getAttribute('height');
		if (width && height) symbol.resizeTo(width, height); // TODO: Aspect ratio

		// Inject move before other transform to avoid nested groups
		var targetTransform = new ART.Transform(symbol);
		this.transform(element, symbol.transformTo(1, 0, 0, 1));
		return symbol
			.move(element.getAttribute('x') || 0, element.getAttribute('y') || 0)
			.transform(targetTransform);
	},
	
	switchElement: function(element, styles){
		var node = element.firstChild;
		while (node){
			var art = this.parse(node, styles);
			if (art) return art;
			node = node.nextSibling;
		}
		return null;
	},
	
	pathElement: function(element, styles){
		var shape = new ART.Shape(element.getAttribute('d'));
		this.shape(element, styles, shape);
		return shape;
	},
	
	imageElement: function(element, styles){
		var image = new ART.SVG.Image(
			this.resolveURL(element.getAttribute('xlink:href')),
			this.parseLength(element.getAttribute('width'), styles, 'x'),
			this.parseLength(element.getAttribute('height'), styles, 'y')
		);
		this.filter(element, styles, image);
		this.transform(element, image);
		var x = this.parseLength(element.getAttribute('x'), styles, 'x'),
		    y = this.parseLength(element.getAttribute('y'), styles, 'y');
		image.transform(1, 0, 0, 1, x, y);
		return image;
	}

});

ART.SVG.parse = ART.SVG.Parser.prototype.parse.bind(ART.SVG.Parser.prototype);

})();