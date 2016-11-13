var electron = require('electron');
var app = electron.app;
var icon_p = './nocover.png';
var BrowserWindow = electron.BrowserWindow;
app.on('browser-window-created', function(e,window){
      window.setMenu(null);
});

var path = require('path');
var url = require('url');

var mainWindow;

function createWindow(){
	mainWindow = new BrowserWindow({
		width: electron.screen.getPrimaryDisplay().workAreaSize.width,
		height: electron.screen.getPrimaryDisplay().workAreaSize.height,
		icon: icon_p,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', function(){
		mainWindow = null;
	});

	var tray = new electron.Tray(icon_p);
	tray.on('double-click', function(){
  		mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
	});

	mainWindow.on('hide', function(){
  		tray.setHighlightMode('never');
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function(){
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activate', function(){
	if(mainWindow === null){
		createWindow();
	}
});