import string from 'rollup-plugin-string'
//import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
	input: 'src/main.js',
	output: {
		file: 'docs/coverage-timeline.js',
		format: 'iife'
	},
	plugins: [
		resolve(),
		commonjs({
			namedExports: {
		    'esprima': [ 'parseScript' ]
		  }
		}),
		string({
			include: '**/*.html'
		}),
		// buble() // async functions break stuff
	]
}
