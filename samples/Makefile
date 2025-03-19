DOCKER_COMPOSE ?= docker compose
TRUFFLE ?= npx truffle
TEST_OPTS ?= --compile-none --migrate-none

.PHONY: alg3 alg2 alg1
alg3: setup setup2 relayer01
alg2: setupAlg2 setupAlg22 relayer01
alg1: setupAlg1 setupAlg12 relayer01

# setup
.PHONY: setup setup2 setupAlg2 setupAlg22 setupAlg1 seyupAlg12 relayer01 down
setup: build network sleep migrate 
setup2: build2 sleep migrate2 

setupAlg2: build network sleep migrateAlg2 
setupAlg22: build2 sleep migrateAlg22

setupAlg1: build network sleep migrateAlg1
setupAlg12: build2 sleep migrateAlg12

relayer01: handshake relayer-start

down: relayer-stop network-down

# build
.PHONY: build build-contract build-relayer 
build: build-contract build-relayer build-container
build2: build-contract2 

build-contract:
	@make -C ../contracts/access build

build-contract2:
	@make -C ../contracts/data build2

build-relayer:
	@make -C relayer build

build-container:
	@make -C chains build

# network
.PHONY: network network-down
network:
	@make -C chains network

network-down:
	@make -C chains network-down

# contract migration
.PHONY: migrate
migrate:
	node set_contracts_truffle.js ibc0
	node set_migrate_a.js alg3
	npm run migrate:ibc0
migrate2:
	node set_contracts_truffle.js ibc1
	node set_migrate_b.js alg3
	npm run migrate:ibc1 
	
migrateAlg2:
	node set_contracts_truffle.js ibc0
	node set_migrate_a.js alg2
	npm run migrate:ibc0

migrateAlg22:
	node set_contracts_truffle.js ibc1
	node set_migrate_b.js alg2
	npm run migrate:ibc1

migrateAlg1:
	node set_contracts_truffle.js ibc0
	node set_migrate_a.js alg1
	npm run migrate:ibc0

migrateAlg12:
	node set_contracts_truffle.js ibc1
	node set_migrate_b.js alg1
	npm run migrate:ibc1

# relayer
.PHONY: handshake relayer-start relayer-stop
handshake:
	./scripts/init-rly

relayer-start:
	./scripts/relayer-start

relayer-stop:
	./scripts/relayer-stop

# textlint
.PHONY: lint
lint:
	npm run lint

.PHONY: test-alg3 test-alg2 test-alg1 test-alg3-gas test-alg2-gas test-alg1-gas
# 
test-alg3:
	node set_contracts_truffle.js ibc0
	${TRUFFLE} exec test/alg3/1-alg3.js --network=ibc0 \
	&& sleep 3 \
	&& ${TRUFFLE} test test/alg3/1-alg3.test.js --network=ibc0 ${TEST_OPTS} \
	&& sleep 3 \
	&& ${TRUFFLE} test test/alg3/2-alg3.test.js --network=ibc0 ${TEST_OPTS} \

test-alg3-gas:
	node set_contracts_truffle.js ibc0
	${TRUFFLE} test test/alg3/0-alg3a-gas.test.js --network=ibc0 ${TEST_OPTS} \
	&& sleep 3 \
	&& node set_contracts_truffle.js ibc1
	${TRUFFLE} test test/alg3/0-alg3b-gas.test.js --network=ibc1 ${TEST_OPTS} \



test-alg2:
	node set_contracts_truffle.js ibc0 \
	&& sleep 3 \
	&& ${TRUFFLE} exec test/alg2/1-alg2.js --network=ibc0 \
	&& sleep 3 \
	&& ${TRUFFLE} test test/alg2/1-alg2.test.js --network=ibc0 ${TEST_OPTS} \
	&& sleep 3 \
	&& node set_contracts_truffle.js ibc1 \
	&& sleep 3 \
	&& ${TRUFFLE} test test/alg2/2-alg2.test.js --network=ibc1 ${TEST_OPTS} \

test-alg2-gas:
	node set_contracts_truffle.js ibc0
	${TRUFFLE} test test/alg2/0-alg2-gas.test.js --network=ibc0 ${TEST_OPTS}


test-alg1:
	node set_contracts_truffle.js ibc0 \
	&& sleep 3 \
	&& ${TRUFFLE} exec test/alg1/1-alg1.js --network=ibc0 \
	&& sleep 3 \
	&& ${TRUFFLE} test test/alg1/1-alg1.test.js --network=ibc0 ${TEST_OPTS} \
	&& sleep 3 \
	&& node set_contracts_truffle.js ibc1 \
	&& sleep 3 \
	&& ${TRUFFLE} test test/alg1/2-alg1.test.js --network=ibc1 ${TEST_OPTS} \

test-alg1-gas:
	node set_contracts_truffle.js ibc0
	${TRUFFLE} test test/alg1/0-alg1-gas.test.js --network=ibc0 ${TEST_OPTS}


.PHONY: sleep
sleep:
	sleep 5
