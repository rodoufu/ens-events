all:
	@echo "Use \"make run\" para executar"

run:
	nohup node app.js &

.PHONY: test
test: dockerRedis
	npm test
