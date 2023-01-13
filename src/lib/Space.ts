export class Space {
	public static readonly Empty = new Space(0);

	constructor(private value: number) {}

	equals(other: number | Space) {
		return typeof other === 'number'
			? this.value === other
			: this.value === other.value;
	}

	isEmpty() {
		return this.value == 0;
	}

	toString() {
		if (this.value == 0) return '';
		return String.fromCodePoint(this.value + 64);
	}
}
