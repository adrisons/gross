import { Component, OnInit } from '@angular/core';
import { Mention, TwitterMention } from 'app/common/classes';

import { ConnectorComponent } from 'app/social/twitter/connector';
import { ParserComponent } from './parser';
import { TwitterService } from 'ng2-twitter/dist';
import { twitterTokens } from 'app/common/constants';

export class Twitter implements OnInit {
  constructor(private twitterService: TwitterService,
    private connector: ConnectorComponent,
    private parser: ParserComponent) { }

  ngOnInit() {
  }

  public getHomeTimeline(): Promise<Mention[]> {
    const results: Mention[] = [];
    return this.connector.getHomeTimeline()
      .then(res => {
        res.json().map(tweet => {
          results.push(this.parser.twitter2Mention(tweet));
        });
        return results;
      })
      .catch(error => {
        return Promise.reject(error.json());
      });

  }
}
