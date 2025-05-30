install:
	npm ci

run:
	./bin/gendiff.js $(ARGS)

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
