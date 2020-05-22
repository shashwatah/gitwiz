"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var env_1 = require("./../utils/env");
var query_controller_1 = require("./query.controller");
;
;
var GithubController = /** @class */ (function () {
    function GithubController(query, token) {
        this.url = "https://api.github.com/graphql";
        this.query = query;
        this.token = token;
        this.queryController = new query_controller_1["default"](this.url, this.token);
    }
    GithubController.prototype.makeQuery = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryController.fetchData("query { rateLimit { cost remaining resetAt } search(query: \"" + _this.query + "\", type: REPOSITORY, first: 100) { repositoryCount edges { node { ... on Repository { name nameWithOwner url homepageUrl description parent { nameWithOwner } languages(first: 5) { nodes { name } } releases(first: 1) { nodes { tagName } } forkCount stargazers { totalCount } diskUsage createdAt repositoryTopics(first:5) { nodes { topic { name } } } } } } } }")
                .then(function (response) {
                // console.log(response.data?.search.edges);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    GithubController.prototype.processData = function () {
        var _this = this;
        var returnArr = [];
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeQuery().then(function (response) {
                            var _a;
                            var edges = (_a = response.data) === null || _a === void 0 ? void 0 : _a.search.edges;
                            // resolve(edges);
                            if (edges !== undefined) {
                                edges.forEach(function (edge) {
                                    var _a;
                                    if (!((_a = edge.node.parent) === null || _a === void 0 ? void 0 : _a.nameWithOwner)) {
                                        console.log(edge.node.languages.nodes);
                                        var repoTopicTags = "";
                                        if (edge.node.repositoryTopics.nodes.length > 0) {
                                            for (var _i = 0, _b = edge.node.repositoryTopics.nodes; _i < _b.length; _i++) {
                                                var repoTopic = _b[_i];
                                                repoTopicTags += "<button class=\"res-tag res-data-tag\">" + repoTopic.topic.name + "</button>";
                                            }
                                        }
                                        returnArr.push({
                                            platform: "github",
                                            htmlString: "<div class=\"res\">\n                                    <button class=\"res-el res-tag res-pf-tag res-gh-tag\">GitHub</button>\n                                    <p class=\"res-el res-title\">" + edge.node.name + "</p>\n                                    <p class=\"res-el res-sub\">" + edge.node.nameWithOwner + " > " + edge.node.url + "</p>\n                                    <p class=\"res-el res-desc\">" + edge.node.description + "</p>\n                                    <div class=\"res-el res-data-tag-container\">\n                                        <button class=\"res-tag res-data-tag\">" + edge.node.languages.nodes[0].name + "</button>\n                                        <button class=\"res-tag res-data-tag\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 10 16\" width=\"10\" height=\"16\"><path fill-rule=\"evenodd\" d=\"M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg> " + edge.node.forkCount + "</button>\n                                        <button class=\"res-tag res-data-tag\"><svg aria-hidden=\"true\" class=\"octicon\" height=\"16\" role=\"img\" viewBox=\"0 0 14 16\" width=\"14\" style=\"display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;\"><path fill-rule=\"evenodd\" d=\"M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z\"></path></svg> " + edge.node.stargazers.totalCount + "</button>\n                                        <button class=\"res-tag res-data-tag\">" + edge.node.diskUsage + " KB</button>\n                                        " + repoTopicTags + "\n                                    </div>\n                                </div>"
                                        });
                                    }
                                });
                            }
                            resolve(returnArr);
                        })["catch"](function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return GithubController;
}());
exports["default"] = GithubController;
var controller = new GithubController("insta", "" + env_1.GITHUB_TOKEN);
controller.processData().then(function (res) { return console.log(res[0]); })["catch"](function (err) { return console.log(err); });
