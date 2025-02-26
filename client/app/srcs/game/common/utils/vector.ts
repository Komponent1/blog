export class Vector {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public normalize(): Vector {
    const length = this.length();
    return new Vector(this.x / length, this.y / length);
  }

  get length(): () => number {
    return () => Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get angle(): () => number {
    return () => Math.atan2(this.y, this.x);
  }

  rotate(angle: number): Vector {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    return new Vector(x, y);
  }
}
