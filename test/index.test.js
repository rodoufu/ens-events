const test = require('tape');
const async = require("async");

test('Fake simple test', (t) => {
    async.waterfall([
        (done) => { // reply, done
            done();
        },
    ], () => {
        t.end();
    });
});

test.onFinish(() => {
    process.exit(0)
});
