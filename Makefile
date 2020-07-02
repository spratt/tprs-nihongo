.PHONY: start
start:
	yarn start

.PHONY: build
build:
	yarn build

.PHONY: serve
serve: build
	open http://localhost:8000/srs-nihongo/
	cd .. && python3 -m http.server

.PHONY: install
install:
	npm install -g typescript yarn react-scripts@latest

# I really only need to run this once, so I'm not sure why I'm making
# a make target for it.
# Postscript: I ended up having to run this twice because the first
# time I tried to name the app srs-日本語, which is against npm naming
# rules.
# Post-postscript: I ended up having to run it again because the whole
# app broken when I tried to install styled-components.
.PHONY: create
create:
	yarn create react-app srs-nihongo --template typescript
