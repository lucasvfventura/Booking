define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = "Booking";
            config.map([
                { route: ["", "search"], name: "search", moduleId: "./resources/elements/reservation/search", nav: true, title: "Search your place" },
                { route: "deals", name: "deals", moduleId: "./resources/elements/deals", nav: true, title: "Deals" },
                { route: "aboutus", name: "aboutus", moduleId: "./resources/elements/aboutus", nav: true, title: "About Us" },
                { route: "business", name: "business", moduleId: "./resources/elements/business", nav: true, title: "For Business" }
            ]);
            config.mapUnknownRoutes('./resources/elements/error');
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .plugin('aurelia-validation')
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('models/companyviewmodel',["require", "exports"], function (require, exports) {
    "use strict";
    var CompanyViewModel = (function () {
        function CompanyViewModel() {
        }
        return CompanyViewModel;
    }());
    exports.CompanyViewModel = CompanyViewModel;
});

define('models/registerviewmodel',["require", "exports"], function (require, exports) {
    "use strict";
    var RegisterViewModel = (function () {
        function RegisterViewModel() {
        }
        return RegisterViewModel;
    }());
    exports.RegisterViewModel = RegisterViewModel;
});

define('models/userviewmodel',["require", "exports"], function (require, exports) {
    "use strict";
    var UserViewModel = (function () {
        function UserViewModel() {
        }
        Object.defineProperty(UserViewModel.prototype, "FirstName", {
            get: function () {
                return this.firstName;
            },
            set: function (v) {
                this.firstName = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserViewModel.prototype, "MiddleName", {
            get: function () {
                return this.middleName;
            },
            set: function (v) {
                this.middleName = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserViewModel.prototype, "LastName", {
            get: function () {
                return this.lastName;
            },
            set: function (v) {
                this.lastName = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserViewModel.prototype, "BirthDate", {
            get: function () {
                return this.birthDate;
            },
            set: function (v) {
                this.birthDate = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserViewModel.prototype, "Email", {
            get: function () {
                return this.email;
            },
            set: function (v) {
                this.email = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserViewModel.prototype, "Password", {
            get: function () {
                return this.password;
            },
            set: function (v) {
                this.password = v;
            },
            enumerable: true,
            configurable: true
        });
        return UserViewModel;
    }());
    exports.UserViewModel = UserViewModel;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('services/apiexception',["require", "exports"], function (require, exports) {
    "use strict";
    var ApiException = (function () {
        function ApiException(message) {
            this.message = message;
        }
        Object.defineProperty(ApiException.prototype, "Message", {
            get: function () {
                return this.message;
            },
            enumerable: true,
            configurable: true
        });
        return ApiException;
    }());
    exports.ApiException = ApiException;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/dataservices',["require", "exports", 'aurelia-fetch-client', 'aurelia-framework', './apiexception', 'aurelia-path', 'whatwg-fetch'], function (require, exports, aurelia_fetch_client_1, aurelia_framework_1, apiexception_1, aurelia_path_1) {
    "use strict";
    var DataService = (function () {
        function DataService(client) {
            this.client = client;
            this.client.configure(function (config) {
                config
                    .withBaseUrl('/api/')
                    .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                });
            });
            this.baseUri = "";
        }
        DataService.prototype.setBaseUri = function (baseUri) {
            this.baseUri = baseUri;
        };
        DataService.prototype.get = function (query) {
            if (this.baseUri == "") {
                throw new apiexception_1.ApiException("Base uri must be set before using this method");
            }
            return this.client.fetch(query == null ? this.baseUri : this.baseUri + "?" + aurelia_path_1.buildQueryString(query, true));
        };
        DataService.prototype.getCustomResource = function (resource) {
            if (this.baseUri == "") {
                throw new apiexception_1.ApiException("Base uri must be set before using this method");
            }
            return this.client.fetch(this.baseUri + resource);
        };
        DataService.prototype.post = function (resource) {
            if (this.baseUri == "") {
                throw new apiexception_1.ApiException("Base uri must be set before using this method");
            }
            return this.client.fetch(this.baseUri, { method: "POST", body: aurelia_fetch_client_1.json(resource) });
        };
        DataService.prototype.postCustomResource = function (resourceUri, resource) {
            if (this.baseUri == "") {
                throw new apiexception_1.ApiException("Base uri must be set before using this method");
            }
            return this.client.fetch(this.baseUri + resourceUri, { method: "POST", body: aurelia_fetch_client_1.json(resource) });
        };
        DataService.prototype.delete = function (id) {
            if (this.baseUri == "") {
                throw new apiexception_1.ApiException("Base uri must be set before using this method");
            }
            return this.client.fetch(this.baseUri + ("/" + id), {
                method: "DELETE"
            });
        };
        DataService.prototype.put = function (resource) {
            if (this.baseUri == "") {
                throw new apiexception_1.ApiException("Base uri must be set before using this method");
            }
            return this.client.fetch(this.baseUri, {
                method: "DELETE"
            });
        };
        DataService = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient])
        ], DataService);
        return DataService;
    }());
    exports.DataService = DataService;
});

define('resources/elements/aboutus',["require", "exports"], function (require, exports) {
    "use strict";
    var AboutUs = (function () {
        function AboutUs() {
        }
        return AboutUs;
    }());
    exports.AboutUs = AboutUs;
});

define('resources/elements/business',["require", "exports"], function (require, exports) {
    "use strict";
    var Business = (function () {
        function Business() {
        }
        return Business;
    }());
    exports.Business = Business;
});

define('resources/elements/deals',["require", "exports"], function (require, exports) {
    "use strict";
    var Deals = (function () {
        function Deals() {
        }
        return Deals;
    }());
    exports.Deals = Deals;
});

define('resources/elements/error',["require", "exports"], function (require, exports) {
    "use strict";
    var Error = (function () {
        function Error() {
        }
        return Error;
    }());
    exports.Error = Error;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/login/login-menu',["require", "exports", 'aurelia-router', 'aurelia-framework', 'aurelia-event-aggregator'], function (require, exports, aurelia_router_1, aurelia_framework_1, aurelia_event_aggregator_1) {
    "use strict";
    var LoginMenu = (function () {
        function LoginMenu(eventAggregator) {
            this.eventAggregator = eventAggregator;
            this.subscribeToEvents();
        }
        LoginMenu.prototype.bind = function () {
            this.router.addRoute({ route: "register", name: "register", moduleId: "./resources/elements/login/register", nav: true, title: "Register" });
            this.router.refreshNavigation();
        };
        LoginMenu.prototype.subscribeToEvents = function () {
            var _this = this;
            this.eventAggregator.subscribe('user logged in', function (user) {
                _this.user = user;
            });
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', aurelia_router_1.Router)
        ], LoginMenu.prototype, "router", void 0);
        LoginMenu = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator])
        ], LoginMenu);
        return LoginMenu;
    }());
    exports.LoginMenu = LoginMenu;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/login/register',["require", "exports", '../../../services/dataservices', 'aurelia-framework', '../../../models/registerviewmodel', 'aurelia-validation', 'aurelia-event-aggregator', "bootstrap-daterangepicker"], function (require, exports, dataservices_1, aurelia_framework_1, registerviewmodel_1, aurelia_validation_1, aurelia_event_aggregator_1) {
    "use strict";
    var Register = (function () {
        function Register(dataService, validation, eventAggregator) {
            this.dataService = dataService;
            this.dataService.setBaseUri("account");
            this.validation = validation;
            this.model = new registerviewmodel_1.RegisterViewModel();
            this.eventAggregator = eventAggregator;
            this.setUpValidation();
        }
        Register.prototype.attached = function () {
            var _this = this;
            jQuery("#birthdate").daterangepicker({
                singleDatePicker: true
            }).on("change", function (o) {
                _this.model.birthDate = o.target.value;
            });
        };
        Register.prototype.submit = function () {
            var _this = this;
            this.validation.validate().then(function (errors) {
                if (errors.length == 0) {
                    _this.dataService.post(_this.model)
                        .then(function (r) {
                        _this.eventAggregator.publish('user logged in', r);
                    })
                        .catch(function (error) {
                        alert('Error registering user. Try again in a moment!');
                    });
                }
            });
        };
        Register.prototype.setUpValidation = function () {
            var _this = this;
            aurelia_validation_1.ValidationRules
                .ensure(function (m) { return m.firstName; })
                .required()
                .minLength(2)
                .maxLength(100)
                .ensure(function (m) { return m.middleName; })
                .maxLength(100)
                .ensure(function (m) { return m.lastName; })
                .required()
                .minLength(2)
                .maxLength(100)
                .ensure(function (m) { return m.birthDate; })
                .required()
                .ensure(function (m) { return m.email; })
                .required()
                .email()
                .ensure(function (m) { return m.password; })
                .required()
                .minLength(6)
                .maxLength(100)
                .matches(/[^a-zA-Z\d\s]/).withMessage("Password must contains non-alphanumeric character")
                .matches(/[a-z]/).withMessage("Password must contains at least one lower case character")
                .matches(/[A-Z]/).withMessage("Password must contains at least one upper case character")
                .matches(/[\d]/).withMessage("Password must contains at least one digit")
                .ensure(function (m) { return m.confirmPassword; })
                .required()
                .satisfies(function (value, m) {
                return value == _this.model.password;
            }).withMessage("Passwords do not match.")
                .on(this.model);
        };
        Register = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [dataservices_1.DataService, aurelia_validation_1.ValidationController, aurelia_event_aggregator_1.EventAggregator])
        ], Register);
        return Register;
    }());
    exports.Register = Register;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/reservation/search',["require", "exports", 'aurelia-framework', '../../../services/dataservices'], function (require, exports, aurelia_framework_1, dataservices_1) {
    "use strict";
    var Search = (function () {
        function Search(dataService) {
            this.dataService = dataService;
            this.dataService.setBaseUri('company');
        }
        Search.prototype.attached = function () {
            var _this = this;
            this.dataService.get()
                .then(function (r) { return r.json(); })
                .then(function (r) {
                _this.companies = r;
            });
        };
        Search.prototype.search = function () {
            this.dataService.get(this.expression != null ? { "expression": this.expression } : null)
                .then(function (r) { return r.json(); })
                .then(function (r) { return console.log(r); });
        };
        Search = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [dataservices_1.DataService])
        ], Search);
        return Search;
    }());
    exports.Search = Search;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/ui-components/daterangepicker',["require", "exports", 'aurelia-framework', "bootstrap-daterangepicker"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var DateRangePicker = (function () {
        function DateRangePicker() {
            this.dateRange = Date.now().toLocaleString();
            this.settings = {};
        }
        DateRangePicker.prototype.bind = function () {
            this.settings = {};
        };
        DateRangePicker.prototype.attached = function () {
            var _this = this;
            jQuery("#birthdate").daterangepicker(this.settings).on("change", function (o) {
                _this.dateRange = o.target.value;
            });
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], DateRangePicker.prototype, "dateRange", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], DateRangePicker.prototype, "settings", void 0);
        return DateRangePicker;
    }());
    exports.DateRangePicker = DateRangePicker;
});

