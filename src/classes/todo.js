var ToDo = /** @class */ (function () {
    function ToDo(todoItem) {
        this._todoItem = todoItem;
    }
    Object.defineProperty(ToDo.prototype, "title", {
        get: function () {
            return this._todoItem.title;
        },
        set: function (val) {
            this._todoItem.title = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToDo.prototype, "detail", {
        get: function () {
            return this._todoItem.detail;
        },
        set: function (val) {
            this._todoItem.detail = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToDo.prototype, "note", {
        get: function () {
            return this._todoItem.note;
        },
        set: function (val) {
            this._todoItem.note = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToDo.prototype, "priority", {
        get: function () {
            return this._todoItem.priority;
        },
        set: function (val) {
            this._todoItem.priority = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToDo.prototype, "deadline", {
        get: function () {
            return this._todoItem.deadline;
        },
        set: function (val) {
            this._todoItem.deadline = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToDo.prototype, "createdAt", {
        get: function () {
            return this._todoItem.createdAt;
        },
        set: function (val) {
            this._todoItem.createdAt = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToDo.prototype, "progress", {
        get: function () {
            return this._todoItem.progress;
        },
        set: function (val) {
            this._todoItem.progress = val;
        },
        enumerable: false,
        configurable: true
    });
    return ToDo;
}());
export { ToDo };
//# sourceMappingURL=todo.js.map