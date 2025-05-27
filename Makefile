install:
	npm ci

run:
	./bin/gendiff.js $(ARGS)

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