define('aurelia-validation/validate-binding-behavior',["require", "exports", 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-task-queue', './validation-controller', './validate-trigger'], function (require, exports, aurelia_dependency_injection_1, aurelia_pal_1, aurelia_task_queue_1, validation_controller_1, validate_trigger_1) {
    "use strict";
    /**
     * Binding behavior. Indicates the bound property should be validated.
     */
    var ValidateBindingBehavior = (function () {
        function ValidateBindingBehavior(taskQueue) {
            this.taskQueue = taskQueue;
        }
        /**
        * Gets the DOM element associated with the data-binding. Most of the time it's
        * the binding.target but sometimes binding.target is an aurelia custom element,
        * or custom attribute which is a javascript "class" instance, so we need to use
        * the controller's container to retrieve the actual DOM element.
        */
        ValidateBindingBehavior.prototype.getTarget = function (binding, view) {
            var target = binding.target;
            // DOM element
            if (target instanceof Element) {
                return target;
            }
            // custom element or custom attribute
            for (var i = 0, ii = view.controllers.length; i < ii; i++) {
                var controller = view.controllers[i];
                if (controller.viewModel === target) {
                    var element = controller.container.get(aurelia_pal_1.DOM.Element);
                    if (element) {
                        return element;
                    }
                    throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
                }
            }
            throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
        };
        ValidateBindingBehavior.prototype.bind = function (binding, source, rulesOrController, rules) {
            var _this = this;
            // identify the target element.
            var target = this.getTarget(binding, source);
            // locate the controller.
            var controller;
            if (rulesOrController instanceof validation_controller_1.ValidationController) {
                controller = rulesOrController;
            }
            else {
                controller = source.container.get(aurelia_dependency_injection_1.Optional.of(validation_controller_1.ValidationController));
                rules = rulesOrController;
            }
            if (controller === null) {
                throw new Error("A ValidationController has not been registered.");
            }
            controller.registerBinding(binding, target, rules);
            binding.validationController = controller;
            if (controller.validateTrigger === validate_trigger_1.validateTrigger.change) {
                binding.standardUpdateSource = binding.updateSource;
                binding.updateSource = function (value) {
                    this.standardUpdateSource(value);
                    this.validationController.validateBinding(this);
                };
            }
            else if (controller.validateTrigger === validate_trigger_1.validateTrigger.blur) {
                binding.validateBlurHandler = function () {
                    _this.taskQueue.queueMicroTask(function () { return controller.validateBinding(binding); });
                };
                binding.validateTarget = target;
                target.addEventListener('blur', binding.validateBlurHandler);
            }
            if (controller.validateTrigger !== validate_trigger_1.validateTrigger.manual) {
                binding.standardUpdateTarget = binding.updateTarget;
                binding.updateTarget = function (value) {
                    this.standardUpdateTarget(value);
                    this.validationController.resetBinding(this);
                };
            }
        };
        ValidateBindingBehavior.prototype.unbind = function (binding) {
            // reset the binding to it's original state.
            if (binding.standardUpdateSource) {
                binding.updateSource = binding.standardUpdateSource;
                binding.standardUpdateSource = null;
            }
            if (binding.standardUpdateTarget) {
                binding.updateTarget = binding.standardUpdateTarget;
                binding.standardUpdateTarget = null;
            }
            if (binding.validateBlurHandler) {
                binding.validateTarget.removeEventListener('blur', binding.validateBlurHandler);
                binding.validateBlurHandler = null;
                binding.validateTarget = null;
            }
            binding.validationController.unregisterBinding(binding);
            binding.validationController = null;
        };
        ValidateBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
        return ValidateBindingBehavior;
    }());
    exports.ValidateBindingBehavior = ValidateBindingBehavior;
});

