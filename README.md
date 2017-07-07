Part of the observatory software for the Warwick one-meter telescope.

`microphone-server` is a node.js server that streams audio from a USB microphone through a websocket to https://github.com/warwick-one-metre/dashboard.

The server can be run manually with
```bash
nodejs path/to/server.js <port> <alsa device id>
```
where `<port>` is the port that the websocket is hosted on, and `<alsa device id>` is the ID of the microphone as given by `arecord --list-pcms`.

Depends on `nodejs` and `arecord`.

The Makefile generates a .deb package that can be installed directly on a raspberry pi running Raspbian Jessie.
Manually run `sudo systemctl start microphone-server` or reboot to start the server for the first time after installation.
The server will automatically start on reboot.