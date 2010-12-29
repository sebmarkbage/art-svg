ART.SVG.Parser.implement({
	
	rectElement: function(element, styles){
		var x = this.getLengthAttribute(element, styles, 'x', 'x'),
		    y = this.getLengthAttribute(element, styles, 'y', 'y'),
		    w = this.getLengthAttribute(element, styles, 'width', 'x'),
		    h = this.getLengthAttribute(element, styles, 'height', 'y'),
		    r = (this.getLengthAttribute(element, styles, 'rx', 'x') +
		    	this.getLengthAttribute(element, styles, 'ry', 'y')) / 2,
		    shape = new ART.Rectangle(w, h, r);
		this.shape(element, styles, shape);
		return shape.transform(1, 0, 0, 1, x, y);
	},

	circleElement: function(element, styles){
		var x = this.getLengthAttribute(element, styles, 'cx', 'x'),
		    y = this.getLengthAttribute(element, styles, 'cy', 'y'),
		    r = this.getLengthAttribute(element, styles, 'r'),
		    shape = new ART.Ellipse(r * 2, r * 2);
		this.shape(element, styles, shape);
		return shape.transform(1, 0, 0, 1, x - r, y - r);
	},
	
	ellipseElement: function(element, styles){
		var x = this.getLengthAttribute(element, styles, 'cx', 'x'),
		    y = this.getLengthAttribute(element, styles, 'cy', 'y'),
		    rx = this.getLengthAttribute(element, styles, 'rx', 'x'),
		    ry = this.getLengthAttribute(element, styles, 'ry', 'y'),
		    shape = ry != 0 ? new ART.Ellipse(rx * 2, ry * 2) : new ART.Shape();
		this.shape(element, styles, shape);
		return shape.transform(1, 0, 0, 1, x - rx, y - ry);
	},
	
	lineElement: function(element, styles){
		var x1 = this.getLengthAttribute(element, styles, 'x1', 'x'),
		    y1 = this.getLengthAttribute(element, styles, 'y1', 'y'),
		    x2 = this.getLengthAttribute(element, styles, 'x2', 'x'),
		    y2 = this.getLengthAttribute(element, styles, 'y2', 'y'),
		    shape = new ART.Shape(new ART.Path().moveTo(x1, y1).lineTo(x2, y2));
		this.shape(element, styles, shape);
		return shape;
	},
	
	parsePolypath: function(points){
		if (!points) return new ART.Path();
		var pointMatcher = /([\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+)[\s\,]+([\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+)/ig,
		    first = true;
		return new ART.Path(points.replace(pointMatcher, function(match){
			if (first){ first = false; return 'M' + match; }
			return 'L' + match;
		}));
	},

	polygonElement: function(element, styles){
		var path = this.parsePolypath(element.getAttribute('points')),
			shape = new ART.Shape(path.close());
		this.shape(element, styles, shape);
		return shape;
	},

	polylineElement: function(element, styles){
		var path = this.parsePolypath(element.getAttribute('points')),
			shape = new ART.Shape(path);
		this.shape(element, styles, shape);
		return shape;
	}

});
