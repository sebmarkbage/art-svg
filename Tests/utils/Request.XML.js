/*
---

script: Request.XML.js

description: Extends the basic Request Class by forcing a XML parsing even for unknown mime types.

license: MIT-style license.

requires:
- /Request

provides: [Request.XML]

...
*/

Request.XML = new Class({

	Extends: Request,

	success: function(text, xml){
		try {
			if (xml && xml.documentElement){
			} else if (window.DOMParser){
				xml = new DOMParser().parseFromString(text, 'text/xml');
			} else {
				try { xml = new ActiveXObject('MSXML2.DOMDocument'); }
				catch (e){ xml = new ActiveXObject('Microsoft.XMLDOM'); }
				xml.resolveExternals = false;
				xml.validateOnParse = false;
				xml.async = false;
				xml.preserveWhiteSpace = true;
				xml.loadXML(text);
			}
		} catch (e){
			xml = null;
		}
		this.response.xml = xml;
		this.parent(text, xml);
	}

});