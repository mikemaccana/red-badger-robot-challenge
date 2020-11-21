const log = console.log.bind(console);

log("Starting Red Badger Robot Challenge...");

export enum Orientation {
  north,
  east,
  south,
  west,
}

export const orientationNames = ["North", "East", "South", "West"];

export enum Instruction {
  forward = "Forward",
  turnLeft = "TurnLeft",
  turnRight = "TurnRight",
}

class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  toString(){
    return `${this.x} ${this.y}`
  }
}

export class Robot {
  position: Position;
  isAlive: boolean;
  orientation: Orientation;
  constructor(x: number, y: number, orientation: Orientation) {
    this.position = new Position(x, y);
    this.orientation = orientation;
    this.isAlive = true;
    log(`Robot spawned at at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}. `);
  }

  handleInstruction(instruction: Instruction) {
    log(`\nRobot recieved instruction ${instruction}, currently facing ${orientationNames[this.orientation]}`);
    switch (instruction) {
      case Instruction.forward: {
        this.move();
        break;
      }
      case Instruction.turnLeft: {
        // Clock math - stops us going to negative!
        if (this.orientation === Orientation.north) {
          this.orientation = Orientation.west;
          break;
        }
        this.orientation--
        break;
      }
      case Instruction.turnRight: {
        // Clock math - stops us going to over 3!
        if (this.orientation === Orientation.west) {
          this.orientation = Orientation.north;
          break;
        }
        this.orientation++;
        break;
      }
    }
    log(`Robot is now at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}`);
  }

  private move() {
    switch (this.orientation) {
      case Orientation.north: {
        // TODO: check for scent
        this.position.y++;
        break;
      }
      case Orientation.south: {
        this.position.y--;
        break;
      }
      case Orientation.east: {
        this.position.x++;
        break;
      }
      case Orientation.west: {
        this.position.x--;
        break;
      }
    }
    // TODO check if out of world bounds
  }
}

export class Mars {
  maxX: number;
  maxY: number;
  scentPositions: Position[];
  robots: Robot[];
  constructor(x: number, y: number) {
    this.maxX = x;
    this.maxY = y;
    this.scentPositions = [];
    this.robots = [];
  }
  addRobot(robot: Robot) {
    this.robots.push(robot);
  }
  moveRobot(index: number, instructions: Instruction[]) {
    const robot = this.robots[index]
    instructions.forEach((instruction) => {
      robot.handleInstruction(instruction)
    });
    log(`Robots final position is ${robot.position}`)
  }
}

const planet = new Mars(5, 3);
const robot = new Robot(1, 1, Orientation.east)
const instructions = [
  Instruction.turnRight,
  Instruction.forward,
  Instruction.turnRight,
  Instruction.forward,
  Instruction.turnRight,
  Instruction.forward,
  Instruction.turnRight,
  Instruction.forward,
]
planet.addRobot(robot)
planet.moveRobot(0, instructions)