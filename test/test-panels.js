var panels = [
    {name: "Project Name", kind: "App.Project.Summary", nb: 1, value: 0},
    {name: "Discussions", kind: "App.Project.Discussions", nb: 2, value: 1},
    {name: "Files", kind: "App.Project.Files", nb: 1, value: 3}
];

enyo.kind({
    name: "App",
    fit: true,
    classes: "onyx",
    kind: "FittableRows",
    components: [
        {kind: "FittableColumns", classes: "onyx-toolbar onyx-toolbar-inline onyx-menu-toolbar", components: [
            {content: "Test Panels"}
        ]},
        {name: "topPanels", kind: "Panels", fit: true, components: [
            {name: "projectPanel", kind: "App.Project"}
        ]},
        {kind: "Signals", onProject: "viewProject"}
    ],
    create: function () {
        this.inherited(arguments);
        this.$.topPanels.setIndex(0);
    }
});
var panels = [
    {name: "ProjectName",content: "Project Name", kind: "App.Project.Summary", nb: 1, value: 0},
    {name: "Discussions", content: "Discussions", kind: "App.Project.Discussions", nb: 2, value: 1},
    {name: "Files", content: "Files", kind: "App.Project.Files", nb: 1, value: 3}
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
        {kind: "FittableRows", components: [
            {name: "menu", kind: "Repeater", count: 0, onSetupItem: "setupItem", components: [
                {name: "item", classes: "item enyo-border-box", ontap: "itemTap"}
            ]},
            {fit: true},
            {kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
                {fit: true},
                {kind: "onyx.Button", name: "inviteButton", content: "Invite"}
            ]}
        ]},
        {name: "summaryRows", kind: "FittableRows", components: [
            {name: "left", kind: "LeftPanel", fit: true, ontap: "middleSelected"},
            {kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
                {kind: "onyx.Grabber"},
                {kind: "onyx.Button", name: "newButton", content: "New"}
            ]}
        ]},
        {kind: "Signals", onItemSelected: "middleSelected"},
    ],
    create: function() {
        this.inherited(arguments);
        this.$.menu.setCount(panels.length);
        this.listIndex = "";
    },
    rendered: function() {
        this.inherited(arguments)
        var tmp = {};
        tmp.index = 0;
        this.itemTap("", tmp);
    },
    showSelected: function (inEventName, inEvent, inSender) {
        this.$.right.setItem(inEvent);
    },
    setupItem: function(inSender, inEvent) {
        var it = inEvent.item;
        if (panels[inEvent.index].value == 0) {
            it.$.item.setContent(panels[inEvent.index].content);
            it.$.item.addClass("item-tittle");
        } else {
            it.$.item.addStyles("font-weight: normal;");
            it.$.item.setContent(panels[inEvent.index].content);
        };
        return true;
    },
    itemTap: function(inSender, inEvent) {
        this.listIndex = inEvent.index;
        if (inEvent.index == 0) {
            this.$.newButton.setDisabled(true);
        } else if (this.$.newButton.getDisabled() == true) {
            this.$.newButton.setDisabled(false);
        };
        var p = panels[inEvent.index];
//        console.log("Setting Left Panel to ", p.value);
//        this.$.left.destroyComponents();
        this.$.left.setIndex(p.value);
        if (p.nb == 1 && this.$.detailsRows) {
//            console.log("Destroy right panel");
//            this.destroyObject(this.$.detailsRows);
            this.$.detailsRows.destroy();
//            console.log("this.$.detailsRows: ", this.$.detailsRows);
//            this.$.detailsRows.reflow();
        };
        if (p.nb == 2) {            
            if (!this.$.detailsRows) {
                console.log("Create right panel");
                var c = this.createComponent({container: this, kind: "FittableRows", name: "detailsRows", components: [
                    {name: "right", kind: "RightPanel", fit: true},
                    {kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
                        {kind: "onyx.Grabber"},
                        {kind: "onyx.Button", name: "addButton", content: "Add", ontap: "addTap"}
                    ]}
                ]});
                c.render();
            }
//            console.log("Setting Right Panel to ", p.value);
//            this.$.right.destroyComponents();
            this.$.right.setIndex(p.value);
            this.reflow();
        };
//        this.$.top.render();
    },
});

enyo.kind({
    name: "LeftPanel",
    kind: "Panels",
//    realtimeFit: true,
//    draggable: false,
//    animate: false,
    classes: "panels enyo-border-box",
    components: [
        {kind: "App.Project.Summary"},
        {kind: "App.Project.Discussions.Left"},
        {kind: "App.Project.Files"}
    ]
});
enyo.kind({
    name: "RightPanel",
    kind: "Panels",
    realtimeFit: true,
    draggable: false,
    animate: false,
    classes: "panels enyo-border-box",
    components: [
        {kind: "App.Project.Summary"},
        {kind: "App.Project.Discussions.Right"},
        {kind: "App.Project.Files"}
    ]
});
enyo.kind({
    name: "App.Project.Summary",
    kind: "FittableRows",
    fit: true,
    components: [
        {content: "Project Summary Panel"}
    ],
    create: function () {
        this.inherited(arguments);
    }
});
enyo.kind({
    name: "App.Project.Discussions.Left",
    kind: "FittableRows",
    components: [
        {content: "Discussions List", classes: "item-tittle enyo-border-box"}
    ],
    create: function () {
        this.inherited(arguments);
    },
    rendered: function () {
        this.inherited(arguments);
    }
});

enyo.kind({
    name: "App.Project.Discussions.Right",
    kind: "FittableRows",
    components: [
        {content: "Discussion details"},
        {fit: true}        
    ],
    create: function () {
        this.inherited(arguments);
    }  
});
        enyo.kind({
    name: "App.Project.Files",
    kind: "FittableRows",
    components: [
        {content: "Files Panel"},
        {fit: true}   
    ],
    create: function (){
        this.inherited(arguments);
    }
});