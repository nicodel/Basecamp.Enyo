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
