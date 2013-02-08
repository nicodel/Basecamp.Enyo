/*
 * TODO :
 *  + vérifier la necessite de positionner sur les panneaux left et right les paramêtres suivants "realtimeFit: true, draggable: false, animate: false"
 *  + rendre les entrée du menu Projet disable pour la premiere version de l'application (disable = Files & Text Documents )
 *
 */

var panels = [
    {name: "ProjectName",content: "Project Name", kind: "App.Project.Summary", nb: 1, value: 0},
    {name: "Discussions", content: "Discussions", kind: "App.Project.Discussions", nb: 2, value: 1},
    {name: "To-doLists", content: "To-do Lists", kind: "App.Project.Todos", nb: 2, value: 2},
    {name: "Files", content: "Files", kind: "App.Project.Files", nb: 1, value: 3},
    {name: "TextDocuments", content: "Text Documents", kind: "App.Project.TxtDocs", nb: 2, value: 4}
];

enyo.kind({
    name: "App.Project",
    kind: "Panels",
    classes: "app enyo-unselectable",
    realtimeFit: true,
    arrangerKind: "CollapsingArranger",
    published: {
        project: ""
    },
    components: [
        {kind: "FittableRows", style: "width:250px;", components: [
            {name: "menu", kind: "sfeast.SelectableRepeater", selectColor: "#CDE8FE url(assets/gradient-invert.png) repeat-x", count: 0, onSetupItem: "setupItem", components: [
                {name: "item", classes: "menu-item enyo-border-box", ontap: "itemTap"}
            ]},
            {fit: true},
            {name: "peopleGallery", kind: "PeopleGallery", fit: true},
            
            {kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
                {fit: true},
                {kind: "onyx.Button", name: "inviteButton", content: "Invite", ontap: "inviteTap"}
            ]},
            
            {name: "invitePopup", kind: "onyx.Popup", centered: true, floating: true, style: "max-width:80%; max-height:90%", components: [
                {content: "Invite people", style: "text-align:center;font-weight:bold;padding:10px;"},
                {kind: "Scroller", components: [
                    {name: "inviteGallery", kind: "InviteGallery", fit: true}
                ]},
                {kind: "onyx.Button", content: "Invite more people", ontap: "inviteMoreTapped"},
                {style: "text-align:center;", defaultKind: "onyx.Button", components: [
                    {content: "Validate", classes: "onyx-affirmative", style: "margin:5px;"},
                    {content: "Cancel", style: "margin:5px;"}
                ]}
            ]}
        ]},
        {name: "summaryRows", kind: "FittableRows", style: "width:420px;", components: [
            {name: "left", kind: "Panels", fit: true, realtimeFit: true, draggable: false, animate: false, classes: "panels enyo-border-box", components: [
                {kind: "App.Project.Summary"},
                {kind: "App.Project.Discussions.Left"},
                {kind: "App.Project.Todos.Left"},
                {kind: "App.Project.Files"},
                {kind: "App.Project.TxtDocs.Left"}
            ]},
            {kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
                {kind: "onyx.Grabber"},
                {kind: "onyx.Button", name: "newButton", content: "New", ontap: "newTap"}
            ]}
        ]},
        {kind: "BasecampApi", name: "api", onPeople: "peopleResults"},
        {kind: "Signals", onItemSelected: "middleSelected"}
    ],
    create: function() {
        this.inherited(arguments);
        this.$.menu.setCount(panels.length);
        this.listIndex = "";
        
        
//        this.peopleArray = getPeoples(15);
//        this.$.peopleGallery.setWidgets(this.peopleArray);
    },
    rendered: function() {
        this.inherited(arguments);
        var tmp = {};
        tmp.index = 0;
        this.itemTap("", tmp);
    },
    projectChanged: function () {
        this.$.api.getPeople();
        this.$.menu.build();
    },
    peopleResults: function (inSender, inResults) {
//        this.peopleArray =  inResults;
//        console.log("People: ", inResults);
        this.$.peopleGallery.setWidgets(inResults);
    },
    showSelected: function (inEventName, inEvent, inSender) {
        this.$.right.setItem(inEvent);
    },
    setupItem: function(inSender, inEvent) {
        var it = inEvent.item;
        if (panels[inEvent.index].value === 0) {
            it.$.item.setContent(this.project.name);
            it.$.item.addClass("item-header");
        } else if (panels[inEvent.index].value == 3 || panels[inEvent.index].value == 4) {
            it.$.item.addStyles("color:#aaaaaa;");
            it.$.item.setContent(panels[inEvent.index].content);
        } else {
            it.$.item.setContent(panels[inEvent.index].content);
        }
        return true;
    },
    itemTap: function(inSender, inEvent) {
        this.listIndex = inEvent.index;
        if (inEvent.index === 0) {
            this.$.newButton.setDisabled(true);
        } else if (this.$.newButton.getDisabled() === true) {
            this.$.newButton.setDisabled(false);
        }
        var p = panels[inEvent.index];
        this.$.left.setIndex(p.value);
        if (p.nb == 1 && this.$.detailsRows) {
            this.$.detailsRows.destroy();
        }
        if (p.nb === 2) {
            if (this.$.detailsRows) {
                this.$.detailsRows.destroy();
            }
//            if (!this.$.detailsRows) {
//            console.log("Create right panel");
            var c = this.createComponent({container: this, kind: "FittableRows", name: "detailsRows", components: [
                {name: "right", kind: "Panels", fit: true, realtimeFit: true, draggable: false, animate: false, classes: "panels enyo-border-box", components: [
                    {kind: "App.Project.Summary"},
                    {kind: "App.Project.Discussions.Right"},
                    {kind: "App.Project.Todos.Right"},
                    {kind: "App.Project.Files"},
                    {kind: "App.Project.TxtDocs.Right"}
                ]},
                {kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
                    {kind: "onyx.Grabber"},
                    {kind: "onyx.Button", name: "addButton", content: "Add", ontap: "addTap"}
                ]}
            ]});
            c.render();
//            }
            this.$.right.setIndex(p.value);
            this.reflow();
        }
        // DON'T REMOVE : Adaptive design for mobile
        if (enyo.Panels.isScreenNarrow()) {
            this.setIndex(1);
        }
    },
    newTap: function (inSender, inEvent) {
        if (this.listIndex === 0) {
        } else if (this.listIndex === 1) {
            enyo.Signals.send("onMessage", "new");
        } else if (this.listIndex === 2) {
            enyo.Signals.send("onTodo",  "new");
        } else if (this.listIndex === 3) {
            enyo.Signals.send("onFile",  "new");
        } else if (this.listIndex === 4) {
            enyo.Signals.send("onTxtdoc",  "new");
        }
        // DON'T REMOVE : Adaptive design for mobile
        if (enyo.Panels.isScreenNarrow()) {
            this.setIndex(2);
        }
    },
    middleSelected: function () {
        console.log("middleselected");
        // DON'T REMOVE : Adaptive design for mobile
        if (enyo.Panels.isScreenNarrow()) {
            this.setIndex(2);
        }
    },
    inviteTap: function (inSender, inEvent) {
        this.$.inviteGallery.setWidgets(this.peopleArray);
        this.$.invitePopup.show();
    }
});
