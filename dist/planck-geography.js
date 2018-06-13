(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@takram/planck-core'), require('three'), require('d3'), require('d3-geo-projection')) :
  typeof define === 'function' && define.amd ? define(['exports', '@takram/planck-core', 'three', 'd3', 'd3-geo-projection'], factory) :
  (factory((global.Planck = global.Planck || {}),global.Planck,global.THREE,global.d3,global.d3));
}(this, (function (exports,planckCore,Three,d3,d3GeoProjection) { 'use strict';

  var asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  // The MIT License

  var internal = planckCore.Namespace('Division');

  var Division = function () {
    function Division(level, code) {
      classCallCheck(this, Division);

      var scope = internal(this);
      scope.level = level;
      scope.code = code;
    }

    createClass(Division, [{
      key: 'properties',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projection) {
          var properties, code, result, level;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.level.properties(projection);

                case 2:
                  properties = _context.sent;
                  code = this.code;
                  result = properties[code];

                  if (!(result == null)) {
                    _context.next = 8;
                    break;
                  }

                  level = this.level.identifier;
                  throw new Error('Could not find properties for ' + level + ' ' + code);

                case 8:
                  return _context.abrupt('return', result);

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function properties(_x) {
          return _ref.apply(this, arguments);
        }

        return properties;
      }()
    }, {
      key: 'bounds',
      value: function () {
        var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projection) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context2.abrupt('return', _context2.sent.bounds);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function bounds(_x2) {
          return _ref2.apply(this, arguments);
        }

        return bounds;
      }()
    }, {
      key: 'area',
      value: function () {
        var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(projection) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context3.abrupt('return', _context3.sent.area);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function area(_x3) {
          return _ref3.apply(this, arguments);
        }

        return area;
      }()
    }, {
      key: 'centroid',
      value: function () {
        var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(projection) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context4.abrupt('return', _context4.sent.centroid);

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function centroid(_x4) {
          return _ref4.apply(this, arguments);
        }

        return centroid;
      }()
    }, {
      key: 'poleOfInaccessibility',
      value: function () {
        var _ref5 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(projection) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context5.abrupt('return', _context5.sent.poleOfInaccessibility);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function poleOfInaccessibility(_x5) {
          return _ref5.apply(this, arguments);
        }

        return poleOfInaccessibility;
      }()
    }, {
      key: 'geometry',
      value: function () {
        var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name, projection) {
          var geometries, code, result, level;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.level.geometries(name, projection);

                case 2:
                  geometries = _context6.sent;
                  code = this.code;
                  result = geometries[code];

                  if (!(result == null)) {
                    _context6.next = 8;
                    break;
                  }

                  level = this.level.identifier;
                  throw new Error('Could not find ' + name + ' geometry for ' + level + ' ' + code);

                case 8:
                  return _context6.abrupt('return', result);

                case 9:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function geometry(_x6, _x7) {
          return _ref6.apply(this, arguments);
        }

        return geometry;
      }()
    }, {
      key: 'shapeGeometry',
      value: function () {
        var _ref7 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(projection) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', this.geometry('shapes', projection));

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function shapeGeometry(_x8) {
          return _ref7.apply(this, arguments);
        }

        return shapeGeometry;
      }()
    }, {
      key: 'outlineGeometry',
      value: function () {
        var _ref8 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(projection) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt('return', this.geometry('outlines', projection));

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function outlineGeometry(_x9) {
          return _ref8.apply(this, arguments);
        }

        return outlineGeometry;
      }()
    }, {
      key: 'borderGeometry',
      value: function () {
        var _ref9 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(projection) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', this.geometry('borders', projection));

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function borderGeometry(_x10) {
          return _ref9.apply(this, arguments);
        }

        return borderGeometry;
      }()
    }, {
      key: 'subdivisionGeometry',
      value: function () {
        var _ref10 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(projection) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', this.geometry('subdivisions', projection));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this);
        }));

        function subdivisionGeometry(_x11) {
          return _ref10.apply(this, arguments);
        }

        return subdivisionGeometry;
      }()
    }, {
      key: 'belongsTo',
      value: function belongsTo(division) {
        if (division.level !== this.level.superlevel) {
          return false;
        }
        return division.code === this.level.coder.super(this.code);
      }
    }, {
      key: 'code',
      get: function get$$1() {
        return internal(this).code;
      }
    }, {
      key: 'level',
      get: function get$$1() {
        return internal(this).level;
      }
    }, {
      key: 'geography',
      get: function get$$1() {
        return this.level.geography;
      }
    }, {
      key: 'data',
      get: function get$$1() {
        var _this = this;

        var scope = internal(this);
        if (scope.data == null) {
          scope.data = this.level.data.find(function (data) {
            return data.code === _this.code;
          });
        }
        return scope.data;
      }
    }, {
      key: 'name',
      get: function get$$1() {
        return this.data.name;
      }
    }, {
      key: 'localizedName',
      get: function get$$1() {
        return this.data.localizedName || this.data.name;
      }
    }, {
      key: 'neighbors',
      get: function get$$1() {
        var _this2 = this;

        var scope = internal(this);
        if (scope.neighbors == null) {
          scope.neighbors = this.data.neighbors.map(function (code) {
            return _this2.constructor.for(code);
          });
        }
        return [].concat(toConsumableArray(scope.neighbors));
      }
    }, {
      key: 'superdivision',
      get: function get$$1() {
        var _this3 = this;

        var scope = internal(this);
        if (scope.superdivision == null) {
          var superlevel = this.level.superlevel;

          if (!superlevel) {
            scope.superdivision = null;
          } else {
            scope.superdivision = superlevel.divisions.find(function (division) {
              return _this3.belongsTo(division);
            });
          }
        }
        return scope.superdivision;
      }
    }, {
      key: 'subdivisions',
      get: function get$$1() {
        var _this4 = this;

        var scope = internal(this);
        if (scope.subdivisions == null) {
          var sublevel = this.level.sublevel;

          if (!sublevel) {
            scope.subdivisions = [];
          } else {
            scope.subdivisions = sublevel.divisions.filter(function (division) {
              return division.belongsTo(_this4);
            });
          }
        }
        return [].concat(toConsumableArray(scope.subdivisions));
      }
    }]);
    return Division;
  }();

  // The MIT License

  function _packBufferGeometry5(geometry) {
    var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var data = geometry.toJSON();
    var scope = data.data || {};
    var buffers = [];
    var byteLength = byteOffset;
    if (scope.index) {
      var array = geometry.index.array;
      var buffer = array.buffer;

      buffers.push([buffer, byteLength]);
      scope.index.array = [byteLength, array.length];
      byteLength += buffer.byteLength;
    }
    if (scope.attributes) {
      var names = Object.keys(scope.attributes);
      for (var i = 0; i < names.length; ++i) {
        var name = names[i];
        var _array = geometry.attributes[name].array;
        var _buffer = _array.buffer;

        buffers.push([_buffer, byteLength]);
        scope.attributes[name].array = [byteLength, _array.length];
        byteLength += _buffer.byteLength;
      }
    }
    data.data = scope;
    return [data, buffers, byteLength];
  }

  function _packBufferGeometries(geometries) {
    if (Array.isArray(geometries)) {
      var _data = [];
      var _buffers = [];
      var _byteOffset = 0;
      for (var i = 0; i < geometries.length; ++i) {
        var _packBufferGeometry = _packBufferGeometry5(geometries[i], _byteOffset),
            _packBufferGeometry2 = slicedToArray(_packBufferGeometry, 3),
            eachData = _packBufferGeometry2[0],
            eachBuffers = _packBufferGeometry2[1],
            eachByteOffset = _packBufferGeometry2[2];

        _data.push(eachData);
        _buffers.push.apply(_buffers, toConsumableArray(eachBuffers));
        _byteOffset = eachByteOffset;
      }
      return [_data, _buffers, _byteOffset];
    }
    var data = {};
    var buffers = [];
    var byteOffset = 0;
    var names = Object.keys(geometries);
    for (var _i = 0; _i < names.length; ++_i) {
      var name = names[_i];

      var _packBufferGeometry3 = _packBufferGeometry5(geometries[name], byteOffset),
          _packBufferGeometry4 = slicedToArray(_packBufferGeometry3, 3),
          eachData = _packBufferGeometry4[0],
          eachBuffers = _packBufferGeometry4[1],
          eachByteOffset = _packBufferGeometry4[2];

      data[name] = eachData;
      buffers.push.apply(buffers, toConsumableArray(eachBuffers));
      byteOffset = eachByteOffset;
    }
    return [data, buffers, byteOffset];
  }

  function _unpackBufferGeometry(data, buffer) {
    var copy = _extends({}, data, { data: _extends({}, data.data) });
    if (copy.data.index) {
      var type = copy.data.index.type;

      var view = new (Function.prototype.bind.apply(planckCore.globalScope[type], [null].concat([buffer], toConsumableArray(copy.data.index.array))))();
      copy.data.index = _extends({}, copy.data.index, { array: view });
    }
    if (copy.data.attributes) {
      var attributes = {};
      var names = Object.keys(copy.data.attributes);
      for (var i = 0; i < names.length; ++i) {
        var name = names[i];
        var attribute = copy.data.attributes[name];
        var _type = attribute.type;

        var _view = new (Function.prototype.bind.apply(planckCore.globalScope[_type], [null].concat([buffer], toConsumableArray(attribute.array))))();
        attributes[name] = _extends({}, attribute, { array: _view });
      }
      copy.data.attributes = attributes;
    }
    return new Three.BufferGeometryLoader().parse(copy);
  }

  function mergeBuffers(buffers, byteLength) {
    var buffer = new ArrayBuffer(byteLength);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < buffers.length; ++i) {
      var _buffers$i = slicedToArray(buffers[i], 2),
          _buffer2 = _buffers$i[0],
          byteOffset = _buffers$i[1];

      view.set(new Uint8Array(_buffer2), byteOffset);
    }
    return buffer;
  }

  var GeometryPack = {
    packBufferGeometry: function packBufferGeometry(geometry) {
      var _packBufferGeometry6 = _packBufferGeometry5(geometry),
          _packBufferGeometry7 = slicedToArray(_packBufferGeometry6, 3),
          data = _packBufferGeometry7[0],
          buffers = _packBufferGeometry7[1],
          byteLength = _packBufferGeometry7[2];

      var buffer = mergeBuffers(buffers, byteLength);
      return [data, buffer];
    },
    packBufferGeometries: function packBufferGeometries(geometries) {
      var _packBufferGeometries2 = _packBufferGeometries(geometries),
          _packBufferGeometries3 = slicedToArray(_packBufferGeometries2, 3),
          data = _packBufferGeometries3[0],
          buffers = _packBufferGeometries3[1],
          byteLength = _packBufferGeometries3[2];

      var buffer = mergeBuffers(buffers, byteLength);
      return [data, buffer];
    },
    unpackBufferGeometry: function unpackBufferGeometry(data, buffer) {
      return _unpackBufferGeometry(data, buffer);
    },
    unpackBufferGeometries: function unpackBufferGeometries(data, buffer) {
      if (Array.isArray(data)) {
        var _result = [];
        for (var index = 0; index < data.length; ++index) {
          _result.push(_unpackBufferGeometry(data, buffer));
        }
        return _result;
      }
      var result = {};
      var names = Object.keys(data);
      for (var i = 0; i < names.length; ++i) {
        var name = names[i];
        result[name] = _unpackBufferGeometry(data[name], buffer);
      }
      return result;
    }
  };

  // The MIT License

  var internal$1 = planckCore.Namespace('DivisionLevel');

  var DivisionLevel = function () {
    function DivisionLevel(identifier, coder) {
      classCallCheck(this, DivisionLevel);

      var scope = internal$1(this);
      scope.identifier = identifier;
      scope.coder = coder;
      scope.divisions = {};
      scope.properties = {};
      scope.geometries = {};
    }

    createClass(DivisionLevel, [{
      key: 'init',
      value: function init(geography) {
        internal$1(this).geography = geography;
      }
    }, {
      key: 'division',
      value: function division(code) {
        var scope = internal$1(this);
        var division = scope.divisions[code];
        if (division == null) {
          division = new Division(this, code);
          scope.divisions[code] = division;
        }
        return division;
      }
    }, {
      key: 'properties',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projection) {
          var scope, hash, path;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  scope = internal$1(this);
                  hash = projection ? projection.hash : null;

                  if (scope.properties[hash] == null) {
                    path = planckCore.FilePath.join(planckCore.FilePath.dirname(this.geography.path), hash || '', this.geography.identifier, this.identifier, 'properties.json');

                    scope.properties[hash] = planckCore.Request.json(path, { local: true });
                  }
                  return _context.abrupt('return', scope.properties[hash]);

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function properties(_x) {
          return _ref.apply(this, arguments);
        }

        return properties;
      }()
    }, {
      key: 'geometries',
      value: function () {
        var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, projection) {
          var scope, hash, geometries;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  scope = internal$1(this);
                  hash = projection ? projection.hash : null;
                  geometries = scope.geometries[hash];

                  if (geometries == null) {
                    geometries = {};
                    scope.geometries[hash] = geometries;
                  }
                  if (geometries[name] == null) {
                    geometries[name] = this.requestGeometries(name, projection);
                  }
                  return _context2.abrupt('return', geometries[name]);

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function geometries(_x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return geometries;
      }()
    }, {
      key: 'requestGeometries',
      value: function () {
        var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name, projection) {
          var path, data, buffer, _ref4, _ref5;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  path = planckCore.FilePath.join(planckCore.FilePath.dirname(this.geography.path), projection.hash, this.geography.identifier, this.identifier, name);
                  data = void 0;
                  buffer = void 0;
                  _context3.prev = 3;
                  _context3.next = 6;
                  return Promise.all([planckCore.Request.json(path + '.json'), planckCore.Request.buffer(path + '.buffer')]);

                case 6:
                  _ref4 = _context3.sent;
                  _ref5 = slicedToArray(_ref4, 2);
                  data = _ref5[0];
                  buffer = _ref5[1];
                  _context3.next = 15;
                  break;

                case 12:
                  _context3.prev = 12;
                  _context3.t0 = _context3['catch'](3);
                  throw _context3.t0;

                case 15:
                  return _context3.abrupt('return', GeometryPack.unpackBufferGeometries(data, buffer));

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[3, 12]]);
        }));

        function requestGeometries(_x4, _x5) {
          return _ref3.apply(this, arguments);
        }

        return requestGeometries;
      }()
    }, {
      key: 'identifier',
      get: function get$$1() {
        return internal$1(this).identifier;
      }
    }, {
      key: 'coder',
      get: function get$$1() {
        return internal$1(this).coder;
      }
    }, {
      key: 'geography',
      get: function get$$1() {
        return internal$1(this).geography;
      }
    }, {
      key: 'data',
      get: function get$$1() {
        var scope = internal$1(this);
        if (scope.data == null) {
          scope.data = this.geography.data[this.identifier];
        }
        return scope.data;
      }
    }, {
      key: 'divisions',
      get: function get$$1() {
        var _this = this;

        var scope = internal$1(this);
        scope.divisions = _extends({}, scope.divisions, this.data.reduce(function (divisions, data) {
          var code = data.code;

          if (scope.divisions[code] == null) {
            return _extends({}, divisions, defineProperty({}, code, new Division(_this, code)));
          }
          return divisions;
        }, {}));
        return Object.values(scope.divisions);
      }
    }, {
      key: 'codes',
      get: function get$$1() {
        var scope = internal$1(this);
        if (scope.codes == null) {
          scope.codes = this.data.map(function (data) {
            return data.code;
          });
        }
        return [].concat(toConsumableArray(scope.codes));
      }
    }, {
      key: 'superlevel',
      get: function get$$1() {
        var scope = internal$1(this);
        if (scope.superlevel == null) {
          var levels = this.geography.levels;

          var index = levels.indexOf(this);
          if (index === -1) {
            throw new Error('Could not find levels for geography');
          }
          scope.superlevel = levels[index - 1] || null;
        }
        return scope.superlevel;
      }
    }, {
      key: 'sublevel',
      get: function get$$1() {
        var scope = internal$1(this);
        if (scope.sublevel == null) {
          var levels = this.geography.levels;

          var index = levels.indexOf(this);
          if (index === -1) {
            throw new Error('Could not find levels for geography');
          }
          scope.sublevel = levels[index + 1] || null;
        }
        return scope.sublevel;
      }
    }]);
    return DivisionLevel;
  }();

  // The MIT License

  var internal$2 = planckCore.Namespace('Geography');

  var Geography = function () {
    function Geography(identifier) {
      var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      classCallCheck(this, Geography);

      var scope = internal$2(this);
      scope.identifier = identifier;
      scope.levels = levels;
      scope.properties = {};
      scope.geometries = {};
    }

    createClass(Geography, [{
      key: 'init',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, data) {
          var _this = this;

          var scope;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  scope = internal$2(this);

                  scope.path = path;

                  if (!data) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 5;
                  return Promise.resolve(data);

                case 5:
                  scope.data = _context.sent;
                  _context.next = 11;
                  break;

                case 8:
                  _context.next = 10;
                  return planckCore.Request.json(path, { local: true });

                case 10:
                  scope.data = _context.sent;

                case 11:
                  _context.next = 13;
                  return Promise.all(this.levels.map(function (level) {
                    return level.init(_this);
                  }));

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function init(_x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return init;
      }()
    }, {
      key: 'division',
      value: function division(identifier, code) {
        var level = this.levels.find(function (level) {
          return level.identifier === identifier;
        });
        if (level == null) {
          throw new Error('Could not find ' + identifier + ' level in geography');
        }
        return level.division(code);
      }
    }, {
      key: 'divisions',
      value: function divisions(identifier) {
        var level = this.levels.find(function (level) {
          return level.identifier === identifier;
        });
        if (level == null) {
          throw new Error('Could not find ' + identifier + ' level in geography');
        }
        return level.divisions;
      }
    }, {
      key: 'codes',
      value: function codes(identifier) {
        var level = this.levels.find(function (level) {
          return level.identifier === identifier;
        });
        if (level == null) {
          throw new Error('Could not find ' + identifier + ' level in geography');
        }
        return level.codes;
      }
    }, {
      key: 'properties',
      value: function () {
        var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projection) {
          var scope, hash, path;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  scope = internal$2(this);
                  hash = projection ? projection.hash : null;

                  if (scope.properties[hash] == null) {
                    path = planckCore.FilePath.join(planckCore.FilePath.dirname(this.path), hash || '', this.identifier, 'properties.json');

                    scope.properties[hash] = planckCore.Request.json(path, { local: true });
                  }
                  return _context2.abrupt('return', scope.properties[hash]);

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function properties(_x4) {
          return _ref2.apply(this, arguments);
        }

        return properties;
      }()
    }, {
      key: 'bounds',
      value: function () {
        var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(projection) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context3.abrupt('return', _context3.sent.bounds);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function bounds(_x5) {
          return _ref3.apply(this, arguments);
        }

        return bounds;
      }()
    }, {
      key: 'area',
      value: function () {
        var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(projection) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context4.abrupt('return', _context4.sent.area);

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function area(_x6) {
          return _ref4.apply(this, arguments);
        }

        return area;
      }()
    }, {
      key: 'centroid',
      value: function () {
        var _ref5 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(projection) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context5.abrupt('return', _context5.sent.centroid);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function centroid(_x7) {
          return _ref5.apply(this, arguments);
        }

        return centroid;
      }()
    }, {
      key: 'poleOfInaccessibility',
      value: function () {
        var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(projection) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.properties(projection);

                case 2:
                  return _context6.abrupt('return', _context6.sent.poleOfInaccessibility);

                case 3:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function poleOfInaccessibility(_x8) {
          return _ref6.apply(this, arguments);
        }

        return poleOfInaccessibility;
      }()
    }, {
      key: 'geometry',
      value: function () {
        var _ref7 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(name, projection) {
          var scope, hash, geometries;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  scope = internal$2(this);
                  hash = projection ? projection.hash : null;
                  geometries = scope.geometries[hash];

                  if (geometries == null) {
                    geometries = {};
                    scope.geometries[hash] = geometries;
                  }
                  if (geometries[name] == null) {
                    geometries[name] = this.requestGeometry(name, projection);
                  }
                  return _context7.abrupt('return', geometries[name]);

                case 6:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function geometry(_x9, _x10) {
          return _ref7.apply(this, arguments);
        }

        return geometry;
      }()
    }, {
      key: 'requestGeometry',
      value: function () {
        var _ref8 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(name, projection) {
          var path, data, buffer, _ref9, _ref10;

          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  path = planckCore.FilePath.join(planckCore.FilePath.dirname(this.path), projection.hash, this.identifier, name);
                  data = void 0;
                  buffer = void 0;
                  _context8.prev = 3;
                  _context8.next = 6;
                  return Promise.all([planckCore.Request.json(path + '.json'), planckCore.Request.buffer(path + '.buffer')]);

                case 6:
                  _ref9 = _context8.sent;
                  _ref10 = slicedToArray(_ref9, 2);
                  data = _ref10[0];
                  buffer = _ref10[1];
                  _context8.next = 15;
                  break;

                case 12:
                  _context8.prev = 12;
                  _context8.t0 = _context8['catch'](3);
                  throw _context8.t0;

                case 15:
                  return _context8.abrupt('return', GeometryPack.unpackBufferGeometry(data, buffer));

                case 16:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[3, 12]]);
        }));

        function requestGeometry(_x11, _x12) {
          return _ref8.apply(this, arguments);
        }

        return requestGeometry;
      }()
    }, {
      key: 'shapeGeometry',
      value: function () {
        var _ref11 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(projection) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', this.geometry('shape', projection));

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function shapeGeometry(_x13) {
          return _ref11.apply(this, arguments);
        }

        return shapeGeometry;
      }()
    }, {
      key: 'outlineGeometry',
      value: function () {
        var _ref12 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(projection) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', this.geometry('outline', projection));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this);
        }));

        function outlineGeometry(_x14) {
          return _ref12.apply(this, arguments);
        }

        return outlineGeometry;
      }()
    }, {
      key: 'subdivisionGeometry',
      value: function () {
        var _ref13 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(projection) {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', this.geometry('subdivision', projection));

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, this);
        }));

        function subdivisionGeometry(_x15) {
          return _ref13.apply(this, arguments);
        }

        return subdivisionGeometry;
      }()
    }, {
      key: 'identifier',
      get: function get$$1() {
        return internal$2(this).identifier;
      }
    }, {
      key: 'levels',
      get: function get$$1() {
        return [].concat(toConsumableArray(internal$2(this).levels));
      }
    }, {
      key: 'path',
      get: function get$$1() {
        return internal$2(this).path;
      }
    }, {
      key: 'data',
      get: function get$$1() {
        var scope = internal$2(this);
        if (!scope.data) {
          throw new Error('Data is missing for ' + this.identifier);
        }
        return scope.data;
      }
    }]);
    return Geography;
  }();

  function identity (x) {
    return x;
  }

  function transform (transform) {
    if (transform == null) return identity;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function (input, i) {
      if (!i) x0 = y0 = 0;
      var j = 2,
          n = input.length,
          output = new Array(n);
      output[0] = (x0 += input[0]) * kx + dx;
      output[1] = (y0 += input[1]) * ky + dy;
      while (j < n) {
        output[j] = input[j], ++j;
      }return output;
    };
  }

  function reverse (array, n) {
    var t,
        j = array.length,
        i = j - n;
    while (i < --j) {
      t = array[i], array[i++] = array[j], array[j] = t;
    }
  }

  function object(topology, o) {
    var transformPoint = transform(topology.transform),
        arcs = topology.arcs;

    function arc(i, points) {
      if (points.length) points.pop();
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
        points.push(transformPoint(a[k], k));
      }
      if (i < 0) reverse(points, n);
    }

    function point(p) {
      return transformPoint(p);
    }

    function line(arcs) {
      var points = [];
      for (var i = 0, n = arcs.length; i < n; ++i) {
        arc(arcs[i], points);
      }if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
      return points;
    }

    function ring(arcs) {
      var points = line(arcs);
      while (points.length < 4) {
        points.push(points[0]);
      } // This may happen if an arc has only two points.
      return points;
    }

    function polygon(arcs) {
      return arcs.map(ring);
    }

    function geometry(o) {
      var type = o.type,
          coordinates;
      switch (type) {
        case "GeometryCollection":
          return { type: type, geometries: o.geometries.map(geometry) };
        case "Point":
          coordinates = point(o.coordinates);break;
        case "MultiPoint":
          coordinates = o.coordinates.map(point);break;
        case "LineString":
          coordinates = line(o.arcs);break;
        case "MultiLineString":
          coordinates = o.arcs.map(line);break;
        case "Polygon":
          coordinates = polygon(o.arcs);break;
        case "MultiPolygon":
          coordinates = o.arcs.map(polygon);break;
        default:
          return null;
      }
      return { type: type, coordinates: coordinates };
    }

    return geometry(o);
  }

  function stitch (topology, arcs) {
    var stitchedArcs = {},
        fragmentByStart = {},
        fragmentByEnd = {},
        fragments = [],
        emptyIndex = -1;

    // Stitch empty arcs first, since they may be subsumed by other arcs.
    arcs.forEach(function (i, j) {
      var arc = topology.arcs[i < 0 ? ~i : i],
          t;
      if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
        t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
      }
    });

    arcs.forEach(function (i) {
      var e = ends(i),
          start = e[0],
          end = e[1],
          f,
          g;

      if (f = fragmentByEnd[start]) {
        delete fragmentByEnd[f.end];
        f.push(i);
        f.end = end;
        if (g = fragmentByStart[end]) {
          delete fragmentByStart[g.start];
          var fg = g === f ? f : f.concat(g);
          fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else if (f = fragmentByStart[end]) {
        delete fragmentByStart[f.start];
        f.unshift(i);
        f.start = start;
        if (g = fragmentByEnd[start]) {
          delete fragmentByEnd[g.end];
          var gf = g === f ? f : g.concat(f);
          fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else {
        f = [i];
        fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
      }
    });

    function ends(i) {
      var arc = topology.arcs[i < 0 ? ~i : i],
          p0 = arc[0],
          p1;
      if (topology.transform) p1 = [0, 0], arc.forEach(function (dp) {
        p1[0] += dp[0], p1[1] += dp[1];
      });else p1 = arc[arc.length - 1];
      return i < 0 ? [p1, p0] : [p0, p1];
    }

    function flush(fragmentByEnd, fragmentByStart) {
      for (var k in fragmentByEnd) {
        var f = fragmentByEnd[k];
        delete fragmentByStart[f.start];
        delete f.start;
        delete f.end;
        f.forEach(function (i) {
          stitchedArcs[i < 0 ? ~i : i] = 1;
        });
        fragments.push(f);
      }
    }

    flush(fragmentByEnd, fragmentByStart);
    flush(fragmentByStart, fragmentByEnd);
    arcs.forEach(function (i) {
      if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]);
    });

    return fragments;
  }

  function mesh (topology) {
    return object(topology, meshArcs.apply(this, arguments));
  }

  function meshArcs(topology, object$$1, filter) {
    var arcs, i, n;
    if (arguments.length > 1) arcs = extractArcs(topology, object$$1, filter);else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) {
      arcs[i] = i;
    }return { type: "MultiLineString", arcs: stitch(topology, arcs) };
  }

  function extractArcs(topology, object$$1, filter) {
    var arcs = [],
        geomsByArc = [],
        geom;

    function extract0(i) {
      var j = i < 0 ? ~i : i;
      (geomsByArc[j] || (geomsByArc[j] = [])).push({ i: i, g: geom });
    }

    function extract1(arcs) {
      arcs.forEach(extract0);
    }

    function extract2(arcs) {
      arcs.forEach(extract1);
    }

    function extract3(arcs) {
      arcs.forEach(extract2);
    }

    function geometry(o) {
      switch (geom = o, o.type) {
        case "GeometryCollection":
          o.geometries.forEach(geometry);break;
        case "LineString":
          extract1(o.arcs);break;
        case "MultiLineString":case "Polygon":
          extract2(o.arcs);break;
        case "MultiPolygon":
          extract3(o.arcs);break;
      }
    }

    geometry(object$$1);

    geomsByArc.forEach(filter == null ? function (geoms) {
      arcs.push(geoms[0].i);
    } : function (geoms) {
      if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i);
    });

    return arcs;
  }

  function planarRingArea(ring) {
    var i = -1,
        n = ring.length,
        a,
        b = ring[n - 1],
        area = 0;
    while (++i < n) {
      a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];
    }return Math.abs(area); // Note: doubled area!
  }

  function merge (topology) {
    return object(topology, mergeArcs.apply(this, arguments));
  }

  function mergeArcs(topology, objects) {
    var polygonsByArc = {},
        polygons = [],
        groups = [];

    objects.forEach(geometry);

    function geometry(o) {
      switch (o.type) {
        case "GeometryCollection":
          o.geometries.forEach(geometry);break;
        case "Polygon":
          extract(o.arcs);break;
        case "MultiPolygon":
          o.arcs.forEach(extract);break;
      }
    }

    function extract(polygon) {
      polygon.forEach(function (ring) {
        ring.forEach(function (arc) {
          (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
        });
      });
      polygons.push(polygon);
    }

    function area(ring) {
      return planarRingArea(object(topology, { type: "Polygon", arcs: [ring] }).coordinates[0]);
    }

    polygons.forEach(function (polygon) {
      if (!polygon._) {
        var group = [],
            neighbors = [polygon];
        polygon._ = 1;
        groups.push(group);
        while (polygon = neighbors.pop()) {
          group.push(polygon);
          polygon.forEach(function (ring) {
            ring.forEach(function (arc) {
              polygonsByArc[arc < 0 ? ~arc : arc].forEach(function (polygon) {
                if (!polygon._) {
                  polygon._ = 1;
                  neighbors.push(polygon);
                }
              });
            });
          });
        }
      }
    });

    polygons.forEach(function (polygon) {
      delete polygon._;
    });

    return {
      type: "MultiPolygon",
      arcs: groups.map(function (polygons) {
        var arcs = [],
            n;

        // Extract the exterior (unique) arcs.
        polygons.forEach(function (polygon) {
          polygon.forEach(function (ring) {
            ring.forEach(function (arc) {
              if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
                arcs.push(arc);
              }
            });
          });
        });

        // Stitch the arcs into one or more rings.
        arcs = stitch(topology, arcs);

        // If more than one ring is returned,
        // at most one of these rings can be the exterior;
        // choose the one with the greatest absolute area.
        if ((n = arcs.length) > 1) {
          for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
            if ((ki = area(arcs[i])) > k) {
              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
            }
          }
        }

        return arcs;
      })
    };
  }

  function bisect (a, x) {
    var lo = 0,
        hi = a.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (a[mid] < x) lo = mid + 1;else hi = mid;
    }
    return lo;
  }

  function neighbors (objects) {
    var indexesByArc = {},
        // arc index -> array of object indexes
    neighbors = objects.map(function () {
      return [];
    });

    function line(arcs, i) {
      arcs.forEach(function (a) {
        if (a < 0) a = ~a;
        var o = indexesByArc[a];
        if (o) o.push(i);else indexesByArc[a] = [i];
      });
    }

    function polygon(arcs, i) {
      arcs.forEach(function (arc) {
        line(arc, i);
      });
    }

    function geometry(o, i) {
      if (o.type === "GeometryCollection") o.geometries.forEach(function (o) {
        geometry(o, i);
      });else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
    }

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function MultiPolygon(arcs, i) {
        arcs.forEach(function (arc) {
          polygon(arc, i);
        });
      }
    };

    objects.forEach(geometry);

    for (var i in indexesByArc) {
      for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
        for (var k = j + 1; k < m; ++k) {
          var ij = indexes[j],
              ik = indexes[k],
              n;
          if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
          if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
        }
      }
    }

    return neighbors;
  }

  // Computes the bounding box of the specified hash of GeoJSON objects.

  // TODO if quantized, use simpler Int32 hashing?

  // Given an array of arcs in absolute (but already quantized!) coordinates,

  // Extracts the lines and rings from the specified hash of geometry objects.

  // Given a hash of GeoJSON objects, returns a hash of GeoJSON geometry objects.

  var pi = Math.PI;

  var earcut_1 = earcut;
  var default_1 = earcut;

  function earcut(data, holeIndices, dim) {

      dim = dim || 2;

      var hasHoles = holeIndices && holeIndices.length,
          outerLen = hasHoles ? holeIndices[0] * dim : data.length,
          outerNode = linkedList(data, 0, outerLen, dim, true),
          triangles = [];

      if (!outerNode) return triangles;

      var minX, minY, maxX, maxY, x, y, invSize;

      if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

      // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
      if (data.length > 80 * dim) {
          minX = maxX = data[0];
          minY = maxY = data[1];

          for (var i = dim; i < outerLen; i += dim) {
              x = data[i];
              y = data[i + 1];
              if (x < minX) minX = x;
              if (y < minY) minY = y;
              if (x > maxX) maxX = x;
              if (y > maxY) maxY = y;
          }

          // minX, minY and invSize are later used to transform coords into integers for z-order calculation
          invSize = Math.max(maxX - minX, maxY - minY);
          invSize = invSize !== 0 ? 1 / invSize : 0;
      }

      earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

      return triangles;
  }

  // create a circular doubly linked list from polygon points in the specified winding order
  function linkedList(data, start, end, dim, clockwise) {
      var i, last;

      if (clockwise === signedArea(data, start, end, dim) > 0) {
          for (i = start; i < end; i += dim) {
              last = insertNode(i, data[i], data[i + 1], last);
          }
      } else {
          for (i = end - dim; i >= start; i -= dim) {
              last = insertNode(i, data[i], data[i + 1], last);
          }
      }

      if (last && equals(last, last.next)) {
          removeNode(last);
          last = last.next;
      }

      return last;
  }

  // eliminate colinear or duplicate points
  function filterPoints(start, end) {
      if (!start) return start;
      if (!end) end = start;

      var p = start,
          again;
      do {
          again = false;

          if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
              removeNode(p);
              p = end = p.prev;
              if (p === p.next) break;
              again = true;
          } else {
              p = p.next;
          }
      } while (again || p !== end);

      return end;
  }

  // main ear slicing loop which triangulates a polygon (given as a linked list)
  function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
      if (!ear) return;

      // interlink polygon nodes in z-order
      if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

      var stop = ear,
          prev,
          next;

      // iterate through ears, slicing them one by one
      while (ear.prev !== ear.next) {
          prev = ear.prev;
          next = ear.next;

          if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
              // cut off the triangle
              triangles.push(prev.i / dim);
              triangles.push(ear.i / dim);
              triangles.push(next.i / dim);

              removeNode(ear);

              // skipping the next vertice leads to less sliver triangles
              ear = next.next;
              stop = next.next;

              continue;
          }

          ear = next;

          // if we looped through the whole remaining polygon and can't find any more ears
          if (ear === stop) {
              // try filtering points and slicing again
              if (!pass) {
                  earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

                  // if this didn't work, try curing all small self-intersections locally
              } else if (pass === 1) {
                  ear = cureLocalIntersections(ear, triangles, dim);
                  earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

                  // as a last resort, try splitting the remaining polygon into two
              } else if (pass === 2) {
                  splitEarcut(ear, triangles, dim, minX, minY, invSize);
              }

              break;
          }
      }
  }

  // check whether a polygon node forms a valid ear with adjacent nodes
  function isEar(ear) {
      var a = ear.prev,
          b = ear,
          c = ear.next;

      if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

      // now make sure we don't have other points inside the potential ear
      var p = ear.next.next;

      while (p !== ear.prev) {
          if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
          p = p.next;
      }

      return true;
  }

  function isEarHashed(ear, minX, minY, invSize) {
      var a = ear.prev,
          b = ear,
          c = ear.next;

      if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

      // triangle bbox; min & max are calculated like this for speed
      var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
          minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
          maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
          maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y;

      // z-order range for the current triangle bbox;
      var minZ = zOrder(minTX, minTY, minX, minY, invSize),
          maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

      var p = ear.prevZ,
          n = ear.nextZ;

      // look for points inside the triangle in both directions
      while (p && p.z >= minZ && n && n.z <= maxZ) {
          if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
          p = p.prevZ;

          if (n !== ear.prev && n !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
          n = n.nextZ;
      }

      // look for remaining points in decreasing z-order
      while (p && p.z >= minZ) {
          if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
          p = p.prevZ;
      }

      // look for remaining points in increasing z-order
      while (n && n.z <= maxZ) {
          if (n !== ear.prev && n !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
          n = n.nextZ;
      }

      return true;
  }

  // go through all polygon nodes and cure small local self-intersections
  function cureLocalIntersections(start, triangles, dim) {
      var p = start;
      do {
          var a = p.prev,
              b = p.next.next;

          if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

              triangles.push(a.i / dim);
              triangles.push(p.i / dim);
              triangles.push(b.i / dim);

              // remove two nodes involved
              removeNode(p);
              removeNode(p.next);

              p = start = b;
          }
          p = p.next;
      } while (p !== start);

      return p;
  }

  // try splitting polygon into two and triangulate them independently
  function splitEarcut(start, triangles, dim, minX, minY, invSize) {
      // look for a valid diagonal that divides the polygon into two
      var a = start;
      do {
          var b = a.next.next;
          while (b !== a.prev) {
              if (a.i !== b.i && isValidDiagonal(a, b)) {
                  // split the polygon in two by the diagonal
                  var c = splitPolygon(a, b);

                  // filter colinear points around the cuts
                  a = filterPoints(a, a.next);
                  c = filterPoints(c, c.next);

                  // run earcut on each half
                  earcutLinked(a, triangles, dim, minX, minY, invSize);
                  earcutLinked(c, triangles, dim, minX, minY, invSize);
                  return;
              }
              b = b.next;
          }
          a = a.next;
      } while (a !== start);
  }

  // link every hole into the outer loop, producing a single-ring polygon without holes
  function eliminateHoles(data, holeIndices, outerNode, dim) {
      var queue = [],
          i,
          len,
          start,
          end,
          list;

      for (i = 0, len = holeIndices.length; i < len; i++) {
          start = holeIndices[i] * dim;
          end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
          list = linkedList(data, start, end, dim, false);
          if (list === list.next) list.steiner = true;
          queue.push(getLeftmost(list));
      }

      queue.sort(compareX);

      // process holes from left to right
      for (i = 0; i < queue.length; i++) {
          eliminateHole(queue[i], outerNode);
          outerNode = filterPoints(outerNode, outerNode.next);
      }

      return outerNode;
  }

  function compareX(a, b) {
      return a.x - b.x;
  }

  // find a bridge between vertices that connects hole with an outer ring and and link it
  function eliminateHole(hole, outerNode) {
      outerNode = findHoleBridge(hole, outerNode);
      if (outerNode) {
          var b = splitPolygon(outerNode, hole);
          filterPoints(b, b.next);
      }
  }

  // David Eberly's algorithm for finding a bridge between hole and outer polygon
  function findHoleBridge(hole, outerNode) {
      var p = outerNode,
          hx = hole.x,
          hy = hole.y,
          qx = -Infinity,
          m;

      // find a segment intersected by a ray from the hole's leftmost point to the left;
      // segment's endpoint with lesser x will be potential connection point
      do {
          if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
              var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
              if (x <= hx && x > qx) {
                  qx = x;
                  if (x === hx) {
                      if (hy === p.y) return p;
                      if (hy === p.next.y) return p.next;
                  }
                  m = p.x < p.next.x ? p : p.next;
              }
          }
          p = p.next;
      } while (p !== outerNode);

      if (!m) return null;

      if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

      // look for points inside the triangle of hole point, segment intersection and endpoint;
      // if there are no points found, we have a valid connection;
      // otherwise choose the point of the minimum angle with the ray as connection point

      var stop = m,
          mx = m.x,
          my = m.y,
          tanMin = Infinity,
          tan;

      p = m.next;

      while (p !== stop) {
          if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

              tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

              if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
                  m = p;
                  tanMin = tan;
              }
          }

          p = p.next;
      }

      return m;
  }

  // interlink polygon nodes in z-order
  function indexCurve(start, minX, minY, invSize) {
      var p = start;
      do {
          if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
          p.prevZ = p.prev;
          p.nextZ = p.next;
          p = p.next;
      } while (p !== start);

      p.prevZ.nextZ = null;
      p.prevZ = null;

      sortLinked(p);
  }

  // Simon Tatham's linked list merge sort algorithm
  // http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
  function sortLinked(list) {
      var i,
          p,
          q,
          e,
          tail,
          numMerges,
          pSize,
          qSize,
          inSize = 1;

      do {
          p = list;
          list = null;
          tail = null;
          numMerges = 0;

          while (p) {
              numMerges++;
              q = p;
              pSize = 0;
              for (i = 0; i < inSize; i++) {
                  pSize++;
                  q = q.nextZ;
                  if (!q) break;
              }
              qSize = inSize;

              while (pSize > 0 || qSize > 0 && q) {

                  if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                      e = p;
                      p = p.nextZ;
                      pSize--;
                  } else {
                      e = q;
                      q = q.nextZ;
                      qSize--;
                  }

                  if (tail) tail.nextZ = e;else list = e;

                  e.prevZ = tail;
                  tail = e;
              }

              p = q;
          }

          tail.nextZ = null;
          inSize *= 2;
      } while (numMerges > 1);

      return list;
  }

  // z-order of a point given coords and inverse of the longer side of data bbox
  function zOrder(x, y, minX, minY, invSize) {
      // coords are transformed into non-negative 15-bit integer range
      x = 32767 * (x - minX) * invSize;
      y = 32767 * (y - minY) * invSize;

      x = (x | x << 8) & 0x00FF00FF;
      x = (x | x << 4) & 0x0F0F0F0F;
      x = (x | x << 2) & 0x33333333;
      x = (x | x << 1) & 0x55555555;

      y = (y | y << 8) & 0x00FF00FF;
      y = (y | y << 4) & 0x0F0F0F0F;
      y = (y | y << 2) & 0x33333333;
      y = (y | y << 1) & 0x55555555;

      return x | y << 1;
  }

  // find the leftmost node of a polygon ring
  function getLeftmost(start) {
      var p = start,
          leftmost = start;
      do {
          if (p.x < leftmost.x) leftmost = p;
          p = p.next;
      } while (p !== start);

      return leftmost;
  }

  // check if a point lies within a convex triangle
  function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
      return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
  }

  // check if a diagonal between two polygon nodes is valid (lies in polygon interior)
  function isValidDiagonal(a, b) {
      return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
  }

  // signed area of a triangle
  function area(p, q, r) {
      return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  }

  // check if two points are equal
  function equals(p1, p2) {
      return p1.x === p2.x && p1.y === p2.y;
  }

  // check if two segments intersect
  function intersects(p1, q1, p2, q2) {
      if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) return true;
      return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
  }

  // check if a polygon diagonal intersects any polygon segments
  function intersectsPolygon(a, b) {
      var p = a;
      do {
          if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
          p = p.next;
      } while (p !== a);

      return false;
  }

  // check if a polygon diagonal is locally inside the polygon
  function locallyInside(a, b) {
      return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
  }

  // check if the middle point of a polygon diagonal is inside the polygon
  function middleInside(a, b) {
      var p = a,
          inside = false,
          px = (a.x + b.x) / 2,
          py = (a.y + b.y) / 2;
      do {
          if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
          p = p.next;
      } while (p !== a);

      return inside;
  }

  // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
  // if one belongs to the outer ring and another to a hole, it merges it into a single ring
  function splitPolygon(a, b) {
      var a2 = new Node(a.i, a.x, a.y),
          b2 = new Node(b.i, b.x, b.y),
          an = a.next,
          bp = b.prev;

      a.next = b;
      b.prev = a;

      a2.next = an;
      an.prev = a2;

      b2.next = a2;
      a2.prev = b2;

      bp.next = b2;
      b2.prev = bp;

      return b2;
  }

  // create a node and optionally link it with previous one (in a circular doubly linked list)
  function insertNode(i, x, y, last) {
      var p = new Node(i, x, y);

      if (!last) {
          p.prev = p;
          p.next = p;
      } else {
          p.next = last.next;
          p.prev = last;
          last.next.prev = p;
          last.next = p;
      }
      return p;
  }

  function removeNode(p) {
      p.next.prev = p.prev;
      p.prev.next = p.next;

      if (p.prevZ) p.prevZ.nextZ = p.nextZ;
      if (p.nextZ) p.nextZ.prevZ = p.prevZ;
  }

  function Node(i, x, y) {
      // vertice index in coordinates array
      this.i = i;

      // vertex coordinates
      this.x = x;
      this.y = y;

      // previous and next vertice nodes in a polygon ring
      this.prev = null;
      this.next = null;

      // z-order curve value
      this.z = null;

      // previous and next nodes in z-order
      this.prevZ = null;
      this.nextZ = null;

      // indicates whether this is a steiner point
      this.steiner = false;
  }

  // return a percentage difference between the polygon area and its triangulation area;
  // used to verify correctness of triangulation
  earcut.deviation = function (data, holeIndices, dim, triangles) {
      var hasHoles = holeIndices && holeIndices.length;
      var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

      var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
      if (hasHoles) {
          for (var i = 0, len = holeIndices.length; i < len; i++) {
              var start = holeIndices[i] * dim;
              var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
              polygonArea -= Math.abs(signedArea(data, start, end, dim));
          }
      }

      var trianglesArea = 0;
      for (i = 0; i < triangles.length; i += 3) {
          var a = triangles[i] * dim;
          var b = triangles[i + 1] * dim;
          var c = triangles[i + 2] * dim;
          trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
      }

      return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
  };

  function signedArea(data, start, end, dim) {
      var sum = 0;
      for (var i = start, j = end - dim; i < end; i += dim) {
          sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
          j = i;
      }
      return sum;
  }

  // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
  earcut.flatten = function (data) {
      var dim = data[0][0].length,
          result = { vertices: [], holes: [], dimensions: dim },
          holeIndex = 0;

      for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].length; j++) {
              for (var d = 0; d < dim; d++) {
                  result.vertices.push(data[i][j][d]);
              }
          }
          if (i > 0) {
              holeIndex += data[i - 1].length;
              result.holes.push(holeIndex);
          }
      }
      return result;
  };
  earcut_1.default = default_1;

  var tinyqueue = TinyQueue;

  function TinyQueue(data, compare) {
      if (!(this instanceof TinyQueue)) return new TinyQueue(data, compare);

      this.data = data || [];
      this.length = this.data.length;
      this.compare = compare || defaultCompare;

      if (this.length > 0) {
          for (var i = this.length >> 1; i >= 0; i--) {
              this._down(i);
          }
      }
  }

  function defaultCompare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
  }

  TinyQueue.prototype = {

      push: function push(item) {
          this.data.push(item);
          this.length++;
          this._up(this.length - 1);
      },

      pop: function pop() {
          if (this.length === 0) return undefined;
          var top = this.data[0];
          this.length--;
          if (this.length > 0) {
              this.data[0] = this.data[this.length];
              this._down(0);
          }
          this.data.pop();
          return top;
      },

      peek: function peek() {
          return this.data[0];
      },

      _up: function _up(pos) {
          var data = this.data;
          var compare = this.compare;
          var item = data[pos];

          while (pos > 0) {
              var parent = pos - 1 >> 1;
              var current = data[parent];
              if (compare(item, current) >= 0) break;
              data[pos] = current;
              pos = parent;
          }

          data[pos] = item;
      },

      _down: function _down(pos) {
          var data = this.data;
          var compare = this.compare;
          var len = this.length;
          var halfLen = len >> 1;
          var item = data[pos];

          while (pos < halfLen) {
              var left = (pos << 1) + 1;
              var right = left + 1;
              var best = data[left];

              if (right < len && compare(data[right], best) < 0) {
                  left = right;
                  best = data[right];
              }
              if (compare(best, item) >= 0) break;

              data[pos] = best;
              pos = left;
          }

          data[pos] = item;
      }
  };

  var tinyqueue$1 = /*#__PURE__*/Object.freeze({
    default: tinyqueue,
    __moduleExports: tinyqueue
  });

  var Queue = ( tinyqueue$1 && tinyqueue ) || tinyqueue$1;

  var polylabel_1 = polylabel;
  var default_1$1 = polylabel;

  function polylabel(polygon, precision, debug) {
      precision = precision || 1.0;

      // find the bounding box of the outer ring
      var minX, minY, maxX, maxY;
      for (var i = 0; i < polygon[0].length; i++) {
          var p = polygon[0][i];
          if (!i || p[0] < minX) minX = p[0];
          if (!i || p[1] < minY) minY = p[1];
          if (!i || p[0] > maxX) maxX = p[0];
          if (!i || p[1] > maxY) maxY = p[1];
      }

      var width = maxX - minX;
      var height = maxY - minY;
      var cellSize = Math.min(width, height);
      var h = cellSize / 2;

      // a priority queue of cells in order of their "potential" (max distance to polygon)
      var cellQueue = new Queue(null, compareMax);

      if (cellSize === 0) return [minX, minY];

      // cover polygon with initial cells
      for (var x = minX; x < maxX; x += cellSize) {
          for (var y = minY; y < maxY; y += cellSize) {
              cellQueue.push(new Cell(x + h, y + h, h, polygon));
          }
      }

      // take centroid as the first best guess
      var bestCell = getCentroidCell(polygon);

      // special case for rectangular polygons
      var bboxCell = new Cell(minX + width / 2, minY + height / 2, 0, polygon);
      if (bboxCell.d > bestCell.d) bestCell = bboxCell;

      var numProbes = cellQueue.length;

      while (cellQueue.length) {
          // pick the most promising cell from the queue
          var cell = cellQueue.pop();

          // update the best cell if we found a better one
          if (cell.d > bestCell.d) {
              bestCell = cell;
              if (debug) console.log('found best %d after %d probes', Math.round(1e4 * cell.d) / 1e4, numProbes);
          }

          // do not drill down further if there's no chance of a better solution
          if (cell.max - bestCell.d <= precision) continue;

          // split the cell into four cells
          h = cell.h / 2;
          cellQueue.push(new Cell(cell.x - h, cell.y - h, h, polygon));
          cellQueue.push(new Cell(cell.x + h, cell.y - h, h, polygon));
          cellQueue.push(new Cell(cell.x - h, cell.y + h, h, polygon));
          cellQueue.push(new Cell(cell.x + h, cell.y + h, h, polygon));
          numProbes += 4;
      }

      if (debug) {
          console.log('num probes: ' + numProbes);
          console.log('best distance: ' + bestCell.d);
      }

      return [bestCell.x, bestCell.y];
  }

  function compareMax(a, b) {
      return b.max - a.max;
  }

  function Cell(x, y, h, polygon) {
      this.x = x; // cell center x
      this.y = y; // cell center y
      this.h = h; // half the cell size
      this.d = pointToPolygonDist(x, y, polygon); // distance from cell center to polygon
      this.max = this.d + this.h * Math.SQRT2; // max distance to polygon within a cell
  }

  // signed distance from point to polygon outline (negative if point is outside)
  function pointToPolygonDist(x, y, polygon) {
      var inside = false;
      var minDistSq = Infinity;

      for (var k = 0; k < polygon.length; k++) {
          var ring = polygon[k];

          for (var i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
              var a = ring[i];
              var b = ring[j];

              if (a[1] > y !== b[1] > y && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;

              minDistSq = Math.min(minDistSq, getSegDistSq(x, y, a, b));
          }
      }

      return (inside ? 1 : -1) * Math.sqrt(minDistSq);
  }

  // get polygon centroid
  function getCentroidCell(polygon) {
      var area = 0;
      var x = 0;
      var y = 0;
      var points = polygon[0];

      for (var i = 0, len = points.length, j = len - 1; i < len; j = i++) {
          var a = points[i];
          var b = points[j];
          var f = a[0] * b[1] - b[0] * a[1];
          x += (a[0] + b[0]) * f;
          y += (a[1] + b[1]) * f;
          area += f * 3;
      }
      if (area === 0) return new Cell(points[0][0], points[0][1], 0, polygon);
      return new Cell(x / area, y / area, 0, polygon);
  }

  // get squared distance from a point to a segment
  function getSegDistSq(px, py, a, b) {

      var x = a[0];
      var y = a[1];
      var dx = b[0] - x;
      var dy = b[1] - y;

      if (dx !== 0 || dy !== 0) {

          var t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

          if (t > 1) {
              x = b[0];
              y = b[1];
          } else if (t > 0) {
              x += dx * t;
              y += dy * t;
          }
      }

      dx = px - x;
      dy = py - y;

      return dx * dx + dy * dy;
  }
  polylabel_1.default = default_1$1;

  /*
   * Generated by PEG.js 0.10.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function literal(expectation) {
        return "\"" + literalEscape(expectation.text) + "\"";
      },

      "class": function _class(expectation) {
        var escapedParts = "",
            i;

        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
        }

        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },

      any: function any(expectation) {
        return "any character";
      },

      end: function end(expectation) {
        return "end of input";
      },

      other: function other(expectation) {
        return expectation.description;
      }
    };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
        return '\\x0' + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return '\\x' + hex(ch);
      });
    }

    function classEscape(s) {
      return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
        return '\\x0' + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return '\\x' + hex(ch);
      });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i,
          j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};

    var peg$FAILED = {},
        peg$startRuleFunctions = { svg_path: peg$parsesvg_path },
        peg$startRuleFunction = peg$parsesvg_path,
        peg$c0 = function peg$c0(data) {
      if (!data) return [];
      for (var cmds = [], i = 0; i < data.length; i++) {
        cmds = cmds.concat.apply(cmds, data[i]);
      }var first = cmds[0];
      if (first && first.code == 'm') {
        // Per spec, first moveto is never relative
        delete first.relative;
        first.code = 'M';
      }
      return cmds;
    },
        peg$c1 = function peg$c1(first, more) {
      return merge(first, more);
    },
        peg$c2 = /^[Mm]/,
        peg$c3 = peg$classExpectation(["M", "m"], false, false),
        peg$c4 = function peg$c4(c, first, more) {
      var move = commands(c, [first]);
      if (more) move = move.concat(commands(c == 'M' ? 'L' : 'l', more[1]));
      return move;
    },
        peg$c5 = /^[Zz]/,
        peg$c6 = peg$classExpectation(["Z", "z"], false, false),
        peg$c7 = function peg$c7() {
      return commands('Z');
    },
        peg$c8 = /^[Ll]/,
        peg$c9 = peg$classExpectation(["L", "l"], false, false),
        peg$c10 = function peg$c10(c, args) {
      return commands(c, args);
    },
        peg$c11 = /^[Hh]/,
        peg$c12 = peg$classExpectation(["H", "h"], false, false),
        peg$c13 = function peg$c13(c, args) {
      return commands(c, args.map(function (x) {
        return { x: x };
      }));
    },
        peg$c14 = /^[Vv]/,
        peg$c15 = peg$classExpectation(["V", "v"], false, false),
        peg$c16 = function peg$c16(c, args) {
      return commands(c, args.map(function (y) {
        return { y: y };
      }));
    },
        peg$c17 = /^[Cc]/,
        peg$c18 = peg$classExpectation(["C", "c"], false, false),
        peg$c19 = function peg$c19(a, b, c) {
      return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, x: c.x, y: c.y };
    },
        peg$c20 = /^[Ss]/,
        peg$c21 = peg$classExpectation(["S", "s"], false, false),
        peg$c22 = function peg$c22(b, c) {
      return { x2: b.x, y2: b.y, x: c.x, y: c.y };
    },
        peg$c23 = /^[Qq]/,
        peg$c24 = peg$classExpectation(["Q", "q"], false, false),
        peg$c25 = function peg$c25(a, b) {
      return { x1: a.x, y1: a.y, x: b.x, y: b.y };
    },
        peg$c26 = /^[Tt]/,
        peg$c27 = peg$classExpectation(["T", "t"], false, false),
        peg$c28 = /^[Aa]/,
        peg$c29 = peg$classExpectation(["A", "a"], false, false),
        peg$c30 = function peg$c30(rx, ry, xrot, large, sweep, xy) {
      return { rx: rx, ry: ry, xAxisRotation: xrot, largeArc: large, sweep: sweep, x: xy.x, y: xy.y };
    },
        peg$c31 = function peg$c31(x, y) {
      return { x: x, y: y };
    },
        peg$c32 = function peg$c32(n) {
      return n * 1;
    },
        peg$c33 = function peg$c33(parts) {
      return parts.join('') * 1;
    },
        peg$c34 = /^[01]/,
        peg$c35 = peg$classExpectation(["0", "1"], false, false),
        peg$c36 = function peg$c36(bit) {
      return bit == '1';
    },
        peg$c37 = function peg$c37() {
      return '';
    },
        peg$c38 = ",",
        peg$c39 = peg$literalExpectation(",", false),
        peg$c40 = function peg$c40(parts) {
      return parts.join('');
    },
        peg$c41 = ".",
        peg$c42 = peg$literalExpectation(".", false),
        peg$c43 = /^[eE]/,
        peg$c44 = peg$classExpectation(["e", "E"], false, false),
        peg$c45 = /^[+\-]/,
        peg$c46 = peg$classExpectation(["+", "-"], false, false),
        peg$c47 = /^[0-9]/,
        peg$c48 = peg$classExpectation([["0", "9"]], false, false),
        peg$c49 = function peg$c49(digits) {
      return digits.join('');
    },
        peg$c50 = /^[ \t\n\r]/,
        peg$c51 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
        peg$currPos = 0,
        peg$posDetailsCache = [{ line: 1, column: 1 }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$endExpectation() {
      return { type: "end" };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }

    function peg$parsesvg_path() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsemoveTo_drawTo_commandGroups();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s1 = peg$c0(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsemoveTo_drawTo_commandGroups() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsemoveTo_drawTo_commandGroup();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = [];
        s5 = peg$parsewsp();
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parsewsp();
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsemoveTo_drawTo_commandGroup();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsemoveTo_drawTo_commandGroup();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsemoveTo_drawTo_commandGroup() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsemoveto();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = [];
        s5 = peg$parsewsp();
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parsewsp();
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsedrawto_command();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsedrawto_command();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedrawto_command() {
      var s0;

      s0 = peg$parseclosepath();
      if (s0 === peg$FAILED) {
        s0 = peg$parselineto();
        if (s0 === peg$FAILED) {
          s0 = peg$parsehorizontal_lineto();
          if (s0 === peg$FAILED) {
            s0 = peg$parsevertical_lineto();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecurveto();
              if (s0 === peg$FAILED) {
                s0 = peg$parsesmooth_curveto();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsequadratic_bezier_curveto();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsesmooth_quadratic_bezier_curveto();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseelliptical_arc();
                    }
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsemoveto() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (peg$c2.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c3);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecoordinate_pair();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsecomma_wsp();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parselineto_argument_sequence();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s1 = peg$c4(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseclosepath() {
      var s0, s1;

      s0 = peg$currPos;
      if (peg$c5.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c6);
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c7();
      }
      s0 = s1;

      return s0;
    }

    function peg$parselineto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c8.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c9);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parselineto_argument_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselineto_argument_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsecoordinate_pair();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecoordinate_pair();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsehorizontal_lineto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c11.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecoordinate_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c13(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecoordinate_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenumber();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsevertical_lineto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c14.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c15);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecoordinate_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c16(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecurveto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c17.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c18);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecurveto_argument_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecurveto_argument_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsecurveto_argument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecurveto_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecurveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecurveto_argument() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsecoordinate_pair();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma_wsp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecoordinate_pair();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecoordinate_pair();
              if (s5 !== peg$FAILED) {
                s1 = peg$c19(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsesmooth_curveto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c20.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c21);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesmooth_curveto_argument_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsesmooth_curveto_argument_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsesmooth_curveto_argument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsesmooth_curveto_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsesmooth_curveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsesmooth_curveto_argument() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsecoordinate_pair();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma_wsp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecoordinate_pair();
          if (s3 !== peg$FAILED) {
            s1 = peg$c22(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsequadratic_bezier_curveto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c24);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsequadratic_bezier_curveto_argument_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsequadratic_bezier_curveto_argument_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsequadratic_bezier_curveto_argument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsequadratic_bezier_curveto_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsequadratic_bezier_curveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsequadratic_bezier_curveto_argument() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsecoordinate_pair();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma_wsp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecoordinate_pair();
          if (s3 !== peg$FAILED) {
            s1 = peg$c25(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsesmooth_quadratic_bezier_curveto() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c26.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c27);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesmooth_quadratic_bezier_curveto_argument_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsesmooth_quadratic_bezier_curveto_argument_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsecoordinate_pair();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecoordinate_pair();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelliptical_arc() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c28.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseelliptical_arc_argument_sequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelliptical_arc_argument_sequence() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseelliptical_arc_argument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseelliptical_arc_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseelliptical_arc_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelliptical_arc_argument() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      s1 = peg$parsenonnegative_number();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma_wsp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenonnegative_number();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecomma_wsp();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseflag();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsecomma_wsp();
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseflag();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsecomma_wsp();
                        if (s10 === peg$FAILED) {
                          s10 = null;
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsecoordinate_pair();
                          if (s11 !== peg$FAILED) {
                            s1 = peg$c30(s1, s3, s5, s7, s9, s11);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecoordinate_pair() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma_wsp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            s1 = peg$c31(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsenonnegative_number() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsefloating_point_constant();
      if (s1 === peg$FAILED) {
        s1 = peg$parsedigit_sequence();
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c32(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsesign();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsefloating_point_constant();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedigit_sequence();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c33(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseflag() {
      var s0, s1;

      s0 = peg$currPos;
      if (peg$c34.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c36(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecomma_wsp() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsecomma();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s1 = peg$c37();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsecomma() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 44) {
        s0 = peg$c38;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }

      return s0;
    }

    function peg$parsefloating_point_constant() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsefractional_constant();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseexponent();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$parsedigit_sequence();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexponent();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c40(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsefractional_constant() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsedigit_sequence();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c41;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsedigit_sequence();
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$parsedigit_sequence();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c41;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c42);
            }
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c40(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseexponent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c43.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c44);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsesign();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsedigit_sequence();
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c40(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsesign() {
      var s0;

      if (peg$c45.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c46);
        }
      }

      return s0;
    }

    function peg$parsedigit_sequence() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c47.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c48);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c47.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c48);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c49(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsewsp() {
      var s0, s1;

      s0 = peg$currPos;
      if (peg$c50.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c51);
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c37();
      }
      s0 = s1;

      return s0;
    }

    function merge(first, more) {
      if (!more) return [first];
      for (var a = [first], i = 0, l = more.length; i < l; i++) {
        a[i + 1] = more[i][1];
      }return a;
    }

    var cmds = { m: 'moveto', l: 'lineto', h: 'horizontal lineto', v: 'vertical lineto', c: 'curveto', s: 'smooth curveto', q: 'quadratic curveto', t: 'smooth quadratic curveto', a: 'elliptical arc', z: 'closepath' };
    for (var code in cmds) {
      cmds[code.toUpperCase()] = cmds[code];
    }function commands(code, args) {
      if (!args) args = [{}];
      for (var i = args.length; i--;) {
        var cmd = { code: code, command: cmds[code] };
        if (code == code.toLowerCase()) cmd.relative = true;
        for (var k in args[i]) {
          cmd[k] = args[i][k];
        }args[i] = cmd;
      }
      return args;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }

  var parser = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
  var parser_1 = parser.parse;

  var parser$1 = /*#__PURE__*/Object.freeze({
    default: parser,
    __moduleExports: parser,
    parse: parser_1
  });

  var require$$0 = ( parser$1 && parser ) || parser$1;

  // v1.0 exported just the parser function. To maintain backwards compatibility,
  // we export additional named features as properties of that function.
  var parserFunction = require$$0.parse;
  parserFunction.parseSVG = parserFunction;
  parserFunction.makeAbsolute = makeSVGPathCommandsAbsolute;
  var svgPathParser = parserFunction;

  function makeSVGPathCommandsAbsolute(commands) {
  	var subpathStart,
  	    prevCmd = { x: 0, y: 0 };
  	var attr = { x: 'x0', y: 'y0', x1: 'x0', y1: 'y0', x2: 'x0', y2: 'y0' };
  	commands.forEach(function (cmd) {
  		if (cmd.command === 'moveto') subpathStart = cmd;
  		cmd.x0 = prevCmd.x;cmd.y0 = prevCmd.y;
  		for (var a in attr) {
  			if (a in cmd) cmd[a] += cmd.relative ? cmd[attr[a]] : 0;
  		}if (!('x' in cmd)) cmd.x = prevCmd.x; // V
  		if (!('y' in cmd)) cmd.y = prevCmd.y; // X
  		cmd.relative = false;
  		cmd.code = cmd.code.toUpperCase();
  		if (cmd.command == 'closepath') {
  			cmd.x = subpathStart.x;
  			cmd.y = subpathStart.y;
  		}
  		prevCmd = cmd;
  	});
  	return commands;
  }

  // The MIT License

  function cross(a, b) {
    return a.x * b.y - a.y * b.x;
  }

  function crossings(a, b, point) {
    if (a.x < point.x && point.x <= b.x || b.x < point.x && point.x <= a.x) {
      var y = a.y;

      if (a.x !== b.x) {
        y = a.y + (b.y - a.y) * (point.x - a.x) / (b.x - a.x);
      }
      if (point.y > y) {
        return 1;
      }
    }
    return 0;
  }

  var Path = {
    winding: function winding(curves) {
      if (curves.length < 3) {
        return undefined;
      }
      var front = curves[0];
      var back = curves[curves.length - 1];
      var sum = cross(back.v2, front.v1);
      sum = curves.reduce(function (sum, curve) {
        return sum + cross(curve.v1, curve.v2);
      }, sum);
      if (sum < 0) {
        return 'ccw';
      } else if (sum > 0) {
        return 'cw';
      }
      return undefined;
    },
    contains: function contains(curves, point) {
      if (curves.length < 3) {
        return false;
      }
      var front = curves[0];
      var back = curves[curves.length - 1];
      var sum = crossings(back.v2, front.v1, point);
      sum = curves.reduce(function (sum, curve) {
        return sum + crossings(curve.v1, curve.v2, point);
      }, sum);
      return sum % 2 === 1;
    },
    parse: function parse(input) {
      var flip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var x1 = 0;
      var y1 = 0;
      var x2 = 0;
      var y2 = 0;
      var x = 0;
      var y = 0;
      var path = void 0;
      var commands = svgPathParser(input);
      var paths = commands.reduce(function (paths, current) {
        switch (current.code) {
          case 'M':
          case 'm':
            if (current.relative === true) {
              x += current.x;
              y += current.y;
            } else {
              x = current.x;
              y = current.y;
            }
            if (path && path.curves.length === 0) {
              paths.pop();
            }
            path = new Three.Path();
            paths.push(path);
            if (flip) {
              path.moveTo(x, -y);
            } else {
              path.moveTo(x, y);
            }
            break;
          case 'L':
          case 'l':
            if (current.relative === true) {
              x += current.x;
              y += current.y;
            } else {
              x = current.x;
              y = current.y;
            }
            if (flip) {
              path.lineTo(x, -y);
            } else {
              path.lineTo(x, y);
            }
            break;
          case 'V':
          case 'v':
            if (current.relative === true) {
              y += current.y;
            } else {
              y = current.y;
            }
            if (flip) {
              path.lineTo(x, -y);
            } else {
              path.lineTo(x, y);
            }
            break;
          case 'H':
          case 'h':
            if (current.relative === true) {
              x += current.x;
            } else {
              x = current.x;
            }
            if (flip) {
              path.lineTo(x, -y);
            } else {
              path.lineTo(x, y);
            }
            break;
          case 'C':
          case 'c':
            if (current.relative === true) {
              x1 = x + current.x1;
              y1 = y + current.y1;
              x2 = x + current.x2;
              y2 = y + current.y2;
              x += current.x;
              y += current.y;
            } else {
              x1 = current.x1;
              y1 = current.y1;
              x2 = current.x2;
              y2 = current.y2;
              x = current.x;
              y = current.y;
            }
            if (flip) {
              path.bezierCurveTo(x1, -y1, x2, -y2, x, -y);
            } else {
              path.bezierCurveTo(x1, y1, x2, y2, x, y);
            }
            break;
          case 'S':
          case 's':
            x1 = x + (x - x2);
            y1 = y + (y - y2);
            if (current.relative === true) {
              x2 = x + current.x2;
              y2 = y + current.y2;
              x += current.x;
              y += current.y;
            } else {
              x2 = current.x2;
              y2 = current.y2;
              x = current.x;
              y = current.y;
            }
            if (flip) {
              path.bezierCurveTo(x1, -y1, x2, -y2, x, -y);
            } else {
              path.bezierCurveTo(x1, y1, x2, y2, x, y);
            }
            break;
          case 'Q':
          case 'q':
            if (current.relative === true) {
              x1 = x + current.x1;
              y1 = y + current.y1;
              x += current.x;
              y += current.y;
            } else {
              x1 = current.x1;
              y1 = current.y1;
              x = current.x;
              y = current.y;
            }
            if (flip) {
              path.quadraticCurveTo(x1, -y1, x, -y);
            } else {
              path.quadraticCurveTo(x1, y1, x, y);
            }
            break;
          case 'T':
          case 't':
            x1 = x + (x - x1);
            y1 = y + (y - y1);
            if (current.relative === true) {
              x += current.x;
              y += current.y;
            } else {
              x = current.x;
              y = current.y;
            }
            if (flip) {
              path.quadraticCurveTo(x1, -y1, x, -y);
            } else {
              path.quadraticCurveTo(x1, y1, x, y);
            }
            break;
          case 'A':
          case 'a':
            // TODO: Support arcs
            throw new planckCore.ImplementationError();
          case 'Z':
            path.closePath();
            break;
          default:
            throw new Error('Unknown code "' + current.code + '"');
        }
        return paths;
      }, []);

      if (paths.length === 0) {
        return null;
      } else if (paths.length === 1) {
        return paths[0];
      }
      return paths.reduce(function (shape, path) {
        shape.add(path);
        return shape;
      }, new Three.Shape());
    }
  };

  // The MIT License

  function codePropertyKeyForLevel(level) {
    return level + 'Code';
  }

  function includesGeometryObject(level, code, geometryObject) {
    var key = codePropertyKeyForLevel(level);
    return geometryObject.properties[key] === code;
  }

  function triangulateShape(contour, holes) {
    var vertices = contour.reduce(function (values, point) {
      return values.concat(point.x, point.y);
    }, []);

    var holeIndex = contour.length;
    var holeIndices = [];
    holes.forEach(function (hole, index) {
      holeIndices.push(holeIndex);
      holeIndex += hole.length;
      vertices = vertices.concat(hole.reduce(function (values, point) {
        return values.concat(point.x, point.y);
      }, []));
    });

    var result = earcut_1(vertices, holeIndices, 2);
    var groups = [];
    for (var i = 0; i < result.length; i += 3) {
      groups.push(result.slice(i, i + 3));
    }
    return groups;
  }

  function convertPolygonsToShapes(polygons, projection) {
    var errors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return polygons.coordinates.reduce(function (shapes, polygon, index) {
      var svg = projection.path({
        type: 'Polygon',
        coordinates: polygon
      });
      if (!svg) {
        errors.push(index);
        return shapes;
      }
      var path = Path.parse(svg, true);
      var paths = void 0;
      if (path instanceof Three.Shape) {
        paths = path.curves;
      } else {
        paths = [path];
      }
      var shape = new Three.Shape();
      paths.forEach(function (path) {
        var winding = Path.winding(path.curves);
        if (winding === 'ccw') {
          shape.add(path);
        } else if (winding === 'cw') {
          shape.holes.push(path);
        }
      });

      // Expand composite shape without holes into multiple shapes
      if (shape.holes.length === 0) {
        return shapes.concat(shape.curves.map(function (curve) {
          var shape = new Three.Shape();
          shape.add(curve);
          return shape;
        }));
      }
      return shapes.concat(shape);
    }, []);
  }

  function convertShapesToMeshGeometry(shapes) {
    // WORKAROUND: Use earcut triangulator instead of built-in one.
    // It's slower and less accurate but able to handle duplicated points
    // and holes better.
    var builtinTriangulateShape = Three.ShapeUtils.triangulateShape;
    Three.ShapeUtils.triangulateShape = triangulateShape;
    var geometry = new Three.BufferGeometry().fromGeometry(shapes.reduce(function (geometry, shape) {
      geometry.merge(new Three.ShapeGeometry(shape));
      return geometry;
    }, new Three.Geometry()));
    Three.ShapeUtils.triangulateShape = builtinTriangulateShape;
    geometry.computeBoundingSphere();
    return geometry;
  }

  function convertLinesToGeometry(lines) {
    var vertices = new Float32Array(lines.length * 6);
    lines.forEach(function (line, index) {
      var index6 = index * 6;
      vertices[index6 + 0] = line.v1.x;
      vertices[index6 + 1] = line.v1.y;
      vertices[index6 + 3] = line.v2.x;
      vertices[index6 + 4] = line.v2.y;
    });
    var geometry = new Three.BufferGeometry();
    var positions = new Three.BufferAttribute(vertices, 3);
    geometry.addAttribute('position', positions);
    return geometry;
  }

  function convertShapesToLineSegmentGeometry(shapes) {
    var lines = shapes.reduce(function (lines, shape) {
      return lines.concat(shape.curves.reduce(function (lines, path) {
        return lines.concat(path.curves);
      }, []), shape.holes.reduce(function (lines, hole) {
        return lines.concat(hole.curves);
      }, []));
    }, []);
    return convertLinesToGeometry(lines);
  }

  var internal$3 = planckCore.Namespace('GeographyBuilder');

  var GeographyBuilder = function () {
    function GeographyBuilder(levels) {
      classCallCheck(this, GeographyBuilder);

      internal$3(this).levels = [].concat(toConsumableArray(levels));
    }

    createClass(GeographyBuilder, [{
      key: 'init',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
          var scope;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  scope = internal$3(this);

                  if (!(typeof data === 'string')) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 4;
                  return planckCore.Request.json(data, { local: true });

                case 4:
                  scope.data = _context.sent;
                  _context.next = 10;
                  break;

                case 7:
                  _context.next = 9;
                  return Promise.resolve(data);

                case 9:
                  scope.data = _context.sent;

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function init(_x2) {
          return _ref.apply(this, arguments);
        }

        return init;
      }()
    }, {
      key: 'property',
      value: function property(name, _ref2) {
        var level = _ref2.level,
            code = _ref2.code,
            projection = _ref2.projection;
        var geometries = this.data.objects.geography.geometries;

        if (level) {
          geometries = geometries.filter(function (geometry) {
            return includesGeometryObject(level, code, geometry);
          });
        }
        var merged = merge(this.data, geometries);
        if (projection) {
          return projection.path[name](merged);
        }
        return d3['geo' + name.charAt().toUpperCase() + name.slice(1)](merged);
      }
    }, {
      key: 'bounds',
      value: function bounds(options) {
        return this.property('bounds', options);
      }
    }, {
      key: 'area',
      value: function area(options) {
        return this.property('area', options);
      }
    }, {
      key: 'centroid',
      value: function centroid(options) {
        return this.property('centroid', options);
      }
    }, {
      key: 'poleOfInaccessibility',
      value: function poleOfInaccessibility(_ref3) {
        var level = _ref3.level,
            code = _ref3.code,
            projection = _ref3.projection,
            _ref3$precision = _ref3.precision,
            precision = _ref3$precision === undefined ? 0.01 : _ref3$precision;
        var geometries = this.data.objects.geography.geometries;

        if (level) {
          geometries = geometries.filter(function (geometry) {
            return includesGeometryObject(level, code, geometry);
          });
        }
        geometries = merge(this.data, geometries);
        if (projection) {
          var _polygon = planckCore.Array.max(geometries.coordinates, function (polygon) {
            return projection.path.area({
              type: 'Polygon',
              coordinates: polygon
            });
          });
          if (!_polygon) {
            console.warn('Unable to derive pole of inaccessibility:', level, code);
            return null;
          }
          var svg = projection.path({
            type: 'Polygon',
            coordinates: _polygon
          });
          if (!svg) {
            console.warn('Unable to derive pole of inaccessibility:', level, code);
            return null;
          }
          var path = Path.parse(svg, true);
          if (!path) {
            console.warn('Unable to derive pole of inaccessibility:', level, code);
            return null;
          }
          var paths = void 0;
          if (path instanceof Three.Shape) {
            paths = path.curves;
          } else {
            paths = [path];
          }
          var projected = paths.map(function (path) {
            return path.curves.map(function (curve) {
              return [curve.v1.x, curve.v1.y];
            });
          });
          return polylabel_1(projected, Math.sqrt(projection.path.area({
            type: 'Polygon',
            coordinates: _polygon
          })) * precision);
        }
        var polygon = planckCore.Array.max(geometries.coordinates, function (polygon) {
          return d3.geoArea({
            type: 'Polygon',
            coordinates: polygon
          });
        });
        if (!polygon) {
          console.warn('Unable to derive pole of inaccessibility:', level, code);
          return null;
        }
        return polylabel_1(polygon, Math.sqrt(d3.geoArea({
          type: 'Polygon',
          coordinates: polygon
        })) * precision);
      }
    }, {
      key: 'shapes',
      value: function shapes(_ref4) {
        var geometries = _ref4.geometries,
            projection = _ref4.projection;
        var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var feature$$1 = merge(this.data, geometries);
        return convertPolygonsToShapes(feature$$1, projection, errors);
      }
    }, {
      key: 'shapeGeometry',
      value: function shapeGeometry(_ref5) {
        var geometries = _ref5.geometries,
            projection = _ref5.projection;
        var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var feature$$1 = merge(this.data, geometries);
        var shapes = convertPolygonsToShapes(feature$$1, projection, errors);
        return convertShapesToMeshGeometry(shapes);
      }
    }, {
      key: 'outlineGeometry',
      value: function outlineGeometry(_ref6) {
        var geometries = _ref6.geometries,
            projection = _ref6.projection;
        var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var feature$$1 = merge(this.data, geometries);
        var shapes = convertPolygonsToShapes(feature$$1, projection, errors);
        return convertShapesToLineSegmentGeometry(shapes);
      }
    }, {
      key: 'borderGeometry',
      value: function borderGeometry(_ref7) {
        var object = _ref7.object,
            filter$$1 = _ref7.filter,
            projection = _ref7.projection;
        var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var feature$$1 = mesh(this.data, object, filter$$1);
        var svg = projection.path(feature$$1);
        if (!svg) {
          errors.push(0);
          return convertLinesToGeometry([]);
        }
        var path = Path.parse(svg, true);
        var lines = void 0;
        if (path instanceof Three.Shape) {
          lines = path.curves.reduce(function (lines, path) {
            return lines.concat(path.curves);
          }, []);
        } else {
          lines = path.curves;
        }
        return convertLinesToGeometry(lines);
      }
    }, {
      key: 'geographyShapes',
      value: function geographyShapes(_ref8) {
        var projection = _ref8.projection;
        var geometries = this.data.objects.geography.geometries;

        var errors = [];
        var result = this.shapes({
          projection: projection,
          geometries: geometries
        }, errors);
        if (errors.length !== 0) {
          console.warn('Unable to project ' + errors.length + ' polygons');
        }
        return result;
      }
    }, {
      key: 'geographyShapeGeometry',
      value: function geographyShapeGeometry(_ref9) {
        var projection = _ref9.projection;
        var geometries = this.data.objects.geography.geometries;

        var errors = [];
        var result = this.shapeGeometry({
          projection: projection,
          geometries: geometries
        }, errors);
        if (errors.length !== 0) {
          console.warn('Unable to project ' + errors.length + ' polygons');
        }
        return result;
      }
    }, {
      key: 'geographyOutlineGeometry',
      value: function geographyOutlineGeometry(_ref10) {
        var projection = _ref10.projection;
        var geometries = this.data.objects.geography.geometries;

        var errors = [];
        var result = this.outlineGeometry({
          projection: projection,
          geometries: geometries
        }, errors);
        if (errors.length !== 0) {
          console.warn('Unable to project ' + errors.length + ' polygons');
        }
        return result;
      }
    }, {
      key: 'geographySubdivisionGeometry',
      value: function geographySubdivisionGeometry(_ref11) {
        var projection = _ref11.projection;

        var key = codePropertyKeyForLevel(this.levels[0]);
        var errors = [];
        var result = this.borderGeometry({
          projection: projection,
          object: this.data.objects.geography,
          filter: function filter$$1(a, b) {
            return a.properties[key] !== b.properties[key];
          }
        }, errors);
        if (errors.length !== 0) {
          // Topology mesh can fail if a division doesn't have any adjacent
          // division. Just return an empty geometry without logging warning.
          return new Three.BufferGeometry();
        }
        return result;
      }
    }, {
      key: 'divisionShapes',
      value: function divisionShapes(_ref12) {
        var level = _ref12.level,
            code = _ref12.code,
            projection = _ref12.projection;
        var geometries = this.data.objects.geography.geometries;

        var errors = [];
        var result = this.shapes({
          projection: projection,
          geometries: geometries.filter(function (geometry) {
            return includesGeometryObject(level, code, geometry);
          })
        }, errors);
        if (errors.length !== 0) {
          console.warn(errors.length + ' polygons failed to project');
        }
        return result;
      }
    }, {
      key: 'divisionShapeGeometry',
      value: function divisionShapeGeometry(_ref13) {
        var level = _ref13.level,
            code = _ref13.code,
            projection = _ref13.projection;
        var geometries = this.data.objects.geography.geometries;

        var errors = [];
        var result = this.shapeGeometry({
          projection: projection,
          geometries: geometries.filter(function (geometry) {
            return includesGeometryObject(level, code, geometry);
          })
        }, errors);
        if (errors.length !== 0) {
          console.warn('Unable to project ' + errors.length + ' polygons:', level, code);
        }
        return result;
      }
    }, {
      key: 'divisionOutlineGeometry',
      value: function divisionOutlineGeometry(_ref14) {
        var level = _ref14.level,
            code = _ref14.code,
            projection = _ref14.projection;
        var geometries = this.data.objects.geography.geometries;

        var errors = [];
        var result = this.outlineGeometry({
          projection: projection,
          geometries: geometries.filter(function (geometry) {
            return includesGeometryObject(level, code, geometry);
          })
        }, errors);
        if (errors.length !== 0) {
          console.warn('Unable to project ' + errors.length + ' polygons:', level, code);
        }
        return result;
      }
    }, {
      key: 'divisionBorderGeometry',
      value: function divisionBorderGeometry(_ref15) {
        var _this = this;

        var level = _ref15.level,
            code = _ref15.code,
            projection = _ref15.projection;

        var superlevel = function () {
          var index = _this.levels.indexOf(level);
          if (index === -1) {
            throw new Error('Could not find level "' + level + '" in geography');
          } else if (index > 0) {
            return _this.levels[index - 1];
          }
          return undefined;
        }();

        // Reduce geometries to find neighbors if superlevel exists
        var geometries = this.data.objects.geography.geometries;

        if (superlevel) {
          geometries = geometries.filter(function (geometry) {
            return includesGeometryObject(superlevel, code, geometry);
          });
        }

        // Remember the indices of geometries in this division
        var indices = geometries.filter(function (geometry) {
          return includesGeometryObject(level, code, geometry);
        }).map(function (geometry) {
          return geometries.indexOf(geometry);
        });

        // Construct object with adjacent geometries
        var neighbors$$1 = neighbors(geometries);
        var object = {
          type: 'GeometryCollection',
          geometries: geometries.filter(function (geometry, index) {
            return indices.includes(index) || indices.some(function (other) {
              return neighbors$$1[other].includes(index);
            });
          })
        };

        var key = codePropertyKeyForLevel(level);
        var errors = [];
        var result = this.borderGeometry({
          projection: projection,
          object: object,
          filter: function filter$$1(a, b) {
            if (a.properties[key] === code) {
              return a.properties[key] < b.properties[key];
            }
            return a.properties[key] > b.properties[key];
          }
        }, errors);
        if (errors.length !== 0) {
          // Topology mesh can fail if a division doesn't have any adjacent
          // division. Just return an empty geometry without logging warning.
          return new Three.BufferGeometry();
        }
        return result;
      }
    }, {
      key: 'divisionSubdivisionGeometry',
      value: function divisionSubdivisionGeometry(_ref16) {
        var level = _ref16.level,
            code = _ref16.code,
            projection = _ref16.projection;
        var geometries = this.data.objects.geography.geometries;

        var object = {
          type: 'GeometryCollection',
          geometries: geometries.filter(function (geometry) {
            return includesGeometryObject(level, code, geometry);
          })
        };
        var errors = [];
        var result = this.borderGeometry({
          projection: projection,
          object: object,
          filter: function filter$$1(a, b) {
            return a !== b;
          }
        }, errors);
        if (errors.length !== 0) {
          // Topology mesh can fail if a division doesn't have any adjacent
          // division. Just return an empty geometry without logging warning.
          return new Three.BufferGeometry();
        }
        return result;
      }
    }, {
      key: 'levels',
      get: function get$$1() {
        return [].concat(toConsumableArray(internal$3(this).levels));
      }
    }, {
      key: 'data',
      get: function get$$1() {
        return internal$3(this).data;
      }
    }]);
    return GeographyBuilder;
  }();

  // The MIT License

  var JapanGeography = function (_Geography) {
    inherits(JapanGeography, _Geography);

    function JapanGeography() {
      classCallCheck(this, JapanGeography);
      return possibleConstructorReturn(this, (JapanGeography.__proto__ || Object.getPrototypeOf(JapanGeography)).call(this, 'japan', [new DivisionLevel('prefecture'), new DivisionLevel('municipality', {
        coerce: function coerce(code) {
          return parseInt(code, 10);
        },
        super: function _super(code) {
          return parseInt(('' + code).slice(0, -3), 10);
        }
      })]));
    }

    return JapanGeography;
  }(Geography);

  // The MIT License

  function modulo(numerator, denominator) {
    return {
      quotient: Math.floor(numerator / denominator),
      remainder: numerator % denominator
    };
  }

  function decompose(value) {
    var integral = Math.floor(value);
    return {
      integral: integral,
      fractional: value - integral
    };
  }

  var pointToCodeConverters = {
    primary: function primary(point) {
      var value = modulo(point[1] * 60, 40);
      var p = value.quotient;
      value = decompose(point[0] - 100);
      var u = value.integral;
      return p * 100 + u * 1;
    },
    secondary: function secondary(point) {
      var value = modulo(point[1] * 60, 40);
      var p = value.quotient;
      value = modulo(value.remainder, 5);
      var q = value.quotient;
      value = decompose(point[0] - 100);
      var u = value.integral;
      value = modulo(value.fractional * 60, 7.5);
      var v = value.quotient;
      return p * 10000 + u * 100 + q * 10 + v * 1;
    },
    basic: function basic(point) {
      var value = modulo(point[1] * 60, 40);
      var p = value.quotient;
      value = modulo(value.remainder, 5);
      var q = value.quotient;
      value = modulo(value.remainder * 60, 30);
      var r = value.quotient;
      value = decompose(point[0] - 100);
      var u = value.integral;
      value = modulo(value.fractional * 60, 7.5);
      var v = value.quotient;
      value = modulo(value.remainder * 60, 45);
      var w = value.quotient;
      return p * 1000000 + u * 10000 + q * 1000 + v * 100 + r * 10 + w * 1;
    },
    half: function half(point) {
      var value = modulo(point[1] * 60, 40);
      var p = value.quotient;
      value = modulo(value.remainder, 5);
      var q = value.quotient;
      value = modulo(value.remainder * 60, 30);
      var r = value.quotient;
      value = modulo(value.remainder, 15);
      var s = value.quotient;
      value = decompose(point[0] - 100);
      var u = value.integral;
      value = modulo(value.fractional * 60, 7.5);
      var v = value.quotient;
      value = modulo(value.remainder * 60, 45);
      var w = value.quotient;
      value = modulo(value.remainder, 22.5);
      var x = value.quotient;
      var m = s * 2 + x + 1;
      return p * 10000000 + u * 100000 + q * 10000 + v * 1000 + r * 100 + w * 10 + m * 1;
    },
    quarter: function quarter(point) {
      var value = modulo(point[1] * 60, 40);
      var p = value.quotient;
      value = modulo(value.remainder, 5);
      var q = value.quotient;
      value = modulo(value.remainder * 60, 30);
      var r = value.quotient;
      value = modulo(value.remainder, 15);
      var s = value.quotient;
      value = modulo(value.remainder, 7.5);
      var t = value.quotient;
      value = decompose(point[0] - 100);
      var u = value.integral;
      value = modulo(value.fractional * 60, 7.5);
      var v = value.quotient;
      value = modulo(value.remainder * 60, 45);
      var w = value.quotient;
      value = modulo(value.remainder, 22.5);
      var x = value.quotient;
      value = modulo(value.remainder, 11.25);
      var y = value.quotient;
      var m = s * 2 + x + 1;
      var n = t * 2 + y + 1;
      return p * 100000000 + u * 1000000 + q * 100000 + v * 10000 + r * 1000 + w * 100 + m * 10 + n * 1;
    },
    eighth: function eighth(point) {
      var value = modulo(point[1] * 60, 40);
      var p = value.quotient;
      value = modulo(value.remainder, 5);
      var q = value.quotient;
      value = modulo(value.remainder * 60, 30);
      var r = value.quotient;
      value = modulo(value.remainder, 15);
      var s = value.quotient;
      value = modulo(value.remainder, 7.5);
      var t = value.quotient;
      value = modulo(value.remainder, 3.75);
      var o = value.quotient;
      value = decompose(point[0] - 100);
      var u = value.integral;
      value = modulo(value.fractional * 60, 7.5);
      var v = value.quotient;
      value = modulo(value.remainder * 60, 45);
      var w = value.quotient;
      value = modulo(value.remainder, 22.5);
      var x = value.quotient;
      value = modulo(value.remainder, 11.25);
      var y = value.quotient;
      value = modulo(value.remainder, 5.625);
      var z = value.quotient;
      var m = s * 2 + x + 1;
      var n = t * 2 + y + 1;
      var l = o * 2 + z + 1;
      return p * 1000000000 + u * 10000000 + q * 1000000 + v * 100000 + r * 10000 + w * 1000 + m * 100 + n * 10 + l * 1;
    }
  };

  var codeToPointConverters = {
    primary: function primary(code) {
      var value = modulo(code, 100);
      var p = value.quotient;
      value = modulo(value.remainder, 1);
      var u = value.quotient;
      return [(u + 100) * 3600 / 3600, p * 2400 / 3600];
    },
    secondary: function secondary(code) {
      var value = modulo(code, 10000);
      var p = value.quotient;
      value = modulo(value.remainder, 100);
      var u = value.quotient;
      value = modulo(value.remainder, 10);
      var q = value.quotient;
      value = modulo(value.remainder, 1);
      var v = value.quotient;
      return [((u + 100) * 3600 + v * 450) / 3600, (p * 2400 + q * 300) / 3600];
    },
    basic: function basic(code) {
      var value = modulo(code, 1000000);
      var p = value.quotient;
      value = modulo(value.remainder, 10000);
      var u = value.quotient;
      value = modulo(value.remainder, 1000);
      var q = value.quotient;
      value = modulo(value.remainder, 100);
      var v = value.quotient;
      value = modulo(value.remainder, 10);
      var r = value.quotient;
      value = modulo(value.remainder, 1);
      var w = value.quotient;
      return [((u + 100) * 3600 + v * 450 + w * 45) / 3600, (p * 2400 + q * 300 + r * 30) / 3600];
    },
    half: function half(code) {
      var value = modulo(code, 10000000);
      var p = value.quotient;
      value = modulo(value.remainder, 100000);
      var u = value.quotient;
      value = modulo(value.remainder, 10000);
      var q = value.quotient;
      value = modulo(value.remainder, 1000);
      var v = value.quotient;
      value = modulo(value.remainder, 100);
      var r = value.quotient;
      value = modulo(value.remainder, 10);
      var w = value.quotient;
      value = modulo(value.remainder, 1);
      var m = value.quotient;
      var s = m - 1 >> 1;
      var x = m - 1 & 1;
      return [((u + 100) * 3600 + v * 450 + w * 45 + x * 22.5) / 3600, (p * 2400 + q * 300 + r * 30 + s * 15) / 3600];
    },
    quarter: function quarter(code) {
      var value = modulo(code, 100000000);
      var p = value.quotient;
      value = modulo(value.remainder, 1000000);
      var u = value.quotient;
      value = modulo(value.remainder, 100000);
      var q = value.quotient;
      value = modulo(value.remainder, 10000);
      var v = value.quotient;
      value = modulo(value.remainder, 1000);
      var r = value.quotient;
      value = modulo(value.remainder, 100);
      var w = value.quotient;
      value = modulo(value.remainder, 10);
      var m = value.quotient;
      value = modulo(value.remainder, 1);
      var n = value.quotient;
      var s = m - 1 >> 1;
      var x = m - 1 & 1;
      var t = n - 1 >> 1;
      var y = n - 1 & 1;
      return [((u + 100) * 3600 + v * 450 + w * 45 + x * 22.5 + y * 11.25) / 3600, (p * 2400 + q * 300 + r * 30 + s * 15 + t * 7.5) / 3600];
    },
    eighth: function eighth(code) {
      var value = modulo(code, 1000000000);
      var p = value.quotient;
      value = modulo(value.remainder, 10000000);
      var u = value.quotient;
      value = modulo(value.remainder, 1000000);
      var q = value.quotient;
      value = modulo(value.remainder, 100000);
      var v = value.quotient;
      value = modulo(value.remainder, 10000);
      var r = value.quotient;
      value = modulo(value.remainder, 1000);
      var w = value.quotient;
      value = modulo(value.remainder, 100);
      var m = value.quotient;
      value = modulo(value.remainder, 10);
      var n = value.quotient;
      value = modulo(value.remainder, 1);
      var l = value.quotient;
      var s = m - 1 >> 1;
      var x = m - 1 & 1;
      var t = n - 1 >> 1;
      var y = n - 1 & 1;
      var o = l - 1 >> 1;
      var z = l - 1 & 1;
      return [((u + 100) * 3600 + v * 450 + w * 45 + x * 22.5 + y * 11.25 + z * 5.625) / 3600, (p * 2400 + q * 300 + r * 30 + s * 15 + t * 7.5 + o * 3.75) / 3600];
    }
  };

  var internal$4 = planckCore.Namespace('JapanRegionalMesh');

  var JapanRegionalMesh = function () {
    function JapanRegionalMesh(name, size) {
      classCallCheck(this, JapanRegionalMesh);

      var scope = internal$4(this);
      scope.name = name;
      scope.size = [].concat(toConsumableArray(size));
    }

    createClass(JapanRegionalMesh, [{
      key: 'code',
      value: function code(point) {
        return pointToCodeConverters[this.name](point);
      }
    }, {
      key: 'origin',
      value: function origin(code) {
        return codeToPointConverters[this.name](code);
      }
    }, {
      key: 'center',
      value: function center(code) {
        var origin = this.origin(code);
        var size = this.size;

        return [origin[0] + size[0] / 2, origin[1] + size[1] / 2];
      }
    }, {
      key: 'name',
      get: function get$$1() {
        return internal$4(this).name;
      }
    }, {
      key: 'size',
      get: function get$$1() {
        return [].concat(toConsumableArray(internal$4(this).size));
      }
    }]);
    return JapanRegionalMesh;
  }();

  var JapanRegionalMesh$1 = {
    primary: new JapanRegionalMesh('primary', [3600 / 3600, 2400 / 3600]),
    secondary: new JapanRegionalMesh('secondary', [450 / 3600, 300 / 3600]),
    basic: new JapanRegionalMesh('basic', [45 / 3600, 30 / 3600]),
    half: new JapanRegionalMesh('half', [22.5 / 3600, 15 / 3600]),
    quarter: new JapanRegionalMesh('quarter', [11.25 / 3600, 7.5 / 3600]),
    eighth: new JapanRegionalMesh('eighth', [5.625 / 3600, 3.75 / 3600])
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var suncalc = createCommonjsModule(function (module, exports) {
      /*
       (c) 2011-2015, Vladimir Agafonkin
       SunCalc is a JavaScript library for calculating sun/moon position and light phases.
       https://github.com/mourner/suncalc
      */

      (function () {

          // shortcuts for easier to read formulas

          var PI = Math.PI,
              sin = Math.sin,
              cos = Math.cos,
              tan = Math.tan,
              asin = Math.asin,
              atan = Math.atan2,
              acos = Math.acos,
              rad = PI / 180;

          // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


          // date/time constants and conversions

          var dayMs = 1000 * 60 * 60 * 24,
              J1970 = 2440588,
              J2000 = 2451545;

          function toJulian(date) {
              return date.valueOf() / dayMs - 0.5 + J1970;
          }
          function fromJulian(j) {
              return new Date((j + 0.5 - J1970) * dayMs);
          }
          function toDays(date) {
              return toJulian(date) - J2000;
          }

          // general calculations for position

          var e = rad * 23.4397; // obliquity of the Earth

          function rightAscension(l, b) {
              return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
          }
          function declination(l, b) {
              return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
          }

          function azimuth(H, phi, dec) {
              return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
          }
          function altitude(H, phi, dec) {
              return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
          }

          function siderealTime(d, lw) {
              return rad * (280.16 + 360.9856235 * d) - lw;
          }

          function astroRefraction(h) {
              if (h < 0) // the following formula works for positive altitudes only.
                  h = 0; // if h = -0.08901179 a div/0 would occur.

              // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
              // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
              return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
          }

          // general sun calculations

          function solarMeanAnomaly(d) {
              return rad * (357.5291 + 0.98560028 * d);
          }

          function eclipticLongitude(M) {

              var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)),
                  // equation of center
              P = rad * 102.9372; // perihelion of the Earth

              return M + C + P + PI;
          }

          function sunCoords(d) {

              var M = solarMeanAnomaly(d),
                  L = eclipticLongitude(M);

              return {
                  dec: declination(L, 0),
                  ra: rightAscension(L, 0)
              };
          }

          var SunCalc = {};

          // calculates sun position for a given date and latitude/longitude

          SunCalc.getPosition = function (date, lat, lng) {

              var lw = rad * -lng,
                  phi = rad * lat,
                  d = toDays(date),
                  c = sunCoords(d),
                  H = siderealTime(d, lw) - c.ra;

              return {
                  azimuth: azimuth(H, phi, c.dec),
                  altitude: altitude(H, phi, c.dec)
              };
          };

          // sun times configuration (angle, morning name, evening name)

          var times = SunCalc.times = [[-0.833, 'sunrise', 'sunset'], [-0.3, 'sunriseEnd', 'sunsetStart'], [-6, 'dawn', 'dusk'], [-12, 'nauticalDawn', 'nauticalDusk'], [-18, 'nightEnd', 'night'], [6, 'goldenHourEnd', 'goldenHour']];

          // adds a custom time to the times config

          SunCalc.addTime = function (angle, riseName, setName) {
              times.push([angle, riseName, setName]);
          };

          // calculations for sun times

          var J0 = 0.0009;

          function julianCycle(d, lw) {
              return Math.round(d - J0 - lw / (2 * PI));
          }

          function approxTransit(Ht, lw, n) {
              return J0 + (Ht + lw) / (2 * PI) + n;
          }
          function solarTransitJ(ds, M, L) {
              return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
          }

          function hourAngle(h, phi, d) {
              return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
          }

          // returns set time for the given sun altitude
          function getSetJ(h, lw, phi, dec, n, M, L) {

              var w = hourAngle(h, phi, dec),
                  a = approxTransit(w, lw, n);
              return solarTransitJ(a, M, L);
          }

          // calculates sun times for a given date and latitude/longitude

          SunCalc.getTimes = function (date, lat, lng) {

              var lw = rad * -lng,
                  phi = rad * lat,
                  d = toDays(date),
                  n = julianCycle(d, lw),
                  ds = approxTransit(0, lw, n),
                  M = solarMeanAnomaly(ds),
                  L = eclipticLongitude(M),
                  dec = declination(L, 0),
                  Jnoon = solarTransitJ(ds, M, L),
                  i,
                  len,
                  time,
                  Jset,
                  Jrise;

              var result = {
                  solarNoon: fromJulian(Jnoon),
                  nadir: fromJulian(Jnoon - 0.5)
              };

              for (i = 0, len = times.length; i < len; i += 1) {
                  time = times[i];

                  Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
                  Jrise = Jnoon - (Jset - Jnoon);

                  result[time[1]] = fromJulian(Jrise);
                  result[time[2]] = fromJulian(Jset);
              }

              return result;
          };

          // moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

          function moonCoords(d) {
              // geocentric ecliptic coordinates of the moon

              var L = rad * (218.316 + 13.176396 * d),
                  // ecliptic longitude
              M = rad * (134.963 + 13.064993 * d),
                  // mean anomaly
              F = rad * (93.272 + 13.229350 * d),
                  // mean distance

              l = L + rad * 6.289 * sin(M),
                  // longitude
              b = rad * 5.128 * sin(F),
                  // latitude
              dt = 385001 - 20905 * cos(M); // distance to the moon in km

              return {
                  ra: rightAscension(l, b),
                  dec: declination(l, b),
                  dist: dt
              };
          }

          SunCalc.getMoonPosition = function (date, lat, lng) {

              var lw = rad * -lng,
                  phi = rad * lat,
                  d = toDays(date),
                  c = moonCoords(d),
                  H = siderealTime(d, lw) - c.ra,
                  h = altitude(H, phi, c.dec),

              // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
              pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

              h = h + astroRefraction(h); // altitude correction for refraction

              return {
                  azimuth: azimuth(H, phi, c.dec),
                  altitude: h,
                  distance: c.dist,
                  parallacticAngle: pa
              };
          };

          // calculations for illumination parameters of the moon,
          // based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
          // Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

          SunCalc.getMoonIllumination = function (date) {

              var d = toDays(date || new Date()),
                  s = sunCoords(d),
                  m = moonCoords(d),
                  sdist = 149598000,
                  // distance from Earth to Sun in km

              phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
                  inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
                  angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

              return {
                  fraction: (1 + cos(inc)) / 2,
                  phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
                  angle: angle
              };
          };

          function hoursLater(date, h) {
              return new Date(date.valueOf() + h * dayMs / 24);
          }

          // calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

          SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
              var t = new Date(date);
              if (inUTC) t.setUTCHours(0, 0, 0, 0);else t.setHours(0, 0, 0, 0);

              var hc = 0.133 * rad,
                  h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
                  h1,
                  h2,
                  rise,
                  set,
                  a,
                  b,
                  xe,
                  ye,
                  d,
                  roots,
                  x1,
                  x2,
                  dx;

              // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
              for (var i = 1; i <= 24; i += 2) {
                  h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
                  h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

                  a = (h0 + h2) / 2 - h1;
                  b = (h2 - h0) / 2;
                  xe = -b / (2 * a);
                  ye = (a * xe + b) * xe + h1;
                  d = b * b - 4 * a * h1;
                  roots = 0;

                  if (d >= 0) {
                      dx = Math.sqrt(d) / (Math.abs(a) * 2);
                      x1 = xe - dx;
                      x2 = xe + dx;
                      if (Math.abs(x1) <= 1) roots++;
                      if (Math.abs(x2) <= 1) roots++;
                      if (x1 < -1) x1 = x2;
                  }

                  if (roots === 1) {
                      if (h0 < 0) rise = i + x1;else set = i + x1;
                  } else if (roots === 2) {
                      rise = i + (ye < 0 ? x2 : x1);
                      set = i + (ye < 0 ? x1 : x2);
                  }

                  if (rise && set) break;

                  h0 = h2;
              }

              var result = {};

              if (rise) result.rise = hoursLater(t, rise);
              if (set) result.set = hoursLater(t, set);

              if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

              return result;
          };

          // export as Node module / AMD module / browser variable
          module.exports = SunCalc;
      })();
  });

  // The MIT License

  var internal$5 = planckCore.Namespace('Projection');

  var Projection = function () {
    function Projection() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$name = _ref.name,
          name = _ref$name === undefined ? 'Equirectangular' : _ref$name,
          _ref$scale = _ref.scale,
          scale = _ref$scale === undefined ? 10000 : _ref$scale,
          _ref$origin = _ref.origin,
          origin = _ref$origin === undefined ? [0, 0] : _ref$origin,
          _ref$rotates = _ref.rotates,
          rotates = _ref$rotates === undefined ? [true, true] : _ref$rotates;

      classCallCheck(this, Projection);

      var scope = internal$5(this);
      scope.name = name;
      scope.scale = +scale || 1;
      if (Array.isArray(origin)) {
        scope.origin = [+origin[0] || 0, +origin[1] || 0];
      } else {
        scope.origin = [+origin || 0, +origin || 0];
      }
      if (Array.isArray(rotates)) {
        scope.rotates = [!!rotates[0], !!rotates[1]];
      } else {
        scope.rotates = [!!rotates, !!rotates];
      }
      scope.projector = this.projector;
    }

    createClass(Projection, [{
      key: 'project',
      value: function project(point) {
        var flip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var result = internal$5(this).projector(point);
        if (Number.isNaN(result[0]) || Number.isNaN(result[1])) {
          throw new Error('Could not project point [' + point + ']');
        }
        if (flip) {
          // Avoid negating zero
          result[1] = -result[1] || 0;
        }
        return result;
      }
    }, {
      key: 'unproject',
      value: function unproject(point) {
        var flip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var result = internal$5(this).projector.invert([point[0],
        // Avoid negating zero
        flip ? -point[1] || 0 : point[1]]);
        if (Number.isNaN(result[0]) || Number.isNaN(result[1])) {
          throw new Error('Could not unproject point [' + point + ']');
        }
        return result;
      }
    }, {
      key: 'sun',
      value: function sun(time) {
        var origin = this.origin;

        return suncalc.getPosition(time, origin[1], origin[0]);
      }
    }, {
      key: 'moon',
      value: function moon(time) {
        var origin = this.origin;

        return suncalc.getMoonPosition(time, origin[1], origin[0]);
      }
    }, {
      key: 'equals',
      value: function equals(other) {
        return this.name === other.name && this.scale === other.scale && this.origin[0] === other.origin[0] && this.origin[1] === other.origin[1] && this.rotates[0] === other.rotates[0] && this.rotates[1] === other.rotates[1];
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return {
          name: this.name,
          scale: this.scale,
          origin: this.origin,
          rotates: this.rotates
        };
      }
    }, {
      key: 'projector',
      get: function get$$1() {
        var key = 'geo' + this.name;
        var projection = d3[key] || d3GeoProjection[key];
        if (projection == null) {
          throw new Error('Could not find projection for name "' + this.name + '"');
        }
        var projector = projection();
        if (typeof projector.rotate === 'function') {
          var rotation = [0, 0, 0];
          if (this.rotates[0]) {
            rotation[0] = -this.origin[0];
          }
          if (this.rotates[1]) {
            rotation[1] = -this.origin[1];
          }
          projector.rotate(rotation);
        }
        projector.translate([0, 0]);
        projector.scale(this.scale);
        var offset = projector(this.origin);
        if (Array.isArray(offset)) {
          projector.translate([-offset[0], -offset[1]]);
        }
        return projector;
      }
    }, {
      key: 'path',
      get: function get$$1() {
        return d3.geoPath().projection(internal$5(this).projector);
      }
    }, {
      key: 'name',
      get: function get$$1() {
        return internal$5(this).name;
      }
    }, {
      key: 'scale',
      get: function get$$1() {
        return internal$5(this).scale;
      }
    }, {
      key: 'origin',
      get: function get$$1() {
        return [].concat(toConsumableArray(internal$5(this).origin));
      }
    }, {
      key: 'rotates',
      get: function get$$1() {
        return [].concat(toConsumableArray(internal$5(this).rotates));
      }
    }, {
      key: 'hash',
      get: function get$$1() {
        var scope = internal$5(this);
        if (scope.hash == null) {
          scope.hash = planckCore.Hash(this.toJSON());
        }
        return scope.hash;
      }
    }]);
    return Projection;
  }();

  // The MIT License

  var USGeography = function (_Geography) {
    inherits(USGeography, _Geography);

    function USGeography() {
      classCallCheck(this, USGeography);
      return possibleConstructorReturn(this, (USGeography.__proto__ || Object.getPrototypeOf(USGeography)).call(this, 'us', [new DivisionLevel('state'), new DivisionLevel('county', {
        coerce: function coerce(code) {
          return parseInt(code, 10);
        },
        super: function _super(code) {
          return parseInt(('' + code).slice(0, -3), 10);
        }
      })]));
    }

    return USGeography;
  }(Geography);

  // The MIT License

  var WorldGeography = function (_Geography) {
    inherits(WorldGeography, _Geography);

    function WorldGeography() {
      classCallCheck(this, WorldGeography);
      return possibleConstructorReturn(this, (WorldGeography.__proto__ || Object.getPrototypeOf(WorldGeography)).call(this, 'world', [new DivisionLevel('country')]));
    }

    return WorldGeography;
  }(Geography);

  // The MIT License

  var main = {
    Division: Division,
    DivisionLevel: DivisionLevel,
    Geography: Geography,
    GeographyBuilder: GeographyBuilder,
    GeometryPack: GeometryPack,
    JapanGeography: JapanGeography,
    JapanRegionalMesh: JapanRegionalMesh$1,
    Path: Path,
    Projection: Projection,
    USGeography: USGeography,
    WorldGeography: WorldGeography
  };

  exports.Division = Division;
  exports.DivisionLevel = DivisionLevel;
  exports.Geography = Geography;
  exports.GeographyBuilder = GeographyBuilder;
  exports.GeometryPack = GeometryPack;
  exports.JapanGeography = JapanGeography;
  exports.JapanRegionalMesh = JapanRegionalMesh$1;
  exports.Path = Path;
  exports.Projection = Projection;
  exports.USGeography = USGeography;
  exports.WorldGeography = WorldGeography;
  exports.default = main;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=planck-geography.js.map
