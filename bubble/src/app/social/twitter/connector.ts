import { Component, OnInit } from '@angular/core';

import { ParserComponent } from 'app/social/twitter/parser';
import { TwitterMention } from 'app/common/classes';
import { TwitterService } from 'ng2-twitter';
import { twitterTokens } from 'app/common/constants';

let socket;

export class ConnectorComponent implements OnInit {
  constructor(private twitterService: TwitterService,
    private parser: ParserComponent) { }

  ngOnInit() {
    this.listenTwitter();
  }


  getHomeTimeline(): Promise<any> {

    return this.twitterService.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      {
        count: 5
      },
      {
        consumerKey: twitterTokens.CONSUMER_KEY,
        consumerSecret: twitterTokens.CONSUMER_SECRET
      },
      {
        token: twitterTokens.ACCESS_TOKEN_KEY,
        tokenSecret: twitterTokens.ACCESS_TOKEN_SECRET
      }

    ).toPromise();
  };

  // Enviar respuesta a un tweet
  postReply(id, userScreenName, text) {

    return new Promise(function (resolve, reject) {
      this.twitterService.post('statuses/update',
        {
          status: '@' + userScreenName + ' ' + text,
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
  listenTwitter = function () {

    this.twitterService.stream('statuses/filter', { track: '@zetalistener' }, function (stream) {
      stream.on('data', function (data) {
        socket.emit('mention', this.parser.twitter2Mention(data));
      });

      stream.on('error', function (error) {
        // throw error;
      });
    });
  };

  // Setea el socket de comunicación entre módulos
  setSocket = function (_socket) {
    socket = _socket;
  };


}
