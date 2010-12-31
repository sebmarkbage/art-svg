if (!ART.SVG) ART.SVG = {};

(function(){

// Regular Expressions

var matchURL = /^\s*url\(\s*([^\)]*?)\s*\)/,
	requiredNumber = '(?:\\s+|\\s*,\\s*)([^\\s,\\)]+)';
	number = '(?:' + requiredNumber + ')?',
	matchViewBox = new RegExp('^\\s*([^\\s,]+)' + requiredNumber + requiredNumber + requiredNumber),
	matchUnit = /^\s*([\+\-\d\.]+(?:e\d+)?)(|px|em|ex|in|pt|pc|mm|cm|%)\s*$/i;

// Environment Settings
var dpi = 72, emToEx = 0.5;

var styleSheet = function(){},
	defaultStyles = {
		viewportWidth: 500,
		viewportHeight: 500,
		'font-size': 12,
		color: 'black'
	},
	nonInheritedStyles = {
		'stop-color': 'black',
		'stop-opacity': 1,
		'clip-path': null,
		'filter': null,
		'mask': null,
		'opacity': 1
	},
	// Some additional colors not included in Color class
	namedColors = {
		crimson: '#dc143c',
		palegreen: '#98fb98',
		forestgreen: '#228b22',
		royalblue: '#4169e1',
		firebrick: '#b22222',
		seagreen: '#2e8b57',
		mediumblue: '#0000cd',
		indianred: '#cd5c5c',
		lawngreen: '#7cfc00',
		mediumturquoise: '#48d1cc',
		darkblue: '#00008b',
		gold: '#ffd700',
		lightblue: '#add8e6',
		grey: '#808080'
	};

// Visitor

ART.SVG.Parser = new Class({

	parse: function(element, styles){
		if (!styles) styles = this.findStyles(element);
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
		if (element.nodeType != 1 || element.getAttribute('requiredExtensions') || element.getAttribute('systemLanguage') != null) return null;
		styles = this.parseStyles(element, styles);
		var parseFunction = this[element.nodeName + 'Element'];
		return parseFunction ? parseFunction.call(this, element, styles) : null;
	},
	
	parseStyles: function(element, styles){
		styleSheet.prototype = styles;
		var newSheet = new styleSheet();
		for (var key in nonInheritedStyles) newSheet[key] = nonInheritedStyles[key];
		this.applyStyles(element, newSheet);
		if (newSheet.hasOwnProperty('font-size')){
			var newFontSize = this.parseLength(newSheet['font-size'], styles, 'font');
			if (newFontSize != null) newSheet['font-size'] = newFontSize;
		}
		if (newSheet.hasOwnProperty('text-decoration')){
			newSheet['text-decoration-color'] = newSheet.color;
		}
		return newSheet;
	},
	
	findStyles: function(element){
		if (!element || element.nodeType != 1) return defaultStyles;
		var styles = this.findStyles(element.parentNode);
		return this.parseStyles(element, styles);
	},
	
	applyStyles: function(element, target){
		var attributes = element.attributes;
		for (var i = 0, l = attributes.length; i < l; i++){
			var attribute = attributes[i],
			    name = attribute.nodeName,
			    value = attribute.nodeValue;
			if (value != 'inherit'){
				target[name] = value;
				target[name + '_document'] = element.ownerDocument;
			}
		}
		return target;
	},

	findById: function(document, id){
		// if (document.getElementById) return document.getElementById(id); Not reliable
		if (this.cacheDocument != document){
			this.ids = {};
			this.lastSweep = null;
			this.cacheDocument = document;
		}
		var ids = this.ids;
		if (ids[id] != null) return ids[id];
		var root = document.documentElement, node = this.lastSweep || root;
		treewalker: while (node){
			if (node.nodeType == 1){
				var newID = node.getAttribute('id');
				if (newID && ids[newID] == null) ids[newID] = node;
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
	
	findByURL: function(document, url, callback){
		callback(url && url[0] == '#' ? this.findById(document, url.substr(1)) : null);
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
		if (value == 'currentColor') value = styles.color;
		try {
			var color = new Color(namedColors[value] || value);
		} catch (x){
			// Ignore unparsable colors, TODO: log
			return null;
		}
		color.alpha = opacity == null ? 1 : +opacity;
		return color;
	},
	
	getLengthAttribute: function(element, styles, attr, dimension){
		return this.parseLength(element.getAttribute(attr) || 0, styles, dimension);
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

	shape: function(element, styles, target, x, y){
		this.transform(element, target);
		target.transform(1, 0, 0, 1, x, y);
		this.fill(element, styles, target, x, y);
		this.stroke(element, styles, target);
		this.filter(element, styles, target);
		return target;
	},
	
	fill: function(element, styles, target, x, y){
		if (!styles.fill || styles.fill == 'none') return;
		var match;
		if (match = matchURL.exec(styles.fill)){
			var self = this;
			this.findByURL(styles.fill_document, match[1], function(fill){
				var fillFunction = fill && self[fill.nodeName + 'Fill'];
				if (fillFunction) fillFunction.call(self, fill, self.findStyles(fill), target, x, y);
			});
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
					target.transform(match[2], 0, 0, match[3] || match[2]);
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
		if (styles.opacity != 1 && target.blend) target.blend(styles.opacity);
	},
	
	svgElement: function(element, styles){
		var viewbox = element.getAttribute('viewBox'),
		    match = matchViewBox.exec(viewbox),
		    x = this.getLengthAttribute(element, styles, 'x', 'x'),
		    y = this.getLengthAttribute(element, styles, 'y', 'y'),
		    width = this.getLengthAttribute(element, styles, 'width', 'x'),
		    height = this.getLengthAttribute(element, styles, 'height', 'y'),
		    group = match ? new ART.Group(+match[3], +match[4]) : new ART.Group(width || null, height || null);
		if (width && height) group.resizeTo(width, height); // TODO: Aspect ratio
		if (match) group.transform(1, 0, 0, 1, -match[1], -match[2]);
		this.container(element, styles, group);
		group.move(x, y);
		return group;
	},
	
	gElement: function(element, styles){
		var group = new ART.Group();
		this.transform(element, group);
		this.container(element, styles, group);
		return group;
	},
	
	useElement: function(element, styles){
		var self = this,
		    placeholder = new ART.Group(),
		    x = this.getLengthAttribute(element, styles, 'x', 'x'),
		    y = this.getLengthAttribute(element, styles, 'y', 'y'),
		    width = this.getLengthAttribute(element, styles, 'width', 'x'),
		    height = this.getLengthAttribute(element, styles, 'height', 'y');
		
		this.transform(element, placeholder);
		placeholder.transform(1, 0, 0, 1, x, y);
		
		this.findByURL(element.ownerDocument, element.getAttribute('xlink:href'), function(target){
			if (!target || target.nodeType != 1) return;
			
			var parseFunction = target.nodeName == 'symbol' ? self.svgElement : self[target.nodeName + 'Element'];
			if (!parseFunction) return;
			
			styles = self.parseStyles(element, self.parseStyles(target, styles));
			
			var symbol = parseFunction.call(self, target, styles);
			if (!symbol) return;
			if (width && height) symbol.resizeTo(width, height); // TODO: Aspect ratio, maybe resize the placeholder instead
			placeholder.grab(symbol);
		});
		
		return placeholder;
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
	
	aElement: function(element, styles){
		// For now treat it like a group
		return this.gElement(element, styles);
	},
	
	pathElement: function(element, styles){
		var shape = new ART.Shape(element.getAttribute('d'));
		this.shape(element, styles, shape);
		return shape;
	},
	
	imageElement: function(element, styles){
		var href = this.resolveURL(element.getAttribute('xlink:href')),
		    width = this.getLengthAttribute(element, styles, 'width', 'x'),
		    height = this.getLengthAttribute(element, styles, 'height', 'y'),
		    x = this.getLengthAttribute(element, styles, 'x', 'x'),
		    y = this.getLengthAttribute(element, styles, 'y', 'y'),
		    clipPath = element.getAttribute('clip-path'),
		    image,
		    match;
		
		if (clipPath && (match = matchURL.exec(clipPath)) && match[1][0] == '#'){
			var clip = this.findById(element.ownerDocument, match[1].substr(1));
			if (clip && (clip = this.switchElement(clip, styles)) && typeof clip.fillImage == 'function'){
				clip.fillImage(href, width, height);
				image = clip;
			}
		}
		if (!image){
			//image = new ART.Image(href, width, height); TODO
			image = new ART.Rectangle(width, height).fillImage(href, width, height);
		}
		this.filter(element, styles, image);
		this.transform(element, image);
		image.transform(1, 0, 0, 1, x, y);
		return image;
	}

});

ART.SVG.parse = ART.SVG.Parser.prototype.parse.bind(ART.SVG.Parser.prototype);

})();