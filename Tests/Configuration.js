(function(context){

var Configuration = context.Configuration = {};

// Runner name
Configuration.name = 'ART SVG Parser';

Configuration.defaultPresets = {
	browser: 'samples'
};

var source = ['core-1.3-base', 'core-1.3-client', 'sheet', 'utils', 'color', 'art-0.9', 'art-svg'];

// Presets - combine the sets and the source to a preset to easily run a test
Configuration.presets = {

	'samples': {
		sets: ['samples'],
		source: source
	},

	'svg-1.1-all': {
		sets: [
			'svg-1.1-styling-f',
			'svg-1.1-struct-f',
			'svg-1.1-filters-f',
			'svg-1.1-interact-f',
			'svg-1.1-masking-f',
			'svg-1.1-painting-f',
			'svg-1.1-paths-f',
			'svg-1.1-text-f',
			'svg-1.1-animate-b',
			'svg-1.1-color-b',
			'svg-1.1-coords-b',
			'svg-1.1-filters-b',
			'svg-1.1-fonts-b',
			'svg-1.1-interact-b',
			'svg-1.1-linking-b',
			'svg-1.1-masking-b',
			'svg-1.1-painting-b',
			'svg-1.1-script-b',
			'svg-1.1-struct-b',
			'svg-1.1-styling-b',
			'svg-1.1-text-b',
			'svg-1.1-animate-t',
			'svg-1.1-color-t',
			'svg-1.1-coords-t',
			'svg-1.1-fonts-t',
			'svg-1.1-interact-t',
			'svg-1.1-painting-t',
			'svg-1.1-paths-t',
			'svg-1.1-shapes-t',
			'svg-1.1-struct-t',
			'svg-1.1-styling-t',
			'svg-1.1-text-t'
		],
		source: source
	},
	
	'svg-1.1-filters': {
		sets: [
			'svg-1.1-filters-f',
			'svg-1.1-filters-b'
		],
		source: source
	},

	'svg-1.1-interact': {
		sets: [
			'svg-1.1-linking-b',
			'svg-1.1-interact-f',
			'svg-1.1-interact-b',
			'svg-1.1-interact-t',
			'svg-1.1-animate-b',
			'svg-1.1-animate-t',
			'svg-1.1-script-b'
		],
		source: source
	},

	'svg-1.1-coords': {
		sets: [
			'svg-1.1-coords-b',
			'svg-1.1-coords-t'
		],
		source: source
	},
	
	'svg-1.1-painting': {
		sets: [
			'svg-1.1-painting-f',
			'svg-1.1-painting-b',
			'svg-1.1-painting-t',
			'svg-1.1-masking-b',
			'svg-1.1-masking-f'
		],
		source: source
	},

	'svg-1.1-paths': {
		sets: [
			'svg-1.1-paths-f',
			'svg-1.1-paths-t',
			'svg-1.1-shapes-t'
		],
		source: source
	},

	'svg-1.1-struct': {
		sets: [
			'svg-1.1-struct-f',
			'svg-1.1-struct-b',
			'svg-1.1-struct-t'
		],
		source: source
	},

	'svg-1.1-styling': {
		sets: [
			'svg-1.1-styling-f',
			'svg-1.1-styling-b',
			'svg-1.1-styling-t',
			'svg-1.1-color-b',
			'svg-1.1-color-t'
		],
		source: source
	},

	'svg-1.1-text': {
		sets: [
			'svg-1.1-text-f',
			'svg-1.1-text-b',
			'svg-1.1-text-t',
			'svg-1.1-fonts-b',
			'svg-1.1-fonts-t'
		],
		source: source
	},

	'svg-1.1-full': {
		sets: [
			'svg-1.1-styling-f',
			'svg-1.1-struct-f',
			'svg-1.1-filters-f',
			'svg-1.1-interact-f',
			'svg-1.1-masking-f',
			'svg-1.1-painting-f',
			'svg-1.1-paths-f',
			'svg-1.1-text-f'
		],
		source: source
	},

	'svg-1.1-basic': {
		sets: [
			'svg-1.1-animate-b',
			'svg-1.1-color-b',
			'svg-1.1-coords-b',
			'svg-1.1-filters-b',
			'svg-1.1-fonts-b',
			'svg-1.1-interact-b',
			'svg-1.1-linking-b',
			'svg-1.1-masking-b',
			'svg-1.1-painting-b',
			'svg-1.1-script-b',
			'svg-1.1-struct-b',
			'svg-1.1-styling-b',
			'svg-1.1-text-b'
		],
		source: source
	},

	'svg-1.1-tiny': {
		sets: [
			'svg-1.1-animate-t',
			'svg-1.1-color-t',
			'svg-1.1-coords-t',
			'svg-1.1-fonts-t',
			'svg-1.1-interact-t',
			'svg-1.1-painting-t',
			'svg-1.1-paths-t',
			'svg-1.1-shapes-t',
			'svg-1.1-struct-t',
			'svg-1.1-styling-t',
			'svg-1.1-text-t'
		],
		source: source
	},
	
	'svg-1.2-tiny': {
		sets: ['svg-1.2-tiny'],
		source: source
	}

};

/*
 * An object with sets. Each item in the object should have a pngPath and
 * svgPath key, that specifies where the spec svg and png key files are
 * and an array with all the files without the .svg and .png extension
 * relative to the given paths
 */
Configuration.sets = {

	'samples': {
		keyPath: 'Samples/',
		testPath: 'Samples/',
		files: [
			'Tiger',
			'Lion',
			'Clipping'
		]
	},
	
	// SVG 1.1 Full Profile
	
	'svg-1.1-styling-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'color-prof-01-f',
			'color-prop-02-f',
			'styling-css-04-f'
		]
	},

	'svg-1.1-struct-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'extend-namespace-01-f'
		]
	},

	'svg-1.1-filters-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'filters-conv-01-f',
			'filters-diffuse-01-f',
			'filters-displace-01-f',
			'filters-light-01-f',
			'filters-morph-01-f',
			'filters-specular-01-f',
			'filters-turb-01-f'
		]
	},

	'svg-1.1-interact-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'interact-cursor-01-f'
		]
	},

	'svg-1.1-masking-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'masking-intro-01-f',
			'masking-path-05-f'
		]
	},

	'svg-1.1-painting-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'painting-marker-01-f',
			'painting-marker-02-f',
			'painting-marker-03-f'
		]
	},

	'svg-1.1-paths-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'paths-data-03-f'
		]
	},

	'svg-1.1-text-f': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'text-tselect-02-f'
		]
	},
	
	// SVG 1.1 Basic Profile

	'svg-1.1-animate-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'animate-elem-22-b',
			'animate-elem-29-b'
		]
	},

	'svg-1.1-color-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'color-prop-01-b'
		]
	},

	'svg-1.1-coords-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'coords-trans-01-b',
			'coords-units-01-b',
			'coords-units-02-b',
			'coords-units-03-b',
			'coords-viewattr-01-b',
			'coords-viewattr-02-b',
			'coords-viewattr-03-b'
		]
	},

	'svg-1.1-filters-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'filters-blend-01-b',
			'filters-color-01-b',
			'filters-composite-02-b',
			'filters-comptran-01-b',
			'filters-example-01-b',
			'filters-felem-01-b',
			'filters-gauss-01-b',
			'filters-image-01-b',
			'filters-offset-01-b',
			'filters-tile-01-b'
		]
	},

	'svg-1.1-fonts-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'fonts-elem-03-b',
			'fonts-elem-04-b',
			'fonts-elem-07-b'
		]
	},

	'svg-1.1-interact-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'interact-dom-01-b',
			'interact-events-01-b',
			'interact-order-01-b',
			'interact-order-02-b',
			'interact-order-03-b'
		]
	},

	'svg-1.1-linking-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'linking-a-01-b',
			'linking-a-02-b',
			'linking-a-03-b',
			'linking-uri-01-b',
			'linking-uri-02-b'
		]
	},

	'svg-1.1-masking-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'masking-mask-01-b',
			'masking-opacity-01-b',
			'masking-path-01-b',
			'masking-path-02-b',
			'masking-path-03-b',
			'masking-path-04-b'
		]
	},

	'svg-1.1-painting-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'painting-fill-05-b',
			'painting-render-01-b',
			'render-groups-01-b',
			'pservers-grad-01-b',
			'pservers-grad-02-b',
			'pservers-grad-03-b',
			'pservers-grad-04-b',
			'pservers-grad-05-b',
			'pservers-grad-06-b',
			'pservers-grad-07-b',
			'pservers-grad-08-b',
			'pservers-grad-09-b',
			'pservers-grad-10-b',
			'pservers-grad-11-b',
			'pservers-grad-12-b',
			'pservers-grad-13-b',
			'pservers-grad-14-b',
			'pservers-grad-15-b',
			'pservers-grad-16-b',
			'pservers-grad-17-b',
			'pservers-grad-18-b',
			'pservers-grad-19-b',
			'pservers-pattern-01-b'
		]
	},

	'svg-1.1-script-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'script-handle-01-b',
			'script-handle-02-b',
			'script-handle-03-b',
			'script-handle-04-b'
		]
	},

	'svg-1.1-struct-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'metadata-example-01-b',
			'struct-dom-01-b',
			'struct-dom-02-b',
			'struct-dom-03-b',
			'struct-dom-04-b',
			'struct-dom-05-b',
			'struct-dom-06-b',
			'struct-group-02-b',
			'struct-image-02-b',
			'struct-image-05-b',
			'struct-symbol-01-b',
			'struct-use-05-b',
			'types-basicDOM-01-b'
		]
	},

	'svg-1.1-styling-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'styling-css-01-b',
			'styling-css-02-b',
			'styling-css-03-b',
			'styling-css-05-b',
			'styling-css-06-b',
			'styling-inherit-01-b'
		]
	},

	'svg-1.1-text-b': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'text-align-01-b',
			'text-align-02-b',
			'text-align-03-b',
			'text-align-04-b',
			'text-align-05-b',
			'text-align-06-b',
			'text-align-08-b',
			'text-altglyph-01-b',
			'text-deco-01-b',
			'text-intro-02-b',
			'text-intro-03-b',
			'text-path-01-b',
			'text-spacing-01-b',
			'text-text-01-b',
			'text-text-03-b',
			'text-text-08-b',
			'text-tref-01-b',
			'text-tselect-01-b',
			'text-tspan-01-b'
		]
	},
	
	// SVG 1.1 Tiny Profile

	'svg-1.1-animate-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'animate-elem-02-t',
			'animate-elem-03-t',
			'animate-elem-04-t',
			'animate-elem-05-t',
			'animate-elem-06-t',
			'animate-elem-07-t',
			'animate-elem-08-t',
			'animate-elem-09-t',
			'animate-elem-10-t',
			'animate-elem-11-t',
			'animate-elem-12-t',
			'animate-elem-13-t',
			'animate-elem-14-t',
			'animate-elem-15-t',
			'animate-elem-17-t',
			'animate-elem-19-t',
			'animate-elem-20-t',
			'animate-elem-21-t',
			'animate-elem-23-t',
			'animate-elem-24-t',
			'animate-elem-25-t',
			'animate-elem-26-t',
			'animate-elem-27-t',
			'animate-elem-28-t',
			'animate-elem-30-t',
			'animate-elem-31-t',
			'animate-elem-32-t',
			'animate-elem-33-t',
			'animate-elem-34-t',
			'animate-elem-36-t',
			'animate-elem-37-t',
			'animate-elem-39-t',
			'animate-elem-40-t',
			'animate-elem-41-t',
			'animate-elem-44-t',
			'animate-elem-46-t',
			'animate-elem-52-t',
			'animate-elem-60-t',
			'animate-elem-61-t',
			'animate-elem-62-t',
			'animate-elem-63-t',
			'animate-elem-64-t',
			'animate-elem-65-t',
			'animate-elem-66-t',
			'animate-elem-67-t',
			'animate-elem-68-t',
			'animate-elem-69-t',
			'animate-elem-70-t',
			'animate-elem-77-t',
			'animate-elem-78-t',
			'animate-elem-80-t',
			'animate-elem-81-t',
			'animate-elem-82-t',
			'animate-elem-83-t',
			'animate-elem-84-t',
			'animate-elem-85-t'
		]
	},
	
	'svg-1.1-color-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'color-prop-03-t'
		]
	},
	
	'svg-1.1-coords-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'coords-coord-01-t',
			'coords-coord-02-t',
			'coords-trans-02-t',
			'coords-trans-03-t',
			'coords-trans-04-t',
			'coords-trans-05-t',
			'coords-trans-06-t'
		]
	},
	
	'svg-1.1-fonts-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'fonts-desc-02-t',
			'fonts-elem-01-t',
			'fonts-elem-02-t',
			'fonts-elem-05-t',
			'fonts-elem-06-t',
			'fonts-glyph-02-t',
			'fonts-glyph-03-t',
			'fonts-glyph-04-t',
			'fonts-kern-01-t'
		]
	},
	
	'svg-1.1-interact-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'interact-zoom-01-t'
		]
	},
	
	'svg-1.1-linking-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'linking-a-04-t',
			'linking-a-05-t',
			'linking-a-07-t',
			'linking-uri-03-t'
		]
	},
	
	'svg-1.1-painting-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'painting-fill-01-t',
			'painting-fill-02-t',
			'painting-fill-03-t',
			'painting-fill-04-t',
			'painting-stroke-01-t',
			'painting-stroke-02-t',
			'painting-stroke-03-t',
			'painting-stroke-04-t',
			'painting-stroke-07-t',
			'render-elems-01-t',
			'render-elems-02-t',
			'render-elems-03-t',
			'render-elems-06-t',
			'render-elems-07-t',
			'render-elems-08-t',
			'render-groups-03-t'
		]
	},
	
	'svg-1.1-paths-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'paths-data-01-t',
			'paths-data-02-t',
			'paths-data-04-t',
			'paths-data-05-t',
			'paths-data-06-t',
			'paths-data-07-t',
			'paths-data-08-t',
			'paths-data-09-t',
			'paths-data-10-t',
			'paths-data-12-t',
			'paths-data-13-t',
			'paths-data-14-t',
			'paths-data-15-t'
		]
	},
	
	'svg-1.1-shapes-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'shapes-circle-01-t',
			'shapes-circle-02-t',
			'shapes-ellipse-01-t',
			'shapes-ellipse-02-t',
			'shapes-intro-01-t',
			'shapes-line-01-t',
			'shapes-polygon-01-t',
			'shapes-polyline-01-t',
			'shapes-rect-01-t',
			'shapes-rect-02-t'
		]
	},
	
	'svg-1.1-struct-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'struct-cond-01-t',
			'struct-cond-02-t',
			'struct-cond-03-t',
			'struct-defs-01-t',
			'struct-frag-01-t',
			'struct-frag-02-t',
			'struct-frag-03-t',
			'struct-frag-04-t',
			'struct-frag-05-t',
			'struct-frag-06-t',
			'struct-group-01-t',
			'struct-group-03-t',
			'struct-image-01-t',
			'struct-image-03-t',
			'struct-image-04-t',
			'struct-image-06-t',
			'struct-image-07-t',
			'struct-image-08-t',
			'struct-image-09-t',
			'struct-image-10-t',
			'struct-use-01-t',
			'struct-use-03-t'
		]
	},
	
	'svg-1.1-styling-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'styling-pres-01-t'
		]
	},
	
	'svg-1.1-text-t': {
		keyPath: 'SVG1.1/png/full-',
		testPath: 'SVG1.1/svg/',
		files: [
			'text-fonts-01-t',
			'text-fonts-02-t',
			'text-fonts-03-t',
			'text-intro-01-t',
			'text-intro-04-t',
			'text-intro-05-t',
			'text-text-04-t',
			'text-text-05-t',
			'text-text-06-t',
			'text-text-07-t',
			'text-ws-01-t',
			'text-ws-02-t'
		]
	},
	
	// SVG 1.2 Tiny Profile

	'svg-1.2-tiny': {
		keyPath: 'SVG1.2/png/',
		testPath: 'SVG1.2/svg/',
		files: [
			'animate-elem-02-t',
			'animate-elem-03-t',
			'animate-elem-04-t',
			'animate-elem-05-t',
			'animate-elem-06-t',
			'animate-elem-07-t',
			'animate-elem-08-t',
			'animate-elem-09-t',
			'animate-elem-10-t',
			'animate-elem-11-t',
			'animate-elem-12-t',
			'animate-elem-13-t',
			'animate-elem-14-t',
			'animate-elem-15-t',
			'animate-elem-17-t',
			'animate-elem-19-t',
			'animate-elem-20-t',
			'animate-elem-201-t',
			'animate-elem-202-t',
			'animate-elem-203-t',
			'animate-elem-205-t',
			'animate-elem-206-t',
			'animate-elem-207-t',
			'animate-elem-209-t',
			'animate-elem-21-t',
			'animate-elem-210-t',
			'animate-elem-211-t',
			'animate-elem-212-t',
			'animate-elem-213-t',
			'animate-elem-214-t',
			'animate-elem-215-t',
			'animate-elem-216-t',
			'animate-elem-217-t',
			'animate-elem-218-t',
			'animate-elem-219-t',
			'animate-elem-22-t',
			'animate-elem-221-t',
			'animate-elem-222-t',
			'animate-elem-225-t',
			'animate-elem-226-t',
			'animate-elem-227-t',
			'animate-elem-23-t',
			'animate-elem-24-t',
			'animate-elem-25-t',
			'animate-elem-26-t',
			'animate-elem-27-t',
			'animate-elem-28-t',
			'animate-elem-29-t',
			'animate-elem-30-t',
			'animate-elem-31-t',
			'animate-elem-32-t',
			'animate-elem-33-t',
			'animate-elem-34-t',
			'animate-elem-35-t',
			'animate-elem-36-t',
			'animate-elem-37-t',
			'animate-elem-38-t',
			'animate-elem-39-t',
			'animate-elem-40-t',
			'animate-elem-41-t',
			'animate-elem-44-t',
			'animate-elem-46-t',
			'animate-elem-52-t',
			'animate-elem-53-t',
			'animate-elem-61-t',
			'animate-elem-64-t',
			'animate-elem-65-t',
			'animate-elem-66-t',
			'animate-elem-67-t',
			'animate-elem-68-t',
			'animate-elem-69-t',
			'animate-elem-70-t',
			'animate-elem-77-t',
			'animate-elem-78-t',
			'animate-elem-80-t',
			'animate-elem-81-t',
			'animate-elem-82-t',
			'animate-elem-83-t',
			'animate-elem-84-t',
			'animate-elem-85-t',
			'animate-elem-86-t',
			'conf-reader-201-t',
			'coords-constr-201-t',
			'coords-constr-202-t',
			'coords-constr-203-t',
			'coords-constr-204-t',
			'coords-coord-01-t',
			'coords-pAR-201-t',
			'coords-trans-01-t',
			'coords-trans-02-t',
			'coords-trans-03-t',
			'coords-trans-04-t',
			'coords-trans-05-t',
			'coords-trans-06-t',
			'coords-trans-07-t',
			'coords-trans-08-t',
			'coords-trans-09-t',
			'coords-units-01-t',
			'coords-viewattr-05-t',
			'extend-namespace-02-t',
			'fonts-desc-02-t',
			'fonts-elem-01-t',
			'fonts-elem-02-t',
			'fonts-elem-03-t',
			'fonts-elem-06-t',
			'fonts-glyph-02-t',
			'fonts-glyph-03-t',
			'fonts-glyph-04-t',
			'fonts-glyph-201-t',
			'fonts-glyph-202-t',
			'fonts-glyph-203-t',
			'fonts-kern-01-t',
			'fonts-overview-201-t',
			'interact-dom-02-t',
			'interact-event-201-t',
			'interact-event-202-t',
			'interact-event-203-t',
			'interact-focus-201-t',
			'interact-focus-202-t',
			'interact-focus-203-t',
			'interact-focus-204-t',
			'interact-focus-205-t',
			'interact-focus-206-t',
			'interact-focus-207-t',
			'interact-focus-208-t',
			'interact-focus-209-t',
			'interact-focus-210-t',
			'interact-focus-211-t',
			'interact-focus-212-t',
			'interact-order-04-t',
			'interact-order-05-t',
			'interact-order-06-t',
			'interact-pevents-02-t',
			'interact-pevents-05-t',
			'interact-pevents-06-t',
			'interact-pevents-07-t',
			'interact-pevents-08-t',
			'interact-zoom-01-t',
			'interact-zoom-02-t',
			'interact-zoom-03-t',
			'intro-compat-201-t',
			'jpeg-required-201-t',
			'jpeg-required-202-t',
			'jpeg-required-203-t',
			'jpeg-required-204-t',
			'jpeg-required-205-t',
			'jpeg-required-206-t',
			'jpeg-required-207-t',
			'jpeg-required-208-t',
			'jpeg-required-209-t',
			'linking-a-03-t',
			'linking-a-08-t',
			'linking-a-201-t',
			'linking-frag-201-t',
			'linking-frag-202-t',
			'linking-frag-203-t',
			'linking-frag-204-t',
			'linking-refs-201-t',
			'linking-refs-202-t',
			'linking-refs-203-t',
			'linking-refs-204-t',
			'linking-refs-205-t',
			'linking-refs-206-t',
			'linking-uri-03-t',
			'media-alevel-201-t',
			'media-alevel-202-t',
			'media-alevel-203-t',
			'media-alevel-204-t',
			'media-alevel-205-t',
			'media-alevel-206-t',
			'media-alevel-207-t',
			'media-alevel-208-t',
			'media-anim-201-t',
			'media-anim-202-t',
			'media-anim-203-t',
			'media-anim-204-t',
			'media-anim-205-t',
			'media-anim-206-t',
			'media-anim-207-t',
			'media-anim-208-t',
			'media-anim-209-t',
			'media-anim-210-t',
			'media-anim-211-t',
			'media-anim-212-t',
			'media-anim-213-t',
			'media-audio-201-t',
			'media-audio-202-t',
			'media-audio-203-t',
			'media-audio-204-t',
			'media-audio-205-t',
			'media-audio-206-t',
			'media-audio-207-t',
			'media-audio-208-t',
			'media-audio-209-t',
			'media-audio-210-t',
			'media-audio-211-t',
			'media-audio-212-t',
			'media-audio-213-t',
			'media-audio-214-t',
			'media-audio-215-t',
			'media-video-201-t',
			'media-video-202-t',
			'media-video-203-t',
			'media-video-204-t',
			'media-video-205-t',
			'media-video-206-t',
			'media-video-207-t',
			'media-video-208-t',
			'media-video-209-t',
			'media-video-210-t',
			'media-video-211-t',
			'media-video-212-t',
			'media-video-213-t',
			'media-video-214-t',
			'media-video-215-t',
			'media-video-216-t',
			'media-video-218-t',
			'media-video-219-t',
			'media-video-220-t',
			'media-video-221-t',
			'media-video-222-t',
			'metadata-example-01-t',
			'paint-color-01-t',
			'paint-color-03-t',
			'paint-color-04-t',
			'paint-color-05-t',
			'paint-color-201-t',
			'paint-fill-01-t',
			'paint-fill-02-t',
			'paint-fill-03-t',
			'paint-fill-04-t',
			'paint-fill-05-t',
			'paint-grad-04-t',
			'paint-grad-05-t',
			'paint-grad-07-t',
			'paint-grad-08-t',
			'paint-grad-09-t',
			'paint-grad-11-t',
			'paint-grad-12-t',
			'paint-grad-15-t',
			'paint-grad-16-t',
			'paint-grad-17-t',
			'paint-grad-18-t',
			'paint-grad-19-t',
			'paint-grad-201-t',
			'paint-grad-202-t',
			'paint-grad-203-t',
			'paint-grad-204-t',
			'paint-grad-205-t',
			'paint-nsstroke-201-t',
			'paint-nsstroke-203-t',
			'paint-other-201-t',
			'paint-other-203-t',
			'paint-stroke-01-t',
			'paint-stroke-02-t',
			'paint-stroke-03-t',
			'paint-stroke-04-t',
			'paint-stroke-05-t',
			'paint-stroke-06-t',
			'paint-stroke-07-t',
			'paint-stroke-08-t',
			'paint-stroke-201-t',
			'paint-stroke-202-t',
			'paint-stroke-204-t',
			'paint-stroke-205-t',
			'paint-stroke-207-t',
			'paint-vfill-201-t',
			'paint-vfill-202-t',
			'paint-vfill-203-t',
			'paint-vfill-204-t',
			'paint-vfill-205-t',
			'paint-vfill-206-t',
			'paths-data-01-t',
			'paths-data-02-t',
			'paths-data-04-t',
			'paths-data-05-t',
			'paths-data-06-t',
			'paths-data-07-t',
			'paths-data-08-t',
			'paths-data-09-t',
			'paths-data-10-t',
			'paths-data-12-t',
			'paths-data-13-t',
			'paths-data-14-t',
			'paths-data-15-t',
			'render-elems-01-t',
			'render-elems-02-t',
			'render-elems-03-t',
			'render-elems-06-t',
			'render-elems-07-t',
			'render-elems-08-t',
			'render-groups-01-t',
			'render-groups-03-t',
			'script-element-201-t',
			'script-element-202-t',
			'script-element-203-t',
			'script-handle-05-t',
			'script-handle-06-t',
			'script-handle-07-t',
			'script-handle-08-t',
			'script-handle-201-t',
			'script-handle-202-t',
			'script-listener-201-t',
			'script-listener-202-t',
			'script-listener-203-t',
			'script-listener-204-t',
			'shapes-circle-01-t',
			'shapes-circle-02-t',
			'shapes-circle-03-t',
			'shapes-ellipse-01-t',
			'shapes-ellipse-02-t',
			'shapes-ellipse-03-t',
			'shapes-intro-01-t',
			'shapes-line-01-t',
			'shapes-line-02-t',
			'shapes-polygon-01-t',
			'shapes-polygon-02-t',
			'shapes-polyline-01-t',
			'shapes-polyline-02-t',
			'shapes-rect-01-t',
			'shapes-rect-02-t',
			'shapes-rect-03-t',
			'struct-class-201-t',
			'struct-common-201-t',
			'struct-cond-01-t',
			'struct-cond-02-t',
			'struct-cond-03-t',
			'struct-cond-204-t',
			'struct-cond-205-t',
			'struct-cond-209-t',
			'struct-cond-210-t',
			'struct-defs-01-t',
			'struct-defs-201-t',
			'struct-discard-201-t',
			'struct-discard-204-t',
			'struct-discard-205-t',
			'struct-discard-206-t',
			'struct-discard-207-t',
			'struct-frag-02-t',
			'struct-frag-03-t',
			'struct-frag-04-t',
			'struct-frag-05-t',
			'struct-frag-06-t',
			'struct-group-01-t',
			'struct-group-03-t',
			'struct-image-01-t',
			'struct-image-03-t',
			'struct-image-04-t',
			'struct-image-06-t',
			'struct-image-07-t',
			'struct-image-08-t',
			'struct-image-09-t',
			'struct-image-10-t',
			'struct-progressive-201-t',
			'struct-progressive-202-t',
			'struct-progressive-203-t',
			'struct-progressive-204-t',
			'struct-svg-201-t',
			'struct-svg-202-t',
			'struct-svg-203-t',
			'struct-svg-204-t',
			'struct-use-01-t',
			'struct-use-03-t',
			'struct-use-09-t',
			'struct-use-201-t',
			'struct-use-202-t',
			'struct-use-203-t',
			'struct-use-204-t',
			'struct-use-205-t',
			'struct-use-206-t',
			'struct-use-207-t',
			'struct-use-208-t',
			'struct-use-209-t',
			'struct-use-recursion-01-t',
			'struct-use-recursion-02-t',
			'struct-use-recursion-03-t',
			'styling-inherit-01-t',
			'styling-inherit-02-t',
			'styling-inherit-03-t',
			'styling-pres-01-t',
			'text-align-01-t',
			'text-align-07-t',
			'text-align-08-t',
			'text-align-201-t',
			'text-align-202-t',
			'text-area-201-t',
			'text-area-202-t',
			'text-area-203-t',
			'text-area-204-t',
			'text-area-205-t',
			'text-area-206-t',
			'text-area-207-t',
			'text-area-208-t',
			'text-area-209-t',
			'text-area-210-t',
			'text-area-211-t',
			'text-area-213-t',
			'text-area-220-t',
			'text-area-221-t',
			'text-area-222-t',
			'text-edit-201-t',
			'text-fonts-01-t',
			'text-fonts-02-t',
			'text-fonts-03-t',
			'text-fonts-04-t',
			'text-fonts-202-t',
			'text-intro-01-t',
			'text-intro-04-t',
			'text-intro-05-t',
			'text-intro-06-t',
			'text-intro-201-t',
			'text-text-04-t',
			'text-text-06-t',
			'text-text-07-t',
			'text-text-08-t',
			'text-text-09-t',
			'text-tselect-03-t',
			'text-ws-01-t',
			'text-ws-02-t',
			'udom-conform-201-t',
			'udom-dom-201-t',
			'udom-dom-202-t',
			'udom-dom-203-t',
			'udom-dom-204-t',
			'udom-dom-206-t',
			'udom-dom-207-t',
			'udom-dom-209-t',
			'udom-dom-210-t',
			'udom-dom-211-t',
			'udom-dom-213-t',
			'udom-event-201-t',
			'udom-event-202-t',
			'udom-event-203-t',
			'udom-event-204-t',
			'udom-event-205-t',
			'udom-event-207-t',
			'udom-event-208-t',
			'udom-event-209-t',
			'udom-event-210-t',
			'udom-glob-201-t',
			'udom-glob-202-t',
			'udom-glob-203-t',
			'udom-glob-204-t',
			'udom-node-201-t',
			'udom-node-202-t',
			'udom-node-204-t',
			'udom-over-01-t',
			'udom-smil-201-t',
			'udom-smil-202-t',
			'udom-smil-203-t',
			'udom-svg-201-t',
			'udom-svg-202-t',
			'udom-svg-204-t',
			'udom-svg-205-t',
			'udom-svg-206-t',
			'udom-svg-208-t',
			'udom-svg-209-t',
			'udom-svg-210-t',
			'udom-svg-211-t',
			'udom-svg-213-t',
			'udom-svg-216-t',
			'udom-svg-218-t',
			'udom-svg-220-t',
			'udom-svg-224-t',
			'udom-svg-225-t',
			'udom-svg-226-t',
			'udom-svg-227-t',
			'udom-svg-228-t',
			'udom-svg-231-t',
			'udom-svg-232-t',
			'udom-svg-233-t',
			'udom-svg-236-t',
			'udom-svg-237-t',
			'udom-svgcolor-201-t',
			'udom-svglocatable-201-t',
			'udom-svglocatable-202-t',
			'udom-svglocatable-203-t',
			'udom-svgmatrix-201-t',
			'udom-svgmatrix-202-t',
			'udom-svgmatrix-203-t',
			'udom-svgmatrix-204-t',
			'udom-svgmatrix-205-t',
			'udom-svgmatrix-206-t',
			'udom-svgpath-201-t',
			'udom-svgpath-202-t',
			'udom-svgpoint-201-t',
			'udom-svgrect-201-t',
			'udom-textcontent-201-t',
			'udom-textcontent-202-t',
			'udom-traitaccess-201-t',
			'udom-traitaccess-202-t',
			'udom-traitaccess-203-t',
			'udom-traitaccess-204-t',
			'udom-traitaccess-205-t',
			'udom-traitaccess-206-t',
			'udom-traitaccess-207-t'
		]
	}

};


