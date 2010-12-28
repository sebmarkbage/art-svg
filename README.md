SVG Parser for ART
==================
This project enables parsing of SVG file and rendered onto the ART API. The result can be rendered at
runtime or written to an ART Script file for faster parsing/rendering.

How to Use
----------
Include the ART.SVG.Parser together with the ART rendering API of your choice. E.g. ART.SVG, ART.VML or
ART.Script.

Load the SVG content as a XML document. Pass the whole document or an element to ART.SVG.parse and you
get an ART object tree in return.

	var canvas = ART.SVG.parse(xmlDocument);
	canvas.inject(document.body);

OR

	var graphics = ART.SVG.parse(element);
	graphics.inject(canvas);

If you pass an entire document, you get an ART canvas in return that you could inject into a HTML DOM.

If you pass a single element, you get an ART element in return that you could inject into an existing
ART canvas.