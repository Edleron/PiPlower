import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Background {
    constructor() {
        this.speed = 2;
        this.container = new PIXI.Container();
        this.createSprites();
    }

    createSprites() {
        this.sprites = [];

        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = new PIXI.Sprite(Globals.resources["background"].texture);
        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }

    move(sprite, offset) {
        // 'spriteRightX' değişkeni, sprite'ın sağ kenarının x koordinatını hesaplar.
        // Bu, sprite'ın sol kenarının x koordinatı ('sprite.x') ile genişliğinin ('sprite.width') toplamıdır.
        const spriteRightX = sprite.x + sprite.width;
    
        // 'screenLeftX' değişkeni, ekranın sol kenarının x koordinatını temsil eder.
        // Bu örnek için 0 olarak ayarlanmıştır, yani ekranın sol kenarı.
        const screenLeftX  = 0;
    
        // Bu if bloğu, sprite'ın sağ kenarı ekranın sol kenarını geçip geçmediğini kontrol eder.
        // Eğer geçtiyse, yani 'spriteRightX' değeri 'screenLeftX' değerinden küçük veya eşitse,
        // sprite'ı ekranın sağ tarafına taşımak için sprite'ın x konumunu ayarlar.
        if (spriteRightX <= screenLeftX) {
            // sprite'ın x konumunu, sprite genişliğinin ve oluşturulan toplam sprite sayısının
            // çarpımı kadar artırır. Bu, sprite'ı ekranın sağ tarafına taşır.
            sprite.x += sprite.width * this.sprites.length;
        }
        
        // sprite'ın x konumundan 'offset' değerini çıkararak, sprite'ı sola doğru hareket ettirir.
        // 'offset' değeri, bu metodun çağrıldığında ne kadar sola hareket edeceğini belirler.
        sprite.x -= offset;
    }
    

    update(dt) {
        const offset = this.speed * dt;

        this.sprites.forEach(sprite => {
            this.move(sprite, offset);
        });
    }
}