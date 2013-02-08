
htmlStatusCodes = [
    {401: "401 Unauthorized"},
    {415: "415 Unsupported Media Type"},
    {429: "429 Too Many Requests"},
    {500: "500 Website is down"},
    {502: "502 Bad Gateway"},
    {503: "503 Service Unavailable"},
    {504: "504 Gateway Timeout"}
];

enyo.kind({
    name: "BasecampApi",
    kind: "Component",
//    published: {
//        url : "https://basecamp.com/1900911/api/v1/"
//    },
    events: {
        onResults: "",
        onList: "",
        onLists: "",
        onPeople: "",
        onError: ""
    },
    url : "https://basecamp.com/1990765/api/v1/",
//    url : "https://public.basecamp.com/1679267/",
    create: function() {
        this.inherited(arguments);
//        this.request = new enyo.Ajax({
//            url: this.url,
//            contentType: 'application/json',
//            username: 'nicolas.delebecque@gmail.com',
//            password: 'eqfxa9ef'
//        });
    },
    params: {
        contentType: "application/json",
        username: "nicodel.achat@gmail.com",
        password: "Panama4Ever",
        headers: {"User-Agent": "Testing.. any problem, contact me at nicolas.delebecque@gmail.com)"}
    },
    getProjects: function () {
//        return new enyo.Ajax({url: this.url + "projects.json"/*, callbackName: "jsoncallback"*/})
//			.response(this, "getResults")
//			.go(this.params)
//            .error(this, "processError")
//			;
        var a = this.getResults(getProjects(5));
        console.log("a :", a);
        return a
    },
    getProject: function (inProject) {

    },
    getPeople: function () {
//        return new enyo.Ajax({url: this.url + "people.json"/*, callbackName: "jsoncallback"*/})
//			.response(this, "getPeopleResults")
//			.go(this.params)
//            .error(this, "processError")
//			;
        var a = this.getPeopleResults(getPeoples(15));
        console.log("People :", a);
        return a
    },
    getPeopleResults: function (inSender, inResponse) {
//        console.log("getPeopleResults: ", inResponse);
        this.doPeople(inResponse);
		return inResponse;
    },
    getAccesses: function (inProject) {
        
    },
    getTopics: function (inProject) {

    },
    geMessage: function (inProject, inMessage) {

    },
    getTodoLists: function (inProject) {
//        return new enyo.Ajax({url: this.url + "projects/" + inProject + "/todolists.json"/*, callbackName: "jsoncallback"*/})
//			.response(this, "getListsResults")
//			.go(this.params)
//			;
        var a = this.getListsResults(getTodolists(10, 10));
        console.log("Lists :", a);
        return a
    },
    getListsResults: function (inSender, inResponse) {
        this.doLists(inResponse);
		return inResponse;
    },
    getTodolist: function (inProject, InTodolist) {
        return new enyo.Ajax({url: this.url + "projects/" + inProject + "/todolists/" + InTodolist + ".json"/*, callbackName: "jsoncallback"*/})
			.response(this, "getListResults")
			.go(this.params)
			;
    },
    getListResults: function (inSender, inResponse) {
		console.log('inResponse: ', inSender);
        this.doList(inSender);
		return inSender;
    },
    getTodo: function (inProject, InTodo) {
        
    },
    getResults: function (inSender, inResponse) {
		console.log('inResponse: ', inSender);
        this.doResults(inSender);
		return inSender;
	},
    processError: function (inSender, inError) {
        this.doError(inSender, inError);
    }
});

/*        var request = new enyo.Ajax({
            url: 'https://basecamp.com/1900911/api/v1/people.json',
            contentType: 'application/json',
            username: 'nicolas.delebecque@gmail.com',
            password: 'eqfxa9ef',
//            handleAs: 'json'
        });
        request.response(enyo.bind(this, 'getResults'));
        request.go();
*/
	
	