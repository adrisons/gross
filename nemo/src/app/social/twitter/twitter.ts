import { Component, OnInit } from '@angular/core';

import { ConnectorComponent } from "app/social/twitter/connector";
import { TwitterService } from "ng2-twitter/dist";
import { twitterTokens } from "app/common/constants";


export class Twitter implements OnInit {
  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
  }


  getHomeTimeline(results:String[]) {
    
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

    ).subscribe((res) => {
      res.json().map(tweet => {
        results.push(tweet.text);
      });
    });
  };

}
