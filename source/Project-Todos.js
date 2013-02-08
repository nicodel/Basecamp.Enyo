/*
 * TODO:
 *  + lors de la selection d'un todo, appliquer la couleur a toute la surface du todo.
 *  + comme chaque todo list est séparée avec un SelectableRepeater différent, les selections de multiple todos, répartis sur plusieurs listes sont malheureusement possibles.
 *
 */

enyo.kind({
    name: "App.Project.Todos.Left",
    kind: "FittableRows",
    published: {
        sortitem : ""
    },
    components: [
        {kind: "FittableColumns", classes: "list-header onyx-toolbar-inline", components: [
            {content: "To-do Lists"},
            {kind: "onyx.MenuDecorator", components: [
                {content: "Sort by ..."},
                // {kind: "onyx.Tooltip", content: "Where do you want to go ?"},
                {name: "sortMenu", kind: "onyx.Menu", ontap: "itemSelected", components: [
                    {content: "To-do list", value: "list_name", active: true},
                    {content: "Assignee", value: "assignee_name"},
                    {content: "Due date", value: "due_at"}
                ]}
            ]}
        ]},
        {kind: "Scroller", fit: true, touch: true, horizontal:"hidden", components: [
            {kind: "sfeast.SelectableRepeater", selectColor: "#CDE8FE url(assets/gradient-invert.png) repeat-x", name: "list", onSetupItem: "setupItem", components: [
                // {name: "divider", classes: "header list-divider"},
                {kind: "FittableRows", classes: "list-item", ontap: "itemTapped",  components: [
                    {kind: "FittableColumns", components: [
                        {style: "text-align:center;", components: [
                            {kind:"onyx.Checkbox", onchange:"checkboxChanged", style: "padding-right: 5px;"}
                        ]},
                        {name: "todo", style: "font-size:16px;padding-top:5px;"}
                    ]},
                    {kind: "FittableColumns", style: "font-size:14px;margin-top:10px;", components: [
                        {name: "date", style: "margin-right:20px;"},
                        {name: "assignee"}
                    ]}
                ]}
            ]}
        ]},
        {kind: "BasecampApi", name: "api", onLists: "listsResults", onList: "listResults"},
        {kind: "Signals", onProject: "launch"}
    ],
    rendered: function () {
        this.inherited(arguments);
        this.sortitem = "list_name";
//        this.populateList();
    },
    launch: function (inSender, inProject) {
        this.id = inProject.id
        this.$.api.getTodoLists(this.id);
    },
    setupItem: function (inSender, inEvent) {
        if (this.tLists) {
            var index = inEvent.index;
            var item = inEvent.item;
            // console.log("item: ", item);
            var itemTodo = this.tLists[inEvent.index];
            item.$.todo.setContent(itemTodo.content);
            if (itemTodo.due_at) {
                item.$.date.setContent("Due on " + itemTodo.due_at);
            } else {
                item.$.date.setContent("No due date");
            }
            if (itemTodo.assignee_name) {
                item.$.assignee.setContent("assigned to " + itemTodo.assignee_name);
            } else {
                item.$.assignee.setContent("Unassigned");
            }
            // item.$.addRemoveClass("list-item-selected", item.$.isSelected(index));

            var cur = this.tLists[inEvent.index][this.sortitem];
            var prev = this.tLists[inEvent.index - 1];
            var showd = cur != (prev && prev[this.sortitem]);
            if (showd) {
                this.createComponents({content: cur, classes: "header list-divider"});
                // item.$.divider.setContent(cur);
            }
            // item.$.divider.setContent(cur);
            // item.$.divider.canGenerate = showd;
            // this.$.item.applyStyle("border-top", showd ? "none" : null);
            // return true;
        }
    },
    listsResults: function(inSender, inResults) {
        console.log("this.todosLists: ", inResults);
        this.todosLists = inResults;
//        this.populateList();
        this.tLists = [];
        this.l = 0;
        for (var i = this.todosLists.length - 1; i >= 0; i--) {
            if (this.todosLists[i]) {
//                console.log("this.todosLists[i]: ", this.todosLists[i]);
                this.$.api.getTodolist(this.id, this.todosLists[i].id);
            }
        }
    },
    listResults: function(inSender, inResults) {
//        console.log("todosList: ", inResults);
        for (var j = inResults.todos.remaining.length - 1; j >= 0; j--) {
            if (inResults.todos.remaining[j]) {
                // console.log("this.todosLists[i].assigned_todos[j] :", this.todosLists[i].assigned_todos[j]);
                this.tLists[this.l] = inResults.todos.remaining[j];
                this.tLists[this.l].list_id = inResults.id;
                this.tLists[this.l]["list_name"] = inResults.name;
//                this.tLists[this.l].list_description = inResults.description;
                this.tLists[this.l].list_position = inResults.position;
                if (inResults.todos.remaining[j].assignee) {
                    this.tLists[this.l]["assignee_name"] = inResults.todos.remaining[j].assignee.name;
                    this.tLists[this.l].assignee_id = inResults.todos.remaining[j].assignee.id;
                    this.tLists[this.l].assignee_type = inResults.todos.remaining[j].assignee.type;
                } else {
                    this.tLists[this.l]["assignee_name"] = null;
                }
                if (inResults.todos.remaining[j].due_at) {
                    this.tLists[this.l]["due_at"] = inResults.todos.remaining[j].due_at;
                } else {
                    this.tLists[this.l]["due_at"] = null;
                }
            }
        this.l += 1;
        }
    },
    itemTapped: function (inSender, inEvent) {
        console.log("tapped: ", inSender);
        // inSender.addRemoveClass("list-item-selected", inSender.isSelected(index));
    },
    itemSelected: function(inSender, inEvent) {
        var a = "";
        //* Menu items send an onSelect event with a reference to themselves & any directly displayed content
        if (inEvent.originator.content){
            a = inEvent.originator.value;
        } else if (inEvent.selected){
            //* Since some of the menu items do not have directly displayed content (they are kinds with subcomponents),
            //* we have to handle those items differently here.
            a = inEvent.inEvent.selected.controlAtIndex(1).value;
        }
        if (a == "Sort by ...") {
            return;
        } else {
            this.sortitem = a;
            this.$.sortMenu.hide();
            this.tLists = this.sortBy(this.tLists, this.sortitem);
            this.$.list.setCount(this.tLists.length);
            this.$.list.render();
            console.log("this.sortitem: ", this.sortitem);
        }
    },
    checkboxChanged: function (inSender, inEvent) {
        console.log("clicked: ", inSender.getValue());
    },
    populateList: function () {
//        this.todosLists = getTodolists(10, 5);
        this.tLists = [];
        var l = 0;
        for (var i = this.todosLists.length - 1; i >= 0; i--) {
            if (this.todosLists[i]) {
//                console.log("this.todosLists[i]: ", this.todosLists[i]);
                this.$.api.getTodolist(this.id, this.todosLists[i].id)
                /*for (var j = this.todosLists[i].assigned_todos.length - 1; j >= 0; j--) {
                    if (this.todosLists[i].assigned_todos[j]) {
                        // console.log("this.todosLists[i].assigned_todos[j] :", this.todosLists[i].assigned_todos[j]);
                        this.tLists[l] = this.todosLists[i].assigned_todos[j];
                        this.tLists[l].list_id = this.todosLists[i].id;
                        this.tLists[l]["list_name"] = this.todosLists[i].name;
                        this.tLists[l].list_description = this.todosLists[i].description;
                        this.tLists[l].list_position = this.todosLists[i].position;

                        this.tLists[l]["assignee_name"] = this.todosLists[i].assigned_todos[j].assignee.name;
                        this.tLists[l].assignee_id = this.todosLists[i].assigned_todos[j].assignee.id;
                        this.tLists[l].assignee_type = this.todosLists[i].assigned_todos[j].assignee.type;

                        this.tLists[l]["due_at"] = this.todosLists[i].assigned_todos[j].due_at;
                    }
                l += 1;
                }*/
            }
        }
        /*this.tLists.sort(function (a,b) {
            return parseFloat(a.list_id) - parseFloat(b.list_id);
        });*/
        this.tLists = this.sortBy(this.tLists, this.sortitem);
        // console.log("this.tLists: ", this.tLists);
        // console.log("l: ", l);
        this.$.list.setCount(this.tLists.length);
        this.$.list.render();
    },
    _dynamicSort: function (inProperty) {
        return function (a,b) {
            return (a[inProperty] < b[inProperty]) ? -1 : (a[inProperty] > b[inProperty]) ? 1 : 0;
        };
    },
    sortBy: function (inArray, inProperty) {
        return inArray.sort(this._dynamicSort(inProperty));
    }

});

