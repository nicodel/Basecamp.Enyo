enyo.kind({
    name: "TestXML",
	kind: enyo.Control,
	components: [
        {name: "toLog'", content: "Hello, world!"}
	],
	create: function () {
        this.inherited(arguments);
        
        var request = new enyo.Ajax({
            url: 'https://basecamp.com/1988280/api/v1/projects.json',
            contentType: 'application/json',
            username: 'nicodel.achat@yahoo.fr',
            password: 'Panama4Ever',
            headers: {"User-Agent": "Testing (nicodel.achat@yahoo.fr)"}
        });
        request.response(enyo.bind(this, 'getResults'));
        request.go();
        
        /*jso_configure({
            "basecamp": {
                client_id: "73061ef2a2fee0686c4d1c3f985c07c46e236325",
                client_server: "eeb088e0266e236af98d87143e76218a2426e345",
                redirect_uri: "http://nicoworkspace.free.fr",
                authorization: "https://launchpad.37signals.com/authorization/new"
            }
        });
        
        jso_ensureTokens({
            "basecamp": [false]
        });
        */
//        console.log("token: ", token);
	},
	
	getResults: function (inSender, inResponse) {
		console.log("inResponse: ", inResponse);
	}
});