define('aurelia-validation/validation-controller',["require", "exports", './validator', './validate-trigger', './property-info', './validation-error'], function (require, exports, validator_1, validate_trigger_1, property_info_1, validation_error_1) {
    "use strict";
    /**
     * Orchestrates validation.
     * Manages a set of bindings, renderers and objects.
     * Exposes the current list of validation errors for binding purposes.
     */
    var ValidationController = (function () {
        function ValidationController(validator) {
            this.validator = validator;
            // Registered bindings (via the validate binding behavior)
            this.bindings = new Map();
            // Renderers that have been added to the controller instance.
            this.renderers = [];
            /**
             * Errors that have been rendered by the controller.
             */
            this.errors = [];
            /**
             *  Whether the controller is currently validating.
             */
            this.validating = false;
            // Elements related to errors that have been rendered.
            this.elements = new Map();
            // Objects that have been added to the controller instance (entity-style validation).
            this.objects = new Map();
            /**
             * The trigger that will invoke automatic validation of a property used in a binding.
             */
            this.validateTrigger = validate_trigger_1.validateTrigger.blur;
            // Promise that resolves when validation has completed.
            this.finishValidating = Promise.resolve();
        }
        /**
         * Adds an object to the set of objects that should be validated when validate is called.
         * @param object The object.
         * @param rules Optional. The rules. If rules aren't supplied the Validator implementation will lookup the rules.
         */
        ValidationController.prototype.addObject = function (object, rules) {
            this.objects.set(object, rules);
        };
        /**
         * Removes an object from the set of objects that should be validated when validate is called.
         * @param object The object.
         */
        ValidationController.prototype.removeObject = function (object) {
            this.objects.delete(object);
            this.processErrorDelta('reset', this.errors.filter(function (error) { return error.object === object; }), []);
        };
        /**
         * Adds and renders a ValidationError.
         */
        ValidationController.prototype.addError = function (message, object, propertyName) {
            var error = new validation_error_1.ValidationError({}, message, object, propertyName);
            this.processErrorDelta('validate', [], [error]);
            return error;
        };
        /**
         * Removes and unrenders a ValidationError.
         */
        ValidationController.prototype.removeError = function (error) {
            if (this.errors.indexOf(error) !== -1) {
                this.processErrorDelta('reset', [error], []);
            }
        };
        /**
         * Adds a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.addRenderer = function (renderer) {
            var _this = this;
            this.renderers.push(renderer);
            renderer.render({
                kind: 'validate',
                render: this.errors.map(function (error) { return ({ error: error, elements: _this.elements.get(error) }); }),
                unrender: []
            });
        };
        /**
         * Removes a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.removeRenderer = function (renderer) {
            var _this = this;
            this.renderers.splice(this.renderers.indexOf(renderer), 1);
            renderer.render({
                kind: 'reset',
                render: [],
                unrender: this.errors.map(function (error) { return ({ error: error, elements: _this.elements.get(error) }); })
            });
        };
        /**
         * Registers a binding with the controller.
         * @param binding The binding instance.
         * @param target The DOM element.
         * @param rules (optional) rules associated with the binding. Validator implementation specific.
         */
        ValidationController.prototype.registerBinding = function (binding, target, rules) {
            this.bindings.set(binding, { target: target, rules: rules });
        };
        /**
         * Unregisters a binding with the controller.
         * @param binding The binding instance.
         */
        ValidationController.prototype.unregisterBinding = function (binding) {
            this.resetBinding(binding);
            this.bindings.delete(binding);
        };
        /**
         * Interprets the instruction and returns a predicate that will identify
         * relevant errors in the list of rendered errors.
         */
        ValidationController.prototype.getInstructionPredicate = function (instruction) {
            if (instruction) {
                var object_1 = instruction.object, propertyName_1 = instruction.propertyName, rules_1 = instruction.rules;
                var predicate_1;
                if (instruction.propertyName) {
                    predicate_1 = function (x) { return x.object === object_1 && x.propertyName === propertyName_1; };
                }
                else {
                    predicate_1 = function (x) { return x.object === object_1; };
                }
                // todo: move to Validator interface:
                if (rules_1 && rules_1.indexOf) {
                    return function (x) { return predicate_1(x) && rules_1.indexOf(x.rule) !== -1; };
                }
                return predicate_1;
            }
            else {
                return function () { return true; };
            }
        };
        /**
         * Validates and renders errors.
         * @param instruction Optional. Instructions on what to validate. If undefined, all objects and bindings will be validated.
         */
        ValidationController.prototype.validate = function (instruction) {
            var _this = this;
            // Get a function that will process the validation instruction.
            var execute;
            if (instruction) {
                var object_2 = instruction.object, propertyName_2 = instruction.propertyName, rules_2 = instruction.rules;
                // if rules were not specified, check the object map.
                rules_2 = rules_2 || this.objects.get(object_2);
                // property specified?
                if (instruction.propertyName === undefined) {
                    // validate the specified object.
                    execute = function () { return _this.validator.validateObject(object_2, rules_2); };
                }
                else {
                    // validate the specified property.
                    execute = function () { return _this.validator.validateProperty(object_2, propertyName_2, rules_2); };
                }
            }
            else {
                // validate all objects and bindings.
                execute = function () {
                    var promises = [];
                    for (var _i = 0, _a = Array.from(_this.objects); _i < _a.length; _i++) {
                        var _b = _a[_i], object = _b[0], rules = _b[1];
                        promises.push(_this.validator.validateObject(object, rules));
                    }
                    for (var _c = 0, _d = Array.from(_this.bindings); _c < _d.length; _c++) {
                        var _e = _d[_c], binding = _e[0], rules = _e[1].rules;
                        var _f = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source), object = _f.object, propertyName = _f.propertyName;
                        if (_this.objects.has(object)) {
                            continue;
                        }
                        promises.push(_this.validator.validateProperty(object, propertyName, rules));
                    }
                    return Promise.all(promises).then(function (errorSets) { return errorSets.reduce(function (a, b) { return a.concat(b); }, []); });
                };
            }
            // Wait for any existing validation to finish, execute the instruction, render the errors.
            this.validating = true;
            var result = this.finishValidating
                .then(execute)
                .then(function (newErrors) {
                var predicate = _this.getInstructionPredicate(instruction);
                var oldErrors = _this.errors.filter(predicate);
                _this.processErrorDelta('validate', oldErrors, newErrors);
                if (result === _this.finishValidating) {
                    _this.validating = false;
                }
                return newErrors;
            })
                .catch(function (error) {
                // recover, to enable subsequent calls to validate()
                _this.validating = false;
                _this.finishValidating = Promise.resolve();
                return Promise.reject(error);
            });
            this.finishValidating = result;
            return result;
        };
        /**
         * Resets any rendered errors (unrenders).
         * @param instruction Optional. Instructions on what to reset. If unspecified all rendered errors will be unrendered.
         */
        ValidationController.prototype.reset = function (instruction) {
            var predicate = this.getInstructionPredicate(instruction);
            var oldErrors = this.errors.filter(predicate);
            this.processErrorDelta('reset', oldErrors, []);
        };
        /**
         * Gets the elements associated with an object and propertyName (if any).
         */
        ValidationController.prototype.getAssociatedElements = function (_a) {
            var object = _a.object, propertyName = _a.propertyName;
            var elements = [];
            for (var _i = 0, _b = Array.from(this.bindings); _i < _b.length; _i++) {
                var _c = _b[_i], binding = _c[0], target = _c[1].target;
                var _d = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source), o = _d.object, p = _d.propertyName;
                if (o === object && p === propertyName) {
                    elements.push(target);
                }
            }
            return elements;
        };
        ValidationController.prototype.processErrorDelta = function (kind, oldErrors, newErrors) {
            // prepare the instruction.
            var instruction = {
                kind: kind,
                render: [],
                unrender: []
            };
            // create a shallow copy of newErrors so we can mutate it without causing side-effects.
            newErrors = newErrors.slice(0);
            // create unrender instructions from the old errors.
            var _loop_1 = function(oldError) {
                // get the elements associated with the old error.
                var elements = this_1.elements.get(oldError);
                // remove the old error from the element map.
                this_1.elements.delete(oldError);
                // create the unrender instruction.
                instruction.unrender.push({ error: oldError, elements: elements });
                // determine if there's a corresponding new error for the old error we are unrendering.
                var newErrorIndex = newErrors.findIndex(function (x) { return x.rule === oldError.rule && x.object === oldError.object && x.propertyName === oldError.propertyName; });
                if (newErrorIndex === -1) {
                    // no corresponding new error... simple remove.
                    this_1.errors.splice(this_1.errors.indexOf(oldError), 1);
                }
                else {
                    // there is a corresponding new error...        
                    var newError = newErrors.splice(newErrorIndex, 1)[0];
                    // get the elements that are associated with the new error.
                    var elements_1 = this_1.getAssociatedElements(newError);
                    this_1.elements.set(newError, elements_1);
                    // create a render instruction for the new error.
                    instruction.render.push({ error: newError, elements: elements_1 });
                    // do an in-place replacement of the old error with the new error.
                    // this ensures any repeats bound to this.errors will not thrash.
                    this_1.errors.splice(this_1.errors.indexOf(oldError), 1, newError);
                }
            };
            var this_1 = this;
            for (var _i = 0, oldErrors_1 = oldErrors; _i < oldErrors_1.length; _i++) {
                var oldError = oldErrors_1[_i];
                _loop_1(oldError);
            }
            // create render instructions from the remaining new errors.
            for (var _a = 0, newErrors_1 = newErrors; _a < newErrors_1.length; _a++) {
                var error = newErrors_1[_a];
                var elements = this.getAssociatedElements(error);
                instruction.render.push({ error: error, elements: elements });
                this.elements.set(error, elements);
                this.errors.push(error);
            }
            // render.
            for (var _b = 0, _c = this.renderers; _b < _c.length; _b++) {
                var renderer = _c[_b];
                renderer.render(instruction);
            }
        };
        /**
        * Validates the property associated with a binding.
        */
        ValidationController.prototype.validateBinding = function (binding) {
            if (!binding.isBound) {
                return;
            }
            var _a = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source), object = _a.object, propertyName = _a.propertyName;
            var registeredBinding = this.bindings.get(binding);
            var rules = registeredBinding ? registeredBinding.rules : undefined;
            this.validate({ object: object, propertyName: propertyName, rules: rules });
        };
        /**
        * Resets the errors for a property associated with a binding.
        */
        ValidationController.prototype.resetBinding = function (binding) {
            var _a = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source), object = _a.object, propertyName = _a.propertyName;
            this.reset({ object: object, propertyName: propertyName });
        };
        ValidationController.inject = [validator_1.Validator];
        return ValidationController;
    }());
    exports.ValidationController = ValidationController;
});

