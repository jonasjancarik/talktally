export interface Speaker {
    id: number;
    name: string;
    isActive: boolean;
    totalTime: number;
    floorCount: number;
    handRaised: boolean;
    handRaisedTime: Date | null;
}