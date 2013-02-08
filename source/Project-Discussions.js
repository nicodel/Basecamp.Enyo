
/*
 * TODO: 
 *  + faire un disable sur le bouton Add lors de l'affichage d'une vue nouvelle discussion
 *  + si "nouveau message" est selectionné, dé-sélectionner la discussion dans le panel du milieu.
 *  + travailler sur l'affichage de la date d'update du message dans le planel du milieu dans le kind MessageHeader. Si la modification est du jour, on affiche l'heure, sinon on affiche la date.
 *  + dans le kind MessageHeader, afficher le nom de l'utilisateur qui le dernier à modifé quelque chose à la discussion
 *  + récupérer l'avatar des utilisateurs.
 *  + le comportement du Scrolling sur le Panel de droite est étrange et pas franc. A valider sur plateforme
 *  + Prévoir l'afichage d'image ou de document s'il y en a d'attaché aux messages / commentaires.
 *
 */

//Message
//
//{
//  "id": 936075699,
//  "subject": "Welcome!",
//  "created_at": "2012-03-22T16:56:51-05:00",
//  "updated_at": "2012-03-22T16:56:51-05:00",
//  "content": "This is a new message",
//  "creator": {
//    "id": 149087659,
//    "name": "Jason Fried"
//  },
//  "comments": [
//    {
//      "id": 1028592764,
//      "content": "Yeah, really, welcome!",
//      "created_at": "2012-03-23T16:56:48-05:00",
//      "updated_at": "2012-03-23T16:56:48-05:00"
//      "creator": {
//        "id": 149087659,
//        "name": "Jason Fried"
//      }
//    }
//  ]
//}

enyo.kind({
    name: "MessageHeader",
    published: {
        item: null
    },
    kind: "FittableRows",
    components: [
        {kind: "FittableColumns", components: [
            {name: "creatorThumb", kind: "Image", style: "width:32px;height:32px;", src: "assets/avatars/devil.png"},
            {kind: "FittableRows", style: "margin:10px;", components: [
                {name: "subject", style: "font-size:16px;font-weight:bold;margin-right: 20px;overflow: auto;"},
                {name: "description", style: "font-size:14px;padding-top: 5px;margin-right: 20px;overflow: auto;"}
            ]}
        ]},
        {kind: "FittableColumns", style: "font-size:14px;padding-top: 5px;", components: [
            {name: "nbComments", style: "padding-right: 30px;"},
            {name: "upDate", style: "padding-right: 30px;"},
            {name: "lastUser"}
        ]}
            
        
    ],
    create: function () {
        //this.addClass("enyo-bg");
        this.inherited(arguments);
        this.itemChanged();
    },
    itemChanged: function () {
//        console.log("item changed :", this.item);
        if (!this.item) {
            return;
        }
        this.$.subject.setContent(this.item.subject);
        this.$.description.setContent(this._truncateMe(this.item.content, 80));
        var uDate = new Date(this.item.updated_at);
        this.$.upDate.setContent(uDate.toLocaleTimeString());
        this.$.nbComments.setContent(this.item.comments.length + " comments");
        this.$.lastUser.setContent(this.item.creator.name);
    },
    _truncateMe: function(inString, inLength) {
		if (inString) {
			var trunc = inString;
			if (trunc.length > inLength) {
				trunc = trunc.substring(0, inLength);
				trunc = trunc.replace(/\w+$/, '');
				trunc += ' ...';
				inString = trunc;
			}
			return inString;
		}
	}
});
enyo.kind({
    name: "App.Project.Discussions.Left",
    kind: "FittableRows",
    components: [
        {content: "Discussions List", classes: "list-header enyo-border-box"},
        
        {name: "MessageList", kind: "PulldownList", fit: true, onSetupItem: "setupItem", ontap: "itemTap", components: [
            {name: "item", classes: "item enyo-border-box", kind: "MessageHeader"}
        ]}
    ],
    create: function () {
        this.inherited(arguments);
    },
    rendered: function () {
        this.inherited(arguments);
//        this.discussionsArray = getDiscussions(15);
//        this.$.MessageList.setCount(this.discussionsArray.length);
//        this.$.MessageList.render();
    },
    setupItem: function (inSender, inEvent) {
//        console.log("this.$.item: ", this.$.item);
        this.$.item.setItem(this.discussionsArray[inEvent.index]);
        this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));
    },
    itemTap: function (inSender, inEvent) {
        var o = inEvent.originator.owner;
        enyo.Signals.send("onMessage", this.discussionsArray[inEvent.index]);
        enyo.Signals.send("onItemSelected");
    }
});

