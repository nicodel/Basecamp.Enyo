// Define a kind for the item to use in the SelectableRepeater.
enyo.kind({
    name: "MyItem",
    events: {
        onButtonTap: "",
    },
    style: "height: 60px;border-top:1px white solid;border-bottom:1px lightgray solid",
    components: [
            {content: "", style: "padding: 20px;float:left;"},
            {kind: "Button", ontap: "buttonTap", style: "margin-left:50px;margin-top:15px;"}
    ],
    buttonTap: function() {
        this.doButtonTap();
        return true; // prevents a button tap from interferring with row selection
    }
});

enyo.kind({
    name: "App",
    components: [
    {kind: "FittableRows", classes: "enyo-fit", components: [
        {kind: "onyx.Toolbar", content: "SelectableRepeater Demo", style: "background-color: #2B4E69;"},
        {name: "info", content: "No buttons clicked yet", style: "padding: 8px;"},

            {name: "scroll", kind: "Scroller", fit: true, components: [
                {name: "rep", kind: "sfeast.SelectableRepeater", count: 10, onSetupItem: "setupEntries", components:[
                   {kind: "MyItem"}
                ]}
            ]},

            {kind: "onyx.Button", ontap: "toggleItem", content: "Toggle Item #2", style: "margin: 6px;"},{tag: "br"},
            {kind: "onyx.Button", ontap: "getItemSelected", content: "Get Item Selected", style: "margin: 6px;"},{tag: "br"},
            {kind: "onyx.Button", ontap: "setItemSelected", content: "Selected Item #3", style: "margin: 6px;"},					
            {tag: "br"},
            {kind: "onyx.Button", ontap: "deSelectItem", content: "De-Select Item #3", style: "margin: 6px;"},{tag: "br"},			
            {kind: "onyx.Button", ontap: "updateSelectColor", content: "Update Select Color", style: "margin: 6px 4px 0px 6px;"},
            {kind: "onyx.Input", name: "color", value: "lightblue", style: "margin: 6px 4px 0px 6px;"},
            {tag: "br"},
            {name: "getSelectedResult", style: "padding:10px; display:inline;"}			
        ]}
    ],
    handlers: {
        onButtonTap: "buttonTap", //deals with our item button presses (ie not specific to SelectableRepeater)
    },
    create: function() {
        this.inherited(arguments);
        this.$.rep.build();
    },
    setupEntries: function(inSender, inEvent) {
        inEvent.item.$.myItem.$.control.setContent("Row " + inEvent.index);
        inEvent.item.$.myItem.$.button.setContent("Button " + inEvent.index);
    },
    buttonTap: function(inSender, inEvent) {
        var index = inEvent.index;
        this.$.info.setContent("Button " + index + " clicked");
    },		
    //SelectableRepeater methods calls
    toggleItem: function() {
        this.$.rep.toggle(2);
    },
    getItemSelected: function() {
        this.$.getSelectedResult.setContent(this.$.rep.getItemSelected());
    },
    setItemSelected: function(inSender, inEvent) {
        this.$.rep.setItemSelected(3);
    },
    deSelectItem: function(inSender, inEvent) {
        this.$.rep.deSelectItem(3);
    },	
    updateSelectColor: function(){
        this.$.rep.setSelectColor(this.$.color.getValue())
    }
});
