const pug = require("pug");

const compiledFunction = pug.compileFile("cluster_3/templates/main_page.pug");

const createTemplate = ({ name }) => {
  return compiledFunction({
    name,
  });
};

process.on("message", ({ command, payload }) => {
  if (command == "getTemplate") {
    const template = createTemplate(payload);
    process.send(template);
  }
});
