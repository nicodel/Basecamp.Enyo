/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
var avatars = [
    "angel.png",
    "astrologer.png",
    "athlete.png",
    "baby.png",
    "clown.png",
    "devil.png",
    "doctor.png",
    "dude.png",
    "dude2.png",
    "dude3.png",
    "dude4.png",
    "dude5.png",
    "dude6.png"
];
function randomString(l) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = l;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
};

//Authentification & Requests
//curl -u username:password \
//    -H 'Content-Type: application/json' \
//    -H 'User-Agent: MyApp (yourname@example.com)' \
//    -d '{ "name": "My new project!" }' \
//    https://basecamp.com/999999999/api/v1/projects.js



//
// Projects
//
//[
//  {
//    "id": 605816632,
//    "name": "BCX",
//    "description": "The Next Generation",
//    "updated_at": "2012-03-23T13:55:43-05:00",
//    "url": "https://basecamp.com/999999999/api/v1/projects/605816632-bcx.json",
//    "archived": false
//  },
//  {
//    "id": 684146117,
//    "name": "Nothing here!",
//    "description": null,
//    "updated_at": "2012-03-22T16:56:51-05:00",
//    "url": "https://basecamp.com/999999999/api/v1/projects/684146117-nothing-here.json",
//    "archived": false
//  }
//]

function getProjects(nb) {
    var projectsArray = [];
    
    for (var i = 0; i < nb; i++) {
        projectsArray[i] = {};
        projectsArray[i].name = Faker.Company.companyName();
        projectsArray[i].id = Faker.Address.zipCode();
        projectsArray[i].description = Faker.Lorem.sentence();
        projectsArray[i].updated_at = "2012-03-22T16:56:51-05:00";
        projectsArray[i].url = Faker.Internet.domainName();
        projectsArray[i].archived = "false";
    };
    console.log("getProjects :", projectsArray);
    return projectsArray;
};

//People
//
//[
//  {
//    "id": 149087659,
//    "name": "Jason Fried",
//    "email_address": "jason@37signals.com",
//    "avatar_url": "https://asset0.37img.com/global/4113d0a133a32931be8934e70b2ea21efeff72c1/avatar.96.gif?r=3",
//    "updated_at": "2012-03-22T16:56:48-05:00",
//    "url": "https://basecamp.com/999999999/api/v1/people/149087659-jason-fried.json"
//  },
//  {
//    "id": 1071630348,
//    "name": "Jeremy Kemper",
//    "email_address": "jeremy@37signals.com",
//    "avatar_url": "https://asset0.37img.com/global/e68cafa694e8f22203eb36f13dccfefa9ac0acb2/avatar.96.gif",
//    "updated_at": "2012-03-22T16:56:48-05:00",
//    "url": "https://basecamp.com/999999999/api/v1/people/1071630348-jeremy-kemper.json"
//  }
//]

function getPeoples(nb) {
    var peoplesArray = [];
    for (var i = 0; i < nb; i++) {
        peoplesArray[i] = {};
        peoplesArray[i].id = Faker.Address.zipCode();
        peoplesArray[i].name = Faker.Name.findName();
        peoplesArray[i].email_address = Faker.Internet.email();
        peoplesArray[i].avatar_url = "assets/avatars/" + avatars[Math.floor((Math.random() * 10) + 1)];
        peoplesArray[i].updated_at = "2012-03-22T16:56:51-05:00";
        peoplesArray[i].url = Faker.Internet.domainName();
    }
    return peoplesArray;
}

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
//      "created_at": "2012-03-22T16:56:48-05:00",
//      "updated_at": "2012-03-22T16:56:48-05:00"
//      "creator": {
//        "id": 149087659,
//        "name": "Jason Fried"
//      }
//    }
//  ]
//}

function getDiscussions(nb) {
    var discussionsArray = [];
    for (var i = 0; i < nb; i++) {
        discussionsArray[i] = {};
        discussionsArray[i].id = Faker.Address.zipCode();
        discussionsArray[i].subject = Faker.Lorem.words().toString().replace(",", " ");
        discussionsArray[i].created_at = "2012-03-22T16:56:51-05:00";
        discussionsArray[i].updated_at = "2012-03-22T16:56:48-05:00";
        discussionsArray[i].content = Faker.Lorem.paragraph();
        discussionsArray[i].creator = {};
        discussionsArray[i].creator.id = Faker.Address.zipCode();
        discussionsArray[i].creator.name = Faker.Name.findName();
        
        discussionsArray[i].comments = [];
        for (var j = 0; j < 2; j++) {
            discussionsArray[i].comments[j] = {};
            discussionsArray[i].comments[j].id = Faker.Address.zipCode();
            discussionsArray[i].comments[j].content = Faker.Lorem.paragraph();
            discussionsArray[i].comments[j].created_at = "2012-03-22T16:56:51-05:00";
            discussionsArray[i].comments[j].updated_at = "2012-03-22T16:56:48-05:00";
            discussionsArray[i].comments[j].creator = {};
            discussionsArray[i].comments[j].creator.id = Faker.Address.zipCode();
            discussionsArray[i].comments[j].creator.name = Faker.Name.findName();            
        };
    };
    return discussionsArray;
};