enyo.kind({
    name: "TodoListItem",
    events: {
        onRemove: ""
    },
    published: {
        todo: ""
    },
    components: [
        {kind: "FittableRows", style: "overflow: auto;", components: [
            {kind: "FittableColumns", components: [
                {style: "text-align:center;", components: [
                    {kind:"onyx.Checkbox", onchange:"checkboxChanged", style: "padding-right: 5px;"}
                ]},
                {name: "todo", style: "font-size:16px;padding-top:5px;overflow: auto;"}
            ]},
            {kind: "FittableColumns", style: "font-size:14px;margin-top:10px;", components: [
                {name: "date", style: "margin-right:20px;"},
                {name: "assignee"}
            ]}
        ]}
    ],
    todoChanged: function () {
        this.$.todo.setContent(this.todo.content);
        this.$.date.setContent("Due on " + this.todo.due_at);
        this.$.assignee.setContent("assigned to " + this.todo.assignee.name);
        this.render();
    },
    setSelected: function (inSelected) {
        this.addRemoveClass("list-item-selected", inSelected);
    },
    checkboxChanged: function (inSender) {
        console.log("clicked: ", inSender);
    }
});

enyo.kind({
    name: "App.Project.Todos.Right",
    kind: "FittableRows",
    components: [
        {kind: "Signals", onTodo: "viewSelected"}
    ],
    create: function () {
        this.inherited(arguments);
        this.todoArray = {};
    },
    viewSelected: function (inIndex, inTodo) {
        if (this.$.todoView) {
            console.log("todoView exists, destroying it");
            this.$.todoView.destroy();
        }
//        console.log("inTodo: ", inTodo);
        var c = "";
        if (inTodo == "new") {
            c = this.createComponent({container: this, name: "todoView", kind: "NewTodo"});
            c.render();
        } else {
            c = this.createComponent({container: this, name: "todoView", kind: "TodoDetails", todo: inTodo.id});
            c.render();
            this.todoArray = inTodo;
        }
    }
});

