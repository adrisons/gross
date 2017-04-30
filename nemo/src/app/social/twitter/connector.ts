import { Component, OnInit } from '@angular/core';
import { TwitterMention } from "app/common/classes";
import { twitterTokens } from "app/common/constants";
import { TwitterService } from 'ng2-twitter';
import { ParserComponent } from "app/social/twitter/parser";

let socket;

export class ConnectorComponent implements OnInit {
  constructor(private twitterService: TwitterService,
              private parser: ParserComponent) { }

  ngOnInit() {
    this.listenTwitter();
  }


  // Enviar respuesta a un tweet
  postReply(id, userScreenName, text) {

    return new Promise(function (resolve, reject) {
      this.twitterService.post('statuses/update',
        {
          status: "@" + userScreenName + " " + text,
          in_reply_to_status_id: id
        },
        function (error, tweet, response) {
          if (error) {
            console.log(error);
          } else {
            resolve(tweet);
          }
        }
      );
    });
  };



// Escucha menciones y las emite por el socket
listenTwitter = function() {

    this.twitterService.stream('statuses/filter', { track: '@zetalistener' }, function(stream) {
        stream.on('data', function(data) {
            socket.emit('mention', this.parser.twitter2Mention(data));
        });

        stream.on('error', function(error) {
            // throw error;
        });
    });
}

// Setea el socket de comunicación entre módulos
setSocket = function(_socket) {
    socket = _socket;
}

  
}
