const { test } = require("tap");
const sandbox = require("@log4js-node/sandboxed-module");
const layouts = require("../../lib/layouts");

test("stdout appender", t => {
  const output = [];

  const appender = sandbox
    .require("../../lib/appenders/stdout", {
      globals: {
        process: {
          stdout: {
            write(data) {
              output.push(data);
            }
          }
        }
      }
    })
    .configure(
      { type: "stdout", layout: { type: "messagePassThrough" } },
      layouts
    );

  appender({ data: ["cheese"] });
  t.plan(2);
  t.equal(output.length, 1, "There should be one message.");
  t.equal(output[0], "cheese\n", "The message should be cheese.");
  t.end();
});