//Todo lists
//
//[
//  {
//    "id": 968316918,
//    "name": "Launch list",
//    "description": "What we need for launch!",
//    "updated_at": "2012-03-29T11:00:39-05:00",
//    "url": "http://bcx.dev/735644780/api/v1/projects/605816632-bcx/todolists/968316918-launch-list.json",
//    "completed": false,
//    "position": 1,
//    "assigned_todos": [
//      {
//        "id": 223304243,
//        "content": "Design it",
//        "due_at": "2012-03-30",
//        "comments_count": 0,
//        "created_at": "2012-03-27T13:19:30-05:00",
//        "updated_at": "2012-03-29T11:00:38-05:00",
//        "url": "http://bcx.dev/735644780/api/v1/projects/605816632-bcx/todos/223304243-design-it.json",
//        "position": 1
//      }
//    ]
//  },
//  {
//    "id": 812358930,
//    "name": "Version 2",
//    "description": "What we will do next",
//    "updated_at": "2012-03-29T10:50:33-05:00",
//    "url": "http://bcx.dev/735644780/api/v1/projects/605816632-bcx/todolists/812358930-version-2.json",
//    "completed": false,
//    "position": 2,
//    "assigned_todos": [
//      {
//        "id": 270524416,
//        "content": "Fix all the bugs",
//        "due_at": null,
//        "comments_count": 0,
//        "created_at": "2012-03-27T13:19:30-05:00",
//        "updated_at": "2012-03-29T10:50:33-05:00",
//        "url": "http://bcx.dev/735644780/api/v1/projects/605816632-bcx/todos/270524416-fix-all-the-bugs.json",
//        "position": 1
//      }
//    ]
//  }
//]

function getTodolists(nbL, nbT) {
    var todolistsArray = [];
    for (var i = 0; i < nbL; i++) {
        todolistsArray[i] = {};
        todolistsArray[i].id = Faker.Address.zipCode();
        todolistsArray[i].name = Faker.Lorem.words().toString().replace(",", " ");
        todolistsArray[i].description = Faker.Lorem.sentence();
        todolistsArray[i].updated_at = "2012-03-29T10:50:33-05:00";
        todolistsArray[i].url = "";
        todolistsArray[i].completed = false;
        todolistsArray[i].position = "1";
        todolistsArray[i].assigned_todos = [];
        for (var j = 0; j < nbT; j++) {
            todolistsArray[i].assigned_todos[j] = {};
            todolistsArray[i].assigned_todos[j].id = Faker.Address.zipCode();
            todolistsArray[i].assigned_todos[j].content = Faker.Lorem.words().toString().replace(",", " ");
            todolistsArray[i].assigned_todos[j].due_at = "2012-03-30";
            todolistsArray[i].assigned_todos[j].comments_count = 0;
            todolistsArray[i].assigned_todos[j].created_at = "2012-03-29T10:50:33-05:00";
            todolistsArray[i].assigned_todos[j].updated_at = "2012-03-29T10:50:33-05:00";
            todolistsArray[i].assigned_todos[j].url = "";
            todolistsArray[i].assigned_todos[j].position = j;
            todolistsArray[i].assigned_todos[j].assignee = {};
            todolistsArray[i].assigned_todos[j].assignee.id = Faker.Address.zipCode();
            todolistsArray[i].assigned_todos[j].assignee.name = Faker.Name.findName();
            todolistsArray[i].assigned_todos[j].assignee.type = "Personn";
            
        }
    }
    return todolistsArray;
}

