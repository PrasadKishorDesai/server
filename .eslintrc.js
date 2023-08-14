module.exports = {
	"env": {
		"node": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"indent": ["error", 4],
		"linebreak-style": ["error", "windows"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"eqeqeq": ["error", "always"],
		"no-unused-vars": "off"
	}
};
