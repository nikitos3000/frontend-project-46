install:
	npm ci

run:
	node bin/gendiff.js file1.json file2.json

lint:
	npx eslint .
test:
	npx jest

test-coverage:
	npx jest --coverage