enyo.kind({
    name: "NewTodo",
    kind: "Scroller",
    fit: true,
    components: [
        {content: "Add a To-do", classes: "item-tittle enyo-border-box"},
        
        {kind: "FittableRows", components: [
            {content: "To-do list name:", classes: "new-message-subject-title"},
            {kind: "onyx.InputDecorator", classes: "new-message-subject-entry", components: [
                {kind: "onyx.Input", defaultFocus: true, style: "width:100%", placeholder: "Enter to-do list name ...", onchange: "lnameChanged"}
            ]},
            
            {content: "List Description:", classes: "new-message-subject-title"},
            {kind: "onyx.InputDecorator", classes: "new-message-subject-entry", components: [
                {kind: "onyx.Input", style: "width:100%", placeholder: "Enter to-do list description ...", onchange: "ldescriptionChanged"}
            ]},
            
            {content: "To-do:", classes: "new-message-subject-title"},
            {kind: "onyx.InputDecorator", classes: "new-message-subject-entry", components: [
                {kind: "onyx.Input", style: "width:100%", placeholder: "Enter to-do description ...", onchange: "todoChanged"}
            ]},
            {kind: "FittableColumns", style: "font-size:14px;padding:10px 20px;", components: [
                {name: "date", style: "font-size:14px;"},
                {fit: true},
                {kind: "onyx.Button", content: "Change due date", ontap: "showPopup", popup: "duedatePopup"}
            ]},
            {kind: "FittableColumns", style: "font-size:14px;padding:10px 20px;", components: [
                {name: "assignee", style: "font-size:14px;"},
                {fit: true},
                {kind: "onyx.Button", content: "Change assignee", ontap: "assigneeTap"}
            ]},
            {style: "text-align:center;", defaultKind: "onyx.Button", components: [
                {content: "Validate", classes: "onyx-affirmative", style: "margin:5px;", ontap: "validateTapped"},
                {content: "Cancel", style: "margin:5px;", ontap: "cancelTapped"}
            ]}
        ]},
//        {kind: "FittableRows", components: [
//            {kind: "onyx.Button", content: "Change due date", ontap: "showPopup", popup: "duedatePopup"}
//        ]},

        /*{name: "previewPopup", kind: "onyx.Popup", centered: true, floating: true, style: "padding:10px;background: #eee;color: black;", components: [
            {content: "Discussion Preview", classes: "item-tittle enyo-border-box"},
            {name: "Preview", content: ""},
            {classes: "new-message-button-tools", defaultKind: "onyx.Button", components: [
                {content: "Validate", classes: "onyx-affirmative", ontap: "validateTapped"},
                {content: "Cancel", ontap: "cancelTapped"}
            ]}
        ]},*/
        {name: "duedatePopup", kind: "onyx.Popup", centered: true, floating: true, scrim: true, style: "background: #eee;color: black;padding: 10px;", components: [
            {kind: "GTS.DatePicker", onChange: "dateChanged"},
            {style: "text-align:center;", defaultKind: "onyx.Button", components: [
                {content: "Validate", classes: "onyx-affirmative", style: "margin:5px;", ontap: "validateDateTapped"},
                {content: "Cancel", style: "margin:5px;", ontap: "cancelDateTapped"}
            ]}
        ]}
    ],
    create: function () {
        this.inherited(arguments);
        this.newMessage = {};
        
        this.$.date.setContent("Due at ");
        this.$.assignee.setContent("Assigned to");
    
    },
    rendered: function () {
        this.inherited(arguments);
    },
    showPopup: function(inSender) {
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
            p.render();
		}
	},
    dateChanged: function (inSender) {
        this.newDueDate = inSender.value;
    },
    validateDateTapped: function (inSender, inEvent) {
        console.log("validate chosen date: ", this.newDueDate);
        this.$.date.setContent("Due at " + this.newDueDate.toLocaleDateString());
        this.$.duedatePopup.hide();
        this.render();
        
    },
    cancelDateTapped: function (inSender, inEvent) {
        this.$.duedatePopup.hide();
    }
	/*subjectChanged: function (inSender, inEvent) {
		this.newMessage.subject = inSender.getValue();
	},
    bodyChanged: function (inSender, inEvent) {
        this.newMessage.content = inSender.getValue();
    },
    previewTapped: function (inSender, inEvent) {
        this.$.Preview.setContent(this.newMessage);
        this.$.previewPopup.show();
    },
    validateTapped: function (inSender, inEvent) {
//        console.log("this.newMessage: ", this.newMessage);
    },
    cancelTapped: function (inSender, inEvent) {
        this.$.previewPopup.hide();
    }*/
});

