import { Grid } from "./Grid";

export class Node {
    g?: number;
    h?: number;
    parent?: Node;
    opened: boolean;
    closed: boolean;

    x: number;
    y: number;
    blocked: boolean;
    weight: number;

    constructor(
        private _grid: Grid,
        x: number,
        y: number,
        blocked: boolean,
        weight: number = 1
    ) {
        this.x = x;
        this.y = y;
        this.blocked = blocked;
        this.weight = weight;
    }

    get f() {
        return this.g + this.h;
    }

    get grid() {
        return this._grid;
    }

    set grid(grid: Grid) {
        this._grid = grid;
    }

    get actual() {
        return this.grid.actual(this.x, this.y);
    }

    get path(): Node[] {
        const path: Node[] = [this];

        if (!this.parent) return path;

        return [...this.parent.path, ...path];
    }

    get adjacent() {
        const adjacent: Node[] = [];

        if (this.grid.get(this.x - 1, this.y)) {
            adjacent.push(this.grid.get(this.x - 1, this.y));
        }

        if (this.grid.get(this.x, this.y - 1)) {
            adjacent.push(this.grid.get(this.x, this.y - 1));
        }

        if (this.grid.get(this.x + 1, this.y)) {
            adjacent.push(this.grid.get(this.x + 1, this.y));
        }

        if (this.grid.get(this.x, this.y + 1)) {
            adjacent.push(this.grid.get(this.x, this.y + 1));
        }

        return adjacent;
    }

    get neighbors() {
        const neighbors = this.adjacent;

        if (this.grid.get(this.x - 1, this.y - 1)) {
            neighbors.push(this.grid.get(this.x - 1, this.y - 1));
        }

        if (this.grid.get(this.x - 1, this.y + 1)) {
            neighbors.push(this.grid.get(this.x - 1, this.y + 1));
        }

        if (this.grid.get(this.x + 1, this.y + 1)) {
            neighbors.push(this.grid.get(this.x + 1, this.y + 1));
        }

        if (this.grid.get(this.x + 1, this.y - 1)) {
            neighbors.push(this.grid.get(this.x + 1, this.y - 1));
        }

        return neighbors;
    }

    isWithin(node: Node, radius: number) {
        return (
            this.x >= node.x - radius &&
            this.x <= node.x + radius &&
            this.y >= node.y - radius &&
            this.y <= node.y + radius
        );
    }
}
