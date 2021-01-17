import * as Algorithm from "./util/Algorithm";

export default class Player {
    // general
    private _playing: boolean = false;
    private _videoIds: string[] = [];

    // modes
    private _repeatAll: boolean = false;
    private _shuffle: boolean = false;

    // player settings
    private _volume: number = 50;

    // callbacks
    private _onChange: () => void = undefined; // call this method if any state changes within the player

    // --- API ---

    public add(id: string): void {
        console.info(`Adding ${id}`);
        this._videoIds.push(id);
        this.stateChanged();
    }

    public remove(index: number): void {
        console.info(`Removing ${index}`);
        if (index < 0 || index >= this._videoIds.length) {
            throw new RangeError(`Index ${index} out of range [0, ${(this._videoIds.length - 1)}]`);
        }
        this._videoIds.splice(index, 1);
        this.stateChanged();
    }

    public move(index: number, targetIndex: number): void {
        console.info(`Moving ${index} to ${targetIndex}`);
        if (index < 0 || index >= this._videoIds.length) {
            throw new RangeError(`Index ${index} out of range [0, ${(this._videoIds.length - 1)}]`);
        }
        if (targetIndex < 0 || targetIndex > this._videoIds.length) {
            throw new RangeError(`Target index ${targetIndex} out of range [0, ${(this._videoIds.length)}]`);
        }
        this._videoIds.splice(targetIndex, 0, this._videoIds[index]);
        this._videoIds.splice(index, 1);
        this.stateChanged();
    }

    public next(): void {
        if (this._videoIds.length == 0) {
            throw new Error("Nothing to skip, list empty");
        }
        if (this._repeatAll) {
            this._videoIds.push(this._videoIds[0]);
        }
        this._videoIds.splice(0, 1);
        if (this._shuffle) {
            Algorithm.shuffle(this._videoIds);
        }
        this.stateChanged();
    }

    public set playing(on: boolean) {
        this._playing = on;
        this.stateChanged();
    }

    public set repeatAll(value: boolean) {
        this._repeatAll = value;
        this.stateChanged();
    }

    public set shuffle(value: boolean) {
        this._shuffle = value;
        this.stateChanged();
    }

    public set volume(value: number) {
        this._volume = value;
        this.stateChanged();
    }

    public set onChange(value: () => void) {
        this._onChange = value;
    }

    public getCurrent(): string | undefined {
        if (this._videoIds.length == 0) return undefined;
        return this._videoIds[0];
    }

    public get playing(): boolean {
        return this._playing;
    }

    public get videoIds(): string[] {
        return this._videoIds;
    }

    public get repeatAll(): boolean {
        return this._repeatAll;
    }

    public get shuffle(): boolean {
        return this._shuffle;
    }

    public get volume(): number {
        return this._volume;
    }

    // internal

    private stateChanged(): void {
        if (this._onChange) this._onChange();
    }
}
