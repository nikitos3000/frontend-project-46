install:
	npm ci

run:
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

lint:
	npx eslint .
test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8
