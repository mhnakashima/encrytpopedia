export class Coin {
    id: string;
    symbol: string;
    name?: string;
    image?: string;
    currentPrice?: number;
    totalVolume?: number;
    isSelected?: boolean;

    constructor(id: string, symbol: string, name: string, image: string, currentPrice: number, totalVolume: number, isSelected: boolean) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.image = image;
        this.currentPrice = currentPrice;
        this.totalVolume = totalVolume;
        this.isSelected = isSelected;
    }
}