install:
	npm ci

run:
	node bin/gendiff.js file1.json ./__fixtures__/file2.json

