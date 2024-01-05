import * as PIXI from "pixi.js";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();
        this.ranges = {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        };

        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200
        });
    }

    get randomData() {
        let data = { rows: 0, cols: 0, x: 0 };

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.right + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        return data;
    }

    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;

        platform.container.once("hidden", () => {
            this.platforms = this.platforms.filter(item => item !== platform);
            platform.container.destroy();

            // Önemli bilgi
            // -> platform ögesinin olay dinleyicisiyle array içerisinden kaldırdık.
            // -> ayrıca bu platformda bulunan pixi container'ıda destroy ettik.
            // -> Not -> ama objenin kendisini destroy etmedik. Çünkü Js bunu kendisi yapıyor.
            // Kısacası, platform.container.destroy() çağrısı ve diziden çıkarılma işlemi, platformun görsel ve işlevsel parçalarını temizler, 
            // ancak platform nesnesinin kendisi JavaScript'in çöp toplama mekanizması tarafından otomatik olarak temizlenir, bu da belirli bir süre alabilir. 
            // Kod içinde açıkça delete platform gibi bir işlem yapmanıza gerek yoktur, çünkü JavaScript'te bu tür bir işlem değişkenler için geçerli değildir ve çoğu durumda gerekli de değildir.
            // console.log(platform);
        });
    }

    checkCollision(hero) {
        this.platforms.forEach(platform => {
            platform.checkCollision(hero);
        });
    }

    update(dt) {
        if (this.current.right < window.innerWidth) {
            this.createPlatform(this.randomData);
        }

        this.platforms.forEach(platform => {
            platform.move();
        });
    }
}