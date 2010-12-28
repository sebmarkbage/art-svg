var ComparisonTests = function(){
	this.element = document.createElement('div');
	this.element.setAttribute('class', 'test-results');
	this.tests = [];
};

// Object.toQueryString from MooTools Core
ComparisonTests.toQueryString = function(object, base){
	var queryString = [];

	for (var i in object) (function(value, key){
		if (base) key = base + '[' + key + ']';
		var result;
		if (Object.prototype.toString.apply(value) === '[object Array]'){
			var qs = {};
			for (var j = 0; j < value.length; j++)
				qs[j] = value[j];
			result = ComparisonTests.toQueryString(qs, key);
		} else if (typeof value == 'object'){
			result = ComparisonTests.toQueryString(value, key);
		} else {
			result = key + '=' + encodeURIComponent(value);
		}
		
		if (value != undefined) queryString.push(result);
	})(object[i], i);

	return queryString.join('&');
};

// String.parseQueryString from MooTools More
ComparisonTests.parseQueryString = function(string){
	var vars = string.split(/[&;]/),
		object = {};

	if (!vars.length) return object;

	for(var i = 0; i < vars.length; i++) (function(val){
		var index = val.indexOf('='),
			keys = index < 0 ? [''] : val.substr(0, index).match(/[^\]\[]+/g),
			value = decodeURIComponent(val.substr(index + 1));

		for(var j = 0; j < keys.length; j++) (function(key, i){
			var current = object[key];
			if(i < keys.length - 1)
				object = object[key] = current || {};
			else if(current != null && typeof current.length == 'number')
				current.push(value);
			else
				object[key] = current != null ? [current, value] : value;
		})(keys[j], j);

	})(vars[i]);

	return object;
};

ComparisonTests.prototype.add = function(test, name){
	this.tests.push({ name: name, test: test });
};

ComparisonTests.prototype.run = function(){
	var tests = this.tests;
	var selectedTest = ComparisonTests.parseQueryString(document.location.search.substr(1)).test;
	var i = -1, l = tests.length, self = this;
	var next = function(){
		do {
			i++;
			if (i >= l) return;
		} while(selectedTest && tests[i].name != selectedTest);
		self.runItem(tests[i].test, tests[i].name, next);
	};
	next();
};

ComparisonTests.setText = function(element, text){
	if (element.textContent == null)
		element.innerText = text;
	else
		element.textContent = text;
};

ComparisonTests.prototype.runItem = function(testFn, name, tail){
	var block = document.createElement('div'),
		header = document.createElement('a');
	ComparisonTests.setText(header, name);
		
	var query = ComparisonTests.parseQueryString(document.location.search.substr(1));
	query.test = name;
	header.setAttribute('class', 'header');
	header.setAttribute('href', '?' + ComparisonTests.toQueryString(query));
	block.appendChild(header);

	this.element.appendChild(block);
	
	block.setAttribute('class', 'loading');
	
	testFn(function(testResult, keyResult){

		block.setAttribute('class', 'pending');
	
		var test = document.createElement('div');
		test.setAttribute('class', 'test');
		
		var testHeader = document.createElement('span');
		testHeader.setAttribute('class', 'title');
		ComparisonTests.setText(testHeader, 'Test');

		var key = document.createElement('div');
		key.setAttribute('class', 'key');

		var keyHeader = document.createElement('span');
		keyHeader.setAttribute('class', 'title');
		ComparisonTests.setText(keyHeader, 'Key');

		test.appendChild(testHeader);
		key.appendChild(keyHeader);

		key.appendChild(keyResult);
		test.appendChild(testResult);

		block.appendChild(key);
		block.appendChild(test);
		
		setTimeout(tail, 0);
		
	}, function(x){

		block.setAttribute('class', 'failed');
	
		var err = document.createElement('div');
		err.setAttribute('class', 'error');
		ComparisonTests.setText(err, x);
		block.appendChild(err);
		
		setTimeout(tail, 0);
		
	});
};