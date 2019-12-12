./bin/get_test: ./build.ts ./dist/get_test.js
	ts-node build.ts ./dist/get_test.js ./bin/get_test
./dist/get_test.js: src/get_test.ts
	tsc src/get_test.ts
	mkdir -p dist
	mv ./src/get_test.js ./dist

./bin/do_test: ./build.ts ./dist/do_test.js
	ts-node build.ts ./dist/do_test.js ./bin/do_test
./dist/do_test.js: src/do_test.ts
	tsc src/do_test.ts
	mkdir -p dist
	mv ./src/do_test.js ./dist
