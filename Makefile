all:
	@echo "Use \"make run\" to run"

run:
	nohup node app.js &
	@echo "Application starting"

.PHONY: test
test: dockerRedis
	npm test

stop:
	pkill node
	@echo "Application stopping"

restart: stop run
	@echo "Restarting the application"

