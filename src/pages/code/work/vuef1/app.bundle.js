webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Driver.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Teams.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\nth[data-v-6ca72fc1] {\n    cursor:pointer;\n}\nth.active[data-v-6ca72fc1] {\n    color:#428bca;\n}\n.caret.reversed[data-v-6ca72fc1] {\n    transform: rotate(180deg);\n}\n", "", {"version":3,"sources":["/Users/cthomason/Testing/f1-vuejs-webpack/src/components/src/components/Drivers.vue?f0e40432"],"names":[],"mappings":";AA2GA;IACA,eAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,0BAAA;CACA","file":"Drivers.vue","sourcesContent":["<template>\n    <div class=\"drivers\">\n        <h1>Drivers &mdash; {{year}} Season</h1>\n        <div v-if=\"loading\">Loading...</div>\n        <div v-else-if=\"error\">An error has occurred. No driver data is available.</div>\n        <table class=\"table table-striped\" v-else>\n            <thead>\n                <tr>\n                    <th v-on:click=\"sortDrivers('familyName')\" :class=\"{'active': sort === 'familyName'}\">Name <span class=\"caret\" :class=\"{ 'reversed': reversed }\" v-if=\"sort === 'familyName'\"></span></th>\n                    <th v-on:click=\"sortDrivers('Constructors')\" :class=\"{'active': sort === 'Constructors'}\">Teams <span class=\"caret\" :class=\"{ 'reversed': reversed }\" v-if=\"sort === 'Constructors'\"></span></th>\n                    <th v-on:click=\"sortDrivers('nationality')\" :class=\"{'active': sort === 'nationality'}\">Nationality <span class=\"caret\" :class=\"{ 'reversed': reversed }\" v-if=\"sort === 'nationality'\"></span></th>\n                    <th v-on:click=\"sortDrivers('points')\" :class=\"{'active': sort === 'points'}\">Points <span class=\"caret\" :class=\"{ 'reversed': reversed }\" v-if=\"sort === 'points'\"></span></th>\n                    <th v-on:click=\"sortDrivers('wins')\" :class=\"{'active': sort === 'wins'}\">Wins <span class=\"caret\" :class=\"{ 'reversed': reversed }\" v-if=\"sort === 'wins'\"></span></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr v-for=\"driver in drivers\">\n                    <td><router-link :to=\"'/drivers/' + driver.Driver.driverId\"><a>{{driver.Driver.givenName + ' ' + driver.Driver.familyName}}</a></router-link></td>\n                    <td>\n                        <span v-for=\"(team, index) in driver.Constructors\">\n                            <router-link :to=\"'/teams/' + year + '/' + team.constructorId\"><a>{{team.name}}</a></router-link><span v-if=\"index+1 < driver.Constructors.length\">, </span>\n                        </span>\n                    </td>\n                    <td>{{driver.Driver.nationality}}</td>\n                    <td>{{driver.points}}</td>\n                    <td>{{driver.wins}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</template>\n\n<script>\n    export default {\n        name: 'drivers',\n        props: ['year'],\n        data: () => ({\n            drivers: [],\n            loading: true,\n            sort: 'points',\n            reversed: false,\n            error: false\n        }),\n        methods: {\n            getData() {\n                this.loading = true;\n                this.error = false;\n                this.$http.get('http://ergast.com/api/f1/' + this.year + '/driverStandings.json').then(response => {\n                    this.loading = false;\n                    if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {\n                        this.drivers = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings;\n                        this.sort = 'points';\n                        this.reversed = false;\n                    } else {\n                        this.error = true;\n                    }\n                }, response => {\n                    this.loading = false;\n                    this.error = true;\n                    console.log('error', response);\n                });\n            },\n            sortDrivers(property) {\n                let first, second;\n                if (this.sort === property) {\n                    this.drivers.reverse();\n                    this.reversed = !this.reversed;\n                } else {\n                    this.sort = property;\n                    this.reversed = false;\n                    this.drivers.sort((a, b) => {\n                        if (property === 'points' || property === 'wins') {\n                            first = parseInt(a[property], 10);\n                            second = parseInt(b[property], 10);\n                        } else if (property === 'Constructors') {\n                            first = a.Constructors[0].name;\n                            second = b.Constructors[0].name;\n                        } else {\n                            first = a.Driver[property].toLowerCase();\n                            second = b.Driver[property].toLowerCase();\n                        }\n                        if (first < second)\n                            return -1;\n                        if (first > second)\n                            return 1;\n                        return 0;\n                    });\n                    if (property === 'points' || property === 'wins') {\n                        this.drivers.reverse();\n                    }\n                }\n            }\n        },\n        mounted() {\n            if (this.year !== '') {\n                this.getData();\n            }\n        },\n        watch: {\n            year: function(value) {\n                this.getData();\n            }\n        }\n    };\n</script>\n\n<style scoped>\n    th {\n        cursor:pointer;\n    }\n    th.active {\n        color:#428bca;\n    }\n    .caret.reversed {\n        transform: rotate(180deg);\n    }\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"App.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\n.table>tbody>tr>td.tall-col {\n    vertical-align: middle;\n}\n", "", {"version":3,"sources":["/Users/cthomason/Testing/f1-vuejs-webpack/src/components/src/components/Team.vue?1e226a60"],"names":[],"mappings":";AA8GA;IACA,uBAAA;CACA","file":"Team.vue","sourcesContent":["<template>\n    <div>\n        <div v-if=\"loading\">Loading...</div>\n        <div v-else-if=\"error\">An error has occurred. No team data is available.</div>\n        <div class=\"team\" v-else>\n            <h1>{{ team.Constructor.name }} &mdash; {{ year }} Season</h1>\n            <p><strong>Nationality:</strong> {{team.Constructor.nationality}}</p>\n            <p><a :href=\"team.Constructor.url\" target=\"_blank\" class=\"btn btn-default\">Wikipedia Bio</a></p>\n\n            <ul>\n                <li>{{year}} Wins: {{team.wins}}</li>\n                <li>Points: {{team.points}}</li>\n                <li>WCC Position: {{team.position}}</li>\n            </ul>\n        </div>\n\n        <div>\n            <h2>Results</h2>\n            <div v-if=\"loadingRaces\">Loading race data...</div>\n            <div v-else-if=\"errorRaces\">An error has occurred. No race data is available.</div>\n            <div v-else>\n                <table class=\"table\">\n                    <thead>\n                        <tr>\n                            <th>Race</th>\n                            <th>Location</th>\n                            <th>Date</th>\n                            <th>Driver</th>\n                            <th>Qualified</th>\n                            <th>Finished</th>\n                        </tr>\n                    </thead>\n                    <tbody v-for=\"race in races\">\n                        <tr>\n                            <td rowspan=\"2\" class=\"tall-col\"><router-link :to=\"'/races/' + race.round\"><a>{{race.raceName}}</a></router-link></td>\n                            <td rowspan=\"2\" class=\"tall-col\">{{race.Circuit.Location.locality + ', ' + race.Circuit.Location.country}}</td>\n                            <td rowspan=\"2\" class=\"tall-col\">{{race.date}}</td>\n                            <td class=\"active\"><router-link :to=\"'/drivers/' + race.Results[0].Driver.driverId\"><a>{{race.Results[0].Driver.givenName + ' ' + race.Results[0].Driver.familyName}}</a></router-link></td>\n                            <td class=\"active\">{{race.Results[0].grid}}</td>\n                            <td class=\"active\" :class=\"{ 'success': race.Results[0].position === '1' }\">{{race.Results[0].position}}</td>\n                        </tr>\n                        <tr class=\"active\">\n                            <td><router-link :to=\"'/drivers/' + race.Results[1].Driver.driverId\"><a>{{race.Results[1].Driver.givenName + ' ' + race.Results[1].Driver.familyName}}</a></router-link></td>\n                            <td>{{race.Results[1].grid}}</td>\n                            <td :class=\"{ 'success': race.Results[1].position === '1' }\">{{race.Results[1].position}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</template>\n<script>\n    export default {\n        name: 'team',\n        props: ['id', 'year'],\n        data: () => ({\n            loading: true,\n            loadingRaces: true,\n            team: {},\n            races: [],\n            error: false,\n            errorRaces: false\n        }),\n        methods: {\n            getData() {\n                this.loading = true;\n                this.loadingRaces = true;\n                this.error = false;\n                this.errorRaces = false;\n                this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/constructorStandings.json').then(response => {\n                    this.loading = false;\n                    if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {\n                        this.team = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];\n                    } else {\n                        this.error = true;\n                    }\n                }, response => {\n                    this.loading = false;\n                    this.error = true;\n                    console.log('team details error', response);\n                });\n                this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/results.json').then(response => {\n                    this.loadingRaces = false;\n                    if (response.body.MRData.RaceTable.Races.length > 0) {\n                        this.races = response.body.MRData.RaceTable.Races;\n                    } else {\n                        this.errorRaces = true;\n                    }\n                }, response => {\n                    this.loadingRaces = false;\n                    this.errorRaces = true;\n                    console.log('team drivers error', response);\n                });\n            }\n        },\n        mounted() {\n            if (this.year !== '') {\n                this.getData();\n            }\n        },\n        watch: {\n            year: function(value) {\n                this.getData();\n            }\n        }\n    };\n</script>\n\n<style>\n    .table>tbody>tr>td.tall-col {\n        vertical-align: middle;\n    }\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(48);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Teams = __webpack_require__(38);

var _Teams2 = _interopRequireDefault(_Teams);

var _Team = __webpack_require__(37);

var _Team2 = _interopRequireDefault(_Team);

var _Drivers = __webpack_require__(34);

var _Drivers2 = _interopRequireDefault(_Drivers);

var _Driver = __webpack_require__(33);

var _Driver2 = _interopRequireDefault(_Driver);

var _Races = __webpack_require__(36);

var _Races2 = _interopRequireDefault(_Races);

var _Race = __webpack_require__(35);

var _Race2 = _interopRequireDefault(_Race);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
    routes: [{
        path: '/teams',
        name: 'Teams',
        component: _Teams2.default
    }, {
        path: '/teams/:id',
        name: 'Team',
        component: _Team2.default,
        props: true
    }, {
        path: '/drivers',
        name: 'Drivers',
        component: _Drivers2.default
    }, {
        path: '/drivers/:id',
        name: 'Driver',
        component: _Driver2.default,
        props: true
    }, {
        path: '/races',
        name: 'Races',
        component: _Races2.default
    }, {
        path: '/races/:id',
        name: 'Race',
        component: _Race2.default,
        props: true
    }, { path: '*',
        redirect: '/teams'
    }]
});

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a4eef3fc_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(46);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(52)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a4eef3fc_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a4eef3fc", Component.options)
  } else {
    hotAPI.reload("data-v-a4eef3fc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _Years = __webpack_require__(39);

var _Years2 = _interopRequireDefault(_Years);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

_vue2.default.component(_Years2.default.name, _Years2.default);
exports.default = {
    name: 'app',
    data: function data() {
        return {
            year: ''
        };
    },
    methods: {
        updateYear: function updateYear(year) {
            this.year = year;
        }
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'driver',
    props: ['id', 'year'],
    data: function data() {
        return {
            loading: true,
            loadingRaces: true,
            driver: {},
            races: [],
            error: false,
            errorRaces: false
        };
    },
    methods: {
        getData: function getData() {
            var _this = this;

            this.loading = true;
            this.loadingRaces = true;
            this.error = false;
            this.errorRaces = false;
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/driverStandings.json').then(function (response) {
                _this.loading = false;
                if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                    _this.driver = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
                } else {
                    _this.error = true;
                }
            }, function (response) {
                _this.loading = false;
                _this.error = true;
                console.log('driver api error', response);
            });
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/results.json').then(function (response) {
                _this.loadingRaces = false;
                if (response.body.MRData.RaceTable.Races.length > 0) {
                    _this.races = response.body.MRData.RaceTable.Races;
                } else {
                    _this.errorRaces = true;
                }
            }, function (response) {
                _this.loadingRaces = false;
                _this.errorRaces = true;
                console.log('races api error', response);
            });
        }
    },
    mounted: function mounted() {
        if (this.year !== '') {
            this.getData();
        }
    },

    watch: {
        year: function year(value) {
            this.getData();
        }
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'drivers',
    props: ['year'],
    data: function data() {
        return {
            drivers: [],
            loading: true,
            sort: 'points',
            reversed: false,
            error: false
        };
    },
    methods: {
        getData: function getData() {
            var _this = this;

            this.loading = true;
            this.error = false;
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/driverStandings.json').then(function (response) {
                _this.loading = false;
                if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                    _this.drivers = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    _this.sort = 'points';
                    _this.reversed = false;
                } else {
                    _this.error = true;
                }
            }, function (response) {
                _this.loading = false;
                _this.error = true;
                console.log('error', response);
            });
        },
        sortDrivers: function sortDrivers(property) {
            var first = void 0,
                second = void 0;
            if (this.sort === property) {
                this.drivers.reverse();
                this.reversed = !this.reversed;
            } else {
                this.sort = property;
                this.reversed = false;
                this.drivers.sort(function (a, b) {
                    if (property === 'points' || property === 'wins') {
                        first = parseInt(a[property], 10);
                        second = parseInt(b[property], 10);
                    } else if (property === 'Constructors') {
                        first = a.Constructors[0].name;
                        second = b.Constructors[0].name;
                    } else {
                        first = a.Driver[property].toLowerCase();
                        second = b.Driver[property].toLowerCase();
                    }
                    if (first < second) return -1;
                    if (first > second) return 1;
                    return 0;
                });
                if (property === 'points' || property === 'wins') {
                    this.drivers.reverse();
                }
            }
        }
    },
    mounted: function mounted() {
        if (this.year !== '') {
            this.getData();
        }
    },

    watch: {
        year: function year(value) {
            this.getData();
        }
    }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'vue',
    props: ['id', 'year'],
    data: function data() {
        return {
            loading: true,
            race: {},
            error: false
        };
    },
    methods: {
        getRaceInfo: function getRaceInfo() {
            var _this = this;

            this.loading = true;
            this.error = false;
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/' + this.id + '/results.json').then(function (response) {
                _this.loading = false;
                if (response.body.MRData.RaceTable.Races.length > 0) {
                    _this.race = response.body.MRData.RaceTable.Races[0];
                } else {
                    _this.error = true;
                }
            }, function (response) {
                _this.loading = false;
                _this.error = true;
                console.log('error', response);
            });
        }
    },
    mounted: function mounted() {
        if (this.year !== '') {
            this.getRaceInfo();
        }
    },

    watch: {
        year: function year(value) {
            this.getRaceInfo();
        }
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'races',
    props: ['year'],
    data: function data() {
        return {
            loading: true,
            races: [],
            error: false
        };
    },
    methods: {
        getRaces: function getRaces() {
            var _this = this;

            this.loading = true;
            this.error = false;
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/results/1.json').then(function (response) {
                _this.loading = false;
                if (response.body.MRData.RaceTable.Races.length > 0) {
                    _this.races = response.body.MRData.RaceTable.Races;
                } else {
                    _this.error = true;
                }
            }, function (response) {
                _this.loading = false;
                _this.error = true;
                console.log('error', response);
            });
        }
    },
    mounted: function mounted() {
        if (this.year !== '') {
            this.getRaces();
        }
    },

    watch: {
        year: function year(value) {
            this.getRaces();
        }
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'team',
    props: ['id', 'year'],
    data: function data() {
        return {
            loading: true,
            loadingRaces: true,
            team: {},
            races: [],
            error: false,
            errorRaces: false
        };
    },
    methods: {
        getData: function getData() {
            var _this = this;

            this.loading = true;
            this.loadingRaces = true;
            this.error = false;
            this.errorRaces = false;
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/constructorStandings.json').then(function (response) {
                _this.loading = false;
                if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                    _this.team = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
                } else {
                    _this.error = true;
                }
            }, function (response) {
                _this.loading = false;
                _this.error = true;
                console.log('team details error', response);
            });
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/results.json').then(function (response) {
                _this.loadingRaces = false;
                if (response.body.MRData.RaceTable.Races.length > 0) {
                    _this.races = response.body.MRData.RaceTable.Races;
                } else {
                    _this.errorRaces = true;
                }
            }, function (response) {
                _this.loadingRaces = false;
                _this.errorRaces = true;
                console.log('team drivers error', response);
            });
        }
    },
    mounted: function mounted() {
        if (this.year !== '') {
            this.getData();
        }
    },

    watch: {
        year: function year(value) {
            this.getData();
        }
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'teams',
    props: ['year'],
    data: function data() {
        return {
            teams: [],
            loading: true,
            error: false
        };
    },
    methods: {
        getData: function getData() {
            var _this = this;

            this.loading = true;
            this.error = false;
            this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructorStandings.json').then(function (response) {
                _this.loading = false;
                if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                    _this.teams = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                } else {
                    _this.error = true;
                }
            }, function (response) {
                _this.loading = false;
                _this.error = true;
                console.log('error', response);
            });
        }
    },
    mounted: function mounted() {
        if (this.year !== '') {
            this.getData();
        }
    },

    watch: {
        year: function year(value) {
            this.getData();
        }
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//

exports.default = {
    name: 'years',
    data: function data() {
        return {
            year: 0
        };
    },

    computed: {
        lastYear: function lastYear() {
            return new Date().getFullYear() - 1;
        },
        years: function years() {
            var currYear = this.lastYear;
            var yearsArray = [];
            for (var i = 0; i < 10; i++) {
                yearsArray.push(currYear);
                currYear--;
            }
            return yearsArray;
        }
    },
    methods: {
        updateYear: function updateYear(year) {
            this.$emit('update', year);
        }
    },
    mounted: function mounted() {
        this.year = this.lastYear;
        this.updateYear(this.year);
    }
};

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Driver_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Driver_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Driver_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c2925a2_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Driver_vue__ = __webpack_require__(41);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(49)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Driver_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c2925a2_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Driver_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Driver.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Driver.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c2925a2", Component.options)
  } else {
    hotAPI.reload("data-v-1c2925a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Drivers_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Drivers_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Drivers_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ca72fc1_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_Drivers_vue__ = __webpack_require__(45);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(51)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ca72fc1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Drivers_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ca72fc1_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_Drivers_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Drivers.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Drivers.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ca72fc1", Component.options)
  } else {
    hotAPI.reload("data-v-6ca72fc1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Race_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Race_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Race_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21eea76a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Race_vue__ = __webpack_require__(42);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Race_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21eea76a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Race_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Race.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Race.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-21eea76a", Component.options)
  } else {
    hotAPI.reload("data-v-21eea76a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Races_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Races_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Races_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_148f0390_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Races_vue__ = __webpack_require__(40);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Races_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_148f0390_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Races_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Races.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Races.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-148f0390", Component.options)
  } else {
    hotAPI.reload("data-v-148f0390", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Team_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Team_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Team_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e12a0452_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Team_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Team_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e12a0452_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Team_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Team.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Team.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e12a0452", Component.options)
  } else {
    hotAPI.reload("data-v-e12a0452", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Teams_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Teams_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Teams_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61a05e2c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Teams_vue__ = __webpack_require__(44);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(50)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Teams_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61a05e2c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Teams_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Teams.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Teams.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61a05e2c", Component.options)
  } else {
    hotAPI.reload("data-v-61a05e2c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Years_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Years_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Years_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f7ec44c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Years_vue__ = __webpack_require__(43);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Years_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f7ec44c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Years_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Years.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Years.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f7ec44c", Component.options)
  } else {
    hotAPI.reload("data-v-4f7ec44c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = Component.exports;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "races"
  }, [_c('h1', [_vm._v("Races — " + _vm._s(_vm.year) + " Season")]), _vm._v(" "), (_vm.loading) ? _c('div', [_vm._v("Loading...")]) : (_vm.error) ? _c('div', [_vm._v("An error has occurred. No race data is available.")]) : _c('table', {
    staticClass: "table table-striped"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.races), function(race) {
    return _c('tr', [_c('td', [_c('router-link', {
      attrs: {
        "to": '/races/' + race.round
      }
    }, [_c('a', [_vm._v(_vm._s(race.raceName))])])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(race.date))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(race.Circuit.circuitName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(race.Circuit.Location.locality) + ", " + _vm._s(race.Circuit.Location.country))]), _vm._v(" "), _c('td', [_c('router-link', {
      attrs: {
        "to": '/drivers/' + race.Results[0].Driver.driverId
      }
    }, [_c('a', [_vm._v(_vm._s(race.Results[0].Driver.givenName) + " " + _vm._s(race.Results[0].Driver.familyName))])])], 1), _vm._v(" "), _c('td', [_c('router-link', {
      attrs: {
        "to": '/teams/' + race.Results[0].Constructor.constructorId
      }
    }, [_c('a', [_vm._v(_vm._s(race.Results[0].Constructor.name))])])], 1)])
  }))])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Date")]), _vm._v(" "), _c('th', [_vm._v("Circuit")]), _vm._v(" "), _c('th', [_vm._v("Location")]), _vm._v(" "), _c('th', [_vm._v("Winning Driver")]), _vm._v(" "), _c('th', [_vm._v("Winning Team")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-148f0390", esExports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.loading) ? _c('div', [_vm._v("Loading...")]) : (_vm.error) ? _c('div', [_vm._v("An error has occurred. No driver data is available.")]) : _c('div', {
    staticClass: "driver"
  }, [_c('h1', {
    staticClass: "driver-name"
  }, [_vm._v(_vm._s(_vm.driver.Driver.givenName) + " " + _vm._s(_vm.driver.Driver.familyName) + " — " + _vm._s(_vm.year) + " Season")]), _vm._v(" "), _c('p', [_c('strong', [_vm._v("Nationality:")]), _vm._v(" " + _vm._s(_vm.driver.Driver.nationality) + " "), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Teams:")]), _vm._v(" "), _vm._l((_vm.driver.Constructors), function(team, index) {
    return _c('span', [_c('router-link', {
      attrs: {
        "to": '/teams/' + team.constructorId
      }
    }, [_c('a', [_vm._v(_vm._s(team.name))])]), (index + 1 < _vm.driver.Constructors.length) ? _c('span', [_vm._v(", ")]) : _vm._e()], 1)
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Birthday:")]), _vm._v(" " + _vm._s(_vm.driver.Driver.dateOfBirth) + " "), _c('br')], 2), _vm._v(" "), _c('p', [_c('a', {
    staticClass: "btn btn-default",
    attrs: {
      "href": _vm.driver.Driver.url,
      "target": "_blank"
    }
  }, [_vm._v("Wikipedia Bio")])]), _vm._v(" "), _c('ul', [_c('li', [_c('strong', [_vm._v(_vm._s(_vm.year) + " Wins:")]), _vm._v(" " + _vm._s(_vm.driver.wins))]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("Points:")]), _vm._v(" " + _vm._s(_vm.driver.points))]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("WDC Position:")]), _vm._v(" " + _vm._s(_vm.driver.position))])])]), _vm._v(" "), _c('div', [_c('h2', [_vm._v("Results")]), _vm._v(" "), (_vm.loadingRaces) ? _c('div', [_vm._v("Loading race data...")]) : (_vm.errorRaces) ? _c('div', [_vm._v("An error has occurred. No race data is available.")]) : _c('div', [_c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.races), function(race) {
    return _c('tr', {
      class: {
        'success': race.Results[0].position === '1'
      }
    }, [_c('td', [_vm._v(_vm._s(race.round))]), _vm._v(" "), _c('td', [_c('router-link', {
      attrs: {
        "to": '/races/' + race.round
      }
    }, [_c('a', [_vm._v(_vm._s(race.raceName))])])], 1), _vm._v(" "), _c('td', [_c('router-link', {
      attrs: {
        "to": '/teams/' + race.Results[0].Constructor.constructorId
      }
    }, [_c('a', [_vm._v(_vm._s(race.Results[0].Constructor.name))])])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(race.Results[0].grid))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(race.Results[0].position))])])
  }))])])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Round")]), _vm._v(" "), _c('th', [_vm._v("Grand Prix")]), _vm._v(" "), _c('th', [_vm._v("Team")]), _vm._v(" "), _c('th', [_vm._v("Qualified")]), _vm._v(" "), _c('th', [_vm._v("Finished")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-1c2925a2", esExports)
  }
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.loading) ? _c('div', [_vm._v("Loading...")]) : (_vm.error) ? _c('div', [_vm._v("An error has occurred. No race data is available.")]) : _c('div', {
    staticClass: "race"
  }, [_c('h1', {
    staticClass: "race-name"
  }, [_vm._v(_vm._s(_vm.race.raceName) + " — " + _vm._s(_vm.year) + " Season")]), _vm._v(" "), _c('p', [_c('strong', [_vm._v("Date:")]), _vm._v(" " + _vm._s(_vm.race.date) + " "), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Circuit:")]), _vm._v(" " + _vm._s(_vm.race.Circuit.circuitName) + " "), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Location:")]), _vm._v(" " + _vm._s(_vm.race.Circuit.Location.locality) + ", " + _vm._s(_vm.race.Circuit.Location.country) + "\n    ")]), _vm._v(" "), _c('p', [_c('a', {
    staticClass: "btn btn-default",
    attrs: {
      "href": _vm.race.url,
      "target": "_blank"
    }
  }, [_vm._v("Race Wikipedia Bio")]), _vm._v(" "), _c('a', {
    staticClass: "btn btn-default",
    attrs: {
      "href": _vm.race.Circuit.url,
      "target": "_blank"
    }
  }, [_vm._v("Circuit Wikipedia Bio")]), _vm._v(" "), _c('a', {
    staticClass: "btn btn-default",
    attrs: {
      "href": ("https://www.google.com/maps/search/?api=1&query=" + (_vm.race.Circuit.Location.lat) + "," + (_vm.race.Circuit.Location.long)),
      "target": "_blank"
    }
  }, [_vm._v("View on Google Maps")])]), _vm._v(" "), _c('h2', [_vm._v("Results")]), _vm._v(" "), _c('table', {
    staticClass: "table table-striped"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.race.Results), function(driver) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(driver.position))]), _vm._v(" "), _c('td', [_c('router-link', {
      attrs: {
        "to": '/drivers/' + driver.Driver.driverId
      }
    }, [_c('a', [_vm._v(_vm._s(driver.Driver.givenName) + " " + _vm._s(driver.Driver.familyName))])])], 1), _vm._v(" "), _c('td', [_c('router-link', {
      attrs: {
        "to": '/teams/' + driver.Constructor.constructorId
      }
    }, [_c('a', [_vm._v(_vm._s(driver.Constructor.name))])])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(driver.grid))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(driver.laps) + " laps – " + _vm._s(driver.status))])])
  }))])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Position")]), _vm._v(" "), _c('th', [_vm._v("Driver")]), _vm._v(" "), _c('th', [_vm._v("Team")]), _vm._v(" "), _c('th', [_vm._v("Qualified")]), _vm._v(" "), _c('th', [_vm._v("Status")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-21eea76a", esExports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "years form-inline"
  }, [_c('label', {
    attrs: {
      "for": "year-select"
    }
  }, [_vm._v("Year:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.year),
      expression: "year"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "year-select"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.year = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, function($event) {
        _vm.updateYear($event.target.value)
      }]
    }
  }, _vm._l((_vm.years), function(yearValue) {
    return _c('option', {
      domProps: {
        "value": yearValue
      }
    }, [_vm._v(_vm._s(yearValue))])
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-4f7ec44c", esExports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "teams"
  }, [_c('h1', [_vm._v("Teams — " + _vm._s(_vm.year) + " Season")]), _vm._v(" "), (_vm.loading) ? _c('div', [_vm._v("Loading...")]) : (_vm.error) ? _c('div', [_vm._v("An error has occurred. No team data is available.")]) : _c('table', {
    staticClass: "table table-striped"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.teams), function(team) {
    return _c('tr', [_c('td', [_c('router-link', {
      attrs: {
        "to": '/teams/' + team.Constructor.constructorId
      }
    }, [_c('a', [_vm._v(_vm._s(team.Constructor.name))])])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(team.Constructor.nationality))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(team.points))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(team.wins))])])
  }))])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Nationality")]), _vm._v(" "), _c('th', [_vm._v("Points")]), _vm._v(" "), _c('th', [_vm._v("Wins")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-61a05e2c", esExports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "drivers"
  }, [_c('h1', [_vm._v("Drivers — " + _vm._s(_vm.year) + " Season")]), _vm._v(" "), (_vm.loading) ? _c('div', [_vm._v("Loading...")]) : (_vm.error) ? _c('div', [_vm._v("An error has occurred. No driver data is available.")]) : _c('table', {
    staticClass: "table table-striped"
  }, [_c('thead', [_c('tr', [_c('th', {
    class: {
      'active': _vm.sort === 'familyName'
    },
    on: {
      "click": function($event) {
        _vm.sortDrivers('familyName')
      }
    }
  }, [_vm._v("Name "), (_vm.sort === 'familyName') ? _c('span', {
    staticClass: "caret",
    class: {
      'reversed': _vm.reversed
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    class: {
      'active': _vm.sort === 'Constructors'
    },
    on: {
      "click": function($event) {
        _vm.sortDrivers('Constructors')
      }
    }
  }, [_vm._v("Teams "), (_vm.sort === 'Constructors') ? _c('span', {
    staticClass: "caret",
    class: {
      'reversed': _vm.reversed
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    class: {
      'active': _vm.sort === 'nationality'
    },
    on: {
      "click": function($event) {
        _vm.sortDrivers('nationality')
      }
    }
  }, [_vm._v("Nationality "), (_vm.sort === 'nationality') ? _c('span', {
    staticClass: "caret",
    class: {
      'reversed': _vm.reversed
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    class: {
      'active': _vm.sort === 'points'
    },
    on: {
      "click": function($event) {
        _vm.sortDrivers('points')
      }
    }
  }, [_vm._v("Points "), (_vm.sort === 'points') ? _c('span', {
    staticClass: "caret",
    class: {
      'reversed': _vm.reversed
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    class: {
      'active': _vm.sort === 'wins'
    },
    on: {
      "click": function($event) {
        _vm.sortDrivers('wins')
      }
    }
  }, [_vm._v("Wins "), (_vm.sort === 'wins') ? _c('span', {
    staticClass: "caret",
    class: {
      'reversed': _vm.reversed
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('tbody', _vm._l((_vm.drivers), function(driver) {
    return _c('tr', [_c('td', [_c('router-link', {
      attrs: {
        "to": '/drivers/' + driver.Driver.driverId
      }
    }, [_c('a', [_vm._v(_vm._s(driver.Driver.givenName + ' ' + driver.Driver.familyName))])])], 1), _vm._v(" "), _c('td', _vm._l((driver.Constructors), function(team, index) {
      return _c('span', [_c('router-link', {
        attrs: {
          "to": '/teams/' + _vm.year + '/' + team.constructorId
        }
      }, [_c('a', [_vm._v(_vm._s(team.name))])]), (index + 1 < driver.Constructors.length) ? _c('span', [_vm._v(", ")]) : _vm._e()], 1)
    })), _vm._v(" "), _c('td', [_vm._v(_vm._s(driver.Driver.nationality))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(driver.points))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(driver.wins))])])
  }))])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-6ca72fc1", esExports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('nav', {
    staticClass: "navbar navbar-default"
  }, [_c('div', {
    staticClass: "container"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "collapse navbar-collapse",
    attrs: {
      "id": "navbar"
    }
  }, [_c('ul', {
    staticClass: "nav navbar-nav"
  }, [_c('router-link', {
    attrs: {
      "tag": "li",
      "to": "/teams",
      "exact-active-class": "active",
      "active-class": "active"
    }
  }, [_c('a', [_vm._v("Teams")])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "tag": "li",
      "to": "/drivers",
      "exact-active-class": "active",
      "active-class": "active"
    }
  }, [_c('a', [_vm._v("Drivers")])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "tag": "li",
      "to": "/races",
      "exact-active-class": "active",
      "active-class": "active"
    }
  }, [_c('a', [_vm._v("Races")])]), _vm._v(" "), _c('li', {
    staticClass: "navbar-form"
  }, [_c('years', {
    on: {
      "update": _vm.updateYear
    }
  })], 1)], 1)])])]), _vm._v(" "), _c('main', {
    staticClass: "container",
    attrs: {
      "id": "main"
    }
  }, [_c('router-view', {
    attrs: {
      "year": _vm.year
    }
  })], 1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "navbar-header"
  }, [_c('button', {
    staticClass: "navbar-toggle collapsed",
    attrs: {
      "type": "button",
      "data-toggle": "collapse",
      "data-target": "#navbar",
      "aria-expanded": "false"
    }
  }, [_c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Toggle navigation")]), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  })]), _vm._v(" "), _c('a', {
    staticClass: "navbar-brand",
    attrs: {
      "href": "#"
    }
  }, [_vm._v("F1 Data App")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-a4eef3fc", esExports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.loading) ? _c('div', [_vm._v("Loading...")]) : (_vm.error) ? _c('div', [_vm._v("An error has occurred. No team data is available.")]) : _c('div', {
    staticClass: "team"
  }, [_c('h1', [_vm._v(_vm._s(_vm.team.Constructor.name) + " — " + _vm._s(_vm.year) + " Season")]), _vm._v(" "), _c('p', [_c('strong', [_vm._v("Nationality:")]), _vm._v(" " + _vm._s(_vm.team.Constructor.nationality))]), _vm._v(" "), _c('p', [_c('a', {
    staticClass: "btn btn-default",
    attrs: {
      "href": _vm.team.Constructor.url,
      "target": "_blank"
    }
  }, [_vm._v("Wikipedia Bio")])]), _vm._v(" "), _c('ul', [_c('li', [_vm._v(_vm._s(_vm.year) + " Wins: " + _vm._s(_vm.team.wins))]), _vm._v(" "), _c('li', [_vm._v("Points: " + _vm._s(_vm.team.points))]), _vm._v(" "), _c('li', [_vm._v("WCC Position: " + _vm._s(_vm.team.position))])])]), _vm._v(" "), _c('div', [_c('h2', [_vm._v("Results")]), _vm._v(" "), (_vm.loadingRaces) ? _c('div', [_vm._v("Loading race data...")]) : (_vm.errorRaces) ? _c('div', [_vm._v("An error has occurred. No race data is available.")]) : _c('div', [_c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.races), function(race) {
    return _c('tbody', [_c('tr', [_c('td', {
      staticClass: "tall-col",
      attrs: {
        "rowspan": "2"
      }
    }, [_c('router-link', {
      attrs: {
        "to": '/races/' + race.round
      }
    }, [_c('a', [_vm._v(_vm._s(race.raceName))])])], 1), _vm._v(" "), _c('td', {
      staticClass: "tall-col",
      attrs: {
        "rowspan": "2"
      }
    }, [_vm._v(_vm._s(race.Circuit.Location.locality + ', ' + race.Circuit.Location.country))]), _vm._v(" "), _c('td', {
      staticClass: "tall-col",
      attrs: {
        "rowspan": "2"
      }
    }, [_vm._v(_vm._s(race.date))]), _vm._v(" "), _c('td', {
      staticClass: "active"
    }, [_c('router-link', {
      attrs: {
        "to": '/drivers/' + race.Results[0].Driver.driverId
      }
    }, [_c('a', [_vm._v(_vm._s(race.Results[0].Driver.givenName + ' ' + race.Results[0].Driver.familyName))])])], 1), _vm._v(" "), _c('td', {
      staticClass: "active"
    }, [_vm._v(_vm._s(race.Results[0].grid))]), _vm._v(" "), _c('td', {
      staticClass: "active",
      class: {
        'success': race.Results[0].position === '1'
      }
    }, [_vm._v(_vm._s(race.Results[0].position))])]), _vm._v(" "), _c('tr', {
      staticClass: "active"
    }, [_c('td', [_c('router-link', {
      attrs: {
        "to": '/drivers/' + race.Results[1].Driver.driverId
      }
    }, [_c('a', [_vm._v(_vm._s(race.Results[1].Driver.givenName + ' ' + race.Results[1].Driver.familyName))])])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(race.Results[1].grid))]), _vm._v(" "), _c('td', {
      class: {
        'success': race.Results[1].position === '1'
      }
    }, [_vm._v(_vm._s(race.Results[1].position))])])])
  })], 2)])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Race")]), _vm._v(" "), _c('th', [_vm._v("Location")]), _vm._v(" "), _c('th', [_vm._v("Date")]), _vm._v(" "), _c('th', [_vm._v("Driver")]), _vm._v(" "), _c('th', [_vm._v("Qualified")]), _vm._v(" "), _c('th', [_vm._v("Finished")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = esExports;
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-e12a0452", esExports)
  }
}

/***/ }),
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("bd79dd00", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(6, function() {
     var newContent = __webpack_require__(6);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("312a2658", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(7, function() {
     var newContent = __webpack_require__(7);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("75714010", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(8, function() {
     var newContent = __webpack_require__(8);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("85a5acf0", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(9, function() {
     var newContent = __webpack_require__(9);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("484e145a", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(10, function() {
     var newContent = __webpack_require__(10);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _vueResource = __webpack_require__(18);

var _vueResource2 = _interopRequireDefault(_vueResource);

var _App = __webpack_require__(17);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(13);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(14);

_vue2.default.use(_vueResource2.default);

new _vue2.default({
    el: '#app',
    router: _router2.default,
    template: '<App/>',
    components: { App: _App2.default }
});

/***/ })
],[58]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ecml2ZXIudnVlPzg4NDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGVhbXMudnVlPzg0YWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRHJpdmVycy52dWU/ZDlkNCIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLnZ1ZT81ODU5Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RlYW0udnVlPzZmZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL0FwcC52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0RyaXZlci52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0RyaXZlcnMudnVlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9SYWNlLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUmFjZXMudnVlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9UZWFtLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvVGVhbXMudnVlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9ZZWFycy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRHJpdmVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ecml2ZXJzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SYWNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SYWNlcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGVhbS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGVhbXMudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1llYXJzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SYWNlcy52dWU/MGY2MiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ecml2ZXIudnVlPzYxMzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmFjZS52dWU/MzU3OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ZZWFycy52dWU/Nzc4OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UZWFtcy52dWU/MjJiNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ecml2ZXJzLnZ1ZT8yZGU5Iiwid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzhmZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGVhbS52dWU/MzM5MSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ecml2ZXIudnVlP2RkOWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGVhbXMudnVlP2NmNzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRHJpdmVycy52dWU/NTMwYiIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLnZ1ZT8zZDE5Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RlYW0udnVlPzExM2YiLCJ3ZWJwYWNrOi8vL2dvdCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiXSwibmFtZXMiOlsidXNlIiwicm91dGVzIiwicGF0aCIsIm5hbWUiLCJjb21wb25lbnQiLCJwcm9wcyIsInJlZGlyZWN0IiwicmVxdWlyZSIsImVsIiwicm91dGVyIiwidGVtcGxhdGUiLCJjb21wb25lbnRzIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBR0E7QUFDQSw2UEFBOFAsc0ZBQXNGOztBQUVwVjs7Ozs7OztBQ1BBO0FBQ0E7OztBQUdBO0FBQ0EsdUtBQXdLLHFGQUFxRjs7QUFFN1A7Ozs7Ozs7QUNQQTtBQUNBOzs7QUFHQTtBQUNBLGdEQUFpRCxxQkFBcUIsR0FBRyw4QkFBOEIsb0JBQW9CLEdBQUcsb0NBQW9D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QTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7O0FDdkNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwSTtBQUMxSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxXQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQSx3QkFBOEw7QUFDOUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwSTtBQUMxSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxXQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7QUMzQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQSx3QkFBOEw7QUFDOUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwSTtBQUMxSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxXQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7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QTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNsR0EsMEJBQTBCLGFBQWEsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxvQ0FBb0MsYUFBYSwwQkFBMEI7QUFDM0U7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQ3hGQSwwQkFBMEIsYUFBYSwwQkFBMEI7QUFDakU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLG9DQUFvQyxhQUFhLDBCQUEwQjtBQUMzRTtBQUNBLENBQUM7QUFDRDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDcEVBOztBQUVBO0FBQ0EsbUNBQXdOO0FBQ3hOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBdU47QUFDdk4sMkNBQWdPO0FBQ2hPO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDcEJBOztBQUVBO0FBQ0EsbUNBQXdOO0FBQ3hOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBdU47QUFDdk4sMkNBQWdPO0FBQ2hPO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDcEJBOztBQUVBO0FBQ0EsbUNBQXVOO0FBQ3ZOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc047QUFDdE4sMkNBQStOO0FBQy9OO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDcEJBOztBQUVBO0FBQ0EsbUNBQWtOO0FBQ2xOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBaU47QUFDak4sMkNBQTBOO0FBQzFOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDcEJBOztBQUVBO0FBQ0Esb0NBQXdOO0FBQ3hOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdU47QUFDdk4sNENBQWdPO0FBQ2hPO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7O0FDcEJBLGU7Ozs7Ozs7OztBQ0lBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFQQSxtQkFBQUMsQ0FBUSxFQUFSO0FBQ0EsbUJBQUFBLENBQVEsRUFBUjtBQUNBLG1CQUFBQSxDQUFRLEVBQVI7O0FBT0EsY0FBSVAsR0FBSjs7QUFFQSxrQkFBUTtBQUNKUSxRQUFJLE1BREE7QUFFSkMsNEJBRkk7QUFHSkMsY0FBVSxRQUhOO0FBSUpDLGdCQUFZLEVBQUVDLGtCQUFGO0FBSlIsQ0FBUixFIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIkRyaXZlci52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTFjMjkyNWEyXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9jb21wb25lbnRzL0RyaXZlci52dWVcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJUZWFtcy52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTYxYTA1ZTJjXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9jb21wb25lbnRzL1RlYW1zLnZ1ZVxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxudGhbZGF0YS12LTZjYTcyZmMxXSB7XFxuICAgIGN1cnNvcjpwb2ludGVyO1xcbn1cXG50aC5hY3RpdmVbZGF0YS12LTZjYTcyZmMxXSB7XFxuICAgIGNvbG9yOiM0MjhiY2E7XFxufVxcbi5jYXJldC5yZXZlcnNlZFtkYXRhLXYtNmNhNzJmYzFdIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9jdGhvbWFzb24vVGVzdGluZy9mMS12dWVqcy13ZWJwYWNrL3NyYy9jb21wb25lbnRzL3NyYy9jb21wb25lbnRzL0RyaXZlcnMudnVlP2YwZTQwNDMyXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUEyR0E7SUFDQSxlQUFBO0NBQ0E7QUFDQTtJQUNBLGNBQUE7Q0FDQTtBQUNBO0lBQ0EsMEJBQUE7Q0FDQVwiLFwiZmlsZVwiOlwiRHJpdmVycy52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkcml2ZXJzXFxcIj5cXG4gICAgICAgIDxoMT5Ecml2ZXJzICZtZGFzaDsge3t5ZWFyfX0gU2Vhc29uPC9oMT5cXG4gICAgICAgIDxkaXYgdi1pZj1cXFwibG9hZGluZ1xcXCI+TG9hZGluZy4uLjwvZGl2PlxcbiAgICAgICAgPGRpdiB2LWVsc2UtaWY9XFxcImVycm9yXFxcIj5BbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIGRyaXZlciBkYXRhIGlzIGF2YWlsYWJsZS48L2Rpdj5cXG4gICAgICAgIDx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtc3RyaXBlZFxcXCIgdi1lbHNlPlxcbiAgICAgICAgICAgIDx0aGVhZD5cXG4gICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgPHRoIHYtb246Y2xpY2s9XFxcInNvcnREcml2ZXJzKCdmYW1pbHlOYW1lJylcXFwiIDpjbGFzcz1cXFwieydhY3RpdmUnOiBzb3J0ID09PSAnZmFtaWx5TmFtZSd9XFxcIj5OYW1lIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCIgOmNsYXNzPVxcXCJ7ICdyZXZlcnNlZCc6IHJldmVyc2VkIH1cXFwiIHYtaWY9XFxcInNvcnQgPT09ICdmYW1pbHlOYW1lJ1xcXCI+PC9zcGFuPjwvdGg+XFxuICAgICAgICAgICAgICAgICAgICA8dGggdi1vbjpjbGljaz1cXFwic29ydERyaXZlcnMoJ0NvbnN0cnVjdG9ycycpXFxcIiA6Y2xhc3M9XFxcInsnYWN0aXZlJzogc29ydCA9PT0gJ0NvbnN0cnVjdG9ycyd9XFxcIj5UZWFtcyA8c3BhbiBjbGFzcz1cXFwiY2FyZXRcXFwiIDpjbGFzcz1cXFwieyAncmV2ZXJzZWQnOiByZXZlcnNlZCB9XFxcIiB2LWlmPVxcXCJzb3J0ID09PSAnQ29uc3RydWN0b3JzJ1xcXCI+PC9zcGFuPjwvdGg+XFxuICAgICAgICAgICAgICAgICAgICA8dGggdi1vbjpjbGljaz1cXFwic29ydERyaXZlcnMoJ25hdGlvbmFsaXR5JylcXFwiIDpjbGFzcz1cXFwieydhY3RpdmUnOiBzb3J0ID09PSAnbmF0aW9uYWxpdHknfVxcXCI+TmF0aW9uYWxpdHkgPHNwYW4gY2xhc3M9XFxcImNhcmV0XFxcIiA6Y2xhc3M9XFxcInsgJ3JldmVyc2VkJzogcmV2ZXJzZWQgfVxcXCIgdi1pZj1cXFwic29ydCA9PT0gJ25hdGlvbmFsaXR5J1xcXCI+PC9zcGFuPjwvdGg+XFxuICAgICAgICAgICAgICAgICAgICA8dGggdi1vbjpjbGljaz1cXFwic29ydERyaXZlcnMoJ3BvaW50cycpXFxcIiA6Y2xhc3M9XFxcInsnYWN0aXZlJzogc29ydCA9PT0gJ3BvaW50cyd9XFxcIj5Qb2ludHMgPHNwYW4gY2xhc3M9XFxcImNhcmV0XFxcIiA6Y2xhc3M9XFxcInsgJ3JldmVyc2VkJzogcmV2ZXJzZWQgfVxcXCIgdi1pZj1cXFwic29ydCA9PT0gJ3BvaW50cydcXFwiPjwvc3Bhbj48L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgPHRoIHYtb246Y2xpY2s9XFxcInNvcnREcml2ZXJzKCd3aW5zJylcXFwiIDpjbGFzcz1cXFwieydhY3RpdmUnOiBzb3J0ID09PSAnd2lucyd9XFxcIj5XaW5zIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCIgOmNsYXNzPVxcXCJ7ICdyZXZlcnNlZCc6IHJldmVyc2VkIH1cXFwiIHYtaWY9XFxcInNvcnQgPT09ICd3aW5zJ1xcXCI+PC9zcGFuPjwvdGg+XFxuICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgPC90aGVhZD5cXG4gICAgICAgICAgICA8dGJvZHk+XFxuICAgICAgICAgICAgICAgIDx0ciB2LWZvcj1cXFwiZHJpdmVyIGluIGRyaXZlcnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayA6dG89XFxcIicvZHJpdmVycy8nICsgZHJpdmVyLkRyaXZlci5kcml2ZXJJZFxcXCI+PGE+e3tkcml2ZXIuRHJpdmVyLmdpdmVuTmFtZSArICcgJyArIGRyaXZlci5Ecml2ZXIuZmFtaWx5TmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWZvcj1cXFwiKHRlYW0sIGluZGV4KSBpbiBkcml2ZXIuQ29uc3RydWN0b3JzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cXFwiJy90ZWFtcy8nICsgeWVhciArICcvJyArIHRlYW0uY29uc3RydWN0b3JJZFxcXCI+PGE+e3t0ZWFtLm5hbWV9fTwvYT48L3JvdXRlci1saW5rPjxzcGFuIHYtaWY9XFxcImluZGV4KzEgPCBkcml2ZXIuQ29uc3RydWN0b3JzLmxlbmd0aFxcXCI+LCA8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e2RyaXZlci5Ecml2ZXIubmF0aW9uYWxpdHl9fTwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3tkcml2ZXIucG9pbnRzfX08L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7ZHJpdmVyLndpbnN9fTwvdGQ+XFxuICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgPC90Ym9keT5cXG4gICAgICAgIDwvdGFibGU+XFxuICAgIDwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG4gICAgZXhwb3J0IGRlZmF1bHQge1xcbiAgICAgICAgbmFtZTogJ2RyaXZlcnMnLFxcbiAgICAgICAgcHJvcHM6IFsneWVhciddLFxcbiAgICAgICAgZGF0YTogKCkgPT4gKHtcXG4gICAgICAgICAgICBkcml2ZXJzOiBbXSxcXG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxcbiAgICAgICAgICAgIHNvcnQ6ICdwb2ludHMnLFxcbiAgICAgICAgICAgIHJldmVyc2VkOiBmYWxzZSxcXG4gICAgICAgICAgICBlcnJvcjogZmFsc2VcXG4gICAgICAgIH0pLFxcbiAgICAgICAgbWV0aG9kczoge1xcbiAgICAgICAgICAgIGdldERhdGEoKSB7XFxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XFxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcXG4gICAgICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQoJ2h0dHA6Ly9lcmdhc3QuY29tL2FwaS9mMS8nICsgdGhpcy55ZWFyICsgJy9kcml2ZXJTdGFuZGluZ3MuanNvbicpLnRoZW4ocmVzcG9uc2UgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYm9keS5NUkRhdGEuU3RhbmRpbmdzVGFibGUuU3RhbmRpbmdzTGlzdHMubGVuZ3RoID4gMCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IHJlc3BvbnNlLmJvZHkuTVJEYXRhLlN0YW5kaW5nc1RhYmxlLlN0YW5kaW5nc0xpc3RzWzBdLkRyaXZlclN0YW5kaW5ncztcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQgPSAncG9pbnRzJztcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2VkID0gZmFsc2U7XFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB9LCByZXNwb25zZSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJywgcmVzcG9uc2UpO1xcbiAgICAgICAgICAgICAgICB9KTtcXG4gICAgICAgICAgICB9LFxcbiAgICAgICAgICAgIHNvcnREcml2ZXJzKHByb3BlcnR5KSB7XFxuICAgICAgICAgICAgICAgIGxldCBmaXJzdCwgc2Vjb25kO1xcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0ID09PSBwcm9wZXJ0eSkge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzLnJldmVyc2UoKTtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZWQgPSAhdGhpcy5yZXZlcnNlZDtcXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydCA9IHByb3BlcnR5O1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXZlcnNlZCA9IGZhbHNlO1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzLnNvcnQoKGEsIGIpID0+IHtcXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT09ICdwb2ludHMnIHx8IHByb3BlcnR5ID09PSAnd2lucycpIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBwYXJzZUludChhW3Byb3BlcnR5XSwgMTApO1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBwYXJzZUludChiW3Byb3BlcnR5XSwgMTApO1xcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT09ICdDb25zdHJ1Y3RvcnMnKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gYS5Db25zdHJ1Y3RvcnNbMF0ubmFtZTtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gYi5Db25zdHJ1Y3RvcnNbMF0ubmFtZTtcXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGEuRHJpdmVyW3Byb3BlcnR5XS50b0xvd2VyQ2FzZSgpO1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBiLkRyaXZlcltwcm9wZXJ0eV0udG9Mb3dlckNhc2UoKTtcXG4gICAgICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0IDwgc2Vjb25kKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0ID4gc2Vjb25kKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcXG4gICAgICAgICAgICAgICAgICAgIH0pO1xcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSAncG9pbnRzJyB8fCBwcm9wZXJ0eSA9PT0gJ3dpbnMnKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzLnJldmVyc2UoKTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH0sXFxuICAgICAgICBtb3VudGVkKCkge1xcbiAgICAgICAgICAgIGlmICh0aGlzLnllYXIgIT09ICcnKSB7XFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH0sXFxuICAgICAgICB3YXRjaDoge1xcbiAgICAgICAgICAgIHllYXI6IGZ1bmN0aW9uKHZhbHVlKSB7XFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfTtcXG48L3NjcmlwdD5cXG5cXG48c3R5bGUgc2NvcGVkPlxcbiAgICB0aCB7XFxuICAgICAgICBjdXJzb3I6cG9pbnRlcjtcXG4gICAgfVxcbiAgICB0aC5hY3RpdmUge1xcbiAgICAgICAgY29sb3I6IzQyOGJjYTtcXG4gICAgfVxcbiAgICAuY2FyZXQucmV2ZXJzZWQge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgfVxcbjwvc3R5bGU+XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNmNhNzJmYzFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjpmYWxzZX0hLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zcmMvY29tcG9uZW50cy9Ecml2ZXJzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIkFwcC52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWE0ZWVmM2ZjXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udGFibGU+dGJvZHk+dHI+dGQudGFsbC1jb2wge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL2N0aG9tYXNvbi9UZXN0aW5nL2YxLXZ1ZWpzLXdlYnBhY2svc3JjL2NvbXBvbmVudHMvc3JjL2NvbXBvbmVudHMvVGVhbS52dWU/MWUyMjZhNjBcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQThHQTtJQUNBLHVCQUFBO0NBQ0FcIixcImZpbGVcIjpcIlRlYW0udnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG4gICAgPGRpdj5cXG4gICAgICAgIDxkaXYgdi1pZj1cXFwibG9hZGluZ1xcXCI+TG9hZGluZy4uLjwvZGl2PlxcbiAgICAgICAgPGRpdiB2LWVsc2UtaWY9XFxcImVycm9yXFxcIj5BbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIHRlYW0gZGF0YSBpcyBhdmFpbGFibGUuPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0ZWFtXFxcIiB2LWVsc2U+XFxuICAgICAgICAgICAgPGgxPnt7IHRlYW0uQ29uc3RydWN0b3IubmFtZSB9fSAmbWRhc2g7IHt7IHllYXIgfX0gU2Vhc29uPC9oMT5cXG4gICAgICAgICAgICA8cD48c3Ryb25nPk5hdGlvbmFsaXR5Ojwvc3Ryb25nPiB7e3RlYW0uQ29uc3RydWN0b3IubmF0aW9uYWxpdHl9fTwvcD5cXG4gICAgICAgICAgICA8cD48YSA6aHJlZj1cXFwidGVhbS5Db25zdHJ1Y3Rvci51cmxcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj5XaWtpcGVkaWEgQmlvPC9hPjwvcD5cXG5cXG4gICAgICAgICAgICA8dWw+XFxuICAgICAgICAgICAgICAgIDxsaT57e3llYXJ9fSBXaW5zOiB7e3RlYW0ud2luc319PC9saT5cXG4gICAgICAgICAgICAgICAgPGxpPlBvaW50czoge3t0ZWFtLnBvaW50c319PC9saT5cXG4gICAgICAgICAgICAgICAgPGxpPldDQyBQb3NpdGlvbjoge3t0ZWFtLnBvc2l0aW9ufX08L2xpPlxcbiAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgPGgyPlJlc3VsdHM8L2gyPlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwibG9hZGluZ1JhY2VzXFxcIj5Mb2FkaW5nIHJhY2UgZGF0YS4uLjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1lbHNlLWlmPVxcXCJlcnJvclJhY2VzXFxcIj5BbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIHJhY2UgZGF0YSBpcyBhdmFpbGFibGUuPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiB2LWVsc2U+XFxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cXFwidGFibGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlJhY2U8L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TG9jYXRpb248L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RGF0ZTwvdGg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Ecml2ZXI8L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+UXVhbGlmaWVkPC90aD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkZpbmlzaGVkPC90aD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSB2LWZvcj1cXFwicmFjZSBpbiByYWNlc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgcm93c3Bhbj1cXFwiMlxcXCIgY2xhc3M9XFxcInRhbGwtY29sXFxcIj48cm91dGVyLWxpbmsgOnRvPVxcXCInL3JhY2VzLycgKyByYWNlLnJvdW5kXFxcIj48YT57e3JhY2UucmFjZU5hbWV9fTwvYT48L3JvdXRlci1saW5rPjwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCByb3dzcGFuPVxcXCIyXFxcIiBjbGFzcz1cXFwidGFsbC1jb2xcXFwiPnt7cmFjZS5DaXJjdWl0LkxvY2F0aW9uLmxvY2FsaXR5ICsgJywgJyArIHJhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5jb3VudHJ5fX08L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgcm93c3Bhbj1cXFwiMlxcXCIgY2xhc3M9XFxcInRhbGwtY29sXFxcIj57e3JhY2UuZGF0ZX19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJhY3RpdmVcXFwiPjxyb3V0ZXItbGluayA6dG89XFxcIicvZHJpdmVycy8nICsgcmFjZS5SZXN1bHRzWzBdLkRyaXZlci5kcml2ZXJJZFxcXCI+PGE+e3tyYWNlLlJlc3VsdHNbMF0uRHJpdmVyLmdpdmVuTmFtZSArICcgJyArIHJhY2UuUmVzdWx0c1swXS5Ecml2ZXIuZmFtaWx5TmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJhY3RpdmVcXFwiPnt7cmFjZS5SZXN1bHRzWzBdLmdyaWR9fTwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwiYWN0aXZlXFxcIiA6Y2xhc3M9XFxcInsgJ3N1Y2Nlc3MnOiByYWNlLlJlc3VsdHNbMF0ucG9zaXRpb24gPT09ICcxJyB9XFxcIj57e3JhY2UuUmVzdWx0c1swXS5wb3NpdGlvbn19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cXFwiYWN0aXZlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayA6dG89XFxcIicvZHJpdmVycy8nICsgcmFjZS5SZXN1bHRzWzFdLkRyaXZlci5kcml2ZXJJZFxcXCI+PGE+e3tyYWNlLlJlc3VsdHNbMV0uRHJpdmVyLmdpdmVuTmFtZSArICcgJyArIHJhY2UuUmVzdWx0c1sxXS5Ecml2ZXIuZmFtaWx5TmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7cmFjZS5SZXN1bHRzWzFdLmdyaWR9fTwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCA6Y2xhc3M9XFxcInsgJ3N1Y2Nlc3MnOiByYWNlLlJlc3VsdHNbMV0ucG9zaXRpb24gPT09ICcxJyB9XFxcIj57e3JhY2UuUmVzdWx0c1sxXS5wb3NpdGlvbn19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cXG4gICAgICAgICAgICAgICAgPC90YWJsZT5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L3RlbXBsYXRlPlxcbjxzY3JpcHQ+XFxuICAgIGV4cG9ydCBkZWZhdWx0IHtcXG4gICAgICAgIG5hbWU6ICd0ZWFtJyxcXG4gICAgICAgIHByb3BzOiBbJ2lkJywgJ3llYXInXSxcXG4gICAgICAgIGRhdGE6ICgpID0+ICh7XFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcXG4gICAgICAgICAgICBsb2FkaW5nUmFjZXM6IHRydWUsXFxuICAgICAgICAgICAgdGVhbToge30sXFxuICAgICAgICAgICAgcmFjZXM6IFtdLFxcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcXG4gICAgICAgICAgICBlcnJvclJhY2VzOiBmYWxzZVxcbiAgICAgICAgfSksXFxuICAgICAgICBtZXRob2RzOiB7XFxuICAgICAgICAgICAgZ2V0RGF0YSgpIHtcXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nUmFjZXMgPSB0cnVlO1xcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZmFsc2U7XFxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JSYWNlcyA9IGZhbHNlO1xcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLycgKyB0aGlzLnllYXIgKyAnL2NvbnN0cnVjdG9ycy8nICsgdGhpcy5pZCArICcvY29uc3RydWN0b3JTdGFuZGluZ3MuanNvbicpLnRoZW4ocmVzcG9uc2UgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYm9keS5NUkRhdGEuU3RhbmRpbmdzVGFibGUuU3RhbmRpbmdzTGlzdHMubGVuZ3RoID4gMCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVhbSA9IHJlc3BvbnNlLmJvZHkuTVJEYXRhLlN0YW5kaW5nc1RhYmxlLlN0YW5kaW5nc0xpc3RzWzBdLkNvbnN0cnVjdG9yU3RhbmRpbmdzWzBdO1xcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZWFtIGRldGFpbHMgZXJyb3InLCByZXNwb25zZSk7XFxuICAgICAgICAgICAgICAgIH0pO1xcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLycgKyB0aGlzLnllYXIgKyAnL2NvbnN0cnVjdG9ycy8nICsgdGhpcy5pZCArICcvcmVzdWx0cy5qc29uJykudGhlbihyZXNwb25zZSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdSYWNlcyA9IGZhbHNlO1xcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmJvZHkuTVJEYXRhLlJhY2VUYWJsZS5SYWNlcy5sZW5ndGggPiAwKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWNlcyA9IHJlc3BvbnNlLmJvZHkuTVJEYXRhLlJhY2VUYWJsZS5SYWNlcztcXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvclJhY2VzID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nUmFjZXMgPSBmYWxzZTtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JSYWNlcyA9IHRydWU7XFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGVhbSBkcml2ZXJzIGVycm9yJywgcmVzcG9uc2UpO1xcbiAgICAgICAgICAgICAgICB9KTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9LFxcbiAgICAgICAgbW91bnRlZCgpIHtcXG4gICAgICAgICAgICBpZiAodGhpcy55ZWFyICE9PSAnJykge1xcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGEoKTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9LFxcbiAgICAgICAgd2F0Y2g6IHtcXG4gICAgICAgICAgICB5ZWFyOiBmdW5jdGlvbih2YWx1ZSkge1xcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGEoKTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH07XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlPlxcbiAgICAudGFibGU+dGJvZHk+dHI+dGQudGFsbC1jb2wge1xcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgfVxcbjwvc3R5bGU+XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZTEyYTA0NTJcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL2NvbXBvbmVudHMvVGVhbS52dWVcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgVGVhbXMgZnJvbSAnLi4vY29tcG9uZW50cy9UZWFtcyc7XG5pbXBvcnQgVGVhbSBmcm9tICcuLi9jb21wb25lbnRzL1RlYW0nO1xuaW1wb3J0IERyaXZlcnMgZnJvbSAnLi4vY29tcG9uZW50cy9Ecml2ZXJzJztcbmltcG9ydCBEcml2ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Ecml2ZXInO1xuaW1wb3J0IFJhY2VzIGZyb20gJy4uL2NvbXBvbmVudHMvUmFjZXMnO1xuaW1wb3J0IFJhY2UgZnJvbSAnLi4vY29tcG9uZW50cy9SYWNlJztcblxuVnVlLnVzZShSb3V0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgUm91dGVyKHtcbiAgICByb3V0ZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJy90ZWFtcycsXG4gICAgICAgICAgICBuYW1lOiAnVGVhbXMnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBUZWFtc1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAnL3RlYW1zLzppZCcsXG4gICAgICAgICAgICBuYW1lOiAnVGVhbScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFRlYW0sXG4gICAgICAgICAgICBwcm9wczogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAnL2RyaXZlcnMnLFxuICAgICAgICAgICAgbmFtZTogJ0RyaXZlcnMnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBEcml2ZXJzXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICcvZHJpdmVycy86aWQnLFxuICAgICAgICAgICAgbmFtZTogJ0RyaXZlcicsXG4gICAgICAgICAgICBjb21wb25lbnQ6IERyaXZlcixcbiAgICAgICAgICAgIHByb3BzOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICcvcmFjZXMnLFxuICAgICAgICAgICAgbmFtZTogJ1JhY2VzJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogUmFjZXNcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJy9yYWNlcy86aWQnLFxuICAgICAgICAgICAgbmFtZTogJ1JhY2UnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBSYWNlLFxuICAgICAgICAgICAgcHJvcHM6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgeyAgIHBhdGg6ICcqJyxcbiAgICAgICAgICAgIHJlZGlyZWN0OiAnL3RlYW1zJyBcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXIvaW5kZXguanMiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWE0ZWVmM2ZjXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHAudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0FwcC52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWE0ZWVmM2ZjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0FwcC52dWVcIlxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvQXBwLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQXBwLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1hNGVlZjNmY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWE0ZWVmM2ZjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0FwcC52dWVcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGlkPVwiYXBwXCI+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmJhci10b2dnbGUgY29sbGFwc2VkXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI25hdmJhclwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+VG9nZ2xlIG5hdmlnYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1iYXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+RjEgRGF0YSBBcHA8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwibmF2YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdGFnPVwibGlcIiB0bz1cIi90ZWFtc1wiIGV4YWN0LWFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiPjxhPlRlYW1zPC9hPjwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdGFnPVwibGlcIiB0bz1cIi9kcml2ZXJzXCIgZXhhY3QtYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCI+PGE+RHJpdmVyczwvYT48L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRhZz1cImxpXCIgdG89XCIvcmFjZXNcIiBleGFjdC1hY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIj48YT5SYWNlczwvYT48L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2YmFyLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8eWVhcnMgQHVwZGF0ZT1cInVwZGF0ZVllYXJcIj48L3llYXJzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25hdj5cbiAgICAgICAgPG1haW4gY2xhc3M9XCJjb250YWluZXJcIiBpZD1cIm1haW5cIj5cbiAgICAgICAgICAgIDxyb3V0ZXItdmlldyA6eWVhcj1cInllYXJcIj48L3JvdXRlci12aWV3PlxuICAgICAgICA8L21haW4+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBWdWUgZnJvbSAndnVlJztcbiAgICBpbXBvcnQgWWVhcnMgZnJvbSAnLi9jb21wb25lbnRzL1llYXJzLnZ1ZSc7XG4gICAgVnVlLmNvbXBvbmVudChZZWFycy5uYW1lLCBZZWFycyk7XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiAnYXBwJyxcbiAgICAgICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgICAgIHllYXI6ICcnXG4gICAgICAgIH0pLFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICB1cGRhdGVZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuPC9zdHlsZT5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL0FwcC52dWU/NGJiNDRjYTQiLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiPkxvYWRpbmcuLi48L2Rpdj5cbiAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJlcnJvclwiPkFuIGVycm9yIGhhcyBvY2N1cnJlZC4gTm8gZHJpdmVyIGRhdGEgaXMgYXZhaWxhYmxlLjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZHJpdmVyXCIgdi1lbHNlPlxuICAgICAgICAgICAgPGgxIGNsYXNzPVwiZHJpdmVyLW5hbWVcIj57e2RyaXZlci5Ecml2ZXIuZ2l2ZW5OYW1lfX0mbmJzcDt7e2RyaXZlci5Ecml2ZXIuZmFtaWx5TmFtZX19ICZtZGFzaDsge3t5ZWFyfX0gU2Vhc29uPC9oMT5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+TmF0aW9uYWxpdHk6PC9zdHJvbmc+IHt7ZHJpdmVyLkRyaXZlci5uYXRpb25hbGl0eX19IDxicj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlRlYW1zOjwvc3Ryb25nPiBcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1mb3I9XCIodGVhbSwgaW5kZXgpIGluIGRyaXZlci5Db25zdHJ1Y3RvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3RlYW1zLycgKyB0ZWFtLmNvbnN0cnVjdG9ySWRcIj48YT57e3RlYW0ubmFtZX19PC9hPjwvcm91dGVyLWxpbms+PHNwYW4gdi1pZj1cImluZGV4KzEgPCBkcml2ZXIuQ29uc3RydWN0b3JzLmxlbmd0aFwiPiwgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+IDxicj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPkJpcnRoZGF5Ojwvc3Ryb25nPiB7e2RyaXZlci5Ecml2ZXIuZGF0ZU9mQmlydGh9fSA8YnI+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD48YSA6aHJlZj1cImRyaXZlci5Ecml2ZXIudXJsXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5XaWtpcGVkaWEgQmlvPC9hPjwvcD5cblxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPnt7eWVhcn19IFdpbnM6PC9zdHJvbmc+IHt7ZHJpdmVyLndpbnN9fTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+UG9pbnRzOjwvc3Ryb25nPiB7e2RyaXZlci5wb2ludHN9fTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+V0RDIFBvc2l0aW9uOjwvc3Ryb25nPiB7e2RyaXZlci5wb3NpdGlvbn19PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDI+UmVzdWx0czwvaDI+XG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJsb2FkaW5nUmFjZXNcIj5Mb2FkaW5nIHJhY2UgZGF0YS4uLjwvZGl2PlxuICAgICAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJlcnJvclJhY2VzXCI+QW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyByYWNlIGRhdGEgaXMgYXZhaWxhYmxlLjwvZGl2PlxuICAgICAgICAgICAgPGRpdiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Sb3VuZDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkdyYW5kIFByaXg8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UZWFtPC90aD4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlF1YWxpZmllZDwvdGg+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5GaW5pc2hlZDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgdi1mb3I9XCJyYWNlIGluIHJhY2VzXCIgOmNsYXNzPVwieyAnc3VjY2Vzcyc6IHJhY2UuUmVzdWx0c1swXS5wb3NpdGlvbiA9PT0gJzEnIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tyYWNlLnJvdW5kfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgOnRvPVwiJy9yYWNlcy8nICsgcmFjZS5yb3VuZFwiPjxhPnt7cmFjZS5yYWNlTmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIDp0bz1cIicvdGVhbXMvJyArIHJhY2UuUmVzdWx0c1swXS5Db25zdHJ1Y3Rvci5jb25zdHJ1Y3RvcklkXCI+PGE+e3tyYWNlLlJlc3VsdHNbMF0uQ29uc3RydWN0b3IubmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tyYWNlLlJlc3VsdHNbMF0uZ3JpZH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tyYWNlLlJlc3VsdHNbMF0ucG9zaXRpb259fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6ICdkcml2ZXInLFxuICAgICAgICBwcm9wczogWydpZCcsICd5ZWFyJ10sXG4gICAgICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgbG9hZGluZ1JhY2VzOiB0cnVlLFxuICAgICAgICAgICAgZHJpdmVyOiB7fSxcbiAgICAgICAgICAgIHJhY2VzOiBbXSxcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yUmFjZXM6IGZhbHNlXG4gICAgICAgIH0pLFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBnZXREYXRhKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nUmFjZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yUmFjZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLycgKyB0aGlzLnllYXIgKyAnL2RyaXZlcnMvJyArIHRoaXMuaWQgKyAnL2RyaXZlclN0YW5kaW5ncy5qc29uJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYm9keS5NUkRhdGEuU3RhbmRpbmdzVGFibGUuU3RhbmRpbmdzTGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXIgPSByZXNwb25zZS5ib2R5Lk1SRGF0YS5TdGFuZGluZ3NUYWJsZS5TdGFuZGluZ3NMaXN0c1swXS5Ecml2ZXJTdGFuZGluZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZHJpdmVyIGFwaSBlcnJvcicsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLycgKyB0aGlzLnllYXIgKyAnL2RyaXZlcnMvJyArIHRoaXMuaWQgKyAnL3Jlc3VsdHMuanNvbicpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdSYWNlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYm9keS5NUkRhdGEuUmFjZVRhYmxlLlJhY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFjZXMgPSByZXNwb25zZS5ib2R5Lk1SRGF0YS5SYWNlVGFibGUuUmFjZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yUmFjZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdSYWNlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yUmFjZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmFjZXMgYXBpIGVycm9yJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMueWVhciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHllYXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0RyaXZlci52dWU/MjJkMTAzYjIiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImRyaXZlcnNcIj5cbiAgICAgICAgPGgxPkRyaXZlcnMgJm1kYXNoOyB7e3llYXJ9fSBTZWFzb248L2gxPlxuICAgICAgICA8ZGl2IHYtaWY9XCJsb2FkaW5nXCI+TG9hZGluZy4uLjwvZGl2PlxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImVycm9yXCI+QW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyBkcml2ZXIgZGF0YSBpcyBhdmFpbGFibGUuPC9kaXY+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIiB2LWVsc2U+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggdi1vbjpjbGljaz1cInNvcnREcml2ZXJzKCdmYW1pbHlOYW1lJylcIiA6Y2xhc3M9XCJ7J2FjdGl2ZSc6IHNvcnQgPT09ICdmYW1pbHlOYW1lJ31cIj5OYW1lIDxzcGFuIGNsYXNzPVwiY2FyZXRcIiA6Y2xhc3M9XCJ7ICdyZXZlcnNlZCc6IHJldmVyc2VkIH1cIiB2LWlmPVwic29ydCA9PT0gJ2ZhbWlseU5hbWUnXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCB2LW9uOmNsaWNrPVwic29ydERyaXZlcnMoJ0NvbnN0cnVjdG9ycycpXCIgOmNsYXNzPVwieydhY3RpdmUnOiBzb3J0ID09PSAnQ29uc3RydWN0b3JzJ31cIj5UZWFtcyA8c3BhbiBjbGFzcz1cImNhcmV0XCIgOmNsYXNzPVwieyAncmV2ZXJzZWQnOiByZXZlcnNlZCB9XCIgdi1pZj1cInNvcnQgPT09ICdDb25zdHJ1Y3RvcnMnXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCB2LW9uOmNsaWNrPVwic29ydERyaXZlcnMoJ25hdGlvbmFsaXR5JylcIiA6Y2xhc3M9XCJ7J2FjdGl2ZSc6IHNvcnQgPT09ICduYXRpb25hbGl0eSd9XCI+TmF0aW9uYWxpdHkgPHNwYW4gY2xhc3M9XCJjYXJldFwiIDpjbGFzcz1cInsgJ3JldmVyc2VkJzogcmV2ZXJzZWQgfVwiIHYtaWY9XCJzb3J0ID09PSAnbmF0aW9uYWxpdHknXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCB2LW9uOmNsaWNrPVwic29ydERyaXZlcnMoJ3BvaW50cycpXCIgOmNsYXNzPVwieydhY3RpdmUnOiBzb3J0ID09PSAncG9pbnRzJ31cIj5Qb2ludHMgPHNwYW4gY2xhc3M9XCJjYXJldFwiIDpjbGFzcz1cInsgJ3JldmVyc2VkJzogcmV2ZXJzZWQgfVwiIHYtaWY9XCJzb3J0ID09PSAncG9pbnRzJ1wiPjwvc3Bhbj48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggdi1vbjpjbGljaz1cInNvcnREcml2ZXJzKCd3aW5zJylcIiA6Y2xhc3M9XCJ7J2FjdGl2ZSc6IHNvcnQgPT09ICd3aW5zJ31cIj5XaW5zIDxzcGFuIGNsYXNzPVwiY2FyZXRcIiA6Y2xhc3M9XCJ7ICdyZXZlcnNlZCc6IHJldmVyc2VkIH1cIiB2LWlmPVwic29ydCA9PT0gJ3dpbnMnXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyIHYtZm9yPVwiZHJpdmVyIGluIGRyaXZlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayA6dG89XCInL2RyaXZlcnMvJyArIGRyaXZlci5Ecml2ZXIuZHJpdmVySWRcIj48YT57e2RyaXZlci5Ecml2ZXIuZ2l2ZW5OYW1lICsgJyAnICsgZHJpdmVyLkRyaXZlci5mYW1pbHlOYW1lfX08L2E+PC9yb3V0ZXItbGluaz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWZvcj1cIih0ZWFtLCBpbmRleCkgaW4gZHJpdmVyLkNvbnN0cnVjdG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3RlYW1zLycgKyB5ZWFyICsgJy8nICsgdGVhbS5jb25zdHJ1Y3RvcklkXCI+PGE+e3t0ZWFtLm5hbWV9fTwvYT48L3JvdXRlci1saW5rPjxzcGFuIHYtaWY9XCJpbmRleCsxIDwgZHJpdmVyLkNvbnN0cnVjdG9ycy5sZW5ndGhcIj4sIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7ZHJpdmVyLkRyaXZlci5uYXRpb25hbGl0eX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7ZHJpdmVyLnBvaW50c319PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7ZHJpdmVyLndpbnN9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogJ2RyaXZlcnMnLFxuICAgICAgICBwcm9wczogWyd5ZWFyJ10sXG4gICAgICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgICAgICBkcml2ZXJzOiBbXSxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBzb3J0OiAncG9pbnRzJyxcbiAgICAgICAgICAgIHJldmVyc2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICB9KSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLycgKyB0aGlzLnllYXIgKyAnL2RyaXZlclN0YW5kaW5ncy5qc29uJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYm9keS5NUkRhdGEuU3RhbmRpbmdzVGFibGUuU3RhbmRpbmdzTGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gcmVzcG9uc2UuYm9keS5NUkRhdGEuU3RhbmRpbmdzVGFibGUuU3RhbmRpbmdzTGlzdHNbMF0uRHJpdmVyU3RhbmRpbmdzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0ID0gJ3BvaW50cyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29ydERyaXZlcnMocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0ID09PSBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2VkID0gIXRoaXMucmV2ZXJzZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0ID0gcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJ3BvaW50cycgfHwgcHJvcGVydHkgPT09ICd3aW5zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gcGFyc2VJbnQoYVtwcm9wZXJ0eV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBwYXJzZUludChiW3Byb3BlcnR5XSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PT0gJ0NvbnN0cnVjdG9ycycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGEuQ29uc3RydWN0b3JzWzBdLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gYi5Db25zdHJ1Y3RvcnNbMF0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBhLkRyaXZlcltwcm9wZXJ0eV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBiLkRyaXZlcltwcm9wZXJ0eV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCA8IHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QgPiBzZWNvbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJ3BvaW50cycgfHwgcHJvcGVydHkgPT09ICd3aW5zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnllYXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB5ZWFyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIHRoIHtcbiAgICAgICAgY3Vyc29yOnBvaW50ZXI7XG4gICAgfVxuICAgIHRoLmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiM0MjhiY2E7XG4gICAgfVxuICAgIC5jYXJldC5yZXZlcnNlZCB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG4gICAgfVxuPC9zdHlsZT5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvRHJpdmVycy52dWU/ZjBlNDA0MzIiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiPkxvYWRpbmcuLi48L2Rpdj5cbiAgICA8ZGl2IHYtZWxzZS1pZj1cImVycm9yXCI+QW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyByYWNlIGRhdGEgaXMgYXZhaWxhYmxlLjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyYWNlXCIgdi1lbHNlPlxuICAgICAgICA8aDEgY2xhc3M9XCJyYWNlLW5hbWVcIj57e3JhY2UucmFjZU5hbWV9fSAmbWRhc2g7IHt7eWVhcn19IFNlYXNvbjwvaDE+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgPHN0cm9uZz5EYXRlOjwvc3Ryb25nPiB7e3JhY2UuZGF0ZX19IDxicj5cbiAgICAgICAgICAgIDxzdHJvbmc+Q2lyY3VpdDo8L3N0cm9uZz4ge3tyYWNlLkNpcmN1aXQuY2lyY3VpdE5hbWV9fSA8YnI+XG4gICAgICAgICAgICA8c3Ryb25nPkxvY2F0aW9uOjwvc3Ryb25nPiB7e3JhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sb2NhbGl0eX19LCB7e3JhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5jb3VudHJ5fX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICAgIDxhIDpocmVmPVwicmFjZS51cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlJhY2UgV2lraXBlZGlhIEJpbzwvYT4gXG4gICAgICAgICAgICA8YSA6aHJlZj1cInJhY2UuQ2lyY3VpdC51cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkNpcmN1aXQgV2lraXBlZGlhIEJpbzwvYT4gXG4gICAgICAgICAgICA8YSA6aHJlZj1cImBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoLz9hcGk9MSZxdWVyeT0ke3JhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sYXR9LCR7cmFjZS5DaXJjdWl0LkxvY2F0aW9uLmxvbmd9YFwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+VmlldyBvbiBHb29nbGUgTWFwczwvYT5cbiAgICAgICAgPC9wPlxuICAgICAgICA8aDI+UmVzdWx0czwvaDI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5Qb3NpdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5Ecml2ZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+VGVhbTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5RdWFsaWZpZWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdHVzPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgdi1mb3I9XCJkcml2ZXIgaW4gcmFjZS5SZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e2RyaXZlci5wb3NpdGlvbn19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayA6dG89XCInL2RyaXZlcnMvJyArIGRyaXZlci5Ecml2ZXIuZHJpdmVySWRcIj48YT57e2RyaXZlci5Ecml2ZXIuZ2l2ZW5OYW1lfX0ge3tkcml2ZXIuRHJpdmVyLmZhbWlseU5hbWV9fTwvYT48L3JvdXRlci1saW5rPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgOnRvPVwiJy90ZWFtcy8nICsgZHJpdmVyLkNvbnN0cnVjdG9yLmNvbnN0cnVjdG9ySWRcIj48YT57e2RyaXZlci5Db25zdHJ1Y3Rvci5uYW1lfX08L2E+PC9yb3V0ZXItbGluaz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3tkcml2ZXIuZ3JpZH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7ZHJpdmVyLmxhcHN9fSBsYXBzICZuZGFzaDsge3tkcml2ZXIuc3RhdHVzfX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiAndnVlJyxcbiAgICAgICAgcHJvcHM6IFsnaWQnLCAneWVhciddLFxuICAgICAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHJhY2U6IHt9LFxuICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgIH0pLFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBnZXRSYWNlSW5mbygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLycgKyB0aGlzLnllYXIgKyAnLycgKyB0aGlzLmlkICsgJy9yZXN1bHRzLmpzb24nKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5ib2R5Lk1SRGF0YS5SYWNlVGFibGUuUmFjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWNlID0gcmVzcG9uc2UuYm9keS5NUkRhdGEuUmFjZVRhYmxlLlJhY2VzWzBdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMueWVhciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJhY2VJbmZvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB5ZWFyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmFjZUluZm8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvUmFjZS52dWU/ODYxNDI1MzYiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInJhY2VzXCI+XG4gICAgICAgIDxoMT5SYWNlcyAmbWRhc2g7IHt7eWVhcn19IFNlYXNvbjwvaDE+XG4gICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgICAgIDxkaXYgdi1lbHNlLWlmPVwiZXJyb3JcIj5BbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIHJhY2UgZGF0YSBpcyBhdmFpbGFibGUuPC9kaXY+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIiB2LWVsc2U+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5EYXRlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPkNpcmN1aXQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TG9jYXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+V2lubmluZyBEcml2ZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+V2lubmluZyBUZWFtPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgdi1mb3I9XCJyYWNlIGluIHJhY2VzXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgOnRvPVwiJy9yYWNlcy8nICsgcmFjZS5yb3VuZFwiPjxhPnt7cmFjZS5yYWNlTmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7cmFjZS5kYXRlfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3tyYWNlLkNpcmN1aXQuY2lyY3VpdE5hbWV9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e3JhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sb2NhbGl0eX19LCB7e3JhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5jb3VudHJ5fX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIDp0bz1cIicvZHJpdmVycy8nICsgcmFjZS5SZXN1bHRzWzBdLkRyaXZlci5kcml2ZXJJZFwiPjxhPnt7cmFjZS5SZXN1bHRzWzBdLkRyaXZlci5naXZlbk5hbWV9fSB7e3JhY2UuUmVzdWx0c1swXS5Ecml2ZXIuZmFtaWx5TmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayA6dG89XCInL3RlYW1zLycgKyByYWNlLlJlc3VsdHNbMF0uQ29uc3RydWN0b3IuY29uc3RydWN0b3JJZFwiPjxhPnt7cmFjZS5SZXN1bHRzWzBdLkNvbnN0cnVjdG9yLm5hbWV9fTwvYT48L3JvdXRlci1saW5rPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6ICdyYWNlcycsXG4gICAgICAgIHByb3BzOiBbJ3llYXInXSxcbiAgICAgICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICByYWNlczogW10sXG4gICAgICAgICAgICBlcnJvcjogZmFsc2VcbiAgICAgICAgfSksXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGdldFJhY2VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KCdodHRwOi8vZXJnYXN0LmNvbS9hcGkvZjEvJyArIHRoaXMueWVhciArICcvcmVzdWx0cy8xLmpzb24nKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5ib2R5Lk1SRGF0YS5SYWNlVGFibGUuUmFjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWNlcyA9IHJlc3BvbnNlLmJvZHkuTVJEYXRhLlJhY2VUYWJsZS5SYWNlcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnllYXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSYWNlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgeWVhcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJhY2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1JhY2VzLnZ1ZT83YmZiNmRmZiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IHYtaWY9XCJsb2FkaW5nXCI+TG9hZGluZy4uLjwvZGl2PlxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImVycm9yXCI+QW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyB0ZWFtIGRhdGEgaXMgYXZhaWxhYmxlLjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbVwiIHYtZWxzZT5cbiAgICAgICAgICAgIDxoMT57eyB0ZWFtLkNvbnN0cnVjdG9yLm5hbWUgfX0gJm1kYXNoOyB7eyB5ZWFyIH19IFNlYXNvbjwvaDE+XG4gICAgICAgICAgICA8cD48c3Ryb25nPk5hdGlvbmFsaXR5Ojwvc3Ryb25nPiB7e3RlYW0uQ29uc3RydWN0b3IubmF0aW9uYWxpdHl9fTwvcD5cbiAgICAgICAgICAgIDxwPjxhIDpocmVmPVwidGVhbS5Db25zdHJ1Y3Rvci51cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPldpa2lwZWRpYSBCaW88L2E+PC9wPlxuXG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpPnt7eWVhcn19IFdpbnM6IHt7dGVhbS53aW5zfX08L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5Qb2ludHM6IHt7dGVhbS5wb2ludHN9fTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPldDQyBQb3NpdGlvbjoge3t0ZWFtLnBvc2l0aW9ufX08L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMj5SZXN1bHRzPC9oMj5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdSYWNlc1wiPkxvYWRpbmcgcmFjZSBkYXRhLi4uPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImVycm9yUmFjZXNcIj5BbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIHJhY2UgZGF0YSBpcyBhdmFpbGFibGUuPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlJhY2U8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Mb2NhdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Ecml2ZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5RdWFsaWZpZWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5GaW5pc2hlZDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgdi1mb3I9XCJyYWNlIGluIHJhY2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHJvd3NwYW49XCIyXCIgY2xhc3M9XCJ0YWxsLWNvbFwiPjxyb3V0ZXItbGluayA6dG89XCInL3JhY2VzLycgKyByYWNlLnJvdW5kXCI+PGE+e3tyYWNlLnJhY2VOYW1lfX08L2E+PC9yb3V0ZXItbGluaz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCByb3dzcGFuPVwiMlwiIGNsYXNzPVwidGFsbC1jb2xcIj57e3JhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sb2NhbGl0eSArICcsICcgKyByYWNlLkNpcmN1aXQuTG9jYXRpb24uY291bnRyeX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgcm93c3Bhbj1cIjJcIiBjbGFzcz1cInRhbGwtY29sXCI+e3tyYWNlLmRhdGV9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYWN0aXZlXCI+PHJvdXRlci1saW5rIDp0bz1cIicvZHJpdmVycy8nICsgcmFjZS5SZXN1bHRzWzBdLkRyaXZlci5kcml2ZXJJZFwiPjxhPnt7cmFjZS5SZXN1bHRzWzBdLkRyaXZlci5naXZlbk5hbWUgKyAnICcgKyByYWNlLlJlc3VsdHNbMF0uRHJpdmVyLmZhbWlseU5hbWV9fTwvYT48L3JvdXRlci1saW5rPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYWN0aXZlXCI+e3tyYWNlLlJlc3VsdHNbMF0uZ3JpZH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhY3RpdmVcIiA6Y2xhc3M9XCJ7ICdzdWNjZXNzJzogcmFjZS5SZXN1bHRzWzBdLnBvc2l0aW9uID09PSAnMScgfVwiPnt7cmFjZS5SZXN1bHRzWzBdLnBvc2l0aW9ufX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgOnRvPVwiJy9kcml2ZXJzLycgKyByYWNlLlJlc3VsdHNbMV0uRHJpdmVyLmRyaXZlcklkXCI+PGE+e3tyYWNlLlJlc3VsdHNbMV0uRHJpdmVyLmdpdmVuTmFtZSArICcgJyArIHJhY2UuUmVzdWx0c1sxXS5Ecml2ZXIuZmFtaWx5TmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tyYWNlLlJlc3VsdHNbMV0uZ3JpZH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgOmNsYXNzPVwieyAnc3VjY2Vzcyc6IHJhY2UuUmVzdWx0c1sxXS5wb3NpdGlvbiA9PT0gJzEnIH1cIj57e3JhY2UuUmVzdWx0c1sxXS5wb3NpdGlvbn19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogJ3RlYW0nLFxuICAgICAgICBwcm9wczogWydpZCcsICd5ZWFyJ10sXG4gICAgICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgbG9hZGluZ1JhY2VzOiB0cnVlLFxuICAgICAgICAgICAgdGVhbToge30sXG4gICAgICAgICAgICByYWNlczogW10sXG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICBlcnJvclJhY2VzOiBmYWxzZVxuICAgICAgICB9KSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ1JhY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclJhY2VzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQoJ2h0dHA6Ly9lcmdhc3QuY29tL2FwaS9mMS8nICsgdGhpcy55ZWFyICsgJy9jb25zdHJ1Y3RvcnMvJyArIHRoaXMuaWQgKyAnL2NvbnN0cnVjdG9yU3RhbmRpbmdzLmpzb24nKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5ib2R5Lk1SRGF0YS5TdGFuZGluZ3NUYWJsZS5TdGFuZGluZ3NMaXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlYW0gPSByZXNwb25zZS5ib2R5Lk1SRGF0YS5TdGFuZGluZ3NUYWJsZS5TdGFuZGluZ3NMaXN0c1swXS5Db25zdHJ1Y3RvclN0YW5kaW5nc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZWFtIGRldGFpbHMgZXJyb3InLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQoJ2h0dHA6Ly9lcmdhc3QuY29tL2FwaS9mMS8nICsgdGhpcy55ZWFyICsgJy9jb25zdHJ1Y3RvcnMvJyArIHRoaXMuaWQgKyAnL3Jlc3VsdHMuanNvbicpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdSYWNlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYm9keS5NUkRhdGEuUmFjZVRhYmxlLlJhY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFjZXMgPSByZXNwb25zZS5ib2R5Lk1SRGF0YS5SYWNlVGFibGUuUmFjZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yUmFjZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdSYWNlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yUmFjZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGVhbSBkcml2ZXJzIGVycm9yJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMueWVhciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHllYXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICAudGFibGU+dGJvZHk+dHI+dGQudGFsbC1jb2wge1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIH1cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1RlYW0udnVlPzFlMjI2YTYwIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZWFtc1wiPlxuICAgICAgICA8aDE+VGVhbXMgJm1kYXNoOyB7e3llYXJ9fSBTZWFzb248L2gxPlxuICAgICAgICA8ZGl2IHYtaWY9XCJsb2FkaW5nXCI+TG9hZGluZy4uLjwvZGl2PlxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImVycm9yXCI+QW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyB0ZWFtIGRhdGEgaXMgYXZhaWxhYmxlLjwvZGl2PlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCIgdi1lbHNlPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TmF0aW9uYWxpdHk8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+UG9pbnRzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPldpbnM8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0ciB2LWZvcj1cInRlYW0gaW4gdGVhbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayA6dG89XCInL3RlYW1zLycgKyB0ZWFtLkNvbnN0cnVjdG9yLmNvbnN0cnVjdG9ySWRcIj48YT57e3RlYW0uQ29uc3RydWN0b3IubmFtZX19PC9hPjwvcm91dGVyLWxpbms+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7dGVhbS5Db25zdHJ1Y3Rvci5uYXRpb25hbGl0eX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7dGVhbS5wb2ludHN9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e3RlYW0ud2luc319PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiAndGVhbXMnLFxuICAgICAgICBwcm9wczogWyd5ZWFyJ10sXG4gICAgICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgICAgICB0ZWFtczogW10sXG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgIH0pLFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBnZXREYXRhKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KCdodHRwOi8vZXJnYXN0LmNvbS9hcGkvZjEvJyArIHRoaXMueWVhciArICcvY29uc3RydWN0b3JTdGFuZGluZ3MuanNvbicpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmJvZHkuTVJEYXRhLlN0YW5kaW5nc1RhYmxlLlN0YW5kaW5nc0xpc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVhbXMgPSByZXNwb25zZS5ib2R5Lk1SRGF0YS5TdGFuZGluZ3NUYWJsZS5TdGFuZGluZ3NMaXN0c1swXS5Db25zdHJ1Y3RvclN0YW5kaW5ncztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnllYXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB5ZWFyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG48L3N0eWxlPlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9UZWFtcy52dWU/MmZiZGQ5ZDgiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInllYXJzIGZvcm0taW5saW5lXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJ5ZWFyLXNlbGVjdFwiPlllYXI6PC9sYWJlbD4gIFxuICAgICAgICA8c2VsZWN0IGlkPVwieWVhci1zZWxlY3RcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHYtbW9kZWw9XCJ5ZWFyXCIgQGNoYW5nZT1cInVwZGF0ZVllYXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cbiAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XCJ5ZWFyVmFsdWUgaW4geWVhcnNcIiA6dmFsdWU9XCJ5ZWFyVmFsdWVcIj57e3llYXJWYWx1ZX19PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiAneWVhcnMnLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICBsYXN0WWVhcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHllYXJzKCkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyWWVhciA9IHRoaXMubGFzdFllYXI7XG4gICAgICAgICAgICAgICAgdmFyIHllYXJzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICB5ZWFyc0FycmF5LnB1c2goY3VyclllYXIpO1xuICAgICAgICAgICAgICAgICAgY3VyclllYXItLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHllYXJzQXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHVwZGF0ZVllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGUnLCB5ZWFyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMueWVhciA9IHRoaXMubGFzdFllYXI7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVllYXIodGhpcy55ZWFyKTtcbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvWWVhcnMudnVlPzVjZDYxMjJjIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0xYzI5MjVhMlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vRHJpdmVyLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Ecml2ZXIudnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQgX192dWVfdGVtcGxhdGVfXyBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0xYzI5MjVhMlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Ecml2ZXIudnVlXCJcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvRHJpdmVyLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRHJpdmVyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0xYzI5MjVhMlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTFjMjkyNWEyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvRHJpdmVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02Y2E3MmZjMVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Ecml2ZXJzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Ecml2ZXJzLnZ1ZVwiXG4vKiB0ZW1wbGF0ZSAqL1xuaW1wb3J0IF9fdnVlX3RlbXBsYXRlX18gZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmNhNzJmYzFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Ecml2ZXJzLnZ1ZVwiXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtNmNhNzJmYzFcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL0RyaXZlcnMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBEcml2ZXJzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02Y2E3MmZjMVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTZjYTcyZmMxXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvRHJpdmVycy52dWVcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1JhY2UudnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQgX192dWVfdGVtcGxhdGVfXyBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yMWVlYTc2YVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9SYWNlLnZ1ZVwiXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvUmFjZS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFJhY2UudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTIxZWVhNzZhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjFlZWE3NmFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9SYWNlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG5pbXBvcnQgX192dWVfc2NyaXB0X18gZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vUmFjZXMudnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQgX192dWVfdGVtcGxhdGVfXyBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0xNDhmMDM5MFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9SYWNlcy52dWVcIlxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL1JhY2VzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gUmFjZXMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTE0OGYwMzkwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMTQ4ZjAzOTBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9SYWNlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZTEyYTA0NTJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1RlYW0udnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1RlYW0udnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQgX192dWVfdGVtcGxhdGVfXyBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1lMTJhMDQ1MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9UZWFtLnZ1ZVwiXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL1RlYW0udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBUZWFtLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1lMTJhMDQ1MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWUxMmEwNDUyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvVGVhbS52dWVcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjFhMDVlMmNcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1RlYW1zLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9UZWFtcy52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYxYTA1ZTJjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1RlYW1zLnZ1ZVwiXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL1RlYW1zLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gVGVhbXMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTYxYTA1ZTJjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjFhMDVlMmNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9UZWFtcy52dWVcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1llYXJzLnZ1ZVwiXG4vKiB0ZW1wbGF0ZSAqL1xuaW1wb3J0IF9fdnVlX3RlbXBsYXRlX18gZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGY3ZWM0NGNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vWWVhcnMudnVlXCJcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9ZZWFycy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFllYXJzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00ZjdlYzQ0Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTRmN2VjNDRjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvWWVhcnMudnVlXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJyYWNlc1wiXG4gIH0sIFtfYygnaDEnLCBbX3ZtLl92KFwiUmFjZXMg4oCUIFwiICsgX3ZtLl9zKF92bS55ZWFyKSArIFwiIFNlYXNvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCAoX3ZtLmxvYWRpbmcpID8gX2MoJ2RpdicsIFtfdm0uX3YoXCJMb2FkaW5nLi4uXCIpXSkgOiAoX3ZtLmVycm9yKSA/IF9jKCdkaXYnLCBbX3ZtLl92KFwiQW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyByYWNlIGRhdGEgaXMgYXZhaWxhYmxlLlwiKV0pIDogX2MoJ3RhYmxlJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlIHRhYmxlLXN0cmlwZWRcIlxuICB9LCBbX3ZtLl9tKDApLCBfdm0uX3YoXCIgXCIpLCBfYygndGJvZHknLCBfdm0uX2woKF92bS5yYWNlcyksIGZ1bmN0aW9uKHJhY2UpIHtcbiAgICByZXR1cm4gX2MoJ3RyJywgW19jKCd0ZCcsIFtfYygncm91dGVyLWxpbmsnLCB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcInRvXCI6ICcvcmFjZXMvJyArIHJhY2Uucm91bmRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhyYWNlLnJhY2VOYW1lKSldKV0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHJhY2UuZGF0ZSkpXSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHJhY2UuQ2lyY3VpdC5jaXJjdWl0TmFtZSkpXSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHJhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sb2NhbGl0eSkgKyBcIiwgXCIgKyBfdm0uX3MocmFjZS5DaXJjdWl0LkxvY2F0aW9uLmNvdW50cnkpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0b1wiOiAnL2RyaXZlcnMvJyArIHJhY2UuUmVzdWx0c1swXS5Ecml2ZXIuZHJpdmVySWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhyYWNlLlJlc3VsdHNbMF0uRHJpdmVyLmdpdmVuTmFtZSkgKyBcIiBcIiArIF92bS5fcyhyYWNlLlJlc3VsdHNbMF0uRHJpdmVyLmZhbWlseU5hbWUpKV0pXSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy90ZWFtcy8nICsgcmFjZS5SZXN1bHRzWzBdLkNvbnN0cnVjdG9yLmNvbnN0cnVjdG9ySWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhyYWNlLlJlc3VsdHNbMF0uQ29uc3RydWN0b3IubmFtZSkpXSldKV0sIDEpXSlcbiAgfSkpXSldKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygndGhlYWQnLCBbX2MoJ3RyJywgW19jKCd0aCcsIFtfdm0uX3YoXCJOYW1lXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJEYXRlXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJDaXJjdWl0XCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJMb2NhdGlvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGgnLCBbX3ZtLl92KFwiV2lubmluZyBEcml2ZXJcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIldpbm5pbmcgVGVhbVwiKV0pXSldKVxufV1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxudmFyIGVzRXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmV4cG9ydCBkZWZhdWx0IGVzRXhwb3J0c1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMTQ4ZjAzOTBcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMTQ4ZjAzOTBcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc3JjL2NvbXBvbmVudHMvUmFjZXMudnVlXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIFsoX3ZtLmxvYWRpbmcpID8gX2MoJ2RpdicsIFtfdm0uX3YoXCJMb2FkaW5nLi4uXCIpXSkgOiAoX3ZtLmVycm9yKSA/IF9jKCdkaXYnLCBbX3ZtLl92KFwiQW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyBkcml2ZXIgZGF0YSBpcyBhdmFpbGFibGUuXCIpXSkgOiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImRyaXZlclwiXG4gIH0sIFtfYygnaDEnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiZHJpdmVyLW5hbWVcIlxuICB9LCBbX3ZtLl92KF92bS5fcyhfdm0uZHJpdmVyLkRyaXZlci5naXZlbk5hbWUpICsgXCLCoFwiICsgX3ZtLl9zKF92bS5kcml2ZXIuRHJpdmVyLmZhbWlseU5hbWUpICsgXCIg4oCUIFwiICsgX3ZtLl9zKF92bS55ZWFyKSArIFwiIFNlYXNvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncCcsIFtfYygnc3Ryb25nJywgW192bS5fdihcIk5hdGlvbmFsaXR5OlwiKV0pLCBfdm0uX3YoXCIgXCIgKyBfdm0uX3MoX3ZtLmRyaXZlci5Ecml2ZXIubmF0aW9uYWxpdHkpICsgXCIgXCIpLCBfYygnYnInKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3N0cm9uZycsIFtfdm0uX3YoXCJUZWFtczpcIildKSwgX3ZtLl92KFwiIFwiKSwgX3ZtLl9sKChfdm0uZHJpdmVyLkNvbnN0cnVjdG9ycyksIGZ1bmN0aW9uKHRlYW0sIGluZGV4KSB7XG4gICAgcmV0dXJuIF9jKCdzcGFuJywgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy90ZWFtcy8nICsgdGVhbS5jb25zdHJ1Y3RvcklkXG4gICAgICB9XG4gICAgfSwgW19jKCdhJywgW192bS5fdihfdm0uX3ModGVhbS5uYW1lKSldKV0pLCAoaW5kZXggKyAxIDwgX3ZtLmRyaXZlci5Db25zdHJ1Y3RvcnMubGVuZ3RoKSA/IF9jKCdzcGFuJywgW192bS5fdihcIiwgXCIpXSkgOiBfdm0uX2UoKV0sIDEpXG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnYnInKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3N0cm9uZycsIFtfdm0uX3YoXCJCaXJ0aGRheTpcIildKSwgX3ZtLl92KFwiIFwiICsgX3ZtLl9zKF92bS5kcml2ZXIuRHJpdmVyLmRhdGVPZkJpcnRoKSArIFwiIFwiKSwgX2MoJ2JyJyldLCAyKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3AnLCBbX2MoJ2EnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaHJlZlwiOiBfdm0uZHJpdmVyLkRyaXZlci51cmwsXG4gICAgICBcInRhcmdldFwiOiBcIl9ibGFua1wiXG4gICAgfVxuICB9LCBbX3ZtLl92KFwiV2lraXBlZGlhIEJpb1wiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd1bCcsIFtfYygnbGknLCBbX2MoJ3N0cm9uZycsIFtfdm0uX3YoX3ZtLl9zKF92bS55ZWFyKSArIFwiIFdpbnM6XCIpXSksIF92bS5fdihcIiBcIiArIF92bS5fcyhfdm0uZHJpdmVyLndpbnMpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnbGknLCBbX2MoJ3N0cm9uZycsIFtfdm0uX3YoXCJQb2ludHM6XCIpXSksIF92bS5fdihcIiBcIiArIF92bS5fcyhfdm0uZHJpdmVyLnBvaW50cykpXSksIF92bS5fdihcIiBcIiksIF9jKCdsaScsIFtfYygnc3Ryb25nJywgW192bS5fdihcIldEQyBQb3NpdGlvbjpcIildKSwgX3ZtLl92KFwiIFwiICsgX3ZtLl9zKF92bS5kcml2ZXIucG9zaXRpb24pKV0pXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIFtfYygnaDInLCBbX3ZtLl92KFwiUmVzdWx0c1wiKV0pLCBfdm0uX3YoXCIgXCIpLCAoX3ZtLmxvYWRpbmdSYWNlcykgPyBfYygnZGl2JywgW192bS5fdihcIkxvYWRpbmcgcmFjZSBkYXRhLi4uXCIpXSkgOiAoX3ZtLmVycm9yUmFjZXMpID8gX2MoJ2RpdicsIFtfdm0uX3YoXCJBbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIHJhY2UgZGF0YSBpcyBhdmFpbGFibGUuXCIpXSkgOiBfYygnZGl2JywgW19jKCd0YWJsZScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0YWJsZVwiXG4gIH0sIFtfdm0uX20oMCksIF92bS5fdihcIiBcIiksIF9jKCd0Ym9keScsIF92bS5fbCgoX3ZtLnJhY2VzKSwgZnVuY3Rpb24ocmFjZSkge1xuICAgIHJldHVybiBfYygndHInLCB7XG4gICAgICBjbGFzczoge1xuICAgICAgICAnc3VjY2Vzcyc6IHJhY2UuUmVzdWx0c1swXS5wb3NpdGlvbiA9PT0gJzEnXG4gICAgICB9XG4gICAgfSwgW19jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHJhY2Uucm91bmQpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0b1wiOiAnL3JhY2VzLycgKyByYWNlLnJvdW5kXG4gICAgICB9XG4gICAgfSwgW19jKCdhJywgW192bS5fdihfdm0uX3MocmFjZS5yYWNlTmFtZSkpXSldKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0b1wiOiAnL3RlYW1zLycgKyByYWNlLlJlc3VsdHNbMF0uQ29uc3RydWN0b3IuY29uc3RydWN0b3JJZFxuICAgICAgfVxuICAgIH0sIFtfYygnYScsIFtfdm0uX3YoX3ZtLl9zKHJhY2UuUmVzdWx0c1swXS5Db25zdHJ1Y3Rvci5uYW1lKSldKV0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHJhY2UuUmVzdWx0c1swXS5ncmlkKSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywgW192bS5fdihfdm0uX3MocmFjZS5SZXN1bHRzWzBdLnBvc2l0aW9uKSldKV0pXG4gIH0pKV0pXSldKV0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW2Z1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCd0aGVhZCcsIFtfYygndHInLCBbX2MoJ3RoJywgW192bS5fdihcIlJvdW5kXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJHcmFuZCBQcml4XCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJUZWFtXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJRdWFsaWZpZWRcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIkZpbmlzaGVkXCIpXSldKV0pXG59XVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG52YXIgZXNFeHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuZXhwb3J0IGRlZmF1bHQgZXNFeHBvcnRzXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0xYzI5MjVhMlwiLCBlc0V4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0xYzI5MjVhMlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvY29tcG9uZW50cy9Ecml2ZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gKF92bS5sb2FkaW5nKSA/IF9jKCdkaXYnLCBbX3ZtLl92KFwiTG9hZGluZy4uLlwiKV0pIDogKF92bS5lcnJvcikgPyBfYygnZGl2JywgW192bS5fdihcIkFuIGVycm9yIGhhcyBvY2N1cnJlZC4gTm8gcmFjZSBkYXRhIGlzIGF2YWlsYWJsZS5cIildKSA6IF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicmFjZVwiXG4gIH0sIFtfYygnaDEnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicmFjZS1uYW1lXCJcbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLnJhY2UucmFjZU5hbWUpICsgXCIg4oCUIFwiICsgX3ZtLl9zKF92bS55ZWFyKSArIFwiIFNlYXNvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncCcsIFtfYygnc3Ryb25nJywgW192bS5fdihcIkRhdGU6XCIpXSksIF92bS5fdihcIiBcIiArIF92bS5fcyhfdm0ucmFjZS5kYXRlKSArIFwiIFwiKSwgX2MoJ2JyJyksIF92bS5fdihcIiBcIiksIF9jKCdzdHJvbmcnLCBbX3ZtLl92KFwiQ2lyY3VpdDpcIildKSwgX3ZtLl92KFwiIFwiICsgX3ZtLl9zKF92bS5yYWNlLkNpcmN1aXQuY2lyY3VpdE5hbWUpICsgXCIgXCIpLCBfYygnYnInKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3N0cm9uZycsIFtfdm0uX3YoXCJMb2NhdGlvbjpcIildKSwgX3ZtLl92KFwiIFwiICsgX3ZtLl9zKF92bS5yYWNlLkNpcmN1aXQuTG9jYXRpb24ubG9jYWxpdHkpICsgXCIsIFwiICsgX3ZtLl9zKF92bS5yYWNlLkNpcmN1aXQuTG9jYXRpb24uY291bnRyeSkgKyBcIlxcbiAgICBcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3AnLCBbX2MoJ2EnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaHJlZlwiOiBfdm0ucmFjZS51cmwsXG4gICAgICBcInRhcmdldFwiOiBcIl9ibGFua1wiXG4gICAgfVxuICB9LCBbX3ZtLl92KFwiUmFjZSBXaWtpcGVkaWEgQmlvXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdhJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdFwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcImhyZWZcIjogX3ZtLnJhY2UuQ2lyY3VpdC51cmwsXG4gICAgICBcInRhcmdldFwiOiBcIl9ibGFua1wiXG4gICAgfVxuICB9LCBbX3ZtLl92KFwiQ2lyY3VpdCBXaWtpcGVkaWEgQmlvXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdhJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdFwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcImhyZWZcIjogKFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9XCIgKyAoX3ZtLnJhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sYXQpICsgXCIsXCIgKyAoX3ZtLnJhY2UuQ2lyY3VpdC5Mb2NhdGlvbi5sb25nKSksXG4gICAgICBcInRhcmdldFwiOiBcIl9ibGFua1wiXG4gICAgfVxuICB9LCBbX3ZtLl92KFwiVmlldyBvbiBHb29nbGUgTWFwc1wiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCdoMicsIFtfdm0uX3YoXCJSZXN1bHRzXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0YWJsZScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCJcbiAgfSwgW192bS5fbSgwKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3Rib2R5JywgX3ZtLl9sKChfdm0ucmFjZS5SZXN1bHRzKSwgZnVuY3Rpb24oZHJpdmVyKSB7XG4gICAgcmV0dXJuIF9jKCd0cicsIFtfYygndGQnLCBbX3ZtLl92KF92bS5fcyhkcml2ZXIucG9zaXRpb24pKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0b1wiOiAnL2RyaXZlcnMvJyArIGRyaXZlci5Ecml2ZXIuZHJpdmVySWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhkcml2ZXIuRHJpdmVyLmdpdmVuTmFtZSkgKyBcIiBcIiArIF92bS5fcyhkcml2ZXIuRHJpdmVyLmZhbWlseU5hbWUpKV0pXSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy90ZWFtcy8nICsgZHJpdmVyLkNvbnN0cnVjdG9yLmNvbnN0cnVjdG9ySWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhkcml2ZXIuQ29uc3RydWN0b3IubmFtZSkpXSldKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX3ZtLl92KF92bS5fcyhkcml2ZXIuZ3JpZCkpXSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKGRyaXZlci5sYXBzKSArIFwiIGxhcHMg4oCTIFwiICsgX3ZtLl9zKGRyaXZlci5zdGF0dXMpKV0pXSlcbiAgfSkpXSldKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygndGhlYWQnLCBbX2MoJ3RyJywgW19jKCd0aCcsIFtfdm0uX3YoXCJQb3NpdGlvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGgnLCBbX3ZtLl92KFwiRHJpdmVyXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJUZWFtXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJRdWFsaWZpZWRcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIlN0YXR1c1wiKV0pXSldKVxufV1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxudmFyIGVzRXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmV4cG9ydCBkZWZhdWx0IGVzRXhwb3J0c1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMjFlZWE3NmFcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMjFlZWE3NmFcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc3JjL2NvbXBvbmVudHMvUmFjZS52dWVcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInllYXJzIGZvcm0taW5saW5lXCJcbiAgfSwgW19jKCdsYWJlbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJmb3JcIjogXCJ5ZWFyLXNlbGVjdFwiXG4gICAgfVxuICB9LCBbX3ZtLl92KFwiWWVhcjpcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NlbGVjdCcsIHtcbiAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICB2YWx1ZTogKF92bS55ZWFyKSxcbiAgICAgIGV4cHJlc3Npb246IFwieWVhclwiXG4gICAgfV0sXG4gICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaWRcIjogXCJ5ZWFyLXNlbGVjdFwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjaGFuZ2VcIjogW2Z1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB2YXIgJCRzZWxlY3RlZFZhbCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCgkZXZlbnQudGFyZ2V0Lm9wdGlvbnMsIGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5zZWxlY3RlZFxuICAgICAgICB9KS5tYXAoZnVuY3Rpb24obykge1xuICAgICAgICAgIHZhciB2YWwgPSBcIl92YWx1ZVwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICB9KTtcbiAgICAgICAgX3ZtLnllYXIgPSAkZXZlbnQudGFyZ2V0Lm11bHRpcGxlID8gJCRzZWxlY3RlZFZhbCA6ICQkc2VsZWN0ZWRWYWxbMF1cbiAgICAgIH0sIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0udXBkYXRlWWVhcigkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgfV1cbiAgICB9XG4gIH0sIF92bS5fbCgoX3ZtLnllYXJzKSwgZnVuY3Rpb24oeWVhclZhbHVlKSB7XG4gICAgcmV0dXJuIF9jKCdvcHRpb24nLCB7XG4gICAgICBkb21Qcm9wczoge1xuICAgICAgICBcInZhbHVlXCI6IHllYXJWYWx1ZVxuICAgICAgfVxuICAgIH0sIFtfdm0uX3YoX3ZtLl9zKHllYXJWYWx1ZSkpXSlcbiAgfSkpXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG52YXIgZXNFeHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuZXhwb3J0IGRlZmF1bHQgZXNFeHBvcnRzXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00ZjdlYzQ0Y1wiLCBlc0V4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00ZjdlYzQ0Y1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvY29tcG9uZW50cy9ZZWFycy52dWVcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRlYW1zXCJcbiAgfSwgW19jKCdoMScsIFtfdm0uX3YoXCJUZWFtcyDigJQgXCIgKyBfdm0uX3MoX3ZtLnllYXIpICsgXCIgU2Vhc29uXCIpXSksIF92bS5fdihcIiBcIiksIChfdm0ubG9hZGluZykgPyBfYygnZGl2JywgW192bS5fdihcIkxvYWRpbmcuLi5cIildKSA6IChfdm0uZXJyb3IpID8gX2MoJ2RpdicsIFtfdm0uX3YoXCJBbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIHRlYW0gZGF0YSBpcyBhdmFpbGFibGUuXCIpXSkgOiBfYygndGFibGUnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGFibGUgdGFibGUtc3RyaXBlZFwiXG4gIH0sIFtfdm0uX20oMCksIF92bS5fdihcIiBcIiksIF9jKCd0Ym9keScsIF92bS5fbCgoX3ZtLnRlYW1zKSwgZnVuY3Rpb24odGVhbSkge1xuICAgIHJldHVybiBfYygndHInLCBbX2MoJ3RkJywgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy90ZWFtcy8nICsgdGVhbS5Db25zdHJ1Y3Rvci5jb25zdHJ1Y3RvcklkXG4gICAgICB9XG4gICAgfSwgW19jKCdhJywgW192bS5fdihfdm0uX3ModGVhbS5Db25zdHJ1Y3Rvci5uYW1lKSldKV0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHRlYW0uQ29uc3RydWN0b3IubmF0aW9uYWxpdHkpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX3ZtLl92KF92bS5fcyh0ZWFtLnBvaW50cykpXSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKHRlYW0ud2lucykpXSldKVxuICB9KSldKV0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW2Z1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCd0aGVhZCcsIFtfYygndHInLCBbX2MoJ3RoJywgW192bS5fdihcIk5hbWVcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIk5hdGlvbmFsaXR5XCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJQb2ludHNcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIldpbnNcIildKV0pXSlcbn1dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTYxYTA1ZTJjXCIsIGVzRXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYxYTA1ZTJjXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3NyYy9jb21wb25lbnRzL1RlYW1zLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiZHJpdmVyc1wiXG4gIH0sIFtfYygnaDEnLCBbX3ZtLl92KFwiRHJpdmVycyDigJQgXCIgKyBfdm0uX3MoX3ZtLnllYXIpICsgXCIgU2Vhc29uXCIpXSksIF92bS5fdihcIiBcIiksIChfdm0ubG9hZGluZykgPyBfYygnZGl2JywgW192bS5fdihcIkxvYWRpbmcuLi5cIildKSA6IChfdm0uZXJyb3IpID8gX2MoJ2RpdicsIFtfdm0uX3YoXCJBbiBlcnJvciBoYXMgb2NjdXJyZWQuIE5vIGRyaXZlciBkYXRhIGlzIGF2YWlsYWJsZS5cIildKSA6IF9jKCd0YWJsZScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCJcbiAgfSwgW19jKCd0aGVhZCcsIFtfYygndHInLCBbX2MoJ3RoJywge1xuICAgIGNsYXNzOiB7XG4gICAgICAnYWN0aXZlJzogX3ZtLnNvcnQgPT09ICdmYW1pbHlOYW1lJ1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5zb3J0RHJpdmVycygnZmFtaWx5TmFtZScpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwiTmFtZSBcIiksIChfdm0uc29ydCA9PT0gJ2ZhbWlseU5hbWUnKSA/IF9jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhcmV0XCIsXG4gICAgY2xhc3M6IHtcbiAgICAgICdyZXZlcnNlZCc6IF92bS5yZXZlcnNlZFxuICAgIH1cbiAgfSkgOiBfdm0uX2UoKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGgnLCB7XG4gICAgY2xhc3M6IHtcbiAgICAgICdhY3RpdmUnOiBfdm0uc29ydCA9PT0gJ0NvbnN0cnVjdG9ycydcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0uc29ydERyaXZlcnMoJ0NvbnN0cnVjdG9ycycpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwiVGVhbXMgXCIpLCAoX3ZtLnNvcnQgPT09ICdDb25zdHJ1Y3RvcnMnKSA/IF9jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhcmV0XCIsXG4gICAgY2xhc3M6IHtcbiAgICAgICdyZXZlcnNlZCc6IF92bS5yZXZlcnNlZFxuICAgIH1cbiAgfSkgOiBfdm0uX2UoKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGgnLCB7XG4gICAgY2xhc3M6IHtcbiAgICAgICdhY3RpdmUnOiBfdm0uc29ydCA9PT0gJ25hdGlvbmFsaXR5J1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5zb3J0RHJpdmVycygnbmF0aW9uYWxpdHknKVxuICAgICAgfVxuICAgIH1cbiAgfSwgW192bS5fdihcIk5hdGlvbmFsaXR5IFwiKSwgKF92bS5zb3J0ID09PSAnbmF0aW9uYWxpdHknKSA/IF9jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhcmV0XCIsXG4gICAgY2xhc3M6IHtcbiAgICAgICdyZXZlcnNlZCc6IF92bS5yZXZlcnNlZFxuICAgIH1cbiAgfSkgOiBfdm0uX2UoKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGgnLCB7XG4gICAgY2xhc3M6IHtcbiAgICAgICdhY3RpdmUnOiBfdm0uc29ydCA9PT0gJ3BvaW50cydcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0uc29ydERyaXZlcnMoJ3BvaW50cycpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwiUG9pbnRzIFwiKSwgKF92bS5zb3J0ID09PSAncG9pbnRzJykgPyBfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjYXJldFwiLFxuICAgIGNsYXNzOiB7XG4gICAgICAncmV2ZXJzZWQnOiBfdm0ucmV2ZXJzZWRcbiAgICB9XG4gIH0pIDogX3ZtLl9lKCldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywge1xuICAgIGNsYXNzOiB7XG4gICAgICAnYWN0aXZlJzogX3ZtLnNvcnQgPT09ICd3aW5zJ1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5zb3J0RHJpdmVycygnd2lucycpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwiV2lucyBcIiksIChfdm0uc29ydCA9PT0gJ3dpbnMnKSA/IF9jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhcmV0XCIsXG4gICAgY2xhc3M6IHtcbiAgICAgICdyZXZlcnNlZCc6IF92bS5yZXZlcnNlZFxuICAgIH1cbiAgfSkgOiBfdm0uX2UoKV0pXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3Rib2R5JywgX3ZtLl9sKChfdm0uZHJpdmVycyksIGZ1bmN0aW9uKGRyaXZlcikge1xuICAgIHJldHVybiBfYygndHInLCBbX2MoJ3RkJywgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy9kcml2ZXJzLycgKyBkcml2ZXIuRHJpdmVyLmRyaXZlcklkXG4gICAgICB9XG4gICAgfSwgW19jKCdhJywgW192bS5fdihfdm0uX3MoZHJpdmVyLkRyaXZlci5naXZlbk5hbWUgKyAnICcgKyBkcml2ZXIuRHJpdmVyLmZhbWlseU5hbWUpKV0pXSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywgX3ZtLl9sKChkcml2ZXIuQ29uc3RydWN0b3JzKSwgZnVuY3Rpb24odGVhbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBfYygnc3BhbicsIFtfYygncm91dGVyLWxpbmsnLCB7XG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgXCJ0b1wiOiAnL3RlYW1zLycgKyBfdm0ueWVhciArICcvJyArIHRlYW0uY29uc3RydWN0b3JJZFxuICAgICAgICB9XG4gICAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyh0ZWFtLm5hbWUpKV0pXSksIChpbmRleCArIDEgPCBkcml2ZXIuQ29uc3RydWN0b3JzLmxlbmd0aCkgPyBfYygnc3BhbicsIFtfdm0uX3YoXCIsIFwiKV0pIDogX3ZtLl9lKCldLCAxKVxuICAgIH0pKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywgW192bS5fdihfdm0uX3MoZHJpdmVyLkRyaXZlci5uYXRpb25hbGl0eSkpXSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIFtfdm0uX3YoX3ZtLl9zKGRyaXZlci5wb2ludHMpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX3ZtLl92KF92bS5fcyhkcml2ZXIud2lucykpXSldKVxuICB9KSldKV0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxudmFyIGVzRXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmV4cG9ydCBkZWZhdWx0IGVzRXhwb3J0c1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNmNhNzJmYzFcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNmNhNzJmYzFcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvY29tcG9uZW50cy9Ecml2ZXJzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaWRcIjogXCJhcHBcIlxuICAgIH1cbiAgfSwgW19jKCduYXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibmF2YmFyIG5hdmJhci1kZWZhdWx0XCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyXCJcbiAgfSwgW192bS5fbSgwKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJpZFwiOiBcIm5hdmJhclwiXG4gICAgfVxuICB9LCBbX2MoJ3VsJywge1xuICAgIHN0YXRpY0NsYXNzOiBcIm5hdiBuYXZiYXItbmF2XCJcbiAgfSwgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0YWdcIjogXCJsaVwiLFxuICAgICAgXCJ0b1wiOiBcIi90ZWFtc1wiLFxuICAgICAgXCJleGFjdC1hY3RpdmUtY2xhc3NcIjogXCJhY3RpdmVcIixcbiAgICAgIFwiYWN0aXZlLWNsYXNzXCI6IFwiYWN0aXZlXCJcbiAgICB9XG4gIH0sIFtfYygnYScsIFtfdm0uX3YoXCJUZWFtc1wiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCdyb3V0ZXItbGluaycsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0YWdcIjogXCJsaVwiLFxuICAgICAgXCJ0b1wiOiBcIi9kcml2ZXJzXCIsXG4gICAgICBcImV4YWN0LWFjdGl2ZS1jbGFzc1wiOiBcImFjdGl2ZVwiLFxuICAgICAgXCJhY3RpdmUtY2xhc3NcIjogXCJhY3RpdmVcIlxuICAgIH1cbiAgfSwgW19jKCdhJywgW192bS5fdihcIkRyaXZlcnNcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncm91dGVyLWxpbmsnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidGFnXCI6IFwibGlcIixcbiAgICAgIFwidG9cIjogXCIvcmFjZXNcIixcbiAgICAgIFwiZXhhY3QtYWN0aXZlLWNsYXNzXCI6IFwiYWN0aXZlXCIsXG4gICAgICBcImFjdGl2ZS1jbGFzc1wiOiBcImFjdGl2ZVwiXG4gICAgfVxuICB9LCBbX2MoJ2EnLCBbX3ZtLl92KFwiUmFjZXNcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnbGknLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibmF2YmFyLWZvcm1cIlxuICB9LCBbX2MoJ3llYXJzJywge1xuICAgIG9uOiB7XG4gICAgICBcInVwZGF0ZVwiOiBfdm0udXBkYXRlWWVhclxuICAgIH1cbiAgfSldLCAxKV0sIDEpXSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnbWFpbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjb250YWluZXJcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJpZFwiOiBcIm1haW5cIlxuICAgIH1cbiAgfSwgW19jKCdyb3V0ZXItdmlldycsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ5ZWFyXCI6IF92bS55ZWFyXG4gICAgfVxuICB9KV0sIDEpXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJuYXZiYXItaGVhZGVyXCJcbiAgfSwgW19jKCdidXR0b24nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibmF2YmFyLXRvZ2dsZSBjb2xsYXBzZWRcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCIsXG4gICAgICBcImRhdGEtdG9nZ2xlXCI6IFwiY29sbGFwc2VcIixcbiAgICAgIFwiZGF0YS10YXJnZXRcIjogXCIjbmF2YmFyXCIsXG4gICAgICBcImFyaWEtZXhwYW5kZWRcIjogXCJmYWxzZVwiXG4gICAgfVxuICB9LCBbX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwic3Itb25seVwiXG4gIH0sIFtfdm0uX3YoXCJUb2dnbGUgbmF2aWdhdGlvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uLWJhclwiXG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uLWJhclwiXG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uLWJhclwiXG4gIH0pXSksIF92bS5fdihcIiBcIiksIF9jKCdhJywge1xuICAgIHN0YXRpY0NsYXNzOiBcIm5hdmJhci1icmFuZFwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcImhyZWZcIjogXCIjXCJcbiAgICB9XG4gIH0sIFtfdm0uX3YoXCJGMSBEYXRhIEFwcFwiKV0pXSlcbn1dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWE0ZWVmM2ZjXCIsIGVzRXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWE0ZWVmM2ZjXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3NyYy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIFsoX3ZtLmxvYWRpbmcpID8gX2MoJ2RpdicsIFtfdm0uX3YoXCJMb2FkaW5nLi4uXCIpXSkgOiAoX3ZtLmVycm9yKSA/IF9jKCdkaXYnLCBbX3ZtLl92KFwiQW4gZXJyb3IgaGFzIG9jY3VycmVkLiBObyB0ZWFtIGRhdGEgaXMgYXZhaWxhYmxlLlwiKV0pIDogX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZWFtXCJcbiAgfSwgW19jKCdoMScsIFtfdm0uX3YoX3ZtLl9zKF92bS50ZWFtLkNvbnN0cnVjdG9yLm5hbWUpICsgXCIg4oCUIFwiICsgX3ZtLl9zKF92bS55ZWFyKSArIFwiIFNlYXNvblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncCcsIFtfYygnc3Ryb25nJywgW192bS5fdihcIk5hdGlvbmFsaXR5OlwiKV0pLCBfdm0uX3YoXCIgXCIgKyBfdm0uX3MoX3ZtLnRlYW0uQ29uc3RydWN0b3IubmF0aW9uYWxpdHkpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncCcsIFtfYygnYScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWRlZmF1bHRcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJocmVmXCI6IF92bS50ZWFtLkNvbnN0cnVjdG9yLnVybCxcbiAgICAgIFwidGFyZ2V0XCI6IFwiX2JsYW5rXCJcbiAgICB9XG4gIH0sIFtfdm0uX3YoXCJXaWtpcGVkaWEgQmlvXCIpXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3VsJywgW19jKCdsaScsIFtfdm0uX3YoX3ZtLl9zKF92bS55ZWFyKSArIFwiIFdpbnM6IFwiICsgX3ZtLl9zKF92bS50ZWFtLndpbnMpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnbGknLCBbX3ZtLl92KFwiUG9pbnRzOiBcIiArIF92bS5fcyhfdm0udGVhbS5wb2ludHMpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnbGknLCBbX3ZtLl92KFwiV0NDIFBvc2l0aW9uOiBcIiArIF92bS5fcyhfdm0udGVhbS5wb3NpdGlvbikpXSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2JywgW19jKCdoMicsIFtfdm0uX3YoXCJSZXN1bHRzXCIpXSksIF92bS5fdihcIiBcIiksIChfdm0ubG9hZGluZ1JhY2VzKSA/IF9jKCdkaXYnLCBbX3ZtLl92KFwiTG9hZGluZyByYWNlIGRhdGEuLi5cIildKSA6IChfdm0uZXJyb3JSYWNlcykgPyBfYygnZGl2JywgW192bS5fdihcIkFuIGVycm9yIGhhcyBvY2N1cnJlZC4gTm8gcmFjZSBkYXRhIGlzIGF2YWlsYWJsZS5cIildKSA6IF9jKCdkaXYnLCBbX2MoJ3RhYmxlJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlXCJcbiAgfSwgW192bS5fbSgwKSwgX3ZtLl92KFwiIFwiKSwgX3ZtLl9sKChfdm0ucmFjZXMpLCBmdW5jdGlvbihyYWNlKSB7XG4gICAgcmV0dXJuIF9jKCd0Ym9keScsIFtfYygndHInLCBbX2MoJ3RkJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwidGFsbC1jb2xcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwicm93c3BhblwiOiBcIjJcIlxuICAgICAgfVxuICAgIH0sIFtfYygncm91dGVyLWxpbmsnLCB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcInRvXCI6ICcvcmFjZXMvJyArIHJhY2Uucm91bmRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhyYWNlLnJhY2VOYW1lKSldKV0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInRhbGwtY29sXCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcInJvd3NwYW5cIjogXCIyXCJcbiAgICAgIH1cbiAgICB9LCBbX3ZtLl92KF92bS5fcyhyYWNlLkNpcmN1aXQuTG9jYXRpb24ubG9jYWxpdHkgKyAnLCAnICsgcmFjZS5DaXJjdWl0LkxvY2F0aW9uLmNvdW50cnkpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ0YWxsLWNvbFwiLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJyb3dzcGFuXCI6IFwiMlwiXG4gICAgICB9XG4gICAgfSwgW192bS5fdihfdm0uX3MocmFjZS5kYXRlKSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwiYWN0aXZlXCJcbiAgICB9LCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0b1wiOiAnL2RyaXZlcnMvJyArIHJhY2UuUmVzdWx0c1swXS5Ecml2ZXIuZHJpdmVySWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhyYWNlLlJlc3VsdHNbMF0uRHJpdmVyLmdpdmVuTmFtZSArICcgJyArIHJhY2UuUmVzdWx0c1swXS5Ecml2ZXIuZmFtaWx5TmFtZSkpXSldKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJhY3RpdmVcIlxuICAgIH0sIFtfdm0uX3YoX3ZtLl9zKHJhY2UuUmVzdWx0c1swXS5ncmlkKSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RkJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwiYWN0aXZlXCIsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnc3VjY2Vzcyc6IHJhY2UuUmVzdWx0c1swXS5wb3NpdGlvbiA9PT0gJzEnXG4gICAgICB9XG4gICAgfSwgW192bS5fdihfdm0uX3MocmFjZS5SZXN1bHRzWzBdLnBvc2l0aW9uKSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndHInLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJhY3RpdmVcIlxuICAgIH0sIFtfYygndGQnLCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0b1wiOiAnL2RyaXZlcnMvJyArIHJhY2UuUmVzdWx0c1sxXS5Ecml2ZXIuZHJpdmVySWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2EnLCBbX3ZtLl92KF92bS5fcyhyYWNlLlJlc3VsdHNbMV0uRHJpdmVyLmdpdmVuTmFtZSArICcgJyArIHJhY2UuUmVzdWx0c1sxXS5Ecml2ZXIuZmFtaWx5TmFtZSkpXSldKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygndGQnLCBbX3ZtLl92KF92bS5fcyhyYWNlLlJlc3VsdHNbMV0uZ3JpZCkpXSksIF92bS5fdihcIiBcIiksIF9jKCd0ZCcsIHtcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdzdWNjZXNzJzogcmFjZS5SZXN1bHRzWzFdLnBvc2l0aW9uID09PSAnMSdcbiAgICAgIH1cbiAgICB9LCBbX3ZtLl92KF92bS5fcyhyYWNlLlJlc3VsdHNbMV0ucG9zaXRpb24pKV0pXSldKVxuICB9KV0sIDIpXSldKV0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW2Z1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCd0aGVhZCcsIFtfYygndHInLCBbX2MoJ3RoJywgW192bS5fdihcIlJhY2VcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIkxvY2F0aW9uXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJEYXRlXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCd0aCcsIFtfdm0uX3YoXCJEcml2ZXJcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3RoJywgW192bS5fdihcIlF1YWxpZmllZFwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndGgnLCBbX3ZtLl92KFwiRmluaXNoZWRcIildKV0pXSlcbn1dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWUxMmEwNDUyXCIsIGVzRXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWUxMmEwNDUyXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3NyYy9jb21wb25lbnRzL1RlYW0udnVlXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMWMyOTI1YTJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0RyaXZlci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImJkNzlkZDAwXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTFjMjkyNWEyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Ecml2ZXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTFjMjkyNWEyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Ecml2ZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTFjMjkyNWEyXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9jb21wb25lbnRzL0RyaXZlci52dWVcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MWEwNWUyY1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVGVhbXMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIzMTJhMjY1OFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MWEwNWUyY1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVGVhbXMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYxYTA1ZTJjXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9UZWFtcy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyIS4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjFhMDVlMmNcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL2NvbXBvbmVudHMvVGVhbXMudnVlXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmNhNzJmYzFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vRHJpdmVycy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjc1NzE0MDEwXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZjYTcyZmMxXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0RyaXZlcnMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZjYTcyZmMxXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0RyaXZlcnMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTZjYTcyZmMxXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL2NvbXBvbmVudHMvRHJpdmVycy52dWVcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1hNGVlZjNmY1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiODVhNWFjZjBcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYTRlZWYzZmNcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYTRlZWYzZmNcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyIS4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYTRlZWYzZmNcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL0FwcC52dWVcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lMTJhMDQ1MlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVGVhbS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjQ4NGUxNDVhXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWUxMmEwNDUyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9UZWFtLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lMTJhMDQ1MlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVGVhbS52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyIS4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZTEyYTA0NTJcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL2NvbXBvbmVudHMvVGVhbS52dWVcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGdvdCAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJ2pxdWVyeS9kaXN0L2pxdWVyeS5taW4uanMnKTtcbnJlcXVpcmUoJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcycpO1xucmVxdWlyZSgnYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwLm1pbi5qcycpO1xuXG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUmVzb3VyY2UgZnJvbSAndnVlLXJlc291cmNlJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcic7XG5cblZ1ZS51c2UoVnVlUmVzb3VyY2UpO1xuXG5uZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIHJvdXRlcixcbiAgICB0ZW1wbGF0ZTogJzxBcHAvPicsXG4gICAgY29tcG9uZW50czogeyBBcHAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiXSwic291cmNlUm9vdCI6IiJ9