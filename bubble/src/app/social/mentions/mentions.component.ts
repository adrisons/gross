import { Component, OnInit } from '@angular/core';

import { Mention } from 'app/common/classes';
import { Twitter } from 'app/social/twitter/twitter';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {
  title = 'Mentions';
  private mentions: Mention[];

  constructor(private twitter: Twitter) { }

  ngOnInit() {

     this.twitter.getHomeTimeline().then(res => this.mentions = res);

  }

}
