export interface Speaker {
    id: number;
    name: string;
    isActive: boolean;
    totalTime: number;
    floorCount: number;
    handRaised: boolean;
    displayOrder: number;
    handRaisedTime: Date | null;
    color: string; // Store the color as a hex string or any CSS-compatible format
}