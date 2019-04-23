const typeDefs = `

type User {
  userid : ID!
  firstname: String!
  lastname: String
  email: String
  created_date: String
  video: Video 
}

type Video {
  videoid : ID!
  userid:ID
  name: String!
  description: String
  location: String
  location_type: String
  preview_image_location: String
  tags: [String]
  added_date: String
  user: User  
}

# Lookup 
type UserVideos {
  userid: ID!
  added_date: String
  videoid: ID
  name: String
  preview_image_location: String
  videos: Video
  user:User
}

# CQL 3.4 spec introduced MATERIALIZED VIEWS
# videos_by_location

type VideosByLocation {
  videoid: ID!
  userid: String
  added_date: String
  location: String
  video: Video
  user: User
}
type Comment {
  videoid: ID!
  commentid: ID!
  userid: ID!
  comment: String!
}
type Mutation {
  addComment(videoid: ID!, userid: ID!, comment: String!): Comment
}
type Subscription {
  commentAdded: Comment
}
type Query {
  userById(userid:ID!, condition:String):User
  users: [User]
  videoById(videoid:ID!, condition:String): Video
  videos:[Video]
  userVideos(userid:ID!, condition:String): [UserVideos]
  videosBylocation:[VideosByLocation]
}

`
module.exports = {
  typeDefs,
}
