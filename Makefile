.PHONY: start
start:
	yarn start

.PHONY: build
build:
	yarn build

.PHONY: serve
serve: build
	open http://localhost:8000/tprs-nihongo/
	cd .. && python3 -m http.server

.PHONY: install
install:
	npm install -g typescript yarn react-scripts@latest

.PHONY: create
create:
	yarn create react-app tprs-nihongo --template typescript
