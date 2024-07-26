# studio server

Back End GitHub Repository

### Links:

- [Website](https://ideation-studio.dev)
- [Front End repo](https://github.com/afyqzarof/studio-client)

## Tech Stack
<a href="https://nodejs.org/en/about" target="_blank" rel="noreferrer"> <img src="https://static-00.iconduck.com/assets.00/node-js-icon-227x256-913nazt0.png" alt="node.js" width="40" height="40"/> </a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://miro.medium.com/v2/resize:fit:1400/1*i2fRBk3GsYLeUk_Rh7AzHw.png" alt="express.js" width="90" /> </a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-3521774-2945272.png" alt="react" width="40" /></a><a href="https://www.sqlite.org/" target="_blank" rel="noreferrer"> <img src="https://1000logos.net/wp-content/uploads/2020/08/SQLite-Logo-1024x640.png" alt="sqlite" width="80" > </a>

### APIs

- [rhyme API](https://rhymebrain.com/api.html)
- [dictionary API](https://dictionaryapi.dev/)


## To run

1. Ensure `.env` file is filled in according to `.env.sample`
2. Create `/database` directory and add file `dev.sqlite3` to it
3. Install dependencies:

```bash
npm install
```

4. Run migrations:

```bash
npm run migrate
```

5. Seed data:

```bash
npm run seed
```

6. Start development server:

```bash
npm run dev
```

## Details
### HR Diagram

![image](https://github.com/afyqzarof/linked-list/assets/83950596/5bd95460-1ce6-488b-91a8-679608ec59cb)

### Endpoints (Not an exhaustive list)

`GET` `/api/users/:user-id`

- Fetch use details for a given user
- Example Response:

```json
{
  "id": 1,
  "username": "nuclear.instruments",
  "email": "user@example.com"
}
```

`GET` `/api/users/:user-id/boards`

- Fetch board details for a specific user
- Example response:

```json
[
  {
    "id": 1,
    "board_name": "My First Board",
    "is_public": false
  },
  {
    "id": 2,
    "board_name": "Example Board",
    "is_public": false
  },
  {
    "id": 3,
    "board_name": "music video inspo",
    "is_public": true
  }
]
```

`GET` `/api/boards/:board-id/pins`

- Fetch pins for a specific board
- Example response:

```json
[
  {
    "id": "xFLA-XMirt",
    "type": "YoutubeVidNode",
    "data": { "youtube_id": "sDENI1Zx7Wc" },
    "position": { "x": 300, "y": 200 }
  },
  {
    "id": "mB_6kTKt3Y",
    "type": "TextNode",
    "data": { "text": "this is a text box" },
    "position": { "x": 250, "y": 100 }
  },
  {
    "id": "WVQoDv6ewX",
    "type": "ColorSelectorNode",
    "data": { "color": "#4c4cff" },
    "position": { "x": 0, "y": 0 }
  }
]
```

`PUT` `/api/boards/:board-id/pins`

- Update pins on a specific board when a user saves

`post` `/api/users`

- Initialize a new user upon registration

`post` `/api/users/:user-id/boards`

- Initialize a new board for a given user upon creation

`get` `/api/boards/public`

- get all boards that are set to "public"