define('aurelia-validation/validator',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var Validator = (function () {
        function Validator() {
        }
        return Validator;
    }());
    exports.Validator = Validator;
});

define('aurelia-validation/validate-trigger',["require", "exports"], function (require, exports) {
    "use strict";
    /**
    * Validation triggers.
    */
    exports.validateTrigger = {
        /**
        * Validate the binding when the binding's target element fires a DOM "blur" event.
        */
        blur: 'blur',
        /**
        * Validate the binding when it updates the model due to a change in the view.
        * Not specific to DOM "change" events.
        */
        change: 'change',
        /**
        * Manual validation.  Use the controller's `validate()` and  `reset()` methods
        * to validate all bindings.
        */
        manual: 'manual'
    };
});

define('aurelia-validation/property-info',["require", "exports", 'aurelia-binding'], function (require, exports, aurelia_binding_1) {
    "use strict";
    function getObject(expression, objectExpression, source) {
        var value = objectExpression.evaluate(source, null);
        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
            return value;
        }
        if (value === null) {
            value = 'null';
        }
        else if (value === undefined) {
            value = 'undefined';
        }
        throw new Error("The '" + objectExpression + "' part of '" + expression + "' evaluates to " + value + " instead of an object.");
    }
    /**
     * Retrieves the object and property name for the specified expression.
     * @param expression The expression
     * @param source The scope
     */
    function getPropertyInfo(expression, source) {
        var originalExpression = expression;
        while (expression instanceof aurelia_binding_1.BindingBehavior || expression instanceof aurelia_binding_1.ValueConverter) {
            expression = expression.expression;
        }
        var object;
        var propertyName;
        if (expression instanceof aurelia_binding_1.AccessScope) {
            object = source.bindingContext;
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessMember) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessKeyed) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.key.evaluate(source);
        }
        else {
            throw new Error("Expression '" + originalExpression + "' is not compatible with the validate binding-behavior.");
        }
        return { object: object, propertyName: propertyName };
    }
    exports.getPropertyInfo = getPropertyInfo;
});

define('aurelia-validation/validation-error',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * A validation error.
     */
    var ValidationError = (function () {
        /**
         * @param rule The rule associated with the error. Validator implementation specific.
         * @param message The error message.
         * @param object The invalid object
         * @param propertyName The name of the invalid property. Optional.
         */
        function ValidationError(rule, message, object, propertyName) {
            if (propertyName === void 0) { propertyName = null; }
            this.rule = rule;
            this.message = message;
            this.object = object;
            this.propertyName = propertyName;
            this.id = ValidationError.nextId++;
        }
        ValidationError.prototype.toString = function () {
            return this.message;
        };
        ValidationError.nextId = 0;
        return ValidationError;
    }());
    exports.ValidationError = ValidationError;
});