//
//Todo List
//
//{
//  "id": 968316918,
//  "name": "Launch list",
//  "description": "What we need for launch!",
//  "created_at": "2012-03-24T09:53:35-05:00",
//  "updated_at": "2012-03-24T09:59:35-05:00",
//  "completed": false,
//  "position": 1,
//  "todos": {
//    "remaining": [
//      {
//        "id": 223304243,
//        "content": "Design it",
//        "due_at": "2012-03-24",
//        "comments_count": 0,
//        "created_at": "2012-03-24T09:53:35-05:00",
//        "updated_at": "2012-03-24T09:55:52-05:00",
//        "assignee": {
//          "id": 149087659,
//          "type": "Person",
//          "name": "Jason Fried"
//        },
//        "position": 1,
//        "url": "https://basecamp.com/999999999/api/v1/projects/605816632-bcx/todos/223304243-design-it.json"
//      },
//      {
//        "id": 411008527,
//        "content": "Test it",
//        "due_at": null,
//        "comments_count": 0,
//        "created_at": "2012-03-24T09:53:35-05:00",
//        "updated_at": "2012-03-24T09:53:35-05:00",
//        "assignee": {},
//        "position": 2,
//        "url": "https://basecamp.com/999999999/api/v1/projects/605816632-bcx/todos/411008527-test-it.json"
//      }
//    ],
//    "completed": [
//      {
//        "id": 1046098401,
//        "content": "Think of it",
//        "due_at": null,
//        "comments_count": 0,
//        "created_at": "2012-03-24T09:59:33-05:00",
//        "updated_at": "2012-03-24T09:59:35-05:00",
//        "completed_at": "2012-03-24T09:59:35-05:00",
//        "url": "https://basecamp.com/999999999/api/v1/projects/605816632-bcx/todos/1046098401-think-of-it.json",
//        "assignee": {},
//        "position": 3,
//        "completer": {
//          "id": 149087659,
//          "name": "Jason Fried"
//        }
//      }
//    ]
//  },
//  "comments": [
//    {
//      "id": 1028592764,
//      "content": "+1",
//      "created_at": "2012-03-24T09:53:34-05:00",
//      "updated_at": "2012-03-24T09:53:34-05:00",
//      "creator": {
//        "id": 127326141,
//        "name": "David Heinemeier Hansson"
//      }
//    }
//  ],
//  "subscribers": [
//    {
//      "id": 149087659,
//      "name": "Jason Fried"
//    },
//    {
//      "id": 1071630348,
//      "name": "Jeremy Kemper"
//    }
//  ]
//}
function getTodolist(nb, inList) {
    var todolistArray = {};
    todolistArray.id = Faker.Address.zipCode();
    todolistArray.name = Faker.Lorem.words().toString().replace(",", " ");
    todolistArray.description = Faker.Lorem.sentence();
    todolistArray.updated_at = "2012-03-29T10:50:33-05:00";
    todolistArray.url = "";
    todolistArray.completed = false;
    todolistArray.position = "1";
    todolistArray.todos = [];
    todolistArray.todos.remaining = [];
    for (var j = 0; j < nb; j++) {
        todolistArray.todos.remaining[j] = {};
        todolistArray.todos.remaining[j].id = Faker.Address.zipCode();
        todolistArray.todos.remaining[j].content = Faker.Lorem.words().toString().replace(",", " ");
        todolistArray.todos.remaining[j].due_at = "2012-03-30";
        todolistArray.todos.remaining[j].comments_count = 0;
        todolistArray.todos.remaining[j].created_at = "2012-03-29T10:50:33-05:00";
        todolistArray.todos.remaining[j].updated_at = "2012-03-29T10:50:33-05:00";
        todolistArray.todos.remaining[j].url = "";
        todolistArray.todos.remaining[j].position = j;
        todolistArray.todos.remaining[j].assignee = {};
        todolistArray.todos.remaining[j].assignee.id = Faker.Address.zipCode();
        todolistArray.todos.remaining[j].assignee.name = Faker.Name.findName();
        todolistArray.todos.remaining[j].assignee.type = "Personn";
    };
    todolistArray.todos.completed = [];
    for (var j = 0; j < nb; j++) {
        todolistArray.todos.completed[j] = {};
        todolistArray.todos.completed[j].id = Faker.Address.zipCode();
        todolistArray.todos.completed[j].content = Faker.Lorem.words().toString().replace(",", " ");
        todolistArray.todos.completed[j].due_at = null;
        todolistArray.todos.completed[j].comments_count = 0;
        todolistArray.todos.completed[j].created_at = "2012-03-29T10:50:33-05:00";
        todolistArray.todos.completed[j].updated_at = "2012-03-29T10:50:33-05:00";
        todolistArray.todos.completed[j].url = "";
        todolistArray.todos.completed[j].position = j;
        todolistArray.todos.completed[j].assignee = "";
        todolistArray.todos.completed[j].completer = {};
        todolistArray.todos.completed[j].completer.id = Faker.Address.zipCode();
        todolistArray.todos.completed[j].completer.name = Faker.Name.findName();  
    };
    
    todolistArray.comments = [];
    for (var s = 0; s < nb; s++) {
        todolistArray.comments[s] = {};
        todolistArray.comments[s].id = Faker.Address.zipCode();
        todolistArray.comments[s].content = Faker.Lorem.paragraph();
        todolistArray.comments[s].created_at = "2012-03-22T16:56:51-05:00";
        todolistArray.comments[s].updated_at = "2012-03-22T16:56:48-05:00";
        todolistArray.comments[s].creator = {};
        todolistArray.comments[s].creator.id = Faker.Address.zipCode();
        todolistArray.comments[s].creator.name = Faker.Name.findName();   
    }
    
    todolistArray.subscribers = [];
    for (var s = 0; s < nb; s++) {
        todolistArray.subscribers[s] = {};
        todolistArray.subscribers[s].id = Faker.Address.zipCode();
        todolistArray.subscribers[s].name = Faker.Name.findName();
    };
    
    return todolistArray;
};


