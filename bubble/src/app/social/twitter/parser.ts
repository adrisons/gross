import { Component, OnInit } from '@angular/core';
import { Mention, TwitterMention } from 'app/common/classes';

export class ParserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // Convierte una mención de twitter en una mención de mosix
  twitter2Mention(twitterMention: TwitterMention) {
    const mention: Mention = {
      origin: 'Twitter',
      id: twitterMention.id_str,
      date: twitterMention.created_at,
      text: twitterMention.text,
      userName: twitterMention.user.name,
      userScreenName: twitterMention.user.screen_name,
      userAvatar: twitterMention.user.profile_image_url
    };

    return mention;
  }


  // Convierte una mención de mosix en una mención de twitter
  mention2twitter(mention: Mention) {
    const twitterMention: TwitterMention = {
      origin: 'Twitter',
      id_str: mention.id,
      created_at: mention.date,
      text: mention.text,
      user : {
        name: mention.userName,
        screen_name: mention.userScreenName,
        profile_image_url: mention.userAvatar,

      }
    };

    return twitterMention;
  }

}