define('aurelia-validation/validation-controller-factory',["require", "exports", './validation-controller'], function (require, exports, validation_controller_1) {
    "use strict";
    /**
     * Creates ValidationController instances.
     */
    var ValidationControllerFactory = (function () {
        function ValidationControllerFactory(container) {
            this.container = container;
        }
        ValidationControllerFactory.get = function (container) {
            return new ValidationControllerFactory(container);
        };
        /**
         * Creates a new controller and registers it in the current element's container so that it's
         * available to the validate binding behavior and renderers.
         */
        ValidationControllerFactory.prototype.create = function () {
            return this.container.invoke(validation_controller_1.ValidationController);
        };
        /**
         * Creates a new controller and registers it in the current element's container so that it's
         * available to the validate binding behavior and renderers.
         */
        ValidationControllerFactory.prototype.createForCurrentScope = function () {
            var controller = this.create();
            this.container.registerInstance(validation_controller_1.ValidationController, controller);
            return controller;
        };
        return ValidationControllerFactory;
    }());
    exports.ValidationControllerFactory = ValidationControllerFactory;
    ValidationControllerFactory['protocol:aurelia:resolver'] = true;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-validation/validation-errors-custom-attribute',["require", "exports", 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-templating', './validation-controller'], function (require, exports, aurelia_binding_1, aurelia_dependency_injection_1, aurelia_templating_1, validation_controller_1) {
    "use strict";
    var ValidationErrorsCustomAttribute = (function () {
        function ValidationErrorsCustomAttribute(boundaryElement, controllerAccessor) {
            this.boundaryElement = boundaryElement;
            this.controllerAccessor = controllerAccessor;
            this.errors = [];
        }
        ValidationErrorsCustomAttribute.prototype.sort = function () {
            this.errors.sort(function (a, b) {
                if (a.targets[0] === b.targets[0]) {
                    return 0;
                }
                return a.targets[0].compareDocumentPosition(b.targets[0]) & 2 ? 1 : -1;
            });
        };
        ValidationErrorsCustomAttribute.prototype.interestingElements = function (elements) {
            var _this = this;
            return elements.filter(function (e) { return _this.boundaryElement.contains(e); });
        };
        ValidationErrorsCustomAttribute.prototype.render = function (instruction) {
            var _loop_1 = function(error) {
                var index = this_1.errors.findIndex(function (x) { return x.error === error; });
                if (index !== -1) {
                    this_1.errors.splice(index, 1);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var error = _a[_i].error;
                _loop_1(error);
            }
            for (var _b = 0, _c = instruction.render; _b < _c.length; _b++) {
                var _d = _c[_b], error = _d.error, elements = _d.elements;
                var targets = this.interestingElements(elements);
                if (targets.length) {
                    this.errors.push({ error: error, targets: targets });
                }
            }
            this.sort();
            this.value = this.errors;
        };
        ValidationErrorsCustomAttribute.prototype.bind = function () {
            this.controllerAccessor().addRenderer(this);
            this.value = this.errors;
        };
        ValidationErrorsCustomAttribute.prototype.unbind = function () {
            this.controllerAccessor().removeRenderer(this);
        };
        ValidationErrorsCustomAttribute.inject = [Element, aurelia_dependency_injection_1.Lazy.of(validation_controller_1.ValidationController)];
        ValidationErrorsCustomAttribute = __decorate([
            aurelia_templating_1.customAttribute('validation-errors', aurelia_binding_1.bindingMode.twoWay)
        ], ValidationErrorsCustomAttribute);
        return ValidationErrorsCustomAttribute;
    }());
    exports.ValidationErrorsCustomAttribute = ValidationErrorsCustomAttribute;
});

define('aurelia-validation/validation-renderer-custom-attribute',["require", "exports", './validation-controller'], function (require, exports, validation_controller_1) {
    "use strict";
    var ValidationRendererCustomAttribute = (function () {
        function ValidationRendererCustomAttribute() {
        }
        ValidationRendererCustomAttribute.prototype.created = function (view) {
            this.container = view.container;
        };
        ValidationRendererCustomAttribute.prototype.bind = function () {
            this.controller = this.container.get(validation_controller_1.ValidationController);
            this.renderer = this.container.get(this.value);
            this.controller.addRenderer(this.renderer);
        };
        ValidationRendererCustomAttribute.prototype.unbind = function () {
            this.controller.removeRenderer(this.renderer);
            this.controller = null;
            this.renderer = null;
        };
        return ValidationRendererCustomAttribute;
    }());
    exports.ValidationRendererCustomAttribute = ValidationRendererCustomAttribute;
});

define('aurelia-validation/implementation/rules',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Sets, unsets and retrieves rules on an object or constructor function.
     */
    var Rules = (function () {
        function Rules() {
        }
        /**
         * Applies the rules to a target.
         */
        Rules.set = function (target, rules) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            Object.defineProperty(target, Rules.key, { enumerable: false, configurable: false, writable: true, value: rules });
        };
        /**
         * Removes rules from a target.
         */
        Rules.unset = function (target) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            target[Rules.key] = null;
        };
        /**
         * Retrieves the target's rules.
         */
        Rules.get = function (target) {
            return target[Rules.key] || null;
        };
        /**
         * The name of the property that stores the rules.
         */
        Rules.key = '__rules__';
        return Rules;
    }());
    exports.Rules = Rules;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/implementation/standard-validator',["require", "exports", 'aurelia-templating', '../validator', '../validation-error', './rules', './validation-messages'], function (require, exports, aurelia_templating_1, validator_1, validation_error_1, rules_1, validation_messages_1) {
    "use strict";
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var StandardValidator = (function (_super) {
        __extends(StandardValidator, _super);
        function StandardValidator(messageProvider, resources) {
            _super.call(this);
            this.messageProvider = messageProvider;
            this.lookupFunctions = resources.lookupFunctions;
            this.getDisplayName = messageProvider.getDisplayName.bind(messageProvider);
        }
        StandardValidator.prototype.getMessage = function (rule, object, value) {
            var expression = rule.message || this.messageProvider.getMessage(rule.messageKey);
            var _a = rule.property, propertyName = _a.name, displayName = _a.displayName;
            if (displayName === null && propertyName !== null) {
                displayName = this.messageProvider.getDisplayName(propertyName);
            }
            var overrideContext = {
                $displayName: displayName,
                $propertyName: propertyName,
                $value: value,
                $object: object,
                $config: rule.config,
                $getDisplayName: this.getDisplayName
            };
            return expression.evaluate({ bindingContext: object, overrideContext: overrideContext }, this.lookupFunctions);
        };
        StandardValidator.prototype.validate = function (object, propertyName, rules) {
            var _this = this;
            var errors = [];
            // rules specified?
            if (!rules) {
                // no. locate the rules via metadata.
                rules = rules_1.Rules.get(object);
            }
            // any rules?
            if (!rules) {
                return Promise.resolve(errors);
            }
            // are we validating all properties or a single property?
            var validateAllProperties = propertyName === null || propertyName === undefined;
            var addError = function (rule, value) {
                var message = _this.getMessage(rule, object, value);
                errors.push(new validation_error_1.ValidationError(rule, message, object, rule.property.name));
            };
            // validate each rule.
            var promises = [];
            var _loop_1 = function(i) {
                var rule = rules[i];
                // is the rule related to the property we're validating.
                if (!validateAllProperties && rule.property.name !== propertyName) {
                    return "continue";
                }
                // is this a conditional rule? is the condition met?
                if (rule.when && !rule.when(object)) {
                    return "continue";
                }
                // validate.
                var value = rule.property.name === null ? object : object[rule.property.name];
                var promiseOrBoolean = rule.condition(value, object);
                if (promiseOrBoolean instanceof Promise) {
                    promises.push(promiseOrBoolean.then(function (isValid) {
                        if (!isValid) {
                            addError(rule, value);
                        }
                    }));
                    return "continue";
                }
                if (!promiseOrBoolean) {
                    addError(rule, value);
                }
            };
            for (var i = 0; i < rules.length; i++) {
                _loop_1(i);
            }
            if (promises.length === 0) {
                return Promise.resolve(errors);
            }
            return Promise.all(promises).then(function () { return errors; });
        };
        /**
         * Validates the specified property.
         * @param object The object to validate.
         * @param propertyName The name of the property to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateProperty = function (object, propertyName, rules) {
            return this.validate(object, propertyName, rules || null);
        };
        /**
         * Validates all rules for specified object and it's properties.
         * @param object The object to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateObject = function (object, rules) {
            return this.validate(object, null, rules || null);
        };
        StandardValidator.inject = [validation_messages_1.ValidationMessageProvider, aurelia_templating_1.ViewResources];
        return StandardValidator;
    }(validator_1.Validator));
    exports.StandardValidator = StandardValidator;
});

define('aurelia-validation/implementation/validation-messages',["require", "exports", './validation-parser'], function (require, exports, validation_parser_1) {
    "use strict";
    /**
     * Dictionary of validation messages. [messageKey]: messageExpression
     */
    exports.validationMessages = {
        /**
         * The default validation message. Used with rules that have no standard message.
         */
        default: "${$displayName} is invalid.",
        required: "${$displayName} is required.",
        matches: "${$displayName} is not correctly formatted.",
        email: "${$displayName} is not a valid email.",
        minLength: "${$displayName} must be at least ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        maxLength: "${$displayName} cannot be longer than ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        minItems: "${$displayName} must contain at least ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        maxItems: "${$displayName} cannot contain more than ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        equals: "${$displayName} must be ${$config.expectedValue}.",
    };
    /**
     * Retrieves validation messages and property display names.
     */
    var ValidationMessageProvider = (function () {
        function ValidationMessageProvider(parser) {
            this.parser = parser;
        }
        /**
         * Returns a message binding expression that corresponds to the key.
         * @param key The message key.
         */
        ValidationMessageProvider.prototype.getMessage = function (key) {
            var message;
            if (key in exports.validationMessages) {
                message = exports.validationMessages[key];
            }
            else {
                message = exports.validationMessages['default'];
            }
            return this.parser.parseMessage(message);
        };
        /**
         * When a display name is not provided, this method is used to formulate
         * a display name using the property name.
         * Override this with your own custom logic.
         * @param propertyName The property name.
         */
        ValidationMessageProvider.prototype.getDisplayName = function (propertyName) {
            // split on upper-case letters.
            var words = propertyName.split(/(?=[A-Z])/).join(' ');
            // capitalize first letter.
            return words.charAt(0).toUpperCase() + words.slice(1);
        };
        ValidationMessageProvider.inject = [validation_parser_1.ValidationParser];
        return ValidationMessageProvider;
    }());
    exports.ValidationMessageProvider = ValidationMessageProvider;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/implementation/validation-parser',["require", "exports", 'aurelia-binding', 'aurelia-templating', './util', 'aurelia-logging'], function (require, exports, aurelia_binding_1, aurelia_templating_1, util_1, LogManager) {
    "use strict";
    var ValidationParser = (function () {
        function ValidationParser(parser, bindinqLanguage) {
            this.parser = parser;
            this.bindinqLanguage = bindinqLanguage;
            this.emptyStringExpression = new aurelia_binding_1.LiteralString('');
            this.nullExpression = new aurelia_binding_1.LiteralPrimitive(null);
            this.undefinedExpression = new aurelia_binding_1.LiteralPrimitive(undefined);
            this.cache = {};
        }
        ValidationParser.prototype.coalesce = function (part) {
            // part === null || part === undefined ? '' : part
            return new aurelia_binding_1.Conditional(new aurelia_binding_1.Binary('||', new aurelia_binding_1.Binary('===', part, this.nullExpression), new aurelia_binding_1.Binary('===', part, this.undefinedExpression)), this.emptyStringExpression, new aurelia_binding_1.CallMember(part, 'toString', []));
        };
        ValidationParser.prototype.parseMessage = function (message) {
            if (this.cache[message] !== undefined) {
                return this.cache[message];
            }
            var parts = this.bindinqLanguage.parseInterpolation(null, message);
            if (parts === null) {
                return new aurelia_binding_1.LiteralString(message);
            }
            var expression = new aurelia_binding_1.LiteralString(parts[0]);
            for (var i = 1; i < parts.length; i += 2) {
                expression = new aurelia_binding_1.Binary('+', expression, new aurelia_binding_1.Binary('+', this.coalesce(parts[i]), new aurelia_binding_1.LiteralString(parts[i + 1])));
            }
            MessageExpressionValidator.validate(expression, message);
            this.cache[message] = expression;
            return expression;
        };
        ValidationParser.prototype.getAccessorExpression = function (fn) {
            var classic = /^function\s*\([$_\w\d]+\)\s*\{\s*(?:"use strict";)?\s*return\s+[$_\w\d]+\.([$_\w\d]+)\s*;?\s*\}$/;
            var arrow = /^[$_\w\d]+\s*=>\s*[$_\w\d]+\.([$_\w\d]+)$/;
            var match = classic.exec(fn) || arrow.exec(fn);
            if (match === null) {
                throw new Error("Unable to parse accessor function:\n" + fn);
            }
            return this.parser.parse(match[1]);
        };
        ValidationParser.prototype.parseProperty = function (property) {
            var accessor;
            if (util_1.isString(property)) {
                accessor = this.parser.parse(property);
            }
            else {
                accessor = this.getAccessorExpression(property.toString());
            }
            if (accessor instanceof aurelia_binding_1.AccessScope
                || accessor instanceof aurelia_binding_1.AccessMember && accessor.object instanceof aurelia_binding_1.AccessScope) {
                return {
                    name: accessor.name,
                    displayName: null
                };
            }
            throw new Error("Invalid subject: \"" + accessor + "\"");
        };
        ValidationParser.inject = [aurelia_binding_1.Parser, aurelia_templating_1.BindingLanguage];
        return ValidationParser;
    }());
    exports.ValidationParser = ValidationParser;
    var MessageExpressionValidator = (function (_super) {
        __extends(MessageExpressionValidator, _super);
        function MessageExpressionValidator(originalMessage) {
            _super.call(this, []);
            this.originalMessage = originalMessage;
        }
        MessageExpressionValidator.validate = function (expression, originalMessage) {
            var visitor = new MessageExpressionValidator(originalMessage);
            expression.accept(visitor);
        };
        MessageExpressionValidator.prototype.visitAccessScope = function (access) {
            if (access.ancestor !== 0) {
                throw new Error('$parent is not permitted in validation message expressions.');
            }
            if (['displayName', 'propertyName', 'value', 'object', 'config', 'getDisplayName'].indexOf(access.name) !== -1) {
                LogManager.getLogger('aurelia-validation')
                    .warn("Did you mean to use \"$" + access.name + "\" instead of \"" + access.name + "\" in this validation message template: \"" + this.originalMessage + "\"?");
            }
        };
        return MessageExpressionValidator;
    }(aurelia_binding_1.Unparser));
    exports.MessageExpressionValidator = MessageExpressionValidator;
});

