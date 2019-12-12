build: ./build.ts ./dist/main.js
	ts-node build.ts ./dist/main.js ./bin/atc

./dist/main.js: ./src/main.ts
	mkdir -p dist
	tsc ./src/main.ts --outDir ./dist/

