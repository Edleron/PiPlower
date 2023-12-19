import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Background } from "./Background";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        // Globals.resources.music.sound.play({
        //     loop: true,
        //     volume: 0.2
        // });
        this.createBackground();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }
}