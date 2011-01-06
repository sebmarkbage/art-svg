ART.SVG.Parser.implement({
	
	rectElement: function(element, styles){
		var x = this.getLengthAttribute(element, styles, 'x', 'x'),
		    y = this.getLengthAttribute(element, styles, 'y', 'y'),
		    w = this.getLengthAttribute(element, styles, 'width', 'x'),
		    h = this.getLengthAttribute(element, styles, 'height', 'y'),
		    rx = this.getLengthAttribute(element, styles, 'rx', 'x'),
		    ry = this.getLengthAttribute(element, styles, 'ry', 'y'),
		    r = rx && ry ? (rx + ry) / 2 : rx || ry, // TODO: Use custom path
		    shape = new ART.Rectangle(w, h, r);
		if (w == 0 || h == 0) return null;
		this.shape(element, styles, shape, x, y);
		return shape;
	},

	circleElement: function(element, styles){
		var x = this.getLengthAttribute(element, styles, 'cx', 'x'),
		    y = this.getLengthAttribute(element, styles, 'cy', 'y'),
		    r = this.getLengthAttribute(element, styles, 'r'),
		    shape = new ART.Ellipse(r * 2, r * 2);
		if (r == 0) return null;
		this.shape(element, styles, shape, x - r, y - r);
		return shape;
	},
	
	ellipseElement: function(element, styles){
		var x = this.getLengthAttribute(element, styles, 'cx', 'x'),
		    y = this.getLengthAttribute(element, styles, 'cy', 'y'),
		    rx = this.getLengthAttribute(element, styles, 'rx', 'x'),
		    ry = this.getLengthAttribute(element, styles, 'ry', 'y'),
		    shape = ry != 0 ? new ART.Ellipse(rx * 2, ry * 2) : new ART.Shape();
		if (rx == 0 || ry == 0) return null;
		this.shape(element, styles, shape, x - rx, y - ry);
		return shape;
	},
	
	lineElement: function(element, styles){
		var x1 = this.getLengthAttribute(element, styles, 'x1', 'x'),
		    y1 = this.getLengthAttribute(element, styles, 'y1', 'y'),
		    x2 = this.getLengthAttribute(element, styles, 'x2', 'x'),
		    y2 = this.getLengthAttribute(element, styles, 'y2', 'y'),
		    shape = new ART.Shape(new ART.Path().moveTo(x1, y1).lineTo(x2, y2));
		if (x1 == x2 && y1 == y2) return null;
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