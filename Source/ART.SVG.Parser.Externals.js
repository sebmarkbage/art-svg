ART.SVG.Parser.implement({

	Implements: Events,
	
	findByURL: function(document, url, callback){
		if (!url){
			callback(null);
			return;
		}
		if (url[0] == '#'){
			callback(this.findById(document, url.substr(1)));
			return;
		}
		url = new URI(this.resolveURL(url));
		var id = url.get('fragment'), self = this;
		this.pendingRequests = (this.pendingRequests || 0) + 1;
		new Request.XML({
		
			url: url.toString(),
			
			onSuccess: function(txt, doc){
				var resolve = self.resolveURL;
				self.resolveURL = function(newurl){ return new URI(newurl, { base: url }).toString(); };
				callback(!doc ? null : id ? self.findById(doc, id) : doc.documentElement);
				self.resolveURL = resolve;
				if (--self.pendingRequests == 0) self.fireEvent('complete');
			},
			
			onFailure: function(){
				callback(null);
				if (--self.pendingRequests == 0) self.fireEvent('complete');
			}
		
		}).get();
	}

});