import { Component, OnInit } from '@angular/core';
import { Mention, TwitterMention } from "app/common/classes";

export class ParserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // Convierte una mención de twitter en una mención de mosix
  twitter2Mention(twitterMention: TwitterMention) {
    var mention: Mention = {
      origin: 'Twitter',
      id: twitterMention.id_str,
      date: twitterMention.created_at,
      text: twitterMention.text,
      userName: twitterMention.user.name,
      userScreenName: twitterMention.user.screen_name,
      userAvatar: twitterMention.user.profile_image_url,
      userUrl: "http://www.twitter.com/" + twitterMention.user.screen_name
    }

    return mention;
  }


  mention2twitter(twitterMention) {
    var mention: Mention = {
      origin: 'Twitter',
      id: twitterMention.id_str,
      date: twitterMention.created_at,
      text: twitterMention.text,
      userName: twitterMention.user.name,
      userScreenName: twitterMention.user.screen_name,
      userAvatar: twitterMention.user.profile_image_url,
      userUrl: "http://www.twitter.com/" + twitterMention.user.screen_name
    }

    return mention;
  }

}
