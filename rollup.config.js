import string from 'rollup-plugin-string'
import buble from 'rollup-plugin-buble'

export default {
	input: 'src/main.js',
	output: {
		file: 'docs/coverage-timeline.js',
		format: 'iife'
	},
	plugins: [
		string({
			include: '**/*.html'
		}),
		buble()
	]
}
