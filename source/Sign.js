enyo.kind({
    name: "App.Sign",
    fit: true,
    components: [
        {kind: "FittableRows", style: "text-align:center;padding-top:70px;", components: [
            {kind: "enyo.Image", src: "assets/basecamp-logo.png", style: "height:100px;width:120px;"},
            {content: "Basecamp on the move"},
            {style: "padding:5px;", components: [
                {kind: "onyx.InputDecorator", components: [
                    {name: "username", kind: "onyx.Input", defaultFocus: true, placeholder: "Email"}
                ]}
            ]},
            {kind: "onyx.Button", content: "Sign In", classes: "onyx-affirmative", ontap:"signinTapped"}
        ]}
    ],
    create: function () {
        this.inherited(arguments);

        /*
         * Récupérer le dernier username utilisé dans le Storage des preferences
         *
         */
        this.$.username.setValue("nicolas.del@gmail.com");
        /*this.$.password.setValue("Test123");*/
    },
    signinTapped: function () {
        /*
         * envoie d'une requete test pour valider l'authentification. On en profite pour faire un getProjects
         *
         */
        enyo.Signals.send("onLogged");
    }
});