//
//Files
//    
//[
//  {
//    "key": "40b8a84cb1a30dbe04457dc99e094b6299deea41",
//    "name": "bearwave.gif",
//    "byte_size": 508254,
//    "content_type": "image/gif",
//    "created_at": "2012-03-27T22:48:49-04:00",
//    "url": "https://basecamp.com/1111/api/v1/projects/2222/attachments/3333/40b8a84cb1a30dbe04457dc99e094b6299deea41/original/bearwave.gif",
//    "creator": {
//      "id": 73,
//      "name": "Nick Quaranto"
//    },
//    "attachable": {
//      "id": 70219655,
//      "type": "Upload",
//      "url": "https://basecamp.com/1111/api/v1/projects/2222/uploads/70219655.json"
//    }
//  }
//  {
//    "key": "773c74212f81f5c7d66917fb7236d5aece36c56a",
//    "name": "report.pdf",
//    "byte_size": 508254,
//    "content_type": "application/pdf",
//    "created_at": "2012-03-27T22:48:49-04:00",
//    "url": "https://basecamp.com/1111/api/v1/projects/2222/attachments/4444/773c74212f81f5c7d66917fb7236d5aece36c56a/original/report.pdf",
//    "creator": {
//      "id": 73,
//      "name": "Nick Quaranto"
//    },
//    "attachable": {
//      "id": 12092382,
//      "type": "Message",
//      "url": "https://basecamp.com/1111/api/v1/projects/2222/messages/12092382.json"
//    }
//  }
//]

function getFiles() {
    var filesArray = [];
    for (var i = 0; i < 4; i++) {
        filesArray[i] = {};
        filesArray[i].key = randomString(16);
        filesArray[i].name = randomString(6) + ".jpg";
        filesArray[i].byte_size = 508254;
        filesArray[i].content_type = "image/gif";
        filesArray[i].created_at = "2012-03-27T22:48:49-04:00";
        filesArray[i].url = "";
        filesArray[i].creator = {};
        filesArray[i].creator.id = Faker.Address.zipCode();
        filesArray[i].creator.name = Faker.Name.findName();
        filesArray[i].attachable = {};
        filesArray[i].attachable.id = Faker.Address.zipCode();
        filesArray[i].attachable.type = "Message";
        filesArray[i].attachable.url = "";
    };
    return filesArray;
};


//
//Documents
//    
//[
//  {
//    "id": 963979453,
//    "title": "Manifesto",
//    "updated_at": "2012-03-27T13:39:33-05:00",
//    "url": "https://basecamp.com/999999999/api/v1/projects/605816632-bcx/documents/963979453-manifesto.json"
//  },
//  {
//    "id": 243535881,
//    "title": "Really important notes",
//    "updated_at": "2012-03-27T13:39:12-05:00",
//    "url": "https://basecamp.com/999999999/api/v1/projects/605816632-bcx/documents/243535881-really-important.json"
//  }
//]
function getDocuments() {
    var documentsArray = [];
    for (var i = 0; i < 4; i++) {
        documentsArray[i] = {};
        documentsArray[i].id = Faker.Address.zipCode();
        documentsArray[i].title = Faker.Lorem.words().toString().replace(",", " ");
        documentsArray[i].updated_at = "2012-03-27T13:39:33-05:00";
        documentsArray[i].url = "";
    };
    return documentsArray;
};