define('aurelia-validation/implementation/util',["require", "exports"], function (require, exports) {
    "use strict";
    function isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }
    exports.isString = isString;
});

define('aurelia-validation/implementation/validation-rules',["require", "exports", './util', './rules', './validation-messages'], function (require, exports, util_1, rules_1, validation_messages_1) {
    "use strict";
    /**
     * Part of the fluent rule API. Enables customizing property rules.
     */
    var FluentRuleCustomizer = (function () {
        function FluentRuleCustomizer(property, condition, config, fluentEnsure, fluentRules, parser) {
            if (config === void 0) { config = {}; }
            this.fluentEnsure = fluentEnsure;
            this.fluentRules = fluentRules;
            this.parser = parser;
            this.rule = {
                property: property,
                condition: condition,
                config: config,
                when: null,
                messageKey: 'default',
                message: null
            };
            this.fluentEnsure.rules.push(this.rule);
        }
        /**
         * Specifies the key to use when looking up the rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessageKey = function (key) {
            this.rule.messageKey = key;
            this.rule.message = null;
            return this;
        };
        /**
         * Specifies rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessage = function (message) {
            this.rule.messageKey = 'custom';
            this.rule.message = this.parser.parseMessage(message);
            return this;
        };
        /**
         * Specifies a condition that must be met before attempting to validate the rule.
         * @param condition A function that accepts the object as a parameter and returns true
         * or false whether the rule should be evaluated.
         */
        FluentRuleCustomizer.prototype.when = function (condition) {
            this.rule.when = condition;
            return this;
        };
        /**
         * Tags the rule instance, enabling the rule to be found easily
         * using ValidationRules.taggedRules(rules, tag)
         */
        FluentRuleCustomizer.prototype.tag = function (tag) {
            this.rule.tag = tag;
            return this;
        };
        ///// FluentEnsure APIs /////
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        FluentRuleCustomizer.prototype.ensure = function (subject) {
            return this.fluentEnsure.ensure(subject);
        };
        /**
         * Targets an object with validation rules.
         */
        FluentRuleCustomizer.prototype.ensureObject = function () {
            return this.fluentEnsure.ensureObject();
        };
        Object.defineProperty(FluentRuleCustomizer.prototype, "rules", {
            /**
             * Rules that have been defined using the fluent API.
             */
            get: function () {
                return this.fluentEnsure.rules;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentRuleCustomizer.prototype.on = function (target) {
            return this.fluentEnsure.on(target);
        };
        ///////// FluentRules APIs /////////
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRuleCustomizer.prototype.satisfies = function (condition, config) {
            return this.fluentRules.satisfies(condition, config);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRuleCustomizer.prototype.satisfiesRule = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.fluentRules).satisfiesRule.apply(_a, [name].concat(args));
            var _a;
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRuleCustomizer.prototype.required = function () {
            return this.fluentRules.required();
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.matches = function (regex) {
            return this.fluentRules.matches(regex);
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.email = function () {
            return this.fluentRules.email();
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.minLength = function (length) {
            return this.fluentRules.minLength(length);
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxLength = function (length) {
            return this.fluentRules.maxLength(length);
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.minItems = function (count) {
            return this.fluentRules.minItems(count);
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxItems = function (count) {
            return this.fluentRules.maxItems(count);
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.equals = function (expectedValue) {
            return this.fluentRules.equals(expectedValue);
        };
        return FluentRuleCustomizer;
    }());
    exports.FluentRuleCustomizer = FluentRuleCustomizer;
    /**
     * Part of the fluent rule API. Enables applying rules to properties and objects.
     */
    var FluentRules = (function () {
        function FluentRules(fluentEnsure, parser, property) {
            this.fluentEnsure = fluentEnsure;
            this.parser = parser;
            this.property = property;
        }
        /**
         * Sets the display name of the ensured property.
         */
        FluentRules.prototype.displayName = function (name) {
            this.property.displayName = name;
            return this;
        };
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRules.prototype.satisfies = function (condition, config) {
            return new FluentRuleCustomizer(this.property, condition, config, this.fluentEnsure, this, this.parser);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRules.prototype.satisfiesRule = function (name) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var rule = FluentRules.customRules[name];
            if (!rule) {
                // standard rule?
                rule = this[name];
                if (rule instanceof Function) {
                    return rule.call.apply(rule, [this].concat(args));
                }
                throw new Error("Rule with name \"" + name + "\" does not exist.");
            }
            var config = rule.argsToConfig ? rule.argsToConfig.apply(rule, args) : undefined;
            return this.satisfies(function (value, obj) { return (_a = rule.condition).call.apply(_a, [_this, value, obj].concat(args)); var _a; }, config)
                .withMessageKey(name);
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRules.prototype.required = function () {
            return this.satisfies(function (value) {
                return value !== null
                    && value !== undefined
                    && !(util_1.isString(value) && !/\S/.test(value));
            }).withMessageKey('required');
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.matches = function (regex) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || regex.test(value); })
                .withMessageKey('matches');
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.email = function () {
            return this.matches(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/)
                .withMessageKey('email');
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.minLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length >= length; }, { length: length })
                .withMessageKey('minLength');
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.maxLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length <= length; }, { length: length })
                .withMessageKey('maxLength');
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.minItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length >= count; }, { count: count })
                .withMessageKey('minItems');
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.maxItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length <= count; }, { count: count })
                .withMessageKey('maxItems');
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.equals = function (expectedValue) {
            return this.satisfies(function (value) { return value === null || value === undefined || value === '' || value === expectedValue; }, { expectedValue: expectedValue })
                .withMessageKey('equals');
        };
        FluentRules.customRules = {};
        return FluentRules;
    }());
    exports.FluentRules = FluentRules;
    /**
     * Part of the fluent rule API. Enables targeting properties and objects with rules.
     */
    var FluentEnsure = (function () {
        function FluentEnsure(parser) {
            this.parser = parser;
            /**
             * Rules that have been defined using the fluent API.
             */
            this.rules = [];
        }
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        FluentEnsure.prototype.ensure = function (property) {
            this.assertInitialized();
            return new FluentRules(this, this.parser, this.parser.parseProperty(property));
        };
        /**
         * Targets an object with validation rules.
         */
        FluentEnsure.prototype.ensureObject = function () {
            this.assertInitialized();
            return new FluentRules(this, this.parser, { name: null, displayName: null });
        };
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentEnsure.prototype.on = function (target) {
            rules_1.Rules.set(target, this.rules);
            return this;
        };
        FluentEnsure.prototype.assertInitialized = function () {
            if (this.parser) {
                return;
            }
            throw new Error("Did you forget to add \".plugin('aurelia-validation)\" to your main.js?");
        };
        return FluentEnsure;
    }());
    exports.FluentEnsure = FluentEnsure;
    /**
     * Fluent rule definition API.
     */
    var ValidationRules = (function () {
        function ValidationRules() {
        }
        ValidationRules.initialize = function (parser) {
            ValidationRules.parser = parser;
        };
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        ValidationRules.ensure = function (property) {
            return new FluentEnsure(ValidationRules.parser).ensure(property);
        };
        /**
         * Targets an object with validation rules.
         */
        ValidationRules.ensureObject = function () {
            return new FluentEnsure(ValidationRules.parser).ensureObject();
        };
        /**
         * Defines a custom rule.
         * @param name The name of the custom rule. Also serves as the message key.
         * @param condition The rule function.
         * @param message The message expression
         * @param argsToConfig A function that maps the rule's arguments to a "config" object that can be used when evaluating the message expression.
         */
        ValidationRules.customRule = function (name, condition, message, argsToConfig) {
            validation_messages_1.validationMessages[name] = message;
            FluentRules.customRules[name] = { condition: condition, argsToConfig: argsToConfig };
        };
        /**
         * Returns rules with the matching tag.
         * @param rules The rules to search.
         * @param tag The tag to search for.
         */
        ValidationRules.taggedRules = function (rules, tag) {
            return rules.filter(function (r) { return r.tag === tag; });
        };
        /**
         * Removes the rules from a class or object.
         * @param target A class or object.
         */
        ValidationRules.off = function (target) {
            rules_1.Rules.unset(target);
        };
        return ValidationRules;
    }());
    exports.ValidationRules = ValidationRules;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\r\n  <require from=\"bootstrap-daterangepicker/daterangepicker.css\"></require>\r\n  <require from=\"./resources/elements/login/login-menu\"></require>\r\n  <require from=\"./resources/styles/main.css\"></require>\r\n\r\n   <nav class=\"navbar navbar-default navbar-fixed-top\">\r\n        <div class=\"container\">\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n                    <span class=\"sr-only\">Toggle navigation</span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <a route-href=\"route: search\" class=\"navbar-brand\">Booking</a>\r\n            </div>\r\n            <div class=\"navbar-collapse collapse\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li><a route-href=\"route: deals\">Deals</a></li>\r\n                    <li><a route-href=\"route: business\">For Business</a></li>\r\n                    <li><a route-href=\"route: aboutus\">About Us</a></li>\r\n                </ul>\r\n\r\n                <login-menu class=\"login-menu\" router.bind=\"router\"></login-menu>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n    <div class=\"container body-content\" style=\"padding-top: 55px\">\r\n        <router-view></router-view>\r\n    </div>\r\n    \r\n    <div class=\"container\" >\r\n        <hr />\r\n        <footer>\r\n            <p>&copy; 2016 - Booking</p>\r\n        </footer>\r\n    </div>\r\n</template>\r\n"; });
define('text!resources/elements/aboutus.html', ['module'], function(module) { module.exports = "<template>\r\n    About Us\r\n</template>"; });
define('text!resources/styles/main.css', ['module'], function(module) { module.exports = ".login-menu {\n  margin: 0px;\n  padding: 0px; }\n"; });
define('text!resources/elements/business.html', ['module'], function(module) { module.exports = "<template>\r\n    For Business\r\n</template>"; });
define('text!resources/elements/deals.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n        Deals\r\n    </div>\r\n</template>"; });
define('text!resources/elements/error.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n        Page not found 404\r\n    </div>\r\n</template>"; });
define('text!resources/elements/login/login-menu.html', ['module'], function(module) { module.exports = "<template>\r\n    <ul if.bind=\"user == null\" class=\"nav navbar-nav navbar-right\">\r\n        <li><a route-href=\"route: register\">Register</a></li>\r\n        <li><a>Log in</a></li>\r\n    </ul>\r\n    <ul if.bind=\"user != null\" class=\"nav navbar-nav navbar-right\">\r\n        <li><a>Logged in</a></li>\r\n    </ul>\r\n</template>"; });
define('text!resources/elements/login/register.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container-fluid\">\r\n        <h4>Create a new account.</h4>\r\n        <hr />\r\n        <form submit.delegate=\"submit()\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"panel panel-default\">\r\n                        <div class=\"panel-heading\">Personal Information:</div>\r\n                        <div class=\"panel-body\">\r\n                            <div class=\"form-group\" validation-errors.bind=\"firstNameErrors\"\r\n                                 class.bind=\"firstNameErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    First Name:\r\n                                    <input type=\"text\" class=\"form-control\"\r\n                                           placeholder=\"First Name\"\r\n                                           value.bind=\"model.firstName & validate\">\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of firstNameErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"form-group\" validation-errors.bind=\"middleNameErrors\"\r\n                                 class.bind=\"middleNameErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    Middle Name:\r\n                                    <input type=\"text\" class=\"form-control\" value.bind=\"model.middleName & validate\" />\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of middleNameErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"form-group\" validation-errors.bind=\"lastNameErrors\"\r\n                                 class.bind=\"lastNameErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    Last Name:\r\n                                    <input type=\"text\" class=\"form-control\" value.bind=\"model.lastName & validate\" />\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of lastNameErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"form-group\" validation-errors.bind=\"birthDateErrors\"\r\n                                 class.bind=\"birthDateErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    Birth date:\r\n                                    <input id=\"birthdate\" type=\"text\" class=\"form-control\" value.bind=\"model.birthDate & validate\" />\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of birthDateErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"panel panel-default\">\r\n                        <div class=\"panel-heading\">Login Details</div>\r\n                        <div class=\"panel-body\">\r\n                            <div class=\"form-group\" validation-errors.bind=\"emailErrors\"\r\n                                 class.bind=\"emailErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    E-mail:\r\n                                    <input type=\"email\" class=\"form-control\" value.bind=\"model.email & validate\" />\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of emailErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"form-group\" validation-errors.bind=\"passwordErrors\"\r\n                                 class.bind=\"passwordErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    Password:\r\n                                    <input type=\"password\" class=\"form-control\" value.bind=\"model.password & validate\" />\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of passwordErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"form-group\" validation-errors.bind=\"confirmPasswordErrors\"\r\n                                 class.bind=\"confirmPasswordErrors.length ? 'has-error' : ''\">\r\n                                <label>\r\n                                    Confirm Password:\r\n                                    <input type=\"password\" class=\"form-control\"\r\n                                           placeholder=\"Confirm Password\"\r\n                                           value.bind=\"model.confirmPassword & validate\" />\r\n                                </label>\r\n                                <span class=\"help-block\" repeat.for=\"errorInfo of confirmPasswordErrors\">\r\n                                    ${errorInfo.error.message}\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form-inline form-group\">\r\n                <button class=\"btn btn-success\" type=\"submit\">Register</button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</template>"; });
define('text!resources/elements/reservation/search.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container-fluid\">\r\n        <form>\r\n            <input class=\"form-group\" type=\"text\" value.bind=\"expression\" />\r\n            <button class=\"btn btn-success\" click.trigger=\"search()\">Search</button>\r\n        </form>\r\n    </div>\r\n    <div class=\"container-fluid\">\r\n        <ul repeat.for=\"company of companies\">\r\n            <li>\r\n                Company Name: ${company.Name}\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    \r\n</template>"; });
define('text!resources/elements/ui-components/daterangepicker.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"bootstrap-daterangepicker/daterangepicker.css\"></require>\r\n    \r\n    <input type=\"text\" class=\"form-control\" />\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map