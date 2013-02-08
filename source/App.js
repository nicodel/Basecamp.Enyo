/*
 *  + regarder l'application flickr dans le enyo 2.0 sampler pour la zone de recherche et son affichage correct
 *
 */


enyo.kind({
    name: "App",
    fit: true,
    classes: "onyx",
    kind: 'FittableRows',
    components: [
        
        {kind: "FittableColumns", classes: "onyx-toolbar onyx-toolbar-inline onyx-menu-toolbar", components: [
            {fit: true},
            {kind: "onyx.MenuDecorator", components: [
                {content: "Choose ..."},
//                {kind: "onyx.Tooltip", content: "Where do you want to go ?"},
                {name: "mainMenu", kind: "onyx.Menu", ontap: "itemSelected", components: [
                    {content: "Projects", value: 1},
                    {content: "Calendar", value: 3},
                    {content: "Daily progress", value: 4},
                    {content: "Everyone", value: 5},
                    {content: "Me", value: 6}
                ]}
            ]} ,
            {kind: "onyx.InputDecorator", style: "width:60%;", layoutKind: "FittableColumnsLayout", components: [
                {kind: "onyx.Input", name: "searchInput", fit: true, /*style: "width:97%;",*/ placeholder: "Jump to a project, a person, or search", onkeydown: "searchOnEnter"},
                {kind: "Image", style: "width: 20px; height: 20px;", src: "assets/search-input-search.png", ontap: "searchTapped"}
            ]}
        ]},

        {name: "topPanels", kind: "Panels", fit: true, components: [
            {name: "SignPanel", kind: "App.Sign"},
            {name: "homePanel", kind: "App.Home"},
            {name: "projectPanel", kind: "App.Project"},
            {name: "calendarPanel", kind: "App.Calendar"},
            {name: "dailyPanel", kind: "App.Daily"},
            {name: "everyonePanel", kind: "App.Everyone"},
            {name: "mePanel", kind: "App.Me"}
        ]},
        {kind: "Signals", onProject: "viewProject", onLogged: "logged"}
    ],
    create: function () {
        this.inherited(arguments);
        this.$.topPanels.setIndex(0);
    },
    logged: function () {
        this.$.homePanel.launch();
        this.$.topPanels.setIndex(1);
    },
    viewProject: function (inSender, inProject) {
//        console.log("show project: ", inProject);
        this.$.projectPanel.setProject(inProject);
        this.$.topPanels.setIndex(2);
    },
    itemSelected: function(inSender, inEvent) {
//        console.log("tap: ", inEvent);
        var a = "";
        //* Menu items send an onSelect event with a reference to themselves & any directly displayed content
        if (inEvent.originator.content){
//            console.log(inEvent.originator.content + " Selected");
            a = inEvent.originator.value;
        } else if (inEvent.selected){
            //*	Since some of the menu items do not have directly displayed content (they are kinds with subcomponents),
            //*	we have to handle those items differently here.
//            console.log(inEvent.selected.controlAtIndex(1).content + " Selected");
            a = inEvent.inEvent.selected.controlAtIndex(1).value;
        }
        if (a == "Choose ...") {
//            console.log("choose, returning");
            return
        } else {
//            console.log("not choose, so go to ", a);
            this.$.topPanels.setIndex(a);
            this.$.mainMenu.hide();
        }
    }
});
