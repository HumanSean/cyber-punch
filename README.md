# CYBER PUNCH

> 项目目录直接引用了https://github.com/wmtiger/phaser-project-typescript的模板，目前还在学习phaser的阶段，以这个Cyber Punch 游戏作为练手。素材出自http://craftpix.net，这套素材作学习用途特别好。

- 第一天，搜集游戏素材，模仿 phaser demo game，加载基本的雪碧图动画
- 第二天，使用 arcade-physics 引擎实现基本的人物动画动作以及雪碧图动态背景
- 第三天，研究如何创建地图并带上碰撞效果，为此从 arcade-physics 转去 matter-physics，相当于从轻量化的物理引擎升级成更高级更复杂的，最终通过 tiled 软件以 json 的形式生成了可碰撞的地图（人物终于不会从屏幕边缘掉下去了。。。）。以及升级了项目配置，用 wmtiger/phaser-project-typescript 的模板，开箱即用，F5 开启编译（debugger for chrome）后，加上 Save and Run Ext 插件，保存文件自动重新编译。由于 phaser 文档太低效了，内容很散乱很难找，也没有例子和 demo，反倒不如看 ts 定义来得快。
- 第四天，建立了更宽的地图，镜头视角自动追随角色，以及优化了各种动作的动画，优化了跳和双重跳的逻辑（在地上才能跳，半空中可以双重跳），算是比较完整的 demo 游戏了
