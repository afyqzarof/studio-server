# Production Notes:

This is currently being deploy on a DigitalOcean Droplet running `Ubuntu` 22

#### With dependencies:
- `node` ^22
- `npm` ^10
- `SQLite CLI` ^3.3

It is running with `pm2` as the background task manager and `nginx` as the reverse proxy

Note:
To run:
```
sudo systemctl restart nginx
```
to restart nginx after any changes made