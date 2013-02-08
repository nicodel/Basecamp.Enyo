var widgets = [
    {name: "Widget 1"},
    {name: "Widget 2"},
    {name: "Widget 3"},
    {name: "Widget 4"},
    {name: "Widget 5"},
    {name: "Widget 6"},
    {name: "Widget 7"},
    {name: "Widget 8"},
    {name: "Widget 9"},
    {name: "Widget 10"},
    {name: "Widget 11"}
];
var avatars = [
    "angel.png",
    "astrologer.png",
    "athlete.png",
    "baby.png",
    "clown.png",
    "devil.png",
    "doctor.png",
    "dude.png",
    "dude2.png",
    "dude3.png",
    "dude4.png",
    "dude5.png",
    "dude6.png"
];
var panels = [
    {name: "Project Name", kind: "App.Project.Summary", nb: 1, value: 0},
    {name: "Discussions", kind: "App.Project.Discussions", nb: 2, value: 1},
    {name: "To-do Lists", kind: "App.Project.Todos", nb: 2, value: 2},
    {name: "Files", kind: "App.Project.Files", nb: 1, value: 3},
    {name: "Text documents", kind: "App.Project.TxtDocs", nb: 2, value: 4}
];

enyo.kind({
    name: "App",
    fit: true,
    classes: "onyx",
    kind: "FittableRows",
    components: [
        {kind: "FittableColumns", classes: "onyx-toolbar onyx-toolbar-inline onyx-menu-toolbar", components: [
            {content: "Test Gallery"}
        ]},
        {name: "gallery", kind: "Gallery", fit: true}
    ],
    create: function () {
        this.inherited(arguments);
        this.projectsArray = getProjects(6);
        this.$.gallery.setWidgets(this.projectsArray);
    }
});

/*
 *
 * Gallery Testing Protoype
 *
 */

enyo.kind({
    name: "Gallery",
    kind: "Scroller",
    classes: "enyo-list",
    published: {
        widgets: ""
    },
    components: [
        {name: "cards", classes: "cards"},
        {name: "list", classes: "list"}
    ],
    create: function () {
        this.inherited(arguments);
    },
    widgetsChanged: function () {
        this.renderItems();
    },
    renderItems: function(customItems) {
        this.$.cards.destroyClientControls();
        this.$.list.destroyClientControls();
        //
        var items = customItems || this.widgets;
        //
        for (var i=0, w; (w=items[i]); i++) {
            var more = {info: w, ontap: "itemTap"};
            this.createComponent({kind: "Card", container: this.$.cards}, more);
            this.createComponent({kind: "ListItem", container: this.$.list}, more);
        }
        // to make cards in last row left-aligned
        for (i=0; i<3; i++) {
            this.createComponent({kind: "Card", container: this.$.cards, classes: "card-empty"});
        }
        this.$.cards.render();
        this.$.list.render();
    },
});

enyo.kind({
    name: "ListItem",
    classes:"listitem",
    published: {
        info: ""
    },
    components: [
//        {name: "icon", kind: "Image", classes: "icon"},
        {name: "name", classes: "list-name"},
        {name: "description", classes: "list-owner"}
    ],
    create: function() {
        this.inherited(arguments);
        this.infoChanged();
    },
    infoChanged: function() {
        var i = this.info;
        if (!i) {
            return;
        }
//        this.$.icon.setSrc(i.avatar_url);
        this.$.name.setContent(i.name);
        this.$.description.setContent(i.description);
    }
});

enyo.kind({
    name: "Card",
    kind: "ListItem",
    kindClasses: "card",
    components: [
//        {classes: "icon-holder", ontap: "itemtap", components: [
//            {name: "icon", kind: "Image", classes: "icon"}
//        ]},
        {name: "name", classes: "name"},
        {name: "description", classes: "owner"}
    ],
    create: function() {
        this.inherited(arguments);
        this.infoChanged();
    },
    infoChanged: function() {
        this.inherited(arguments);
//        if (this.info) {
//            this.$.icon.setSrc(this.info.avatar_url);
//        }
    },
    itemtap: function (inSender, inEvent) {
        console.log("item tapped: ", inSender);
    }
});