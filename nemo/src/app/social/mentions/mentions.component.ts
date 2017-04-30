import { Component, OnInit } from '@angular/core';
import { Twitter } from "app/social/twitter/twitter";

// const PORT = 8080;

// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);


@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {
  title = 'Mentions';
  mentions = [];

  constructor(private twitter: Twitter) { }

  ngOnInit() {
    
     this.twitter.getHomeTimeline(this.mentions);
    
  }

}
