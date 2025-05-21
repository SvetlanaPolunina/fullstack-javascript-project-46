install:
	npm ci
publish:
	npm publish --dry-run
run:
	./bin/gendiff.js $(ARGS)
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
