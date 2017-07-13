node:
	mkdir -p build/var/www/microphone-server
	mkdir -p build/lib/systemd/system/
	cp -r DEBIAN build
	cp -r node_modules server.js build/var/www/microphone-server
	cp microphone-server.service build/lib/systemd/system/
	fakeroot dpkg-deb -b build "microphone_server_1.1_all.deb"
	rm -rf build