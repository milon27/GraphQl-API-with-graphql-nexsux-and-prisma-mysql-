## GraphQl API with graphql, nexsux and prisma(mysql) 

> Install Dependency
```js
"dependencies": {
    "@prisma/client": "3.6.0",
    "apollo-server-core": "3.5.0",
    "apollo-server-express": "3.5.0",
    "express": "4.17.1",
    "graphql": "15.8.0",
    "nexus": "1.1.0",
    "nexus-prisma": "0.34.0"
  },
  "devDependencies": {
    "@types/express": "4.17.13",
    "@types/node": "16.11.12",
    "prisma": "3.6.0",
    "ts-node": "10.4.0",
    "ts-node-dev": "1.1.8",
    "typescript": "4.5.3"
  }

```

___

```js
#get all posts for users

query {
  {
  users{
    id
    name
    posts{
      title
      desc
    }
  }
}

}
```

```js

{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "milon",
        "posts": [
          {
            "title": "a post",
            "desc": "a desc."
          }
        ]
      }
    ]
  }
}

```


<br/><br/>
___

>> Developed By milon27
* site : https://milon27.ml
* gmail: mdjahidulislammilon@gmail.com
* phone: +8801646735359
