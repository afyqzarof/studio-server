# studio server

Back End GitHub Repository

### Links:

- [Website](https://ideation-studio.dev)
- [Front End repo](https://github.com/afyqzarof/studio-client)

## To run

1. Ensure `.env` file is filled in according to `.env.sample`
2. Add file `dev.sqlite3` to `src/db/database` directory
3. Install dependencies:

```bash
npm install
```

4. Run migrations:

```bash
npm migrate
```

5. Seed data:

```bash
npm seed
```

6. Start development server:

```bash
npm dev
```
