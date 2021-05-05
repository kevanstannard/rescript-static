// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Path = require("path");
var Curry = require("rescript/lib/js/curry.js");
var Rimraf = require("rimraf");
var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var FrontMatter = require("front-matter");
var Belt_SortArray = require("rescript/lib/js/belt_SortArray.js");
var File$RescriptStatic = require("./File.bs.js");
var Markdown$RescriptStatic = require("../bindings/Markdown.bs.js");

function parseContent(data, filePath) {
  var fm = FrontMatter(data);
  var match = fm.attributes;
  var id = match.id;
  var body = Markdown$RescriptStatic.render(fm.body);
  var pageId = id !== undefined ? id : Path.basename(filePath, ".md");
  return {
          filePath: filePath,
          id: pageId,
          date: match.date,
          title: match.title,
          body: body
        };
}

function readContentFile(filePath) {
  var __x = File$RescriptStatic.readFile(filePath);
  return __x.then(function (content) {
              return Promise.resolve(parseContent(content, filePath));
            });
}

function readContentFiles(filePaths) {
  return Promise.all(filePaths.map(readContentFile));
}

function readContentCollection(dirPath) {
  var __x = File$RescriptStatic.glob(dirPath + "/*.md");
  return __x.then(readContentFiles);
}

function compareDateDescending(blogPostA, blogPostB) {
  var a = blogPostA.date;
  var b = blogPostB.date;
  if (Caml_obj.caml_equal(a, b)) {
    return 0;
  } else if (Caml_obj.caml_lessthan(a, b)) {
    return 1;
  } else {
    return -1;
  }
}

function contentCollectionToBlogPosts(collection) {
  return Belt_SortArray.stableSortBy(Belt_Array.reduce(collection, [], (function (blogPosts, content) {
                    var title = content.title;
                    var date = content.date;
                    var filePath = content.filePath;
                    if (date !== undefined) {
                      if (title !== undefined) {
                        var blogPost_id = content.id;
                        var blogPost_date = Caml_option.valFromOption(date);
                        var blogPost_body = content.body;
                        var blogPost = {
                          id: blogPost_id,
                          date: blogPost_date,
                          title: title,
                          body: blogPost_body
                        };
                        return Belt_Array.concat(blogPosts, [blogPost]);
                      }
                      console.log("title missing in " + filePath);
                      return blogPosts;
                    }
                    console.log("date missing in " + filePath);
                    return blogPosts;
                  })), compareDateDescending);
}

function contentCollectionToPages(collection) {
  return Belt_Array.reduce(collection, [], (function (pages, content) {
                var title = content.title;
                if (title !== undefined) {
                  var page_id = content.id;
                  var page_body = content.body;
                  var page = {
                    id: page_id,
                    title: title,
                    body: page_body
                  };
                  return Belt_Array.concat(pages, [page]);
                }
                console.log("title missing in " + content.filePath);
                return pages;
              }));
}

function ensureDirectoryExists(dir) {
  if (!Fs.existsSync(dir)) {
    Fs.mkdirSync(dir);
    return ;
  }
  
}

function cleanDirectory(dir) {
  return new Promise((function (resolve, reject) {
                var glob = dir + "/**/*";
                return Rimraf(glob, (function (error) {
                              if (error == null) {
                                return resolve(undefined);
                              } else {
                                return reject({
                                            RE_EXN_ID: "Failure",
                                            _1: "Error deleting the directory " + dir
                                          });
                              }
                            }));
              }));
}

function createBlog(collectionDir, outputDir, indexName, renderBlogPost, renderBlogIndex) {
  var __x = readContentCollection(collectionDir);
  return __x.then(function (param) {
              var blogPosts = contentCollectionToBlogPosts(param);
              var createPosts = function (param) {
                var __x = Promise.all(Belt_Array.map(blogPosts, (function (param) {
                            var html = Curry._1(renderBlogPost, param);
                            var filePath = outputDir + "/" + param.id + ".html";
                            return File$RescriptStatic.writeFile(filePath, html);
                          })));
                return __x.then(function (param) {
                            return Promise.resolve(undefined);
                          });
              };
              var createIndex = function (param) {
                var html = Curry._1(renderBlogIndex, blogPosts);
                var filePath = outputDir + "/" + indexName + ".html";
                return File$RescriptStatic.writeFile(filePath, html);
              };
              ensureDirectoryExists(outputDir);
              var __x = createPosts(undefined);
              return __x.then(createIndex);
            });
}

function createPages(collectionDir, outputDir, renderPage) {
  var __x = readContentCollection(collectionDir);
  return __x.then(function (param) {
              ensureDirectoryExists(outputDir);
              var __x = Promise.all(Belt_Array.map(contentCollectionToPages(param), (function (param) {
                          var html = Curry._1(renderPage, param);
                          var filePath = outputDir + "/" + param.id + ".html";
                          return File$RescriptStatic.writeFile(filePath, html);
                        })));
              return __x.then(function (param) {
                          return Promise.resolve(undefined);
                        });
            });
}

exports.readContentCollection = readContentCollection;
exports.cleanDirectory = cleanDirectory;
exports.createBlog = createBlog;
exports.createPages = createPages;
/* fs Not a pure module */
