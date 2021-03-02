"use strict";

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myblog = new _main["default"]();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Blog = /*#__PURE__*/function () {
  function Blog() {
    _classCallCheck(this, Blog);

    this.setInitVariables();
    this.registerEvents();
    this.likedSet = new Set();
  }

  _createClass(Blog, [{
    key: "setInitVariables",
    value: function setInitVariables() {
      this.blogList = document.querySelector(".blogList > ul");
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this = this;

      var startBtn = document.querySelector(".start");
      var dataURL = "/data/data.json";
      startBtn.addEventListener("click", function () {
        _this.setInitData(dataURL);
      });
      this.blogList.addEventListener("click", function (_ref) {
        var target = _ref.target;
        var targetClassName = target.className;
        var postTitle = target.previousElementSibling.textContent;
        if (targetClassName !== "like" && targetClassName !== 'unlike') return;

        if (targetClassName == 'unlike') {
          target.className = 'like';
          target.innerText = 'Like';

          _this.likedSet["delete"](postTitle);
        } else {
          target.className = 'unlike';
          target.innerText = 'Liked';

          _this.likedSet.add(postTitle);
        }

        _this.updateLikedList();
      });
    }
  }, {
    key: "updateLikedList",
    value: function updateLikedList() {
      var ul = document.querySelector('.like-list > ul');
      var likedSum = "";
      this.likedSet.forEach(function (v) {
        likedSum += "<li>".concat(v, "</li>");
      });
      ul.innerHTML = likedSum;
    }
  }, {
    key: "setInitData",
    value: function setInitData(dataURL) {
      this.getData(dataURL, this.insertPosts.bind(this));
    }
  }, {
    key: "getData",
    value: function getData(dataURL, fn) {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function () {
        var list = JSON.parse(oReq.responseText).body;
        fn(list);
      });
      oReq.open('GET', dataURL);
      oReq.send();
    }
  }, {
    key: "insertPosts",
    value: function insertPosts(list) {
      var _this2 = this;

      list.forEach(function (v) {
        _this2.blogList.innerHTML += "\n\t\t\t\t<li>\n\t\t\t\t\t<a href=".concat(v.link, ">").concat(v.title, "</a>\n\t\t\t\t\t<div class=\"like\">Like</div>\n\t\t\t\t</li>\n\t\t\t\t");
      });
    }
  }]);

  return Blog;
}();

var _default = Blog;
exports["default"] = _default;
