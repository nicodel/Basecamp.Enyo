/*enyo.kind({
    name: "ProjectsGallery",
    kind: "Scroller",
    classes: "enyo-list",
    published: {
        widgets: ""
    },
    components: [
        {name: "cards", classes: "projects-cards"},
        {name: "list", classes: "projects-list"}
    ],
    create: function () {
        this.inherited(arguments);
    },
    widgetsChanged: function () {
//        console.log("this.widgets: ", this.widgets);
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
            this.createComponent({kind: "ProjectsCard", container: this.$.cards, ontap: "projectTap"}, more);
            this.createComponent({kind: "ProjectsListItem", container: this.$.list, ontap: "projectTap"}, more);
        }
        // to make cards in last row left-aligned
        for (i=0; i<3; i++) {
            this.createComponent({kind: "ProjectsCard", container: this.$.cards, classes: "projects-card-empty"});
        }
//        console.log("rendering");
        this.$.cards.render();
        this.$.list.render();
    },
    projectTap: function (inSender, inEvent) {
//        console.log("project tapped: ", inSender.info.name);
        enyo.Signals.send("onProject",  inSender.info);
    }
});*/

/*enyo.kind({
    name: "ProjectsListItem",
    classes:"projects-listitem",
    published: {
        info: ""
    },
    components: [
//        {name: "icon", kind: "Image", classes: "icon"},
        {name: "name", classes: "projects-list-name"},
        {name: "description", classes: "projects-list-owner"}
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
});*/

/*enyo.kind({
    name: "ProjectsCard",
    kind: "ProjectsListItem",
    kindClasses: "projects-card",
    components: [
//        {classes: "icon-holder", ontap: "itemtap", components: [
//            {name: "icon", kind: "Image", classes: "icon"}
//        ]},
        {name: "name", classes: "projects-name"},
        {name: "description", classes: "projects-owner"}
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
//        console.log("item tapped: ", inSender);
    }
});*/


enyo.kind({
    name: "PeopleGallery",
    kind: "Scroller",
    classes: "enyo-list",
    published: {
        widgets: ""
    },
    components: [
        {name: "cards", classes: "people-cards"}
    ],
    create: function () {
        this.inherited(arguments);
    },
    widgetsChanged: function () {
        this.renderItems();
    },
    renderItems: function(customItems) {
        this.$.cards.destroyClientControls();
        var items = customItems || this.widgets;
        for (var i=0, w; (w=items[i]); i++) {
            var more = {info: w, ontap: "itemTap"};
            this.createComponent({kind: "PeopleCard", container: this.$.cards}, more);
        }
        // to make cards in last row left-aligned
        for (i=0; i<3; i++) {
            this.createComponent({kind: "PeopleCard", container: this.$.cards, classes: "people-card-empty"});
        }
        this.$.cards.render();
    },
});
enyo.kind({
    name: "PeopleCard",
    classes: "people-card",
    published: {
        info: ""
    },
    components: [
        /*{classes: "people-icon-holder", ontap: "itemtap", components: [
            {name: "icon", kind: "Image", classes: "people-icon"}
        ]},*/
        {kind: "onyx.Button", style: "text-align:center;padding:1px;margin:2px;", ontap: "itemtap", components: [
            {kind: "onyx.Icon", name: "icon", style: "max-width:32px;max-height:32px;"}
        ]}
    ],
    create: function() {
        this.inherited(arguments);
        this.infoChanged();
    },
    infoChanged: function() {
        this.inherited(arguments);
        if (this.info) {
            this.$.icon.setSrc(/*"assets/" + */this.info.avatar_url);
        }
    },
    itemtap: function (inSender, inEvent) {
//        console.log("item tapped: ", inSender);
    }
});

enyo.kind({
    name: "InviteGallery",
    kind: "Scroller",
    classes: "enyo-list",
    published: {
        widgets: ""
    },
    components: [
        {name: "cards", classes: "people-cards"}
    ],
    create: function () {
        this.inherited(arguments);
    },
    widgetsChanged: function () {
        this.renderItems();
    },
    renderItems: function(customItems) {
        this.$.cards.destroyClientControls();
        var items = customItems || this.widgets;
        for (var i=0, w; (w=items[i]); i++) {
            var more = {info: w, ontap: "itemTap"};
            this.createComponent({kind: "InviteCard", container: this.$.cards}, more);
        }
        // to make cards in last row left-aligned
        for (i=0; i<3; i++) {
            this.createComponent({kind: "InviteCard", container: this.$.cards, classes: "people-card-empty"});
        }
        this.$.cards.render();
    },
});

enyo.kind({
    name: "InviteCard",
    classes: "people-card",
    published: {
        info: ""
    },
    components: [
        {style: "text-align:center;margin:5px;", components: [
            {kind: "onyx.Button", style: "text-align:center;padding:1px;margin:2px;", ontap: "itemtap", components: [
                {kind: "onyx.Icon", name: "icon", style: "width:64px;height:64px;"}
            ]},
            {name: "user", style:"font-size:14px;width:64px;height:32px;"}
        ]}
    ],
    create: function() {
        this.inherited(arguments);
        this.infoChanged();
    },
    infoChanged: function() {
        this.inherited(arguments);
        if (this.info) {
            this.$.icon.setSrc(/*"assests/" + */this.info.avatar_url);
            this.$.user.setContent(this.info.name);
        }
    },
    itemtap: function (inSender, inEvent) {
//        console.log("item tapped: ", inSender);
    }
});