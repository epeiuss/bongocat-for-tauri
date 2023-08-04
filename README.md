# bongocat-for-tauri

BongoCat 的 tauri重制 版本（糖哥做的，我只是在这里备份一下（？）

可用版本请见[Releases](https://github.com/epeiuss/bongocat-for-tauri/releases)

## 项目截图
![image](docs/1.jpg)
R
## 已知问题
- [ ] 猫的右手移动有问题（现在暂时将手变为固定）
- [ ] 在点击猫键盘里不存在的字符时猫的手会消失，刷新后恢复

## 项目依赖
- [Rust环境](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites#%E5%AE%89%E8%A3%85): 请自行根据官网步骤安装rust环境
- [Node.js](https://nodejs.org/en/): 用于运行项目

## 项目运行
1. 安装依赖
```bash
npm install
```

2. 运行项目
```bash
npm run tauri dev
```
* 如果运行报错未找到`dist`文件夹，请先手动对前端进行打包
```bash
npm run build
```

3. 打包项目
```bash
npm run tauri build
```
- 如果需要打包后进行调试，请添加`--debug`参数
```bash
npm run tauri build --debug
```

4. 生成app图标，请自行替换/src-tauri/assets文件夹下的icon图标，任何图片格式均可以
```bash
npm run build:icon
```