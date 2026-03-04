(function() {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) o(l);
  new MutationObserver((l) => {
    for (const c of l) if (c.type === "childList") for (const d of c.addedNodes) d.tagName === "LINK" && d.rel === "modulepreload" && o(d);
  }).observe(document, { childList: true, subtree: true });
  function s(l) {
    const c = {};
    return l.integrity && (c.integrity = l.integrity), l.referrerPolicy && (c.referrerPolicy = l.referrerPolicy), l.crossOrigin === "use-credentials" ? c.credentials = "include" : l.crossOrigin === "anonymous" ? c.credentials = "omit" : c.credentials = "same-origin", c;
  }
  function o(l) {
    if (l.ep) return;
    l.ep = true;
    const c = s(l);
    fetch(l.href, c);
  }
})();
var vm = { exports: {} }, ms = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var bm;
function gx() {
  if (bm) return ms;
  bm = 1;
  var r = /* @__PURE__ */ Symbol.for("react.transitional.element"), s = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(l, c, d) {
    var p = null;
    if (d !== void 0 && (p = "" + d), c.key !== void 0 && (p = "" + c.key), "key" in c) {
      d = {};
      for (var m in c) m !== "key" && (d[m] = c[m]);
    } else d = c;
    return c = d.ref, { $$typeof: r, type: l, key: p, ref: c !== void 0 ? c : null, props: d };
  }
  return ms.Fragment = s, ms.jsx = o, ms.jsxs = o, ms;
}
var xm;
function yx() {
  return xm || (xm = 1, vm.exports = gx()), vm.exports;
}
var h = yx(), wm = { exports: {} }, ae = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var km;
function vx() {
  if (km) return ae;
  km = 1;
  var r = /* @__PURE__ */ Symbol.for("react.transitional.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), p = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), v = /* @__PURE__ */ Symbol.for("react.suspense"), g = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), x = /* @__PURE__ */ Symbol.for("react.activity"), k = Symbol.iterator;
  function T(N) {
    return N === null || typeof N != "object" ? null : (N = k && N[k] || N["@@iterator"], typeof N == "function" ? N : null);
  }
  var z = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, _ = Object.assign, F = {};
  function O(N, D, q) {
    this.props = N, this.context = D, this.refs = F, this.updater = q || z;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(N, D) {
    if (typeof N != "object" && typeof N != "function" && N != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, N, D, "setState");
  }, O.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function U() {
  }
  U.prototype = O.prototype;
  function B(N, D, q) {
    this.props = N, this.context = D, this.refs = F, this.updater = q || z;
  }
  var X = B.prototype = new U();
  X.constructor = B, _(X, O.prototype), X.isPureReactComponent = true;
  var V = Array.isArray;
  function W() {
  }
  var Q = { H: null, A: null, T: null, S: null }, G = Object.prototype.hasOwnProperty;
  function ne(N, D, q) {
    var Z = q.ref;
    return { $$typeof: r, type: N, key: D, ref: Z !== void 0 ? Z : null, props: q };
  }
  function ve(N, D) {
    return ne(N.type, D, N.props);
  }
  function Ae(N) {
    return typeof N == "object" && N !== null && N.$$typeof === r;
  }
  function Te(N) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(q) {
      return D[q];
    });
  }
  var st = /\/+/g;
  function Xe(N, D) {
    return typeof N == "object" && N !== null && N.key != null ? Te("" + N.key) : D.toString(36);
  }
  function ft(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then(W, W) : (N.status = "pending", N.then(function(D) {
          N.status === "pending" && (N.status = "fulfilled", N.value = D);
        }, function(D) {
          N.status === "pending" && (N.status = "rejected", N.reason = D);
        })), N.status) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function L(N, D, q, Z, se) {
    var le = typeof N;
    (le === "undefined" || le === "boolean") && (N = null);
    var we = false;
    if (N === null) we = true;
    else switch (le) {
      case "bigint":
      case "string":
      case "number":
        we = true;
        break;
      case "object":
        switch (N.$$typeof) {
          case r:
          case s:
            we = true;
            break;
          case b:
            return we = N._init, L(we(N._payload), D, q, Z, se);
        }
    }
    if (we) return se = se(N), we = Z === "" ? "." + Xe(N, 0) : Z, V(se) ? (q = "", we != null && (q = we.replace(st, "$&/") + "/"), L(se, D, q, "", function(ka) {
      return ka;
    })) : se != null && (Ae(se) && (se = ve(se, q + (se.key == null || N && N.key === se.key ? "" : ("" + se.key).replace(st, "$&/") + "/") + we)), D.push(se)), 1;
    we = 0;
    var lt = Z === "" ? "." : Z + ":";
    if (V(N)) for (var _e = 0; _e < N.length; _e++) Z = N[_e], le = lt + Xe(Z, _e), we += L(Z, D, q, le, se);
    else if (_e = T(N), typeof _e == "function") for (N = _e.call(N), _e = 0; !(Z = N.next()).done; ) Z = Z.value, le = lt + Xe(Z, _e++), we += L(Z, D, q, le, se);
    else if (le === "object") {
      if (typeof N.then == "function") return L(ft(N), D, q, Z, se);
      throw D = String(N), Error("Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead.");
    }
    return we;
  }
  function $(N, D, q) {
    if (N == null) return N;
    var Z = [], se = 0;
    return L(N, Z, "", "", function(le) {
      return D.call(q, le, se++);
    }), Z;
  }
  function ee(N) {
    if (N._status === -1) {
      var D = N._result;
      D = D(), D.then(function(q) {
        (N._status === 0 || N._status === -1) && (N._status = 1, N._result = q);
      }, function(q) {
        (N._status === 0 || N._status === -1) && (N._status = 2, N._result = q);
      }), N._status === -1 && (N._status = 0, N._result = D);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var he = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N), error: N });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, ke = { map: $, forEach: function(N, D, q) {
    $(N, function() {
      D.apply(this, arguments);
    }, q);
  }, count: function(N) {
    var D = 0;
    return $(N, function() {
      D++;
    }), D;
  }, toArray: function(N) {
    return $(N, function(D) {
      return D;
    }) || [];
  }, only: function(N) {
    if (!Ae(N)) throw Error("React.Children.only expected to receive a single React element child.");
    return N;
  } };
  return ae.Activity = x, ae.Children = ke, ae.Component = O, ae.Fragment = o, ae.Profiler = c, ae.PureComponent = B, ae.StrictMode = l, ae.Suspense = v, ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, ae.__COMPILER_RUNTIME = { __proto__: null, c: function(N) {
    return Q.H.useMemoCache(N);
  } }, ae.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, ae.cacheSignal = function() {
    return null;
  }, ae.cloneElement = function(N, D, q) {
    if (N == null) throw Error("The argument must be a React element, but you passed " + N + ".");
    var Z = _({}, N.props), se = N.key;
    if (D != null) for (le in D.key !== void 0 && (se = "" + D.key), D) !G.call(D, le) || le === "key" || le === "__self" || le === "__source" || le === "ref" && D.ref === void 0 || (Z[le] = D[le]);
    var le = arguments.length - 2;
    if (le === 1) Z.children = q;
    else if (1 < le) {
      for (var we = Array(le), lt = 0; lt < le; lt++) we[lt] = arguments[lt + 2];
      Z.children = we;
    }
    return ne(N.type, se, Z);
  }, ae.createContext = function(N) {
    return N = { $$typeof: p, _currentValue: N, _currentValue2: N, _threadCount: 0, Provider: null, Consumer: null }, N.Provider = N, N.Consumer = { $$typeof: d, _context: N }, N;
  }, ae.createElement = function(N, D, q) {
    var Z, se = {}, le = null;
    if (D != null) for (Z in D.key !== void 0 && (le = "" + D.key), D) G.call(D, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (se[Z] = D[Z]);
    var we = arguments.length - 2;
    if (we === 1) se.children = q;
    else if (1 < we) {
      for (var lt = Array(we), _e = 0; _e < we; _e++) lt[_e] = arguments[_e + 2];
      se.children = lt;
    }
    if (N && N.defaultProps) for (Z in we = N.defaultProps, we) se[Z] === void 0 && (se[Z] = we[Z]);
    return ne(N, le, se);
  }, ae.createRef = function() {
    return { current: null };
  }, ae.forwardRef = function(N) {
    return { $$typeof: m, render: N };
  }, ae.isValidElement = Ae, ae.lazy = function(N) {
    return { $$typeof: b, _payload: { _status: -1, _result: N }, _init: ee };
  }, ae.memo = function(N, D) {
    return { $$typeof: g, type: N, compare: D === void 0 ? null : D };
  }, ae.startTransition = function(N) {
    var D = Q.T, q = {};
    Q.T = q;
    try {
      var Z = N(), se = Q.S;
      se !== null && se(q, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(W, he);
    } catch (le) {
      he(le);
    } finally {
      D !== null && q.types !== null && (D.types = q.types), Q.T = D;
    }
  }, ae.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, ae.use = function(N) {
    return Q.H.use(N);
  }, ae.useActionState = function(N, D, q) {
    return Q.H.useActionState(N, D, q);
  }, ae.useCallback = function(N, D) {
    return Q.H.useCallback(N, D);
  }, ae.useContext = function(N) {
    return Q.H.useContext(N);
  }, ae.useDebugValue = function() {
  }, ae.useDeferredValue = function(N, D) {
    return Q.H.useDeferredValue(N, D);
  }, ae.useEffect = function(N, D) {
    return Q.H.useEffect(N, D);
  }, ae.useEffectEvent = function(N) {
    return Q.H.useEffectEvent(N);
  }, ae.useId = function() {
    return Q.H.useId();
  }, ae.useImperativeHandle = function(N, D, q) {
    return Q.H.useImperativeHandle(N, D, q);
  }, ae.useInsertionEffect = function(N, D) {
    return Q.H.useInsertionEffect(N, D);
  }, ae.useLayoutEffect = function(N, D) {
    return Q.H.useLayoutEffect(N, D);
  }, ae.useMemo = function(N, D) {
    return Q.H.useMemo(N, D);
  }, ae.useOptimistic = function(N, D) {
    return Q.H.useOptimistic(N, D);
  }, ae.useReducer = function(N, D, q) {
    return Q.H.useReducer(N, D, q);
  }, ae.useRef = function(N) {
    return Q.H.useRef(N);
  }, ae.useState = function(N) {
    return Q.H.useState(N);
  }, ae.useSyncExternalStore = function(N, D, q) {
    return Q.H.useSyncExternalStore(N, D, q);
  }, ae.useTransition = function() {
    return Q.H.useTransition();
  }, ae.version = "19.2.4", ae;
}
var Sm;
function Hu() {
  return Sm || (Sm = 1, wm.exports = vx()), wm.exports;
}
var H = Hu(), $u = { exports: {} }, gs = {}, Nm = { exports: {} }, Cm = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Pm;
function bx() {
  return Pm || (Pm = 1, (function(r) {
    function s(L, $) {
      var ee = L.length;
      L.push($);
      e: for (; 0 < ee; ) {
        var he = ee - 1 >>> 1, ke = L[he];
        if (0 < c(ke, $)) L[he] = $, L[ee] = ke, ee = he;
        else break e;
      }
    }
    function o(L) {
      return L.length === 0 ? null : L[0];
    }
    function l(L) {
      if (L.length === 0) return null;
      var $ = L[0], ee = L.pop();
      if (ee !== $) {
        L[0] = ee;
        e: for (var he = 0, ke = L.length, N = ke >>> 1; he < N; ) {
          var D = 2 * (he + 1) - 1, q = L[D], Z = D + 1, se = L[Z];
          if (0 > c(q, ee)) Z < ke && 0 > c(se, q) ? (L[he] = se, L[Z] = ee, he = Z) : (L[he] = q, L[D] = ee, he = D);
          else if (Z < ke && 0 > c(se, ee)) L[he] = se, L[Z] = ee, he = Z;
          else break e;
        }
      }
      return $;
    }
    function c(L, $) {
      var ee = L.sortIndex - $.sortIndex;
      return ee !== 0 ? ee : L.id - $.id;
    }
    if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      r.unstable_now = function() {
        return d.now();
      };
    } else {
      var p = Date, m = p.now();
      r.unstable_now = function() {
        return p.now() - m;
      };
    }
    var v = [], g = [], b = 1, x = null, k = 3, T = false, z = false, _ = false, F = false, O = typeof setTimeout == "function" ? setTimeout : null, U = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate < "u" ? setImmediate : null;
    function X(L) {
      for (var $ = o(g); $ !== null; ) {
        if ($.callback === null) l(g);
        else if ($.startTime <= L) l(g), $.sortIndex = $.expirationTime, s(v, $);
        else break;
        $ = o(g);
      }
    }
    function V(L) {
      if (_ = false, X(L), !z) if (o(v) !== null) z = true, W || (W = true, Te());
      else {
        var $ = o(g);
        $ !== null && ft(V, $.startTime - L);
      }
    }
    var W = false, Q = -1, G = 5, ne = -1;
    function ve() {
      return F ? true : !(r.unstable_now() - ne < G);
    }
    function Ae() {
      if (F = false, W) {
        var L = r.unstable_now();
        ne = L;
        var $ = true;
        try {
          e: {
            z = false, _ && (_ = false, U(Q), Q = -1), T = true;
            var ee = k;
            try {
              t: {
                for (X(L), x = o(v); x !== null && !(x.expirationTime > L && ve()); ) {
                  var he = x.callback;
                  if (typeof he == "function") {
                    x.callback = null, k = x.priorityLevel;
                    var ke = he(x.expirationTime <= L);
                    if (L = r.unstable_now(), typeof ke == "function") {
                      x.callback = ke, X(L), $ = true;
                      break t;
                    }
                    x === o(v) && l(v), X(L);
                  } else l(v);
                  x = o(v);
                }
                if (x !== null) $ = true;
                else {
                  var N = o(g);
                  N !== null && ft(V, N.startTime - L), $ = false;
                }
              }
              break e;
            } finally {
              x = null, k = ee, T = false;
            }
            $ = void 0;
          }
        } finally {
          $ ? Te() : W = false;
        }
      }
    }
    var Te;
    if (typeof B == "function") Te = function() {
      B(Ae);
    };
    else if (typeof MessageChannel < "u") {
      var st = new MessageChannel(), Xe = st.port2;
      st.port1.onmessage = Ae, Te = function() {
        Xe.postMessage(null);
      };
    } else Te = function() {
      O(Ae, 0);
    };
    function ft(L, $) {
      Q = O(function() {
        L(r.unstable_now());
      }, $);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, r.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : G = 0 < L ? Math.floor(1e3 / L) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return k;
    }, r.unstable_next = function(L) {
      switch (k) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = k;
      }
      var ee = k;
      k = $;
      try {
        return L();
      } finally {
        k = ee;
      }
    }, r.unstable_requestPaint = function() {
      F = true;
    }, r.unstable_runWithPriority = function(L, $) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var ee = k;
      k = L;
      try {
        return $();
      } finally {
        k = ee;
      }
    }, r.unstable_scheduleCallback = function(L, $, ee) {
      var he = r.unstable_now();
      switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? he + ee : he) : ee = he, L) {
        case 1:
          var ke = -1;
          break;
        case 2:
          ke = 250;
          break;
        case 5:
          ke = 1073741823;
          break;
        case 4:
          ke = 1e4;
          break;
        default:
          ke = 5e3;
      }
      return ke = ee + ke, L = { id: b++, callback: $, priorityLevel: L, startTime: ee, expirationTime: ke, sortIndex: -1 }, ee > he ? (L.sortIndex = ee, s(g, L), o(v) === null && L === o(g) && (_ ? (U(Q), Q = -1) : _ = true, ft(V, ee - he))) : (L.sortIndex = ke, s(v, L), z || T || (z = true, W || (W = true, Te()))), L;
    }, r.unstable_shouldYield = ve, r.unstable_wrapCallback = function(L) {
      var $ = k;
      return function() {
        var ee = k;
        k = $;
        try {
          return L.apply(this, arguments);
        } finally {
          k = ee;
        }
      };
    };
  })(Cm)), Cm;
}
var Em;
function xx() {
  return Em || (Em = 1, Nm.exports = bx()), Nm.exports;
}
var qu = { exports: {} }, it = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Tm;
function wx() {
  if (Tm) return it;
  Tm = 1;
  var r = Hu();
  function s(v) {
    var g = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) g += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + v + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var l = { d: { f: o, r: function() {
    throw Error(s(522));
  }, D: o, C: o, L: o, m: o, X: o, S: o, M: o }, p: 0, findDOMNode: null }, c = /* @__PURE__ */ Symbol.for("react.portal");
  function d(v, g, b) {
    var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: c, key: x == null ? null : "" + x, children: v, containerInfo: g, implementation: b };
  }
  var p = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(v, g) {
    if (v === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, it.createPortal = function(v, g) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11) throw Error(s(299));
    return d(v, g, null, b);
  }, it.flushSync = function(v) {
    var g = p.T, b = l.p;
    try {
      if (p.T = null, l.p = 2, v) return v();
    } finally {
      p.T = g, l.p = b, l.d.f();
    }
  }, it.preconnect = function(v, g) {
    typeof v == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, l.d.C(v, g));
  }, it.prefetchDNS = function(v) {
    typeof v == "string" && l.d.D(v);
  }, it.preinit = function(v, g) {
    if (typeof v == "string" && g && typeof g.as == "string") {
      var b = g.as, x = m(b, g.crossOrigin), k = typeof g.integrity == "string" ? g.integrity : void 0, T = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      b === "style" ? l.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, { crossOrigin: x, integrity: k, fetchPriority: T }) : b === "script" && l.d.X(v, { crossOrigin: x, integrity: k, fetchPriority: T, nonce: typeof g.nonce == "string" ? g.nonce : void 0 });
    }
  }, it.preinitModule = function(v, g) {
    if (typeof v == "string") if (typeof g == "object" && g !== null) {
      if (g.as == null || g.as === "script") {
        var b = m(g.as, g.crossOrigin);
        l.d.M(v, { crossOrigin: b, integrity: typeof g.integrity == "string" ? g.integrity : void 0, nonce: typeof g.nonce == "string" ? g.nonce : void 0 });
      }
    } else g == null && l.d.M(v);
  }, it.preload = function(v, g) {
    if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var b = g.as, x = m(b, g.crossOrigin);
      l.d.L(v, b, { crossOrigin: x, integrity: typeof g.integrity == "string" ? g.integrity : void 0, nonce: typeof g.nonce == "string" ? g.nonce : void 0, type: typeof g.type == "string" ? g.type : void 0, fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0, referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0, imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0, imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0, media: typeof g.media == "string" ? g.media : void 0 });
    }
  }, it.preloadModule = function(v, g) {
    if (typeof v == "string") if (g) {
      var b = m(g.as, g.crossOrigin);
      l.d.m(v, { as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0, crossOrigin: b, integrity: typeof g.integrity == "string" ? g.integrity : void 0 });
    } else l.d.m(v);
  }, it.requestFormReset = function(v) {
    l.d.r(v);
  }, it.unstable_batchedUpdates = function(v, g) {
    return v(g);
  }, it.useFormState = function(v, g, b) {
    return p.H.useFormState(v, g, b);
  }, it.useFormStatus = function() {
    return p.H.useHostTransitionStatus();
  }, it.version = "19.2.4", it;
}
var jm;
function kx() {
  if (jm) return qu.exports;
  jm = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
    } catch (s) {
      console.error(s);
    }
  }
  return r(), qu.exports = wx(), qu.exports;
}
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Lm;
function Sx() {
  if (Lm) return gs;
  Lm = 1;
  var r = xx(), s = Hu(), o = kx();
  function l(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function p(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (d(e) !== e) throw Error(l(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var u = i.alternate;
      if (u === null) {
        if (a = i.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (i.child === u.child) {
        for (u = i.child; u; ) {
          if (u === n) return v(i), e;
          if (u === a) return v(i), t;
          u = u.sibling;
        }
        throw Error(l(188));
      }
      if (n.return !== a.return) n = i, a = u;
      else {
        for (var f = false, y = i.child; y; ) {
          if (y === n) {
            f = true, n = i, a = u;
            break;
          }
          if (y === a) {
            f = true, a = i, n = u;
            break;
          }
          y = y.sibling;
        }
        if (!f) {
          for (y = u.child; y; ) {
            if (y === n) {
              f = true, n = u, a = i;
              break;
            }
            if (y === a) {
              f = true, a = u, n = i;
              break;
            }
            y = y.sibling;
          }
          if (!f) throw Error(l(189));
        }
      }
      if (n.alternate !== a) throw Error(l(190));
    }
    if (n.tag !== 3) throw Error(l(188));
    return n.stateNode.current === n ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var x = Object.assign, k = /* @__PURE__ */ Symbol.for("react.element"), T = /* @__PURE__ */ Symbol.for("react.transitional.element"), z = /* @__PURE__ */ Symbol.for("react.portal"), _ = /* @__PURE__ */ Symbol.for("react.fragment"), F = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), U = /* @__PURE__ */ Symbol.for("react.consumer"), B = /* @__PURE__ */ Symbol.for("react.context"), X = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), W = /* @__PURE__ */ Symbol.for("react.suspense_list"), Q = /* @__PURE__ */ Symbol.for("react.memo"), G = /* @__PURE__ */ Symbol.for("react.lazy"), ne = /* @__PURE__ */ Symbol.for("react.activity"), ve = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ae = Symbol.iterator;
  function Te(e) {
    return e === null || typeof e != "object" ? null : (e = Ae && e[Ae] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var st = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Xe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === st ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case _:
        return "Fragment";
      case O:
        return "Profiler";
      case F:
        return "StrictMode";
      case V:
        return "Suspense";
      case W:
        return "SuspenseList";
      case ne:
        return "Activity";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case z:
        return "Portal";
      case B:
        return e.displayName || "Context";
      case U:
        return (e._context.displayName || "Context") + ".Consumer";
      case X:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Q:
        return t = e.displayName || null, t !== null ? t : Xe(e.type) || "Memo";
      case G:
        t = e._payload, e = e._init;
        try {
          return Xe(e(t));
        } catch {
        }
    }
    return null;
  }
  var ft = Array.isArray, L = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = { pending: false, data: null, method: null, action: null }, he = [], ke = -1;
  function N(e) {
    return { current: e };
  }
  function D(e) {
    0 > ke || (e.current = he[ke], he[ke] = null, ke--);
  }
  function q(e, t) {
    ke++, he[ke] = e.current, e.current = t;
  }
  var Z = N(null), se = N(null), le = N(null), we = N(null);
  function lt(e, t) {
    switch (q(le, t), q(se, e), q(Z, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Bp(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI) t = Bp(t), e = Up(t, e);
        else switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
    }
    D(Z), q(Z, e);
  }
  function _e() {
    D(Z), D(se), D(le);
  }
  function ka(e) {
    e.memoizedState !== null && q(we, e);
    var t = Z.current, n = Up(t, e.type);
    t !== n && (q(se, e), q(Z, n));
  }
  function Ms(e) {
    se.current === e && (D(Z), D(se)), we.current === e && (D(we), ds._currentValue = ee);
  }
  var Co, gd;
  function nr(e) {
    if (Co === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Co = t && t[1] || "", gd = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + Co + e + gd;
  }
  var Po = false;
  function Eo(e, t) {
    if (!e || Po) return "";
    Po = true;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var I = function() {
              throw Error();
            };
            if (Object.defineProperty(I.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(I, []);
              } catch (A) {
                var j = A;
              }
              Reflect.construct(e, [], I);
            } else {
              try {
                I.call();
              } catch (A) {
                j = A;
              }
              e.call(I.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (A) {
              j = A;
            }
            (I = e()) && typeof I.catch == "function" && I.catch(function() {
            });
          }
        } catch (A) {
          if (A && j && typeof A.stack == "string") return [A.stack, j.stack];
        }
        return [null, null];
      } };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      i && i.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var u = a.DetermineComponentFrameRoot(), f = u[0], y = u[1];
      if (f && y) {
        var w = f.split(`
`), E = y.split(`
`);
        for (i = a = 0; a < w.length && !w[a].includes("DetermineComponentFrameRoot"); ) a++;
        for (; i < E.length && !E[i].includes("DetermineComponentFrameRoot"); ) i++;
        if (a === w.length || i === E.length) for (a = w.length - 1, i = E.length - 1; 1 <= a && 0 <= i && w[a] !== E[i]; ) i--;
        for (; 1 <= a && 0 <= i; a--, i--) if (w[a] !== E[i]) {
          if (a !== 1 || i !== 1) do
            if (a--, i--, 0 > i || w[a] !== E[i]) {
              var R = `
` + w[a].replace(" at new ", " at ");
              return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), R;
            }
          while (1 <= a && 0 <= i);
          break;
        }
      }
    } finally {
      Po = false, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? nr(n) : "";
  }
  function Wv(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return nr(e.type);
      case 16:
        return nr("Lazy");
      case 13:
        return e.child !== t && t !== null ? nr("Suspense Fallback") : nr("Suspense");
      case 19:
        return nr("SuspenseList");
      case 0:
      case 15:
        return Eo(e.type, false);
      case 11:
        return Eo(e.type.render, false);
      case 1:
        return Eo(e.type, true);
      case 31:
        return nr("Activity");
      default:
        return "";
    }
  }
  function yd(e) {
    try {
      var t = "", n = null;
      do
        t += Wv(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var To = Object.prototype.hasOwnProperty, jo = r.unstable_scheduleCallback, Lo = r.unstable_cancelCallback, Qv = r.unstable_shouldYield, Kv = r.unstable_requestPaint, xt = r.unstable_now, Xv = r.unstable_getCurrentPriorityLevel, vd = r.unstable_ImmediatePriority, bd = r.unstable_UserBlockingPriority, Is = r.unstable_NormalPriority, Yv = r.unstable_LowPriority, xd = r.unstable_IdlePriority, Zv = r.log, Jv = r.unstable_setDisableYieldValue, Sa = null, wt = null;
  function Pn(e) {
    if (typeof Zv == "function" && Jv(e), wt && typeof wt.setStrictMode == "function") try {
      wt.setStrictMode(Sa, e);
    } catch {
    }
  }
  var kt = Math.clz32 ? Math.clz32 : n0, e0 = Math.log, t0 = Math.LN2;
  function n0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (e0(e) / t0 | 0) | 0;
  }
  var zs = 256, Os = 262144, Fs = 4194304;
  function rr(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Ds(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var i = 0, u = e.suspendedLanes, f = e.pingedLanes;
    e = e.warmLanes;
    var y = a & 134217727;
    return y !== 0 ? (a = y & ~u, a !== 0 ? i = rr(a) : (f &= y, f !== 0 ? i = rr(f) : n || (n = y & ~e, n !== 0 && (i = rr(n))))) : (y = a & ~u, y !== 0 ? i = rr(y) : f !== 0 ? i = rr(f) : n || (n = a & ~e, n !== 0 && (i = rr(n)))), i === 0 ? 0 : t !== 0 && t !== i && (t & u) === 0 && (u = i & -i, n = t & -t, u >= n || u === 32 && (n & 4194048) !== 0) ? t : i;
  }
  function Na(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function r0(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wd() {
    var e = Fs;
    return Fs <<= 1, (Fs & 62914560) === 0 && (Fs = 4194304), e;
  }
  function Ao(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ca(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function a0(e, t, n, a, i, u) {
    var f = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var y = e.entanglements, w = e.expirationTimes, E = e.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var R = 31 - kt(n), I = 1 << R;
      y[R] = 0, w[R] = -1;
      var j = E[R];
      if (j !== null) for (E[R] = null, R = 0; R < j.length; R++) {
        var A = j[R];
        A !== null && (A.lane &= -536870913);
      }
      n &= ~I;
    }
    a !== 0 && kd(e, a, 0), u !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(f & ~t));
  }
  function kd(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - kt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 261930;
  }
  function Sd(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - kt(n), i = 1 << a;
      i & t | e[a] & t && (e[a] |= t), n &= ~i;
    }
  }
  function Nd(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Ro(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function Ro(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Mo(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Cd() {
    var e = $.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : dm(e.type));
  }
  function Pd(e, t) {
    var n = $.p;
    try {
      return $.p = e, t();
    } finally {
      $.p = n;
    }
  }
  var En = Math.random().toString(36).slice(2), Je = "__reactFiber$" + En, ht = "__reactProps$" + En, Pr = "__reactContainer$" + En, Io = "__reactEvents$" + En, s0 = "__reactListeners$" + En, i0 = "__reactHandles$" + En, Ed = "__reactResources$" + En, Pa = "__reactMarker$" + En;
  function zo(e) {
    delete e[Je], delete e[ht], delete e[Io], delete e[s0], delete e[i0];
  }
  function Er(e) {
    var t = e[Je];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Pr] || n[Je]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Kp(e); e !== null; ) {
          if (n = e[Je]) return n;
          e = Kp(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Tr(e) {
    if (e = e[Je] || e[Pr]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Ea(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(l(33));
  }
  function jr(e) {
    var t = e[Ed];
    return t || (t = e[Ed] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ye(e) {
    e[Pa] = true;
  }
  var Td = /* @__PURE__ */ new Set(), jd = {};
  function ar(e, t) {
    Lr(e, t), Lr(e + "Capture", t);
  }
  function Lr(e, t) {
    for (jd[e] = t, e = 0; e < t.length; e++) Td.add(t[e]);
  }
  var o0 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ld = {}, Ad = {};
  function l0(e) {
    return To.call(Ad, e) ? true : To.call(Ld, e) ? false : o0.test(e) ? Ad[e] = true : (Ld[e] = true, false);
  }
  function _s(e, t, n) {
    if (l0(t)) if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Vs(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function sn(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  function Lt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Rd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function u0(e, t, n) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var i = a.get, u = a.set;
      return Object.defineProperty(e, t, { configurable: true, get: function() {
        return i.call(this);
      }, set: function(f) {
        n = "" + f, u.call(this, f);
      } }), Object.defineProperty(e, t, { enumerable: a.enumerable }), { getValue: function() {
        return n;
      }, setValue: function(f) {
        n = "" + f;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Oo(e) {
    if (!e._valueTracker) {
      var t = Rd(e) ? "checked" : "value";
      e._valueTracker = u0(e, t, "" + e[t]);
    }
  }
  function Md(e) {
    if (!e) return false;
    var t = e._valueTracker;
    if (!t) return true;
    var n = t.getValue(), a = "";
    return e && (a = Rd(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), true) : false;
  }
  function Bs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var c0 = /[\n"\\]/g;
  function Bt(e) {
    return e.replace(c0, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Fo(e, t, n, a, i, u, f, y) {
    e.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Lt(t)) : e.value !== "" + Lt(t) && (e.value = "" + Lt(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"), t != null ? Do(e, f, Lt(t)) : n != null ? Do(e, f, Lt(n)) : a != null && e.removeAttribute("value"), i == null && u != null && (e.defaultChecked = !!u), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.name = "" + Lt(y) : e.removeAttribute("name");
  }
  function Id(e, t, n, a, i, u, f, y) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Oo(e);
        return;
      }
      n = n != null ? "" + Lt(n) : "", t = t != null ? "" + Lt(t) : n, y || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? i, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = y ? e.checked : !!a, e.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f), Oo(e);
  }
  function Do(e, t, n) {
    t === "number" && Bs(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Ar(e, t, n, a) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = true;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && a && (e[n].defaultSelected = true);
    } else {
      for (n = "" + Lt(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = true, a && (e[i].defaultSelected = true);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = true);
    }
  }
  function zd(e, t, n) {
    if (t != null && (t = "" + Lt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Lt(n) : "";
  }
  function Od(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(l(92));
        if (ft(a)) {
          if (1 < a.length) throw Error(l(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = Lt(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a), Oo(e);
  }
  function Rr(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var d0 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Fd(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || d0.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Dd(e, t, n) {
    if (t != null && typeof t != "object") throw Error(l(62));
    if (e = e.style, n != null) {
      for (var a in n) !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var i in t) a = t[i], t.hasOwnProperty(i) && n[i] !== a && Fd(e, i, a);
    } else for (var u in t) t.hasOwnProperty(u) && Fd(e, u, t[u]);
  }
  function _o(e) {
    if (e.indexOf("-") === -1) return false;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var f0 = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), h0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Us(e) {
    return h0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function on() {
  }
  var Vo = null;
  function Bo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Mr = null, Ir = null;
  function _d(e) {
    var t = Tr(e);
    if (t && (e = t.stateNode)) {
      var n = e[ht] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Fo(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll('input[name="' + Bt("" + t) + '"][type="radio"]'), t = 0; t < n.length; t++) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var i = a[ht] || null;
                if (!i) throw Error(l(90));
                Fo(a, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
              }
            }
            for (t = 0; t < n.length; t++) a = n[t], a.form === e.form && Md(a);
          }
          break e;
        case "textarea":
          zd(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Ar(e, !!n.multiple, t, false);
      }
    }
  }
  var Uo = false;
  function Vd(e, t, n) {
    if (Uo) return e(t, n);
    Uo = true;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Uo = false, (Mr !== null || Ir !== null) && (ji(), Mr && (t = Mr, e = Ir, Ir = Mr = null, _d(t), e))) for (t = 0; t < e.length; t++) _d(e[t]);
    }
  }
  function Ta(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[ht] || null;
    if (a === null) return null;
    n = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = false;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(l(231, t, typeof n));
    return n;
  }
  var ln = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ho = false;
  if (ln) try {
    var ja = {};
    Object.defineProperty(ja, "passive", { get: function() {
      Ho = true;
    } }), window.addEventListener("test", ja, ja), window.removeEventListener("test", ja, ja);
  } catch {
    Ho = false;
  }
  var Tn = null, $o = null, Hs = null;
  function Bd() {
    if (Hs) return Hs;
    var e, t = $o, n = t.length, a, i = "value" in Tn ? Tn.value : Tn.textContent, u = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var f = n - e;
    for (a = 1; a <= f && t[n - a] === i[u - a]; a++) ;
    return Hs = i.slice(e, 1 < a ? 1 - a : void 0);
  }
  function $s(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function qs() {
    return true;
  }
  function Ud() {
    return false;
  }
  function pt(e) {
    function t(n, a, i, u, f) {
      this._reactName = n, this._targetInst = i, this.type = a, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (n = e[y], this[y] = n ? n(u) : u[y]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === false) ? qs : Ud, this.isPropagationStopped = Ud, this;
    }
    return x(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = false), this.isDefaultPrevented = qs);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = true), this.isPropagationStopped = qs);
    }, persist: function() {
    }, isPersistent: qs }), t;
  }
  var sr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Gs = pt(sr), La = x({}, sr, { view: 0, detail: 0 }), p0 = pt(La), qo, Go, Aa, Ws = x({}, La, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Qo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Aa && (Aa && e.type === "mousemove" ? (qo = e.screenX - Aa.screenX, Go = e.screenY - Aa.screenY) : Go = qo = 0, Aa = e), qo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Go;
  } }), Hd = pt(Ws), m0 = x({}, Ws, { dataTransfer: 0 }), g0 = pt(m0), y0 = x({}, La, { relatedTarget: 0 }), Wo = pt(y0), v0 = x({}, sr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), b0 = pt(v0), x0 = x({}, sr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), w0 = pt(x0), k0 = x({}, sr, { data: 0 }), $d = pt(k0), S0 = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, N0 = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, C0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function P0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = C0[e]) ? !!t[e] : false;
  }
  function Qo() {
    return P0;
  }
  var E0 = x({}, La, { key: function(e) {
    if (e.key) {
      var t = S0[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = $s(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? N0[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Qo, charCode: function(e) {
    return e.type === "keypress" ? $s(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? $s(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), T0 = pt(E0), j0 = x({}, Ws, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), qd = pt(j0), L0 = x({}, La, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Qo }), A0 = pt(L0), R0 = x({}, sr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), M0 = pt(R0), I0 = x({}, Ws, { deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), z0 = pt(I0), O0 = x({}, sr, { newState: 0, oldState: 0 }), F0 = pt(O0), D0 = [9, 13, 27, 32], Ko = ln && "CompositionEvent" in window, Ra = null;
  ln && "documentMode" in document && (Ra = document.documentMode);
  var _0 = ln && "TextEvent" in window && !Ra, Gd = ln && (!Ko || Ra && 8 < Ra && 11 >= Ra), Wd = " ", Qd = false;
  function Kd(e, t) {
    switch (e) {
      case "keyup":
        return D0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Xd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var zr = false;
  function V0(e, t) {
    switch (e) {
      case "compositionend":
        return Xd(t);
      case "keypress":
        return t.which !== 32 ? null : (Qd = true, Wd);
      case "textInput":
        return e = t.data, e === Wd && Qd ? null : e;
      default:
        return null;
    }
  }
  function B0(e, t) {
    if (zr) return e === "compositionend" || !Ko && Kd(e, t) ? (e = Bd(), Hs = $o = Tn = null, zr = false, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Gd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var U0 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function Yd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!U0[e.type] : t === "textarea";
  }
  function Zd(e, t, n, a) {
    Mr ? Ir ? Ir.push(a) : Ir = [a] : Mr = a, t = Oi(t, "onChange"), 0 < t.length && (n = new Gs("onChange", "change", null, n, a), e.push({ event: n, listeners: t }));
  }
  var Ma = null, Ia = null;
  function H0(e) {
    zp(e, 0);
  }
  function Qs(e) {
    var t = Ea(e);
    if (Md(t)) return e;
  }
  function Jd(e, t) {
    if (e === "change") return t;
  }
  var ef = false;
  if (ln) {
    var Xo;
    if (ln) {
      var Yo = "oninput" in document;
      if (!Yo) {
        var tf = document.createElement("div");
        tf.setAttribute("oninput", "return;"), Yo = typeof tf.oninput == "function";
      }
      Xo = Yo;
    } else Xo = false;
    ef = Xo && (!document.documentMode || 9 < document.documentMode);
  }
  function nf() {
    Ma && (Ma.detachEvent("onpropertychange", rf), Ia = Ma = null);
  }
  function rf(e) {
    if (e.propertyName === "value" && Qs(Ia)) {
      var t = [];
      Zd(t, Ia, e, Bo(e)), Vd(H0, t);
    }
  }
  function $0(e, t, n) {
    e === "focusin" ? (nf(), Ma = t, Ia = n, Ma.attachEvent("onpropertychange", rf)) : e === "focusout" && nf();
  }
  function q0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qs(Ia);
  }
  function G0(e, t) {
    if (e === "click") return Qs(t);
  }
  function W0(e, t) {
    if (e === "input" || e === "change") return Qs(t);
  }
  function Q0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var St = typeof Object.is == "function" ? Object.is : Q0;
  function za(e, t) {
    if (St(e, t)) return true;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return false;
    for (a = 0; a < n.length; a++) {
      var i = n[a];
      if (!To.call(t, i) || !St(e[i], t[i])) return false;
    }
    return true;
  }
  function af(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function sf(e, t) {
    var n = af(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = e + n.textContent.length, e <= t && a >= t) return { node: n, offset: t - e };
        e = a;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = af(n);
    }
  }
  function of(e, t) {
    return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? of(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
  }
  function lf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Bs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = false;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Bs(e.document);
    }
    return t;
  }
  function Zo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var K0 = ln && "documentMode" in document && 11 >= document.documentMode, Or = null, Jo = null, Oa = null, el = false;
  function uf(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    el || Or == null || Or !== Bs(a) || (a = Or, "selectionStart" in a && Zo(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Oa && za(Oa, a) || (Oa = a, a = Oi(Jo, "onSelect"), 0 < a.length && (t = new Gs("onSelect", "select", null, t, n), e.push({ event: t, listeners: a }), t.target = Or)));
  }
  function ir(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Fr = { animationend: ir("Animation", "AnimationEnd"), animationiteration: ir("Animation", "AnimationIteration"), animationstart: ir("Animation", "AnimationStart"), transitionrun: ir("Transition", "TransitionRun"), transitionstart: ir("Transition", "TransitionStart"), transitioncancel: ir("Transition", "TransitionCancel"), transitionend: ir("Transition", "TransitionEnd") }, tl = {}, cf = {};
  ln && (cf = document.createElement("div").style, "AnimationEvent" in window || (delete Fr.animationend.animation, delete Fr.animationiteration.animation, delete Fr.animationstart.animation), "TransitionEvent" in window || delete Fr.transitionend.transition);
  function or(e) {
    if (tl[e]) return tl[e];
    if (!Fr[e]) return e;
    var t = Fr[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in cf) return tl[e] = t[n];
    return e;
  }
  var df = or("animationend"), ff = or("animationiteration"), hf = or("animationstart"), X0 = or("transitionrun"), Y0 = or("transitionstart"), Z0 = or("transitioncancel"), pf = or("transitionend"), mf = /* @__PURE__ */ new Map(), nl = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  nl.push("scrollEnd");
  function Ut(e, t) {
    mf.set(e, t), ar(t, [e]);
  }
  var Ks = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e), error: e });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, At = [], Dr = 0, rl = 0;
  function Xs() {
    for (var e = Dr, t = rl = Dr = 0; t < e; ) {
      var n = At[t];
      At[t++] = null;
      var a = At[t];
      At[t++] = null;
      var i = At[t];
      At[t++] = null;
      var u = At[t];
      if (At[t++] = null, a !== null && i !== null) {
        var f = a.pending;
        f === null ? i.next = i : (i.next = f.next, f.next = i), a.pending = i;
      }
      u !== 0 && gf(n, i, u);
    }
  }
  function Ys(e, t, n, a) {
    At[Dr++] = e, At[Dr++] = t, At[Dr++] = n, At[Dr++] = a, rl |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function al(e, t, n, a) {
    return Ys(e, t, n, a), Zs(e);
  }
  function lr(e, t) {
    return Ys(e, null, null, t), Zs(e);
  }
  function gf(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var i = false, u = e.return; u !== null; ) u.childLanes |= n, a = u.alternate, a !== null && (a.childLanes |= n), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (i = true)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, i && t !== null && (i = 31 - kt(n), e = u.hiddenUpdates, a = e[i], a === null ? e[i] = [t] : a.push(t), t.lane = n | 536870912), u) : null;
  }
  function Zs(e) {
    if (50 < as) throw as = 0, hu = null, Error(l(185));
    for (var t = e.return; t !== null; ) e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var _r = {};
  function J0(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Nt(e, t, n, a) {
    return new J0(e, t, n, a);
  }
  function sl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function un(e, t) {
    var n = e.alternate;
    return n === null ? (n = Nt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function yf(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), e;
  }
  function Js(e, t, n, a, i, u) {
    var f = 0;
    if (a = e, typeof e == "function") sl(e) && (f = 1);
    else if (typeof e == "string") f = ax(e, n, Z.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else e: switch (e) {
      case ne:
        return e = Nt(31, n, t, i), e.elementType = ne, e.lanes = u, e;
      case _:
        return ur(n.children, i, u, t);
      case F:
        f = 8, i |= 24;
        break;
      case O:
        return e = Nt(12, n, t, i | 2), e.elementType = O, e.lanes = u, e;
      case V:
        return e = Nt(13, n, t, i), e.elementType = V, e.lanes = u, e;
      case W:
        return e = Nt(19, n, t, i), e.elementType = W, e.lanes = u, e;
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case B:
            f = 10;
            break e;
          case U:
            f = 9;
            break e;
          case X:
            f = 11;
            break e;
          case Q:
            f = 14;
            break e;
          case G:
            f = 16, a = null;
            break e;
        }
        f = 29, n = Error(l(130, e === null ? "null" : typeof e, "")), a = null;
    }
    return t = Nt(f, n, t, i), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function ur(e, t, n, a) {
    return e = Nt(7, e, a, t), e.lanes = n, e;
  }
  function il(e, t, n) {
    return e = Nt(6, e, null, t), e.lanes = n, e;
  }
  function vf(e) {
    var t = Nt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ol(e, t, n) {
    return t = Nt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  var bf = /* @__PURE__ */ new WeakMap();
  function Rt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = bf.get(e);
      return n !== void 0 ? n : (t = { value: e, source: t, stack: yd(t) }, bf.set(e, t), t);
    }
    return { value: e, source: t, stack: yd(t) };
  }
  var Vr = [], Br = 0, ei = null, Fa = 0, Mt = [], It = 0, jn = null, Yt = 1, Zt = "";
  function cn(e, t) {
    Vr[Br++] = Fa, Vr[Br++] = ei, ei = e, Fa = t;
  }
  function xf(e, t, n) {
    Mt[It++] = Yt, Mt[It++] = Zt, Mt[It++] = jn, jn = e;
    var a = Yt;
    e = Zt;
    var i = 32 - kt(a) - 1;
    a &= ~(1 << i), n += 1;
    var u = 32 - kt(t) + i;
    if (30 < u) {
      var f = i - i % 5;
      u = (a & (1 << f) - 1).toString(32), a >>= f, i -= f, Yt = 1 << 32 - kt(t) + i | n << i | a, Zt = u + e;
    } else Yt = 1 << u | n << i | a, Zt = e;
  }
  function ll(e) {
    e.return !== null && (cn(e, 1), xf(e, 1, 0));
  }
  function ul(e) {
    for (; e === ei; ) ei = Vr[--Br], Vr[Br] = null, Fa = Vr[--Br], Vr[Br] = null;
    for (; e === jn; ) jn = Mt[--It], Mt[It] = null, Zt = Mt[--It], Mt[It] = null, Yt = Mt[--It], Mt[It] = null;
  }
  function wf(e, t) {
    Mt[It++] = Yt, Mt[It++] = Zt, Mt[It++] = jn, Yt = t.id, Zt = t.overflow, jn = e;
  }
  var et = null, Re = null, pe = false, Ln = null, zt = false, cl = Error(l(519));
  function An(e) {
    var t = Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw Da(Rt(t, e)), cl;
  }
  function kf(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[Je] = e, t[ht] = a, n) {
      case "dialog":
        ce("cancel", t), ce("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ce("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < is.length; n++) ce(is[n], t);
        break;
      case "source":
        ce("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ce("error", t), ce("load", t);
        break;
      case "details":
        ce("toggle", t);
        break;
      case "input":
        ce("invalid", t), Id(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
        break;
      case "select":
        ce("invalid", t);
        break;
      case "textarea":
        ce("invalid", t), Od(t, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === true || _p(t.textContent, n) ? (a.popover != null && (ce("beforetoggle", t), ce("toggle", t)), a.onScroll != null && ce("scroll", t), a.onScrollEnd != null && ce("scrollend", t), a.onClick != null && (t.onclick = on), t = true) : t = false, t || An(e, true);
  }
  function Sf(e) {
    for (et = e.return; et; ) switch (et.tag) {
      case 5:
      case 31:
      case 13:
        zt = false;
        return;
      case 27:
      case 3:
        zt = true;
        return;
      default:
        et = et.return;
    }
  }
  function Ur(e) {
    if (e !== et) return false;
    if (!pe) return Sf(e), pe = true, false;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Tu(e.type, e.memoizedProps)), n = !n), n && Re && An(e), Sf(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Re = Qp(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Re = Qp(e);
    } else t === 27 ? (t = Re, qn(e.type) ? (e = Mu, Mu = null, Re = e) : Re = t) : Re = et ? Ot(e.stateNode.nextSibling) : null;
    return true;
  }
  function cr() {
    Re = et = null, pe = false;
  }
  function dl() {
    var e = Ln;
    return e !== null && (vt === null ? vt = e : vt.push.apply(vt, e), Ln = null), e;
  }
  function Da(e) {
    Ln === null ? Ln = [e] : Ln.push(e);
  }
  var fl = N(null), dr = null, dn = null;
  function Rn(e, t, n) {
    q(fl, t._currentValue), t._currentValue = n;
  }
  function fn(e) {
    e._currentValue = fl.current, D(fl);
  }
  function hl(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function pl(e, t, n, a) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var u = i.dependencies;
      if (u !== null) {
        var f = i.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var y = u;
          u = i;
          for (var w = 0; w < t.length; w++) if (y.context === t[w]) {
            u.lanes |= n, y = u.alternate, y !== null && (y.lanes |= n), hl(u.return, n, e), a || (f = null);
            break e;
          }
          u = y.next;
        }
      } else if (i.tag === 18) {
        if (f = i.return, f === null) throw Error(l(341));
        f.lanes |= n, u = f.alternate, u !== null && (u.lanes |= n), hl(f, n, e), f = null;
      } else f = i.child;
      if (f !== null) f.return = i;
      else for (f = i; f !== null; ) {
        if (f === e) {
          f = null;
          break;
        }
        if (i = f.sibling, i !== null) {
          i.return = f.return, f = i;
          break;
        }
        f = f.return;
      }
      i = f;
    }
  }
  function Hr(e, t, n, a) {
    e = null;
    for (var i = t, u = false; i !== null; ) {
      if (!u) {
        if ((i.flags & 524288) !== 0) u = true;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var f = i.alternate;
        if (f === null) throw Error(l(387));
        if (f = f.memoizedProps, f !== null) {
          var y = i.type;
          St(i.pendingProps.value, f.value) || (e !== null ? e.push(y) : e = [y]);
        }
      } else if (i === we.current) {
        if (f = i.alternate, f === null) throw Error(l(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(ds) : e = [ds]);
      }
      i = i.return;
    }
    e !== null && pl(t, e, n, a), t.flags |= 262144;
  }
  function ti(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!St(e.context._currentValue, e.memoizedValue)) return true;
      e = e.next;
    }
    return false;
  }
  function fr(e) {
    dr = e, dn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function tt(e) {
    return Nf(dr, e);
  }
  function ni(e, t) {
    return dr === null && fr(e), Nf(e, t);
  }
  function Nf(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, dn === null) {
      if (e === null) throw Error(l(308));
      dn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else dn = dn.next = t;
    return n;
  }
  var eb = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = { aborted: false, addEventListener: function(n, a) {
      e.push(a);
    } };
    this.abort = function() {
      t.aborted = true, e.forEach(function(n) {
        return n();
      });
    };
  }, tb = r.unstable_scheduleCallback, nb = r.unstable_NormalPriority, He = { $$typeof: B, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function ml() {
    return { controller: new eb(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function _a(e) {
    e.refCount--, e.refCount === 0 && tb(nb, function() {
      e.controller.abort();
    });
  }
  var Va = null, gl = 0, $r = 0, qr = null;
  function rb(e, t) {
    if (Va === null) {
      var n = Va = [];
      gl = 0, $r = bu(), qr = { status: "pending", value: void 0, then: function(a) {
        n.push(a);
      } };
    }
    return gl++, t.then(Cf, Cf), t;
  }
  function Cf() {
    if (--gl === 0 && Va !== null) {
      qr !== null && (qr.status = "fulfilled");
      var e = Va;
      Va = null, $r = 0, qr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ab(e, t) {
    var n = [], a = { status: "pending", value: null, reason: null, then: function(i) {
      n.push(i);
    } };
    return e.then(function() {
      a.status = "fulfilled", a.value = t;
      for (var i = 0; i < n.length; i++) (0, n[i])(t);
    }, function(i) {
      for (a.status = "rejected", a.reason = i, i = 0; i < n.length; i++) (0, n[i])(void 0);
    }), a;
  }
  var Pf = L.S;
  L.S = function(e, t) {
    up = xt(), typeof t == "object" && t !== null && typeof t.then == "function" && rb(e, t), Pf !== null && Pf(e, t);
  };
  var hr = N(null);
  function yl() {
    var e = hr.current;
    return e !== null ? e : je.pooledCache;
  }
  function ri(e, t) {
    t === null ? q(hr, hr.current) : q(hr, t.pool);
  }
  function Ef() {
    var e = yl();
    return e === null ? null : { parent: He._currentValue, pool: e };
  }
  var Gr = Error(l(460)), vl = Error(l(474)), ai = Error(l(542)), si = { then: function() {
  } };
  function Tf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jf(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(on, on), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Af(e), e;
      default:
        if (typeof t.status == "string") t.then(on, on);
        else {
          if (e = je, e !== null && 100 < e.shellSuspendCounter) throw Error(l(482));
          e = t, e.status = "pending", e.then(function(a) {
            if (t.status === "pending") {
              var i = t;
              i.status = "fulfilled", i.value = a;
            }
          }, function(a) {
            if (t.status === "pending") {
              var i = t;
              i.status = "rejected", i.reason = a;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Af(e), e;
        }
        throw mr = t, Gr;
    }
  }
  function pr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (mr = n, Gr) : n;
    }
  }
  var mr = null;
  function Lf() {
    if (mr === null) throw Error(l(459));
    var e = mr;
    return mr = null, e;
  }
  function Af(e) {
    if (e === Gr || e === ai) throw Error(l(483));
  }
  var Wr = null, Ba = 0;
  function ii(e) {
    var t = Ba;
    return Ba += 1, Wr === null && (Wr = []), jf(Wr, e, t);
  }
  function Ua(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function oi(e, t) {
    throw t.$$typeof === k ? Error(l(525)) : (e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
  }
  function Rf(e) {
    function t(C, S) {
      if (e) {
        var P = C.deletions;
        P === null ? (C.deletions = [S], C.flags |= 16) : P.push(S);
      }
    }
    function n(C, S) {
      if (!e) return null;
      for (; S !== null; ) t(C, S), S = S.sibling;
      return null;
    }
    function a(C) {
      for (var S = /* @__PURE__ */ new Map(); C !== null; ) C.key !== null ? S.set(C.key, C) : S.set(C.index, C), C = C.sibling;
      return S;
    }
    function i(C, S) {
      return C = un(C, S), C.index = 0, C.sibling = null, C;
    }
    function u(C, S, P) {
      return C.index = P, e ? (P = C.alternate, P !== null ? (P = P.index, P < S ? (C.flags |= 67108866, S) : P) : (C.flags |= 67108866, S)) : (C.flags |= 1048576, S);
    }
    function f(C) {
      return e && C.alternate === null && (C.flags |= 67108866), C;
    }
    function y(C, S, P, M) {
      return S === null || S.tag !== 6 ? (S = il(P, C.mode, M), S.return = C, S) : (S = i(S, P), S.return = C, S);
    }
    function w(C, S, P, M) {
      var te = P.type;
      return te === _ ? R(C, S, P.props.children, M, P.key) : S !== null && (S.elementType === te || typeof te == "object" && te !== null && te.$$typeof === G && pr(te) === S.type) ? (S = i(S, P.props), Ua(S, P), S.return = C, S) : (S = Js(P.type, P.key, P.props, null, C.mode, M), Ua(S, P), S.return = C, S);
    }
    function E(C, S, P, M) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== P.containerInfo || S.stateNode.implementation !== P.implementation ? (S = ol(P, C.mode, M), S.return = C, S) : (S = i(S, P.children || []), S.return = C, S);
    }
    function R(C, S, P, M, te) {
      return S === null || S.tag !== 7 ? (S = ur(P, C.mode, M, te), S.return = C, S) : (S = i(S, P), S.return = C, S);
    }
    function I(C, S, P) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint") return S = il("" + S, C.mode, P), S.return = C, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case T:
            return P = Js(S.type, S.key, S.props, null, C.mode, P), Ua(P, S), P.return = C, P;
          case z:
            return S = ol(S, C.mode, P), S.return = C, S;
          case G:
            return S = pr(S), I(C, S, P);
        }
        if (ft(S) || Te(S)) return S = ur(S, C.mode, P, null), S.return = C, S;
        if (typeof S.then == "function") return I(C, ii(S), P);
        if (S.$$typeof === B) return I(C, ni(C, S), P);
        oi(C, S);
      }
      return null;
    }
    function j(C, S, P, M) {
      var te = S !== null ? S.key : null;
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint") return te !== null ? null : y(C, S, "" + P, M);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case T:
            return P.key === te ? w(C, S, P, M) : null;
          case z:
            return P.key === te ? E(C, S, P, M) : null;
          case G:
            return P = pr(P), j(C, S, P, M);
        }
        if (ft(P) || Te(P)) return te !== null ? null : R(C, S, P, M, null);
        if (typeof P.then == "function") return j(C, S, ii(P), M);
        if (P.$$typeof === B) return j(C, S, ni(C, P), M);
        oi(C, P);
      }
      return null;
    }
    function A(C, S, P, M, te) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint") return C = C.get(P) || null, y(S, C, "" + M, te);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case T:
            return C = C.get(M.key === null ? P : M.key) || null, w(S, C, M, te);
          case z:
            return C = C.get(M.key === null ? P : M.key) || null, E(S, C, M, te);
          case G:
            return M = pr(M), A(C, S, P, M, te);
        }
        if (ft(M) || Te(M)) return C = C.get(P) || null, R(S, C, M, te, null);
        if (typeof M.then == "function") return A(C, S, P, ii(M), te);
        if (M.$$typeof === B) return A(C, S, P, ni(S, M), te);
        oi(S, M);
      }
      return null;
    }
    function K(C, S, P, M) {
      for (var te = null, ge = null, J = S, oe = S = 0, fe = null; J !== null && oe < P.length; oe++) {
        J.index > oe ? (fe = J, J = null) : fe = J.sibling;
        var ye = j(C, J, P[oe], M);
        if (ye === null) {
          J === null && (J = fe);
          break;
        }
        e && J && ye.alternate === null && t(C, J), S = u(ye, S, oe), ge === null ? te = ye : ge.sibling = ye, ge = ye, J = fe;
      }
      if (oe === P.length) return n(C, J), pe && cn(C, oe), te;
      if (J === null) {
        for (; oe < P.length; oe++) J = I(C, P[oe], M), J !== null && (S = u(J, S, oe), ge === null ? te = J : ge.sibling = J, ge = J);
        return pe && cn(C, oe), te;
      }
      for (J = a(J); oe < P.length; oe++) fe = A(J, C, oe, P[oe], M), fe !== null && (e && fe.alternate !== null && J.delete(fe.key === null ? oe : fe.key), S = u(fe, S, oe), ge === null ? te = fe : ge.sibling = fe, ge = fe);
      return e && J.forEach(function(Xn) {
        return t(C, Xn);
      }), pe && cn(C, oe), te;
    }
    function re(C, S, P, M) {
      if (P == null) throw Error(l(151));
      for (var te = null, ge = null, J = S, oe = S = 0, fe = null, ye = P.next(); J !== null && !ye.done; oe++, ye = P.next()) {
        J.index > oe ? (fe = J, J = null) : fe = J.sibling;
        var Xn = j(C, J, ye.value, M);
        if (Xn === null) {
          J === null && (J = fe);
          break;
        }
        e && J && Xn.alternate === null && t(C, J), S = u(Xn, S, oe), ge === null ? te = Xn : ge.sibling = Xn, ge = Xn, J = fe;
      }
      if (ye.done) return n(C, J), pe && cn(C, oe), te;
      if (J === null) {
        for (; !ye.done; oe++, ye = P.next()) ye = I(C, ye.value, M), ye !== null && (S = u(ye, S, oe), ge === null ? te = ye : ge.sibling = ye, ge = ye);
        return pe && cn(C, oe), te;
      }
      for (J = a(J); !ye.done; oe++, ye = P.next()) ye = A(J, C, oe, ye.value, M), ye !== null && (e && ye.alternate !== null && J.delete(ye.key === null ? oe : ye.key), S = u(ye, S, oe), ge === null ? te = ye : ge.sibling = ye, ge = ye);
      return e && J.forEach(function(mx) {
        return t(C, mx);
      }), pe && cn(C, oe), te;
    }
    function Ee(C, S, P, M) {
      if (typeof P == "object" && P !== null && P.type === _ && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case T:
            e: {
              for (var te = P.key; S !== null; ) {
                if (S.key === te) {
                  if (te = P.type, te === _) {
                    if (S.tag === 7) {
                      n(C, S.sibling), M = i(S, P.props.children), M.return = C, C = M;
                      break e;
                    }
                  } else if (S.elementType === te || typeof te == "object" && te !== null && te.$$typeof === G && pr(te) === S.type) {
                    n(C, S.sibling), M = i(S, P.props), Ua(M, P), M.return = C, C = M;
                    break e;
                  }
                  n(C, S);
                  break;
                } else t(C, S);
                S = S.sibling;
              }
              P.type === _ ? (M = ur(P.props.children, C.mode, M, P.key), M.return = C, C = M) : (M = Js(P.type, P.key, P.props, null, C.mode, M), Ua(M, P), M.return = C, C = M);
            }
            return f(C);
          case z:
            e: {
              for (te = P.key; S !== null; ) {
                if (S.key === te) if (S.tag === 4 && S.stateNode.containerInfo === P.containerInfo && S.stateNode.implementation === P.implementation) {
                  n(C, S.sibling), M = i(S, P.children || []), M.return = C, C = M;
                  break e;
                } else {
                  n(C, S);
                  break;
                }
                else t(C, S);
                S = S.sibling;
              }
              M = ol(P, C.mode, M), M.return = C, C = M;
            }
            return f(C);
          case G:
            return P = pr(P), Ee(C, S, P, M);
        }
        if (ft(P)) return K(C, S, P, M);
        if (Te(P)) {
          if (te = Te(P), typeof te != "function") throw Error(l(150));
          return P = te.call(P), re(C, S, P, M);
        }
        if (typeof P.then == "function") return Ee(C, S, ii(P), M);
        if (P.$$typeof === B) return Ee(C, S, ni(C, P), M);
        oi(C, P);
      }
      return typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint" ? (P = "" + P, S !== null && S.tag === 6 ? (n(C, S.sibling), M = i(S, P), M.return = C, C = M) : (n(C, S), M = il(P, C.mode, M), M.return = C, C = M), f(C)) : n(C, S);
    }
    return function(C, S, P, M) {
      try {
        Ba = 0;
        var te = Ee(C, S, P, M);
        return Wr = null, te;
      } catch (J) {
        if (J === Gr || J === ai) throw J;
        var ge = Nt(29, J, null, C.mode);
        return ge.lanes = M, ge.return = C, ge;
      }
    };
  }
  var gr = Rf(true), Mf = Rf(false), Mn = false;
  function bl(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function xl(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, callbacks: null });
  }
  function In(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function zn(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (be & 2) !== 0) {
      var i = a.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), a.pending = t, t = Zs(e), gf(e, null, n), t;
    }
    return Ys(e, a, t, n), Zs(e);
  }
  function Ha(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, Sd(e, n);
    }
  }
  function wl(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var i = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
          u === null ? i = u = f : u = u.next = f, n = n.next;
        } while (n !== null);
        u === null ? i = u = t : u = u.next = t;
      } else i = u = t;
      n = { baseState: a.baseState, firstBaseUpdate: i, lastBaseUpdate: u, shared: a.shared, callbacks: a.callbacks }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var kl = false;
  function $a() {
    if (kl) {
      var e = qr;
      if (e !== null) throw e;
    }
  }
  function qa(e, t, n, a) {
    kl = false;
    var i = e.updateQueue;
    Mn = false;
    var u = i.firstBaseUpdate, f = i.lastBaseUpdate, y = i.shared.pending;
    if (y !== null) {
      i.shared.pending = null;
      var w = y, E = w.next;
      w.next = null, f === null ? u = E : f.next = E, f = w;
      var R = e.alternate;
      R !== null && (R = R.updateQueue, y = R.lastBaseUpdate, y !== f && (y === null ? R.firstBaseUpdate = E : y.next = E, R.lastBaseUpdate = w));
    }
    if (u !== null) {
      var I = i.baseState;
      f = 0, R = E = w = null, y = u;
      do {
        var j = y.lane & -536870913, A = j !== y.lane;
        if (A ? (de & j) === j : (a & j) === j) {
          j !== 0 && j === $r && (kl = true), R !== null && (R = R.next = { lane: 0, tag: y.tag, payload: y.payload, callback: null, next: null });
          e: {
            var K = e, re = y;
            j = t;
            var Ee = n;
            switch (re.tag) {
              case 1:
                if (K = re.payload, typeof K == "function") {
                  I = K.call(Ee, I, j);
                  break e;
                }
                I = K;
                break e;
              case 3:
                K.flags = K.flags & -65537 | 128;
              case 0:
                if (K = re.payload, j = typeof K == "function" ? K.call(Ee, I, j) : K, j == null) break e;
                I = x({}, I, j);
                break e;
              case 2:
                Mn = true;
            }
          }
          j = y.callback, j !== null && (e.flags |= 64, A && (e.flags |= 8192), A = i.callbacks, A === null ? i.callbacks = [j] : A.push(j));
        } else A = { lane: j, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, R === null ? (E = R = A, w = I) : R = R.next = A, f |= j;
        if (y = y.next, y === null) {
          if (y = i.shared.pending, y === null) break;
          A = y, y = A.next, A.next = null, i.lastBaseUpdate = A, i.shared.pending = null;
        }
      } while (true);
      R === null && (w = I), i.baseState = w, i.firstBaseUpdate = E, i.lastBaseUpdate = R, u === null && (i.shared.lanes = 0), Vn |= f, e.lanes = f, e.memoizedState = I;
    }
  }
  function If(e, t) {
    if (typeof e != "function") throw Error(l(191, e));
    e.call(t);
  }
  function zf(e, t) {
    var n = e.callbacks;
    if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) If(n[e], t);
  }
  var Qr = N(null), li = N(0);
  function Of(e, t) {
    e = wn, q(li, e), q(Qr, t), wn = e | t.baseLanes;
  }
  function Sl() {
    q(li, wn), q(Qr, Qr.current);
  }
  function Nl() {
    wn = li.current, D(Qr), D(li);
  }
  var Ct = N(null), Ht = null;
  function On(e) {
    var t = e.alternate;
    q(Ve, Ve.current & 1), q(Ct, e), Ht === null && (t === null || Qr.current !== null || t.memoizedState !== null) && (Ht = e);
  }
  function Cl(e) {
    q(Ve, Ve.current), q(Ct, e), Ht === null && (Ht = e);
  }
  function Ff(e) {
    e.tag === 22 ? (q(Ve, Ve.current), q(Ct, e), Ht === null && (Ht = e)) : Fn();
  }
  function Fn() {
    q(Ve, Ve.current), q(Ct, Ct.current);
  }
  function Pt(e) {
    D(Ct), Ht === e && (Ht = null), D(Ve);
  }
  var Ve = N(0);
  function ui(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Au(n) || Ru(n))) return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var hn = 0, ie = null, Ce = null, $e = null, ci = false, Kr = false, yr = false, di = 0, Ga = 0, Xr = null, sb = 0;
  function Oe() {
    throw Error(l(321));
  }
  function Pl(e, t) {
    if (t === null) return false;
    for (var n = 0; n < t.length && n < e.length; n++) if (!St(e[n], t[n])) return false;
    return true;
  }
  function El(e, t, n, a, i, u) {
    return hn = u, ie = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, L.H = e === null || e.memoizedState === null ? xh : Ul, yr = false, u = n(a, i), yr = false, Kr && (u = _f(t, n, a, i)), Df(e), u;
  }
  function Df(e) {
    L.H = Ka;
    var t = Ce !== null && Ce.next !== null;
    if (hn = 0, $e = Ce = ie = null, ci = false, Ga = 0, Xr = null, t) throw Error(l(300));
    e === null || qe || (e = e.dependencies, e !== null && ti(e) && (qe = true));
  }
  function _f(e, t, n, a) {
    ie = e;
    var i = 0;
    do {
      if (Kr && (Xr = null), Ga = 0, Kr = false, 25 <= i) throw Error(l(301));
      if (i += 1, $e = Ce = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      L.H = wh, u = t(n, a);
    } while (Kr);
    return u;
  }
  function ib() {
    var e = L.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Wa(t) : t, e = e.useState()[0], (Ce !== null ? Ce.memoizedState : null) !== e && (ie.flags |= 1024), t;
  }
  function Tl() {
    var e = di !== 0;
    return di = 0, e;
  }
  function jl(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Ll(e) {
    if (ci) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ci = false;
    }
    hn = 0, $e = Ce = ie = null, Kr = false, Ga = di = 0, Xr = null;
  }
  function ut() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return $e === null ? ie.memoizedState = $e = e : $e = $e.next = e, $e;
  }
  function Be() {
    if (Ce === null) {
      var e = ie.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ce.next;
    var t = $e === null ? ie.memoizedState : $e.next;
    if (t !== null) $e = t, Ce = e;
    else {
      if (e === null) throw ie.alternate === null ? Error(l(467)) : Error(l(310));
      Ce = e, e = { memoizedState: Ce.memoizedState, baseState: Ce.baseState, baseQueue: Ce.baseQueue, queue: Ce.queue, next: null }, $e === null ? ie.memoizedState = $e = e : $e = $e.next = e;
    }
    return $e;
  }
  function fi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Wa(e) {
    var t = Ga;
    return Ga += 1, Xr === null && (Xr = []), e = jf(Xr, e, t), t = ie, ($e === null ? t.memoizedState : $e.next) === null && (t = t.alternate, L.H = t === null || t.memoizedState === null ? xh : Ul), e;
  }
  function hi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Wa(e);
      if (e.$$typeof === B) return tt(e);
    }
    throw Error(l(438, String(e)));
  }
  function Al(e) {
    var t = null, n = ie.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var a = ie.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = { data: a.data.map(function(i) {
        return i.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = fi(), ie.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), a = 0; a < e; a++) n[a] = ve;
    return t.index++, n;
  }
  function pn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function pi(e) {
    var t = Be();
    return Rl(t, Ce, e);
  }
  function Rl(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(l(311));
    a.lastRenderedReducer = n;
    var i = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (i !== null) {
        var f = i.next;
        i.next = u.next, u.next = f;
      }
      t.baseQueue = i = u, a.pending = null;
    }
    if (u = e.baseState, i === null) e.memoizedState = u;
    else {
      t = i.next;
      var y = f = null, w = null, E = t, R = false;
      do {
        var I = E.lane & -536870913;
        if (I !== E.lane ? (de & I) === I : (hn & I) === I) {
          var j = E.revertLane;
          if (j === 0) w !== null && (w = w.next = { lane: 0, revertLane: 0, gesture: null, action: E.action, hasEagerState: E.hasEagerState, eagerState: E.eagerState, next: null }), I === $r && (R = true);
          else if ((hn & j) === j) {
            E = E.next, j === $r && (R = true);
            continue;
          } else I = { lane: 0, revertLane: E.revertLane, gesture: null, action: E.action, hasEagerState: E.hasEagerState, eagerState: E.eagerState, next: null }, w === null ? (y = w = I, f = u) : w = w.next = I, ie.lanes |= j, Vn |= j;
          I = E.action, yr && n(u, I), u = E.hasEagerState ? E.eagerState : n(u, I);
        } else j = { lane: I, revertLane: E.revertLane, gesture: E.gesture, action: E.action, hasEagerState: E.hasEagerState, eagerState: E.eagerState, next: null }, w === null ? (y = w = j, f = u) : w = w.next = j, ie.lanes |= I, Vn |= I;
        E = E.next;
      } while (E !== null && E !== t);
      if (w === null ? f = u : w.next = y, !St(u, e.memoizedState) && (qe = true, R && (n = qr, n !== null))) throw n;
      e.memoizedState = u, e.baseState = f, e.baseQueue = w, a.lastRenderedState = u;
    }
    return i === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Ml(e) {
    var t = Be(), n = t.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch, i = n.pending, u = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var f = i = i.next;
      do
        u = e(u, f.action), f = f.next;
      while (f !== i);
      St(u, t.memoizedState) || (qe = true), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, a];
  }
  function Vf(e, t, n) {
    var a = ie, i = Be(), u = pe;
    if (u) {
      if (n === void 0) throw Error(l(407));
      n = n();
    } else n = t();
    var f = !St((Ce || i).memoizedState, n);
    if (f && (i.memoizedState = n, qe = true), i = i.queue, Ol(Hf.bind(null, a, i, e), [e]), i.getSnapshot !== t || f || $e !== null && $e.memoizedState.tag & 1) {
      if (a.flags |= 2048, Yr(9, { destroy: void 0 }, Uf.bind(null, a, i, n, t), null), je === null) throw Error(l(349));
      u || (hn & 127) !== 0 || Bf(a, t, n);
    }
    return n;
  }
  function Bf(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ie.updateQueue, t === null ? (t = fi(), ie.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Uf(e, t, n, a) {
    t.value = n, t.getSnapshot = a, $f(t) && qf(e);
  }
  function Hf(e, t, n) {
    return n(function() {
      $f(t) && qf(e);
    });
  }
  function $f(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !St(e, n);
    } catch {
      return true;
    }
  }
  function qf(e) {
    var t = lr(e, 2);
    t !== null && bt(t, e, 2);
  }
  function Il(e) {
    var t = ut();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), yr) {
        Pn(true);
        try {
          n();
        } finally {
          Pn(false);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: pn, lastRenderedState: e }, t;
  }
  function Gf(e, t, n, a) {
    return e.baseState = n, Rl(e, Ce, typeof a == "function" ? a : pn);
  }
  function ob(e, t, n, a, i) {
    if (yi(e)) throw Error(l(485));
    if (e = t.action, e !== null) {
      var u = { payload: i, action: e, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(f) {
        u.listeners.push(f);
      } };
      L.T !== null ? n(true) : u.isTransition = false, a(u), n = t.pending, n === null ? (u.next = t.pending = u, Wf(t, u)) : (u.next = n.next, t.pending = n.next = u);
    }
  }
  function Wf(e, t) {
    var n = t.action, a = t.payload, i = e.state;
    if (t.isTransition) {
      var u = L.T, f = {};
      L.T = f;
      try {
        var y = n(i, a), w = L.S;
        w !== null && w(f, y), Qf(e, t, y);
      } catch (E) {
        zl(e, t, E);
      } finally {
        u !== null && f.types !== null && (u.types = f.types), L.T = u;
      }
    } else try {
      u = n(i, a), Qf(e, t, u);
    } catch (E) {
      zl(e, t, E);
    }
  }
  function Qf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function(a) {
      Kf(e, t, a);
    }, function(a) {
      return zl(e, t, a);
    }) : Kf(e, t, n);
  }
  function Kf(e, t, n) {
    t.status = "fulfilled", t.value = n, Xf(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Wf(e, n)));
  }
  function zl(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, Xf(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Xf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Yf(e, t) {
    return t;
  }
  function Zf(e, t) {
    if (pe) {
      var n = je.formState;
      if (n !== null) {
        e: {
          var a = ie;
          if (pe) {
            if (Re) {
              t: {
                for (var i = Re, u = zt; i.nodeType !== 8; ) {
                  if (!u) {
                    i = null;
                    break t;
                  }
                  if (i = Ot(i.nextSibling), i === null) {
                    i = null;
                    break t;
                  }
                }
                u = i.data, i = u === "F!" || u === "F" ? i : null;
              }
              if (i) {
                Re = Ot(i.nextSibling), a = i.data === "F!";
                break e;
              }
            }
            An(a);
          }
          a = false;
        }
        a && (t = n[0]);
      }
    }
    return n = ut(), n.memoizedState = n.baseState = t, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Yf, lastRenderedState: t }, n.queue = a, n = yh.bind(null, ie, a), a.dispatch = n, a = Il(false), u = Bl.bind(null, ie, false, a.queue), a = ut(), i = { state: t, dispatch: null, action: e, pending: null }, a.queue = i, n = ob.bind(null, ie, i, u, n), i.dispatch = n, a.memoizedState = e, [t, n, false];
  }
  function Jf(e) {
    var t = Be();
    return eh(t, Ce, e);
  }
  function eh(e, t, n) {
    if (t = Rl(e, t, Yf)[0], e = pi(pn)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = Wa(t);
    } catch (f) {
      throw f === Gr ? ai : f;
    }
    else a = t;
    t = Be();
    var i = t.queue, u = i.dispatch;
    return n !== t.memoizedState && (ie.flags |= 2048, Yr(9, { destroy: void 0 }, lb.bind(null, i, n), null)), [a, u, e];
  }
  function lb(e, t) {
    e.action = t;
  }
  function th(e) {
    var t = Be(), n = Ce;
    if (n !== null) return eh(t, n, e);
    Be(), t = t.memoizedState, n = Be();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, false];
  }
  function Yr(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = ie.updateQueue, t === null && (t = fi(), ie.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function nh() {
    return Be().memoizedState;
  }
  function mi(e, t, n, a) {
    var i = ut();
    ie.flags |= e, i.memoizedState = Yr(1 | t, { destroy: void 0 }, n, a === void 0 ? null : a);
  }
  function gi(e, t, n, a) {
    var i = Be();
    a = a === void 0 ? null : a;
    var u = i.memoizedState.inst;
    Ce !== null && a !== null && Pl(a, Ce.memoizedState.deps) ? i.memoizedState = Yr(t, u, n, a) : (ie.flags |= e, i.memoizedState = Yr(1 | t, u, n, a));
  }
  function rh(e, t) {
    mi(8390656, 8, e, t);
  }
  function Ol(e, t) {
    gi(2048, 8, e, t);
  }
  function ub(e) {
    ie.flags |= 4;
    var t = ie.updateQueue;
    if (t === null) t = fi(), ie.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function ah(e) {
    var t = Be().memoizedState;
    return ub({ ref: t, nextImpl: e }), function() {
      if ((be & 2) !== 0) throw Error(l(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function sh(e, t) {
    return gi(4, 2, e, t);
  }
  function ih(e, t) {
    return gi(4, 4, e, t);
  }
  function oh(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function lh(e, t, n) {
    n = n != null ? n.concat([e]) : null, gi(4, 4, oh.bind(null, t, e), n);
  }
  function Fl() {
  }
  function uh(e, t) {
    var n = Be();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && Pl(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function ch(e, t) {
    var n = Be();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && Pl(t, a[1])) return a[0];
    if (a = e(), yr) {
      Pn(true);
      try {
        e();
      } finally {
        Pn(false);
      }
    }
    return n.memoizedState = [a, t], a;
  }
  function Dl(e, t, n) {
    return n === void 0 || (hn & 1073741824) !== 0 && (de & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = dp(), ie.lanes |= e, Vn |= e, n);
  }
  function dh(e, t, n, a) {
    return St(n, t) ? n : Qr.current !== null ? (e = Dl(e, n, a), St(e, t) || (qe = true), e) : (hn & 42) === 0 || (hn & 1073741824) !== 0 && (de & 261930) === 0 ? (qe = true, e.memoizedState = n) : (e = dp(), ie.lanes |= e, Vn |= e, t);
  }
  function fh(e, t, n, a, i) {
    var u = $.p;
    $.p = u !== 0 && 8 > u ? u : 8;
    var f = L.T, y = {};
    L.T = y, Bl(e, false, t, n);
    try {
      var w = i(), E = L.S;
      if (E !== null && E(y, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var R = ab(w, a);
        Qa(e, t, R, jt(e));
      } else Qa(e, t, a, jt(e));
    } catch (I) {
      Qa(e, t, { then: function() {
      }, status: "rejected", reason: I }, jt());
    } finally {
      $.p = u, f !== null && y.types !== null && (f.types = y.types), L.T = f;
    }
  }
  function cb() {
  }
  function _l(e, t, n, a) {
    if (e.tag !== 5) throw Error(l(476));
    var i = hh(e).queue;
    fh(e, i, t, ee, n === null ? cb : function() {
      return ph(e), n(a);
    });
  }
  function hh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: ee, baseState: ee, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: pn, lastRenderedState: ee }, next: null };
    var n = {};
    return t.next = { memoizedState: n, baseState: n, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: pn, lastRenderedState: n }, next: null }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function ph(e) {
    var t = hh(e);
    t.next === null && (t = e.alternate.memoizedState), Qa(e, t.next.queue, {}, jt());
  }
  function Vl() {
    return tt(ds);
  }
  function mh() {
    return Be().memoizedState;
  }
  function gh() {
    return Be().memoizedState;
  }
  function db(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = jt();
          e = In(n);
          var a = zn(t, e, n);
          a !== null && (bt(a, t, n), Ha(a, t, n)), t = { cache: ml() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function fb(e, t, n) {
    var a = jt();
    n = { lane: a, revertLane: 0, gesture: null, action: n, hasEagerState: false, eagerState: null, next: null }, yi(e) ? vh(t, n) : (n = al(e, t, n, a), n !== null && (bt(n, e, a), bh(n, t, a)));
  }
  function yh(e, t, n) {
    var a = jt();
    Qa(e, t, n, a);
  }
  function Qa(e, t, n, a) {
    var i = { lane: a, revertLane: 0, gesture: null, action: n, hasEagerState: false, eagerState: null, next: null };
    if (yi(e)) vh(t, i);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var f = t.lastRenderedState, y = u(f, n);
        if (i.hasEagerState = true, i.eagerState = y, St(y, f)) return Ys(e, t, i, 0), je === null && Xs(), false;
      } catch {
      }
      if (n = al(e, t, i, a), n !== null) return bt(n, e, a), bh(n, t, a), true;
    }
    return false;
  }
  function Bl(e, t, n, a) {
    if (a = { lane: 2, revertLane: bu(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, yi(e)) {
      if (t) throw Error(l(479));
    } else t = al(e, n, a, 2), t !== null && bt(t, e, 2);
  }
  function yi(e) {
    var t = e.alternate;
    return e === ie || t !== null && t === ie;
  }
  function vh(e, t) {
    Kr = ci = true;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function bh(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, Sd(e, n);
    }
  }
  var Ka = { readContext: tt, use: hi, useCallback: Oe, useContext: Oe, useEffect: Oe, useImperativeHandle: Oe, useLayoutEffect: Oe, useInsertionEffect: Oe, useMemo: Oe, useReducer: Oe, useRef: Oe, useState: Oe, useDebugValue: Oe, useDeferredValue: Oe, useTransition: Oe, useSyncExternalStore: Oe, useId: Oe, useHostTransitionStatus: Oe, useFormState: Oe, useActionState: Oe, useOptimistic: Oe, useMemoCache: Oe, useCacheRefresh: Oe };
  Ka.useEffectEvent = Oe;
  var xh = { readContext: tt, use: hi, useCallback: function(e, t) {
    return ut().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: tt, useEffect: rh, useImperativeHandle: function(e, t, n) {
    n = n != null ? n.concat([e]) : null, mi(4194308, 4, oh.bind(null, t, e), n);
  }, useLayoutEffect: function(e, t) {
    return mi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    mi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = ut();
    t = t === void 0 ? null : t;
    var a = e();
    if (yr) {
      Pn(true);
      try {
        e();
      } finally {
        Pn(false);
      }
    }
    return n.memoizedState = [a, t], a;
  }, useReducer: function(e, t, n) {
    var a = ut();
    if (n !== void 0) {
      var i = n(t);
      if (yr) {
        Pn(true);
        try {
          n(t);
        } finally {
          Pn(false);
        }
      }
    } else i = t;
    return a.memoizedState = a.baseState = i, e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: i }, a.queue = e, e = e.dispatch = fb.bind(null, ie, e), [a.memoizedState, e];
  }, useRef: function(e) {
    var t = ut();
    return e = { current: e }, t.memoizedState = e;
  }, useState: function(e) {
    e = Il(e);
    var t = e.queue, n = yh.bind(null, ie, t);
    return t.dispatch = n, [e.memoizedState, n];
  }, useDebugValue: Fl, useDeferredValue: function(e, t) {
    var n = ut();
    return Dl(n, e, t);
  }, useTransition: function() {
    var e = Il(false);
    return e = fh.bind(null, ie, e.queue, true, false), ut().memoizedState = e, [false, e];
  }, useSyncExternalStore: function(e, t, n) {
    var a = ie, i = ut();
    if (pe) {
      if (n === void 0) throw Error(l(407));
      n = n();
    } else {
      if (n = t(), je === null) throw Error(l(349));
      (de & 127) !== 0 || Bf(a, t, n);
    }
    i.memoizedState = n;
    var u = { value: n, getSnapshot: t };
    return i.queue = u, rh(Hf.bind(null, a, u, e), [e]), a.flags |= 2048, Yr(9, { destroy: void 0 }, Uf.bind(null, a, u, n, t), null), n;
  }, useId: function() {
    var e = ut(), t = je.identifierPrefix;
    if (pe) {
      var n = Zt, a = Yt;
      n = (a & ~(1 << 32 - kt(a) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = di++, 0 < n && (t += "H" + n.toString(32)), t += "_";
    } else n = sb++, t = "_" + t + "r_" + n.toString(32) + "_";
    return e.memoizedState = t;
  }, useHostTransitionStatus: Vl, useFormState: Zf, useActionState: Zf, useOptimistic: function(e) {
    var t = ut();
    t.memoizedState = t.baseState = e;
    var n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = n, t = Bl.bind(null, ie, true, n), n.dispatch = t, [e, t];
  }, useMemoCache: Al, useCacheRefresh: function() {
    return ut().memoizedState = db.bind(null, ie);
  }, useEffectEvent: function(e) {
    var t = ut(), n = { impl: e };
    return t.memoizedState = n, function() {
      if ((be & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  } }, Ul = { readContext: tt, use: hi, useCallback: uh, useContext: tt, useEffect: Ol, useImperativeHandle: lh, useInsertionEffect: sh, useLayoutEffect: ih, useMemo: ch, useReducer: pi, useRef: nh, useState: function() {
    return pi(pn);
  }, useDebugValue: Fl, useDeferredValue: function(e, t) {
    var n = Be();
    return dh(n, Ce.memoizedState, e, t);
  }, useTransition: function() {
    var e = pi(pn)[0], t = Be().memoizedState;
    return [typeof e == "boolean" ? e : Wa(e), t];
  }, useSyncExternalStore: Vf, useId: mh, useHostTransitionStatus: Vl, useFormState: Jf, useActionState: Jf, useOptimistic: function(e, t) {
    var n = Be();
    return Gf(n, Ce, e, t);
  }, useMemoCache: Al, useCacheRefresh: gh };
  Ul.useEffectEvent = ah;
  var wh = { readContext: tt, use: hi, useCallback: uh, useContext: tt, useEffect: Ol, useImperativeHandle: lh, useInsertionEffect: sh, useLayoutEffect: ih, useMemo: ch, useReducer: Ml, useRef: nh, useState: function() {
    return Ml(pn);
  }, useDebugValue: Fl, useDeferredValue: function(e, t) {
    var n = Be();
    return Ce === null ? Dl(n, e, t) : dh(n, Ce.memoizedState, e, t);
  }, useTransition: function() {
    var e = Ml(pn)[0], t = Be().memoizedState;
    return [typeof e == "boolean" ? e : Wa(e), t];
  }, useSyncExternalStore: Vf, useId: mh, useHostTransitionStatus: Vl, useFormState: th, useActionState: th, useOptimistic: function(e, t) {
    var n = Be();
    return Ce !== null ? Gf(n, Ce, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
  }, useMemoCache: Al, useCacheRefresh: gh };
  wh.useEffectEvent = ah;
  function Hl(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : x({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var $l = { enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var a = jt(), i = In(a);
    i.payload = t, n != null && (i.callback = n), t = zn(e, i, a), t !== null && (bt(t, e, a), Ha(t, e, a));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var a = jt(), i = In(a);
    i.tag = 1, i.payload = t, n != null && (i.callback = n), t = zn(e, i, a), t !== null && (bt(t, e, a), Ha(t, e, a));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = jt(), a = In(n);
    a.tag = 2, t != null && (a.callback = t), t = zn(e, a, n), t !== null && (bt(t, e, n), Ha(t, e, n));
  } };
  function kh(e, t, n, a, i, u, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, f) : t.prototype && t.prototype.isPureReactComponent ? !za(n, a) || !za(i, u) : true;
  }
  function Sh(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && $l.enqueueReplaceState(t, t.state, null);
  }
  function vr(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t) a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = x({}, n));
      for (var i in e) n[i] === void 0 && (n[i] = e[i]);
    }
    return n;
  }
  function Nh(e) {
    Ks(e);
  }
  function Ch(e) {
    console.error(e);
  }
  function Ph(e) {
    Ks(e);
  }
  function vi(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Eh(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, { componentStack: n.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function ql(e, t, n) {
    return n = In(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      vi(e, t);
    }, n;
  }
  function Th(e) {
    return e = In(e), e.tag = 3, e;
  }
  function jh(e, t, n, a) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var u = a.value;
      e.payload = function() {
        return i(u);
      }, e.callback = function() {
        Eh(t, n, a);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
      Eh(t, n, a), typeof i != "function" && (Bn === null ? Bn = /* @__PURE__ */ new Set([this]) : Bn.add(this));
      var y = a.stack;
      this.componentDidCatch(a.value, { componentStack: y !== null ? y : "" });
    });
  }
  function hb(e, t, n, a, i) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && Hr(t, n, i, true), n = Ct.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ht === null ? Li() : n.alternate === null && Fe === 0 && (Fe = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, a === si ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), gu(e, a, i)), false;
          case 22:
            return n.flags |= 65536, a === si ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), gu(e, a, i)), false;
        }
        throw Error(l(435, n.tag));
      }
      return gu(e, a, i), Li(), false;
    }
    if (pe) return t = Ct.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, a !== cl && (e = Error(l(422), { cause: a }), Da(Rt(e, n)))) : (a !== cl && (t = Error(l(423), { cause: a }), Da(Rt(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, a = Rt(a, n), i = ql(e.stateNode, a, i), wl(e, i), Fe !== 4 && (Fe = 2)), false;
    var u = Error(l(520), { cause: a });
    if (u = Rt(u, n), rs === null ? rs = [u] : rs.push(u), Fe !== 4 && (Fe = 2), t === null) return true;
    a = Rt(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ql(n.stateNode, a, e), wl(n, e), false;
        case 1:
          if (t = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Bn === null || !Bn.has(u)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = Th(i), jh(i, e, n, a), wl(n, i), false;
      }
      n = n.return;
    } while (n !== null);
    return false;
  }
  var Gl = Error(l(461)), qe = false;
  function nt(e, t, n, a) {
    t.child = e === null ? Mf(t, null, n, a) : gr(t, e.child, n, a);
  }
  function Lh(e, t, n, a, i) {
    n = n.render;
    var u = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var y in a) y !== "ref" && (f[y] = a[y]);
    } else f = a;
    return fr(t), a = El(e, t, n, f, u, i), y = Tl(), e !== null && !qe ? (jl(e, t, i), mn(e, t, i)) : (pe && y && ll(t), t.flags |= 1, nt(e, t, a, i), t.child);
  }
  function Ah(e, t, n, a, i) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !sl(u) && u.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = u, Rh(e, t, u, a, i)) : (e = Js(n.type, null, a, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !eu(e, i)) {
      var f = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : za, n(f, a) && e.ref === t.ref) return mn(e, t, i);
    }
    return t.flags |= 1, e = un(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Rh(e, t, n, a, i) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (za(u, a) && e.ref === t.ref) if (qe = false, t.pendingProps = a = u, eu(e, i)) (e.flags & 131072) !== 0 && (qe = true);
      else return t.lanes = e.lanes, mn(e, t, i);
    }
    return Wl(e, t, n, a, i);
  }
  function Mh(e, t, n, a) {
    var i = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, e !== null) {
          for (a = t.child = e.child, i = 0; a !== null; ) i = i | a.lanes | a.childLanes, a = a.sibling;
          a = i & ~u;
        } else a = 0, t.child = null;
        return Ih(e, t, u, n, a);
      }
      if ((n & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && ri(t, u !== null ? u.cachePool : null), u !== null ? Of(t, u) : Sl(), Ff(t);
      else return a = t.lanes = 536870912, Ih(e, t, u !== null ? u.baseLanes | n : n, n, a);
    } else u !== null ? (ri(t, u.cachePool), Of(t, u), Fn(), t.memoizedState = null) : (e !== null && ri(t, null), Sl(), Fn());
    return nt(e, t, i, n), t.child;
  }
  function Xa(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
  }
  function Ih(e, t, n, a, i) {
    var u = yl();
    return u = u === null ? null : { parent: He._currentValue, pool: u }, t.memoizedState = { baseLanes: n, cachePool: u }, e !== null && ri(t, null), Sl(), Ff(t), e !== null && Hr(e, t, a, true), t.childLanes = i, null;
  }
  function bi(e, t) {
    return t = wi({ mode: t.mode, children: t.children }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function zh(e, t, n) {
    return gr(t, e.child, null, n), e = bi(t, t.pendingProps), e.flags |= 2, Pt(t), t.memoizedState = null, e;
  }
  function pb(e, t, n) {
    var a = t.pendingProps, i = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (pe) {
        if (a.mode === "hidden") return e = bi(t, a), t.lanes = 536870912, Xa(null, e);
        if (Cl(t), (e = Re) ? (e = Wp(e, zt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = { dehydrated: e, treeContext: jn !== null ? { id: Yt, overflow: Zt } : null, retryLane: 536870912, hydrationErrors: null }, n = vf(e), n.return = t, t.child = n, et = t, Re = null)) : e = null, e === null) throw An(t);
        return t.lanes = 536870912, null;
      }
      return bi(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var f = u.dehydrated;
      if (Cl(t), i) if (t.flags & 256) t.flags &= -257, t = zh(e, t, n);
      else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
      else throw Error(l(558));
      else if (qe || Hr(e, t, n, false), i = (n & e.childLanes) !== 0, qe || i) {
        if (a = je, a !== null && (f = Nd(a, n), f !== 0 && f !== u.retryLane)) throw u.retryLane = f, lr(e, f), bt(a, e, f), Gl;
        Li(), t = zh(e, t, n);
      } else e = u.treeContext, Re = Ot(f.nextSibling), et = t, pe = true, Ln = null, zt = false, e !== null && wf(t, e), t = bi(t, a), t.flags |= 4096;
      return t;
    }
    return e = un(e.child, { mode: a.mode, children: a.children }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function xi(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(l(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Wl(e, t, n, a, i) {
    return fr(t), n = El(e, t, n, a, void 0, i), a = Tl(), e !== null && !qe ? (jl(e, t, i), mn(e, t, i)) : (pe && a && ll(t), t.flags |= 1, nt(e, t, n, i), t.child);
  }
  function Oh(e, t, n, a, i, u) {
    return fr(t), t.updateQueue = null, n = _f(t, a, n, i), Df(e), a = Tl(), e !== null && !qe ? (jl(e, t, u), mn(e, t, u)) : (pe && a && ll(t), t.flags |= 1, nt(e, t, n, u), t.child);
  }
  function Fh(e, t, n, a, i) {
    if (fr(t), t.stateNode === null) {
      var u = _r, f = n.contextType;
      typeof f == "object" && f !== null && (u = tt(f)), u = new n(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = $l, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, bl(t), f = n.contextType, u.context = typeof f == "object" && f !== null ? tt(f) : _r, u.state = t.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Hl(t, n, f, a), u.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (f = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), f !== u.state && $l.enqueueReplaceState(u, u.state, null), qa(t, a, u, i), $a(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = true;
    } else if (e === null) {
      u = t.stateNode;
      var y = t.memoizedProps, w = vr(n, y);
      u.props = w;
      var E = u.context, R = n.contextType;
      f = _r, typeof R == "object" && R !== null && (f = tt(R));
      var I = n.getDerivedStateFromProps;
      R = typeof I == "function" || typeof u.getSnapshotBeforeUpdate == "function", y = t.pendingProps !== y, R || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (y || E !== f) && Sh(t, u, a, f), Mn = false;
      var j = t.memoizedState;
      u.state = j, qa(t, a, u, i), $a(), E = t.memoizedState, y || j !== E || Mn ? (typeof I == "function" && (Hl(t, n, I, a), E = t.memoizedState), (w = Mn || kh(t, n, w, a, j, E, f)) ? (R || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = E), u.props = a, u.state = E, u.context = f, a = w) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = false);
    } else {
      u = t.stateNode, xl(e, t), f = t.memoizedProps, R = vr(n, f), u.props = R, I = t.pendingProps, j = u.context, E = n.contextType, w = _r, typeof E == "object" && E !== null && (w = tt(E)), y = n.getDerivedStateFromProps, (E = typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== I || j !== w) && Sh(t, u, a, w), Mn = false, j = t.memoizedState, u.state = j, qa(t, a, u, i), $a();
      var A = t.memoizedState;
      f !== I || j !== A || Mn || e !== null && e.dependencies !== null && ti(e.dependencies) ? (typeof y == "function" && (Hl(t, n, y, a), A = t.memoizedState), (R = Mn || kh(t, n, R, a, j, A, w) || e !== null && e.dependencies !== null && ti(e.dependencies)) ? (E || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, A, w), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(a, A, w)), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = A), u.props = a, u.state = A, u.context = w, a = R) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), a = false);
    }
    return u = a, xi(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = gr(t, e.child, null, i), t.child = gr(t, null, n, i)) : nt(e, t, n, i), t.memoizedState = u.state, e = t.child) : e = mn(e, t, i), e;
  }
  function Dh(e, t, n, a) {
    return cr(), t.flags |= 256, nt(e, t, n, a), t.child;
  }
  var Ql = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Kl(e) {
    return { baseLanes: e, cachePool: Ef() };
  }
  function Xl(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Tt), e;
  }
  function _h(e, t, n) {
    var a = t.pendingProps, i = false, u = (t.flags & 128) !== 0, f;
    if ((f = u) || (f = e !== null && e.memoizedState === null ? false : (Ve.current & 2) !== 0), f && (i = true, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (pe) {
        if (i ? On(t) : Fn(), (e = Re) ? (e = Wp(e, zt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = { dehydrated: e, treeContext: jn !== null ? { id: Yt, overflow: Zt } : null, retryLane: 536870912, hydrationErrors: null }, n = vf(e), n.return = t, t.child = n, et = t, Re = null)) : e = null, e === null) throw An(t);
        return Ru(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var y = a.children;
      return a = a.fallback, i ? (Fn(), i = t.mode, y = wi({ mode: "hidden", children: y }, i), a = ur(a, i, n, null), y.return = t, a.return = t, y.sibling = a, t.child = y, a = t.child, a.memoizedState = Kl(n), a.childLanes = Xl(e, f, n), t.memoizedState = Ql, Xa(null, a)) : (On(t), Yl(t, y));
    }
    var w = e.memoizedState;
    if (w !== null && (y = w.dehydrated, y !== null)) {
      if (u) t.flags & 256 ? (On(t), t.flags &= -257, t = Zl(e, t, n)) : t.memoizedState !== null ? (Fn(), t.child = e.child, t.flags |= 128, t = null) : (Fn(), y = a.fallback, i = t.mode, a = wi({ mode: "visible", children: a.children }, i), y = ur(y, i, n, null), y.flags |= 2, a.return = t, y.return = t, a.sibling = y, t.child = a, gr(t, e.child, null, n), a = t.child, a.memoizedState = Kl(n), a.childLanes = Xl(e, f, n), t.memoizedState = Ql, t = Xa(null, a));
      else if (On(t), Ru(y)) {
        if (f = y.nextSibling && y.nextSibling.dataset, f) var E = f.dgst;
        f = E, a = Error(l(419)), a.stack = "", a.digest = f, Da({ value: a, source: null, stack: null }), t = Zl(e, t, n);
      } else if (qe || Hr(e, t, n, false), f = (n & e.childLanes) !== 0, qe || f) {
        if (f = je, f !== null && (a = Nd(f, n), a !== 0 && a !== w.retryLane)) throw w.retryLane = a, lr(e, a), bt(f, e, a), Gl;
        Au(y) || Li(), t = Zl(e, t, n);
      } else Au(y) ? (t.flags |= 192, t.child = e.child, t = null) : (e = w.treeContext, Re = Ot(y.nextSibling), et = t, pe = true, Ln = null, zt = false, e !== null && wf(t, e), t = Yl(t, a.children), t.flags |= 4096);
      return t;
    }
    return i ? (Fn(), y = a.fallback, i = t.mode, w = e.child, E = w.sibling, a = un(w, { mode: "hidden", children: a.children }), a.subtreeFlags = w.subtreeFlags & 65011712, E !== null ? y = un(E, y) : (y = ur(y, i, n, null), y.flags |= 2), y.return = t, a.return = t, a.sibling = y, t.child = a, Xa(null, a), a = t.child, y = e.child.memoizedState, y === null ? y = Kl(n) : (i = y.cachePool, i !== null ? (w = He._currentValue, i = i.parent !== w ? { parent: w, pool: w } : i) : i = Ef(), y = { baseLanes: y.baseLanes | n, cachePool: i }), a.memoizedState = y, a.childLanes = Xl(e, f, n), t.memoizedState = Ql, Xa(e.child, a)) : (On(t), n = e.child, e = n.sibling, n = un(n, { mode: "visible", children: a.children }), n.return = t, n.sibling = null, e !== null && (f = t.deletions, f === null ? (t.deletions = [e], t.flags |= 16) : f.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Yl(e, t) {
    return t = wi({ mode: "visible", children: t }, e.mode), t.return = e, e.child = t;
  }
  function wi(e, t) {
    return e = Nt(22, e, null, t), e.lanes = 0, e;
  }
  function Zl(e, t, n) {
    return gr(t, e.child, null, n), e = Yl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Vh(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), hl(e.return, t, n);
  }
  function Jl(e, t, n, a, i, u) {
    var f = e.memoizedState;
    f === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: n, tailMode: i, treeForkCount: u } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = n, f.tailMode = i, f.treeForkCount = u);
  }
  function Bh(e, t, n) {
    var a = t.pendingProps, i = a.revealOrder, u = a.tail;
    a = a.children;
    var f = Ve.current, y = (f & 2) !== 0;
    if (y ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, q(Ve, f), nt(e, t, a, n), a = pe ? Fa : 0, !y && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Vh(e, n, t);
      else if (e.tag === 19) Vh(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && ui(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Jl(t, false, i, n, u, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && ui(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Jl(t, true, n, null, u, a);
        break;
      case "together":
        Jl(t, false, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function mn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Vn |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
      if (Hr(e, t, n, false), (n & t.childLanes) === 0) return null;
    } else return null;
    if (e !== null && t.child !== e.child) throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, n = un(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = un(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function eu(e, t) {
    return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && ti(e)));
  }
  function mb(e, t, n) {
    switch (t.tag) {
      case 3:
        lt(t, t.stateNode.containerInfo), Rn(t, He, e.memoizedState.cache), cr();
        break;
      case 27:
      case 5:
        ka(t);
        break;
      case 4:
        lt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Rn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, Cl(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) return a.dehydrated !== null ? (On(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? _h(e, t, n) : (On(t), e = mn(e, t, n), e !== null ? e.sibling : null);
        On(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (Hr(e, t, n, false), a = (n & t.childLanes) !== 0), i) {
          if (a) return Bh(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), q(Ve, Ve.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Mh(e, t, n, t.pendingProps);
      case 24:
        Rn(t, He, e.memoizedState.cache);
    }
    return mn(e, t, n);
  }
  function Uh(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps) qe = true;
    else {
      if (!eu(e, n) && (t.flags & 128) === 0) return qe = false, mb(e, t, n);
      qe = (e.flags & 131072) !== 0;
    }
    else qe = false, pe && (t.flags & 1048576) !== 0 && xf(t, Fa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = pr(t.elementType), t.type = e, typeof e == "function") sl(e) ? (a = vr(e, a), t.tag = 1, t = Fh(null, t, e, a, n)) : (t.tag = 0, t = Wl(null, t, e, a, n));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === X) {
                t.tag = 11, t = Lh(null, t, e, a, n);
                break e;
              } else if (i === Q) {
                t.tag = 14, t = Ah(null, t, e, a, n);
                break e;
              }
            }
            throw t = Xe(e) || e, Error(l(306, t, ""));
          }
        }
        return t;
      case 0:
        return Wl(e, t, t.type, t.pendingProps, n);
      case 1:
        return a = t.type, i = vr(a, t.pendingProps), Fh(e, t, a, i, n);
      case 3:
        e: {
          if (lt(t, t.stateNode.containerInfo), e === null) throw Error(l(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          i = u.element, xl(e, t), qa(t, a, null, n);
          var f = t.memoizedState;
          if (a = f.cache, Rn(t, He, a), a !== u.cache && pl(t, [He], n, true), $a(), a = f.element, u.isDehydrated) if (u = { element: a, isDehydrated: false, cache: f.cache }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            t = Dh(e, t, a, n);
            break e;
          } else if (a !== i) {
            i = Rt(Error(l(424)), t), Da(i), t = Dh(e, t, a, n);
            break e;
          } else for ((e = t.stateNode.containerInfo, e.nodeType) === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Re = Ot(e.firstChild), et = t, pe = true, Ln = null, zt = true, n = Mf(t, null, a, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (cr(), a === i) {
              t = mn(e, t, n);
              break e;
            }
            nt(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return xi(e, t), e === null ? (n = Jp(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : pe || (n = t.type, e = t.pendingProps, a = Fi(le.current).createElement(n), a[Je] = t, a[ht] = e, rt(a, n, e), Ye(a), t.stateNode = a) : t.memoizedState = Jp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
      case 27:
        return ka(t), e === null && pe && (a = t.stateNode = Xp(t.type, t.pendingProps, le.current), et = t, zt = true, i = Re, qn(t.type) ? (Mu = i, Re = Ot(a.firstChild)) : Re = i), nt(e, t, t.pendingProps.children, n), xi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && pe && ((i = a = Re) && (a = qb(a, t.type, t.pendingProps, zt), a !== null ? (t.stateNode = a, et = t, Re = Ot(a.firstChild), zt = false, i = true) : i = false), i || An(t)), ka(t), i = t.type, u = t.pendingProps, f = e !== null ? e.memoizedProps : null, a = u.children, Tu(i, u) ? a = null : f !== null && Tu(i, f) && (t.flags |= 32), t.memoizedState !== null && (i = El(e, t, ib, null, null, n), ds._currentValue = i), xi(e, t), nt(e, t, a, n), t.child;
      case 6:
        return e === null && pe && ((e = n = Re) && (n = Gb(n, t.pendingProps, zt), n !== null ? (t.stateNode = n, et = t, Re = null, e = true) : e = false), e || An(t)), null;
      case 13:
        return _h(e, t, n);
      case 4:
        return lt(t, t.stateNode.containerInfo), a = t.pendingProps, e === null ? t.child = gr(t, null, a, n) : nt(e, t, a, n), t.child;
      case 11:
        return Lh(e, t, t.type, t.pendingProps, n);
      case 7:
        return nt(e, t, t.pendingProps, n), t.child;
      case 8:
        return nt(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return nt(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return a = t.pendingProps, Rn(t, t.type, a.value), nt(e, t, a.children, n), t.child;
      case 9:
        return i = t.type._context, a = t.pendingProps.children, fr(t), i = tt(i), a = a(i), t.flags |= 1, nt(e, t, a, n), t.child;
      case 14:
        return Ah(e, t, t.type, t.pendingProps, n);
      case 15:
        return Rh(e, t, t.type, t.pendingProps, n);
      case 19:
        return Bh(e, t, n);
      case 31:
        return pb(e, t, n);
      case 22:
        return Mh(e, t, n, t.pendingProps);
      case 24:
        return fr(t), a = tt(He), e === null ? (i = yl(), i === null && (i = je, u = ml(), i.pooledCache = u, u.refCount++, u !== null && (i.pooledCacheLanes |= n), i = u), t.memoizedState = { parent: a, cache: i }, bl(t), Rn(t, He, i)) : ((e.lanes & n) !== 0 && (xl(e, t), qa(t, null, null, n), $a()), i = e.memoizedState, u = t.memoizedState, i.parent !== a ? (i = { parent: a, cache: a }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Rn(t, He, a)) : (a = u.cache, Rn(t, He, a), a !== i.cache && pl(t, [He], n, true))), nt(e, t, t.pendingProps.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(l(156, t.tag));
  }
  function gn(e) {
    e.flags |= 4;
  }
  function tu(e, t, n, a, i) {
    if ((t = (e.mode & 32) !== 0) && (t = false), t) {
      if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
      else if (mp()) e.flags |= 8192;
      else throw mr = si, vl;
    } else e.flags &= -16777217;
  }
  function Hh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (e.flags |= 16777216, !am(t)) if (mp()) e.flags |= 8192;
    else throw mr = si, vl;
  }
  function ki(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? wd() : 536870912, e.lanes |= t, ta |= t);
  }
  function Ya(e, t) {
    if (!pe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var a = null; n !== null; ) n.alternate !== null && (a = n), n = n.sibling;
        a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
    }
  }
  function Me(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, a |= i.subtreeFlags & 65011712, a |= i.flags & 65011712, i.return = e, i = i.sibling;
    else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, a |= i.subtreeFlags, a |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function gb(e, t, n) {
    var a = t.pendingProps;
    switch (ul(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Me(t), null;
      case 1:
        return Me(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), fn(He), _e(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ur(t) ? gn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, dl())), Me(t), null;
      case 26:
        var i = t.type, u = t.memoizedState;
        return e === null ? (gn(t), u !== null ? (Me(t), Hh(t, u)) : (Me(t), tu(t, i, null, a, n))) : u ? u !== e.memoizedState ? (gn(t), Me(t), Hh(t, u)) : (Me(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && gn(t), Me(t), tu(t, i, e, a, n)), null;
      case 27:
        if (Ms(t), n = le.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && gn(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(l(166));
            return Me(t), null;
          }
          e = Z.current, Ur(t) ? kf(t) : (e = Xp(i, a, n), t.stateNode = e, gn(t));
        }
        return Me(t), null;
      case 5:
        if (Ms(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && gn(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(l(166));
            return Me(t), null;
          }
          if (u = Z.current, Ur(t)) kf(t);
          else {
            var f = Fi(le.current);
            switch (u) {
              case 1:
                u = f.createElementNS("http://www.w3.org/2000/svg", i);
                break;
              case 2:
                u = f.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                break;
              default:
                switch (i) {
                  case "svg":
                    u = f.createElementNS("http://www.w3.org/2000/svg", i);
                    break;
                  case "math":
                    u = f.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                    break;
                  case "script":
                    u = f.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(u.firstChild);
                    break;
                  case "select":
                    u = typeof a.is == "string" ? f.createElement("select", { is: a.is }) : f.createElement("select"), a.multiple ? u.multiple = true : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? f.createElement(i, { is: a.is }) : f.createElement(i);
                }
            }
            u[Je] = t, u[ht] = a;
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) u.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break e;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = u;
            e: switch (rt(u, i, a), i) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = true;
                break e;
              default:
                a = false;
            }
            a && gn(t);
          }
        }
        return Me(t), tu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && gn(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(l(166));
          if (e = le.current, Ur(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, i = et, i !== null) switch (i.tag) {
              case 27:
              case 5:
                a = i.memoizedProps;
            }
            e[Je] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === true || _p(e.nodeValue, n)), e || An(t, true);
          } else e = Fi(e).createTextNode(a), e[Je] = t, t.stateNode = e;
        }
        return Me(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Ur(t), n !== null) {
            if (e === null) {
              if (!a) throw Error(l(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[Je] = t;
            } else cr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Me(t), e = false;
          } else n = dl(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = true;
          if (!e) return t.flags & 256 ? (Pt(t), t) : (Pt(t), null);
          if ((t.flags & 128) !== 0) throw Error(l(558));
        }
        return Me(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = Ur(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(l(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(l(317));
              i[Je] = t;
            } else cr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Me(t), i = false;
          } else i = dl(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = true;
          if (!i) return t.flags & 256 ? (Pt(t), t) : (Pt(t), null);
        }
        return Pt(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = a !== null, e = e !== null && e.memoizedState !== null, n && (a = t.child, i = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (i = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== i && (a.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ki(t, t.updateQueue), Me(t), null);
      case 4:
        return _e(), e === null && Su(t.stateNode.containerInfo), Me(t), null;
      case 10:
        return fn(t.type), Me(t), null;
      case 19:
        if (D(Ve), a = t.memoizedState, a === null) return Me(t), null;
        if (i = (t.flags & 128) !== 0, u = a.rendering, u === null) if (i) Ya(a, false);
        else {
          if (Fe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (u = ui(e), u !== null) {
              for (t.flags |= 128, Ya(a, false), e = u.updateQueue, t.updateQueue = e, ki(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; ) yf(n, e), n = n.sibling;
              return q(Ve, Ve.current & 1 | 2), pe && cn(t, a.treeForkCount), t.child;
            }
            e = e.sibling;
          }
          a.tail !== null && xt() > Ei && (t.flags |= 128, i = true, Ya(a, false), t.lanes = 4194304);
        }
        else {
          if (!i) if (e = ui(u), e !== null) {
            if (t.flags |= 128, i = true, e = e.updateQueue, t.updateQueue = e, ki(t, e), Ya(a, true), a.tail === null && a.tailMode === "hidden" && !u.alternate && !pe) return Me(t), null;
          } else 2 * xt() - a.renderingStartTime > Ei && n !== 536870912 && (t.flags |= 128, i = true, Ya(a, false), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = xt(), e.sibling = null, n = Ve.current, q(Ve, i ? n & 1 | 2 : n & 1), pe && cn(t, a.treeForkCount), e) : (Me(t), null);
      case 22:
      case 23:
        return Pt(t), Nl(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Me(t), n = t.updateQueue, n !== null && ki(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && D(hr), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), fn(He), Me(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function yb(e, t) {
    switch (ul(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return fn(He), _e(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ms(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Pt(t), t.alternate === null) throw Error(l(340));
          cr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Pt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(l(340));
          cr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return D(Ve), null;
      case 4:
        return _e(), null;
      case 10:
        return fn(t.type), null;
      case 22:
      case 23:
        return Pt(t), Nl(), e !== null && D(hr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return fn(He), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $h(e, t) {
    switch (ul(t), t.tag) {
      case 3:
        fn(He), _e();
        break;
      case 26:
      case 27:
      case 5:
        Ms(t);
        break;
      case 4:
        _e();
        break;
      case 31:
        t.memoizedState !== null && Pt(t);
        break;
      case 13:
        Pt(t);
        break;
      case 19:
        D(Ve);
        break;
      case 10:
        fn(t.type);
        break;
      case 22:
      case 23:
        Pt(t), Nl(), e !== null && D(hr);
        break;
      case 24:
        fn(He);
    }
  }
  function Za(e, t) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var u = n.create, f = n.inst;
            a = u(), f.destroy = a;
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (y) {
      Ne(t, t.return, y);
    }
  }
  function Dn(e, t, n) {
    try {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var f = a.inst, y = f.destroy;
            if (y !== void 0) {
              f.destroy = void 0, i = t;
              var w = n, E = y;
              try {
                E();
              } catch (R) {
                Ne(i, w, R);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (R) {
      Ne(t, t.return, R);
    }
  }
  function qh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        zf(t, n);
      } catch (a) {
        Ne(e, e.return, a);
      }
    }
  }
  function Gh(e, t, n) {
    n.props = vr(e.type, e.memoizedProps), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      Ne(e, t, a);
    }
  }
  function Ja(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(a) : n.current = a;
      }
    } catch (i) {
      Ne(e, t, i);
    }
  }
  function Jt(e, t) {
    var n = e.ref, a = e.refCleanup;
    if (n !== null) if (typeof a == "function") try {
      a();
    } catch (i) {
      Ne(e, t, i);
    } finally {
      e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
    }
    else if (typeof n == "function") try {
      n(null);
    } catch (i) {
      Ne(e, t, i);
    }
    else n.current = null;
  }
  function Wh(e) {
    var t = e.type, n = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (i) {
      Ne(e, e.return, i);
    }
  }
  function nu(e, t, n) {
    try {
      var a = e.stateNode;
      _b(a, e.type, n, t), a[ht] = t;
    } catch (i) {
      Ne(e, e.return, i);
    }
  }
  function Qh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && qn(e.type) || e.tag === 4;
  }
  function ru(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Qh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && qn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function au(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = on));
    else if (a !== 4 && (a === 27 && qn(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (au(e, t, n), e = e.sibling; e !== null; ) au(e, t, n), e = e.sibling;
  }
  function Si(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && qn(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Si(e, t, n), e = e.sibling; e !== null; ) Si(e, t, n), e = e.sibling;
  }
  function Kh(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
      rt(t, a, n), t[Je] = e, t[ht] = n;
    } catch (u) {
      Ne(e, e.return, u);
    }
  }
  var yn = false, Ge = false, su = false, Xh = typeof WeakSet == "function" ? WeakSet : Set, Ze = null;
  function vb(e, t) {
    if (e = e.containerInfo, Pu = $i, e = lf(e), Zo(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var a = n.getSelection && n.getSelection();
        if (a && a.rangeCount !== 0) {
          n = a.anchorNode;
          var i = a.anchorOffset, u = a.focusNode;
          a = a.focusOffset;
          try {
            n.nodeType, u.nodeType;
          } catch {
            n = null;
            break e;
          }
          var f = 0, y = -1, w = -1, E = 0, R = 0, I = e, j = null;
          t: for (; ; ) {
            for (var A; I !== n || i !== 0 && I.nodeType !== 3 || (y = f + i), I !== u || a !== 0 && I.nodeType !== 3 || (w = f + a), I.nodeType === 3 && (f += I.nodeValue.length), (A = I.firstChild) !== null; ) j = I, I = A;
            for (; ; ) {
              if (I === e) break t;
              if (j === n && ++E === i && (y = f), j === u && ++R === a && (w = f), (A = I.nextSibling) !== null) break;
              I = j, j = I.parentNode;
            }
            I = A;
          }
          n = y === -1 || w === -1 ? null : { start: y, end: w };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Eu = { focusedElem: e, selectionRange: n }, $i = false, Ze = t; Ze !== null; ) if (t = Ze, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ze = e;
    else for (; Ze !== null; ) {
      switch (t = Ze, u = t.alternate, e = t.flags, t.tag) {
        case 0:
          if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if ((e & 1024) !== 0 && u !== null) {
            e = void 0, n = t, i = u.memoizedProps, u = u.memoizedState, a = n.stateNode;
            try {
              var K = vr(n.type, i);
              e = a.getSnapshotBeforeUpdate(K, u), a.__reactInternalSnapshotBeforeUpdate = e;
            } catch (re) {
              Ne(n, n.return, re);
            }
          }
          break;
        case 3:
          if ((e & 1024) !== 0) {
            if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) Lu(e);
            else if (n === 1) switch (e.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                Lu(e);
                break;
              default:
                e.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if ((e & 1024) !== 0) throw Error(l(163));
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, Ze = e;
        break;
      }
      Ze = t.return;
    }
  }
  function Yh(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        bn(e, n), a & 4 && Za(5, n);
        break;
      case 1:
        if (bn(e, n), a & 4) if (e = n.stateNode, t === null) try {
          e.componentDidMount();
        } catch (f) {
          Ne(n, n.return, f);
        }
        else {
          var i = vr(n.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (f) {
            Ne(n, n.return, f);
          }
        }
        a & 64 && qh(n), a & 512 && Ja(n, n.return);
        break;
      case 3:
        if (bn(e, n), a & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null) switch (n.child.tag) {
            case 27:
            case 5:
              t = n.child.stateNode;
              break;
            case 1:
              t = n.child.stateNode;
          }
          try {
            zf(e, t);
          } catch (f) {
            Ne(n, n.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Kh(n);
      case 26:
      case 5:
        bn(e, n), t === null && a & 4 && Wh(n), a & 512 && Ja(n, n.return);
        break;
      case 12:
        bn(e, n);
        break;
      case 31:
        bn(e, n), a & 4 && ep(e, n);
        break;
      case 13:
        bn(e, n), a & 4 && tp(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Eb.bind(null, n), Wb(e, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || yn, !a) {
          t = t !== null && t.memoizedState !== null || Ge, i = yn;
          var u = Ge;
          yn = a, (Ge = t) && !u ? xn(e, n, (n.subtreeFlags & 8772) !== 0) : bn(e, n), yn = i, Ge = u;
        }
        break;
      case 30:
        break;
      default:
        bn(e, n);
    }
  }
  function Zh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Zh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && zo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ie = null, mt = false;
  function vn(e, t, n) {
    for (n = n.child; n !== null; ) Jh(e, t, n), n = n.sibling;
  }
  function Jh(e, t, n) {
    if (wt && typeof wt.onCommitFiberUnmount == "function") try {
      wt.onCommitFiberUnmount(Sa, n);
    } catch {
    }
    switch (n.tag) {
      case 26:
        Ge || Jt(n, t), vn(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ge || Jt(n, t);
        var a = Ie, i = mt;
        qn(n.type) && (Ie = n.stateNode, mt = false), vn(e, t, n), ls(n.stateNode), Ie = a, mt = i;
        break;
      case 5:
        Ge || Jt(n, t);
      case 6:
        if (a = Ie, i = mt, Ie = null, vn(e, t, n), Ie = a, mt = i, Ie !== null) if (mt) try {
          (Ie.nodeType === 9 ? Ie.body : Ie.nodeName === "HTML" ? Ie.ownerDocument.body : Ie).removeChild(n.stateNode);
        } catch (u) {
          Ne(n, t, u);
        }
        else try {
          Ie.removeChild(n.stateNode);
        } catch (u) {
          Ne(n, t, u);
        }
        break;
      case 18:
        Ie !== null && (mt ? (e = Ie, qp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), ua(e)) : qp(Ie, n.stateNode));
        break;
      case 4:
        a = Ie, i = mt, Ie = n.stateNode.containerInfo, mt = true, vn(e, t, n), Ie = a, mt = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Dn(2, n, t), Ge || Dn(4, n, t), vn(e, t, n);
        break;
      case 1:
        Ge || (Jt(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && Gh(n, t, a)), vn(e, t, n);
        break;
      case 21:
        vn(e, t, n);
        break;
      case 22:
        Ge = (a = Ge) || n.memoizedState !== null, vn(e, t, n), Ge = a;
        break;
      default:
        vn(e, t, n);
    }
  }
  function ep(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ua(e);
      } catch (n) {
        Ne(t, t.return, n);
      }
    }
  }
  function tp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
      ua(e);
    } catch (n) {
      Ne(t, t.return, n);
    }
  }
  function bb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Xh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xh()), t;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Ni(e, t) {
    var n = bb(e);
    t.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var i = Tb.bind(null, e, a);
        a.then(i, i);
      }
    });
  }
  function gt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var a = 0; a < n.length; a++) {
      var i = n[a], u = e, f = t, y = f;
      e: for (; y !== null; ) {
        switch (y.tag) {
          case 27:
            if (qn(y.type)) {
              Ie = y.stateNode, mt = false;
              break e;
            }
            break;
          case 5:
            Ie = y.stateNode, mt = false;
            break e;
          case 3:
          case 4:
            Ie = y.stateNode.containerInfo, mt = true;
            break e;
        }
        y = y.return;
      }
      if (Ie === null) throw Error(l(160));
      Jh(u, f, i), Ie = null, mt = false, u = i.alternate, u !== null && (u.return = null), i.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) np(t, e), t = t.sibling;
  }
  var $t = null;
  function np(e, t) {
    var n = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        gt(t, e), yt(e), a & 4 && (Dn(3, e, e.return), Za(3, e), Dn(5, e, e.return));
        break;
      case 1:
        gt(t, e), yt(e), a & 512 && (Ge || n === null || Jt(n, n.return)), a & 64 && yn && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var i = $t;
        if (gt(t, e), yt(e), a & 512 && (Ge || n === null || Jt(n, n.return)), a & 4) {
          var u = n !== null ? n.memoizedState : null;
          if (a = e.memoizedState, n === null) if (a === null) if (e.stateNode === null) {
            e: {
              a = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
              t: switch (a) {
                case "title":
                  u = i.getElementsByTagName("title")[0], (!u || u[Pa] || u[Je] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = i.createElement(a), i.head.insertBefore(u, i.querySelector("head > title"))), rt(u, a, n), u[Je] = e, Ye(u), a = u;
                  break e;
                case "link":
                  var f = nm("link", "href", i).get(a + (n.href || ""));
                  if (f) {
                    for (var y = 0; y < f.length; y++) if (u = f[y], u.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && u.getAttribute("rel") === (n.rel == null ? null : n.rel) && u.getAttribute("title") === (n.title == null ? null : n.title) && u.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                      f.splice(y, 1);
                      break t;
                    }
                  }
                  u = i.createElement(a), rt(u, a, n), i.head.appendChild(u);
                  break;
                case "meta":
                  if (f = nm("meta", "content", i).get(a + (n.content || ""))) {
                    for (y = 0; y < f.length; y++) if (u = f[y], u.getAttribute("content") === (n.content == null ? null : "" + n.content) && u.getAttribute("name") === (n.name == null ? null : n.name) && u.getAttribute("property") === (n.property == null ? null : n.property) && u.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && u.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                      f.splice(y, 1);
                      break t;
                    }
                  }
                  u = i.createElement(a), rt(u, a, n), i.head.appendChild(u);
                  break;
                default:
                  throw Error(l(468, a));
              }
              u[Je] = e, Ye(u), a = u;
            }
            e.stateNode = a;
          } else rm(i, e.type, e.stateNode);
          else e.stateNode = tm(i, a, e.memoizedProps);
          else u !== a ? (u === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : u.count--, a === null ? rm(i, e.type, e.stateNode) : tm(i, a, e.memoizedProps)) : a === null && e.stateNode !== null && nu(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        gt(t, e), yt(e), a & 512 && (Ge || n === null || Jt(n, n.return)), n !== null && a & 4 && nu(e, e.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (gt(t, e), yt(e), a & 512 && (Ge || n === null || Jt(n, n.return)), e.flags & 32) {
          i = e.stateNode;
          try {
            Rr(i, "");
          } catch (K) {
            Ne(e, e.return, K);
          }
        }
        a & 4 && e.stateNode != null && (i = e.memoizedProps, nu(e, i, n !== null ? n.memoizedProps : i)), a & 1024 && (su = true);
        break;
      case 6:
        if (gt(t, e), yt(e), a & 4) {
          if (e.stateNode === null) throw Error(l(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (K) {
            Ne(e, e.return, K);
          }
        }
        break;
      case 3:
        if (Vi = null, i = $t, $t = Di(t.containerInfo), gt(t, e), $t = i, yt(e), a & 4 && n !== null && n.memoizedState.isDehydrated) try {
          ua(t.containerInfo);
        } catch (K) {
          Ne(e, e.return, K);
        }
        su && (su = false, rp(e));
        break;
      case 4:
        a = $t, $t = Di(e.stateNode.containerInfo), gt(t, e), yt(e), $t = a;
        break;
      case 12:
        gt(t, e), yt(e);
        break;
      case 31:
        gt(t, e), yt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ni(e, a)));
        break;
      case 13:
        gt(t, e), yt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Pi = xt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ni(e, a)));
        break;
      case 22:
        i = e.memoizedState !== null;
        var w = n !== null && n.memoizedState !== null, E = yn, R = Ge;
        if (yn = E || i, Ge = R || w, gt(t, e), Ge = R, yn = E, yt(e), a & 8192) e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || w || yn || Ge || br(e)), n = null, t = e; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (n === null) {
              w = n = t;
              try {
                if (u = w.stateNode, i) f = u.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  y = w.stateNode;
                  var I = w.memoizedProps.style, j = I != null && I.hasOwnProperty("display") ? I.display : null;
                  y.style.display = j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                }
              } catch (K) {
                Ne(w, w.return, K);
              }
            }
          } else if (t.tag === 6) {
            if (n === null) {
              w = t;
              try {
                w.stateNode.nodeValue = i ? "" : w.memoizedProps;
              } catch (K) {
                Ne(w, w.return, K);
              }
            }
          } else if (t.tag === 18) {
            if (n === null) {
              w = t;
              try {
                var A = w.stateNode;
                i ? Gp(A, true) : Gp(w.stateNode, false);
              } catch (K) {
                Ne(w, w.return, K);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            n === t && (n = null), t = t.return;
          }
          n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
        }
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, Ni(e, n))));
        break;
      case 19:
        gt(t, e), yt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ni(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        gt(t, e), yt(e);
    }
  }
  function yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (Qh(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(l(160));
        switch (n.tag) {
          case 27:
            var i = n.stateNode, u = ru(e);
            Si(e, u, i);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (Rr(f, ""), n.flags &= -33);
            var y = ru(e);
            Si(e, y, f);
            break;
          case 3:
          case 4:
            var w = n.stateNode.containerInfo, E = ru(e);
            au(e, E, w);
            break;
          default:
            throw Error(l(161));
        }
      } catch (R) {
        Ne(e, e.return, R);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function rp(e) {
    if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
      var t = e;
      rp(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
    }
  }
  function bn(e, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) Yh(e, t.alternate, t), t = t.sibling;
  }
  function br(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Dn(4, t, t.return), br(t);
          break;
        case 1:
          Jt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Gh(t, t.return, n), br(t);
          break;
        case 27:
          ls(t.stateNode);
        case 26:
        case 5:
          Jt(t, t.return), br(t);
          break;
        case 22:
          t.memoizedState === null && br(t);
          break;
        case 30:
          br(t);
          break;
        default:
          br(t);
      }
      e = e.sibling;
    }
  }
  function xn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, i = e, u = t, f = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          xn(i, u, n), Za(4, u);
          break;
        case 1:
          if (xn(i, u, n), a = u, i = a.stateNode, typeof i.componentDidMount == "function") try {
            i.componentDidMount();
          } catch (E) {
            Ne(a, a.return, E);
          }
          if (a = u, i = a.updateQueue, i !== null) {
            var y = a.stateNode;
            try {
              var w = i.shared.hiddenCallbacks;
              if (w !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < w.length; i++) If(w[i], y);
            } catch (E) {
              Ne(a, a.return, E);
            }
          }
          n && f & 64 && qh(u), Ja(u, u.return);
          break;
        case 27:
          Kh(u);
        case 26:
        case 5:
          xn(i, u, n), n && a === null && f & 4 && Wh(u), Ja(u, u.return);
          break;
        case 12:
          xn(i, u, n);
          break;
        case 31:
          xn(i, u, n), n && f & 4 && ep(i, u);
          break;
        case 13:
          xn(i, u, n), n && f & 4 && tp(i, u);
          break;
        case 22:
          u.memoizedState === null && xn(i, u, n), Ja(u, u.return);
          break;
        case 30:
          break;
        default:
          xn(i, u, n);
      }
      t = t.sibling;
    }
  }
  function iu(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && _a(n));
  }
  function ou(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _a(e));
  }
  function qt(e, t, n, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) ap(e, t, n, a), t = t.sibling;
  }
  function ap(e, t, n, a) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        qt(e, t, n, a), i & 2048 && Za(9, t);
        break;
      case 1:
        qt(e, t, n, a);
        break;
      case 3:
        qt(e, t, n, a), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _a(e)));
        break;
      case 12:
        if (i & 2048) {
          qt(e, t, n, a), e = t.stateNode;
          try {
            var u = t.memoizedProps, f = u.id, y = u.onPostCommit;
            typeof y == "function" && y(f, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
          } catch (w) {
            Ne(t, t.return, w);
          }
        } else qt(e, t, n, a);
        break;
      case 31:
        qt(e, t, n, a);
        break;
      case 13:
        qt(e, t, n, a);
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, f = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? qt(e, t, n, a) : es(e, t) : u._visibility & 2 ? qt(e, t, n, a) : (u._visibility |= 2, Zr(e, t, n, a, (t.subtreeFlags & 10256) !== 0 || false)), i & 2048 && iu(f, t);
        break;
      case 24:
        qt(e, t, n, a), i & 2048 && ou(t.alternate, t);
        break;
      default:
        qt(e, t, n, a);
    }
  }
  function Zr(e, t, n, a, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var u = e, f = t, y = n, w = a, E = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Zr(u, f, y, w, i), Za(8, f);
          break;
        case 23:
          break;
        case 22:
          var R = f.stateNode;
          f.memoizedState !== null ? R._visibility & 2 ? Zr(u, f, y, w, i) : es(u, f) : (R._visibility |= 2, Zr(u, f, y, w, i)), i && E & 2048 && iu(f.alternate, f);
          break;
        case 24:
          Zr(u, f, y, w, i), i && E & 2048 && ou(f.alternate, f);
          break;
        default:
          Zr(u, f, y, w, i);
      }
      t = t.sibling;
    }
  }
  function es(e, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var n = e, a = t, i = a.flags;
      switch (a.tag) {
        case 22:
          es(n, a), i & 2048 && iu(a.alternate, a);
          break;
        case 24:
          es(n, a), i & 2048 && ou(a.alternate, a);
          break;
        default:
          es(n, a);
      }
      t = t.sibling;
    }
  }
  var ts = 8192;
  function Jr(e, t, n) {
    if (e.subtreeFlags & ts) for (e = e.child; e !== null; ) sp(e, t, n), e = e.sibling;
  }
  function sp(e, t, n) {
    switch (e.tag) {
      case 26:
        Jr(e, t, n), e.flags & ts && e.memoizedState !== null && sx(n, $t, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Jr(e, t, n);
        break;
      case 3:
      case 4:
        var a = $t;
        $t = Di(e.stateNode.containerInfo), Jr(e, t, n), $t = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = ts, ts = 16777216, Jr(e, t, n), ts = a) : Jr(e, t, n));
        break;
      default:
        Jr(e, t, n);
    }
  }
  function ip(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ns(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null) for (var n = 0; n < t.length; n++) {
        var a = t[n];
        Ze = a, lp(a, e);
      }
      ip(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) op(e), e = e.sibling;
  }
  function op(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ns(e), e.flags & 2048 && Dn(9, e, e.return);
        break;
      case 3:
        ns(e);
        break;
      case 12:
        ns(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ci(e)) : ns(e);
        break;
      default:
        ns(e);
    }
  }
  function Ci(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null) for (var n = 0; n < t.length; n++) {
        var a = t[n];
        Ze = a, lp(a, e);
      }
      ip(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Dn(8, t, t.return), Ci(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ci(t));
          break;
        default:
          Ci(t);
      }
      e = e.sibling;
    }
  }
  function lp(e, t) {
    for (; Ze !== null; ) {
      var n = Ze;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Dn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          _a(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, Ze = a;
      else e: for (n = e; Ze !== null; ) {
        a = Ze;
        var i = a.sibling, u = a.return;
        if (Zh(a), a === n) {
          Ze = null;
          break e;
        }
        if (i !== null) {
          i.return = u, Ze = i;
          break e;
        }
        Ze = u;
      }
    }
  }
  var xb = { getCacheForType: function(e) {
    var t = tt(He), n = t.data.get(e);
    return n === void 0 && (n = e(), t.data.set(e, n)), n;
  }, cacheSignal: function() {
    return tt(He).controller.signal;
  } }, wb = typeof WeakMap == "function" ? WeakMap : Map, be = 0, je = null, ue = null, de = 0, Se = 0, Et = null, _n = false, ea = false, lu = false, wn = 0, Fe = 0, Vn = 0, xr = 0, uu = 0, Tt = 0, ta = 0, rs = null, vt = null, cu = false, Pi = 0, up = 0, Ei = 1 / 0, Ti = null, Bn = null, Qe = 0, Un = null, na = null, kn = 0, du = 0, fu = null, cp = null, as = 0, hu = null;
  function jt() {
    return (be & 2) !== 0 && de !== 0 ? de & -de : L.T !== null ? bu() : Cd();
  }
  function dp() {
    if (Tt === 0) if ((de & 536870912) === 0 || pe) {
      var e = Os;
      Os <<= 1, (Os & 3932160) === 0 && (Os = 262144), Tt = e;
    } else Tt = 536870912;
    return e = Ct.current, e !== null && (e.flags |= 32), Tt;
  }
  function bt(e, t, n) {
    (e === je && (Se === 2 || Se === 9) || e.cancelPendingCommit !== null) && (ra(e, 0), Hn(e, de, Tt, false)), Ca(e, n), ((be & 2) === 0 || e !== je) && (e === je && ((be & 2) === 0 && (xr |= n), Fe === 4 && Hn(e, de, Tt, false)), en(e));
  }
  function fp(e, t, n) {
    if ((be & 6) !== 0) throw Error(l(327));
    var a = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Na(e, t), i = a ? Nb(e, t) : mu(e, t, true), u = a;
    do {
      if (i === 0) {
        ea && !a && Hn(e, t, 0, false);
        break;
      } else {
        if (n = e.current.alternate, u && !kb(n)) {
          i = mu(e, t, false), u = false;
          continue;
        }
        if (i === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u) var f = 0;
          else f = e.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            e: {
              var y = e;
              i = rs;
              var w = y.current.memoizedState.isDehydrated;
              if (w && (ra(y, f).flags |= 256), f = mu(y, f, false), f !== 2) {
                if (lu && !w) {
                  y.errorRecoveryDisabledLanes |= u, xr |= u, i = 4;
                  break e;
                }
                u = vt, vt = i, u !== null && (vt === null ? vt = u : vt.push.apply(vt, u));
              }
              i = f;
            }
            if (u = false, i !== 2) continue;
          }
        }
        if (i === 1) {
          ra(e, 0), Hn(e, t, 0, true);
          break;
        }
        e: {
          switch (a = e, u = i, u) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Hn(a, t, Tt, !_n);
              break e;
            case 2:
              vt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((t & 62914560) === t && (i = Pi + 300 - xt(), 10 < i)) {
            if (Hn(a, t, Tt, !_n), Ds(a, 0, true) !== 0) break e;
            kn = t, a.timeoutHandle = Hp(hp.bind(null, a, n, vt, Ti, cu, t, Tt, xr, ta, _n, u, "Throttled", -0, 0), i);
            break e;
          }
          hp(a, n, vt, Ti, cu, t, Tt, xr, ta, _n, u, null, -0, 0);
        }
      }
      break;
    } while (true);
    en(e);
  }
  function hp(e, t, n, a, i, u, f, y, w, E, R, I, j, A) {
    if (e.timeoutHandle = -1, I = t.subtreeFlags, I & 8192 || (I & 16785408) === 16785408) {
      I = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: on }, sp(t, u, I);
      var K = (u & 62914560) === u ? Pi - xt() : (u & 4194048) === u ? up - xt() : 0;
      if (K = ix(I, K), K !== null) {
        kn = u, e.cancelPendingCommit = K(wp.bind(null, e, t, u, n, a, i, f, y, w, R, I, null, j, A)), Hn(e, u, f, !E);
        return;
      }
    }
    wp(e, t, u, n, a, i, f, y, w);
  }
  function kb(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var a = 0; a < n.length; a++) {
        var i = n[a], u = i.getSnapshot;
        i = i.value;
        try {
          if (!St(u(), i)) return false;
        } catch {
          return false;
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return true;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return true;
  }
  function Hn(e, t, n, a) {
    t &= ~uu, t &= ~xr, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var u = 31 - kt(i), f = 1 << u;
      a[u] = -1, i &= ~f;
    }
    n !== 0 && kd(e, n, t);
  }
  function ji() {
    return (be & 6) === 0 ? (ss(0), false) : true;
  }
  function pu() {
    if (ue !== null) {
      if (Se === 0) var e = ue.return;
      else e = ue, dn = dr = null, Ll(e), Wr = null, Ba = 0, e = ue;
      for (; e !== null; ) $h(e.alternate, e), e = e.return;
      ue = null;
    }
  }
  function ra(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, Ub(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), kn = 0, pu(), je = e, ue = n = un(e.current, null), de = t, Se = 0, Et = null, _n = false, ea = Na(e, t), lu = false, ta = Tt = uu = xr = Vn = Fe = 0, vt = rs = null, cu = false, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0) for (e = e.entanglements, a &= t; 0 < a; ) {
      var i = 31 - kt(a), u = 1 << i;
      t |= e[i], a &= ~u;
    }
    return wn = t, Xs(), n;
  }
  function pp(e, t) {
    ie = null, L.H = Ka, t === Gr || t === ai ? (t = Lf(), Se = 3) : t === vl ? (t = Lf(), Se = 4) : Se = t === Gl ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Et = t, ue === null && (Fe = 1, vi(e, Rt(t, e.current)));
  }
  function mp() {
    var e = Ct.current;
    return e === null ? true : (de & 4194048) === de ? Ht === null : (de & 62914560) === de || (de & 536870912) !== 0 ? e === Ht : false;
  }
  function gp() {
    var e = L.H;
    return L.H = Ka, e === null ? Ka : e;
  }
  function yp() {
    var e = L.A;
    return L.A = xb, e;
  }
  function Li() {
    Fe = 4, _n || (de & 4194048) !== de && Ct.current !== null || (ea = true), (Vn & 134217727) === 0 && (xr & 134217727) === 0 || je === null || Hn(je, de, Tt, false);
  }
  function mu(e, t, n) {
    var a = be;
    be |= 2;
    var i = gp(), u = yp();
    (je !== e || de !== t) && (Ti = null, ra(e, t)), t = false;
    var f = Fe;
    e: do
      try {
        if (Se !== 0 && ue !== null) {
          var y = ue, w = Et;
          switch (Se) {
            case 8:
              pu(), f = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ct.current === null && (t = true);
              var E = Se;
              if (Se = 0, Et = null, aa(e, y, w, E), n && ea) {
                f = 0;
                break e;
              }
              break;
            default:
              E = Se, Se = 0, Et = null, aa(e, y, w, E);
          }
        }
        Sb(), f = Fe;
        break;
      } catch (R) {
        pp(e, R);
      }
    while (true);
    return t && e.shellSuspendCounter++, dn = dr = null, be = a, L.H = i, L.A = u, ue === null && (je = null, de = 0, Xs()), f;
  }
  function Sb() {
    for (; ue !== null; ) vp(ue);
  }
  function Nb(e, t) {
    var n = be;
    be |= 2;
    var a = gp(), i = yp();
    je !== e || de !== t ? (Ti = null, Ei = xt() + 500, ra(e, t)) : ea = Na(e, t);
    e: do
      try {
        if (Se !== 0 && ue !== null) {
          t = ue;
          var u = Et;
          t: switch (Se) {
            case 1:
              Se = 0, Et = null, aa(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Tf(u)) {
                Se = 0, Et = null, bp(t);
                break;
              }
              t = function() {
                Se !== 2 && Se !== 9 || je !== e || (Se = 7), en(e);
              }, u.then(t, t);
              break e;
            case 3:
              Se = 7;
              break e;
            case 4:
              Se = 5;
              break e;
            case 7:
              Tf(u) ? (Se = 0, Et = null, bp(t)) : (Se = 0, Et = null, aa(e, t, u, 7));
              break;
            case 5:
              var f = null;
              switch (ue.tag) {
                case 26:
                  f = ue.memoizedState;
                case 5:
                case 27:
                  var y = ue;
                  if (f ? am(f) : y.stateNode.complete) {
                    Se = 0, Et = null;
                    var w = y.sibling;
                    if (w !== null) ue = w;
                    else {
                      var E = y.return;
                      E !== null ? (ue = E, Ai(E)) : ue = null;
                    }
                    break t;
                  }
              }
              Se = 0, Et = null, aa(e, t, u, 5);
              break;
            case 6:
              Se = 0, Et = null, aa(e, t, u, 6);
              break;
            case 8:
              pu(), Fe = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Cb();
        break;
      } catch (R) {
        pp(e, R);
      }
    while (true);
    return dn = dr = null, L.H = a, L.A = i, be = n, ue !== null ? 0 : (je = null, de = 0, Xs(), Fe);
  }
  function Cb() {
    for (; ue !== null && !Qv(); ) vp(ue);
  }
  function vp(e) {
    var t = Uh(e.alternate, e, wn);
    e.memoizedProps = e.pendingProps, t === null ? Ai(e) : ue = t;
  }
  function bp(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Oh(n, t, t.pendingProps, t.type, void 0, de);
        break;
      case 11:
        t = Oh(n, t, t.pendingProps, t.type.render, t.ref, de);
        break;
      case 5:
        Ll(t);
      default:
        $h(n, t), t = ue = yf(t, wn), t = Uh(n, t, wn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ai(e) : ue = t;
  }
  function aa(e, t, n, a) {
    dn = dr = null, Ll(t), Wr = null, Ba = 0;
    var i = t.return;
    try {
      if (hb(e, i, t, n, de)) {
        Fe = 1, vi(e, Rt(n, e.current)), ue = null;
        return;
      }
    } catch (u) {
      if (i !== null) throw ue = i, u;
      Fe = 1, vi(e, Rt(n, e.current)), ue = null;
      return;
    }
    t.flags & 32768 ? (pe || a === 1 ? e = true : ea || (de & 536870912) !== 0 ? e = false : (_n = e = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Ct.current, a !== null && a.tag === 13 && (a.flags |= 16384))), xp(t, e)) : Ai(t);
  }
  function Ai(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        xp(t, _n);
        return;
      }
      e = t.return;
      var n = gb(t.alternate, t, wn);
      if (n !== null) {
        ue = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function xp(e, t) {
    do {
      var n = yb(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ue = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ue = e;
        return;
      }
      ue = e = n;
    } while (e !== null);
    Fe = 6, ue = null;
  }
  function wp(e, t, n, a, i, u, f, y, w) {
    e.cancelPendingCommit = null;
    do
      Ri();
    while (Qe !== 0);
    if ((be & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (u = t.lanes | t.childLanes, u |= rl, a0(e, n, u, f, y, w), e === je && (ue = je = null, de = 0), na = t, Un = e, kn = n, du = u, fu = i, cp = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, jb(Is, function() {
        return Pp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = L.T, L.T = null, i = $.p, $.p = 2, f = be, be |= 4;
        try {
          vb(e, t, n);
        } finally {
          be = f, $.p = i, L.T = a;
        }
      }
      Qe = 1, kp(), Sp(), Np();
    }
  }
  function kp() {
    if (Qe === 1) {
      Qe = 0;
      var e = Un, t = na, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = L.T, L.T = null;
        var a = $.p;
        $.p = 2;
        var i = be;
        be |= 4;
        try {
          np(t, e);
          var u = Eu, f = lf(e.containerInfo), y = u.focusedElem, w = u.selectionRange;
          if (f !== y && y && y.ownerDocument && of(y.ownerDocument.documentElement, y)) {
            if (w !== null && Zo(y)) {
              var E = w.start, R = w.end;
              if (R === void 0 && (R = E), "selectionStart" in y) y.selectionStart = E, y.selectionEnd = Math.min(R, y.value.length);
              else {
                var I = y.ownerDocument || document, j = I && I.defaultView || window;
                if (j.getSelection) {
                  var A = j.getSelection(), K = y.textContent.length, re = Math.min(w.start, K), Ee = w.end === void 0 ? re : Math.min(w.end, K);
                  !A.extend && re > Ee && (f = Ee, Ee = re, re = f);
                  var C = sf(y, re), S = sf(y, Ee);
                  if (C && S && (A.rangeCount !== 1 || A.anchorNode !== C.node || A.anchorOffset !== C.offset || A.focusNode !== S.node || A.focusOffset !== S.offset)) {
                    var P = I.createRange();
                    P.setStart(C.node, C.offset), A.removeAllRanges(), re > Ee ? (A.addRange(P), A.extend(S.node, S.offset)) : (P.setEnd(S.node, S.offset), A.addRange(P));
                  }
                }
              }
            }
            for (I = [], A = y; A = A.parentNode; ) A.nodeType === 1 && I.push({ element: A, left: A.scrollLeft, top: A.scrollTop });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < I.length; y++) {
              var M = I[y];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          $i = !!Pu, Eu = Pu = null;
        } finally {
          be = i, $.p = a, L.T = n;
        }
      }
      e.current = t, Qe = 2;
    }
  }
  function Sp() {
    if (Qe === 2) {
      Qe = 0;
      var e = Un, t = na, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = L.T, L.T = null;
        var a = $.p;
        $.p = 2;
        var i = be;
        be |= 4;
        try {
          Yh(e, t.alternate, t);
        } finally {
          be = i, $.p = a, L.T = n;
        }
      }
      Qe = 3;
    }
  }
  function Np() {
    if (Qe === 4 || Qe === 3) {
      Qe = 0, Kv();
      var e = Un, t = na, n = kn, a = cp;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Qe = 5 : (Qe = 0, na = Un = null, Cp(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (i === 0 && (Bn = null), Mo(n), t = t.stateNode, wt && typeof wt.onCommitFiberRoot == "function") try {
        wt.onCommitFiberRoot(Sa, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (a !== null) {
        t = L.T, i = $.p, $.p = 2, L.T = null;
        try {
          for (var u = e.onRecoverableError, f = 0; f < a.length; f++) {
            var y = a[f];
            u(y.value, { componentStack: y.stack });
          }
        } finally {
          L.T = t, $.p = i;
        }
      }
      (kn & 3) !== 0 && Ri(), en(e), i = e.pendingLanes, (n & 261930) !== 0 && (i & 42) !== 0 ? e === hu ? as++ : (as = 0, hu = e) : as = 0, ss(0);
    }
  }
  function Cp(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, _a(t)));
  }
  function Ri() {
    return kp(), Sp(), Np(), Pp();
  }
  function Pp() {
    if (Qe !== 5) return false;
    var e = Un, t = du;
    du = 0;
    var n = Mo(kn), a = L.T, i = $.p;
    try {
      $.p = 32 > n ? 32 : n, L.T = null, n = fu, fu = null;
      var u = Un, f = kn;
      if (Qe = 0, na = Un = null, kn = 0, (be & 6) !== 0) throw Error(l(331));
      var y = be;
      if (be |= 4, op(u.current), ap(u, u.current, f, n), be = y, ss(0, false), wt && typeof wt.onPostCommitFiberRoot == "function") try {
        wt.onPostCommitFiberRoot(Sa, u);
      } catch {
      }
      return true;
    } finally {
      $.p = i, L.T = a, Cp(e, t);
    }
  }
  function Ep(e, t, n) {
    t = Rt(n, t), t = ql(e.stateNode, t, 2), e = zn(e, t, 2), e !== null && (Ca(e, 2), en(e));
  }
  function Ne(e, t, n) {
    if (e.tag === 3) Ep(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Ep(t, e, n);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Bn === null || !Bn.has(a))) {
          e = Rt(n, e), n = Th(2), a = zn(t, n, 2), a !== null && (jh(n, a, t, e), Ca(a, 2), en(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function gu(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new wb();
      var i = /* @__PURE__ */ new Set();
      a.set(t, i);
    } else i = a.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), a.set(t, i));
    i.has(n) || (lu = true, i.add(n), e = Pb.bind(null, e, t, n), t.then(e, e));
  }
  function Pb(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, je === e && (de & n) === n && (Fe === 4 || Fe === 3 && (de & 62914560) === de && 300 > xt() - Pi ? (be & 2) === 0 && ra(e, 0) : uu |= n, ta === de && (ta = 0)), en(e);
  }
  function Tp(e, t) {
    t === 0 && (t = wd()), e = lr(e, t), e !== null && (Ca(e, t), en(e));
  }
  function Eb(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Tp(e, n);
  }
  function Tb(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    a !== null && a.delete(t), Tp(e, n);
  }
  function jb(e, t) {
    return jo(e, t);
  }
  var Mi = null, sa = null, yu = false, Ii = false, vu = false, $n = 0;
  function en(e) {
    e !== sa && e.next === null && (sa === null ? Mi = sa = e : sa = sa.next = e), Ii = true, yu || (yu = true, Ab());
  }
  function ss(e, t) {
    if (!vu && Ii) {
      vu = true;
      do
        for (var n = false, a = Mi; a !== null; ) {
          if (e !== 0) {
            var i = a.pendingLanes;
            if (i === 0) var u = 0;
            else {
              var f = a.suspendedLanes, y = a.pingedLanes;
              u = (1 << 31 - kt(42 | e) + 1) - 1, u &= i & ~(f & ~y), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = true, Rp(a, u));
          } else u = de, u = Ds(a, a === je ? u : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (u & 3) === 0 || Na(a, u) || (n = true, Rp(a, u));
          a = a.next;
        }
      while (n);
      vu = false;
    }
  }
  function Lb() {
    jp();
  }
  function jp() {
    Ii = yu = false;
    var e = 0;
    $n !== 0 && Bb() && (e = $n);
    for (var t = xt(), n = null, a = Mi; a !== null; ) {
      var i = a.next, u = Lp(a, t);
      u === 0 ? (a.next = null, n === null ? Mi = i : n.next = i, i === null && (sa = n)) : (n = a, (e !== 0 || (u & 3) !== 0) && (Ii = true)), a = i;
    }
    Qe !== 0 && Qe !== 5 || ss(e), $n !== 0 && ($n = 0);
  }
  function Lp(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, i = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var f = 31 - kt(u), y = 1 << f, w = i[f];
      w === -1 ? ((y & n) === 0 || (y & a) !== 0) && (i[f] = r0(y, t)) : w <= t && (e.expiredLanes |= y), u &= ~y;
    }
    if (t = je, n = de, n = Ds(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a = e.callbackNode, n === 0 || e === t && (Se === 2 || Se === 9) || e.cancelPendingCommit !== null) return a !== null && a !== null && Lo(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Na(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && Lo(a), Mo(n)) {
        case 2:
        case 8:
          n = bd;
          break;
        case 32:
          n = Is;
          break;
        case 268435456:
          n = xd;
          break;
        default:
          n = Is;
      }
      return a = Ap.bind(null, e), n = jo(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && Lo(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ap(e, t) {
    if (Qe !== 0 && Qe !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Ri() && e.callbackNode !== n) return null;
    var a = de;
    return a = Ds(e, e === je ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a === 0 ? null : (fp(e, a, t), Lp(e, xt()), e.callbackNode != null && e.callbackNode === n ? Ap.bind(null, e) : null);
  }
  function Rp(e, t) {
    if (Ri()) return null;
    fp(e, t, true);
  }
  function Ab() {
    Hb(function() {
      (be & 6) !== 0 ? jo(vd, Lb) : jp();
    });
  }
  function bu() {
    if ($n === 0) {
      var e = $r;
      e === 0 && (e = zs, zs <<= 1, (zs & 261888) === 0 && (zs = 256)), $n = e;
    }
    return $n;
  }
  function Mp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Us("" + e);
  }
  function Ip(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Rb(e, t, n, a, i) {
    if (t === "submit" && n && n.stateNode === i) {
      var u = Mp((i[ht] || null).action), f = a.submitter;
      f && (t = (t = f[ht] || null) ? Mp(t.formAction) : f.getAttribute("formAction"), t !== null && (u = t, f = null));
      var y = new Gs("action", "action", null, a, i);
      e.push({ event: y, listeners: [{ instance: null, listener: function() {
        if (a.defaultPrevented) {
          if ($n !== 0) {
            var w = f ? Ip(i, f) : new FormData(i);
            _l(n, { pending: true, data: w, method: i.method, action: u }, null, w);
          }
        } else typeof u == "function" && (y.preventDefault(), w = f ? Ip(i, f) : new FormData(i), _l(n, { pending: true, data: w, method: i.method, action: u }, u, w));
      }, currentTarget: i }] });
    }
  }
  for (var xu = 0; xu < nl.length; xu++) {
    var wu = nl[xu], Mb = wu.toLowerCase(), Ib = wu[0].toUpperCase() + wu.slice(1);
    Ut(Mb, "on" + Ib);
  }
  Ut(df, "onAnimationEnd"), Ut(ff, "onAnimationIteration"), Ut(hf, "onAnimationStart"), Ut("dblclick", "onDoubleClick"), Ut("focusin", "onFocus"), Ut("focusout", "onBlur"), Ut(X0, "onTransitionRun"), Ut(Y0, "onTransitionStart"), Ut(Z0, "onTransitionCancel"), Ut(pf, "onTransitionEnd"), Lr("onMouseEnter", ["mouseout", "mouseover"]), Lr("onMouseLeave", ["mouseout", "mouseover"]), Lr("onPointerEnter", ["pointerout", "pointerover"]), Lr("onPointerLeave", ["pointerout", "pointerover"]), ar("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ar("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ar("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), ar("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ar("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ar("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var is = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zb = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(is));
  function zp(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], i = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t) for (var f = a.length - 1; 0 <= f; f--) {
          var y = a[f], w = y.instance, E = y.currentTarget;
          if (y = y.listener, w !== u && i.isPropagationStopped()) break e;
          u = y, i.currentTarget = E;
          try {
            u(i);
          } catch (R) {
            Ks(R);
          }
          i.currentTarget = null, u = w;
        }
        else for (f = 0; f < a.length; f++) {
          if (y = a[f], w = y.instance, E = y.currentTarget, y = y.listener, w !== u && i.isPropagationStopped()) break e;
          u = y, i.currentTarget = E;
          try {
            u(i);
          } catch (R) {
            Ks(R);
          }
          i.currentTarget = null, u = w;
        }
      }
    }
  }
  function ce(e, t) {
    var n = t[Io];
    n === void 0 && (n = t[Io] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (Op(t, e, 2, false), n.add(a));
  }
  function ku(e, t, n) {
    var a = 0;
    t && (a |= 4), Op(n, e, a, t);
  }
  var zi = "_reactListening" + Math.random().toString(36).slice(2);
  function Su(e) {
    if (!e[zi]) {
      e[zi] = true, Td.forEach(function(n) {
        n !== "selectionchange" && (zb.has(n) || ku(n, false, e), ku(n, true, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[zi] || (t[zi] = true, ku("selectionchange", false, t));
    }
  }
  function Op(e, t, n, a) {
    switch (dm(t)) {
      case 2:
        var i = ux;
        break;
      case 8:
        i = cx;
        break;
      default:
        i = Du;
    }
    n = i.bind(null, t, n, e), i = void 0, !Ho || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = true), a ? i !== void 0 ? e.addEventListener(t, n, { capture: true, passive: i }) : e.addEventListener(t, n, true) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, false);
  }
  function Nu(e, t, n, a, i) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null) e: for (; ; ) {
      if (a === null) return;
      var f = a.tag;
      if (f === 3 || f === 4) {
        var y = a.stateNode.containerInfo;
        if (y === i) break;
        if (f === 4) for (f = a.return; f !== null; ) {
          var w = f.tag;
          if ((w === 3 || w === 4) && f.stateNode.containerInfo === i) return;
          f = f.return;
        }
        for (; y !== null; ) {
          if (f = Er(y), f === null) return;
          if (w = f.tag, w === 5 || w === 6 || w === 26 || w === 27) {
            a = u = f;
            continue e;
          }
          y = y.parentNode;
        }
      }
      a = a.return;
    }
    Vd(function() {
      var E = u, R = Bo(n), I = [];
      e: {
        var j = mf.get(e);
        if (j !== void 0) {
          var A = Gs, K = e;
          switch (e) {
            case "keypress":
              if ($s(n) === 0) break e;
            case "keydown":
            case "keyup":
              A = T0;
              break;
            case "focusin":
              K = "focus", A = Wo;
              break;
            case "focusout":
              K = "blur", A = Wo;
              break;
            case "beforeblur":
            case "afterblur":
              A = Wo;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = Hd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = g0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = A0;
              break;
            case df:
            case ff:
            case hf:
              A = b0;
              break;
            case pf:
              A = M0;
              break;
            case "scroll":
            case "scrollend":
              A = p0;
              break;
            case "wheel":
              A = z0;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = w0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = qd;
              break;
            case "toggle":
            case "beforetoggle":
              A = F0;
          }
          var re = (t & 4) !== 0, Ee = !re && (e === "scroll" || e === "scrollend"), C = re ? j !== null ? j + "Capture" : null : j;
          re = [];
          for (var S = E, P; S !== null; ) {
            var M = S;
            if (P = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || P === null || C === null || (M = Ta(S, C), M != null && re.push(os(S, M, P))), Ee) break;
            S = S.return;
          }
          0 < re.length && (j = new A(j, K, null, n, R), I.push({ event: j, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", A = e === "mouseout" || e === "pointerout", j && n !== Vo && (K = n.relatedTarget || n.fromElement) && (Er(K) || K[Pr])) break e;
          if ((A || j) && (j = R.window === R ? R : (j = R.ownerDocument) ? j.defaultView || j.parentWindow : window, A ? (K = n.relatedTarget || n.toElement, A = E, K = K ? Er(K) : null, K !== null && (Ee = d(K), re = K.tag, K !== Ee || re !== 5 && re !== 27 && re !== 6) && (K = null)) : (A = null, K = E), A !== K)) {
            if (re = Hd, M = "onMouseLeave", C = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (re = qd, M = "onPointerLeave", C = "onPointerEnter", S = "pointer"), Ee = A == null ? j : Ea(A), P = K == null ? j : Ea(K), j = new re(M, S + "leave", A, n, R), j.target = Ee, j.relatedTarget = P, M = null, Er(R) === E && (re = new re(C, S + "enter", K, n, R), re.target = P, re.relatedTarget = Ee, M = re), Ee = M, A && K) t: {
              for (re = Ob, C = A, S = K, P = 0, M = C; M; M = re(M)) P++;
              M = 0;
              for (var te = S; te; te = re(te)) M++;
              for (; 0 < P - M; ) C = re(C), P--;
              for (; 0 < M - P; ) S = re(S), M--;
              for (; P--; ) {
                if (C === S || S !== null && C === S.alternate) {
                  re = C;
                  break t;
                }
                C = re(C), S = re(S);
              }
              re = null;
            }
            else re = null;
            A !== null && Fp(I, j, A, re, false), K !== null && Ee !== null && Fp(I, Ee, K, re, true);
          }
        }
        e: {
          if (j = E ? Ea(E) : window, A = j.nodeName && j.nodeName.toLowerCase(), A === "select" || A === "input" && j.type === "file") var ge = Jd;
          else if (Yd(j)) if (ef) ge = W0;
          else {
            ge = q0;
            var J = $0;
          }
          else A = j.nodeName, !A || A.toLowerCase() !== "input" || j.type !== "checkbox" && j.type !== "radio" ? E && _o(E.elementType) && (ge = Jd) : ge = G0;
          if (ge && (ge = ge(e, E))) {
            Zd(I, ge, n, R);
            break e;
          }
          J && J(e, j, E), e === "focusout" && E && j.type === "number" && E.memoizedProps.value != null && Do(j, "number", j.value);
        }
        switch (J = E ? Ea(E) : window, e) {
          case "focusin":
            (Yd(J) || J.contentEditable === "true") && (Or = J, Jo = E, Oa = null);
            break;
          case "focusout":
            Oa = Jo = Or = null;
            break;
          case "mousedown":
            el = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            el = false, uf(I, n, R);
            break;
          case "selectionchange":
            if (K0) break;
          case "keydown":
          case "keyup":
            uf(I, n, R);
        }
        var oe;
        if (Ko) e: {
          switch (e) {
            case "compositionstart":
              var fe = "onCompositionStart";
              break e;
            case "compositionend":
              fe = "onCompositionEnd";
              break e;
            case "compositionupdate":
              fe = "onCompositionUpdate";
              break e;
          }
          fe = void 0;
        }
        else zr ? Kd(e, n) && (fe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (fe = "onCompositionStart");
        fe && (Gd && n.locale !== "ko" && (zr || fe !== "onCompositionStart" ? fe === "onCompositionEnd" && zr && (oe = Bd()) : (Tn = R, $o = "value" in Tn ? Tn.value : Tn.textContent, zr = true)), J = Oi(E, fe), 0 < J.length && (fe = new $d(fe, e, null, n, R), I.push({ event: fe, listeners: J }), oe ? fe.data = oe : (oe = Xd(n), oe !== null && (fe.data = oe)))), (oe = _0 ? V0(e, n) : B0(e, n)) && (fe = Oi(E, "onBeforeInput"), 0 < fe.length && (J = new $d("onBeforeInput", "beforeinput", null, n, R), I.push({ event: J, listeners: fe }), J.data = oe)), Rb(I, e, E, n, R);
      }
      zp(I, t);
    });
  }
  function os(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Oi(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var i = e, u = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || u === null || (i = Ta(e, n), i != null && a.unshift(os(e, i, u)), i = Ta(e, t), i != null && a.push(os(e, i, u))), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function Ob(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Fp(e, t, n, a, i) {
    for (var u = t._reactName, f = []; n !== null && n !== a; ) {
      var y = n, w = y.alternate, E = y.stateNode;
      if (y = y.tag, w !== null && w === a) break;
      y !== 5 && y !== 26 && y !== 27 || E === null || (w = E, i ? (E = Ta(n, u), E != null && f.unshift(os(n, E, w))) : i || (E = Ta(n, u), E != null && f.push(os(n, E, w)))), n = n.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Fb = /\r\n?/g, Db = /\u0000|\uFFFD/g;
  function Dp(e) {
    return (typeof e == "string" ? e : "" + e).replace(Fb, `
`).replace(Db, "");
  }
  function _p(e, t) {
    return t = Dp(t), Dp(e) === t;
  }
  function Pe(e, t, n, a, i, u) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Rr(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Rr(e, "" + a);
        break;
      case "className":
        Vs(e, "class", a);
        break;
      case "tabIndex":
        Vs(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Vs(e, n, a);
        break;
      case "style":
        Dd(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          Vs(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = Us("" + a), e.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof u == "function" && (n === "formAction" ? (t !== "input" && Pe(e, t, "name", i.name, i, null), Pe(e, t, "formEncType", i.formEncType, i, null), Pe(e, t, "formMethod", i.formMethod, i, null), Pe(e, t, "formTarget", i.formTarget, i, null)) : (Pe(e, t, "encType", i.encType, i, null), Pe(e, t, "method", i.method, i, null), Pe(e, t, "target", i.target, i, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = Us("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = on);
        break;
      case "onScroll":
        a != null && ce("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ce("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(l(61));
          if (n = a.__html, n != null) {
            if (i.children != null) throw Error(l(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Us("" + a), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "" + a) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === true ? e.setAttribute(n, "") : a !== false && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(n) : e.setAttribute(n, a);
        break;
      case "popover":
        ce("beforetoggle", e), ce("toggle", e), _s(e, "popover", a);
        break;
      case "xlinkActuate":
        sn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        sn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        sn(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        sn(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        sn(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        sn(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        sn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        sn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        sn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        _s(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = f0.get(n) || n, _s(e, n, a));
    }
  }
  function Cu(e, t, n, a, i, u) {
    switch (n) {
      case "style":
        Dd(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(l(61));
          if (n = a.__html, n != null) {
            if (i.children != null) throw Error(l(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Rr(e, a) : (typeof a == "number" || typeof a == "bigint") && Rr(e, "" + a);
        break;
      case "onScroll":
        a != null && ce("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ce("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = on);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!jd.hasOwnProperty(n)) e: {
          if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), u = e[ht] || null, u = u != null ? u[n] : null, typeof u == "function" && e.removeEventListener(t, u, i), typeof a == "function")) {
            typeof u != "function" && u !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, i);
            break e;
          }
          n in e ? e[n] = a : a === true ? e.setAttribute(n, "") : _s(e, n, a);
        }
    }
  }
  function rt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ce("error", e), ce("load", e);
        var a = false, i = false, u;
        for (u in n) if (n.hasOwnProperty(u)) {
          var f = n[u];
          if (f != null) switch (u) {
            case "src":
              a = true;
              break;
            case "srcSet":
              i = true;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l(137, t));
            default:
              Pe(e, t, u, f, n, null);
          }
        }
        i && Pe(e, t, "srcSet", n.srcSet, n, null), a && Pe(e, t, "src", n.src, n, null);
        return;
      case "input":
        ce("invalid", e);
        var y = u = f = i = null, w = null, E = null;
        for (a in n) if (n.hasOwnProperty(a)) {
          var R = n[a];
          if (R != null) switch (a) {
            case "name":
              i = R;
              break;
            case "type":
              f = R;
              break;
            case "checked":
              w = R;
              break;
            case "defaultChecked":
              E = R;
              break;
            case "value":
              u = R;
              break;
            case "defaultValue":
              y = R;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (R != null) throw Error(l(137, t));
              break;
            default:
              Pe(e, t, a, R, n, null);
          }
        }
        Id(e, u, y, w, E, f, i, false);
        return;
      case "select":
        ce("invalid", e), a = f = u = null;
        for (i in n) if (n.hasOwnProperty(i) && (y = n[i], y != null)) switch (i) {
          case "value":
            u = y;
            break;
          case "defaultValue":
            f = y;
            break;
          case "multiple":
            a = y;
          default:
            Pe(e, t, i, y, n, null);
        }
        t = u, n = f, e.multiple = !!a, t != null ? Ar(e, !!a, t, false) : n != null && Ar(e, !!a, n, true);
        return;
      case "textarea":
        ce("invalid", e), u = i = a = null;
        for (f in n) if (n.hasOwnProperty(f) && (y = n[f], y != null)) switch (f) {
          case "value":
            a = y;
            break;
          case "defaultValue":
            i = y;
            break;
          case "children":
            u = y;
            break;
          case "dangerouslySetInnerHTML":
            if (y != null) throw Error(l(91));
            break;
          default:
            Pe(e, t, f, y, n, null);
        }
        Od(e, a, i, u);
        return;
      case "option":
        for (w in n) n.hasOwnProperty(w) && (a = n[w], a != null) && (w === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Pe(e, t, w, a, n, null));
        return;
      case "dialog":
        ce("beforetoggle", e), ce("toggle", e), ce("cancel", e), ce("close", e);
        break;
      case "iframe":
      case "object":
        ce("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < is.length; a++) ce(is[a], e);
        break;
      case "image":
        ce("error", e), ce("load", e);
        break;
      case "details":
        ce("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ce("error", e), ce("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (E in n) if (n.hasOwnProperty(E) && (a = n[E], a != null)) switch (E) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(l(137, t));
          default:
            Pe(e, t, E, a, n, null);
        }
        return;
      default:
        if (_o(t)) {
          for (R in n) n.hasOwnProperty(R) && (a = n[R], a !== void 0 && Cu(e, t, R, a, n, void 0));
          return;
        }
    }
    for (y in n) n.hasOwnProperty(y) && (a = n[y], a != null && Pe(e, t, y, a, n, null));
  }
  function _b(e, t, n, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var i = null, u = null, f = null, y = null, w = null, E = null, R = null;
        for (A in n) {
          var I = n[A];
          if (n.hasOwnProperty(A) && I != null) switch (A) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              w = I;
            default:
              a.hasOwnProperty(A) || Pe(e, t, A, null, a, I);
          }
        }
        for (var j in a) {
          var A = a[j];
          if (I = n[j], a.hasOwnProperty(j) && (A != null || I != null)) switch (j) {
            case "type":
              u = A;
              break;
            case "name":
              i = A;
              break;
            case "checked":
              E = A;
              break;
            case "defaultChecked":
              R = A;
              break;
            case "value":
              f = A;
              break;
            case "defaultValue":
              y = A;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (A != null) throw Error(l(137, t));
              break;
            default:
              A !== I && Pe(e, t, j, A, a, I);
          }
        }
        Fo(e, f, y, w, E, R, u, i);
        return;
      case "select":
        A = f = y = j = null;
        for (u in n) if (w = n[u], n.hasOwnProperty(u) && w != null) switch (u) {
          case "value":
            break;
          case "multiple":
            A = w;
          default:
            a.hasOwnProperty(u) || Pe(e, t, u, null, a, w);
        }
        for (i in a) if (u = a[i], w = n[i], a.hasOwnProperty(i) && (u != null || w != null)) switch (i) {
          case "value":
            j = u;
            break;
          case "defaultValue":
            y = u;
            break;
          case "multiple":
            f = u;
          default:
            u !== w && Pe(e, t, i, u, a, w);
        }
        t = y, n = f, a = A, j != null ? Ar(e, !!n, j, false) : !!a != !!n && (t != null ? Ar(e, !!n, t, true) : Ar(e, !!n, n ? [] : "", false));
        return;
      case "textarea":
        A = j = null;
        for (y in n) if (i = n[y], n.hasOwnProperty(y) && i != null && !a.hasOwnProperty(y)) switch (y) {
          case "value":
            break;
          case "children":
            break;
          default:
            Pe(e, t, y, null, a, i);
        }
        for (f in a) if (i = a[f], u = n[f], a.hasOwnProperty(f) && (i != null || u != null)) switch (f) {
          case "value":
            j = i;
            break;
          case "defaultValue":
            A = i;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (i != null) throw Error(l(91));
            break;
          default:
            i !== u && Pe(e, t, f, i, a, u);
        }
        zd(e, j, A);
        return;
      case "option":
        for (var K in n) j = n[K], n.hasOwnProperty(K) && j != null && !a.hasOwnProperty(K) && (K === "selected" ? e.selected = false : Pe(e, t, K, null, a, j));
        for (w in a) j = a[w], A = n[w], a.hasOwnProperty(w) && j !== A && (j != null || A != null) && (w === "selected" ? e.selected = j && typeof j != "function" && typeof j != "symbol" : Pe(e, t, w, j, a, A));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var re in n) j = n[re], n.hasOwnProperty(re) && j != null && !a.hasOwnProperty(re) && Pe(e, t, re, null, a, j);
        for (E in a) if (j = a[E], A = n[E], a.hasOwnProperty(E) && j !== A && (j != null || A != null)) switch (E) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (j != null) throw Error(l(137, t));
            break;
          default:
            Pe(e, t, E, j, a, A);
        }
        return;
      default:
        if (_o(t)) {
          for (var Ee in n) j = n[Ee], n.hasOwnProperty(Ee) && j !== void 0 && !a.hasOwnProperty(Ee) && Cu(e, t, Ee, void 0, a, j);
          for (R in a) j = a[R], A = n[R], !a.hasOwnProperty(R) || j === A || j === void 0 && A === void 0 || Cu(e, t, R, j, a, A);
          return;
        }
    }
    for (var C in n) j = n[C], n.hasOwnProperty(C) && j != null && !a.hasOwnProperty(C) && Pe(e, t, C, null, a, j);
    for (I in a) j = a[I], A = n[I], !a.hasOwnProperty(I) || j === A || j == null && A == null || Pe(e, t, I, j, a, A);
  }
  function Vp(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function Vb() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var i = n[a], u = i.transferSize, f = i.initiatorType, y = i.duration;
        if (u && y && Vp(f)) {
          for (f = 0, y = i.responseEnd, a += 1; a < n.length; a++) {
            var w = n[a], E = w.startTime;
            if (E > y) break;
            var R = w.transferSize, I = w.initiatorType;
            R && Vp(I) && (w = w.responseEnd, f += R * (w < y ? 1 : (y - E) / (w - E)));
          }
          if (--a, t += 8 * (u + f) / (i.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Pu = null, Eu = null;
  function Fi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Bp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Up(e, t) {
    if (e === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Tu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ju = null;
  function Bb() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ju ? false : (ju = e, true) : (ju = null, false);
  }
  var Hp = typeof setTimeout == "function" ? setTimeout : void 0, Ub = typeof clearTimeout == "function" ? clearTimeout : void 0, $p = typeof Promise == "function" ? Promise : void 0, Hb = typeof queueMicrotask == "function" ? queueMicrotask : typeof $p < "u" ? function(e) {
    return $p.resolve(null).then(e).catch($b);
  } : Hp;
  function $b(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function qn(e) {
    return e === "head";
  }
  function qp(e, t) {
    var n = t, a = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
        if (a === 0) {
          e.removeChild(i), ua(t);
          return;
        }
        a--;
      } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") a++;
      else if (n === "html") ls(e.ownerDocument.documentElement);
      else if (n === "head") {
        n = e.ownerDocument.head, ls(n);
        for (var u = n.firstChild; u; ) {
          var f = u.nextSibling, y = u.nodeName;
          u[Pa] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = f;
        }
      } else n === "body" && ls(e.ownerDocument.body);
      n = i;
    } while (n);
    ua(t);
  }
  function Gp(e, t) {
    var n = e;
    e = 0;
    do {
      var a = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), a && a.nodeType === 8) if (n = a.data, n === "/$") {
        if (e === 0) break;
        e--;
      } else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = a;
    } while (n);
  }
  function Lu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Lu(n), zo(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function qb(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var i = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Pa]) switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence") || u !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (u = e.getAttribute("src"), (u !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
            return e;
          default:
            return e;
        }
      } else if (t === "input" && e.type === "hidden") {
        var u = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === u) return e;
      } else return e;
      if (e = Ot(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Gb(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function Wp(e, t) {
    for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function Au(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ru(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Wb(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading") t();
    else {
      var a = function() {
        t(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function Ot(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Mu = null;
  function Qp(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return Ot(e.nextSibling);
          t--;
        } else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Kp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Xp(e, t, n) {
    switch (t = Fi(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(l(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(l(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function ls(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    zo(e);
  }
  var Ft = /* @__PURE__ */ new Map(), Yp = /* @__PURE__ */ new Set();
  function Di(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Sn = $.d;
  $.d = { f: Qb, r: Kb, D: Xb, C: Yb, L: Zb, m: Jb, X: tx, S: ex, M: nx };
  function Qb() {
    var e = Sn.f(), t = ji();
    return e || t;
  }
  function Kb(e) {
    var t = Tr(e);
    t !== null && t.tag === 5 && t.type === "form" ? ph(t) : Sn.r(e);
  }
  var ia = typeof document > "u" ? null : document;
  function Zp(e, t, n) {
    var a = ia;
    if (a && typeof t == "string" && t) {
      var i = Bt(t);
      i = 'link[rel="' + e + '"][href="' + i + '"]', typeof n == "string" && (i += '[crossorigin="' + n + '"]'), Yp.has(i) || (Yp.add(i), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(i) === null && (t = a.createElement("link"), rt(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function Xb(e) {
    Sn.D(e), Zp("dns-prefetch", e, null);
  }
  function Yb(e, t) {
    Sn.C(e, t), Zp("preconnect", e, t);
  }
  function Zb(e, t, n) {
    Sn.L(e, t, n);
    var a = ia;
    if (a && e && t) {
      var i = 'link[rel="preload"][as="' + Bt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + Bt(n.imageSrcSet) + '"]', typeof n.imageSizes == "string" && (i += '[imagesizes="' + Bt(n.imageSizes) + '"]')) : i += '[href="' + Bt(e) + '"]';
      var u = i;
      switch (t) {
        case "style":
          u = oa(e);
          break;
        case "script":
          u = la(e);
      }
      Ft.has(u) || (e = x({ rel: "preload", href: t === "image" && n && n.imageSrcSet ? void 0 : e, as: t }, n), Ft.set(u, e), a.querySelector(i) !== null || t === "style" && a.querySelector(us(u)) || t === "script" && a.querySelector(cs(u)) || (t = a.createElement("link"), rt(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function Jb(e, t) {
    Sn.m(e, t);
    var n = ia;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + Bt(a) + '"][href="' + Bt(e) + '"]', u = i;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = la(e);
      }
      if (!Ft.has(u) && (e = x({ rel: "modulepreload", href: e }, t), Ft.set(u, e), n.querySelector(i) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(cs(u))) return;
        }
        a = n.createElement("link"), rt(a, "link", e), Ye(a), n.head.appendChild(a);
      }
    }
  }
  function ex(e, t, n) {
    Sn.S(e, t, n);
    var a = ia;
    if (a && e) {
      var i = jr(a).hoistableStyles, u = oa(e);
      t = t || "default";
      var f = i.get(u);
      if (!f) {
        var y = { loading: 0, preload: null };
        if (f = a.querySelector(us(u))) y.loading = 5;
        else {
          e = x({ rel: "stylesheet", href: e, "data-precedence": t }, n), (n = Ft.get(u)) && Iu(e, n);
          var w = f = a.createElement("link");
          Ye(w), rt(w, "link", e), w._p = new Promise(function(E, R) {
            w.onload = E, w.onerror = R;
          }), w.addEventListener("load", function() {
            y.loading |= 1;
          }), w.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, _i(f, t, a);
        }
        f = { type: "stylesheet", instance: f, count: 1, state: y }, i.set(u, f);
      }
    }
  }
  function tx(e, t) {
    Sn.X(e, t);
    var n = ia;
    if (n && e) {
      var a = jr(n).hoistableScripts, i = la(e), u = a.get(i);
      u || (u = n.querySelector(cs(i)), u || (e = x({ src: e, async: true }, t), (t = Ft.get(i)) && zu(e, t), u = n.createElement("script"), Ye(u), rt(u, "link", e), n.head.appendChild(u)), u = { type: "script", instance: u, count: 1, state: null }, a.set(i, u));
    }
  }
  function nx(e, t) {
    Sn.M(e, t);
    var n = ia;
    if (n && e) {
      var a = jr(n).hoistableScripts, i = la(e), u = a.get(i);
      u || (u = n.querySelector(cs(i)), u || (e = x({ src: e, async: true, type: "module" }, t), (t = Ft.get(i)) && zu(e, t), u = n.createElement("script"), Ye(u), rt(u, "link", e), n.head.appendChild(u)), u = { type: "script", instance: u, count: 1, state: null }, a.set(i, u));
    }
  }
  function Jp(e, t, n, a) {
    var i = (i = le.current) ? Di(i) : null;
    if (!i) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = oa(n.href), n = jr(i).hoistableStyles, a = n.get(t), a || (a = { type: "style", instance: null, count: 0, state: null }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = oa(n.href);
          var u = jr(i).hoistableStyles, f = u.get(e);
          if (f || (i = i.ownerDocument || i, f = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, u.set(e, f), (u = i.querySelector(us(e))) && !u._p && (f.instance = u, f.state.loading = 5), Ft.has(e) || (n = { rel: "preload", as: "style", href: n.href, crossOrigin: n.crossOrigin, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }, Ft.set(e, n), u || rx(i, e, n, f.state))), t && a === null) throw Error(l(528, ""));
          return f;
        }
        if (t && a !== null) throw Error(l(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = la(n), n = jr(i).hoistableScripts, a = n.get(t), a || (a = { type: "script", instance: null, count: 0, state: null }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function oa(e) {
    return 'href="' + Bt(e) + '"';
  }
  function us(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function em(e) {
    return x({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function rx(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), rt(t, "link", n), Ye(t), e.head.appendChild(t));
  }
  function la(e) {
    return '[src="' + Bt(e) + '"]';
  }
  function cs(e) {
    return "script[async]" + e;
  }
  function tm(e, t, n) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var a = e.querySelector('style[data-href~="' + Bt(n.href) + '"]');
        if (a) return t.instance = a, Ye(a), a;
        var i = x({}, n, { "data-href": n.href, "data-precedence": n.precedence, href: null, precedence: null });
        return a = (e.ownerDocument || e).createElement("style"), Ye(a), rt(a, "style", i), _i(a, n.precedence, e), t.instance = a;
      case "stylesheet":
        i = oa(n.href);
        var u = e.querySelector(us(i));
        if (u) return t.state.loading |= 4, t.instance = u, Ye(u), u;
        a = em(n), (i = Ft.get(i)) && Iu(a, i), u = (e.ownerDocument || e).createElement("link"), Ye(u);
        var f = u;
        return f._p = new Promise(function(y, w) {
          f.onload = y, f.onerror = w;
        }), rt(u, "link", a), t.state.loading |= 4, _i(u, n.precedence, e), t.instance = u;
      case "script":
        return u = la(n.src), (i = e.querySelector(cs(u))) ? (t.instance = i, Ye(i), i) : (a = n, (i = Ft.get(u)) && (a = x({}, n), zu(a, i)), e = e.ownerDocument || e, i = e.createElement("script"), Ye(i), rt(i, "link", a), e.head.appendChild(i), t.instance = i);
      case "void":
        return null;
      default:
        throw Error(l(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, _i(a, n.precedence, e));
    return t.instance;
  }
  function _i(e, t, n) {
    for (var a = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = a.length ? a[a.length - 1] : null, u = i, f = 0; f < a.length; f++) {
      var y = a[f];
      if (y.dataset.precedence === t) u = y;
      else if (u !== i) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Iu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function zu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Vi = null;
  function nm(e, t, n) {
    if (Vi === null) {
      var a = /* @__PURE__ */ new Map(), i = Vi = /* @__PURE__ */ new Map();
      i.set(n, a);
    } else i = Vi, a = i.get(n), a || (a = /* @__PURE__ */ new Map(), i.set(n, a));
    if (a.has(e)) return a;
    for (a.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
      var u = n[i];
      if (!(u[Pa] || u[Je] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = u.getAttribute(t) || "";
        f = e + f;
        var y = a.get(f);
        y ? y.push(u) : a.set(f, [u]);
      }
    }
    return a;
  }
  function rm(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
  }
  function ax(e, t, n) {
    if (n === 1 || t.itemProp != null) return false;
    switch (e) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return true;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : true;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
    }
    return false;
  }
  function am(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function sx(e, t, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var i = oa(a.href), u = t.querySelector(us(i));
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Bi.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = u, Ye(u);
          return;
        }
        u = t.ownerDocument || t, a = em(a), (i = Ft.get(i)) && Iu(a, i), u = u.createElement("link"), Ye(u);
        var f = u;
        f._p = new Promise(function(y, w) {
          f.onload = y, f.onerror = w;
        }), rt(u, "link", a), n.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Bi.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Ou = 0;
  function ix(e, t) {
    return e.stylesheets && e.count === 0 && Hi(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (e.stylesheets && Hi(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ou === 0 && (Ou = 62500 * Vb());
      var i = setTimeout(function() {
        if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && Hi(e, e.stylesheets), e.unsuspend)) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, (e.imgBytes > Ou ? 50 : 800) + t);
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(i);
      };
    } : null;
  }
  function Bi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Hi(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ui = null;
  function Hi(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ui = /* @__PURE__ */ new Map(), t.forEach(ox, e), Ui = null, Bi.call(e));
  }
  function ox(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Ui.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Ui.set(e, n);
        for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0; u < i.length; u++) {
          var f = i[u];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), a = f);
        }
        a && n.set(null, a);
      }
      i = t.instance, f = i.getAttribute("data-precedence"), u = n.get(f) || a, u === a && n.set(null, i), n.set(f, i), this.count++, a = Bi.bind(this), i.addEventListener("load", a), i.addEventListener("error", a), u ? u.parentNode.insertBefore(i, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ds = { $$typeof: B, Provider: null, Consumer: null, _currentValue: ee, _currentValue2: ee, _threadCount: 0 };
  function lx(e, t, n, a, i, u, f, y, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ao(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ao(0), this.hiddenUpdates = Ao(null), this.identifierPrefix = a, this.onUncaughtError = i, this.onCaughtError = u, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sm(e, t, n, a, i, u, f, y, w, E, R, I) {
    return e = new lx(e, t, n, f, w, E, R, I, y), t = 1, u === true && (t |= 24), u = Nt(3, null, null, t), e.current = u, u.stateNode = e, t = ml(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = { element: a, isDehydrated: n, cache: t }, bl(u), e;
  }
  function im(e) {
    return e ? (e = _r, e) : _r;
  }
  function om(e, t, n, a, i, u) {
    i = im(i), a.context === null ? a.context = i : a.pendingContext = i, a = In(t), a.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (a.callback = u), n = zn(e, a, t), n !== null && (bt(n, e, t), Ha(n, e, t));
  }
  function lm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Fu(e, t) {
    lm(e, t), (e = e.alternate) && lm(e, t);
  }
  function um(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = lr(e, 67108864);
      t !== null && bt(t, e, 67108864), Fu(e, 67108864);
    }
  }
  function cm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = jt();
      t = Ro(t);
      var n = lr(e, t);
      n !== null && bt(n, e, t), Fu(e, t);
    }
  }
  var $i = true;
  function ux(e, t, n, a) {
    var i = L.T;
    L.T = null;
    var u = $.p;
    try {
      $.p = 2, Du(e, t, n, a);
    } finally {
      $.p = u, L.T = i;
    }
  }
  function cx(e, t, n, a) {
    var i = L.T;
    L.T = null;
    var u = $.p;
    try {
      $.p = 8, Du(e, t, n, a);
    } finally {
      $.p = u, L.T = i;
    }
  }
  function Du(e, t, n, a) {
    if ($i) {
      var i = _u(a);
      if (i === null) Nu(e, t, a, qi, n), fm(e, a);
      else if (fx(i, e, t, n, a)) a.stopPropagation();
      else if (fm(e, a), t & 4 && -1 < dx.indexOf(e)) {
        for (; i !== null; ) {
          var u = Tr(i);
          if (u !== null) switch (u.tag) {
            case 3:
              if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                var f = rr(u.pendingLanes);
                if (f !== 0) {
                  var y = u;
                  for (y.pendingLanes |= 2, y.entangledLanes |= 2; f; ) {
                    var w = 1 << 31 - kt(f);
                    y.entanglements[1] |= w, f &= ~w;
                  }
                  en(u), (be & 6) === 0 && (Ei = xt() + 500, ss(0));
                }
              }
              break;
            case 31:
            case 13:
              y = lr(u, 2), y !== null && bt(y, u, 2), ji(), Fu(u, 2);
          }
          if (u = _u(a), u === null && Nu(e, t, a, qi, n), u === i) break;
          i = u;
        }
        i !== null && a.stopPropagation();
      } else Nu(e, t, a, null, n);
    }
  }
  function _u(e) {
    return e = Bo(e), Vu(e);
  }
  var qi = null;
  function Vu(e) {
    if (qi = null, e = Er(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return qi = e, null;
  }
  function dm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Xv()) {
          case vd:
            return 2;
          case bd:
            return 8;
          case Is:
          case Yv:
            return 32;
          case xd:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bu = false, Gn = null, Wn = null, Qn = null, fs = /* @__PURE__ */ new Map(), hs = /* @__PURE__ */ new Map(), Kn = [], dx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function fm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Gn = null;
        break;
      case "dragenter":
      case "dragleave":
        Wn = null;
        break;
      case "mouseover":
      case "mouseout":
        Qn = null;
        break;
      case "pointerover":
      case "pointerout":
        fs.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hs.delete(t.pointerId);
    }
  }
  function ps(e, t, n, a, i, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: a, nativeEvent: u, targetContainers: [i] }, t !== null && (t = Tr(t), t !== null && um(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function fx(e, t, n, a, i) {
    switch (t) {
      case "focusin":
        return Gn = ps(Gn, e, t, n, a, i), true;
      case "dragenter":
        return Wn = ps(Wn, e, t, n, a, i), true;
      case "mouseover":
        return Qn = ps(Qn, e, t, n, a, i), true;
      case "pointerover":
        var u = i.pointerId;
        return fs.set(u, ps(fs.get(u) || null, e, t, n, a, i)), true;
      case "gotpointercapture":
        return u = i.pointerId, hs.set(u, ps(hs.get(u) || null, e, t, n, a, i)), true;
    }
    return false;
  }
  function hm(e) {
    var t = Er(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, Pd(e.priority, function() {
              cm(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, Pd(e.priority, function() {
              cm(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Gi(e) {
    if (e.blockedOn !== null) return false;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = _u(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(n.type, n);
        Vo = a, n.target.dispatchEvent(a), Vo = null;
      } else return t = Tr(n), t !== null && um(t), e.blockedOn = n, false;
      t.shift();
    }
    return true;
  }
  function pm(e, t, n) {
    Gi(e) && n.delete(t);
  }
  function hx() {
    Bu = false, Gn !== null && Gi(Gn) && (Gn = null), Wn !== null && Gi(Wn) && (Wn = null), Qn !== null && Gi(Qn) && (Qn = null), fs.forEach(pm), hs.forEach(pm);
  }
  function Wi(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bu || (Bu = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, hx)));
  }
  var Qi = null;
  function mm(e) {
    Qi !== e && (Qi = e, r.unstable_scheduleCallback(r.unstable_NormalPriority, function() {
      Qi === e && (Qi = null);
      for (var t = 0; t < e.length; t += 3) {
        var n = e[t], a = e[t + 1], i = e[t + 2];
        if (typeof a != "function") {
          if (Vu(a || n) === null) continue;
          break;
        }
        var u = Tr(n);
        u !== null && (e.splice(t, 3), t -= 3, _l(u, { pending: true, data: i, method: n.method, action: a }, a, i));
      }
    }));
  }
  function ua(e) {
    function t(w) {
      return Wi(w, e);
    }
    Gn !== null && Wi(Gn, e), Wn !== null && Wi(Wn, e), Qn !== null && Wi(Qn, e), fs.forEach(t), hs.forEach(t);
    for (var n = 0; n < Kn.length; n++) {
      var a = Kn[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Kn.length && (n = Kn[0], n.blockedOn === null); ) hm(n), n.blockedOn === null && Kn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (a = 0; a < n.length; a += 3) {
      var i = n[a], u = n[a + 1], f = i[ht] || null;
      if (typeof u == "function") f || mm(n);
      else if (f) {
        var y = null;
        if (u && u.hasAttribute("formAction")) {
          if (i = u, f = u[ht] || null) y = f.formAction;
          else if (Vu(i) !== null) continue;
        } else y = f.action;
        typeof y == "function" ? n[a + 1] = y : (n.splice(a, 3), a -= 3), mm(n);
      }
    }
  }
  function gm() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({ handler: function() {
        return new Promise(function(f) {
          return i = f;
        });
      }, focusReset: "manual", scroll: "manual" });
    }
    function t() {
      i !== null && (i(), i = null), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, { state: u.getState(), info: "react-transition", history: "replace" });
      }
    }
    if (typeof navigation == "object") {
      var a = false, i = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        a = true, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
      };
    }
  }
  function Uu(e) {
    this._internalRoot = e;
  }
  Ki.prototype.render = Uu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    var n = t.current, a = jt();
    om(n, a, e, t, null, null);
  }, Ki.prototype.unmount = Uu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      om(e.current, 2, null, e, null, null), ji(), t[Pr] = null;
    }
  };
  function Ki(e) {
    this._internalRoot = e;
  }
  Ki.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Cd();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Kn.length && t !== 0 && t < Kn[n].priority; n++) ;
      Kn.splice(n, 0, e), n === 0 && hm(e);
    }
  };
  var ym = s.version;
  if (ym !== "19.2.4") throw Error(l(527, ym, "19.2.4"));
  $.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = g(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var px = { bundleType: 0, version: "19.2.4", rendererPackageName: "react-dom", currentDispatcherRef: L, reconcilerVersion: "19.2.4" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xi.isDisabled && Xi.supportsFiber) try {
      Sa = Xi.inject(px), wt = Xi;
    } catch {
    }
  }
  return gs.createRoot = function(e, t) {
    if (!c(e)) throw Error(l(299));
    var n = false, a = "", i = Nh, u = Ch, f = Ph;
    return t != null && (t.unstable_strictMode === true && (n = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = sm(e, 1, false, null, null, n, a, null, i, u, f, gm), e[Pr] = t.current, Su(e), new Uu(t);
  }, gs.hydrateRoot = function(e, t, n) {
    if (!c(e)) throw Error(l(299));
    var a = false, i = "", u = Nh, f = Ch, y = Ph, w = null;
    return n != null && (n.unstable_strictMode === true && (a = true), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (w = n.formState)), t = sm(e, 1, true, t, n ?? null, a, i, w, u, f, y, gm), t.context = im(null), n = t.current, a = jt(), a = Ro(a), i = In(a), i.callback = null, zn(n, i, a), n = a, t.current.lanes = n, Ca(t, n), en(t), e[Pr] = t.current, Su(e), new Ki(t);
  }, gs.version = "19.2.4", gs;
}
var Am;
function Nx() {
  if (Am) return $u.exports;
  Am = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
    } catch (s) {
      console.error(s);
    }
  }
  return r(), $u.exports = Sx(), $u.exports;
}
var Cx = Nx();
const Gu = H.createContext({});
function Wu(r) {
  const s = H.useRef(null);
  return s.current === null && (s.current = r()), s.current;
}
const Rm = typeof window < "u", Mm = Rm ? H.useLayoutEffect : H.useEffect, Yi = H.createContext(null);
function Qu(r, s) {
  r.indexOf(s) === -1 && r.push(s);
}
function Zi(r, s) {
  const o = r.indexOf(s);
  o > -1 && r.splice(o, 1);
}
const tn = (r, s, o) => o > s ? s : o < r ? r : o;
let Ku = () => {
};
const Nn = {}, Im = (r) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(r);
function zm(r) {
  return typeof r == "object" && r !== null;
}
const Om = (r) => /^0[^.\s]+$/u.test(r);
function Fm(r) {
  let s;
  return () => (s === void 0 && (s = r()), s);
}
const Dt = (r) => r, Px = (r, s) => (o) => s(r(o)), ys = (...r) => r.reduce(Px), vs = (r, s, o) => {
  const l = s - r;
  return l === 0 ? 1 : (o - r) / l;
};
class Xu {
  constructor() {
    this.subscriptions = [];
  }
  add(s) {
    return Qu(this.subscriptions, s), () => Zi(this.subscriptions, s);
  }
  notify(s, o, l) {
    const c = this.subscriptions.length;
    if (c) if (c === 1) this.subscriptions[0](s, o, l);
    else for (let d = 0; d < c; d++) {
      const p = this.subscriptions[d];
      p && p(s, o, l);
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Gt = (r) => r * 1e3, _t = (r) => r / 1e3;
function Dm(r, s) {
  return s ? r * (1e3 / s) : 0;
}
const _m = (r, s, o) => (((1 - 3 * o + 3 * s) * r + (3 * o - 6 * s)) * r + 3 * s) * r, Ex = 1e-7, Tx = 12;
function jx(r, s, o, l, c) {
  let d, p, m = 0;
  do
    p = s + (o - s) / 2, d = _m(p, l, c) - r, d > 0 ? o = p : s = p;
  while (Math.abs(d) > Ex && ++m < Tx);
  return p;
}
function bs(r, s, o, l) {
  if (r === s && o === l) return Dt;
  const c = (d) => jx(d, 0, 1, r, o);
  return (d) => d === 0 || d === 1 ? d : _m(c(d), s, l);
}
const Vm = (r) => (s) => s <= 0.5 ? r(2 * s) / 2 : (2 - r(2 * (1 - s))) / 2, Bm = (r) => (s) => 1 - r(1 - s), Um = bs(0.33, 1.53, 0.69, 0.99), Yu = Bm(Um), Hm = Vm(Yu), $m = (r) => (r *= 2) < 1 ? 0.5 * Yu(r) : 0.5 * (2 - Math.pow(2, -10 * (r - 1))), Zu = (r) => 1 - Math.sin(Math.acos(r)), qm = Bm(Zu), Gm = Vm(Zu), Lx = bs(0.42, 0, 1, 1), Ax = bs(0, 0, 0.58, 1), Wm = bs(0.42, 0, 0.58, 1), Rx = (r) => Array.isArray(r) && typeof r[0] != "number", Qm = (r) => Array.isArray(r) && typeof r[0] == "number", Mx = { linear: Dt, easeIn: Lx, easeInOut: Wm, easeOut: Ax, circIn: Zu, circInOut: Gm, circOut: qm, backIn: Yu, backInOut: Hm, backOut: Um, anticipate: $m }, Ix = (r) => typeof r == "string", Km = (r) => {
  if (Qm(r)) {
    Ku(r.length === 4);
    const [s, o, l, c] = r;
    return bs(s, o, l, c);
  } else if (Ix(r)) return Mx[r];
  return r;
}, Ji = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"];
function zx(r, s) {
  let o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), c = false, d = false;
  const p = /* @__PURE__ */ new WeakSet();
  let m = { delta: 0, timestamp: 0, isProcessing: false };
  function v(b) {
    p.has(b) && (g.schedule(b), r()), b(m);
  }
  const g = { schedule: (b, x = false, k = false) => {
    const T = k && c ? o : l;
    return x && p.add(b), T.has(b) || T.add(b), b;
  }, cancel: (b) => {
    l.delete(b), p.delete(b);
  }, process: (b) => {
    if (m = b, c) {
      d = true;
      return;
    }
    c = true, [o, l] = [l, o], o.forEach(v), o.clear(), c = false, d && (d = false, g.process(b));
  } };
  return g;
}
const Ox = 40;
function Xm(r, s) {
  let o = false, l = true;
  const c = { delta: 0, timestamp: 0, isProcessing: false }, d = () => o = true, p = Ji.reduce((O, U) => (O[U] = zx(d), O), {}), { setup: m, read: v, resolveKeyframes: g, preUpdate: b, update: x, preRender: k, render: T, postRender: z } = p, _ = () => {
    const O = Nn.useManualTiming ? c.timestamp : performance.now();
    o = false, Nn.useManualTiming || (c.delta = l ? 1e3 / 60 : Math.max(Math.min(O - c.timestamp, Ox), 1)), c.timestamp = O, c.isProcessing = true, m.process(c), v.process(c), g.process(c), b.process(c), x.process(c), k.process(c), T.process(c), z.process(c), c.isProcessing = false, o && s && (l = false, r(_));
  }, F = () => {
    o = true, l = true, c.isProcessing || r(_);
  };
  return { schedule: Ji.reduce((O, U) => {
    const B = p[U];
    return O[U] = (X, V = false, W = false) => (o || F(), B.schedule(X, V, W)), O;
  }, {}), cancel: (O) => {
    for (let U = 0; U < Ji.length; U++) p[Ji[U]].cancel(O);
  }, state: c, steps: p };
}
const { schedule: Le, cancel: Yn, state: at, steps: Ju } = Xm(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Dt, true);
let eo;
function Fx() {
  eo = void 0;
}
const ct = { now: () => (eo === void 0 && ct.set(at.isProcessing || Nn.useManualTiming ? at.timestamp : performance.now()), eo), set: (r) => {
  eo = r, queueMicrotask(Fx);
} }, Ym = (r) => (s) => typeof s == "string" && s.startsWith(r), Zm = Ym("--"), Dx = Ym("var(--"), ec = (r) => Dx(r) ? _x.test(r.split("/*")[0].trim()) : false, _x = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Jm(r) {
  return typeof r != "string" ? false : r.split("/*")[0].includes("var(--");
}
const ca = { test: (r) => typeof r == "number", parse: parseFloat, transform: (r) => r }, xs = { ...ca, transform: (r) => tn(0, 1, r) }, to = { ...ca, default: 1 }, ws = (r) => Math.round(r * 1e5) / 1e5, tc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Vx(r) {
  return r == null;
}
const Bx = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, nc = (r, s) => (o) => !!(typeof o == "string" && Bx.test(o) && o.startsWith(r) || s && !Vx(o) && Object.prototype.hasOwnProperty.call(o, s)), eg = (r, s, o) => (l) => {
  if (typeof l != "string") return l;
  const [c, d, p, m] = l.match(tc);
  return { [r]: parseFloat(c), [s]: parseFloat(d), [o]: parseFloat(p), alpha: m !== void 0 ? parseFloat(m) : 1 };
}, Ux = (r) => tn(0, 255, r), rc = { ...ca, transform: (r) => Math.round(Ux(r)) }, wr = { test: nc("rgb", "red"), parse: eg("red", "green", "blue"), transform: ({ red: r, green: s, blue: o, alpha: l = 1 }) => "rgba(" + rc.transform(r) + ", " + rc.transform(s) + ", " + rc.transform(o) + ", " + ws(xs.transform(l)) + ")" };
function Hx(r) {
  let s = "", o = "", l = "", c = "";
  return r.length > 5 ? (s = r.substring(1, 3), o = r.substring(3, 5), l = r.substring(5, 7), c = r.substring(7, 9)) : (s = r.substring(1, 2), o = r.substring(2, 3), l = r.substring(3, 4), c = r.substring(4, 5), s += s, o += o, l += l, c += c), { red: parseInt(s, 16), green: parseInt(o, 16), blue: parseInt(l, 16), alpha: c ? parseInt(c, 16) / 255 : 1 };
}
const ac = { test: nc("#"), parse: Hx, transform: wr.transform }, ks = (r) => ({ test: (s) => typeof s == "string" && s.endsWith(r) && s.split(" ").length === 1, parse: parseFloat, transform: (s) => `${s}${r}` }), Zn = ks("deg"), nn = ks("%"), Y = ks("px"), $x = ks("vh"), qx = ks("vw"), tg = { ...nn, parse: (r) => nn.parse(r) / 100, transform: (r) => nn.transform(r * 100) }, da = { test: nc("hsl", "hue"), parse: eg("hue", "saturation", "lightness"), transform: ({ hue: r, saturation: s, lightness: o, alpha: l = 1 }) => "hsla(" + Math.round(r) + ", " + nn.transform(ws(s)) + ", " + nn.transform(ws(o)) + ", " + ws(xs.transform(l)) + ")" }, We = { test: (r) => wr.test(r) || ac.test(r) || da.test(r), parse: (r) => wr.test(r) ? wr.parse(r) : da.test(r) ? da.parse(r) : ac.parse(r), transform: (r) => typeof r == "string" ? r : r.hasOwnProperty("red") ? wr.transform(r) : da.transform(r), getAnimatableNone: (r) => {
  const s = We.parse(r);
  return s.alpha = 0, We.transform(s);
} }, Gx = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Wx(r) {
  var s, o;
  return isNaN(r) && typeof r == "string" && (((s = r.match(tc)) == null ? void 0 : s.length) || 0) + (((o = r.match(Gx)) == null ? void 0 : o.length) || 0) > 0;
}
const ng = "number", rg = "color", Qx = "var", Kx = "var(", ag = "${}", Xx = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ss(r) {
  const s = r.toString(), o = [], l = { color: [], number: [], var: [] }, c = [];
  let d = 0;
  const p = s.replace(Xx, (m) => (We.test(m) ? (l.color.push(d), c.push(rg), o.push(We.parse(m))) : m.startsWith(Kx) ? (l.var.push(d), c.push(Qx), o.push(m)) : (l.number.push(d), c.push(ng), o.push(parseFloat(m))), ++d, ag)).split(ag);
  return { values: o, split: p, indexes: l, types: c };
}
function sg(r) {
  return Ss(r).values;
}
function ig(r) {
  const { split: s, types: o } = Ss(r), l = s.length;
  return (c) => {
    let d = "";
    for (let p = 0; p < l; p++) if (d += s[p], c[p] !== void 0) {
      const m = o[p];
      m === ng ? d += ws(c[p]) : m === rg ? d += We.transform(c[p]) : d += c[p];
    }
    return d;
  };
}
const Yx = (r) => typeof r == "number" ? 0 : We.test(r) ? We.getAnimatableNone(r) : r;
function Zx(r) {
  const s = sg(r);
  return ig(r)(s.map(Yx));
}
const Wt = { test: Wx, parse: sg, createTransformer: ig, getAnimatableNone: Zx };
function sc(r, s, o) {
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? r + (s - r) * 6 * o : o < 1 / 2 ? s : o < 2 / 3 ? r + (s - r) * (2 / 3 - o) * 6 : r;
}
function Jx({ hue: r, saturation: s, lightness: o, alpha: l }) {
  r /= 360, s /= 100, o /= 100;
  let c = 0, d = 0, p = 0;
  if (!s) c = d = p = o;
  else {
    const m = o < 0.5 ? o * (1 + s) : o + s - o * s, v = 2 * o - m;
    c = sc(v, m, r + 1 / 3), d = sc(v, m, r), p = sc(v, m, r - 1 / 3);
  }
  return { red: Math.round(c * 255), green: Math.round(d * 255), blue: Math.round(p * 255), alpha: l };
}
function no(r, s) {
  return (o) => o > 0 ? s : r;
}
const ze = (r, s, o) => r + (s - r) * o, ic = (r, s, o) => {
  const l = r * r, c = o * (s * s - l) + l;
  return c < 0 ? 0 : Math.sqrt(c);
}, e1 = [ac, wr, da], t1 = (r) => e1.find((s) => s.test(r));
function og(r) {
  const s = t1(r);
  if (!s) return false;
  let o = s.parse(r);
  return s === da && (o = Jx(o)), o;
}
const lg = (r, s) => {
  const o = og(r), l = og(s);
  if (!o || !l) return no(r, s);
  const c = { ...o };
  return (d) => (c.red = ic(o.red, l.red, d), c.green = ic(o.green, l.green, d), c.blue = ic(o.blue, l.blue, d), c.alpha = ze(o.alpha, l.alpha, d), wr.transform(c));
}, oc = /* @__PURE__ */ new Set(["none", "hidden"]);
function n1(r, s) {
  return oc.has(r) ? (o) => o <= 0 ? r : s : (o) => o >= 1 ? s : r;
}
function r1(r, s) {
  return (o) => ze(r, s, o);
}
function lc(r) {
  return typeof r == "number" ? r1 : typeof r == "string" ? ec(r) ? no : We.test(r) ? lg : i1 : Array.isArray(r) ? ug : typeof r == "object" ? We.test(r) ? lg : a1 : no;
}
function ug(r, s) {
  const o = [...r], l = o.length, c = r.map((d, p) => lc(d)(d, s[p]));
  return (d) => {
    for (let p = 0; p < l; p++) o[p] = c[p](d);
    return o;
  };
}
function a1(r, s) {
  const o = { ...r, ...s }, l = {};
  for (const c in o) r[c] !== void 0 && s[c] !== void 0 && (l[c] = lc(r[c])(r[c], s[c]));
  return (c) => {
    for (const d in l) o[d] = l[d](c);
    return o;
  };
}
function s1(r, s) {
  const o = [], l = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < s.values.length; c++) {
    const d = s.types[c], p = r.indexes[d][l[d]], m = r.values[p] ?? 0;
    o[c] = m, l[d]++;
  }
  return o;
}
const i1 = (r, s) => {
  const o = Wt.createTransformer(s), l = Ss(r), c = Ss(s);
  return l.indexes.var.length === c.indexes.var.length && l.indexes.color.length === c.indexes.color.length && l.indexes.number.length >= c.indexes.number.length ? oc.has(r) && !c.values.length || oc.has(s) && !l.values.length ? n1(r, s) : ys(ug(s1(l, c), c.values), o) : no(r, s);
};
function cg(r, s, o) {
  return typeof r == "number" && typeof s == "number" && typeof o == "number" ? ze(r, s, o) : lc(r)(r, s);
}
const o1 = (r) => {
  const s = ({ timestamp: o }) => r(o);
  return { start: (o = true) => Le.update(s, o), stop: () => Yn(s), now: () => at.isProcessing ? at.timestamp : ct.now() };
}, dg = (r, s, o = 10) => {
  let l = "";
  const c = Math.max(Math.round(s / o), 2);
  for (let d = 0; d < c; d++) l += Math.round(r(d / (c - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, ro = 2e4;
function uc(r) {
  let s = 0;
  const o = 50;
  let l = r.next(s);
  for (; !l.done && s < ro; ) s += o, l = r.next(s);
  return s >= ro ? 1 / 0 : s;
}
function l1(r, s = 100, o) {
  const l = o({ ...r, keyframes: [0, s] }), c = Math.min(uc(l), ro);
  return { type: "keyframes", ease: (d) => l.next(c * d).value / s, duration: _t(c) };
}
const u1 = 5;
function fg(r, s, o) {
  const l = Math.max(s - u1, 0);
  return Dm(o - r(l), s - l);
}
const De = { stiffness: 100, damping: 10, mass: 1, velocity: 0, duration: 800, bounce: 0.3, visualDuration: 0.3, restSpeed: { granular: 0.01, default: 2 }, restDelta: { granular: 5e-3, default: 0.5 }, minDuration: 0.01, maxDuration: 10, minDamping: 0.05, maxDamping: 1 }, cc = 1e-3;
function c1({ duration: r = De.duration, bounce: s = De.bounce, velocity: o = De.velocity, mass: l = De.mass }) {
  let c, d, p = 1 - s;
  p = tn(De.minDamping, De.maxDamping, p), r = tn(De.minDuration, De.maxDuration, _t(r)), p < 1 ? (c = (g) => {
    const b = g * p, x = b * r, k = b - o, T = dc(g, p), z = Math.exp(-x);
    return cc - k / T * z;
  }, d = (g) => {
    const b = g * p * r, x = b * o + o, k = Math.pow(p, 2) * Math.pow(g, 2) * r, T = Math.exp(-b), z = dc(Math.pow(g, 2), p);
    return (-c(g) + cc > 0 ? -1 : 1) * ((x - k) * T) / z;
  }) : (c = (g) => {
    const b = Math.exp(-g * r), x = (g - o) * r + 1;
    return -cc + b * x;
  }, d = (g) => {
    const b = Math.exp(-g * r), x = (o - g) * (r * r);
    return b * x;
  });
  const m = 5 / r, v = f1(c, d, m);
  if (r = Gt(r), isNaN(v)) return { stiffness: De.stiffness, damping: De.damping, duration: r };
  {
    const g = Math.pow(v, 2) * l;
    return { stiffness: g, damping: p * 2 * Math.sqrt(l * g), duration: r };
  }
}
const d1 = 12;
function f1(r, s, o) {
  let l = o;
  for (let c = 1; c < d1; c++) l = l - r(l) / s(l);
  return l;
}
function dc(r, s) {
  return r * Math.sqrt(1 - s * s);
}
const h1 = ["duration", "bounce"], p1 = ["stiffness", "damping", "mass"];
function hg(r, s) {
  return s.some((o) => r[o] !== void 0);
}
function m1(r) {
  let s = { velocity: De.velocity, stiffness: De.stiffness, damping: De.damping, mass: De.mass, isResolvedFromDuration: false, ...r };
  if (!hg(r, p1) && hg(r, h1)) if (s.velocity = 0, r.visualDuration) {
    const o = r.visualDuration, l = 2 * Math.PI / (o * 1.2), c = l * l, d = 2 * tn(0.05, 1, 1 - (r.bounce || 0)) * Math.sqrt(c);
    s = { ...s, mass: De.mass, stiffness: c, damping: d };
  } else {
    const o = c1({ ...r, velocity: 0 });
    s = { ...s, ...o, mass: De.mass }, s.isResolvedFromDuration = true;
  }
  return s;
}
function ao(r = De.visualDuration, s = De.bounce) {
  const o = typeof r != "object" ? { visualDuration: r, keyframes: [0, 1], bounce: s } : r;
  let { restSpeed: l, restDelta: c } = o;
  const d = o.keyframes[0], p = o.keyframes[o.keyframes.length - 1], m = { done: false, value: d }, { stiffness: v, damping: g, mass: b, duration: x, velocity: k, isResolvedFromDuration: T } = m1({ ...o, velocity: -_t(o.velocity || 0) }), z = k || 0, _ = g / (2 * Math.sqrt(v * b)), F = p - d, O = _t(Math.sqrt(v / b)), U = Math.abs(F) < 5;
  l || (l = U ? De.restSpeed.granular : De.restSpeed.default), c || (c = U ? De.restDelta.granular : De.restDelta.default);
  let B;
  if (_ < 1) {
    const V = dc(O, _);
    B = (W) => {
      const Q = Math.exp(-_ * O * W);
      return p - Q * ((z + _ * O * F) / V * Math.sin(V * W) + F * Math.cos(V * W));
    };
  } else if (_ === 1) B = (V) => p - Math.exp(-O * V) * (F + (z + O * F) * V);
  else {
    const V = O * Math.sqrt(_ * _ - 1);
    B = (W) => {
      const Q = Math.exp(-_ * O * W), G = Math.min(V * W, 300);
      return p - Q * ((z + _ * O * F) * Math.sinh(G) + V * F * Math.cosh(G)) / V;
    };
  }
  const X = { calculatedDuration: T && x || null, next: (V) => {
    const W = B(V);
    if (T) m.done = V >= x;
    else {
      let Q = V === 0 ? z : 0;
      _ < 1 && (Q = V === 0 ? Gt(z) : fg(B, V, W));
      const G = Math.abs(Q) <= l, ne = Math.abs(p - W) <= c;
      m.done = G && ne;
    }
    return m.value = m.done ? p : W, m;
  }, toString: () => {
    const V = Math.min(uc(X), ro), W = dg((Q) => X.next(V * Q).value, V, 30);
    return V + "ms " + W;
  }, toTransition: () => {
  } };
  return X;
}
ao.applyToOptions = (r) => {
  const s = l1(r, 100, ao);
  return r.ease = s.ease, r.duration = Gt(s.duration), r.type = "keyframes", r;
};
function fc({ keyframes: r, velocity: s = 0, power: o = 0.8, timeConstant: l = 325, bounceDamping: c = 10, bounceStiffness: d = 500, modifyTarget: p, min: m, max: v, restDelta: g = 0.5, restSpeed: b }) {
  const x = r[0], k = { done: false, value: x }, T = (G) => m !== void 0 && G < m || v !== void 0 && G > v, z = (G) => m === void 0 ? v : v === void 0 || Math.abs(m - G) < Math.abs(v - G) ? m : v;
  let _ = o * s;
  const F = x + _, O = p === void 0 ? F : p(F);
  O !== F && (_ = O - x);
  const U = (G) => -_ * Math.exp(-G / l), B = (G) => O + U(G), X = (G) => {
    const ne = U(G), ve = B(G);
    k.done = Math.abs(ne) <= g, k.value = k.done ? O : ve;
  };
  let V, W;
  const Q = (G) => {
    T(k.value) && (V = G, W = ao({ keyframes: [k.value, z(k.value)], velocity: fg(B, G, k.value), damping: c, stiffness: d, restDelta: g, restSpeed: b }));
  };
  return Q(0), { calculatedDuration: null, next: (G) => {
    let ne = false;
    return !W && V === void 0 && (ne = true, X(G), Q(G)), V !== void 0 && G >= V ? W.next(G - V) : (!ne && X(G), k);
  } };
}
function g1(r, s, o) {
  const l = [], c = o || Nn.mix || cg, d = r.length - 1;
  for (let p = 0; p < d; p++) {
    let m = c(r[p], r[p + 1]);
    if (s) {
      const v = Array.isArray(s) ? s[p] || Dt : s;
      m = ys(v, m);
    }
    l.push(m);
  }
  return l;
}
function y1(r, s, { clamp: o = true, ease: l, mixer: c } = {}) {
  const d = r.length;
  if (Ku(d === s.length), d === 1) return () => s[0];
  if (d === 2 && s[0] === s[1]) return () => s[1];
  const p = r[0] === r[1];
  r[0] > r[d - 1] && (r = [...r].reverse(), s = [...s].reverse());
  const m = g1(s, l, c), v = m.length, g = (b) => {
    if (p && b < r[0]) return s[0];
    let x = 0;
    if (v > 1) for (; x < r.length - 2 && !(b < r[x + 1]); x++) ;
    const k = vs(r[x], r[x + 1], b);
    return m[x](k);
  };
  return o ? (b) => g(tn(r[0], r[d - 1], b)) : g;
}
function v1(r, s) {
  const o = r[r.length - 1];
  for (let l = 1; l <= s; l++) {
    const c = vs(0, s, l);
    r.push(ze(o, 1, c));
  }
}
function b1(r) {
  const s = [0];
  return v1(s, r.length - 1), s;
}
function x1(r, s) {
  return r.map((o) => o * s);
}
function w1(r, s) {
  return r.map(() => s || Wm).splice(0, r.length - 1);
}
function Ns({ duration: r = 300, keyframes: s, times: o, ease: l = "easeInOut" }) {
  const c = Rx(l) ? l.map(Km) : Km(l), d = { done: false, value: s[0] }, p = x1(o && o.length === s.length ? o : b1(s), r), m = y1(p, s, { ease: Array.isArray(c) ? c : w1(s, c) });
  return { calculatedDuration: r, next: (v) => (d.value = m(v), d.done = v >= r, d) };
}
const k1 = (r) => r !== null;
function hc(r, { repeat: s, repeatType: o = "loop" }, l, c = 1) {
  const d = r.filter(k1), p = c < 0 || s && o !== "loop" && s % 2 === 1 ? 0 : d.length - 1;
  return !p || l === void 0 ? d[p] : l;
}
const S1 = { decay: fc, inertia: fc, tween: Ns, keyframes: Ns, spring: ao };
function pg(r) {
  typeof r.type == "string" && (r.type = S1[r.type]);
}
class pc {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((s) => {
      this.resolve = s;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(s, o) {
    return this.finished.then(s, o);
  }
}
const N1 = (r) => r / 100;
class mc extends pc {
  constructor(s) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = false, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var o, l;
      const { motionValue: c } = this.options;
      c && c.updatedAt !== ct.now() && this.tick(ct.now()), this.isStopped = true, this.state !== "idle" && (this.teardown(), (l = (o = this.options).onStop) == null || l.call(o));
    }, this.options = s, this.initAnimation(), this.play(), s.autoplay === false && this.pause();
  }
  initAnimation() {
    const { options: s } = this;
    pg(s);
    const { type: o = Ns, repeat: l = 0, repeatDelay: c = 0, repeatType: d, velocity: p = 0 } = s;
    let { keyframes: m } = s;
    const v = o || Ns;
    v !== Ns && typeof m[0] != "number" && (this.mixKeyframes = ys(N1, cg(m[0], m[1])), m = [0, 100]);
    const g = v({ ...s, keyframes: m });
    d === "mirror" && (this.mirroredGenerator = v({ ...s, keyframes: [...m].reverse(), velocity: -p })), g.calculatedDuration === null && (g.calculatedDuration = uc(g));
    const { calculatedDuration: b } = g;
    this.calculatedDuration = b, this.resolvedDuration = b + c, this.totalDuration = this.resolvedDuration * (l + 1) - c, this.generator = g;
  }
  updateTime(s) {
    const o = Math.round(s - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = o;
  }
  tick(s, o = false) {
    const { generator: l, totalDuration: c, mixKeyframes: d, mirroredGenerator: p, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null) return l.next(0);
    const { delay: g = 0, keyframes: b, repeat: x, repeatType: k, repeatDelay: T, type: z, onUpdate: _, finalKeyframe: F } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, s) : this.speed < 0 && (this.startTime = Math.min(s - c / this.speed, this.startTime)), o ? this.currentTime = s : this.updateTime(s);
    const O = this.currentTime - g * (this.playbackSpeed >= 0 ? 1 : -1), U = this.playbackSpeed >= 0 ? O < 0 : O > c;
    this.currentTime = Math.max(O, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let B = this.currentTime, X = l;
    if (x) {
      const G = Math.min(this.currentTime, c) / m;
      let ne = Math.floor(G), ve = G % 1;
      !ve && G >= 1 && (ve = 1), ve === 1 && ne--, ne = Math.min(ne, x + 1), ne % 2 && (k === "reverse" ? (ve = 1 - ve, T && (ve -= T / m)) : k === "mirror" && (X = p)), B = tn(0, 1, ve) * m;
    }
    const V = U ? { done: false, value: b[0] } : X.next(B);
    d && (V.value = d(V.value));
    let { done: W } = V;
    !U && v !== null && (W = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const Q = this.holdTime === null && (this.state === "finished" || this.state === "running" && W);
    return Q && z !== fc && (V.value = hc(b, this.options, F, this.speed)), _ && _(V.value), Q && this.finish(), V;
  }
  then(s, o) {
    return this.finished.then(s, o);
  }
  get duration() {
    return _t(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: s = 0 } = this.options || {};
    return this.duration + _t(s);
  }
  get time() {
    return _t(this.currentTime);
  }
  set time(s) {
    var o;
    s = Gt(s), this.currentTime = s, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = s : this.driver && (this.startTime = this.driver.now() - s / this.playbackSpeed), (o = this.driver) == null || o.start(false);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(s) {
    this.updateTime(ct.now());
    const o = this.playbackSpeed !== s;
    this.playbackSpeed = s, o && (this.time = _t(this.currentTime));
  }
  play() {
    var s, o;
    if (this.isStopped) return;
    const { driver: l = o1, startTime: c } = this.options;
    this.driver || (this.driver = l((p) => this.tick(p))), (o = (s = this.options).onPlay) == null || o.call(s);
    const d = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = d) : this.holdTime !== null ? this.startTime = d - this.holdTime : this.startTime || (this.startTime = c ?? d), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(ct.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var s, o;
    this.notifyFinished(), this.teardown(), this.state = "finished", (o = (s = this.options).onComplete) == null || o.call(s);
  }
  cancel() {
    var s, o;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (o = (s = this.options).onCancel) == null || o.call(s);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(s) {
    return this.startTime = 0, this.tick(s, true);
  }
  attachTimeline(s) {
    var o;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (o = this.driver) == null || o.stop(), s.observe(this);
  }
}
function C1(r) {
  for (let s = 1; s < r.length; s++) r[s] ?? (r[s] = r[s - 1]);
}
const kr = (r) => r * 180 / Math.PI, gc = (r) => {
  const s = kr(Math.atan2(r[1], r[0]));
  return yc(s);
}, P1 = { x: 4, y: 5, translateX: 4, translateY: 5, scaleX: 0, scaleY: 3, scale: (r) => (Math.abs(r[0]) + Math.abs(r[3])) / 2, rotate: gc, rotateZ: gc, skewX: (r) => kr(Math.atan(r[1])), skewY: (r) => kr(Math.atan(r[2])), skew: (r) => (Math.abs(r[1]) + Math.abs(r[2])) / 2 }, yc = (r) => (r = r % 360, r < 0 && (r += 360), r), mg = gc, gg = (r) => Math.sqrt(r[0] * r[0] + r[1] * r[1]), yg = (r) => Math.sqrt(r[4] * r[4] + r[5] * r[5]), E1 = { x: 12, y: 13, z: 14, translateX: 12, translateY: 13, translateZ: 14, scaleX: gg, scaleY: yg, scale: (r) => (gg(r) + yg(r)) / 2, rotateX: (r) => yc(kr(Math.atan2(r[6], r[5]))), rotateY: (r) => yc(kr(Math.atan2(-r[2], r[0]))), rotateZ: mg, rotate: mg, skewX: (r) => kr(Math.atan(r[4])), skewY: (r) => kr(Math.atan(r[1])), skew: (r) => (Math.abs(r[1]) + Math.abs(r[4])) / 2 };
function vc(r) {
  return r.includes("scale") ? 1 : 0;
}
function bc(r, s) {
  if (!r || r === "none") return vc(s);
  const o = r.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, c;
  if (o) l = E1, c = o;
  else {
    const m = r.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = P1, c = m;
  }
  if (!c) return vc(s);
  const d = l[s], p = c[1].split(",").map(j1);
  return typeof d == "function" ? d(p) : p[d];
}
const T1 = (r, s) => {
  const { transform: o = "none" } = getComputedStyle(r);
  return bc(o, s);
};
function j1(r) {
  return parseFloat(r.trim());
}
const fa = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"], ha = new Set(fa), vg = (r) => r === ca || r === Y, L1 = /* @__PURE__ */ new Set(["x", "y", "z"]), A1 = fa.filter((r) => !L1.has(r));
function R1(r) {
  const s = [];
  return A1.forEach((o) => {
    const l = r.getValue(o);
    l !== void 0 && (s.push([o, l.get()]), l.set(o.startsWith("scale") ? 1 : 0));
  }), s;
}
const Jn = { width: ({ x: r }, { paddingLeft: s = "0", paddingRight: o = "0" }) => r.max - r.min - parseFloat(s) - parseFloat(o), height: ({ y: r }, { paddingTop: s = "0", paddingBottom: o = "0" }) => r.max - r.min - parseFloat(s) - parseFloat(o), top: (r, { top: s }) => parseFloat(s), left: (r, { left: s }) => parseFloat(s), bottom: ({ y: r }, { top: s }) => parseFloat(s) + (r.max - r.min), right: ({ x: r }, { left: s }) => parseFloat(s) + (r.max - r.min), x: (r, { transform: s }) => bc(s, "x"), y: (r, { transform: s }) => bc(s, "y") };
Jn.translateX = Jn.x, Jn.translateY = Jn.y;
const Sr = /* @__PURE__ */ new Set();
let xc = false, wc = false, kc = false;
function bg() {
  if (wc) {
    const r = Array.from(Sr).filter((l) => l.needsMeasurement), s = new Set(r.map((l) => l.element)), o = /* @__PURE__ */ new Map();
    s.forEach((l) => {
      const c = R1(l);
      c.length && (o.set(l, c), l.render());
    }), r.forEach((l) => l.measureInitialState()), s.forEach((l) => {
      l.render();
      const c = o.get(l);
      c && c.forEach(([d, p]) => {
        var m;
        (m = l.getValue(d)) == null || m.set(p);
      });
    }), r.forEach((l) => l.measureEndState()), r.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  wc = false, xc = false, Sr.forEach((r) => r.complete(kc)), Sr.clear();
}
function xg() {
  Sr.forEach((r) => {
    r.readKeyframes(), r.needsMeasurement && (wc = true);
  });
}
function M1() {
  kc = true, xg(), bg(), kc = false;
}
class Sc {
  constructor(s, o, l, c, d, p = false) {
    this.state = "pending", this.isAsync = false, this.needsMeasurement = false, this.unresolvedKeyframes = [...s], this.onComplete = o, this.name = l, this.motionValue = c, this.element = d, this.isAsync = p;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Sr.add(this), xc || (xc = true, Le.read(xg), Le.resolveKeyframes(bg))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: s, name: o, element: l, motionValue: c } = this;
    if (s[0] === null) {
      const d = c?.get(), p = s[s.length - 1];
      if (d !== void 0) s[0] = d;
      else if (l && o) {
        const m = l.readValue(o, p);
        m != null && (s[0] = m);
      }
      s[0] === void 0 && (s[0] = p), c && d === void 0 && c.set(s[0]);
    }
    C1(s);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(s = false) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, s), Sr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Sr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const I1 = (r) => r.startsWith("--");
function z1(r, s, o) {
  I1(s) ? r.style.setProperty(s, o) : r.style[s] = o;
}
const O1 = {};
function wg(r, s) {
  const o = Fm(r);
  return () => O1[s] ?? o();
}
const F1 = wg(() => window.ScrollTimeline !== void 0, "scrollTimeline"), kg = wg(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return false;
  }
  return true;
}, "linearEasing"), Cs = ([r, s, o, l]) => `cubic-bezier(${r}, ${s}, ${o}, ${l})`, Sg = { linear: "linear", ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out", circIn: Cs([0, 0.65, 0.55, 1]), circOut: Cs([0.55, 0, 1, 0.45]), backIn: Cs([0.31, 0.01, 0.66, -0.59]), backOut: Cs([0.33, 1.53, 0.69, 0.99]) };
function Ng(r, s) {
  if (r) return typeof r == "function" ? kg() ? dg(r, s) : "ease-out" : Qm(r) ? Cs(r) : Array.isArray(r) ? r.map((o) => Ng(o, s) || Sg.easeOut) : Sg[r];
}
function D1(r, s, o, { delay: l = 0, duration: c = 300, repeat: d = 0, repeatType: p = "loop", ease: m = "easeOut", times: v } = {}, g = void 0) {
  const b = { [s]: o };
  v && (b.offset = v);
  const x = Ng(m, c);
  Array.isArray(x) && (b.easing = x);
  const k = { delay: l, duration: c, easing: Array.isArray(x) ? "linear" : x, fill: "both", iterations: d + 1, direction: p === "reverse" ? "alternate" : "normal" };
  return g && (k.pseudoElement = g), r.animate(b, k);
}
function Cg(r) {
  return typeof r == "function" && "applyToOptions" in r;
}
function _1({ type: r, ...s }) {
  return Cg(r) && kg() ? r.applyToOptions(s) : (s.duration ?? (s.duration = 300), s.ease ?? (s.ease = "easeOut"), s);
}
class Pg extends pc {
  constructor(s) {
    if (super(), this.finishedTime = null, this.isStopped = false, this.manualStartTime = null, !s) return;
    const { element: o, name: l, keyframes: c, pseudoElement: d, allowFlatten: p = false, finalKeyframe: m, onComplete: v } = s;
    this.isPseudoElement = !!d, this.allowFlatten = p, this.options = s, Ku(typeof s.type != "string");
    const g = _1(s);
    this.animation = D1(o, l, c, g, d), g.autoplay === false && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const b = hc(c, this.options, m, this.speed);
        this.updateMotionValue ? this.updateMotionValue(b) : z1(o, l, b), this.animation.cancel();
      }
      v?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var s, o;
    (o = (s = this.animation).finish) == null || o.call(s);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = true;
    const { state: s } = this;
    s === "idle" || s === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var s, o, l;
    const c = (s = this.options) == null ? void 0 : s.element;
    !this.isPseudoElement && c != null && c.isConnected && ((l = (o = this.animation).commitStyles) == null || l.call(o));
  }
  get duration() {
    var s, o;
    const l = ((o = (s = this.animation.effect) == null ? void 0 : s.getComputedTiming) == null ? void 0 : o.call(s).duration) || 0;
    return _t(Number(l));
  }
  get iterationDuration() {
    const { delay: s = 0 } = this.options || {};
    return this.duration + _t(s);
  }
  get time() {
    return _t(Number(this.animation.currentTime) || 0);
  }
  set time(s) {
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = Gt(s);
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(s) {
    s < 0 && (this.finishedTime = null), this.animation.playbackRate = s;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(s) {
    this.manualStartTime = this.animation.startTime = s;
  }
  attachTimeline({ timeline: s, observe: o }) {
    var l;
    return this.allowFlatten && ((l = this.animation.effect) == null || l.updateTiming({ easing: "linear" })), this.animation.onfinish = null, s && F1() ? (this.animation.timeline = s, Dt) : o(this);
  }
}
const Eg = { anticipate: $m, backInOut: Hm, circInOut: Gm };
function V1(r) {
  return r in Eg;
}
function B1(r) {
  typeof r.ease == "string" && V1(r.ease) && (r.ease = Eg[r.ease]);
}
const Nc = 10;
class U1 extends Pg {
  constructor(s) {
    B1(s), pg(s), super(s), s.startTime !== void 0 && (this.startTime = s.startTime), this.options = s;
  }
  updateMotionValue(s) {
    const { motionValue: o, onUpdate: l, onComplete: c, element: d, ...p } = this.options;
    if (!o) return;
    if (s !== void 0) {
      o.set(s);
      return;
    }
    const m = new mc({ ...p, autoplay: false }), v = Math.max(Nc, ct.now() - this.startTime), g = tn(0, Nc, v - Nc);
    o.setWithVelocity(m.sample(Math.max(0, v - g)).value, m.sample(v).value, g), m.stop();
  }
}
const Tg = (r, s) => s === "zIndex" ? false : !!(typeof r == "number" || Array.isArray(r) || typeof r == "string" && (Wt.test(r) || r === "0") && !r.startsWith("url("));
function H1(r) {
  const s = r[0];
  if (r.length === 1) return true;
  for (let o = 0; o < r.length; o++) if (r[o] !== s) return true;
}
function $1(r, s, o, l) {
  const c = r[0];
  if (c === null) return false;
  if (s === "display" || s === "visibility") return true;
  const d = r[r.length - 1], p = Tg(c, s), m = Tg(d, s);
  return !p || !m ? false : H1(r) || (o === "spring" || Cg(o)) && l;
}
function Cc(r) {
  r.duration = 0, r.type = "keyframes";
}
const q1 = /* @__PURE__ */ new Set(["opacity", "clipPath", "filter", "transform"]), G1 = Fm(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function W1(r) {
  var s;
  const { motionValue: o, name: l, repeatDelay: c, repeatType: d, damping: p, type: m } = r;
  if (!(((s = o?.owner) == null ? void 0 : s.current) instanceof HTMLElement)) return false;
  const { onUpdate: v, transformTemplate: g } = o.owner.getProps();
  return G1() && l && q1.has(l) && (l !== "transform" || !g) && !v && !c && d !== "mirror" && p !== 0 && m !== "inertia";
}
const Q1 = 40;
class K1 extends pc {
  constructor({ autoplay: s = true, delay: o = 0, type: l = "keyframes", repeat: c = 0, repeatDelay: d = 0, repeatType: p = "loop", keyframes: m, name: v, motionValue: g, element: b, ...x }) {
    var k;
    super(), this.stop = () => {
      var _, F;
      this._animation && (this._animation.stop(), (_ = this.stopTimeline) == null || _.call(this)), (F = this.keyframeResolver) == null || F.cancel();
    }, this.createdAt = ct.now();
    const T = { autoplay: s, delay: o, type: l, repeat: c, repeatDelay: d, repeatType: p, name: v, motionValue: g, element: b, ...x }, z = b?.KeyframeResolver || Sc;
    this.keyframeResolver = new z(m, (_, F, O) => this.onKeyframesResolved(_, F, T, !O), v, g, b), (k = this.keyframeResolver) == null || k.scheduleResolve();
  }
  onKeyframesResolved(s, o, l, c) {
    var d, p;
    this.keyframeResolver = void 0;
    const { name: m, type: v, velocity: g, delay: b, isHandoff: x, onUpdate: k } = l;
    this.resolvedAt = ct.now(), $1(s, m, v, g) || ((Nn.instantAnimations || !b) && k?.(hc(s, l, o)), s[0] = s[s.length - 1], Cc(l), l.repeat = 0);
    const T = { startTime: c ? this.resolvedAt ? this.resolvedAt - this.createdAt > Q1 ? this.resolvedAt : this.createdAt : this.createdAt : void 0, finalKeyframe: o, ...l, keyframes: s }, z = !x && W1(T), _ = (p = (d = T.motionValue) == null ? void 0 : d.owner) == null ? void 0 : p.current, F = z ? new U1({ ...T, element: _ }) : new mc(T);
    F.finished.then(() => {
      this.notifyFinished();
    }).catch(Dt), this.pendingTimeline && (this.stopTimeline = F.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = F;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(s, o) {
    return this.finished.finally(s).then(() => {
    });
  }
  get animation() {
    var s;
    return this._animation || ((s = this.keyframeResolver) == null || s.resume(), M1()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(s) {
    this.animation.time = s;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(s) {
    this.animation.speed = s;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(s) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(s) : this.pendingTimeline = s, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var s;
    this._animation && this.animation.cancel(), (s = this.keyframeResolver) == null || s.cancel();
  }
}
function jg(r, s, o, l = 0, c = 1) {
  const d = Array.from(r).sort((v, g) => v.sortNodePosition(g)).indexOf(s), p = r.size, m = (p - 1) * l;
  return typeof o == "function" ? o(d, p) : c === 1 ? d * l : m - d * l;
}
const X1 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Y1(r) {
  const s = X1.exec(r);
  if (!s) return [,];
  const [, o, l, c] = s;
  return [`--${o ?? l}`, c];
}
function Lg(r, s, o = 1) {
  const [l, c] = Y1(r);
  if (!l) return;
  const d = window.getComputedStyle(s).getPropertyValue(l);
  if (d) {
    const p = d.trim();
    return Im(p) ? parseFloat(p) : p;
  }
  return ec(c) ? Lg(c, s, o + 1) : c;
}
const Z1 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 }, J1 = (r) => ({ type: "spring", stiffness: 550, damping: r === 0 ? 2 * Math.sqrt(550) : 30, restSpeed: 10 }), ew = { type: "keyframes", duration: 0.8 }, tw = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 }, nw = (r, { keyframes: s }) => s.length > 2 ? ew : ha.has(r) ? r.startsWith("scale") ? J1(s[1]) : Z1 : tw, rw = (r) => r !== null;
function aw(r, { repeat: s, repeatType: o = "loop" }, l) {
  const c = r.filter(rw), d = s && o !== "loop" && s % 2 === 1 ? 0 : c.length - 1;
  return c[d];
}
function Ag(r, s) {
  if (r != null && r.inherit && s) {
    const { inherit: o, ...l } = r;
    return { ...s, ...l };
  }
  return r;
}
function Pc(r, s) {
  const o = r?.[s] ?? r?.default ?? r;
  return o !== r ? Ag(o, r) : o;
}
function sw({ when: r, delay: s, delayChildren: o, staggerChildren: l, staggerDirection: c, repeat: d, repeatType: p, repeatDelay: m, from: v, elapsed: g, ...b }) {
  return !!Object.keys(b).length;
}
const Ec = (r, s, o, l = {}, c, d) => (p) => {
  const m = Pc(l, r) || {}, v = m.delay || l.delay || 0;
  let { elapsed: g = 0 } = l;
  g = g - Gt(v);
  const b = { keyframes: Array.isArray(o) ? o : [null, o], ease: "easeOut", velocity: s.getVelocity(), ...m, delay: -g, onUpdate: (k) => {
    s.set(k), m.onUpdate && m.onUpdate(k);
  }, onComplete: () => {
    p(), m.onComplete && m.onComplete();
  }, name: r, motionValue: s, element: d ? void 0 : c };
  sw(m) || Object.assign(b, nw(r, b)), b.duration && (b.duration = Gt(b.duration)), b.repeatDelay && (b.repeatDelay = Gt(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let x = false;
  if ((b.type === false || b.duration === 0 && !b.repeatDelay) && (Cc(b), b.delay === 0 && (x = true)), (Nn.instantAnimations || Nn.skipAnimations || c != null && c.shouldSkipAnimations) && (x = true, Cc(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, x && !d && s.get() !== void 0) {
    const k = aw(b.keyframes, m);
    if (k !== void 0) {
      Le.update(() => {
        b.onUpdate(k), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new mc(b) : new K1(b);
};
function Rg(r) {
  const s = [{}, {}];
  return r?.values.forEach((o, l) => {
    s[0][l] = o.get(), s[1][l] = o.getVelocity();
  }), s;
}
function Tc(r, s, o, l) {
  if (typeof s == "function") {
    const [c, d] = Rg(l);
    s = s(o !== void 0 ? o : r.custom, c, d);
  }
  if (typeof s == "string" && (s = r.variants && r.variants[s]), typeof s == "function") {
    const [c, d] = Rg(l);
    s = s(o !== void 0 ? o : r.custom, c, d);
  }
  return s;
}
function pa(r, s, o) {
  const l = r.getProps();
  return Tc(l, s, o !== void 0 ? o : l.custom, r);
}
const Mg = /* @__PURE__ */ new Set(["width", "height", "top", "left", "right", "bottom", ...fa]), Ig = 30, iw = (r) => !isNaN(parseFloat(r));
class ow {
  constructor(s, o = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      var c;
      const d = ct.now();
      if (this.updatedAt !== d && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && ((c = this.events.change) == null || c.notify(this.current), this.dependents)) for (const p of this.dependents) p.dirty();
    }, this.hasAnimated = false, this.setCurrent(s), this.owner = o.owner;
  }
  setCurrent(s) {
    this.current = s, this.updatedAt = ct.now(), this.canTrackVelocity === null && s !== void 0 && (this.canTrackVelocity = iw(this.current));
  }
  setPrevFrameValue(s = this.current) {
    this.prevFrameValue = s, this.prevUpdatedAt = this.updatedAt;
  }
  onChange(s) {
    return this.on("change", s);
  }
  on(s, o) {
    this.events[s] || (this.events[s] = new Xu());
    const l = this.events[s].add(o);
    return s === "change" ? () => {
      l(), Le.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : l;
  }
  clearListeners() {
    for (const s in this.events) this.events[s].clear();
  }
  attach(s, o) {
    this.passiveEffect = s, this.stopPassiveEffect = o;
  }
  set(s) {
    this.passiveEffect ? this.passiveEffect(s, this.updateAndNotify) : this.updateAndNotify(s);
  }
  setWithVelocity(s, o, l) {
    this.set(o), this.prev = void 0, this.prevFrameValue = s, this.prevUpdatedAt = this.updatedAt - l;
  }
  jump(s, o = true) {
    this.updateAndNotify(s), this.prev = s, this.prevUpdatedAt = this.prevFrameValue = void 0, o && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var s;
    (s = this.events.change) == null || s.notify(this.current);
  }
  addDependent(s) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(s);
  }
  removeDependent(s) {
    this.dependents && this.dependents.delete(s);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const s = ct.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || s - this.updatedAt > Ig) return 0;
    const o = Math.min(this.updatedAt - this.prevUpdatedAt, Ig);
    return Dm(parseFloat(this.current) - parseFloat(this.prevFrameValue), o);
  }
  start(s) {
    return this.stop(), new Promise((o) => {
      this.hasAnimated = true, this.animation = s(o), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var s, o;
    (s = this.dependents) == null || s.clear(), (o = this.events.destroy) == null || o.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function ma(r, s) {
  return new ow(r, s);
}
const jc = (r) => Array.isArray(r);
function lw(r, s, o) {
  r.hasValue(s) ? r.getValue(s).set(o) : r.addValue(s, ma(o));
}
function uw(r) {
  return jc(r) ? r[r.length - 1] || 0 : r;
}
function cw(r, s) {
  const o = pa(r, s);
  let { transitionEnd: l = {}, transition: c = {}, ...d } = o || {};
  d = { ...d, ...l };
  for (const p in d) {
    const m = uw(d[p]);
    lw(r, p, m);
  }
}
const ot = (r) => !!(r && r.getVelocity);
function dw(r) {
  return !!(ot(r) && r.add);
}
function Lc(r, s) {
  const o = r.getValue("willChange");
  if (dw(o)) return o.add(s);
  if (!o && Nn.WillChange) {
    const l = new Nn.WillChange("auto");
    r.addValue("willChange", l), l.add(s);
  }
}
function Ac(r) {
  return r.replace(/([A-Z])/g, (s) => `-${s.toLowerCase()}`);
}
const fw = "framerAppearId", zg = "data-" + Ac(fw);
function Og(r) {
  return r.props[zg];
}
function hw({ protectedKeys: r, needsAnimating: s }, o) {
  const l = r.hasOwnProperty(o) && s[o] !== true;
  return s[o] = false, l;
}
function Fg(r, s, { delay: o = 0, transitionOverride: l, type: c } = {}) {
  let { transition: d, transitionEnd: p, ...m } = s;
  const v = r.getDefaultTransition();
  d = d ? Ag(d, v) : v;
  const g = d?.reduceMotion;
  l && (d = l);
  const b = [], x = c && r.animationState && r.animationState.getState()[c];
  for (const k in m) {
    const T = r.getValue(k, r.latestValues[k] ?? null), z = m[k];
    if (z === void 0 || x && hw(x, k)) continue;
    const _ = { delay: o, ...Pc(d || {}, k) }, F = T.get();
    if (F !== void 0 && !T.isAnimating && !Array.isArray(z) && z === F && !_.velocity) continue;
    let O = false;
    if (window.MotionHandoffAnimation) {
      const X = Og(r);
      if (X) {
        const V = window.MotionHandoffAnimation(X, k, Le);
        V !== null && (_.startTime = V, O = true);
      }
    }
    Lc(r, k);
    const U = g ?? r.shouldReduceMotion;
    T.start(Ec(k, T, z, U && Mg.has(k) ? { type: false } : _, r, O));
    const B = T.animation;
    B && b.push(B);
  }
  if (p) {
    const k = () => Le.update(() => {
      p && cw(r, p);
    });
    b.length ? Promise.all(b).then(k) : k();
  }
  return b;
}
function Rc(r, s, o = {}) {
  var l;
  const c = pa(r, s, o.type === "exit" ? (l = r.presenceContext) == null ? void 0 : l.custom : void 0);
  let { transition: d = r.getDefaultTransition() || {} } = c || {};
  o.transitionOverride && (d = o.transitionOverride);
  const p = c ? () => Promise.all(Fg(r, c, o)) : () => Promise.resolve(), m = r.variantChildren && r.variantChildren.size ? (g = 0) => {
    const { delayChildren: b = 0, staggerChildren: x, staggerDirection: k } = d;
    return pw(r, s, g, b, x, k, o);
  } : () => Promise.resolve(), { when: v } = d;
  if (v) {
    const [g, b] = v === "beforeChildren" ? [p, m] : [m, p];
    return g().then(() => b());
  } else return Promise.all([p(), m(o.delay)]);
}
function pw(r, s, o = 0, l = 0, c = 0, d = 1, p) {
  const m = [];
  for (const v of r.variantChildren) v.notify("AnimationStart", s), m.push(Rc(v, s, { ...p, delay: o + (typeof l == "function" ? 0 : l) + jg(r.variantChildren, v, l, c, d) }).then(() => v.notify("AnimationComplete", s)));
  return Promise.all(m);
}
function mw(r, s, o = {}) {
  r.notify("AnimationStart", s);
  let l;
  if (Array.isArray(s)) {
    const c = s.map((d) => Rc(r, d, o));
    l = Promise.all(c);
  } else if (typeof s == "string") l = Rc(r, s, o);
  else {
    const c = typeof s == "function" ? pa(r, s, o.custom) : s;
    l = Promise.all(Fg(r, c, o));
  }
  return l.then(() => {
    r.notify("AnimationComplete", s);
  });
}
const gw = { test: (r) => r === "auto", parse: (r) => r }, Dg = (r) => (s) => s.test(r), _g = [ca, Y, nn, Zn, qx, $x, gw], Vg = (r) => _g.find(Dg(r));
function yw(r) {
  return typeof r == "number" ? r === 0 : r !== null ? r === "none" || r === "0" || Om(r) : true;
}
const vw = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function bw(r) {
  const [s, o] = r.slice(0, -1).split("(");
  if (s === "drop-shadow") return r;
  const [l] = o.match(tc) || [];
  if (!l) return r;
  const c = o.replace(l, "");
  let d = vw.has(s) ? 1 : 0;
  return l !== o && (d *= 100), s + "(" + d + c + ")";
}
const xw = /\b([a-z-]*)\(.*?\)/gu, Mc = { ...Wt, getAnimatableNone: (r) => {
  const s = r.match(xw);
  return s ? s.map(bw).join(" ") : r;
} }, Ic = { ...Wt, getAnimatableNone: (r) => {
  const s = Wt.parse(r);
  return Wt.createTransformer(r)(s.map((o) => typeof o == "number" ? 0 : typeof o == "object" ? { ...o, alpha: 1 } : o));
} }, Bg = { ...ca, transform: Math.round }, ww = { rotate: Zn, rotateX: Zn, rotateY: Zn, rotateZ: Zn, scale: to, scaleX: to, scaleY: to, scaleZ: to, skew: Zn, skewX: Zn, skewY: Zn, distance: Y, translateX: Y, translateY: Y, translateZ: Y, x: Y, y: Y, z: Y, perspective: Y, transformPerspective: Y, opacity: xs, originX: tg, originY: tg, originZ: Y }, zc = { borderWidth: Y, borderTopWidth: Y, borderRightWidth: Y, borderBottomWidth: Y, borderLeftWidth: Y, borderRadius: Y, borderTopLeftRadius: Y, borderTopRightRadius: Y, borderBottomRightRadius: Y, borderBottomLeftRadius: Y, width: Y, maxWidth: Y, height: Y, maxHeight: Y, top: Y, right: Y, bottom: Y, left: Y, inset: Y, insetBlock: Y, insetBlockStart: Y, insetBlockEnd: Y, insetInline: Y, insetInlineStart: Y, insetInlineEnd: Y, padding: Y, paddingTop: Y, paddingRight: Y, paddingBottom: Y, paddingLeft: Y, paddingBlock: Y, paddingBlockStart: Y, paddingBlockEnd: Y, paddingInline: Y, paddingInlineStart: Y, paddingInlineEnd: Y, margin: Y, marginTop: Y, marginRight: Y, marginBottom: Y, marginLeft: Y, marginBlock: Y, marginBlockStart: Y, marginBlockEnd: Y, marginInline: Y, marginInlineStart: Y, marginInlineEnd: Y, fontSize: Y, backgroundPositionX: Y, backgroundPositionY: Y, ...ww, zIndex: Bg, fillOpacity: xs, strokeOpacity: xs, numOctaves: Bg }, kw = { ...zc, color: We, backgroundColor: We, outlineColor: We, fill: We, stroke: We, borderColor: We, borderTopColor: We, borderRightColor: We, borderBottomColor: We, borderLeftColor: We, filter: Mc, WebkitFilter: Mc, mask: Ic, WebkitMask: Ic }, Ug = (r) => kw[r], Sw = /* @__PURE__ */ new Set([Mc, Ic]);
function Hg(r, s) {
  let o = Ug(r);
  return Sw.has(o) || (o = Wt), o.getAnimatableNone ? o.getAnimatableNone(s) : void 0;
}
const Nw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Cw(r, s, o) {
  let l = 0, c;
  for (; l < r.length && !c; ) {
    const d = r[l];
    typeof d == "string" && !Nw.has(d) && Ss(d).values.length && (c = r[l]), l++;
  }
  if (c && o) for (const d of s) r[d] = Hg(o, c);
}
class Pw extends Sc {
  constructor(s, o, l, c, d) {
    super(s, o, l, c, d, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes: s, element: o, name: l } = this;
    if (!o || !o.current) return;
    super.readKeyframes();
    for (let b = 0; b < s.length; b++) {
      let x = s[b];
      if (typeof x == "string" && (x = x.trim(), ec(x))) {
        const k = Lg(x, o.current);
        k !== void 0 && (s[b] = k), b === s.length - 1 && (this.finalKeyframe = x);
      }
    }
    if (this.resolveNoneKeyframes(), !Mg.has(l) || s.length !== 2) return;
    const [c, d] = s, p = Vg(c), m = Vg(d), v = Jm(c), g = Jm(d);
    if (v !== g && Jn[l]) {
      this.needsMeasurement = true;
      return;
    }
    if (p !== m) if (vg(p) && vg(m)) for (let b = 0; b < s.length; b++) {
      const x = s[b];
      typeof x == "string" && (s[b] = parseFloat(x));
    }
    else Jn[l] && (this.needsMeasurement = true);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: s, name: o } = this, l = [];
    for (let c = 0; c < s.length; c++) (s[c] === null || yw(s[c])) && l.push(c);
    l.length && Cw(s, l, o);
  }
  measureInitialState() {
    const { element: s, unresolvedKeyframes: o, name: l } = this;
    if (!s || !s.current) return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Jn[l](s.measureViewportBox(), window.getComputedStyle(s.current)), o[0] = this.measuredOrigin;
    const c = o[o.length - 1];
    c !== void 0 && s.getValue(l, c).jump(c, false);
  }
  measureEndState() {
    var s;
    const { element: o, name: l, unresolvedKeyframes: c } = this;
    if (!o || !o.current) return;
    const d = o.getValue(l);
    d && d.jump(this.measuredOrigin, false);
    const p = c.length - 1, m = c[p];
    c[p] = Jn[l](o.measureViewportBox(), window.getComputedStyle(o.current)), m !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = m), (s = this.removedTransforms) != null && s.length && this.removedTransforms.forEach(([v, g]) => {
      o.getValue(v).set(g);
    }), this.resolveNoneKeyframes();
  }
}
const Ew = /* @__PURE__ */ new Set(["opacity", "clipPath", "filter", "transform"]);
function $g(r, s, o) {
  if (r == null) return [];
  if (r instanceof EventTarget) return [r];
  if (typeof r == "string") {
    let l = document;
    const c = o?.[r] ?? l.querySelectorAll(r);
    return c ? Array.from(c) : [];
  }
  return Array.from(r).filter((l) => l != null);
}
const qg = (r, s) => s && typeof r == "number" ? s.transform(r) : r;
function Oc(r) {
  return zm(r) && "offsetHeight" in r;
}
const { schedule: Fc } = Xm(queueMicrotask, false), Qt = { x: false, y: false };
function Gg() {
  return Qt.x || Qt.y;
}
function Tw(r) {
  return r === "x" || r === "y" ? Qt[r] ? null : (Qt[r] = true, () => {
    Qt[r] = false;
  }) : Qt.x || Qt.y ? null : (Qt.x = Qt.y = true, () => {
    Qt.x = Qt.y = false;
  });
}
function Wg(r, s) {
  const o = $g(r), l = new AbortController(), c = { passive: true, ...s, signal: l.signal };
  return [o, c, () => l.abort()];
}
function jw(r) {
  return !(r.pointerType === "touch" || Gg());
}
function Lw(r, s, o = {}) {
  const [l, c, d] = Wg(r, o);
  return l.forEach((p) => {
    let m = false, v = false, g;
    const b = () => {
      p.removeEventListener("pointerleave", z);
    }, x = (F) => {
      g && (g(F), g = void 0), b();
    }, k = (F) => {
      m = false, window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), v && (v = false, x(F));
    }, T = () => {
      m = true, window.addEventListener("pointerup", k, c), window.addEventListener("pointercancel", k, c);
    }, z = (F) => {
      if (F.pointerType !== "touch") {
        if (m) {
          v = true;
          return;
        }
        x(F);
      }
    }, _ = (F) => {
      if (!jw(F)) return;
      v = false;
      const O = s(p, F);
      typeof O == "function" && (g = O, p.addEventListener("pointerleave", z, c));
    };
    p.addEventListener("pointerenter", _, c), p.addEventListener("pointerdown", T, c);
  }), d;
}
const Qg = (r, s) => s ? r === s ? true : Qg(r, s.parentElement) : false, Dc = (r) => r.pointerType === "mouse" ? typeof r.button != "number" || r.button <= 0 : r.isPrimary !== false, Aw = /* @__PURE__ */ new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function Rw(r) {
  return Aw.has(r.tagName) || r.isContentEditable === true;
}
const Mw = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Iw(r) {
  return Mw.has(r.tagName) || r.isContentEditable === true;
}
const so = /* @__PURE__ */ new WeakSet();
function Kg(r) {
  return (s) => {
    s.key === "Enter" && r(s);
  };
}
function _c(r, s) {
  r.dispatchEvent(new PointerEvent("pointer" + s, { isPrimary: true, bubbles: true }));
}
const zw = (r, s) => {
  const o = r.currentTarget;
  if (!o) return;
  const l = Kg(() => {
    if (so.has(o)) return;
    _c(o, "down");
    const c = Kg(() => {
      _c(o, "up");
    }), d = () => _c(o, "cancel");
    o.addEventListener("keyup", c, s), o.addEventListener("blur", d, s);
  });
  o.addEventListener("keydown", l, s), o.addEventListener("blur", () => o.removeEventListener("keydown", l), s);
};
function Xg(r) {
  return Dc(r) && !Gg();
}
const Yg = /* @__PURE__ */ new WeakSet();
function Ow(r, s, o = {}) {
  const [l, c, d] = Wg(r, o), p = (m) => {
    const v = m.currentTarget;
    if (!Xg(m) || Yg.has(m)) return;
    so.add(v), o.stopPropagation && Yg.add(m);
    const g = s(v, m), b = (T, z) => {
      window.removeEventListener("pointerup", x), window.removeEventListener("pointercancel", k), so.has(v) && so.delete(v), Xg(T) && typeof g == "function" && g(T, { success: z });
    }, x = (T) => {
      b(T, v === window || v === document || o.useGlobalTarget || Qg(v, T.target));
    }, k = (T) => {
      b(T, false);
    };
    window.addEventListener("pointerup", x, c), window.addEventListener("pointercancel", k, c);
  };
  return l.forEach((m) => {
    (o.useGlobalTarget ? window : m).addEventListener("pointerdown", p, c), Oc(m) && (m.addEventListener("focus", (v) => zw(v, c)), !Rw(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), d;
}
function Vc(r) {
  return zm(r) && "ownerSVGElement" in r;
}
const io = /* @__PURE__ */ new WeakMap();
let ga;
const Zg = (r, s, o) => (l, c) => c && c[0] ? c[0][r + "Size"] : Vc(l) && "getBBox" in l ? l.getBBox()[s] : l[o], Fw = Zg("inline", "width", "offsetWidth"), Dw = Zg("block", "height", "offsetHeight");
function _w({ target: r, borderBoxSize: s }) {
  var o;
  (o = io.get(r)) == null || o.forEach((l) => {
    l(r, { get width() {
      return Fw(r, s);
    }, get height() {
      return Dw(r, s);
    } });
  });
}
function Vw(r) {
  r.forEach(_w);
}
function Bw() {
  typeof ResizeObserver > "u" || (ga = new ResizeObserver(Vw));
}
function Uw(r, s) {
  ga || Bw();
  const o = $g(r);
  return o.forEach((l) => {
    let c = io.get(l);
    c || (c = /* @__PURE__ */ new Set(), io.set(l, c)), c.add(s), ga?.observe(l);
  }), () => {
    o.forEach((l) => {
      const c = io.get(l);
      c?.delete(s), c != null && c.size || ga == null || ga.unobserve(l);
    });
  };
}
const oo = /* @__PURE__ */ new Set();
let ya;
function Hw() {
  ya = () => {
    const r = { get width() {
      return window.innerWidth;
    }, get height() {
      return window.innerHeight;
    } };
    oo.forEach((s) => s(r));
  }, window.addEventListener("resize", ya);
}
function $w(r) {
  return oo.add(r), ya || Hw(), () => {
    oo.delete(r), !oo.size && typeof ya == "function" && (window.removeEventListener("resize", ya), ya = void 0);
  };
}
function Jg(r, s) {
  return typeof r == "function" ? $w(r) : Uw(r, s);
}
function qw(r) {
  return Vc(r) && r.tagName === "svg";
}
const Gw = [..._g, We, Wt], Ww = (r) => Gw.find(Dg(r)), ey = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }), va = () => ({ x: ey(), y: ey() }), ty = () => ({ min: 0, max: 0 }), Ke = () => ({ x: ty(), y: ty() }), Qw = /* @__PURE__ */ new WeakMap();
function lo(r) {
  return r !== null && typeof r == "object" && typeof r.start == "function";
}
function Ps(r) {
  return typeof r == "string" || Array.isArray(r);
}
const Bc = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"], Uc = ["initial", ...Bc];
function uo(r) {
  return lo(r.animate) || Uc.some((s) => Ps(r[s]));
}
function ny(r) {
  return !!(uo(r) || r.variants);
}
function Kw(r, s, o) {
  for (const l in s) {
    const c = s[l], d = o[l];
    if (ot(c)) r.addValue(l, c);
    else if (ot(d)) r.addValue(l, ma(c, { owner: r }));
    else if (d !== c) if (r.hasValue(l)) {
      const p = r.getValue(l);
      p.liveStyle === true ? p.jump(c) : p.hasAnimated || p.set(c);
    } else {
      const p = r.getStaticValue(l);
      r.addValue(l, ma(p !== void 0 ? p : c, { owner: r }));
    }
  }
  for (const l in o) s[l] === void 0 && r.removeValue(l);
  return s;
}
const Hc = { current: null }, ry = { current: false }, Xw = typeof window < "u";
function Yw() {
  if (ry.current = true, !!Xw) if (window.matchMedia) {
    const r = window.matchMedia("(prefers-reduced-motion)"), s = () => Hc.current = r.matches;
    r.addEventListener("change", s), s();
  } else Hc.current = false;
}
const ay = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
let co = {};
function sy(r) {
  co = r;
}
function Zw() {
  return co;
}
class Jw {
  scrapeMotionValuesFromProps(s, o, l) {
    return {};
  }
  constructor({ parent: s, props: o, presenceContext: l, reducedMotionConfig: c, skipAnimations: d, blockInitialAnimation: p, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = false, this.isControllingVariants = false, this.shouldReduceMotion = null, this.shouldSkipAnimations = false, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Sc, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = false, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = ct.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Le.render(this.render, false, true));
    };
    const { latestValues: g, renderState: b } = m;
    this.latestValues = g, this.baseTarget = { ...g }, this.initialValues = o.initial ? { ...g } : {}, this.renderState = b, this.parent = s, this.props = o, this.presenceContext = l, this.depth = s ? s.depth + 1 : 0, this.reducedMotionConfig = c, this.skipAnimationsConfig = d, this.options = v, this.blockInitialAnimation = !!p, this.isControllingVariants = uo(o), this.isVariantNode = ny(o), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(s && s.current);
    const { willChange: x, ...k } = this.scrapeMotionValuesFromProps(o, {}, this);
    for (const T in k) {
      const z = k[T];
      g[T] !== void 0 && ot(z) && z.set(g[T]);
    }
  }
  mount(s) {
    var o, l;
    if (this.hasBeenMounted) for (const c in this.initialValues) (o = this.values.get(c)) == null || o.jump(this.initialValues[c]), this.latestValues[c] = this.initialValues[c];
    this.current = s, Qw.set(s, this), this.projection && !this.projection.instance && this.projection.mount(s), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((c, d) => this.bindToMotionValue(d, c)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = false : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = true : (ry.current || Yw(), this.shouldReduceMotion = Hc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? false, (l = this.parent) == null || l.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = true;
  }
  unmount() {
    var s;
    this.projection && this.projection.unmount(), Yn(this.notifyUpdate), Yn(this.render), this.valueSubscriptions.forEach((o) => o()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (s = this.parent) == null || s.removeChild(this);
    for (const o in this.events) this.events[o].clear();
    for (const o in this.features) {
      const l = this.features[o];
      l && (l.unmount(), l.isMounted = false);
    }
    this.current = null;
  }
  addChild(s) {
    this.children.add(s), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(s);
  }
  removeChild(s) {
    this.children.delete(s), this.enteringChildren && this.enteringChildren.delete(s);
  }
  bindToMotionValue(s, o) {
    if (this.valueSubscriptions.has(s) && this.valueSubscriptions.get(s)(), o.accelerate && Ew.has(s) && this.current instanceof HTMLElement) {
      const { factory: p, keyframes: m, times: v, ease: g, duration: b } = o.accelerate, x = new Pg({ element: this.current, name: s, keyframes: m, times: v, ease: g, duration: Gt(b) }), k = p(x);
      this.valueSubscriptions.set(s, () => {
        k(), x.cancel();
      });
      return;
    }
    const l = ha.has(s);
    l && this.onBindTransform && this.onBindTransform();
    const c = o.on("change", (p) => {
      this.latestValues[s] = p, this.props.onUpdate && Le.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = true), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, s, o)), this.valueSubscriptions.set(s, () => {
      c(), d && d(), o.owner && o.stop();
    });
  }
  sortNodePosition(s) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== s.type ? 0 : this.sortInstanceNodePosition(this.current, s.current);
  }
  updateFeatures() {
    let s = "animation";
    for (s in co) {
      const o = co[s];
      if (!o) continue;
      const { isEnabled: l, Feature: c } = o;
      if (!this.features[s] && c && l(this.props) && (this.features[s] = new c(this)), this.features[s]) {
        const d = this.features[s];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = true);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ke();
  }
  getStaticValue(s) {
    return this.latestValues[s];
  }
  setStaticValue(s, o) {
    this.latestValues[s] = o;
  }
  update(s, o) {
    (s.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = s, this.prevPresenceContext = this.presenceContext, this.presenceContext = o;
    for (let l = 0; l < ay.length; l++) {
      const c = ay[l];
      this.propEventSubscriptions[c] && (this.propEventSubscriptions[c](), delete this.propEventSubscriptions[c]);
      const d = "on" + c, p = s[d];
      p && (this.propEventSubscriptions[c] = this.on(c, p));
    }
    this.prevMotionValues = Kw(this, this.scrapeMotionValuesFromProps(s, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(s) {
    return this.props.variants ? this.props.variants[s] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(s) {
    const o = this.getClosestVariantNode();
    if (o) return o.variantChildren && o.variantChildren.add(s), () => o.variantChildren.delete(s);
  }
  addValue(s, o) {
    const l = this.values.get(s);
    o !== l && (l && this.removeValue(s), this.bindToMotionValue(s, o), this.values.set(s, o), this.latestValues[s] = o.get());
  }
  removeValue(s) {
    this.values.delete(s);
    const o = this.valueSubscriptions.get(s);
    o && (o(), this.valueSubscriptions.delete(s)), delete this.latestValues[s], this.removeValueFromRenderState(s, this.renderState);
  }
  hasValue(s) {
    return this.values.has(s);
  }
  getValue(s, o) {
    if (this.props.values && this.props.values[s]) return this.props.values[s];
    let l = this.values.get(s);
    return l === void 0 && o !== void 0 && (l = ma(o === null ? void 0 : o, { owner: this }), this.addValue(s, l)), l;
  }
  readValue(s, o) {
    let l = this.latestValues[s] !== void 0 || !this.current ? this.latestValues[s] : this.getBaseTargetFromProps(this.props, s) ?? this.readValueFromInstance(this.current, s, this.options);
    return l != null && (typeof l == "string" && (Im(l) || Om(l)) ? l = parseFloat(l) : !Ww(l) && Wt.test(o) && (l = Hg(s, o)), this.setBaseTarget(s, ot(l) ? l.get() : l)), ot(l) ? l.get() : l;
  }
  setBaseTarget(s, o) {
    this.baseTarget[s] = o;
  }
  getBaseTarget(s) {
    var o;
    const { initial: l } = this.props;
    let c;
    if (typeof l == "string" || typeof l == "object") {
      const p = Tc(this.props, l, (o = this.presenceContext) == null ? void 0 : o.custom);
      p && (c = p[s]);
    }
    if (l && c !== void 0) return c;
    const d = this.getBaseTargetFromProps(this.props, s);
    return d !== void 0 && !ot(d) ? d : this.initialValues[s] !== void 0 && c === void 0 ? void 0 : this.baseTarget[s];
  }
  on(s, o) {
    return this.events[s] || (this.events[s] = new Xu()), this.events[s].add(o);
  }
  notify(s, ...o) {
    this.events[s] && this.events[s].notify(...o);
  }
  scheduleRenderMicrotask() {
    Fc.render(this.render);
  }
}
class iy extends Jw {
  constructor() {
    super(...arguments), this.KeyframeResolver = Pw;
  }
  sortInstanceNodePosition(s, o) {
    return s.compareDocumentPosition(o) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(s, o) {
    const l = s.style;
    return l ? l[o] : void 0;
  }
  removeValueFromRenderState(s, { vars: o, style: l }) {
    delete o[s], delete l[s];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: s } = this.props;
    ot(s) && (this.childSubscription = s.on("change", (o) => {
      this.current && (this.current.textContent = `${o}`);
    }));
  }
}
class er {
  constructor(s) {
    this.isMounted = false, this.node = s;
  }
  update() {
  }
}
function oy({ top: r, left: s, right: o, bottom: l }) {
  return { x: { min: s, max: o }, y: { min: r, max: l } };
}
function ek({ x: r, y: s }) {
  return { top: s.min, right: r.max, bottom: s.max, left: r.min };
}
function tk(r, s) {
  if (!s) return r;
  const o = s({ x: r.left, y: r.top }), l = s({ x: r.right, y: r.bottom });
  return { top: o.y, left: o.x, bottom: l.y, right: l.x };
}
function $c(r) {
  return r === void 0 || r === 1;
}
function qc({ scale: r, scaleX: s, scaleY: o }) {
  return !$c(r) || !$c(s) || !$c(o);
}
function Nr(r) {
  return qc(r) || ly(r) || r.z || r.rotate || r.rotateX || r.rotateY || r.skewX || r.skewY;
}
function ly(r) {
  return uy(r.x) || uy(r.y);
}
function uy(r) {
  return r && r !== "0%";
}
function fo(r, s, o) {
  const l = r - o, c = s * l;
  return o + c;
}
function cy(r, s, o, l, c) {
  return c !== void 0 && (r = fo(r, c, l)), fo(r, o, l) + s;
}
function Gc(r, s = 0, o = 1, l, c) {
  r.min = cy(r.min, s, o, l, c), r.max = cy(r.max, s, o, l, c);
}
function dy(r, { x: s, y: o }) {
  Gc(r.x, s.translate, s.scale, s.originPoint), Gc(r.y, o.translate, o.scale, o.originPoint);
}
const fy = 0.999999999999, hy = 1.0000000000001;
function nk(r, s, o, l = false) {
  const c = o.length;
  if (!c) return;
  s.x = s.y = 1;
  let d, p;
  for (let m = 0; m < c; m++) {
    d = o[m], p = d.projectionDelta;
    const { visualElement: v } = d.options;
    v && v.props.style && v.props.style.display === "contents" || (l && d.options.layoutScroll && d.scroll && d !== d.root && xa(r, { x: -d.scroll.offset.x, y: -d.scroll.offset.y }), p && (s.x *= p.x.scale, s.y *= p.y.scale, dy(r, p)), l && Nr(d.latestValues) && xa(r, d.latestValues));
  }
  s.x < hy && s.x > fy && (s.x = 1), s.y < hy && s.y > fy && (s.y = 1);
}
function ba(r, s) {
  r.min = r.min + s, r.max = r.max + s;
}
function py(r, s, o, l, c = 0.5) {
  const d = ze(r.min, r.max, c);
  Gc(r, s, o, d, l);
}
function xa(r, s) {
  py(r.x, s.x, s.scaleX, s.scale, s.originX), py(r.y, s.y, s.scaleY, s.scale, s.originY);
}
function my(r, s) {
  return oy(tk(r.getBoundingClientRect(), s));
}
function rk(r, s, o) {
  const l = my(r, o), { scroll: c } = s;
  return c && (ba(l.x, c.offset.x), ba(l.y, c.offset.y)), l;
}
const ak = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" }, sk = fa.length;
function ik(r, s, o) {
  let l = "", c = true;
  for (let d = 0; d < sk; d++) {
    const p = fa[d], m = r[p];
    if (m === void 0) continue;
    let v = true;
    if (typeof m == "number") v = m === (p.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(m);
      v = p.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!v || o) {
      const g = qg(m, zc[p]);
      if (!v) {
        c = false;
        const b = ak[p] || p;
        l += `${b}(${g}) `;
      }
      o && (s[p] = g);
    }
  }
  return l = l.trim(), o ? l = o(s, c ? "" : l) : c && (l = "none"), l;
}
function Wc(r, s, o) {
  const { style: l, vars: c, transformOrigin: d } = r;
  let p = false, m = false;
  for (const v in s) {
    const g = s[v];
    if (ha.has(v)) {
      p = true;
      continue;
    } else if (Zm(v)) {
      c[v] = g;
      continue;
    } else {
      const b = qg(g, zc[v]);
      v.startsWith("origin") ? (m = true, d[v] = b) : l[v] = b;
    }
  }
  if (s.transform || (p || o ? l.transform = ik(s, r.transform, o) : l.transform && (l.transform = "none")), m) {
    const { originX: v = "50%", originY: g = "50%", originZ: b = 0 } = d;
    l.transformOrigin = `${v} ${g} ${b}`;
  }
}
function gy(r, { style: s, vars: o }, l, c) {
  const d = r.style;
  let p;
  for (p in s) d[p] = s[p];
  c?.applyProjectionStyles(d, l);
  for (p in o) d.setProperty(p, o[p]);
}
function yy(r, s) {
  return s.max === s.min ? 0 : r / (s.max - s.min) * 100;
}
const Es = { correct: (r, s) => {
  if (!s.target) return r;
  if (typeof r == "string") if (Y.test(r)) r = parseFloat(r);
  else return r;
  const o = yy(r, s.target.x), l = yy(r, s.target.y);
  return `${o}% ${l}%`;
} }, ok = { correct: (r, { treeScale: s, projectionDelta: o }) => {
  const l = r, c = Wt.parse(r);
  if (c.length > 5) return l;
  const d = Wt.createTransformer(r), p = typeof c[0] != "number" ? 1 : 0, m = o.x.scale * s.x, v = o.y.scale * s.y;
  c[0 + p] /= m, c[1 + p] /= v;
  const g = ze(m, v, 0.5);
  return typeof c[2 + p] == "number" && (c[2 + p] /= g), typeof c[3 + p] == "number" && (c[3 + p] /= g), d(c);
} }, Qc = { borderRadius: { ...Es, applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"] }, borderTopLeftRadius: Es, borderTopRightRadius: Es, borderBottomLeftRadius: Es, borderBottomRightRadius: Es, boxShadow: ok };
function vy(r, { layout: s, layoutId: o }) {
  return ha.has(r) || r.startsWith("origin") || (s || o !== void 0) && (!!Qc[r] || r === "opacity");
}
function Kc(r, s, o) {
  var l;
  const c = r.style, d = s?.style, p = {};
  if (!c) return p;
  for (const m in c) (ot(c[m]) || d && ot(d[m]) || vy(m, r) || ((l = o?.getValue(m)) == null ? void 0 : l.liveStyle) !== void 0) && (p[m] = c[m]);
  return p;
}
function lk(r) {
  return window.getComputedStyle(r);
}
class uk extends iy {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = gy;
  }
  readValueFromInstance(s, o) {
    var l;
    if (ha.has(o)) return (l = this.projection) != null && l.isProjecting ? vc(o) : T1(s, o);
    {
      const c = lk(s), d = (Zm(o) ? c.getPropertyValue(o) : c[o]) || 0;
      return typeof d == "string" ? d.trim() : d;
    }
  }
  measureInstanceViewportBox(s, { transformPagePoint: o }) {
    return my(s, o);
  }
  build(s, o, l) {
    Wc(s, o, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(s, o, l) {
    return Kc(s, o, l);
  }
}
const ck = { offset: "stroke-dashoffset", array: "stroke-dasharray" }, dk = { offset: "strokeDashoffset", array: "strokeDasharray" };
function fk(r, s, o = 1, l = 0, c = true) {
  r.pathLength = 1;
  const d = c ? ck : dk;
  r[d.offset] = `${-l}`, r[d.array] = `${s} ${o}`;
}
const hk = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
function by(r, { attrX: s, attrY: o, attrScale: l, pathLength: c, pathSpacing: d = 1, pathOffset: p = 0, ...m }, v, g, b) {
  if (Wc(r, m, g), v) {
    r.style.viewBox && (r.attrs.viewBox = r.style.viewBox);
    return;
  }
  r.attrs = r.style, r.style = {};
  const { attrs: x, style: k } = r;
  x.transform && (k.transform = x.transform, delete x.transform), (k.transform || x.transformOrigin) && (k.transformOrigin = x.transformOrigin ?? "50% 50%", delete x.transformOrigin), k.transform && (k.transformBox = b?.transformBox ?? "fill-box", delete x.transformBox);
  for (const T of hk) x[T] !== void 0 && (k[T] = x[T], delete x[T]);
  s !== void 0 && (x.x = s), o !== void 0 && (x.y = o), l !== void 0 && (x.scale = l), c !== void 0 && fk(x, c, d, p, false);
}
const xy = /* @__PURE__ */ new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]), wy = (r) => typeof r == "string" && r.toLowerCase() === "svg";
function pk(r, s, o, l) {
  gy(r, s, void 0, l);
  for (const c in s.attrs) r.setAttribute(xy.has(c) ? c : Ac(c), s.attrs[c]);
}
function ky(r, s, o) {
  const l = Kc(r, s, o);
  for (const c in r) if (ot(r[c]) || ot(s[c])) {
    const d = fa.indexOf(c) !== -1 ? "attr" + c.charAt(0).toUpperCase() + c.substring(1) : c;
    l[d] = r[c];
  }
  return l;
}
class mk extends iy {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = false, this.measureInstanceViewportBox = Ke;
  }
  getBaseTargetFromProps(s, o) {
    return s[o];
  }
  readValueFromInstance(s, o) {
    if (ha.has(o)) {
      const l = Ug(o);
      return l && l.default || 0;
    }
    return o = xy.has(o) ? o : Ac(o), s.getAttribute(o);
  }
  scrapeMotionValuesFromProps(s, o, l) {
    return ky(s, o, l);
  }
  build(s, o, l) {
    by(s, o, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(s, o, l, c) {
    pk(s, o, l, c);
  }
  mount(s) {
    this.isSVGTag = wy(s.tagName), super.mount(s);
  }
}
const gk = Uc.length;
function Sy(r) {
  if (!r) return;
  if (!r.isControllingVariants) {
    const o = r.parent ? Sy(r.parent) || {} : {};
    return r.props.initial !== void 0 && (o.initial = r.props.initial), o;
  }
  const s = {};
  for (let o = 0; o < gk; o++) {
    const l = Uc[o], c = r.props[l];
    (Ps(c) || c === false) && (s[l] = c);
  }
  return s;
}
function Ny(r, s) {
  if (!Array.isArray(s)) return false;
  const o = s.length;
  if (o !== r.length) return false;
  for (let l = 0; l < o; l++) if (s[l] !== r[l]) return false;
  return true;
}
const yk = [...Bc].reverse(), vk = Bc.length;
function bk(r) {
  return (s) => Promise.all(s.map(({ animation: o, options: l }) => mw(r, o, l)));
}
function xk(r) {
  let s = bk(r), o = Cy(), l = true;
  const c = (v) => (g, b) => {
    var x;
    const k = pa(r, b, v === "exit" ? (x = r.presenceContext) == null ? void 0 : x.custom : void 0);
    if (k) {
      const { transition: T, transitionEnd: z, ..._ } = k;
      g = { ...g, ..._, ...z };
    }
    return g;
  };
  function d(v) {
    s = v(r);
  }
  function p(v) {
    const { props: g } = r, b = Sy(r.parent) || {}, x = [], k = /* @__PURE__ */ new Set();
    let T = {}, z = 1 / 0;
    for (let F = 0; F < vk; F++) {
      const O = yk[F], U = o[O], B = g[O] !== void 0 ? g[O] : b[O], X = Ps(B), V = O === v ? U.isActive : null;
      V === false && (z = F);
      let W = B === b[O] && B !== g[O] && X;
      if (W && l && r.manuallyAnimateOnMount && (W = false), U.protectedKeys = { ...T }, !U.isActive && V === null || !B && !U.prevProp || lo(B) || typeof B == "boolean") continue;
      if (O === "exit" && U.isActive && V !== true) {
        U.prevResolvedValues && (T = { ...T, ...U.prevResolvedValues });
        continue;
      }
      const Q = wk(U.prevProp, B);
      let G = Q || O === v && U.isActive && !W && X || F > z && X, ne = false;
      const ve = Array.isArray(B) ? B : [B];
      let Ae = ve.reduce(c(O), {});
      V === false && (Ae = {});
      const { prevResolvedValues: Te = {} } = U, st = { ...Te, ...Ae }, Xe = (L) => {
        G = true, k.has(L) && (ne = true, k.delete(L)), U.needsAnimating[L] = true;
        const $ = r.getValue(L);
        $ && ($.liveStyle = false);
      };
      for (const L in st) {
        const $ = Ae[L], ee = Te[L];
        if (T.hasOwnProperty(L)) continue;
        let he = false;
        jc($) && jc(ee) ? he = !Ny($, ee) : he = $ !== ee, he ? $ != null ? Xe(L) : k.add(L) : $ !== void 0 && k.has(L) ? Xe(L) : U.protectedKeys[L] = true;
      }
      U.prevProp = B, U.prevResolvedValues = Ae, U.isActive && (T = { ...T, ...Ae }), l && r.blockInitialAnimation && (G = false);
      const ft = W && Q;
      G && (!ft || ne) && x.push(...ve.map((L) => {
        const $ = { type: O };
        if (typeof L == "string" && l && !ft && r.manuallyAnimateOnMount && r.parent) {
          const { parent: ee } = r, he = pa(ee, L);
          if (ee.enteringChildren && he) {
            const { delayChildren: ke } = he.transition || {};
            $.delay = jg(ee.enteringChildren, r, ke);
          }
        }
        return { animation: L, options: $ };
      }));
    }
    if (k.size) {
      const F = {};
      if (typeof g.initial != "boolean") {
        const O = pa(r, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        O && O.transition && (F.transition = O.transition);
      }
      k.forEach((O) => {
        const U = r.getBaseTarget(O), B = r.getValue(O);
        B && (B.liveStyle = true), F[O] = U ?? null;
      }), x.push({ animation: F });
    }
    let _ = !!x.length;
    return l && (g.initial === false || g.initial === g.animate) && !r.manuallyAnimateOnMount && (_ = false), l = false, _ ? s(x) : Promise.resolve();
  }
  function m(v, g) {
    var b;
    if (o[v].isActive === g) return Promise.resolve();
    (b = r.variantChildren) == null || b.forEach((k) => {
      var T;
      return (T = k.animationState) == null ? void 0 : T.setActive(v, g);
    }), o[v].isActive = g;
    const x = p(v);
    for (const k in o) o[k].protectedKeys = {};
    return x;
  }
  return { animateChanges: p, setActive: m, setAnimateFunction: d, getState: () => o, reset: () => {
    o = Cy();
  } };
}
function wk(r, s) {
  return typeof s == "string" ? s !== r : Array.isArray(s) ? !Ny(s, r) : false;
}
function Cr(r = false) {
  return { isActive: r, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function Cy() {
  return { animate: Cr(true), whileInView: Cr(), whileHover: Cr(), whileTap: Cr(), whileDrag: Cr(), whileFocus: Cr(), exit: Cr() };
}
function Py(r, s) {
  r.min = s.min, r.max = s.max;
}
function Kt(r, s) {
  Py(r.x, s.x), Py(r.y, s.y);
}
function Ey(r, s) {
  r.translate = s.translate, r.scale = s.scale, r.originPoint = s.originPoint, r.origin = s.origin;
}
const Ty = 1e-4, kk = 1 - Ty, Sk = 1 + Ty, jy = 0.01, Nk = 0 - jy, Ck = 0 + jy;
function dt(r) {
  return r.max - r.min;
}
function Pk(r, s, o) {
  return Math.abs(r - s) <= o;
}
function Ly(r, s, o, l = 0.5) {
  r.origin = l, r.originPoint = ze(s.min, s.max, r.origin), r.scale = dt(o) / dt(s), r.translate = ze(o.min, o.max, r.origin) - r.originPoint, (r.scale >= kk && r.scale <= Sk || isNaN(r.scale)) && (r.scale = 1), (r.translate >= Nk && r.translate <= Ck || isNaN(r.translate)) && (r.translate = 0);
}
function Ts(r, s, o, l) {
  Ly(r.x, s.x, o.x, l ? l.originX : void 0), Ly(r.y, s.y, o.y, l ? l.originY : void 0);
}
function Ay(r, s, o) {
  r.min = o.min + s.min, r.max = r.min + dt(s);
}
function Ek(r, s, o) {
  Ay(r.x, s.x, o.x), Ay(r.y, s.y, o.y);
}
function Ry(r, s, o) {
  r.min = s.min - o.min, r.max = r.min + dt(s);
}
function ho(r, s, o) {
  Ry(r.x, s.x, o.x), Ry(r.y, s.y, o.y);
}
function My(r, s, o, l, c) {
  return r -= s, r = fo(r, 1 / o, l), c !== void 0 && (r = fo(r, 1 / c, l)), r;
}
function Tk(r, s = 0, o = 1, l = 0.5, c, d = r, p = r) {
  if (nn.test(s) && (s = parseFloat(s), s = ze(p.min, p.max, s / 100) - p.min), typeof s != "number") return;
  let m = ze(d.min, d.max, l);
  r === d && (m -= s), r.min = My(r.min, s, o, m, c), r.max = My(r.max, s, o, m, c);
}
function Iy(r, s, [o, l, c], d, p) {
  Tk(r, s[o], s[l], s[c], s.scale, d, p);
}
const jk = ["x", "scaleX", "originX"], Lk = ["y", "scaleY", "originY"];
function zy(r, s, o, l) {
  Iy(r.x, s, jk, o ? o.x : void 0, l ? l.x : void 0), Iy(r.y, s, Lk, o ? o.y : void 0, l ? l.y : void 0);
}
function Oy(r) {
  return r.translate === 0 && r.scale === 1;
}
function Fy(r) {
  return Oy(r.x) && Oy(r.y);
}
function Dy(r, s) {
  return r.min === s.min && r.max === s.max;
}
function Ak(r, s) {
  return Dy(r.x, s.x) && Dy(r.y, s.y);
}
function _y(r, s) {
  return Math.round(r.min) === Math.round(s.min) && Math.round(r.max) === Math.round(s.max);
}
function Vy(r, s) {
  return _y(r.x, s.x) && _y(r.y, s.y);
}
function By(r) {
  return dt(r.x) / dt(r.y);
}
function Uy(r, s) {
  return r.translate === s.translate && r.scale === s.scale && r.originPoint === s.originPoint;
}
function rn(r) {
  return [r("x"), r("y")];
}
function Rk(r, s, o) {
  let l = "";
  const c = r.x.translate / s.x, d = r.y.translate / s.y, p = o?.z || 0;
  if ((c || d || p) && (l = `translate3d(${c}px, ${d}px, ${p}px) `), (s.x !== 1 || s.y !== 1) && (l += `scale(${1 / s.x}, ${1 / s.y}) `), o) {
    const { transformPerspective: g, rotate: b, rotateX: x, rotateY: k, skewX: T, skewY: z } = o;
    g && (l = `perspective(${g}px) ${l}`), b && (l += `rotate(${b}deg) `), x && (l += `rotateX(${x}deg) `), k && (l += `rotateY(${k}deg) `), T && (l += `skewX(${T}deg) `), z && (l += `skewY(${z}deg) `);
  }
  const m = r.x.scale * s.x, v = r.y.scale * s.y;
  return (m !== 1 || v !== 1) && (l += `scale(${m}, ${v})`), l || "none";
}
const Hy = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Mk = Hy.length, $y = (r) => typeof r == "string" ? parseFloat(r) : r, qy = (r) => typeof r == "number" || Y.test(r);
function Ik(r, s, o, l, c, d) {
  c ? (r.opacity = ze(0, o.opacity ?? 1, zk(l)), r.opacityExit = ze(s.opacity ?? 1, 0, Ok(l))) : d && (r.opacity = ze(s.opacity ?? 1, o.opacity ?? 1, l));
  for (let p = 0; p < Mk; p++) {
    const m = `border${Hy[p]}Radius`;
    let v = Gy(s, m), g = Gy(o, m);
    v === void 0 && g === void 0 || (v || (v = 0), g || (g = 0), v === 0 || g === 0 || qy(v) === qy(g) ? (r[m] = Math.max(ze($y(v), $y(g), l), 0), (nn.test(g) || nn.test(v)) && (r[m] += "%")) : r[m] = g);
  }
  (s.rotate || o.rotate) && (r.rotate = ze(s.rotate || 0, o.rotate || 0, l));
}
function Gy(r, s) {
  return r[s] !== void 0 ? r[s] : r.borderRadius;
}
const zk = Wy(0, 0.5, qm), Ok = Wy(0.5, 0.95, Dt);
function Wy(r, s, o) {
  return (l) => l < r ? 0 : l > s ? 1 : o(vs(r, s, l));
}
function Fk(r, s, o) {
  const l = ot(r) ? r : ma(r);
  return l.start(Ec("", l, s, o)), l.animation;
}
function js(r, s, o, l = { passive: true }) {
  return r.addEventListener(s, o, l), () => r.removeEventListener(s, o);
}
const Dk = (r, s) => r.depth - s.depth;
class _k {
  constructor() {
    this.children = [], this.isDirty = false;
  }
  add(s) {
    Qu(this.children, s), this.isDirty = true;
  }
  remove(s) {
    Zi(this.children, s), this.isDirty = true;
  }
  forEach(s) {
    this.isDirty && this.children.sort(Dk), this.isDirty = false, this.children.forEach(s);
  }
}
function Vk(r, s) {
  const o = ct.now(), l = ({ timestamp: c }) => {
    const d = c - o;
    d >= s && (Yn(l), r(d - s));
  };
  return Le.setup(l, true), () => Yn(l);
}
function po(r) {
  return ot(r) ? r.get() : r;
}
class Bk {
  constructor() {
    this.members = [];
  }
  add(s) {
    Qu(this.members, s);
    for (let o = this.members.length - 1; o >= 0; o--) {
      const l = this.members[o];
      if (l === s || l === this.lead || l === this.prevLead) continue;
      const c = l.instance;
      c && c.isConnected === false && l.isPresent !== false && !l.snapshot && Zi(this.members, l);
    }
    s.scheduleRender();
  }
  remove(s) {
    if (Zi(this.members, s), s === this.prevLead && (this.prevLead = void 0), s === this.lead) {
      const o = this.members[this.members.length - 1];
      o && this.promote(o);
    }
  }
  relegate(s) {
    const o = this.members.findIndex((c) => s === c);
    if (o === 0) return false;
    let l;
    for (let c = o; c >= 0; c--) {
      const d = this.members[c], p = d.instance;
      if (d.isPresent !== false && (!p || p.isConnected !== false)) {
        l = d;
        break;
      }
    }
    return l ? (this.promote(l), true) : false;
  }
  promote(s, o) {
    const l = this.lead;
    if (s !== l && (this.prevLead = l, this.lead = s, s.show(), l)) {
      l.instance && l.scheduleRender(), s.scheduleRender();
      const c = l.options.layoutDependency, d = s.options.layoutDependency;
      if (!(c !== void 0 && d !== void 0 && c === d)) {
        const m = l.instance;
        m && m.isConnected === false && !l.snapshot || (s.resumeFrom = l, o && (s.resumeFrom.preserveOpacity = true), l.snapshot && (s.snapshot = l.snapshot, s.snapshot.latestValues = l.animationValues || l.latestValues), s.root && s.root.isUpdating && (s.isLayoutDirty = true));
      }
      const { crossfade: p } = s.options;
      p === false && l.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((s) => {
      const { options: o, resumingFrom: l } = s;
      o.onExitComplete && o.onExitComplete(), l && l.options.onExitComplete && l.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((s) => {
      s.instance && s.scheduleRender(false);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
const mo = { hasAnimatedSinceResize: true, hasEverUpdated: false }, Xc = ["", "X", "Y", "Z"], Uk = 1e3;
let Hk = 0;
function Yc(r, s, o, l) {
  const { latestValues: c } = s;
  c[r] && (o[r] = c[r], s.setStaticValue(r, 0), l && (l[r] = 0));
}
function Qy(r) {
  if (r.hasCheckedOptimisedAppear = true, r.root === r) return;
  const { visualElement: s } = r.options;
  if (!s) return;
  const o = Og(s);
  if (window.MotionHasOptimisedAnimation(o, "transform")) {
    const { layout: c, layoutId: d } = r.options;
    window.MotionCancelOptimisedAnimation(o, "transform", Le, !(c || d));
  }
  const { parent: l } = r;
  l && !l.hasCheckedOptimisedAppear && Qy(l);
}
function Ky({ attachResizeListener: r, defaultParent: s, measureScroll: o, checkIsScrollRoot: l, resetTransform: c }) {
  return class {
    constructor(d = {}, p = s?.()) {
      this.id = Hk++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = false, this.isAnimationBlocked = false, this.isLayoutDirty = false, this.isProjectionDirty = false, this.isSharedProjectionDirty = false, this.isTransformDirty = false, this.updateManuallyBlocked = false, this.updateBlockedByResize = false, this.isUpdating = false, this.isSVG = false, this.needsReset = false, this.shouldResetTransform = false, this.hasCheckedOptimisedAppear = false, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = false, this.layoutVersion = 0, this.updateScheduled = false, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = false, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = false, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = false, this.nodes.forEach(Gk), this.nodes.forEach(Xk), this.nodes.forEach(Yk), this.nodes.forEach(Wk);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = false, this.isVisible = true, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = p ? p.root || p : this, this.path = p ? [...p.path, p] : [], this.parent = p, this.depth = p ? p.depth + 1 : 0;
      for (let m = 0; m < this.path.length; m++) this.path[m].shouldResetTransform = true;
      this.root === this && (this.nodes = new _k());
    }
    addEventListener(d, p) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new Xu()), this.eventHandlers.get(d).add(p);
    }
    notifyListeners(d, ...p) {
      const m = this.eventHandlers.get(d);
      m && m.notify(...p);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d) {
      if (this.instance) return;
      this.isSVG = Vc(d) && !qw(d), this.instance = d;
      const { layoutId: p, layout: m, visualElement: v } = this.options;
      if (v && !v.current && v.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (m || p) && (this.isLayoutDirty = true), r) {
        let g, b = 0;
        const x = () => this.root.updateBlockedByResize = false;
        Le.read(() => {
          b = window.innerWidth;
        }), r(d, () => {
          const k = window.innerWidth;
          k !== b && (b = k, this.root.updateBlockedByResize = true, g && g(), g = Vk(x, 250), mo.hasAnimatedSinceResize && (mo.hasAnimatedSinceResize = false, this.nodes.forEach(Zy)));
        });
      }
      p && this.root.registerSharedNode(p, this), this.options.animate !== false && v && (p || m) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: b, hasRelativeLayoutChanged: x, layout: k }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const T = this.options.transition || v.getDefaultTransition() || nS, { onLayoutAnimationStart: z, onLayoutAnimationComplete: _ } = v.getProps(), F = !this.targetLayout || !Vy(this.targetLayout, k), O = !b && x;
        if (this.options.layoutRoot || this.resumeFrom || O || b && (F || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const U = { ...Pc(T, "layout"), onPlay: z, onComplete: _ };
          (v.shouldReduceMotion || this.options.layoutRoot) && (U.delay = 0, U.type = false), this.startAnimation(U), this.setAnimationOrigin(g, O);
        } else b || Zy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = k;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Yn(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = true, this.nodes && this.nodes.forEach(Zk), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = true) {
      if (this.root.hasTreeAnimated = true, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Qy(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
      this.isLayoutDirty = true;
      for (let g = 0; g < this.path.length; g++) {
        const b = this.path[g];
        b.shouldResetTransform = true, b.updateScroll("snapshot"), b.options.layoutRoot && b.willUpdate(false);
      }
      const { layoutId: p, layout: m } = this.options;
      if (p === void 0 && !m) return;
      const v = this.getTransformTemplate();
      this.prevTransformTemplateValue = v ? v(this.latestValues, "") : void 0, this.updateSnapshot(), d && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = false, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Xy);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Yy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = false, this.nodes.forEach(Kk), this.nodes.forEach($k), this.nodes.forEach(qk)) : this.nodes.forEach(Yy), this.clearAllSnapshots();
      const d = ct.now();
      at.delta = tn(0, 1e3 / 60, d - at.timestamp), at.timestamp = d, at.isProcessing = true, Ju.update.process(at), Ju.preRender.process(at), Ju.render.process(at), at.isProcessing = false;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = true, Fc.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Qk), this.sharedNodes.forEach(Jk);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = true, Le.preRender(this.updateProjection, false, true));
    }
    scheduleCheckAfterUnmount() {
      Le.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !dt(this.snapshot.measuredBox.x) && !dt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
      if (this.resumeFrom && !this.resumeFrom.instance) for (let m = 0; m < this.path.length; m++) this.path[m].updateScroll();
      const d = this.layout;
      this.layout = this.measure(false), this.layoutVersion++, this.layoutCorrected = Ke(), this.isLayoutDirty = false, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: p } = this.options;
      p && p.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let p = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === d && (p = false), p && this.instance) {
        const m = l(this.instance);
        this.scroll = { animationId: this.root.animationId, phase: d, isRoot: m, offset: o(this.instance), wasRoot: this.scroll ? this.scroll.isRoot : m };
      }
    }
    resetTransform() {
      if (!c) return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, p = this.projectionDelta && !Fy(this.projectionDelta), m = this.getTransformTemplate(), v = m ? m(this.latestValues, "") : void 0, g = v !== this.prevTransformTemplateValue;
      d && this.instance && (p || Nr(this.latestValues) || g) && (c(this.instance, v), this.shouldResetTransform = false, this.scheduleRender());
    }
    measure(d = true) {
      const p = this.measurePageBox();
      let m = this.removeElementScroll(p);
      return d && (m = this.removeTransform(m)), rS(m), { animationId: this.root.animationId, measuredBox: p, layoutBox: m, latestValues: {}, source: this.id };
    }
    measurePageBox() {
      var d;
      const { visualElement: p } = this.options;
      if (!p) return Ke();
      const m = p.measureViewportBox();
      if (!((d = this.scroll) != null && d.wasRoot || this.path.some(aS))) {
        const { scroll: v } = this.root;
        v && (ba(m.x, v.offset.x), ba(m.y, v.offset.y));
      }
      return m;
    }
    removeElementScroll(d) {
      var p;
      const m = Ke();
      if (Kt(m, d), (p = this.scroll) != null && p.wasRoot) return m;
      for (let v = 0; v < this.path.length; v++) {
        const g = this.path[v], { scroll: b, options: x } = g;
        g !== this.root && b && x.layoutScroll && (b.wasRoot && Kt(m, d), ba(m.x, b.offset.x), ba(m.y, b.offset.y));
      }
      return m;
    }
    applyTransform(d, p = false) {
      const m = Ke();
      Kt(m, d);
      for (let v = 0; v < this.path.length; v++) {
        const g = this.path[v];
        !p && g.options.layoutScroll && g.scroll && g !== g.root && xa(m, { x: -g.scroll.offset.x, y: -g.scroll.offset.y }), Nr(g.latestValues) && xa(m, g.latestValues);
      }
      return Nr(this.latestValues) && xa(m, this.latestValues), m;
    }
    removeTransform(d) {
      const p = Ke();
      Kt(p, d);
      for (let m = 0; m < this.path.length; m++) {
        const v = this.path[m];
        if (!v.instance || !Nr(v.latestValues)) continue;
        qc(v.latestValues) && v.updateSnapshot();
        const g = Ke(), b = v.measurePageBox();
        Kt(g, b), zy(p, v.latestValues, v.snapshot ? v.snapshot.layoutBox : void 0, g);
      }
      return Nr(this.latestValues) && zy(p, this.latestValues), p;
    }
    setTargetDelta(d) {
      this.targetDelta = d, this.root.scheduleUpdateProjection(), this.isProjectionDirty = true;
    }
    setOptions(d) {
      this.options = { ...this.options, ...d, crossfade: d.crossfade !== void 0 ? d.crossfade : true };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== at.timestamp && this.relativeParent.resolveTargetDelta(true);
    }
    resolveTargetDelta(d = false) {
      var p;
      const m = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = m.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = m.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = m.isSharedProjectionDirty);
      const v = !!this.resumingFrom || this !== m;
      if (!(d || v && this.isSharedProjectionDirty || this.isProjectionDirty || (p = this.parent) != null && p.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
      const { layout: g, layoutId: b } = this.options;
      if (!this.layout || !(g || b)) return;
      this.resolvedRelativeTargetAt = at.timestamp;
      const x = this.getClosestProjectingParent();
      x && this.linkedParentVersion !== x.layoutVersion && !x.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (x && x.layout ? this.createRelativeTarget(x, this.layout.layoutBox, x.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Ke(), this.targetWithTransforms = Ke()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Ek(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : Kt(this.target, this.layout.layoutBox), dy(this.target, this.targetDelta)) : Kt(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = false, x && !!x.resumingFrom == !!this.resumingFrom && !x.options.layoutScroll && x.target && this.animationProgress !== 1 ? this.createRelativeTarget(x, this.target, x.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || qc(this.parent.latestValues) || ly(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, p, m) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Ke(), this.relativeTargetOrigin = Ke(), ho(this.relativeTargetOrigin, p, m), Kt(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var d;
      const p = this.getLead(), m = !!this.resumingFrom || this !== p;
      let v = true;
      if ((this.isProjectionDirty || (d = this.parent) != null && d.isProjectionDirty) && (v = false), m && (this.isSharedProjectionDirty || this.isTransformDirty) && (v = false), this.resolvedRelativeTargetAt === at.timestamp && (v = false), v) return;
      const { layout: g, layoutId: b } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(g || b)) return;
      Kt(this.layoutCorrected, this.layout.layoutBox);
      const x = this.treeScale.x, k = this.treeScale.y;
      nk(this.layoutCorrected, this.treeScale, this.path, m), p.layout && !p.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (p.target = p.layout.layoutBox, p.targetWithTransforms = Ke());
      const { target: T } = p;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ey(this.prevProjectionDelta.x, this.projectionDelta.x), Ey(this.prevProjectionDelta.y, this.projectionDelta.y)), Ts(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== x || this.treeScale.y !== k || !Uy(this.projectionDelta.x, this.prevProjectionDelta.x) || !Uy(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = true, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(d = true) {
      var p;
      if ((p = this.options.visualElement) == null || p.scheduleRender(), d) {
        const m = this.getStack();
        m && m.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = va(), this.projectionDelta = va(), this.projectionDeltaWithTransform = va();
    }
    setAnimationOrigin(d, p = false) {
      const m = this.snapshot, v = m ? m.latestValues : {}, g = { ...this.latestValues }, b = va();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !p;
      const x = Ke(), k = m ? m.source : void 0, T = this.layout ? this.layout.source : void 0, z = k !== T, _ = this.getStack(), F = !_ || _.members.length <= 1, O = !!(z && !F && this.options.crossfade === true && !this.path.some(tS));
      this.animationProgress = 0;
      let U;
      this.mixTargetDelta = (B) => {
        const X = B / 1e3;
        Jy(b.x, d.x, X), Jy(b.y, d.y, X), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (ho(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox), eS(this.relativeTarget, this.relativeTargetOrigin, x, X), U && Ak(this.relativeTarget, U) && (this.isProjectionDirty = false), U || (U = Ke()), Kt(U, this.relativeTarget)), z && (this.animationValues = g, Ik(g, v, this.latestValues, X, O, F)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = X;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      var p, m, v;
      this.notifyListeners("animationStart"), (p = this.currentAnimation) == null || p.stop(), (v = (m = this.resumingFrom) == null ? void 0 : m.currentAnimation) == null || v.stop(), this.pendingAnimation && (Yn(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Le.update(() => {
        mo.hasAnimatedSinceResize = true, this.motionValue || (this.motionValue = ma(0)), this.motionValue.jump(0, false), this.currentAnimation = Fk(this.motionValue, [0, 1e3], { ...d, velocity: 0, isSync: true, onUpdate: (g) => {
          this.mixTargetDelta(g), d.onUpdate && d.onUpdate(g);
        }, onStop: () => {
        }, onComplete: () => {
          d.onComplete && d.onComplete(), this.completeAnimation();
        } }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const d = this.getStack();
      d && d.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Uk), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: p, target: m, layout: v, latestValues: g } = d;
      if (!(!p || !m || !v)) {
        if (this !== d && this.layout && v && av(this.options.animationType, this.layout.layoutBox, v.layoutBox)) {
          m = this.target || Ke();
          const b = dt(this.layout.layoutBox.x);
          m.x.min = d.target.x.min, m.x.max = m.x.min + b;
          const x = dt(this.layout.layoutBox.y);
          m.y.min = d.target.y.min, m.y.max = m.y.min + x;
        }
        Kt(p, m), xa(p, g), Ts(this.projectionDeltaWithTransform, this.layoutCorrected, p, g);
      }
    }
    registerSharedNode(d, p) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new Bk()), this.sharedNodes.get(d).add(p);
      const m = p.options.initialPromotionConfig;
      p.promote({ transition: m ? m.transition : void 0, preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(p) : void 0 });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : true;
    }
    getLead() {
      var d;
      const { layoutId: p } = this.options;
      return p ? ((d = this.getStack()) == null ? void 0 : d.lead) || this : this;
    }
    getPrevLead() {
      var d;
      const { layoutId: p } = this.options;
      return p ? (d = this.getStack()) == null ? void 0 : d.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: p, preserveFollowOpacity: m } = {}) {
      const v = this.getStack();
      v && v.promote(this, m), d && (this.projectionDelta = void 0, this.needsReset = true), p && this.setOptions({ transition: p });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : false;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) return;
      let p = false;
      const { latestValues: m } = d;
      if ((m.z || m.rotate || m.rotateX || m.rotateY || m.rotateZ || m.skewX || m.skewY) && (p = true), !p) return;
      const v = {};
      m.z && Yc("z", d, v, this.animationValues);
      for (let g = 0; g < Xc.length; g++) Yc(`rotate${Xc[g]}`, d, v, this.animationValues), Yc(`skew${Xc[g]}`, d, v, this.animationValues);
      d.render();
      for (const g in v) d.setStaticValue(g, v[g]), this.animationValues && (this.animationValues[g] = v[g]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, p) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false, d.visibility = "", d.opacity = "", d.pointerEvents = po(p?.pointerEvents) || "", d.transform = m ? m(this.latestValues, "") : "none";
        return;
      }
      const v = this.getLead();
      if (!this.projectionDelta || !this.layout || !v.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = po(p?.pointerEvents) || ""), this.hasProjected && !Nr(this.latestValues) && (d.transform = m ? m({}, "") : "none", this.hasProjected = false);
        return;
      }
      d.visibility = "";
      const g = v.animationValues || v.latestValues;
      this.applyTransformsToTarget();
      let b = Rk(this.projectionDeltaWithTransform, this.treeScale, g);
      m && (b = m(g, b)), d.transform = b;
      const { x, y: k } = this.projectionDelta;
      d.transformOrigin = `${x.origin * 100}% ${k.origin * 100}% 0`, v.animationValues ? d.opacity = v === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : d.opacity = v === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const T in Qc) {
        if (g[T] === void 0) continue;
        const { correct: z, applyTo: _, isCSSVariable: F } = Qc[T], O = b === "none" ? g[T] : z(g[T], v);
        if (_) {
          const U = _.length;
          for (let B = 0; B < U; B++) d[_[B]] = O;
        } else F ? this.options.visualElement.renderState.vars[T] = O : d[T] = O;
      }
      this.options.layoutId && (d.pointerEvents = v === this ? po(p?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((d) => {
        var p;
        return (p = d.currentAnimation) == null ? void 0 : p.stop();
      }), this.root.nodes.forEach(Xy), this.root.sharedNodes.clear();
    }
  };
}
function $k(r) {
  r.updateLayout();
}
function qk(r) {
  var s;
  const o = ((s = r.resumeFrom) == null ? void 0 : s.snapshot) || r.snapshot;
  if (r.isLead() && r.layout && o && r.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: c } = r.layout, { animationType: d } = r.options, p = o.source !== r.layout.source;
    d === "size" ? rn((x) => {
      const k = p ? o.measuredBox[x] : o.layoutBox[x], T = dt(k);
      k.min = l[x].min, k.max = k.min + T;
    }) : av(d, o.layoutBox, l) && rn((x) => {
      const k = p ? o.measuredBox[x] : o.layoutBox[x], T = dt(l[x]);
      k.max = k.min + T, r.relativeTarget && !r.currentAnimation && (r.isProjectionDirty = true, r.relativeTarget[x].max = r.relativeTarget[x].min + T);
    });
    const m = va();
    Ts(m, l, o.layoutBox);
    const v = va();
    p ? Ts(v, r.applyTransform(c, true), o.measuredBox) : Ts(v, l, o.layoutBox);
    const g = !Fy(m);
    let b = false;
    if (!r.resumeFrom) {
      const x = r.getClosestProjectingParent();
      if (x && !x.resumeFrom) {
        const { snapshot: k, layout: T } = x;
        if (k && T) {
          const z = Ke();
          ho(z, o.layoutBox, k.layoutBox);
          const _ = Ke();
          ho(_, l, T.layoutBox), Vy(z, _) || (b = true), x.options.layoutRoot && (r.relativeTarget = _, r.relativeTargetOrigin = z, r.relativeParent = x);
        }
      }
    }
    r.notifyListeners("didUpdate", { layout: l, snapshot: o, delta: v, layoutDelta: m, hasLayoutChanged: g, hasRelativeLayoutChanged: b });
  } else if (r.isLead()) {
    const { onExitComplete: l } = r.options;
    l && l();
  }
  r.options.transition = void 0;
}
function Gk(r) {
  r.parent && (r.isProjecting() || (r.isProjectionDirty = r.parent.isProjectionDirty), r.isSharedProjectionDirty || (r.isSharedProjectionDirty = !!(r.isProjectionDirty || r.parent.isProjectionDirty || r.parent.isSharedProjectionDirty)), r.isTransformDirty || (r.isTransformDirty = r.parent.isTransformDirty));
}
function Wk(r) {
  r.isProjectionDirty = r.isSharedProjectionDirty = r.isTransformDirty = false;
}
function Qk(r) {
  r.clearSnapshot();
}
function Xy(r) {
  r.clearMeasurements();
}
function Yy(r) {
  r.isLayoutDirty = false;
}
function Kk(r) {
  const { visualElement: s } = r.options;
  s && s.getProps().onBeforeLayoutMeasure && s.notify("BeforeLayoutMeasure"), r.resetTransform();
}
function Zy(r) {
  r.finishAnimation(), r.targetDelta = r.relativeTarget = r.target = void 0, r.isProjectionDirty = true;
}
function Xk(r) {
  r.resolveTargetDelta();
}
function Yk(r) {
  r.calcProjection();
}
function Zk(r) {
  r.resetSkewAndRotation();
}
function Jk(r) {
  r.removeLeadSnapshot();
}
function Jy(r, s, o) {
  r.translate = ze(s.translate, 0, o), r.scale = ze(s.scale, 1, o), r.origin = s.origin, r.originPoint = s.originPoint;
}
function ev(r, s, o, l) {
  r.min = ze(s.min, o.min, l), r.max = ze(s.max, o.max, l);
}
function eS(r, s, o, l) {
  ev(r.x, s.x, o.x, l), ev(r.y, s.y, o.y, l);
}
function tS(r) {
  return r.animationValues && r.animationValues.opacityExit !== void 0;
}
const nS = { duration: 0.45, ease: [0.4, 0, 0.1, 1] }, tv = (r) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(r), nv = tv("applewebkit/") && !tv("chrome/") ? Math.round : Dt;
function rv(r) {
  r.min = nv(r.min), r.max = nv(r.max);
}
function rS(r) {
  rv(r.x), rv(r.y);
}
function av(r, s, o) {
  return r === "position" || r === "preserve-aspect" && !Pk(By(s), By(o), 0.2);
}
function aS(r) {
  var s;
  return r !== r.root && ((s = r.scroll) == null ? void 0 : s.wasRoot);
}
const sS = Ky({ attachResizeListener: (r, s) => js(r, "resize", s), measureScroll: () => {
  var r, s;
  return { x: document.documentElement.scrollLeft || ((r = document.body) == null ? void 0 : r.scrollLeft) || 0, y: document.documentElement.scrollTop || ((s = document.body) == null ? void 0 : s.scrollTop) || 0 };
}, checkIsScrollRoot: () => true }), Zc = { current: void 0 }, sv = Ky({ measureScroll: (r) => ({ x: r.scrollLeft, y: r.scrollTop }), defaultParent: () => {
  if (!Zc.current) {
    const r = new sS({});
    r.mount(window), r.setOptions({ layoutScroll: true }), Zc.current = r;
  }
  return Zc.current;
}, resetTransform: (r, s) => {
  r.style.transform = s !== void 0 ? s : "none";
}, checkIsScrollRoot: (r) => window.getComputedStyle(r).position === "fixed" }), Jc = H.createContext({ transformPagePoint: (r) => r, isStatic: false, reducedMotion: "never" });
function iv(r, s) {
  if (typeof r == "function") return r(s);
  r != null && (r.current = s);
}
function iS(...r) {
  return (s) => {
    let o = false;
    const l = r.map((c) => {
      const d = iv(c, s);
      return !o && typeof d == "function" && (o = true), d;
    });
    if (o) return () => {
      for (let c = 0; c < l.length; c++) {
        const d = l[c];
        typeof d == "function" ? d() : iv(r[c], null);
      }
    };
  };
}
function oS(...r) {
  return H.useCallback(iS(...r), r);
}
class lS extends H.Component {
  getSnapshotBeforeUpdate(s) {
    const o = this.props.childRef.current;
    if (o && s.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const l = o.offsetParent, c = Oc(l) && l.offsetWidth || 0, d = Oc(l) && l.offsetHeight || 0, p = this.props.sizeRef.current;
      p.height = o.offsetHeight || 0, p.width = o.offsetWidth || 0, p.top = o.offsetTop, p.left = o.offsetLeft, p.right = c - p.width - p.left, p.bottom = d - p.height - p.top;
    }
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function uS({ children: r, isPresent: s, anchorX: o, anchorY: l, root: c, pop: d }) {
  var p;
  const m = H.useId(), v = H.useRef(null), g = H.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }), { nonce: b } = H.useContext(Jc), x = ((p = r.props) == null ? void 0 : p.ref) ?? r?.ref, k = oS(v, x);
  return H.useInsertionEffect(() => {
    const { width: T, height: z, top: _, left: F, right: O, bottom: U } = g.current;
    if (s || d === false || !v.current || !T || !z) return;
    const B = o === "left" ? `left: ${F}` : `right: ${O}`, X = l === "bottom" ? `bottom: ${U}` : `top: ${_}`;
    v.current.dataset.motionPopId = m;
    const V = document.createElement("style");
    b && (V.nonce = b);
    const W = c ?? document.head;
    return W.appendChild(V), V.sheet && V.sheet.insertRule(`
          [data-motion-pop-id="${m}"] {
            position: absolute !important;
            width: ${T}px !important;
            height: ${z}px !important;
            ${B}px !important;
            ${X}px !important;
          }
        `), () => {
      W.contains(V) && W.removeChild(V);
    };
  }, [s]), h.jsx(lS, { isPresent: s, childRef: v, sizeRef: g, pop: d, children: d === false ? r : H.cloneElement(r, { ref: k }) });
}
const cS = ({ children: r, initial: s, isPresent: o, onExitComplete: l, custom: c, presenceAffectsLayout: d, mode: p, anchorX: m, anchorY: v, root: g }) => {
  const b = Wu(dS), x = H.useId();
  let k = true, T = H.useMemo(() => (k = false, { id: x, initial: s, isPresent: o, custom: c, onExitComplete: (z) => {
    b.set(z, true);
    for (const _ of b.values()) if (!_) return;
    l && l();
  }, register: (z) => (b.set(z, false), () => b.delete(z)) }), [o, b, l]);
  return d && k && (T = { ...T }), H.useMemo(() => {
    b.forEach((z, _) => b.set(_, false));
  }, [o]), H.useEffect(() => {
    !o && !b.size && l && l();
  }, [o]), r = h.jsx(uS, { pop: p === "popLayout", isPresent: o, anchorX: m, anchorY: v, root: g, children: r }), h.jsx(Yi.Provider, { value: T, children: r });
};
function dS() {
  return /* @__PURE__ */ new Map();
}
function ov(r = true) {
  const s = H.useContext(Yi);
  if (s === null) return [true, null];
  const { isPresent: o, onExitComplete: l, register: c } = s, d = H.useId();
  H.useEffect(() => {
    if (r) return c(d);
  }, [r]);
  const p = H.useCallback(() => r && l && l(d), [d, l, r]);
  return !o && l ? [false, p] : [true];
}
const go = (r) => r.key || "";
function lv(r) {
  const s = [];
  return H.Children.forEach(r, (o) => {
    H.isValidElement(o) && s.push(o);
  }), s;
}
const fS = ({ children: r, custom: s, initial: o = true, onExitComplete: l, presenceAffectsLayout: c = true, mode: d = "sync", propagate: p = false, anchorX: m = "left", anchorY: v = "top", root: g }) => {
  const [b, x] = ov(p), k = H.useMemo(() => lv(r), [r]), T = p && !b ? [] : k.map(go), z = H.useRef(true), _ = H.useRef(k), F = Wu(() => /* @__PURE__ */ new Map()), O = H.useRef(/* @__PURE__ */ new Set()), [U, B] = H.useState(k), [X, V] = H.useState(k);
  Mm(() => {
    z.current = false, _.current = k;
    for (let G = 0; G < X.length; G++) {
      const ne = go(X[G]);
      T.includes(ne) ? (F.delete(ne), O.current.delete(ne)) : F.get(ne) !== true && F.set(ne, false);
    }
  }, [X, T.length, T.join("-")]);
  const W = [];
  if (k !== U) {
    let G = [...k];
    for (let ne = 0; ne < X.length; ne++) {
      const ve = X[ne], Ae = go(ve);
      T.includes(Ae) || (G.splice(ne, 0, ve), W.push(ve));
    }
    return d === "wait" && W.length && (G = W), V(lv(G)), B(k), null;
  }
  const { forceRender: Q } = H.useContext(Gu);
  return h.jsx(h.Fragment, { children: X.map((G) => {
    const ne = go(G), ve = p && !b ? false : k === X || T.includes(ne), Ae = () => {
      if (O.current.has(ne)) return;
      if (O.current.add(ne), F.has(ne)) F.set(ne, true);
      else return;
      let Te = true;
      F.forEach((st) => {
        st || (Te = false);
      }), Te && (Q?.(), V(_.current), p && x?.(), l && l());
    };
    return h.jsx(cS, { isPresent: ve, initial: !z.current || o ? void 0 : false, custom: s, presenceAffectsLayout: c, mode: d, root: g, onExitComplete: ve ? void 0 : Ae, anchorX: m, anchorY: v, children: G }, ne);
  }) });
}, uv = H.createContext({ strict: false }), cv = { animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"], exit: ["exit"], drag: ["drag", "dragControls"], focus: ["whileFocus"], hover: ["whileHover", "onHoverStart", "onHoverEnd"], tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"], pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"], inView: ["whileInView", "onViewportEnter", "onViewportLeave"], layout: ["layout", "layoutId"] };
let dv = false;
function hS() {
  if (dv) return;
  const r = {};
  for (const s in cv) r[s] = { isEnabled: (o) => cv[s].some((l) => !!o[l]) };
  sy(r), dv = true;
}
function fv() {
  return hS(), Zw();
}
function pS(r) {
  const s = fv();
  for (const o in r) s[o] = { ...s[o], ...r[o] };
  sy(s);
}
const mS = /* @__PURE__ */ new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "propagate", "ignoreStrict", "viewport"]);
function yo(r) {
  return r.startsWith("while") || r.startsWith("drag") && r !== "draggable" || r.startsWith("layout") || r.startsWith("onTap") || r.startsWith("onPan") || r.startsWith("onLayout") || mS.has(r);
}
let hv = (r) => !yo(r);
function gS(r) {
  typeof r == "function" && (hv = (s) => s.startsWith("on") ? !yo(s) : r(s));
}
try {
  gS(require("@emotion/is-prop-valid").default);
} catch {
}
function yS(r, s, o) {
  const l = {};
  for (const c in r) c === "values" && typeof r.values == "object" || (hv(c) || o === true && yo(c) || !s && !yo(c) || r.draggable && c.startsWith("onDrag")) && (l[c] = r[c]);
  return l;
}
const vo = H.createContext({});
function vS(r, s) {
  if (uo(r)) {
    const { initial: o, animate: l } = r;
    return { initial: o === false || Ps(o) ? o : void 0, animate: Ps(l) ? l : void 0 };
  }
  return r.inherit !== false ? s : {};
}
function bS(r) {
  const { initial: s, animate: o } = vS(r, H.useContext(vo));
  return H.useMemo(() => ({ initial: s, animate: o }), [pv(s), pv(o)]);
}
function pv(r) {
  return Array.isArray(r) ? r.join(" ") : r;
}
const ed = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function mv(r, s, o) {
  for (const l in s) !ot(s[l]) && !vy(l, o) && (r[l] = s[l]);
}
function xS({ transformTemplate: r }, s) {
  return H.useMemo(() => {
    const o = ed();
    return Wc(o, s, r), Object.assign({}, o.vars, o.style);
  }, [s]);
}
function wS(r, s) {
  const o = r.style || {}, l = {};
  return mv(l, o, r), Object.assign(l, xS(r, s)), l;
}
function kS(r, s) {
  const o = {}, l = wS(r, s);
  return r.drag && r.dragListener !== false && (o.draggable = false, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = r.drag === true ? "none" : `pan-${r.drag === "x" ? "y" : "x"}`), r.tabIndex === void 0 && (r.onTap || r.onTapStart || r.whileTap) && (o.tabIndex = 0), o.style = l, o;
}
const gv = () => ({ ...ed(), attrs: {} });
function SS(r, s, o, l) {
  const c = H.useMemo(() => {
    const d = gv();
    return by(d, s, wy(l), r.transformTemplate, r.style), { ...d.attrs, style: { ...d.style } };
  }, [s]);
  if (r.style) {
    const d = {};
    mv(d, r.style, r), c.style = { ...d, ...c.style };
  }
  return c;
}
const NS = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
function td(r) {
  return typeof r != "string" || r.includes("-") ? false : !!(NS.indexOf(r) > -1 || /[A-Z]/u.test(r));
}
function CS(r, s, o, { latestValues: l }, c, d = false, p) {
  const m = (p ?? td(r) ? SS : kS)(s, l, c, r), v = yS(s, typeof r == "string", d), g = r !== H.Fragment ? { ...v, ...m, ref: o } : {}, { children: b } = s, x = H.useMemo(() => ot(b) ? b.get() : b, [b]);
  return H.createElement(r, { ...g, children: x });
}
function PS({ scrapeMotionValuesFromProps: r, createRenderState: s }, o, l, c) {
  return { latestValues: ES(o, l, c, r), renderState: s() };
}
function ES(r, s, o, l) {
  const c = {}, d = l(r, {});
  for (const k in d) c[k] = po(d[k]);
  let { initial: p, animate: m } = r;
  const v = uo(r), g = ny(r);
  s && g && !v && r.inherit !== false && (p === void 0 && (p = s.initial), m === void 0 && (m = s.animate));
  let b = o ? o.initial === false : false;
  b = b || p === false;
  const x = b ? m : p;
  if (x && typeof x != "boolean" && !lo(x)) {
    const k = Array.isArray(x) ? x : [x];
    for (let T = 0; T < k.length; T++) {
      const z = Tc(r, k[T]);
      if (z) {
        const { transitionEnd: _, transition: F, ...O } = z;
        for (const U in O) {
          let B = O[U];
          if (Array.isArray(B)) {
            const X = b ? B.length - 1 : 0;
            B = B[X];
          }
          B !== null && (c[U] = B);
        }
        for (const U in _) c[U] = _[U];
      }
    }
  }
  return c;
}
const yv = (r) => (s, o) => {
  const l = H.useContext(vo), c = H.useContext(Yi), d = () => PS(r, s, l, c);
  return o ? d() : Wu(d);
}, TS = yv({ scrapeMotionValuesFromProps: Kc, createRenderState: ed }), jS = yv({ scrapeMotionValuesFromProps: ky, createRenderState: gv }), LS = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function AS(r, s, o) {
  const l = H.useRef(o);
  H.useInsertionEffect(() => {
    l.current = o;
  });
  const c = H.useRef(null);
  return H.useCallback((d) => {
    var p;
    d && ((p = r.onMount) == null || p.call(r, d)), s && (d ? s.mount(d) : s.unmount());
    const m = l.current;
    if (typeof m == "function") if (d) {
      const v = m(d);
      typeof v == "function" && (c.current = v);
    } else c.current ? (c.current(), c.current = null) : m(d);
    else m && (m.current = d);
  }, [s]);
}
const vv = H.createContext({});
function wa(r) {
  return r && typeof r == "object" && Object.prototype.hasOwnProperty.call(r, "current");
}
function RS(r, s, o, l, c, d) {
  var p, m;
  const { visualElement: v } = H.useContext(vo), g = H.useContext(uv), b = H.useContext(Yi), x = H.useContext(Jc), k = x.reducedMotion, T = x.skipAnimations, z = H.useRef(null), _ = H.useRef(false);
  l = l || g.renderer, !z.current && l && (z.current = l(r, { visualState: s, parent: v, props: o, presenceContext: b, blockInitialAnimation: b ? b.initial === false : false, reducedMotionConfig: k, skipAnimations: T, isSVG: d }), _.current && z.current && (z.current.manuallyAnimateOnMount = true));
  const F = z.current, O = H.useContext(vv);
  F && !F.projection && c && (F.type === "html" || F.type === "svg") && MS(z.current, o, c, O);
  const U = H.useRef(false);
  H.useInsertionEffect(() => {
    F && U.current && F.update(o, b);
  });
  const B = o[zg], X = H.useRef(!!B && !((p = window.MotionHandoffIsComplete) != null && p.call(window, B)) && ((m = window.MotionHasOptimisedAnimation) == null ? void 0 : m.call(window, B)));
  return Mm(() => {
    _.current = true, F && (U.current = true, window.MotionIsMounted = true, F.updateFeatures(), F.scheduleRenderMicrotask(), X.current && F.animationState && F.animationState.animateChanges());
  }), H.useEffect(() => {
    F && (!X.current && F.animationState && F.animationState.animateChanges(), X.current && (queueMicrotask(() => {
      var V;
      (V = window.MotionHandoffMarkAsComplete) == null || V.call(window, B);
    }), X.current = false), F.enteringChildren = void 0);
  }), F;
}
function MS(r, s, o, l) {
  const { layoutId: c, layout: d, drag: p, dragConstraints: m, layoutScroll: v, layoutRoot: g, layoutCrossfade: b } = s;
  r.projection = new o(r.latestValues, s["data-framer-portal-id"] ? void 0 : bv(r.parent)), r.projection.setOptions({ layoutId: c, layout: d, alwaysMeasureLayout: !!p || m && wa(m), visualElement: r, animationType: typeof d == "string" ? d : "both", initialPromotionConfig: l, crossfade: b, layoutScroll: v, layoutRoot: g });
}
function bv(r) {
  if (r) return r.options.allowProjection !== false ? r.projection : bv(r.parent);
}
function nd(r, { forwardMotionProps: s = false, type: o } = {}, l, c) {
  l && pS(l);
  const d = o ? o === "svg" : td(r), p = d ? jS : TS;
  function m(g, b) {
    let x;
    const k = { ...H.useContext(Jc), ...g, layoutId: IS(g) }, { isStatic: T } = k, z = bS(g), _ = p(g, T);
    if (!T && Rm) {
      zS();
      const F = OS(k);
      x = F.MeasureLayout, z.visualElement = RS(r, _, k, c, F.ProjectionNode, d);
    }
    return h.jsxs(vo.Provider, { value: z, children: [x && z.visualElement ? h.jsx(x, { visualElement: z.visualElement, ...k }) : null, CS(r, g, AS(_, z.visualElement, b), _, T, s, d)] });
  }
  m.displayName = `motion.${typeof r == "string" ? r : `create(${r.displayName ?? r.name ?? ""})`}`;
  const v = H.forwardRef(m);
  return v[LS] = r, v;
}
function IS({ layoutId: r }) {
  const s = H.useContext(Gu).id;
  return s && r !== void 0 ? s + "-" + r : r;
}
function zS(r, s) {
  H.useContext(uv).strict;
}
function OS(r) {
  const s = fv(), { drag: o, layout: l } = s;
  if (!o && !l) return {};
  const c = { ...o, ...l };
  return { MeasureLayout: o != null && o.isEnabled(r) || l != null && l.isEnabled(r) ? c.MeasureLayout : void 0, ProjectionNode: c.ProjectionNode };
}
function FS(r, s) {
  if (typeof Proxy > "u") return nd;
  const o = /* @__PURE__ */ new Map(), l = (d, p) => nd(d, p, r, s), c = (d, p) => l(d, p);
  return new Proxy(c, { get: (d, p) => p === "create" ? l : (o.has(p) || o.set(p, nd(p, void 0, r, s)), o.get(p)) });
}
const DS = (r, s) => s.isSVG ?? td(r) ? new mk(s) : new uk(s, { allowProjection: r !== H.Fragment });
class _S extends er {
  constructor(s) {
    super(s), s.animationState || (s.animationState = xk(s));
  }
  updateAnimationControlsSubscription() {
    const { animate: s } = this.node.getProps();
    lo(s) && (this.unmountControls = s.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: s } = this.node.getProps(), { animate: o } = this.node.prevProps || {};
    s !== o && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var s;
    this.node.animationState.reset(), (s = this.unmountControls) == null || s.call(this);
  }
}
let VS = 0;
class BS extends er {
  constructor() {
    super(...arguments), this.id = VS++;
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: s, onExitComplete: o } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || s === l) return;
    const c = this.node.animationState.setActive("exit", !s);
    o && !s && c.then(() => {
      o(this.id);
    });
  }
  mount() {
    const { register: s, onExitComplete: o } = this.node.presenceContext || {};
    o && o(this.id), s && (this.unmount = s(this.id));
  }
  unmount() {
  }
}
const US = { animation: { Feature: _S }, exit: { Feature: BS } };
function Ls(r) {
  return { point: { x: r.pageX, y: r.pageY } };
}
const HS = (r) => (s) => Dc(s) && r(s, Ls(s));
function As(r, s, o, l) {
  return js(r, s, HS(o), l);
}
const xv = ({ current: r }) => r ? r.ownerDocument.defaultView : null, wv = (r, s) => Math.abs(r - s);
function $S(r, s) {
  const o = wv(r.x, s.x), l = wv(r.y, s.y);
  return Math.sqrt(o ** 2 + l ** 2);
}
const kv = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Sv {
  constructor(s, o, { transformPagePoint: l, contextWindow: c = window, dragSnapToOrigin: d = false, distanceThreshold: p = 3, element: m } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
      const T = ad(this.lastMoveEventInfo, this.history), z = this.startEvent !== null, _ = $S(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!z && !_) return;
      const { point: F } = T, { timestamp: O } = at;
      this.history.push({ ...F, timestamp: O });
      const { onStart: U, onMove: B } = this.handlers;
      z || (U && U(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), B && B(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, z) => {
      this.lastMoveEvent = T, this.lastMoveEventInfo = rd(z, this.transformPagePoint), Le.update(this.updatePoint, true);
    }, this.handlePointerUp = (T, z) => {
      this.end();
      const { onEnd: _, onSessionEnd: F, resumeAnimation: O } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && O && O(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
      const U = ad(T.type === "pointercancel" ? this.lastMoveEventInfo : rd(z, this.transformPagePoint), this.history);
      this.startEvent && _ && _(T, U), F && F(T, U);
    }, !Dc(s)) return;
    this.dragSnapToOrigin = d, this.handlers = o, this.transformPagePoint = l, this.distanceThreshold = p, this.contextWindow = c || window;
    const v = Ls(s), g = rd(v, this.transformPagePoint), { point: b } = g, { timestamp: x } = at;
    this.history = [{ ...b, timestamp: x }];
    const { onSessionStart: k } = o;
    k && k(s, ad(g, this.history)), this.removeListeners = ys(As(this.contextWindow, "pointermove", this.handlePointerMove), As(this.contextWindow, "pointerup", this.handlePointerUp), As(this.contextWindow, "pointercancel", this.handlePointerUp)), m && this.startScrollTracking(m);
  }
  startScrollTracking(s) {
    let o = s.parentElement;
    for (; o; ) {
      const l = getComputedStyle(o);
      (kv.has(l.overflowX) || kv.has(l.overflowY)) && this.scrollPositions.set(o, { x: o.scrollLeft, y: o.scrollTop }), o = o.parentElement;
    }
    this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }), window.addEventListener("scroll", this.onElementScroll, { capture: true }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, { capture: true }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  handleScroll(s) {
    const o = this.scrollPositions.get(s);
    if (!o) return;
    const l = s === window, c = l ? { x: window.scrollX, y: window.scrollY } : { x: s.scrollLeft, y: s.scrollTop }, d = { x: c.x - o.x, y: c.y - o.y };
    d.x === 0 && d.y === 0 || (l ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += d.x, this.lastMoveEventInfo.point.y += d.y) : this.history.length > 0 && (this.history[0].x -= d.x, this.history[0].y -= d.y), this.scrollPositions.set(s, c), Le.update(this.updatePoint, true));
  }
  updateHandlers(s) {
    this.handlers = s;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Yn(this.updatePoint);
  }
}
function rd(r, s) {
  return s ? { point: s(r.point) } : r;
}
function Nv(r, s) {
  return { x: r.x - s.x, y: r.y - s.y };
}
function ad({ point: r }, s) {
  return { point: r, delta: Nv(r, Cv(s)), offset: Nv(r, qS(s)), velocity: GS(s, 0.1) };
}
function qS(r) {
  return r[0];
}
function Cv(r) {
  return r[r.length - 1];
}
function GS(r, s) {
  if (r.length < 2) return { x: 0, y: 0 };
  let o = r.length - 1, l = null;
  const c = Cv(r);
  for (; o >= 0 && (l = r[o], !(c.timestamp - l.timestamp > Gt(s))); ) o--;
  if (!l) return { x: 0, y: 0 };
  l === r[0] && r.length > 2 && c.timestamp - l.timestamp > Gt(s) * 2 && (l = r[1]);
  const d = _t(c.timestamp - l.timestamp);
  if (d === 0) return { x: 0, y: 0 };
  const p = { x: (c.x - l.x) / d, y: (c.y - l.y) / d };
  return p.x === 1 / 0 && (p.x = 0), p.y === 1 / 0 && (p.y = 0), p;
}
function WS(r, { min: s, max: o }, l) {
  return s !== void 0 && r < s ? r = l ? ze(s, r, l.min) : Math.max(r, s) : o !== void 0 && r > o && (r = l ? ze(o, r, l.max) : Math.min(r, o)), r;
}
function Pv(r, s, o) {
  return { min: s !== void 0 ? r.min + s : void 0, max: o !== void 0 ? r.max + o - (r.max - r.min) : void 0 };
}
function QS(r, { top: s, left: o, bottom: l, right: c }) {
  return { x: Pv(r.x, o, c), y: Pv(r.y, s, l) };
}
function Ev(r, s) {
  let o = s.min - r.min, l = s.max - r.max;
  return s.max - s.min < r.max - r.min && ([o, l] = [l, o]), { min: o, max: l };
}
function KS(r, s) {
  return { x: Ev(r.x, s.x), y: Ev(r.y, s.y) };
}
function XS(r, s) {
  let o = 0.5;
  const l = dt(r), c = dt(s);
  return c > l ? o = vs(s.min, s.max - l, r.min) : l > c && (o = vs(r.min, r.max - c, s.min)), tn(0, 1, o);
}
function YS(r, s) {
  const o = {};
  return s.min !== void 0 && (o.min = s.min - r.min), s.max !== void 0 && (o.max = s.max - r.min), o;
}
const sd = 0.35;
function ZS(r = sd) {
  return r === false ? r = 0 : r === true && (r = sd), { x: Tv(r, "left", "right"), y: Tv(r, "top", "bottom") };
}
function Tv(r, s, o) {
  return { min: jv(r, s), max: jv(r, o) };
}
function jv(r, s) {
  return typeof r == "number" ? r : r[s] || 0;
}
const JS = /* @__PURE__ */ new WeakMap();
class e2 {
  constructor(s) {
    this.openDragLock = null, this.isDragging = false, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = false, this.hasMutatedConstraints = false, this.elastic = Ke(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = s;
  }
  start(s, { snapToCursor: o = false, distanceThreshold: l } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === false) return;
    const d = (x) => {
      o && this.snapToCursor(Ls(x).point), this.stopAnimation();
    }, p = (x, k) => {
      const { drag: T, dragPropagation: z, onDragStart: _ } = this.getProps();
      if (T && !z && (this.openDragLock && this.openDragLock(), this.openDragLock = Tw(T), !this.openDragLock)) return;
      this.latestPointerEvent = x, this.latestPanInfo = k, this.isDragging = true, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = true, this.visualElement.projection.target = void 0), rn((O) => {
        let U = this.getAxisMotionValue(O).get() || 0;
        if (nn.test(U)) {
          const { projection: B } = this.visualElement;
          if (B && B.layout) {
            const X = B.layout.layoutBox[O];
            X && (U = dt(X) * (parseFloat(U) / 100));
          }
        }
        this.originPoint[O] = U;
      }), _ && Le.update(() => _(x, k), false, true), Lc(this.visualElement, "transform");
      const { animationState: F } = this.visualElement;
      F && F.setActive("whileDrag", true);
    }, m = (x, k) => {
      this.latestPointerEvent = x, this.latestPanInfo = k;
      const { dragPropagation: T, dragDirectionLock: z, onDirectionLock: _, onDrag: F } = this.getProps();
      if (!T && !this.openDragLock) return;
      const { offset: O } = k;
      if (z && this.currentDirection === null) {
        this.currentDirection = n2(O), this.currentDirection !== null && _ && _(this.currentDirection);
        return;
      }
      this.updateAxis("x", k.point, O), this.updateAxis("y", k.point, O), this.visualElement.render(), F && Le.update(() => F(x, k), false, true);
    }, v = (x, k) => {
      this.latestPointerEvent = x, this.latestPanInfo = k, this.stop(x, k), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, g = () => {
      const { dragSnapToOrigin: x } = this.getProps();
      (x || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: b } = this.getProps();
    this.panSession = new Sv(s, { onSessionStart: d, onStart: p, onMove: m, onSessionEnd: v, resumeAnimation: g }, { transformPagePoint: this.visualElement.getTransformPagePoint(), dragSnapToOrigin: b, distanceThreshold: l, contextWindow: xv(this.visualElement), element: this.visualElement.current });
  }
  stop(s, o) {
    const l = s || this.latestPointerEvent, c = o || this.latestPanInfo, d = this.isDragging;
    if (this.cancel(), !d || !c || !l) return;
    const { velocity: p } = c;
    this.startAnimation(p);
    const { onDragEnd: m } = this.getProps();
    m && Le.postRender(() => m(l, c));
  }
  cancel() {
    this.isDragging = false;
    const { projection: s, animationState: o } = this.visualElement;
    s && (s.isAnimationBlocked = false), this.endPanSession();
    const { dragPropagation: l } = this.getProps();
    !l && this.openDragLock && (this.openDragLock(), this.openDragLock = null), o && o.setActive("whileDrag", false);
  }
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(s, o, l) {
    const { drag: c } = this.getProps();
    if (!l || !bo(s, c, this.currentDirection)) return;
    const d = this.getAxisMotionValue(s);
    let p = this.originPoint[s] + l[s];
    this.constraints && this.constraints[s] && (p = WS(p, this.constraints[s], this.elastic[s])), d.set(p);
  }
  resolveConstraints() {
    var s;
    const { dragConstraints: o, dragElastic: l } = this.getProps(), c = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (s = this.visualElement.projection) == null ? void 0 : s.layout, d = this.constraints;
    o && wa(o) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : o && c ? this.constraints = QS(c.layoutBox, o) : this.constraints = false, this.elastic = ZS(l), d !== this.constraints && !wa(o) && c && this.constraints && !this.hasMutatedConstraints && rn((p) => {
      this.constraints !== false && this.getAxisMotionValue(p) && (this.constraints[p] = YS(c.layoutBox[p], this.constraints[p]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: s, onMeasureDragConstraints: o } = this.getProps();
    if (!s || !wa(s)) return false;
    const l = s.current, { projection: c } = this.visualElement;
    if (!c || !c.layout) return false;
    const d = rk(l, c.root, this.visualElement.getTransformPagePoint());
    let p = KS(c.layout.layoutBox, d);
    if (o) {
      const m = o(ek(p));
      this.hasMutatedConstraints = !!m, m && (p = oy(m));
    }
    return p;
  }
  startAnimation(s) {
    const { drag: o, dragMomentum: l, dragElastic: c, dragTransition: d, dragSnapToOrigin: p, onDragTransitionEnd: m } = this.getProps(), v = this.constraints || {}, g = rn((b) => {
      if (!bo(b, o, this.currentDirection)) return;
      let x = v && v[b] || {};
      p && (x = { min: 0, max: 0 });
      const k = c ? 200 : 1e6, T = c ? 40 : 1e7, z = { type: "inertia", velocity: l ? s[b] : 0, bounceStiffness: k, bounceDamping: T, timeConstant: 750, restDelta: 1, restSpeed: 10, ...d, ...x };
      return this.startAxisValueAnimation(b, z);
    });
    return Promise.all(g).then(m);
  }
  startAxisValueAnimation(s, o) {
    const l = this.getAxisMotionValue(s);
    return Lc(this.visualElement, s), l.start(Ec(s, l, 0, o, this.visualElement, false));
  }
  stopAnimation() {
    rn((s) => this.getAxisMotionValue(s).stop());
  }
  getAxisMotionValue(s) {
    const o = `_drag${s.toUpperCase()}`, l = this.visualElement.getProps();
    return l[o] || this.visualElement.getValue(s, (l.initial ? l.initial[s] : void 0) || 0);
  }
  snapToCursor(s) {
    rn((o) => {
      const { drag: l } = this.getProps();
      if (!bo(o, l, this.currentDirection)) return;
      const { projection: c } = this.visualElement, d = this.getAxisMotionValue(o);
      if (c && c.layout) {
        const { min: p, max: m } = c.layout.layoutBox[o], v = d.get() || 0;
        d.set(s[o] - ze(p, m, 0.5) + v);
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: s, dragConstraints: o } = this.getProps(), { projection: l } = this.visualElement;
    if (!wa(o) || !l || !this.constraints) return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    rn((p) => {
      const m = this.getAxisMotionValue(p);
      if (m && this.constraints !== false) {
        const v = m.get();
        c[p] = XS({ min: v, max: v }, this.constraints[p]);
      }
    });
    const { transformTemplate: d } = this.visualElement.getProps();
    this.visualElement.current.style.transform = d ? d({}, "") : "none", l.root && l.root.updateScroll(), l.updateLayout(), this.constraints = false, this.resolveConstraints(), rn((p) => {
      if (!bo(p, s, null)) return;
      const m = this.getAxisMotionValue(p), { min: v, max: g } = this.constraints[p];
      m.set(ze(v, g, c[p]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current) return;
    JS.set(this.visualElement, this);
    const s = this.visualElement.current, o = As(s, "pointerdown", (g) => {
      const { drag: b, dragListener: x = true } = this.getProps(), k = g.target, T = k !== s && Iw(k);
      b && x && !T && this.start(g);
    });
    let l;
    const c = () => {
      const { dragConstraints: g } = this.getProps();
      wa(g) && g.current && (this.constraints = this.resolveRefConstraints(), l || (l = t2(s, g.current, () => this.scalePositionWithinConstraints())));
    }, { projection: d } = this.visualElement, p = d.addEventListener("measure", c);
    d && !d.layout && (d.root && d.root.updateScroll(), d.updateLayout()), Le.read(c);
    const m = js(window, "resize", () => this.scalePositionWithinConstraints()), v = d.addEventListener("didUpdate", (({ delta: g, hasLayoutChanged: b }) => {
      this.isDragging && b && (rn((x) => {
        const k = this.getAxisMotionValue(x);
        k && (this.originPoint[x] += g[x].translate, k.set(k.get() + g[x].translate));
      }), this.visualElement.render());
    }));
    return () => {
      m(), o(), p(), v && v(), l && l();
    };
  }
  getProps() {
    const s = this.visualElement.getProps(), { drag: o = false, dragDirectionLock: l = false, dragPropagation: c = false, dragConstraints: d = false, dragElastic: p = sd, dragMomentum: m = true } = s;
    return { ...s, drag: o, dragDirectionLock: l, dragPropagation: c, dragConstraints: d, dragElastic: p, dragMomentum: m };
  }
}
function Lv(r) {
  let s = true;
  return () => {
    if (s) {
      s = false;
      return;
    }
    r();
  };
}
function t2(r, s, o) {
  const l = Jg(r, Lv(o)), c = Jg(s, Lv(o));
  return () => {
    l(), c();
  };
}
function bo(r, s, o) {
  return (s === true || s === r) && (o === null || o === r);
}
function n2(r, s = 10) {
  let o = null;
  return Math.abs(r.y) > s ? o = "y" : Math.abs(r.x) > s && (o = "x"), o;
}
class r2 extends er {
  constructor(s) {
    super(s), this.removeGroupControls = Dt, this.removeListeners = Dt, this.controls = new e2(s);
  }
  mount() {
    const { dragControls: s } = this.node.getProps();
    s && (this.removeGroupControls = s.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Dt;
  }
  update() {
    const { dragControls: s } = this.node.getProps(), { dragControls: o } = this.node.prevProps || {};
    s !== o && (this.removeGroupControls(), s && (this.removeGroupControls = s.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const id = (r) => (s, o) => {
  r && Le.update(() => r(s, o), false, true);
};
class a2 extends er {
  constructor() {
    super(...arguments), this.removePointerDownListener = Dt;
  }
  onPointerDown(s) {
    this.session = new Sv(s, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint(), contextWindow: xv(this.node) });
  }
  createPanHandlers() {
    const { onPanSessionStart: s, onPanStart: o, onPan: l, onPanEnd: c } = this.node.getProps();
    return { onSessionStart: id(s), onStart: id(o), onMove: id(l), onEnd: (d, p) => {
      delete this.session, c && Le.postRender(() => c(d, p));
    } };
  }
  mount() {
    this.removePointerDownListener = As(this.node.current, "pointerdown", (s) => this.onPointerDown(s));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let od = false;
class s2 extends H.Component {
  componentDidMount() {
    const { visualElement: s, layoutGroup: o, switchLayoutGroup: l, layoutId: c } = this.props, { projection: d } = s;
    d && (o.group && o.group.add(d), l && l.register && c && l.register(d), od && d.root.didUpdate(), d.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), d.setOptions({ ...d.options, layoutDependency: this.props.layoutDependency, onExitComplete: () => this.safeToRemove() })), mo.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(s) {
    const { layoutDependency: o, visualElement: l, drag: c, isPresent: d } = this.props, { projection: p } = l;
    return p && (p.isPresent = d, s.layoutDependency !== o && p.setOptions({ ...p.options, layoutDependency: o }), od = true, c || s.layoutDependency !== o || o === void 0 || s.isPresent !== d ? p.willUpdate() : this.safeToRemove(), s.isPresent !== d && (d ? p.promote() : p.relegate() || Le.postRender(() => {
      const m = p.getStack();
      (!m || !m.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: s } = this.props.visualElement;
    s && (s.root.didUpdate(), Fc.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: s, layoutGroup: o, switchLayoutGroup: l } = this.props, { projection: c } = s;
    od = true, c && (c.scheduleCheckAfterUnmount(), o && o.group && o.group.remove(c), l && l.deregister && l.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: s } = this.props;
    s && s();
  }
  render() {
    return null;
  }
}
function Av(r) {
  const [s, o] = ov(), l = H.useContext(Gu);
  return h.jsx(s2, { ...r, layoutGroup: l, switchLayoutGroup: H.useContext(vv), isPresent: s, safeToRemove: o });
}
const i2 = { pan: { Feature: a2 }, drag: { Feature: r2, ProjectionNode: sv, MeasureLayout: Av } };
function Rv(r, s, o) {
  const { props: l } = r;
  r.animationState && l.whileHover && r.animationState.setActive("whileHover", o === "Start");
  const c = "onHover" + o, d = l[c];
  d && Le.postRender(() => d(s, Ls(s)));
}
class o2 extends er {
  mount() {
    const { current: s } = this.node;
    s && (this.unmount = Lw(s, (o, l) => (Rv(this.node, l, "Start"), (c) => Rv(this.node, c, "End"))));
  }
  unmount() {
  }
}
class l2 extends er {
  constructor() {
    super(...arguments), this.isActive = false;
  }
  onFocus() {
    let s = false;
    try {
      s = this.node.current.matches(":focus-visible");
    } catch {
      s = true;
    }
    !s || !this.node.animationState || (this.node.animationState.setActive("whileFocus", true), this.isActive = true);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", false), this.isActive = false);
  }
  mount() {
    this.unmount = ys(js(this.node.current, "focus", () => this.onFocus()), js(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Mv(r, s, o) {
  const { props: l } = r;
  if (r.current instanceof HTMLButtonElement && r.current.disabled) return;
  r.animationState && l.whileTap && r.animationState.setActive("whileTap", o === "Start");
  const c = "onTap" + (o === "End" ? "" : o), d = l[c];
  d && Le.postRender(() => d(s, Ls(s)));
}
class u2 extends er {
  mount() {
    const { current: s } = this.node;
    if (!s) return;
    const { globalTapTarget: o, propagate: l } = this.node.props;
    this.unmount = Ow(s, (c, d) => (Mv(this.node, d, "Start"), (p, { success: m }) => Mv(this.node, p, m ? "End" : "Cancel")), { useGlobalTarget: o, stopPropagation: l?.tap === false });
  }
  unmount() {
  }
}
const ld = /* @__PURE__ */ new WeakMap(), ud = /* @__PURE__ */ new WeakMap(), c2 = (r) => {
  const s = ld.get(r.target);
  s && s(r);
}, d2 = (r) => {
  r.forEach(c2);
};
function f2({ root: r, ...s }) {
  const o = r || document;
  ud.has(o) || ud.set(o, {});
  const l = ud.get(o), c = JSON.stringify(s);
  return l[c] || (l[c] = new IntersectionObserver(d2, { root: r, ...s })), l[c];
}
function h2(r, s, o) {
  const l = f2(s);
  return ld.set(r, o), l.observe(r), () => {
    ld.delete(r), l.unobserve(r);
  };
}
const p2 = { some: 0, all: 1 };
class m2 extends er {
  constructor() {
    super(...arguments), this.hasEnteredView = false, this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport: s = {} } = this.node.getProps(), { root: o, margin: l, amount: c = "some", once: d } = s, p = { root: o ? o.current : void 0, rootMargin: l, threshold: typeof c == "number" ? c : p2[c] }, m = (v) => {
      const { isIntersecting: g } = v;
      if (this.isInView === g || (this.isInView = g, d && !g && this.hasEnteredView)) return;
      g && (this.hasEnteredView = true), this.node.animationState && this.node.animationState.setActive("whileInView", g);
      const { onViewportEnter: b, onViewportLeave: x } = this.node.getProps(), k = g ? b : x;
      k && k(v);
    };
    return h2(this.node.current, p, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: s, prevProps: o } = this.node;
    ["amount", "margin", "root"].some(g2(s, o)) && this.startObserver();
  }
  unmount() {
  }
}
function g2({ viewport: r = {} }, { viewport: s = {} } = {}) {
  return (o) => r[o] !== s[o];
}
const y2 = { inView: { Feature: m2 }, tap: { Feature: u2 }, focus: { Feature: l2 }, hover: { Feature: o2 } }, v2 = { layout: { ProjectionNode: sv, MeasureLayout: Av } }, b2 = { ...US, ...y2, ...i2, ...v2 }, Xt = FS(b2, DS);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const x2 = (r) => r.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), w2 = (r) => r.replace(/^([A-Z])|[\s-_]+(\w)/g, (s, o, l) => l ? l.toUpperCase() : o.toLowerCase()), Iv = (r) => {
  const s = w2(r);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, zv = (...r) => r.filter((s, o, l) => !!s && s.trim() !== "" && l.indexOf(s) === o).join(" ").trim(), k2 = (r) => {
  for (const s in r) if (s.startsWith("aria-") || s === "role" || s === "title") return true;
};
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var S2 = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const N2 = H.forwardRef(({ color: r = "currentColor", size: s = 24, strokeWidth: o = 2, absoluteStrokeWidth: l, className: c = "", children: d, iconNode: p, ...m }, v) => H.createElement("svg", { ref: v, ...S2, width: s, height: s, stroke: r, strokeWidth: l ? Number(o) * 24 / Number(s) : o, className: zv("lucide", c), ...!d && !k2(m) && { "aria-hidden": "true" }, ...m }, [...p.map(([g, b]) => H.createElement(g, b)), ...Array.isArray(d) ? d : [d]]));
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const xe = (r, s) => {
  const o = H.forwardRef(({ className: l, ...c }, d) => H.createElement(N2, { ref: d, iconNode: s, className: zv(`lucide-${x2(Iv(r))}`, `lucide-${r}`, l), ...c }));
  return o.displayName = Iv(r), o;
};
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const C2 = [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]], P2 = xe("arrow-right", C2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const E2 = [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", key: "11g9vi" }]], T2 = xe("bell", E2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const j2 = [["path", { d: "M10 12h4", key: "a56b0p" }], ["path", { d: "M10 8h4", key: "1sr2af" }], ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }], ["path", { d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2", key: "secmi2" }], ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]], Ov = xe("building-2", j2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const L2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]], Fv = xe("circle-check", L2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const A2 = [["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }], ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }], ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]], Dv = xe("ellipsis-vertical", A2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const R2 = [["path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0", key: "1nclc0" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]], M2 = xe("eye", R2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const I2 = [["path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }]], _v = xe("facebook", I2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const z2 = [["path", { d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z", key: "sc7q7i" }]], Vv = xe("funnel", z2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const O2 = [["path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z", key: "j76jl0" }], ["path", { d: "M22 10v6", key: "1lu8f3" }], ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]], F2 = xe("graduation-cap", O2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const D2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }], ["path", { d: "M2 12h20", key: "9i4pu4" }]], cd = xe("globe", D2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const _2 = [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }], ["path", { d: "M3 3v5h5", key: "1xhq8a" }], ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]], V2 = xe("history", _2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const B2 = [["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }], ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }], ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]], Bv = xe("instagram", B2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const U2 = [["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }], ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }], ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }], ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]], H2 = xe("layout-dashboard", U2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $2 = [["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }], ["path", { d: "M21 12H9", key: "dn1m92" }], ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]], q2 = xe("log-out", $2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const G2 = [["path", { d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z", key: "q8bfy3" }], ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }], ["path", { d: "M8 6v8", key: "15ugcq" }]], W2 = xe("megaphone", G2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Q2 = [["path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719", key: "1sd12s" }]], Uv = xe("message-circle", Q2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const K2 = [["path", { d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z", key: "18887p" }], ["path", { d: "m10 8-3 3 3 3", key: "fp6dz7" }], ["path", { d: "m14 14 3-3-3-3", key: "1yrceu" }]], X2 = xe("message-square-code", K2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Y2 = [["path", { d: "M12 22v-5", key: "1ega77" }], ["path", { d: "M9 8V2", key: "14iosj" }], ["path", { d: "M15 8V2", key: "18g5xt" }], ["path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z", key: "osxo6l" }]], Z2 = xe("plug", Y2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const J2 = [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]], dd = xe("plus", J2);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const eN = [["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }], ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]], Hv = xe("search", eN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const tN = [["path", { d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z", key: "1ffxy3" }], ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]], nN = xe("send", tN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const rN = [["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915", key: "1i5ecw" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]], aN = xe("settings", rN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const sN = [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }], ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]], xo = xe("shield-check", sN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const iN = [["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }], ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }], ["path", { d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12", key: "9zh506" }]], $v = xe("shopping-cart", iN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const oN = [["path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z", key: "1s2grr" }], ["path", { d: "M20 2v4", key: "1rf3ol" }], ["path", { d: "M22 4h-4", key: "gwowj6" }], ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]], fd = xe("sparkles", oN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const lN = [["path", { d: "M11 2v2", key: "1539x4" }], ["path", { d: "M5 2v2", key: "1yf1q8" }], ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }], ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }], ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]], uN = xe("stethoscope", lN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const cN = [["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }], ["path", { d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244", key: "o0xfot" }], ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]], dN = xe("store", cN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fN = [["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", key: "wmoenq" }], ["path", { d: "M12 9v4", key: "juzpu7" }], ["path", { d: "M12 17h.01", key: "p32p05" }]], hd = xe("triangle-alert", fN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const hN = [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }], ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }], ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }], ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]], pN = xe("users", hN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const mN = [["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }], ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }], ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]], pd = xe("workflow", mN);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const gN = [["path", { d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z", key: "1xq2db" }]], wo = xe("zap", gN), yN = [{ id: "AI_ASSISTANT", label: "AI Chat", icon: X2, section: "main" }, { id: "DASHBOARD", label: "Dashboard", icon: H2, section: "main" }, { id: "LEADS_MGMT", label: "Leads", icon: H2, section: "main" }, { id: "CAMPAIGNS", label: "Campaigns", icon: H2, section: "main" }, { id: "WORKFLOWS", label: "Workflows", icon: H2, section: "main" }, { id: "APPROVALS", label: "Approvals", icon: Fv, section: "main" }, { id: "ALERTS", label: "Alerts", icon: hd, section: "main" }, { id: "AUDIT_LOGS", label: "Audit Logs", icon: H2, section: "main" }, { id: "INTEGRATIONS_MGMT", label: "Integrations", icon: H2, section: "main" }, { id: "SETTINGS", label: "Settings", icon: H2, section: "main" }, { id: "PLAN_PREVIEW", label: "Plan Preview", icon: H2, section: "main" }, { id: "EXECUTION_RESULT", label: "Result", icon: H2, section: "main" }, { id: "EXECUTION_FAILED", label: "Failures", icon: H2, section: "main" }], me = ({ children: r, variant: s = "primary", className: o = "", ...l }) => {
  const c = { primary: "btn-primary", secondary: "btn-secondary", ghost: "hover:bg-surface-hover text-text-secondary hover:text-text-primary px-3 py-2 rounded-lg transition-all" };
  return h.jsx("button", { className: `${c[s]} ${o}`, ...l, children: r });
}, Ue = ({ children: r, className: s = "", title: o, subtitle: l, action: c, ...d }) => h.jsxs("div", { className: `glass-card p-6 ${s}`, ...d, children: [(o || c) && h.jsxs("div", { className: "flex justify-between items-start mb-6", children: [h.jsxs("div", { children: [o && h.jsx("h3", { className: "text-lg font-semibold text-text-primary", children: o }), l && h.jsx("p", { className: "text-sm text-text-secondary mt-1", children: l })] }), c] }), r] }), Vt = ({ children: r, variant: s = "neutral" }) => {
  const o = { success: "bg-mint/10 text-mint border border-mint/20", warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20", error: "bg-red-500/10 text-red-500 border border-red-500/20", info: "bg-blue-500/10 text-blue-500 border border-blue-500/20", neutral: "bg-white/5 text-text-secondary border border-white/10" };
  return h.jsx("span", { className: `badge ${o[s]}`, children: r });
}, vN = ({ currentScreen: r, onNavigate: s, onSignOut: o }) => {
  return h.jsxs("aside", { className: "w-64 border-r border-border flex flex-col h-screen sticky top-0 bg-background/50 backdrop-blur-xl", children: [h.jsxs("div", { className: "p-6 flex items-center gap-3", children: [h.jsx("div", { className: "w-8 h-8 bg-mint rounded-lg flex items-center justify-center", children: h.jsx(wo, { className: "text-background w-5 h-5 fill-current" }) }), h.jsx("span", { className: "font-display font-bold text-xl tracking-tight", children: "Social Flow" })] }), h.jsx("nav", { className: "flex-1 px-4 py-4", children: h.jsx("div", { className: "space-y-1", children: yN.map((l) => h.jsxs("button", { onClick: () => s(l.id), className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${r === l.id ? "bg-mint/10 text-mint" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"}`, children: [h.jsx(l.icon, { className: `w-4 h-4 ${r === l.id ? "text-mint" : "group-hover:text-text-primary"}` }), h.jsx("span", { className: "text-sm font-medium", children: l.label })] }, l.id)) }) }), h.jsx("div", { className: "p-4 border-t border-border", children: h.jsxs("button", { onClick: o, className: "w-full flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-red-400 transition-colors", children: [h.jsx(q2, { className: "w-4 h-4" }), h.jsx("span", { className: "text-sm font-medium", children: "Sign Out" })] }) })] });}, Cn = ({ title: r, actions: s }) => h.jsxs("header", { className: "h-16 border-b border-border flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10", children: [h.jsx("h1", { className: "text-lg font-semibold", children: r }), h.jsx("div", { className: "flex items-center gap-3", children: s || null })] }), Rs = ({ label: r, value: s, trend: o, icon: l, help: c = "" }) => h.jsx(Ue, { className: "flex-1", children: h.jsxs("div", { className: "flex justify-between items-start", children: [h.jsxs("div", { children: [h.jsxs("div", { className: "flex items-center gap-1.5", children: [h.jsx("p", { className: "text-sm text-text-secondary font-medium", children: r }), c ? h.jsx("span", { title: c, className: "inline-flex items-center justify-center w-4 h-4 rounded-full border border-white/20 text-[10px] text-text-secondary cursor-help", children: "?" }) : null] }), h.jsx("h4", { className: "text-2xl font-bold mt-2", children: s }), o && h.jsxs("p", { className: `text-xs mt-2 font-medium ${o.startsWith("+") ? "text-mint" : "text-red-400"}`, children: [o, " ", h.jsx("span", { className: "text-text-secondary font-normal ml-1", children: "vs last month" })] })] }), h.jsx("div", { className: "p-3 bg-white/5 rounded-xl border border-white/10", children: h.jsx(l, { className: "w-5 h-5 text-mint" }) })] }) }), tr = { workspace: "social_flow_studio_workspace_v1", operatorId: "social_flow_studio_operator_id_v1", operatorName: "social_flow_studio_operator_name_v1", gatewayKey: "social_flow_studio_gateway_key_v1" };
function ko(r) {
  try {
    return String(window.localStorage.getItem(r) || "");
  } catch {
    return "";
  }
}
function So(r, s) {
  try {
    s ? window.localStorage.setItem(r, s) : window.localStorage.removeItem(r);
  } catch {
  }
}
function bN(r) {
  return String(r || "").trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function md(r) {
  return !!r && typeof r == "object" && !Array.isArray(r);
}
function No(r) {
  return Array.isArray(r) ? r : [];
}
async function an(r, s = {}, o = "") {
  const l = String(o || "").trim(), c = new Headers(s.headers || {});
  c.has("Content-Type") || c.set("Content-Type", "application/json"), l && c.set("x-gateway-key", l);
  const d = await fetch(r, { ...s, headers: c, credentials: "same-origin" }), p = await d.text();
  let m = {};
  try {
    m = p ? JSON.parse(p) : {};
  } catch {
    m = { error: p || `HTTP ${d.status}` };
  }
  if (!d.ok) {
    const v = md(m) ? String(m.error || m.message || `HTTP ${d.status}`) : `HTTP ${d.status}`;
    throw new Error(v);
  }
  return m;
}
function qv(r, s) {
  const o = String(r?.message || "").trim();
  return o ? o.toLowerCase().includes("unauthorized") ? "Unauthorized. Provide a valid Gateway API key." : o.toLowerCase().includes("permission denied") ? "Permission denied for this operator. Use an owner/admin operator or bootstrap locally first." : o : s;
}
const xN = ({ onNavigate: r }) => h.jsxs("div", { className: "min-h-screen bg-background overflow-x-hidden", children: [h.jsxs("section", { className: "relative pt-32 pb-20 px-8", children: [h.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-mint/5 blur-[120px] rounded-full -z-10" }), h.jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [h.jsxs(Xt.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/10 border border-mint/20 text-mint text-xs font-bold uppercase tracking-widest mb-8", children: [h.jsx(fd, { className: "w-3 h-3" }), "Execution Infrastructure For Meta Ops"] }), h.jsxs(Xt.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-6xl md:text-8xl font-display font-bold tracking-tight leading-[0.9] mb-8", children: ["Run Meta operations with a ", h.jsx("span", { className: "text-mint", children: "reliable execution backbone" }), "."] }), h.jsx(Xt.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-xl text-text-secondary max-w-2xl mx-auto mb-12", children: "Built for agencies, operators, and agent builders who need deterministic execution across Ads, Graph, Instagram, and WhatsApp without babysitting tokens, retries, and partial failures." }), h.jsxs(Xt.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [h.jsxs(me, { onClick: () => r("SIGN_IN"), className: "px-8 py-4 text-lg flex items-center gap-2", children: ["Open Studio ", h.jsx(P2, { className: "w-5 h-5" })] }), h.jsx(me, { variant: "secondary", className: "px-8 py-4 text-lg", onClick: () => r("SETUP"), children: "Built Features" })] })] })] })] }), wN = ({ onNavigate: r, initialSession: s, onLoginSuccess: o }) => {
  const [d, p] = H.useState(s.workspace || "default"), [m, v] = H.useState(s.operatorId || ""), [g, b] = H.useState(s.operatorName || ""), [x, k] = H.useState(s.gatewayKey || ""), [T, z] = H.useState(false), [_, F] = H.useState(""), O = (B, X) => h.jsxs("label", { className: "text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1.5", children: [B, h.jsx("span", { title: X, className: "inline-flex items-center justify-center w-4 h-4 rounded-full border border-white/20 text-[10px] text-text-secondary cursor-help", children: "?" })] }), U = async () => {
    var B, X, V, W;
    const Q = String(d || "default").trim() || "default", ne = bN(m), ve = String(g || ne).trim(), Ae = String(x || "").trim();
    if (F(""), !ne) {
      F("Operator ID is required.");
      return;
    }
    z(true);
    try {
      await an("/api/health", { method: "GET" }, Ae);
      const Te = await an("/api/team/operator", { method: "POST", body: JSON.stringify({ workspace: Q, id: ne, name: ve }) }, Ae), st = await an(`/api/team/status?workspace=${encodeURIComponent(Q)}`, { method: "GET" }, Ae), Xe = { workspace: String(st.workspace || Te.workspace || Q), operatorId: String(((B = st.operator) == null ? void 0 : B.id) || ((X = Te.operator) == null ? void 0 : X.id) || ne), operatorName: String(((V = st.operator) == null ? void 0 : V.name) || ((W = Te.operator) == null ? void 0 : W.name) || ve), gatewayKey: Ae, role: String(st.role || Te.role || "") };
      So(tr.workspace, Xe.workspace), So(tr.operatorId, Xe.operatorId), So(tr.operatorName, Xe.operatorName), So(tr.gatewayKey, Xe.gatewayKey), o(Xe), r("AI_ASSISTANT");
    } catch (Te) {
      F(qv(Te, "Unable to connect Studio to the gateway."));
    } finally {
      z(false);
    }
  };
  return h.jsxs("div", { className: "min-h-screen flex items-center justify-center px-8 bg-background relative overflow-hidden", children: [h.jsx("div", { className: "pointer-events-none absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,163,0.05),transparent_50%)]" }), h.jsx(Xt.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "relative z-10 w-full max-w-md", children: h.jsxs(Ue, { className: "p-10", children: [h.jsxs("div", { className: "text-center mb-10", children: [h.jsx("div", { className: "w-12 h-12 bg-mint rounded-xl flex items-center justify-center mx-auto mb-6", children: h.jsx(wo, { className: "text-background w-7 h-7 fill-current" }) }), h.jsx("h2", { className: "text-2xl font-display font-bold", children: "Studio Login" }), h.jsx("p", { className: "text-text-secondary text-sm mt-2", children: "Connect this UI to your running Social Flow gateway." })] }), h.jsxs("div", { className: "space-y-4", children: [h.jsxs("div", { className: "space-y-2", children: [O("Workspace", "Workspace is your tenant scope. Use the same value across your team to share data and approvals."), h.jsx("input", { value: d, onChange: (B) => p(B.target.value), placeholder: "default", className: "w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-mint/50 transition-all" }), h.jsx("p", { className: "text-[11px] text-text-secondary", children: "Example: default, re-india, re-uae." })] }), h.jsxs("div", { className: "space-y-2", children: [O("Operator ID", "Stable unique ID used for role mapping and audit logs. Use letters, numbers, dash, or underscore."), h.jsx("input", { value: m, onChange: (B) => v(B.target.value), placeholder: "ops-owner", className: "w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-mint/50 transition-all" }), h.jsx("p", { className: "text-[11px] text-text-secondary", children: "This becomes your actor identity in approvals, activity, and RBAC." })] }), h.jsxs("div", { className: "space-y-2", children: [O("Operator Name", "Display name shown in activity and approvals."), h.jsx("input", { value: g, onChange: (B) => b(B.target.value), placeholder: "Your Name", className: "w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-mint/50 transition-all" })] }), h.jsxs("div", { className: "space-y-2", children: [O("Gateway API Key (optional)", "Needed only when gateway protection is enabled. Sent as x-gateway-key header."), h.jsx("input", { type: "password", value: x, onChange: (B) => k(B.target.value), placeholder: "x-gateway-key", className: "w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-mint/50 transition-all" }), h.jsx("p", { className: "text-[11px] text-text-secondary", children: "Leave blank for local relaxed mode." })] }), _ ? h.jsx("p", { className: "text-xs text-red-400 border border-red-500/30 rounded-lg px-3 py-2 bg-red-500/5", children: _ }) : null, h.jsx(me, { onClick: () => U(), className: "w-full py-3", disabled: T, children: T ? "Connecting..." : "Connect Studio" }), h.jsx(me, { variant: "ghost", onClick: () => r("HOME"), className: "w-full py-2", children: "Back" })] })] }) })] });
}, kN = ({ onNavigate: r }) => h.jsx("div", { className: "min-h-screen flex items-center justify-center px-8 bg-background", children: h.jsx(Xt.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "max-w-2xl w-full", children: h.jsxs(Ue, { className: "p-12 text-center", children: [h.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-mint/10 border border-mint/20 mb-8", children: h.jsx(fd, { className: "w-10 h-10 text-mint" }) }), h.jsx("h2", { className: "text-4xl font-display font-bold mb-4", children: "Let's set up your Studio" }), h.jsx("p", { className: "text-text-secondary text-lg mb-10", children: "We'll have you ready to automate in less than 5 minutes." }), h.jsx("div", { className: "space-y-4 text-left max-w-md mx-auto mb-12", children: [{ label: "Choose your industry vertical", time: "30s" }, { label: "Connect your social channels", time: "2m" }, { label: "Configure AI guardrails", time: "1m" }].map((s, o) => h.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10", children: [h.jsxs("div", { className: "flex items-center gap-3", children: [h.jsx("div", { className: "w-6 h-6 rounded-full border border-mint/30 flex items-center justify-center text-xs text-mint font-bold", children: o + 1 }), h.jsx("span", { className: "font-medium", children: s.label })] }), h.jsx("span", { className: "text-xs text-text-secondary font-mono", children: s.time })] }, o)) }), h.jsx(me, { onClick: () => r("CHOOSE_VERTICAL"), className: "px-10 py-4 text-lg", children: "Get Started" })] }) }) }), SN = ({ onNavigate: r }) => h.jsx("div", { className: "min-h-screen flex items-center justify-center px-8 bg-background", children: h.jsxs("div", { className: "max-w-4xl w-full", children: [h.jsxs("div", { className: "text-center mb-12", children: [h.jsx("h2", { className: "text-3xl font-display font-bold mb-4", children: "Select your vertical" }), h.jsx("p", { className: "text-text-secondary", children: "We'll pre-configure templates and AI models for your industry." })] }), h.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [{ id: "re_india", label: "Real Estate India", icon: Ov }, { id: "re_uae", label: "Real Estate UAE", icon: cd }, { id: "ecom", label: "Ecommerce", icon: $v }, { id: "edtech", label: "Edtech", icon: F2 }, { id: "health", label: "Healthcare", icon: uN }, { id: "local", label: "Local Services", icon: dN }].map((s) => h.jsxs("button", { onClick: () => r("CONNECT_INTEGRATIONS"), className: "p-6 rounded-2xl bg-surface border border-border hover:border-mint/50 hover:bg-surface-hover transition-all text-left group", children: [h.jsx("div", { className: "w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mint group-hover:text-background transition-all", children: h.jsx(s.icon, { className: "w-5 h-5" }) }), h.jsx("h3", { className: "font-bold", children: s.label })] }, s.id)) })] }) }), NN = ({ onNavigate: r }) => h.jsx("div", { className: "min-h-screen flex items-center justify-center px-8 bg-background", children: h.jsxs("div", { className: "max-w-2xl w-full", children: [h.jsxs("div", { className: "text-center mb-12", children: [h.jsx("h2", { className: "text-3xl font-display font-bold mb-4", children: "Connect your channels" }), h.jsx("p", { className: "text-text-secondary", children: "Social Flow needs access to your social accounts to capture leads." })] }), h.jsx("div", { className: "space-y-4 mb-12", children: [{ label: "Facebook Ads", icon: _v, status: "pending" }, { label: "Instagram", icon: Bv, status: "connected" }, { label: "WhatsApp Business", icon: Uv, status: "error" }].map((s, o) => h.jsxs(Ue, { className: "flex items-center justify-between py-4", children: [h.jsxs("div", { className: "flex items-center gap-4", children: [h.jsx("div", { className: "w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center", children: h.jsx(s.icon, { className: "w-5 h-5" }) }), h.jsxs("div", { children: [h.jsx("h4", { className: "font-bold", children: s.label }), h.jsx("p", { className: "text-xs text-text-secondary", children: "Required for lead capture" })] })] }), s.status === "connected" ? h.jsx(Vt, { variant: "success", children: "Connected" }) : s.status === "error" ? h.jsx(me, { variant: "secondary", className: "text-xs py-1 px-3 border-red-500/50 text-red-500", children: "Reconnect" }) : h.jsx(me, { variant: "primary", className: "text-xs py-1 px-3", children: "Connect" })] }, o)) }), h.jsxs("div", { className: "flex justify-between items-center", children: [h.jsx(me, { variant: "ghost", onClick: () => r("CHOOSE_VERTICAL"), children: "Back" }), h.jsx(me, { onClick: () => r("POLICY_GUARDRAILS"), children: "Continue" })] })] }) }), CN = ({ onNavigate: r }) => h.jsx("div", { className: "min-h-screen flex items-center justify-center px-8 bg-background", children: h.jsxs("div", { className: "max-w-2xl w-full", children: [h.jsxs("div", { className: "text-center mb-12", children: [h.jsx("h2", { className: "text-3xl font-display font-bold mb-4", children: "AI Safety & Guardrails" }), h.jsx("p", { className: "text-text-secondary", children: "Define how much autonomy the AI has over your operations." })] }), h.jsxs("div", { className: "space-y-6 mb-12", children: [h.jsx("div", { className: "grid grid-cols-1 gap-4", children: [{ id: "observe", label: "Observation Mode", desc: "AI suggests actions, you approve everything.", icon: M2 }, { id: "approval", label: "Approval Required", desc: "AI executes low-risk tasks, asks for high-risk.", icon: xo }, { id: "auto", label: "Auto-Safe", desc: "AI executes all actions within defined thresholds.", icon: wo }].map((s) => h.jsxs("button", { className: "p-5 rounded-2xl bg-surface border border-border hover:border-mint/50 text-left flex gap-4 transition-all group", children: [h.jsx("div", { className: "w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-mint/10 group-hover:text-mint", children: h.jsx(s.icon, { className: "w-6 h-6" }) }), h.jsxs("div", { children: [h.jsx("h4", { className: "font-bold mb-1", children: s.label }), h.jsx("p", { className: "text-sm text-text-secondary", children: s.desc })] })] }, s.id)) }), h.jsx(Ue, { title: "Risk Thresholds", children: h.jsx("div", { className: "space-y-4", children: h.jsxs("div", { children: [h.jsxs("div", { className: "flex justify-between text-xs font-bold uppercase tracking-wider text-text-secondary mb-2", children: [h.jsx("span", { children: "Daily Action Limit" }), h.jsx("span", { children: "500 actions" })] }), h.jsx("div", { className: "h-2 bg-background rounded-full overflow-hidden", children: h.jsx("div", { className: "h-full bg-mint w-3/4" }) })] }) }) })] }), h.jsxs("div", { className: "flex justify-between items-center", children: [h.jsx(me, { variant: "ghost", onClick: () => r("CONNECT_INTEGRATIONS"), children: "Back" }), h.jsx(me, { onClick: () => r("DASHBOARD"), children: "Finish Setup" })] })] }) }), Gv = ({ onNavigate: r, session: s }) => {
  var o;
  const [l, c] = H.useState(true), [d, p] = H.useState(""), [m, v] = H.useState(""), [g, b] = H.useState({ health: {}, summary: {}, readiness: {}, alerts: [], approvals: [] }), x = String(s.workspace || "default").trim() || "default", k = async () => {
    c(true), p("");
    try {
      const [Q, G, ne, ve, Ae] = await Promise.all([an("/api/health", { method: "GET" }, s.gatewayKey), an(`/api/ops/summary?workspace=${encodeURIComponent(x)}`, { method: "GET" }, s.gatewayKey), an(`/api/ops/readiness?workspace=${encodeURIComponent(x)}`, { method: "GET" }, s.gatewayKey), an(`/api/ops/alerts?workspace=${encodeURIComponent(x)}&open=1`, { method: "GET" }, s.gatewayKey), an(`/api/ops/approvals?workspace=${encodeURIComponent(x)}&open=1`, { method: "GET" }, s.gatewayKey)]);
      b({ health: Q, summary: G, readiness: ne, alerts: No(ve.alerts), approvals: No(Ae.approvals) });
    } catch (Q) {
      p(qv(Q, "Failed to load live dashboard data from gateway."));
    } finally {
      c(false);
    }
  }, T = async (Q) => {
    const G = String(Q || "").trim();
    if (!G) return;
    v("");
    try {
      await an("/api/ops/alerts/ack", { method: "POST", body: JSON.stringify({ workspace: x, id: G }) }, s.gatewayKey);
      await k();
      v("Alert acknowledged.");
    } catch (ne) {
      p(qv(ne, "Unable to acknowledge alert."));
    }
  }, z = async (Q, G) => {
    const ne = String(Q || "").trim(), ve = String(G || "").trim().toLowerCase();
    if (!ne || (ve !== "approve" && ve !== "reject")) return;
    v("");
    try {
      await an("/api/ops/approvals/resolve", { method: "POST", body: JSON.stringify({ workspace: x, id: ne, decision: ve }) }, s.gatewayKey);
      await k();
      v(ve === "approve" ? "Approval approved." : "Approval rejected.");
    } catch (Ae) {
      p(qv(Ae, "Unable to resolve approval."));
    }
  };
  H.useEffect(() => {
    k();
  }, [x, s.gatewayKey]);
  const _ = md(g.summary.summary) ? g.summary.summary : {}, F = md(g.readiness.report) ? g.readiness.report : {}, O = No(F.checks), U = No(F.nextActions), B = String(((o = _.guardPolicy) == null ? void 0 : o.mode) || "--"), X = String(g.health.version || "--"), V = Number(_.alertsOpen ?? g.alerts.length ?? 0), W = Number(_.approvalsPending ?? g.approvals.length ?? 0), Q = Number(_.sourcesReady ?? 0), G = Number(_.sourcesConfigured ?? 0);
  return h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Operations Home", actions: h.jsx(me, { variant: "secondary", className: "text-xs py-1.5", onClick: k, children: l ? "Refreshing..." : "Refresh" }) }), h.jsxs("main", { className: "p-8 space-y-8", children: [h.jsxs("div", { className: "flex flex-wrap gap-6", children: [h.jsx(Rs, { label: "Gateway", value: `v${X}`, trend: g.health.ok ? "+online" : "-offline", icon: wo, help: "Gateway process and API are reachable." }), h.jsx(Rs, { label: "Guard Mode", value: B, trend: "+policy", icon: xo, help: "AI autonomy level for this workspace." }), h.jsx(Rs, { label: "Open Alerts", value: String(V), trend: V > 0 ? "-needs review" : "+clear", icon: hd, help: "Unacknowledged issues detected by workflows." }), h.jsx(Rs, { label: "Pending Approvals", value: String(W), trend: W > 0 ? "-action required" : "+clear", icon: Fv, help: "Actions waiting for operator decision." }), h.jsx(Rs, { label: "Sources Ready", value: `${Q}/${G}`, trend: "+connectors", icon: pd, help: "Ready sources versus configured sources." })] }), d ? h.jsx(Ue, { title: "Gateway Sync Error", subtitle: d, children: h.jsxs("div", { className: "flex gap-3", children: [h.jsx(me, { className: "text-xs py-2", onClick: k, children: "Retry" }), h.jsx(me, { variant: "secondary", className: "text-xs py-2", onClick: () => r("SIGN_IN"), children: "Back To Login" })] }) }) : null, m ? h.jsx(Ue, { title: "Update", subtitle: m }) : null, h.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [h.jsx(Ue, { title: "Readiness Checks", subtitle: `Workspace: ${x}`, children: h.jsx("div", { className: "space-y-3", children: O.length === 0 ? h.jsx("p", { className: "text-sm text-text-secondary", children: l ? "Loading readiness checks..." : "No readiness checks returned by gateway." }) : O.slice(0, 8).map((ne, ve) => {
    const Ae = !!(ne != null && ne.ok), Te = String(ne?.key || `check-${ve}`).replace(/_/g, " "), st = String(ne?.detail || "");
    return h.jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/10", children: [h.jsxs("div", { className: "flex items-center justify-between gap-3", children: [h.jsx("p", { className: "text-sm font-semibold capitalize", children: Te }), h.jsx(Vt, { variant: Ae ? "success" : "warning", children: Ae ? "ready" : "attention" })] }), h.jsx("p", { className: "text-xs text-text-secondary mt-2", children: st || "No detail provided." })] }, ve);
  }) }) }), h.jsx(Ue, { title: "Next Best Actions", children: h.jsx("div", { className: "space-y-3", children: U.length === 0 ? h.jsx("p", { className: "text-sm text-text-secondary", children: l ? "Loading recommendations..." : "No recommended actions right now." }) : U.slice(0, 8).map((ne, ve) => h.jsx("div", { className: "p-3 rounded-xl bg-white/5 border border-white/10 text-sm", children: String(ne) }, ve)) }) }), h.jsx(Ue, { title: "Open Alerts", subtitle: `${V} currently open`, children: h.jsx("div", { className: "space-y-3", children: g.alerts.length === 0 ? h.jsx("p", { className: "text-sm text-text-secondary", children: l ? "Loading alerts..." : "No open alerts." }) : g.alerts.slice(0, 6).map((ne, ve) => {
    const Ae = String(ne.id || "").trim();
    return h.jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/10", children: [h.jsxs("div", { className: "flex items-center justify-between gap-3", children: [h.jsx("p", { className: "text-sm font-semibold", children: String(ne.title || ne.type || ne.id || `alert-${ve}`) }), h.jsx(Vt, { variant: String(ne.severity || "").toLowerCase() === "high" ? "error" : "warning", children: String(ne.severity || "open") })] }), h.jsx("p", { className: "text-xs text-text-secondary mt-2", children: String(ne.detail || ne.message || "No detail provided.") }), h.jsx("div", { className: "pt-2", children: h.jsx(me, { variant: "secondary", className: "text-xs py-1.5", onClick: () => T(Ae), disabled: l || !Ae, children: "Acknowledge" }) })] }, ve);
  }) }) }), h.jsx(Ue, { title: "Pending Approvals", subtitle: `${W} awaiting decision`, children: h.jsx("div", { className: "space-y-3", children: g.approvals.length === 0 ? h.jsx("p", { className: "text-sm text-text-secondary", children: l ? "Loading approvals..." : "No pending approvals." }) : g.approvals.slice(0, 6).map((ne, ve) => {
    const Ae = String(ne.id || "").trim();
    return h.jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/10", children: [h.jsxs("div", { className: "flex items-center justify-between gap-3", children: [h.jsx("p", { className: "text-sm font-semibold", children: String(ne.title || ne.action || ne.id || `approval-${ve}`) }), h.jsx(Vt, { variant: String(ne.risk || "").toLowerCase() === "high" ? "error" : "warning", children: String(ne.risk || "pending") })] }), h.jsx("p", { className: "text-xs text-text-secondary mt-2", children: String(ne.reason || ne.note || ne.summary || "Pending operator decision.") }), h.jsxs("div", { className: "pt-2 flex gap-2", children: [h.jsx(me, { className: "text-xs py-1.5 px-3", onClick: () => z(Ae, "approve"), disabled: l || !Ae, children: "Approve" }), h.jsx(me, { variant: "secondary", className: "text-xs py-1.5 px-3", onClick: () => z(Ae, "reject"), disabled: l || !Ae, children: "Reject" })] })] }, ve);
  }) }) })] })] })] });}, PN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Leads Management", actions: h.jsxs(me, { className: "flex items-center gap-2", children: [h.jsx(dd, { className: "w-4 h-4" }), " Add Lead"] }) }), h.jsx("main", { className: "p-8", children: h.jsxs(Ue, { children: [h.jsxs("div", { className: "flex items-center justify-between mb-6", children: [h.jsxs("div", { className: "flex items-center gap-4", children: [h.jsxs("div", { className: "flex bg-background rounded-lg p-1 border border-border", children: [h.jsx("button", { className: "px-3 py-1.5 text-xs font-bold bg-surface rounded-md text-mint", children: "All Leads" }), h.jsx("button", { className: "px-3 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary", children: "Qualified" }), h.jsx("button", { className: "px-3 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary", children: "New" })] }), h.jsxs(me, { variant: "secondary", className: "flex items-center gap-2 text-xs py-1.5", children: [h.jsx(Vv, { className: "w-3 h-3" }), " Filters"] })] }), h.jsx("div", { className: "text-xs text-text-secondary", children: "Showing 1-10 of 12,482 leads" })] }), h.jsxs("table", { className: "w-full text-left", children: [h.jsx("thead", { children: h.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-text-secondary border-b border-border", children: [h.jsx("th", { className: "pb-4 font-bold", children: "Name" }), h.jsx("th", { className: "pb-4 font-bold", children: "Status" }), h.jsx("th", { className: "pb-4 font-bold", children: "Priority" }), h.jsx("th", { className: "pb-4 font-bold", children: "Source" }), h.jsx("th", { className: "pb-4 font-bold", children: "Owner" }), h.jsx("th", { className: "pb-4 font-bold text-right", children: "Actions" })] }) }), h.jsx("tbody", { className: "divide-y divide-border", children: [{ name: "Rahul Sharma", email: "rahul@example.com", status: "Qualified", priority: "High", source: "FB Ads", owner: "Vikram S." }, { name: "Anjali Gupta", email: "anjali@example.com", status: "New", priority: "Medium", source: "Instagram", owner: "Unassigned" }, { name: "Karan Malhotra", email: "karan@example.com", status: "Contacted", priority: "Low", source: "WhatsApp", owner: "Sarah J." }, { name: "Pooja Varma", email: "pooja@example.com", status: "Qualified", priority: "High", source: "FB Ads", owner: "Vikram S." }].map((r, s) => h.jsxs("tr", { className: "group hover:bg-white/5 transition-all", children: [h.jsxs("td", { className: "py-4", children: [h.jsx("div", { className: "font-bold text-sm", children: r.name }), h.jsx("div", { className: "text-xs text-text-secondary", children: r.email })] }), h.jsx("td", { className: "py-4", children: h.jsx(Vt, { variant: r.status === "Qualified" ? "success" : r.status === "New" ? "info" : "neutral", children: r.status }) }), h.jsx("td", { className: "py-4", children: h.jsx(Vt, { variant: r.priority === "High" ? "error" : r.priority === "Medium" ? "warning" : "neutral", children: r.priority }) }), h.jsx("td", { className: "py-4 text-sm text-text-secondary", children: r.source }), h.jsx("td", { className: "py-4 text-sm text-text-secondary", children: r.owner }), h.jsx("td", { className: "py-4 text-right", children: h.jsx("button", { className: "p-2 text-text-secondary hover:text-text-primary transition-colors", children: h.jsx(Dv, { className: "w-4 h-4" }) }) })] }, s)) })] })] }) })] }), EN = ({ session: r }) => {
  const [s, o] = H.useState(""), [l, c] = H.useState([{ role: "assistant", content: "Ask me to run tool-calling workflows: approvals, alerts, morning ops, or connector sync." }]), [d, p] = H.useState(""), [m, v] = H.useState(false), [g, b] = H.useState(""), [x, k] = H.useState(""), T = async () => {
    if (d) return d;
    try {
      const Q = await an("/api/chat/start", { method: "POST", body: JSON.stringify({}) }, r.gatewayKey), G = String(Q.sessionId || "").trim(), ne = No(Q.history).map((ve) => ({ role: String(ve?.role || "").toLowerCase() === "user" ? "user" : "assistant", content: String(ve?.content || "").trim() })).filter((ve) => ve.content);
      if (G) p(G);
      if (ne.length) c(ne);
      return G;
    } catch (Q) {
      k(qv(Q, "Unable to start AI chat session."));
      return "";
    }
  }, z = async (Q = "") => {
    const G = String(Q || s).trim();
    if (!G || m) return;
    k(""), b(""), v(true), o(""), c((ne) => [...ne, { role: "user", content: G }]);
    try {
      const ne = d || await T();
      if (!ne) throw new Error("Chat session was not created.");
      const ve = await an("/api/chat/message", { method: "POST", body: JSON.stringify({ sessionId: ne, message: G }) }, r.gatewayKey), Ae = No(ve.history).map((W) => ({ role: String(W?.role || "").toLowerCase() === "user" ? "user" : "assistant", content: String(W?.content || "").trim() })).filter((W) => W.content), Te = String(ve?.response?.message || "").trim(), st = No(ve.executed);
      if (Ae.length) c(Ae);
      else if (Te) c((W) => [...W, { role: "assistant", content: Te }]);
      if (st.length) {
        const W = st.filter((Qe) => Qe && Qe.success).length, Qe = st.length - W;
        b(`Executed ${st.length} tool call${st.length === 1 ? "" : "s"}${Qe > 0 ? ` (${W} success, ${Qe} failed)` : ""}.`);
      } else {
        b(ve?.response?.needsInput ? "Waiting for your next instruction." : "");
      }
    } catch (ne) {
      const ve = qv(ne, "AI chat failed. Check gateway auth and provider setup.");
      k(ve), c((Ae) => [...Ae, { role: "assistant", content: `Error: ${ve}` }]);
    } finally {
      v(false);
    }
  };
  H.useEffect(() => {
    T();
  }, [r.gatewayKey]);
  return h.jsxs("div", { className: "flex-1 min-h-screen bg-background flex flex-col", children: [h.jsx(Cn, { title: "AI Command Center", actions: h.jsx("div", { className: "text-xs text-text-secondary font-mono", children: d ? `session:${d.slice(-8)}` : "starting session..." }) }), h.jsxs("main", { className: "flex-1 p-8 flex flex-col max-w-5xl mx-auto w-full", children: [x ? h.jsx("p", { className: "text-xs text-red-400 border border-red-500/30 rounded-lg px-3 py-2 bg-red-500/5 mb-4", children: x }) : null, g ? h.jsx("p", { className: "text-xs text-mint border border-mint/30 rounded-lg px-3 py-2 bg-mint/5 mb-4", children: g }) : null, h.jsx("div", { className: "flex-1 space-y-6 overflow-y-auto pb-28", children: l.map((Q, G) => h.jsx(Xt.div, { initial: { opacity: 0, x: Q.role === "user" ? 20 : -20 }, animate: { opacity: 1, x: 0 }, className: `flex ${Q.role === "user" ? "justify-end" : "justify-start"}`, children: h.jsx("div", { className: `max-w-[82%] p-4 rounded-2xl ${Q.role === "user" ? "bg-mint text-background font-medium" : "bg-surface border border-border text-text-primary"}`, children: Q.content }) }, `${Q.role}-${G}`)) }), h.jsxs("div", { className: "fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-8", children: [h.jsxs("div", { className: "relative", children: [h.jsx("input", { type: "text", value: s, onChange: (Q) => o(Q.target.value), onKeyDown: (Q) => Q.key === "Enter" && z(), placeholder: "Ask AI to run ops tools, approvals, alerts, or connector sync...", className: "w-full bg-surface border border-border rounded-2xl pl-6 pr-16 py-4 text-lg focus:outline-none focus:border-mint shadow-2xl", disabled: m }), h.jsx("button", { onClick: () => z(), className: "absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-mint rounded-xl flex items-center justify-center text-background hover:brightness-110 transition-all disabled:opacity-50", disabled: m, children: h.jsx(nN, { className: "w-5 h-5" }) })] }), h.jsx("div", { className: "flex gap-2 mt-4 justify-center", children: ["Run morning ops", "Show open approvals", "Acknowledge token alerts"].map((Q) => h.jsx("button", { className: "px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-mint hover:border-mint/30 transition-all", onClick: () => z(Q), children: Q }, Q)) })] })] })] });
}, TN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Campaigns", actions: h.jsxs(me, { className: "flex items-center gap-2", children: [h.jsx(dd, { className: "w-4 h-4" }), " New Campaign"] }) }), h.jsx("main", { className: "p-8", children: h.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [{ name: "RE Mumbai Q1", status: "active", spend: 4500, cpa: 12.5, roas: 4.2, health: "good" }, { name: "Dubai Investor Outreach", status: "active", spend: 8200, cpa: 45, roas: 3.8, health: "warning" }, { name: "Ecom Spring Sale", status: "paused", spend: 1200, cpa: 8.2, roas: 5.1, health: "good" }, { name: "Healthcare Leads Pune", status: "active", spend: 3100, cpa: 22.1, roas: 2.9, health: "critical" }].map((r, s) => h.jsxs(Ue, { title: r.name, action: h.jsx(Vt, { variant: r.status === "active" ? "success" : "neutral", children: r.status }), children: [h.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [h.jsxs("div", { children: [h.jsx("p", { className: "text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1", children: "Spend" }), h.jsxs("p", { className: "text-lg font-bold", children: ["$", r.spend.toLocaleString()] })] }), h.jsxs("div", { children: [h.jsx("p", { className: "text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1", children: "ROAS" }), h.jsxs("p", { className: "text-lg font-bold text-mint", children: [r.roas, "x"] })] })] }), h.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [h.jsxs("div", { className: "flex items-center gap-2", children: [h.jsx("div", { className: `w-2 h-2 rounded-full ${r.health === "good" ? "bg-mint" : r.health === "warning" ? "bg-yellow-500" : "bg-red-500"}` }), h.jsxs("span", { className: "text-xs text-text-secondary capitalize", children: [r.health, " Health"] })] }), h.jsx(me, { variant: "ghost", className: "text-xs py-1", children: "Details" })] })] }, s)) }) })] }), jN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Automation Workflows", actions: h.jsxs(me, { className: "flex items-center gap-2", children: [h.jsx(dd, { className: "w-4 h-4" }), " Create Workflow"] }) }), h.jsx("main", { className: "p-8", children: h.jsx("div", { className: "space-y-4", children: [{ name: "Lead Qualification (RE India)", trigger: "New Lead from FB Ads", lastRun: "2m ago", status: "active" }, { name: "International Investor Nurture", trigger: "Lead Status -> Qualified", lastRun: "1h ago", status: "active" }, { name: "Abandoned Cart Recovery", trigger: "Ecom Event -> Cart Abandoned", lastRun: "12h ago", status: "paused" }].map((r, s) => h.jsxs(Ue, { className: "flex items-center justify-between py-4", children: [h.jsxs("div", { className: "flex items-center gap-6", children: [h.jsx("div", { className: "w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center text-mint", children: h.jsx(pd, { className: "w-6 h-6" }) }), h.jsxs("div", { children: [h.jsx("h4", { className: "font-bold", children: r.name }), h.jsxs("p", { className: "text-xs text-text-secondary", children: ["Trigger: ", r.trigger] })] })] }), h.jsxs("div", { className: "flex items-center gap-8", children: [h.jsxs("div", { className: "text-right", children: [h.jsx("p", { className: "text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1", children: "Last Run" }), h.jsx("p", { className: "text-xs font-mono", children: r.lastRun })] }), h.jsxs("div", { className: "flex items-center gap-4", children: [h.jsx(Vt, { variant: r.status === "active" ? "success" : "neutral", children: r.status }), h.jsx(me, { variant: "ghost", className: "p-2", children: h.jsx(Dv, { className: "w-4 h-4" }) })] })] })] }, s)) }) })] }), LN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Approvals Queue" }), h.jsxs("main", { className: "p-8 max-w-4xl mx-auto", children: [h.jsxs("div", { className: "flex items-center justify-between mb-8", children: [h.jsxs("div", { children: [h.jsx("h2", { className: "text-2xl font-display font-bold", children: "Pending Review" }), h.jsx("p", { className: "text-text-secondary text-sm", children: "AI actions requiring human oversight based on your guardrails." })] }), h.jsx(Vt, { variant: "warning", children: "4 Pending" })] }), h.jsx("div", { className: "space-y-6", children: [{ id: "APP-001", type: "Budget Adjustment", risk: "High", desc: 'Increase daily budget for "RE Mumbai Q1" by $500 (50% increase).', context: "Campaign is performing 2.4x above target ROAS." }, { id: "APP-002", type: "Lead Assignment", risk: "Medium", desc: 'Re-assign 45 uncontacted leads from "Agent A" to "Agent B".', context: "Agent A has exceeded response time threshold (4h)." }].map((r, s) => h.jsxs(Ue, { className: "p-0 overflow-hidden", children: [h.jsxs("div", { className: "p-6 space-y-4", children: [h.jsxs("div", { className: "flex justify-between items-start", children: [h.jsxs("div", { className: "flex items-center gap-3", children: [h.jsxs(Vt, { variant: r.risk === "High" ? "error" : "warning", children: [r.risk, " Risk"] }), h.jsx("span", { className: "text-xs font-mono text-text-secondary", children: r.id })] }), h.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-mint", children: r.type })] }), h.jsx("p", { className: "text-lg font-medium leading-relaxed", children: r.desc }), h.jsxs("div", { className: "p-4 rounded-xl bg-background border border-border flex gap-3", children: [h.jsx(hd, { className: "w-5 h-5 text-yellow-500 shrink-0" }), h.jsxs("p", { className: "text-sm text-text-secondary italic", children: ["AI Context: ", r.context] })] })] }), h.jsxs("div", { className: "flex border-t border-border", children: [h.jsx("button", { className: "flex-1 py-4 text-sm font-bold hover:bg-mint/10 hover:text-mint transition-all border-r border-border", children: "Approve Action" }), h.jsx("button", { className: "flex-1 py-4 text-sm font-bold hover:bg-red-500/10 hover:text-red-500 transition-all", children: "Reject" })] })] }, s)) })] })] }), AN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Audit Logs" }), h.jsx("main", { className: "p-8", children: h.jsxs(Ue, { children: [h.jsxs("div", { className: "flex items-center justify-between mb-6", children: [h.jsxs("div", { className: "relative", children: [h.jsx(Hv, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" }), h.jsx("input", { type: "text", placeholder: "Search logs...", className: "bg-background border border-border rounded-lg pl-10 pr-4 py-1.5 text-sm w-64" })] }), h.jsxs(me, { variant: "secondary", className: "text-xs py-1.5 flex items-center gap-2", children: [h.jsx(Vv, { className: "w-3 h-3" }), " Filter by Actor"] })] }), h.jsxs("table", { className: "w-full text-left", children: [h.jsx("thead", { children: h.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-text-secondary border-b border-border", children: [h.jsx("th", { className: "pb-4 font-bold", children: "Timestamp" }), h.jsx("th", { className: "pb-4 font-bold", children: "Actor" }), h.jsx("th", { className: "pb-4 font-bold", children: "Action" }), h.jsx("th", { className: "pb-4 font-bold", children: "Target" }), h.jsx("th", { className: "pb-4 font-bold text-right", children: "Status" })] }) }), h.jsx("tbody", { className: "divide-y divide-border", children: [{ time: "2024-03-03 10:45:12", actor: "AI Agent (Studio)", action: "Lead Qualified", target: "Rahul Sharma", status: "Success" }, { time: "2024-03-03 10:42:05", actor: "John Doe", action: "Login", target: "Workspace", status: "Success" }, { time: "2024-03-03 09:15:33", actor: "AI Agent (Studio)", action: "Budget Update", target: "RE Mumbai Q1", status: "Pending" }, { time: "2024-03-03 08:30:00", actor: "System", action: "Integration Sync", target: "Facebook Ads", status: "Success" }].map((r, s) => h.jsxs("tr", { className: "text-sm", children: [h.jsx("td", { className: "py-4 font-mono text-xs text-text-secondary", children: r.time }), h.jsx("td", { className: "py-4 font-bold", children: r.actor }), h.jsx("td", { className: "py-4", children: r.action }), h.jsx("td", { className: "py-4 text-text-secondary", children: r.target }), h.jsx("td", { className: "py-4 text-right", children: h.jsx(Vt, { variant: r.status === "Success" ? "success" : "warning", children: r.status }) })] }, s)) })] })] }) })] }), RN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Integrations" }), h.jsx("main", { className: "p-8 max-w-5xl mx-auto", children: h.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [{ name: "Facebook Ads", icon: _v, status: "Connected", lastSync: "5m ago" }, { name: "Instagram", icon: Bv, status: "Connected", lastSync: "12m ago" }, { name: "WhatsApp Business", icon: Uv, status: "Error", lastSync: "2h ago" }, { name: "Google Ads", icon: cd, status: "Disconnected", lastSync: "Never" }].map((r, s) => h.jsxs(Ue, { className: "flex items-center justify-between", children: [h.jsxs("div", { className: "flex items-center gap-4", children: [h.jsx("div", { className: "w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center", children: h.jsx(r.icon, { className: "w-6 h-6" }) }), h.jsxs("div", { children: [h.jsx("h4", { className: "font-bold", children: r.name }), h.jsxs("p", { className: "text-xs text-text-secondary", children: ["Last sync: ", r.lastSync] })] })] }), h.jsxs("div", { className: "text-right", children: [h.jsx(Vt, { variant: r.status === "Connected" ? "success" : r.status === "Error" ? "error" : "neutral", children: r.status }), h.jsx("div", { className: "mt-2", children: h.jsx(me, { variant: "ghost", className: "text-[10px] py-1 px-2", children: "Manage" }) })] })] }, s)) }) })] }), MN = () => h.jsxs("div", { className: "flex-1 min-h-screen bg-background", children: [h.jsx(Cn, { title: "Settings" }), h.jsx("main", { className: "p-8 max-w-4xl mx-auto", children: h.jsxs("div", { className: "flex gap-8", children: [h.jsx("div", { className: "w-48 space-y-1", children: ["General", "Team", "Billing", "API Keys", "Notifications"].map((r) => h.jsx("button", { className: `w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${r === "General" ? "bg-mint/10 text-mint" : "text-text-secondary hover:bg-white/5"}`, children: r }, r)) }), h.jsxs("div", { className: "flex-1 space-y-8", children: [h.jsx(Ue, { title: "Workspace Settings", children: h.jsxs("div", { className: "space-y-6", children: [h.jsxs("div", { className: "space-y-2", children: [h.jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-text-secondary", children: "Workspace Name" }), h.jsx("input", { type: "text", defaultValue: "Social Flow Studio - Main", className: "w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-mint" })] }), h.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [h.jsxs("div", { className: "space-y-2", children: [h.jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-text-secondary", children: "Timezone" }), h.jsxs("select", { className: "w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-mint", children: [h.jsx("option", { children: "Asia/Kolkata (IST)" }), h.jsx("option", { children: "Asia/Dubai (GST)" })] })] }), h.jsxs("div", { className: "space-y-2", children: [h.jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-text-secondary", children: "Currency" }), h.jsxs("select", { className: "w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-mint", children: [h.jsx("option", { children: "INR (\u20B9)" }), h.jsx("option", { children: "AED (\u062F.\u0625)" }), h.jsx("option", { children: "USD ($)" })] })] })] }), h.jsx(me, { className: "w-fit", children: "Save Changes" })] }) }), h.jsxs(Ue, { title: "Security & API Keys", children: [h.jsx("div", { className: "p-4 rounded-xl bg-red-500/5 border border-red-500/10 mb-6", children: h.jsx("p", { className: "text-sm text-red-400", children: "Never share your API keys. They provide full access to your workspace operations." }) }), h.jsxs("div", { className: "space-y-4", children: [h.jsxs("div", { className: "flex items-center justify-between p-3 bg-background border border-border rounded-lg", children: [h.jsx("code", { className: "text-xs font-mono", children: "sf_live_************************" }), h.jsx(me, { variant: "ghost", className: "text-xs py-1", children: "Reveal" })] }), h.jsx(me, { variant: "secondary", className: "w-full", children: "Generate New Key" })] })] })] })] }) })] }), IN = ({ onNavigate: r }) => h.jsx("div", { className: "flex-1 min-h-screen bg-background flex items-center justify-center p-8", children: h.jsx(Xt.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "max-w-2xl w-full", children: h.jsxs(Ue, { className: "p-10 border-mint/30 shadow-[0_0_50px_rgba(0,255,163,0.1)]", children: [h.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [h.jsx("div", { className: "w-10 h-10 bg-mint rounded-xl flex items-center justify-center text-background", children: h.jsx(fd, { className: "w-6 h-6" }) }), h.jsx("h2", { className: "text-2xl font-display font-bold", children: "AI Action Plan" })] }), h.jsxs("div", { className: "space-y-6 mb-10", children: [h.jsx("p", { className: "text-text-secondary", children: "I've analyzed your request and prepared the following execution plan:" }), h.jsx("div", { className: "space-y-3", children: [{ label: "Filter leads", desc: 'Identify 124 leads from "RE Mumbai" with no activity in 48h.' }, { label: "Draft messages", desc: "Generate personalized WhatsApp follow-ups using Model v2." }, { label: "Schedule delivery", desc: "Distribute messages over the next 4 hours to avoid rate limits." }].map((s, o) => h.jsxs("div", { className: "flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10", children: [h.jsx("div", { className: "w-6 h-6 rounded-full bg-mint/10 text-mint flex items-center justify-center text-xs font-bold shrink-0", children: o + 1 }), h.jsxs("div", { children: [h.jsx("h4", { className: "font-bold text-sm", children: s.label }), h.jsx("p", { className: "text-xs text-text-secondary mt-1", children: s.desc })] })] }, o)) }), h.jsxs("div", { className: "p-4 rounded-xl bg-mint/5 border border-mint/20 flex items-center gap-3", children: [h.jsx(xo, { className: "w-5 h-5 text-mint" }), h.jsx("p", { className: "text-xs text-mint font-medium", children: 'This plan adheres to your "Auto-Safe" guardrails.' })] })] }), h.jsxs("div", { className: "flex gap-4", children: [h.jsx(me, { onClick: () => r("EXECUTION_RESULT"), className: "flex-1 py-4 text-lg", children: "Execute Plan" }), h.jsx(me, { variant: "secondary", onClick: () => r("AI_ASSISTANT"), className: "flex-1 py-4 text-lg", children: "Modify" })] })] }) }) }), zN = ({ onNavigate: r }) => h.jsx("div", { className: "flex-1 min-h-screen bg-background flex items-center justify-center p-8", children: h.jsxs(Xt.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "max-w-2xl w-full text-center", children: [h.jsx("div", { className: "w-24 h-24 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-mint/20", children: h.jsx(Xt.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", damping: 10 }, children: h.jsx(Fv, { className: "w-12 h-12 text-mint" }) }) }), h.jsx("h2", { className: "text-4xl font-display font-bold mb-4", children: "Execution Successful" }), h.jsx("p", { className: "text-text-secondary text-lg mb-12", children: "AI has completed the action plan. 124 leads have been queued for follow-up." }), h.jsx("div", { className: "grid grid-cols-3 gap-4 mb-12", children: [{ label: "Leads Processed", value: "124" }, { label: "Success Rate", value: "100%" }, { label: "Tokens Used", value: "1.2k" }].map((s, o) => h.jsxs("div", { className: "p-4 rounded-xl bg-surface border border-border", children: [h.jsx("p", { className: "text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1", children: s.label }), h.jsx("p", { className: "text-xl font-bold text-mint", children: s.value })] }, o)) }), h.jsxs("div", { className: "flex gap-4 justify-center", children: [h.jsx(me, { onClick: () => r("DASHBOARD"), className: "px-10 py-4", children: "Back to Dashboard" }), h.jsx(me, { variant: "secondary", onClick: () => r("AUDIT_LOGS"), className: "px-10 py-4", children: "View Logs" })] })] }) }), ON = ({ onNavigate: r }) => h.jsx("div", { className: "flex-1 min-h-screen bg-background flex items-center justify-center p-8", children: h.jsxs(Ue, { className: "max-w-md w-full p-10 text-center border-red-500/30", children: [h.jsx("div", { className: "w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6", children: h.jsx(hd, { className: "w-8 h-8 text-red-500" }) }), h.jsx("h2", { className: "text-2xl font-display font-bold mb-2", children: "Execution Failed" }), h.jsx("p", { className: "text-text-secondary mb-8", children: "The AI encountered a critical error while connecting to the WhatsApp Business API." }), h.jsxs("div", { className: "p-4 rounded-xl bg-background border border-border text-left mb-8", children: [h.jsx("p", { className: "text-xs font-mono text-red-400", children: "Error: API_TOKEN_EXPIRED (401)" }), h.jsx("p", { className: "text-xs text-text-secondary mt-2", children: "The integration token for WhatsApp has expired. Please reconnect to continue." })] }), h.jsxs("div", { className: "space-y-3", children: [h.jsx(me, { onClick: () => r("INTEGRATIONS_MGMT"), className: "w-full py-3", children: "Reconnect Integration" }), h.jsx(me, { variant: "ghost", onClick: () => r("AI_ASSISTANT"), className: "w-full py-3", children: "Back to Assistant" })] })] }) });
function FN() {
  const [r, s] = H.useState("HOME"), [o, l] = H.useState(() => ({ workspace: ko(tr.workspace) || "default", operatorId: ko(tr.operatorId), operatorName: ko(tr.operatorName), gatewayKey: ko(tr.gatewayKey), role: "" })), c = () => {
    So(tr.workspace, ""), So(tr.operatorId, ""), So(tr.operatorName, ""), So(tr.gatewayKey, ""), l({ workspace: "default", operatorId: "", operatorName: "", gatewayKey: "", role: "" }), s("SIGN_IN");
  };
  H.useEffect(() => {
    let p = false;
    return (async () => {
      var m, v;
      const g = String(o.workspace || "default").trim() || "default", b = String(o.operatorId || "").trim();
      if (b) try {
        const x = await an(`/api/team/status?workspace=${encodeURIComponent(g)}`, { method: "GET" }, o.gatewayKey);
        if (!x.ok || p) return;
        const k = { workspace: String(x.workspace || g), operatorId: String(((m = x.operator) == null ? void 0 : m.id) || b), operatorName: String(((v = x.operator) == null ? void 0 : v.name) || o.operatorName || b), gatewayKey: o.gatewayKey, role: String(x.role || "") };
        if (p) return;
        l(k), s("AI_ASSISTANT");
      } catch {
      }
    })(), () => {
      p = true;
    };
  }, []);
  const d = () => {
    switch (r) {
      case "HOME":
        return h.jsx(xN, { onNavigate: s });
      case "SIGN_IN":
        return h.jsx(wN, { onNavigate: s, initialSession: o, onLoginSuccess: l });
      case "AI_ASSISTANT":
        return h.jsx(EN, { session: o });
      case "DASHBOARD":
        return h.jsx(Gv, { onNavigate: s, session: o });
      case "LEADS_MGMT":
        return h.jsx(PN, {});
      case "CAMPAIGNS":
        return h.jsx(TN, {});
      case "WORKFLOWS":
        return h.jsx(jN, {});
      case "APPROVALS":
        return h.jsx(LN, {});
      case "ALERTS":
        return h.jsx(Gv, { onNavigate: s, session: o });
      case "AUDIT_LOGS":
        return h.jsx(AN, {});
      case "INTEGRATIONS_MGMT":
        return h.jsx(RN, {});
      case "SETTINGS":
        return h.jsx(MN, {});
      case "PLAN_PREVIEW":
        return h.jsx(IN, { onNavigate: s });
      case "EXECUTION_RESULT":
        return h.jsx(zN, { onNavigate: s });
      case "EXECUTION_FAILED":
        return h.jsx(ON, { onNavigate: s });
      case "SETUP":
        return h.jsx(kN, { onNavigate: s });
      case "CHOOSE_VERTICAL":
        return h.jsx(SN, { onNavigate: s });
      case "CONNECT_INTEGRATIONS":
        return h.jsx(NN, { onNavigate: s });
      case "POLICY_GUARDRAILS":
        return h.jsx(CN, { onNavigate: s });
      default:
        return h.jsx(EN, { session: o });
    }
  }, p = !["HOME", "SIGN_IN"].includes(r);
  return h.jsxs("div", { className: "flex min-h-screen bg-background text-text-primary font-sans", children: [p && h.jsx(vN, { currentScreen: r, onNavigate: s, onSignOut: c }), h.jsx(fS, { mode: "wait", children: h.jsx(Xt.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "flex-1 flex flex-col overflow-hidden", children: d() }, r) })] });
}Cx.createRoot(document.getElementById("root")).render(h.jsx(H.StrictMode, { children: h.jsx(FN, {}) }));
