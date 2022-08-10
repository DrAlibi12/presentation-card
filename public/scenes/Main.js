export default class MainMenu extends Phaser.Scene {
    constructor (config) {
        super(config);
    }

    init(data) {
        console.log("Init");
    }

    preload() {
        console.log("Preload");

        this.sndSelected = new Howl({
            src: ["assets/selected.m4a"],
            volume: 0.4
        });

        this.load.spritesheet('button', 'assets/button_go.png', {
            frameWidth: 64,
            frameHeight: 24
        });

        this.load.image('enioMobile', 'assets/EnioMobile.png');
        this.load.image('enioDesktop', 'assets/EnioDesktop.png');
        this.load.image('logo', 'assets/EnioLotero.png');
    }

    create(data) {
        let isDesktop = this.sys.game.device.os.desktop;

        this.soundMuted = false;

        this.X_CENTER = this.cameras.main.centerX;
        this.Y_CENTER = this.cameras.main.centerY;

        let scale = this.Y_CENTER * 0.006;
        if (!isDesktop && (this.scale.orientation == "landscape-primary" || this.scale.orientation == "landscape-secondary")) {
            scale = this.X_CENTER * 0.006;
        }
        let btnHeight = this.textures.getFrame('button', 0).height * scale;
        this.btnVerticalSep = btnHeight + 16;

        this.logoYMargin = this.Y_CENTER * 0.1;
        this.logo = this.add.image(this.X_CENTER, this.Y_CENTER / 2 - this.logoYMargin, "logo")
            .setOrigin(0.5, 1)
            .setScale(scale * 2);
            
        let screenBot = this.Y_CENTER * 2;
        this.textBox = this.add.rectangle(-(this.X_CENTER * 2), screenBot * 0.7, this.X_CENTER / 2, screenBot * 0.3, 0xff61b2)
            .setOrigin(0, 0);

        this.tweens.add({
            targets: this.textBox,
            delay: 1000,
            scaleX: 4,
            x: 0,
            y: screenBot * 0.7,
            yoyo: false,
            repeat: false,
            ease: 'Sine.easeInOut'
        });

        this.enio = (isDesktop) ? this.add.image(this.X_CENTER / 2, screenBot * 1.5, "enioDesktop")
                                : this.add.image(this.X_CENTER / 2, screenBot * 1.5, "enioMobile");
        this.enio.setOrigin(0.5, 1)
            .setScale(scale * 4);

        this.tweens.add({
            targets: this.enio,
            delay: 500,
            y: screenBot,
            yoyo: false,
            repeat: false,
            ease: 'Sine.easeInOut'
        });

        this.btnGroup = this.add.group();

        this.muteSound = this.createButton(this.X_CENTER * 0.01, this.X_CENTER * 0.01, 1, 1, "SOUND", () => { this.soundMuted = !this.soundMuted; })
            .setOrigin(0, 0);

        this.btnY = this.Y_CENTER * 0.5;
        this.btnGO = this.createButton(this.X_CENTER, this.btnY, scale, scale, "ABOUT ME", () => { setTimeout(() => { /*this.scene.*/ }, 100) });
        this.btnGO2 = this.createButton(this.X_CENTER, this.btnY, scale, scale, "MY GAMES", () => { setTimeout(() => {
            let url = "http://eniolotero.itch.io";
            let s = window.open(url, '_blank');
            (s && s.focus) ? s.focus() : window.location.href = url;
        }, 100) });
        this.btnGO3 = this.createButton(this.X_CENTER, this.btnY, scale, scale, "CONTACT", () => { setTimeout(() => { /**/ }, 100) });
        this.btnGO4 = this.createButton(this.X_CENTER, this.btnY, scale, scale, "THANKS", () => { setTimeout(() => { alert("Thanks for visiting!"); }, 100) });

        this.btnGroup.add(this.btnGO);
        this.btnGroup.add(this.btnGO2);
        this.btnGroup.add(this.btnGO3);
        this.btnGroup.add(this.btnGO4);

        this.btnGroup.setY(this.btnY, this.btnVerticalSep)

        this.scale.on('resize', this.resize, this);
        this.scale.on('orientationchange', this.checkOriention, this);
    }

    update(time, delta) {

    }

    createButton(x, y, xScale, yScale, text, onClick) {
        let button = this.add.sprite(x, y, "button")
            .setScale(xScale, yScale)
            .setOrigin(0.5, 0)
            .setDepth(10000);
        
        button.setInteractive();

        button.on('pointerover', function() {
            if (this.sys.game.device.os.desktop) {
                button.setFrame(0);
            } else {
                button.setFrame(2);
            }
        }, this);

        button.on('pointerout', function() {
            button.setFrame(1);
        }, this);

        button.on('pointerup', function() {
            button.setFrame(0);
        }, this);

        button.on('pointerdown', function() {
            button.setFrame(2);
            onClick();
            if (!this.soundMuted) {
                this.sndSelected.stop();
                this.sndSelected.play();
            }
            // this.scene.start('Home');
        }, this);

        return button.setFrame(1);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        var width = gameSize.width;
        var height = gameSize.height;

        this.cameras.resize(width, height);

        this.textBox
            .setX(0)
            .setSize(width, this.textBox.height);

        this.logo.setX(width / 2);
        this.logo.setY(height / 4 - this.logoYMargin);
        
        this.btnGroup.setX(width / 2);
        this.btnGroup.setY(height / 4, this.btnVerticalSep);
        /*
        this.btnGO.setPosition(width / 2, height / 2);
        this.btnGO.setPosition(width / 2, height / 2);
        this.btnGO.setPosition(width / 2, height / 2);
        this.btnGO.setPosition(width / 2, height / 2);
        */
    }

    checkOriention (orientation) {
        if (orientation == "landscape-primary" || orientation == "landscape-secondary") {
            alert("Please turn your device");
        }
    }

}