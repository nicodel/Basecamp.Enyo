/*
 * TODO :
 *  + Ajout de update_at dans le panneau du projet
 *  + Trouver un visuel pour notifier l'utilisateur denouveauté sur un projet depuis sa derniere visite
 *
 */

enyo.kind({
    name: "App.Home",
    kind: "Scroller",
    horizontal: "hidden",
    fit: true,
    components: [
//        {content: "Home"},
//        {name: "projectsGallery", kind: "ProjectsGallery", fit: true}
        {name: "cards", classes: "projects-cards"},
        {name: "list", classes: "projects-list"},
        {kind: "onyx.Spinner", name: "spin", classes: "enyo-fit onyx-light centered"},
        {kind: "onyx.Popup", name: "errorPopup", centered: true, modal: true, floating: true, style: "text-align:center;", components: [
            {name: "errorContent", style: "padding:10px;text-align:center;"},
            {tag: "br"},
            {kind: "onyx.Button", content: "Close", ontap: "closeModalPopup"}
        ]},
        {kind: "BasecampApi", name: "api", onResults: "searchResults", onError: "apiError"}
    ],
    
    create: function () {
        this.inherited(arguments);
//        this.projectsArray =  getProjects();
//        this.$.projectsGallery.setWidgets(this.projectsArray);
//        console.log("projectsArray: ", this.projectsArray);
//        this.renderItems();
    },
    launch: function () {
        this.$.spin.show();
        this.$.api.getProjects();
    },
    apiError: function (inSender, inError) {
        this.$.spin.hide();
        console.log("inError: ", inError);
        this.$.errorContent.setContent(inError.xhr.response);
        this.$.errorPopup.show();        
    },
    closeModalPopup: function () {
        this.$.errorPopup.hide();
    },
    renderItems: function(customItems) {
        this.$.cards.destroyClientControls();
        this.$.list.destroyClientControls();
        //
        var items = customItems || this.projectsArray;
        //
        for (var i=0, w; (w=items[i]); i++) {
            var more = {info: w, ontap: "itemTap"};
//            this.createComponent({kind: "ProjectsCard", container: this.$.cards, ontap: "projectTap"}, more);
            this.createComponent({container: this.$.cards, kind: "ProjectsListItem", classes: "projects-card", ontap: "projectTap"}, more);
            this.createComponent({kind: "ProjectsListItem", container: this.$.list, ontap: "projectTap"}, more);
        }
        // to make cards in last row left-aligned
//        for (i=0; i<3; i++) {
//            this.createComponent({container: this.$.cards, kind: "ProjectsListItem", classes: "projects-card-empty"});
//        }
//        console.log("rendering");
        this.$.cards.render();
        this.$.list.render();
    },
    projectTap: function (inSender, inEvent) {
//        console.log("project tapped: ", inSender.info.name);
        enyo.Signals.send("onProject",  inSender.info);
    },
    searchResults: function(inSender, inResults) {
//        console.log("this.projectsArray: ", inResults);
        this.$.spin.hide();
        this.projectsArray = inResults;
        this.renderItems();
//		this.$.searchSpinner.hide();
//		this.$.moreSpinner.hide();
//		this.results = this.results.concat(inResults);
//		this.$.list.setCount(this.results.length);
//		if (this.page == 0) {
//			this.$.list.reset();
//		} else {
//			this.$.list.refresh();
//		}
	}
});

enyo.kind({
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
});
