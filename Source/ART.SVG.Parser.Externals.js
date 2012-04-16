ART.SVG.Parser.implement({
	
	findByURL: function(document, url, callback){
		if (!url){
			callback.call(this, null);
			return;
		}
		if (url[0] == '#'){
			callback.call(this, this.findById(document, url.substr(1)));
			return;
		}
		url = this.resolveURL(url);
		var self = this, i = url.indexOf('#'), id = i > -1 ? url.substr(i + 1) : null;
		if (i > -1) url = url.substr(0, i);
		this.pendingRequests = (this.pendingRequests || 0) + 1;

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				if (xhr.status == 200){
					var resolve = self.resolveURL,
					    doc = xhr.responseXML || self.parseXML(xhr.responseText);
					//self.resolveURL = function(newurl){ return new URI(newurl, { base: url }).toString(); };
					callback.call(self, !doc ? null : id ? self.findById(doc, id) : doc.documentElement);
					self.resolveURL = resolve;
				} else {
					callback.call(self, null);
				}
				if (--self.pendingRequests == 0 && self.oncomplete) self.oncomplete();
			}
		};
		xhr.send(null);
	}

});

ART.SVG.load = function(url, styles, callback){
	if (typeof styles == 'function'){ callback = styles; styles = null; }
	var parser = new ART.SVG.Parser(), result = null;
	parser.oncomplete = function(){ callback(result); };
	parser.findByURL(null, url, function(doc){ result = parser.parse(doc.ownerDocument, styles); });
};