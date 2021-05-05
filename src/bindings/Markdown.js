const hljs = require("highlight.js");

const md = require("markdown-it")({
  linkify: true,
  highlight: function (code, language) {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language }).value;
      } catch (__) {}
    }
    return "";
  },
});

md.linkify.set({ fuzzyEmail: false });

module.exports = md;
