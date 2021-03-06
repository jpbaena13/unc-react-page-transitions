"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _modernizr = _interopRequireDefault(require("modernizr"));

var _animations = _interopRequireDefault(require("./assets/animations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  page: {
    backfaceVisibility: 'hidden',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transform: 'translate3d(0,0,0)',
    transformStyle: 'preserve-3d',
    visibility: 'hidden',
    width: '100%'
  },
  currentPage: {
    visibility: 'visible',
    zIndex: 1
  }
};
var animEndEventNames = {
  WebkitAnimation: 'webkitAnimationEnd',
  OAnimation: 'oAnimationEnd',
  msAnimation: 'MSAnimationEnd',
  animation: 'animationend'
};

var Page =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Page, _React$PureComponent);

  function Page(props) {
    var _this;

    _classCallCheck(this, Page);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Page).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addSetTimeout", function (callback, milliseconds) {
      _this.setTimeouts.push(setTimeout(callback, milliseconds));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearSetTimeouts", function () {
      for (var i = _this.setTimeouts.length - 1; i >= 0; i -= 1) {
        clearTimeout(_this.setTimeouts[i]);

        _this.setTimeouts.pop();
      }
    });

    _this.page = _react.default.createRef(); // Repeaters

    _this.loadedPageTriggers = undefined;
    _this.leavedPageTriggers = undefined;
    _this.setTimeouts = [];
    return _this;
  }
  /**
   * Allows to add a function into the array of settimeout functions
   * that will be executed for instance of page.
   *
   * @param {Function} callback The function that will be executed
   * @param {int}   milliseconds The number of milliseconds to wait before executing the code.
   */


  _createClass(Page, [{
    key: "componentDidMount",

    /**
     * componentDidMount method
     *
     * Executes the loadedPageTriggers functions when the component is mounted.
     */
    value: function componentDidMount() {
      var _this2 = this;

      this.page.current.addEventListener(animEndEventNames[_modernizr.default.prefixed('animation')], function (event) {
        if (event.target !== _this2.page.current) return;

        if (_this2.props.isCurrentPage) {
          if (_this2.loadedPageTriggers) {
            _this2.loadedPageTriggers.forEach(function (trigger) {
              trigger.f(_this2, _this2.page.current);
            });
          } else if (_this2.props.loadedPageTriggers) {
            _this2.loadedPageTriggers = [];

            _this2.props.loadedPageTriggers.forEach(function (trigger) {
              trigger.f(_this2, _this2.page.current);

              if (trigger.r) {
                _this2.loadedPageTriggers.push(trigger);
              }
            });
          }
        }

        _this2.props.onAnimationEnd(_this2.props.isCurrentPage, _this2.props.isPrevPage);
      });
    }
    /**
     * componentWillUnmount method
     *
     * Executes the leavedPageTriggers functions when the component is unmounted
     * and clear the registred setTimeouts.
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      if (this.leavedPageTriggers) {
        this.leavedPageTriggers.forEach(function (trigger) {
          trigger.f(_this3, _this3.page.current);
        });
      } else if (this.props.leavedPageTriggers) {
        this.leavedPageTriggers = [];
        this.props.leavedPageTriggers.forEach(function (trigger) {
          trigger.f(_this3, _this3.page.current);

          if (trigger.r) {
            _this3.leavedPageTriggers.push(trigger);
          }
        });
      }

      this.clearSetTimeouts();
    }
    /**
     * Render method.
     */

  }, {
    key: "render",
    value: function render() {
      var style = Object.assign({}, styles.page, this.props.style || {});
      var className = (0, _classnames.default)(this.props.className);

      if (this.props.isCurrentPage || this.props.isPrevPage) {
        style = Object.assign(style, styles.currentPage);

        if (this.props.isCurrentPage) {
          className = (0, _classnames.default)(className, _animations.default.classes[this.props.animcursor].inClass);
        }

        if (this.props.isPrevPage) {
          className = (0, _classnames.default)(className, _animations.default.classes[this.props.animcursor].outClass);
        }
      }

      return _react.default.createElement("div", {
        id: this.props.id,
        ref: this.page,
        className: className,
        style: style
      }, this.props.children);
    }
  }]);

  return Page;
}(_react.default.PureComponent);

Page.propTypes = {
  loadedPageTriggers: _propTypes.default.array,
  leavedPageTriggers: _propTypes.default.array
};
var _default = Page;
exports.default = _default;