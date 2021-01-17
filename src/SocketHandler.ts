import type {Server, Socket} from "socket.io";
import Player from "./Player";

export default function register(io: Server, player: Player): void {
    player.onChange = () => emitStateToAll(io, player);

    io.on("connection", socket => {
        console.log("A user connected");
        emitStateToOne(socket, player);

        socket.on("add", (id: string) => {
            player.add(id);
        });
        socket.on("remove", (index: number) => {
            player.remove(index);
        });
        socket.on("move", (index: number, targetIndex: number) => {
            player.move(index, targetIndex);
        });
        socket.on("next", () => {
            player.next();
        });
        socket.on("setPlay", (on: boolean) => {
            player.playing = on;
        });
        socket.on("setVolume", (volume: number) => {
            player.volume = volume;
        });
        socket.on("setRepeatAll", (on: boolean) => {
            player.repeatAll = on;
        });
        socket.on("setShuffle", (on: boolean) => {
            player.shuffle = on;
        });
    });
}

function emitStateToAll(io: Server, player: Player) {
    io.emit("update", getState(player));
}

function emitStateToOne(socket: Socket, player: Player) {
    socket.emit("update", getState(player));
}

function getState(player: Player): PlayerState {
    return {
        playing: player.playing,
        videoIds: player.videoIds,
        repeatAll: player.repeatAll,
        shuffle: player.shuffle,
        volume: player.volume
    };
}

interface PlayerState {
    playing: boolean;
    videoIds: string[];
    repeatAll: boolean;
    shuffle: boolean;
    volume: number;
}
