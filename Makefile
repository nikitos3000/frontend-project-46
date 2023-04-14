install:
	npm ci
run:
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

lint:
	npx eslint . --fix
test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

run2: 
	node bin/gendiff.js ./__fixtures__/file1copy.json ./__fixtures__/file2copy.json

publish:
	npm publish --dry-run