/*
 * An object with the source files. Each item should have an path key,
 * that specifies where the source files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.source = {

	'core-1.3-base': {
		path: 'mootools-core/Source/',
		files: [
			'Core/Core',

			'Types/Array',
			'Types/Function',
			'Types/Number',
			'Types/String',
			'Types/Object',

			'Class/Class',
			'Class/Class.Extras'
		]
	},
	
	'core-1.3-client': {
		path: 'mootools-core/Source/',
		files: [
			'Types/Event',

			'Browser/Browser',

			'Slick/Slick.Parser',
			'Slick/Slick.Finder',

			'Element/Element',
			'Element/Element.Event',
			'Element/Element.Style',
			'Element/Element.Dimensions',

			'Utilities/DomReady',
			'Utilities/JSON',
			'Utilities/Cookie',
			'Utilities/Swiff',

			'Fx/Fx',
			'Fx/Fx.CSS',
			'Fx/Fx.Tween',
			'Fx/Fx.Morph',
			'Fx/Fx.Transitions',

			'Request/Request',
			'Request/Request.HTML',
			'Request/Request.JSON'
		]
	},
	
	'utils': {
		path: 'utils/',
		files: [
			'URI',
			'Request.XML',
			'Sheet.Cascade'
		]
	},
	
	'sheet': {
		path: 'sheet.js/Source/',
		files: [
			'sg-regex-tools',
			'SheetParser.CSS'
		]
	},
	
	'color': {
		path: 'art/Color/Source/',
		files: [
			'Color'
		]
	},

	'art-0.9': {
		path: 'art/Source/',
		files: [
			'ART',
			'ART.VML',
			'ART.SVG',
			'ART.Base',
			'ART.Path',
			'ART.Shapes',
			'ART.Font'
		]
	},

	'art-svg': {
		path: '../Source/',
		files: [
			'ART.SVG.Parser',
			'ART.SVG.Parser.Colors',
			'ART.SVG.Parser.Paints',
			'ART.SVG.Parser.Shapes',
			'ART.SVG.Parser.Styles',
			'ART.SVG.Parser.Text',
			'ART.SVG.Parser.Fonts',
			'ART.SVG.Parser.Markers',
			'ART.SVG.Parser.Externals'
		]
	}

};

})(typeof exports != 'undefined' ? exports : this);