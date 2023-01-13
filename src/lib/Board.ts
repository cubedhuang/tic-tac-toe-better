import { Space } from './Space';

function assertPositive(value: number, name: string) {
	if (value > 0 && value % 1 === 0) return;

	throw new Error(`${name} must be a positive integer: ${value}`);
}

export class Board {
	spaces: Space[];

	constructor(public rows = 3, public cols = rows) {
		assertPositive(rows, 'rows');
		assertPositive(cols, 'cols');

		this.spaces = Array(rows * cols).fill(Space.Empty);
	}

	getEmptyIndices() {
		const indices: number[] = [];

		for (const [i, space] of this.spaces.entries())
			if (space.isEmpty()) indices.push(i);

		return indices;
	}

	hasLineOf(type: Space, length: number) {
		return (
			this.hasRowOf(type, length) ||
			this.hasColOf(type, length) ||
			this.hasDiagonalOf(type, length)
		);
	}

	private hasRowOf(type: Space, length: number) {
		for (let row = 0; row < this.rows; row++) {
			let run = 0;

			for (let col = 0; col < this.cols; col++) {
				if (this.get(row, col).equals(type)) run++;
				else run = 0;

				if (run >= length) return true;
			}
		}

		return false;
	}

	private hasColOf(type: Space, length: number) {
		for (let col = 0; col < this.cols; col++) {
			let run = 0;

			for (let row = 0; row < this.rows; row++) {
				if (this.get(row, col).equals(type)) run++;
				else run = 0;

				if (run >= length) return true;
			}
		}

		return false;
	}

	private hasDiagonalOf(type: Space, length: number) {
		return (
			this.hasLeftDiagonalOf(type, length) ||
			this.hasRightDiagonalOf(type, length)
		);
	}

	private hasLeftDiagonalOf(type: Space, length: number) {
		for (let start = 0; start < this.spaces.length; start++) {
			let run = 0;

			for (
				let i = start;
				i < Math.min(this.spaces.length, start + this.cols * this.rows);
				i += this.cols + 1
			) {
				if (this.spaces[i].equals(type)) run++;
				else run = 0;

				if (run >= length) return true;
			}
		}

		return false;
	}

	private hasRightDiagonalOf(type: Space, length: number) {
		for (let start = 2; start < this.spaces.length; start++) {
			let run = 0;

			for (
				let i = start;
				i < Math.min(this.spaces.length, start + this.cols * this.rows);
				i += this.cols - 1
			) {
				if (this.spaces[i].equals(type)) run++;
				else run = 0;

				if (run >= length) return true;
			}
		}

		return false;
	}

	set(row: number, col: number, value: Space): void;
	set(index: number, value: Space): void;
	set(...values: [number, number, Space] | [number, Space]) {
		if (values.length === 3) {
			const [row, col, value] = values;
			return this.set(this.getIndex(row, col), value);
		}

		const [index, value] = values;
		this.spaces[index] = value;
	}

	with(row: number, col: number, value: Space): Board;
	with(index: number, value: Space): Board;
	with(...values: [number, number, Space] | [number, Space]) {
		if (values.length === 3) {
			const [row, col, value] = values;
			return this.with(this.getIndex(row, col), value);
		}

		const [index, value] = values;

		const board = this.clone();
		board.set(index, value);

		return board;
	}

	get(row: number, col: number) {
		return this.spaces[this.getIndex(row, col)];
	}

	getIndex(row: number, col: number) {
		return row * this.cols + col;
	}

	clone() {
		const board = new Board();

		board.rows = this.rows;
		board.cols = this.cols;
		board.spaces = [...this.spaces];

		return board;
	}
}