enyo.kind({
    name: "App.Project.Discussions.Right",
    kind: "FittableRows",
//    fit: true,
    components: [
        {kind: "Signals", onMessage: "viewSelected"}       
    ],
    create: function () {
        this.inherited(arguments);
        this.messageArray = {}
    },
    viewSelected: function (inIndex, inMessage) {
        if (this.$.MessageView) {
//            console.log("MessageView exists, destroying it");
            this.$.MessageView.destroy();
        };
//        console.log("will show: ", inMessage);
        if (inMessage == "new") {
            var c = this.createComponent({container: this, kind: "NewMessage", name: "MessageView"});
        } else {
            var c = this.createComponent({container: this, kind: "MessageDetails", name: "MessageView", message: inMessage});
        }
        c.render();
    }    
});

enyo.kind({
    name: "NewMessage",
    kind: "Scroller",
    fit: true,
    components: [
        {content: "Add a Discussion", classes: "item-tittle enyo-border-box"},
        
        {kind: "FittableRows", components: [
            {content: "Subject:", classes: "new-message-subject-title"},
            {kind: "onyx.InputDecorator", classes: "new-message-subject-entry", components: [
                {kind: "onyx.Input", defaultFocus: true, style: "width:100%", placeholder: "Enter subject ...", onchange: "subjectChanged"}
            ]},
            
            {content: "Body:", classes: "new-message-body-title"},
            {kind: "onyx.InputDecorator", classes: "new-message-body-entry", components: [
                {kind: "onyx.TextArea", style: "width:100%", onchange: "bodyChanged"}
            ]},
            
            {name: "attachmentsView", kind: "Repeater", fit: false},
            
            {classes: "new-message-button-tools", defaultKind: "onyx.Button", components: [
                {content: "Add a file", ontap: "addTap"}
            ]},
            {classes: "new-message-button-tools", style: "text-align:center;", defaultKind: "onyx.Button", components: [
                {content: "Preview", ontap: "previewTap", ontap: "previewTapped"},
                {content: "Validate", classes: "onyx-affirmative", ontap: "validateTapped"},
                {content: "Cancel", ontap: "cancelTapped"}
            ]}
        ]},

        {name: "previewPopup", kind: "onyx.Popup", centered: true, floating: true, style: "padding:10px;background: #eee;color: black;", components: [
            {content: "Discussion Preview", classes: "item-tittle enyo-border-box"},
            {name: "Preview", content: ""},
            {classes: "new-message-button-tools", defaultKind: "onyx.Button", components: [
                {content: "Validate", classes: "onyx-affirmative", ontap: "validateTapped"},
                {content: "Cancel", ontap: "cancelTapped"}
            ]}
        ]}
    ],
    create: function () {
        this.inherited(arguments);
        this.newMessage = {};
    
    },
	subjectChanged: function (inSender, inEvent) {
		this.newMessage.subject = inSender.getValue();
	},
    bodyChanged: function (inSender, inEvent) {
        this.newMessage.content = inSender.getValue();
    },
    previewTapped: function (inSender, inEvent) {
        this.$.Preview.setContent(this.newMessage);
        this.$.previewPopup.show();
    },
    validateTapped: function (inSender, inEvent) {
//        console.log("this.newMessage: ", this.newMessage);
    },
    cancelTapped: function (inSender, inEvent) {
        this.$.previewPopup.hide();
    }
});

enyo.kind({
    name: "MessageDetails",
    kind: "Scroller",
    fit: true,
    published: {
        message: ""
    },
    components: [
        {name: "subject", style: "padding: 16px 12px;font-weight: bold;"},
        
        {name: "mainMessage", kind: "UniqueMessage", style: "margin-left:10px;"},
        
        {content: "Comments", style: "font-size:16px;padding: 12px 12px;font-weight: bold;"},
        
        {name: "commentsRepeater", kind: "Repeater", count: 0, onSetupItem: "setupItem", components: [
            {name: "item", kind: "UniqueMessage", /*classes: "item enyo-border-box",*/ ontap: "itemTap"}
        ]}
    ],
    create: function () {
        this.inherited(arguments);
    },
    rendered: function () {
        this.inherited(arguments);
        this.$.subject.setContent(this.message.subject);
        
//        console.log("this.$.mainMessage: ", this.$.mainMessage);
        this.$.mainMessage.setItem(this.message);
        
        this.$.commentsRepeater.setCount(this.message.comments.length);
//        this.$.commentsRepeater.render();
    },
    setupItem: function(inSender, inEvent) {
//        console.log("this.message.comments[inEvent.index]: ", this.message.comments[inEvent.index]);
        inEvent.item.$.item.setItem(this.message.comments[inEvent.index]);
//        this.$.item.setItem(this.message.comments[inEvent.index]);
        return true;
    }
});
/*
enyo.kind({
    name: "UniqueMessage",
    published: {
        item: null
    },
    kind: "FittableRows",
    style: "padding:10px 20px;",
    components: [
        {kind: "FittableColumns", components: [
            {name: "creatorThumb", kind: "Image", style: "width:48px;height:48px;", src: "test/avatars/devil.png"},
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
});*/