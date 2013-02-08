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
