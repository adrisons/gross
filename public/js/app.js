var app = angular.module('nemo', []);

app.controller('mainController', function($scope, $http) {

    // Lista de menciones
    $scope.mentions = [];

    // Establecemos conexión bidireccional con el servidor
    var socket = io.connect();

    // Escucho recepción de menciones
    socket.on('mention', function(data) {
        $scope.mentions.push(data);
        $scope.$apply();
    });

    $scope.openUser = function(mention) {
        window.open(mention.user.url);
    }

    $scope.deployAnswerArea = function(mention) {
        mention.answerAreaDeployed = true;
    }


    $scope.sendReply = function(mention, reply) {

        console.log("FRONT MENTION:\n");
        console.log(JSON.stringify(mention));

        var params = JSON.stringify({
            id: mention.id,
            text: reply,
            user: {
                login: mention.user.login
            },
            social: mention.origin
        });

        $http.post("/reply", params).success(function(data, status, headers, config) {
            console.log("Enviado");
        }).error(function(data, status, headers, config) {
            console.log("Error");
        });
    }
});