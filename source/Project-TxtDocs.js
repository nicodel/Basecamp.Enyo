enyo.kind({
    name: "App.Project.TxtDocs.Left",
    kind: "FittableRows",
    components: [
        {content: "Text Documents"},
        {fit: true}  
    ],
    create: function (){
        this.inherited(arguments);
    }
});
enyo.kind({
    name: "App.Project.TxtDocs.Right",
    kind: "FittableRows",
    components: [
        {kind: "Signals", onTxtdoc: "viewSelected"},
        {content: "Text Document Details"}
    ],
    create: function () {
        this.inherited(arguments);
        this.txtdocArray = {}
    },
    viewSelected: function (inIndex, inMessage) {
        if (this.$.txtdocView) {
            this.$.txtdocView.destroy();
        };
        console.log("will show: ", inMessage);
        if (inMessage == "new") {
            var c = this.createComponent({container: this, name: "txtdocView", components: [
                {content: "New text document"}
            ]});
            c.render();
        } else {
            var c = this.createComponent({container: this, name: "txtdocView", components: [
                {content: "Selected text document"}
//                {name: "subject", content: ""},
//                {name: "author", content: ""}
            ]});
            c.render();
            this.txtdocArray = inMessage;
//            this.$.subject.setContent(this.txtdocArray.subject);
//            this.$.author.setContent("By " + this.txtdocArray.creator.name);
        };
    }
});
