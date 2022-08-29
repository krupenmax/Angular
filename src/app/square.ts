export class Square {
    x: number;
    y: number;
    isSelected?: boolean;
    isToMove?: boolean;
    isKnight?: boolean;
    isEnemy?: boolean;
    counter?: number;
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}