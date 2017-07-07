angular.module('mosix', []);

function mainController($scope) {

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
            social: 'twitter'
        });

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            }
        };
        xmlHttp.open("POST", "/reply", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xmlHttp.send(params);

        mention.answerAreaDeployed = false;
    }

    // $scope.sendReply = function(mention, reply) {
    //     $http.post("/reply", { mention: mention, reply: reply }).success(function(data, status, headers, config) {
    //         console.log("Enviado");
    //     }).error(function(data, status, headers, config) {
    //         console.log("Error");
    //     });
    // }
}