import Main from "/scenes/Main.js";

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  type: Phaser.AUTO,
  pixelArt: true,
  // audio: {
  //   disableWebAudio: true
  // },
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-example',
    width: '100%',
    height: '100%'
  },
  /*physics: {
    default: 'arcade',
    arcade: {
      fps: 60,
      gravity: {y : 0},
    }
  },*/
};

const game = new Phaser.Game(config);

game.scene.add("main", Main, false);
//game.scene.add("DialogueBox", DialogueBox, false);

game.scene.start("main");
//game.scene.start("DialogueBox")
