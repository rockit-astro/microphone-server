Name:      rockit-microphone-server
Version:   %{_version}
Release:   1
Url:       https://github.com/rockit-astro/microphone-server
Summary:   node.js server for streaming audio from a USB microphone through a websocket
License:   GPL-3.0
Group:     Unspecified
BuildArch: noarch
Requires:  nodejs alsa-utils

%description

%build

mkdir -p %{buildroot}/var/www/microphone-server
mkdir -p %{buildroot}%{_unitdir}

%{__install} %{_sourcedir}/microphone-server.service %{buildroot}%{_unitdir}
cp -r %{_sourcedir}/node_modules %{_sourcedir}/server.js %{buildroot}/var/www/microphone-server

%files
%defattr(0744,root,root,0755)
/var/www/microphone-server

%defattr(-,root,root,-)
%{_unitdir}/microphone-server.service

%changelog
