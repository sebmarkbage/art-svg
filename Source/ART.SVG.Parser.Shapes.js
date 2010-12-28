ART.SVG.Parser.implement({
	
	rectElement: function(element){
		var x = +element.getAttribute('x') || 0,
		    y = +element.getAttribute('y') || 0,
		    width = +element.getAttribute('width') || 0,
		    height = +element.getAttribute('height') || 0,
		    r = (+element.getAttribute('rx') + element.getAttribute('ry') || 0) / 2,
		    shape = new ART.Rectangle(width, height, r);
		this.shape(element, shape);
		return shape.transform(1, 0, 0, 1, x, y);
	},

	circleElement: function(element){
		var x = +element.getAttribute('cx') || 0,
		    y = +element.getAttribute('cy') || 0,
		    r = +element.getAttribute('r') || 0,
		    shape = new ART.Ellipse(r * 2, r * 2);
		this.shape(element, shape);
		return shape.transform(1, 0, 0, 1, x, y);
	},
	
	ellipseElement: function(element){
		var x = +element.getAttribute('cx') || 0,
		    y = +element.getAttribute('cy') || 0,
		    rx = +element.getAttribute('rx') || 0,
		    ry = +element.getAttribute('ry') || 0,
		    shape = new ART.Ellipse(rx * 2, ry * 2);
		this.shape(element, shape);
		return shape.transform(1, 0, 0, 1, x, y);
	},
	
	lineElement: function(element){
		var x1 = +element.getAttribute('x1') || 0,
		    y1 = +element.getAttribute('y1') || 0,
		    x2 = +element.getAttribute('x2') || 0,
		    y2 = +element.getAttribute('y2') || 0,
		    shape = new ART.Shape(new ART.Path().moveTo(x1, y1).lineTo(x2, y2));
		return this.shape(element, shape);
	},
	
	parsePolypath: function(points){
		var pointMatcher = /([\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+)[\s\,]+([\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+)/ig,
		    first = true;
		return new ART.Path(points.replace(pointMatcher, function(match){
			if (first){ first = false; return 'M' + match; }
			return 'L' + match;
		}));
	},

	polygonElement: function(element){
		var path = this.parsePolypath(element.getAttribute('points') + ''),
			shape = new ART.Shape(path.close());
		return this.shape(element, shape);
	},

	polylineElement: function(element){
		var path = this.parsePolypath(element.getAttribute('points') + ''),
			shape = new ART.Shape(path);
		return this.shape(element, shape);
	}

});
