export class Level {
  sequences: [number[], number[], number[]] = [[], [], []];
  BEGINNING_SEQUENCE_LENGTHS = [3, 4, 5];
  currentSequenceIndex = 0;
  element = 0;

  level: number;

  constructor(level: number) {
    this.level = level;
    this.createLevel(level);
  }

  private generateSequences(increment: number) {
    for (let i = 0; i < this.BEGINNING_SEQUENCE_LENGTHS.length; i++) {
      this.sequences[i] = Level.generatePattern(
        this.BEGINNING_SEQUENCE_LENGTHS[i] + increment
      );
    }
  }

  private createLevel(levelNumber: number) {
    if (levelNumber % 4 === 0 || levelNumber === 1) {
      this.generateSequences(0);
    } else if (levelNumber % 3 === 0) {
      this.generateSequences(2);
    } else if (levelNumber % 2 === 0) {
      this.generateSequences(1);
    } else {
      this.generateSequences(0);
    }
  }

  levelUp() {
    this.level += 1;
    this.createLevel(this.level);
    this.element = 0;
    this.currentSequenceIndex = 0;
  }

  updateSequence() {
    const seuquence = this.sequences[this.currentSequenceIndex];
    this.currentSequenceIndex++;
    this.element = 0;
    return seuquence;
  }

  updateCurrentElement() {
    const el = this.element;
    this.element += 1;
    return el;
  }

  private static generatePattern(length: number) {
    const pattern: number[] = [];

    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * (5 - 1) + 1);
      while (pattern.length && pattern[pattern.length - 1] == randomNumber) {
        randomNumber = Math.floor(Math.random() * (5 - 1) + 1);
      }

      pattern.push(randomNumber);
    }

    return pattern;
  }
}