enyo.kind({
    name: "TodoDetails",
    kind: "Scroller",
    horizontal: "hidden",
//    fit: true,
    published: {
        todoId: null
    },
    components: [
        {name: "listName"},
        {kind: "FittableColumns", style: "padding:10px 20px;", components: [
            {style: "text-align:center;", components: [
                {kind:"onyx.Checkbox", onchange:"checkboxChanged"}
            ]},
            {kind: "FittableRows", style: "margin-left:20px;overflow: auto;", components: [
                {name: "subject", style: "font-size:16pxpadding-top:5px;margin-right:20px;"}
            ]}
        ]},
        {kind: "FittableColumns", style: "font-size:14px;padding:10px 20px;", components: [
            {name: "date", style: "font-size:14px;"},
            {fit: true},
            {kind: "onyx.Button", content: "Change due date", ontap: "showPopup", popup: "duedatePopup"}
        ]},
        {kind: "FittableColumns", style: "font-size:14px;padding:10px 20px;", components: [
            {name: "assignee", style: "font-size:14px;"},
            {fit: true},
            {kind: "onyx.Button", content: "Change assignee", ontap: "assigneeTap"}
        ]},
//        {name: "subject", style: "padding:16px 12px;font-weight:bold;"},
//        {name: "date", style: "font-size:14px;"},
//        {name: "assignee", style: "font-size:14px;"},
        
        {content: "Comments", style: "font-size:16px;padding:12px 12px;font-weight:bold;margin-top:12px;"},
        
        {name: "commentsRepeater", kind: "Repeater", count: 0, onSetupItem: "setupItem", components: [
            {name: "item", kind: "UniqueMessage", /*classes: "item enyo-border-box",*/ ontap: "itemTap"}
        ]},
        {name: "duedatePopup", kind: "onyx.Popup", centered: true, floating: true, scrim: true, style: "background: #eee;color: black;padding: 10px;", components: [
            {kind: "GTS.DatePicker"},
            {style: "text-align:center;", defaultKind: "onyx.Button", components: [
                {content: "Validate", classes: "onyx-affirmative", style: "margin:5px;"},
                {content: "Cancel", style: "margin:5px;"}
            ]}
        ]}
    ],
    create: function () {
        this.inherited(arguments);
        
        // on recupere le todo "complet"
        this.completeTodo = getTodo(/*this.todo.id*/);
        // onrecupere le nom et les subscribers de la liste
        var lname = getTodoList(this.completeTodo.todolist_id).name;
        var lsub = getTodoList(this.completeTodo.todolist_id).subscribers;
        
        this.$.listName.setContent("from to-do list " + lname);
        this.$.subject.setContent(this.completeTodo.content);
        this.$.date.setContent("due at " + this.completeTodo.due_at);
        if (this.completeTodo.assignee) {
            this.$.assignee.setContent("assigned to " + this.completeTodo.assignee.name);
        }
        
        if (this.completeTodo.comments_count !== 0) {
            this.$.commentsRepeater.setCount(this.completeTodo.comments.length);
            this.$.commentsRepeater.render();
        }
    },
    rendered: function () {
        this.inherited(arguments);
/*
 * il faut récupérer le nom de la liste du to-do à afficher, ainsi que la liste des subscribers; via https://github.com/37signals/bcx-api/blob/master/sections/todos.md#get-todo
 * pour pouvoir les afficher dans la panel de droite.
 */
        
    },
    showPopup: function(inSender) {
        console.log("will popup: ", inSender.popup);
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
    setupItem: function(inSender, inEvent) {
        inEvent.item.$.item.setItem(this.completeTodo.comments[inEvent.index]);
    }
});
