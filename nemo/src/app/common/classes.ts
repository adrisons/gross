// Generic mention
export interface  Mention {
    origin: String;
    id: String;
    date: Date;
    text: String;
    userName: String;
    userScreenName: String;
    userAvatar: String;
    userUrl: String;
  }

export interface  TwitterMention {
    origin: String;
    id_str: String;
    created_at: Date;
    text: String;
    user: {
      name: String;
      screen_name: String;
      profile_image_url: String;
    };
}