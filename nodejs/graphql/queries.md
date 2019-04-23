## User select statements

1. Select all users. Will be limited to 1000 rows. Rows returned in a random order.

```js
{
  users {
    lastname
    firstname
  }
}

```

2.  Select on a specific user. Result set will contain first and last name

```js
{
  userById(userid: "d0f60aa8-54a9-4840-b70c-fe562b68842b") {
    firstname
    lastname
  }
}
```

## Video select statements.

### 1. a) Select everything from a specific video based on ID. b) Pull the user for this video from the users table

```js
{
  videoById(videoid:"06049cbb-dfed-421f-b889-5f649a0de1ed"){
    name
    description
    userid
    location
    tags
    user{
      lastname
      firstname
      userid
    }
  }
}
```

## Username->video index.

### With more fields in the PRIMARY KEY declaration, we can do a variety of interesting queries.

### Lookup video by username

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

### With `ORDER BY added_date`

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678" condition:"ORDER BY added_date"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

### With `ORDER BY added_date DESC`

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678" condition:"ORDER BY added_date DESC"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

### With `ORDER BY added_date DESC LIMIT 1`

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678" condition:"ORDER BY added_date DESC LIMIT 1"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

### With `AND added_date < '2013-06-01'`

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678" condition:"AND added_date < '2013-06-01'"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

### With `AND added_date > '2013-05-15' AND added_date < '2013-07-01'`

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678" condition:"AND added_date > '2013-05-15' AND added_date < '2013-07-01'"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

### With `AND added_date > '2013-05-15' AND added_date < '2013-07-01' ORDER BY added_date`

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678"
    condition:"AND added_date > '2013-05-15' AND added_date < '2013-07-01' ORDER BY added_date"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

```js
{
  videosBylocation{
    videoid
    video{
      name
    }
    user{
      firstname
      lastname
    }
  }
}
```

```js
{
  userVideos(userid:"9761d3d7-7fbd-4269-9988-6cfd4e188678" condition:"ORDER BY added_date DESC"){
    name
    videos{
      name
      location
    }
    user{
      firstname
      lastname
    }
  }
}
```

## Subscriptions

```js
subscription{
  commentAdded{
    comment
  }
}
```

```js
mutation{
  addComment(videoid:"99051fe9-6a9c-46c2-b949-38ef78858dd0" userid:"d0f60aa8-54a9-4840-b70c-fe562b68842b",comment:"Great Video"){
    comment
  }
}
```
