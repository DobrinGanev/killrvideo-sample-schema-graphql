const TimeUuid = require('cassandra-driver').types.TimeUuid
const {PubSub} = require('apollo-server')
const pubsub = new PubSub()

const videoById = async (context, param, condition) => {
  const query = condition
    ? `SELECT * FROM videos WHERE videoid = ? ${condition}`
    : `SELECT * FROM videos WHERE videoid = ?`

  const result = await context.client.execute(query, [param])
  if (!result.rows[0]) {
    return []
  }
  const newResult = {
    ...result.rows[0],
    userid: result.rows[0].userid.toString(),
    videoid: result.rows[0].videoid.toString(),
  }
  return newResult
}

const userById = async (context, param, condition) => {
  const query = condition
    ? `SELECT * FROM users WHERE userid = ? ${condition};`
    : `SELECT * FROM users WHERE userid = ?`
  const result = await context.client.execute(query, [param])
  const newResult = {
    ...result.rows[0],
    userid: result.rows[0].userid.toString(),
  }
  return newResult
}

const resolvers = {
  Query: {
    userById: async (parent, args, context, info) => {
      const result = await userById(context, args.userid)
      return result
    },
    users: async (parent, args, context, info) => {
      const result = await context.client.execute('SELECT * FROM users;')
      return result.rows
    },
    videos: async (parent, args, context, info) => {
      const result = await context.client.execute('SELECT * FROM videos;')
      return result.rows
    },
    videoById: async (parent, args, context, info) => {
      const result = await videoById(context, args.videoid)
      return result
    },
    videosBylocation: async (parent, args, context, info) => {
      const result = await context.client.execute(
        'SELECT * FROM videos_by_location;'
      )
      return result.rows
    },
    userVideos: async (parent, args, context, info) => {
      const query = args.condition
        ? `SELECT * FROM user_videos WHERE userid = ? ${args.condition}`
        : `SELECT * FROM user_videos WHERE userid = ?`
      const result = await context.client.execute(query, [args.userid])
      return result.rows
    },
  },
  Video: {
    user: async (parent, args, context, info) => {
      const result = await context.client.execute(
        'SELECT * FROM users WHERE userid = ? ',
        [parent.userid]
      )
      return result.rows[0]
    },
  },
  User: {
    video: async (parent, args, context, info) => {
      const result = await videoById(context, parent.videoid)
      return result
    },
  },
  UserVideos: {
    videos: async (parent, args, context, info) => {
      const result = await videoById(context, parent.videoid)
      return result
    },
    user: async (parent, args, context, info) => {
      const result = await userById(context, parent.userid)
      return result
    },
  },
  VideosByLocation: {
    video: async (parent, args, context, info) => {
      const result = await videoById(context, parent.videoid)
      return result
    },
    user: async (parent, args, context, info) => {
      const result = await userById(context, parent.userid.toString())
      return result
    },
  },
  Mutation: {
    addComment: async (parent, args, context, info) => {
      const commentid = TimeUuid.now()
      console.log(args.videoid, args.userid, commentid, args.comment)
      await context.client.execute(
        `INSERT INTO comments_by_video (videoid, userid, commentid, comment)
         VALUES (?,?,?,?);
        `,
        [args.videoid, args.userid, commentid, args.comment]
      )
      const comment = {...args, commentid: commentid}
      pubsub.publish('COMMENT_ADDED', {
        commentAdded: comment,
      })
      return comment
    },
  },
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator(['COMMENT_ADDED']),
    },
  },
}

module.exports = {
  resolvers,
}
