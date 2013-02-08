
enyo.kind({
    name: "UniqueMessage",
    published: {
        item: null
    },
    kind: "FittableRows",
    style: "padding:10px 20px;border-bottom:1px solid #ddd;",
    components: [
        {kind: "FittableColumns", components: [
            {name: "creatorThumb", kind: "Image", style: "width:48px;height:48px;", src: "assets/avatars/devil.png"},
            {kind: "FittableRows", components: [
                {name: "upDate", style: "font-size:14px;"},
                {name: "creatorName", style: "font-size:14px;"}
            ]}
        ]},
        {name: "description", style: "font-size:14px;margin-top:10px;"}
    ],
    create: function () {
        this.inherited(arguments);
    },
    itemChanged: function () {
        this.$.creatorName.setContent(new Date(this.item.updated_at).toLocaleTimeString());
        this.$.upDate.setContent(this.item.creator.name);
        this.$.description.setContent(this.item.content);
    }
});