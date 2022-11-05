const { app, BrowserWindow } = require('electron')
const {join} = require("path");
process.env.DIST = join(__dirname, '../../')
const indexHtml = join(process.env.DIST, 'dist/index.html')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    })
    // 打开开发工具
    // mainWindow.webContents.openDevTools()

    // win.loadURL('http://127.0.0.1:5173/')
    win.loadFile(indexHtml)

}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit() // 非 macOS
})

