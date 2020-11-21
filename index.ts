const DEBUG = false;

function log(...args: any[]){
  if ( DEBUG ) {
    console.log.apply(console, args);
  }
}

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

export function inRange(num: number, minimum: number, maximum: number) {
  return (num >= minimum && num <= maximum) 
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
    log(`Robot recieved instruction ${instruction}`);
    if ( instruction === Instruction.forward) {
      const newPosition = this.getNewPosition();
      return newPosition
    }
    if ( instruction === Instruction.turnLeft ) {
      // Clock math - stops us going to negative!
      if (this.orientation === Orientation.north) {
        this.orientation = Orientation.west;
      } else {
        this.orientation--
      }
    }
    if ( instruction === Instruction.turnRight ) {
      // Clock math - stops us going to over 3!
      if (this.orientation === Orientation.west) {
        this.orientation = Orientation.north;
      } else {
        this.orientation++   
      }
      log(`Robot has rotated: ${this}`)
      return;
    }
  }

  getNewPosition() {
    const newPosition = new Position(this.position.x, this.position.y);
    switch (this.orientation) {
      case Orientation.north: {
        newPosition.y++;
        break;
      }
      case Orientation.south: {
        newPosition.y--;
        break;
      }
      case Orientation.east: {
        newPosition.x++;
        break;
      }
      case Orientation.west: {
        newPosition.x--;
        break;
      }
    }
    return newPosition
  }

  toString() {
    return `Robot is now at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}`
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
  isOnPlanet(position: Position) {
    return ( inRange(position.x, 0, this.maxX) && inRange(position.y, 0, this.maxY) ) 
  }
  hasScentOfDeath(position: Position) {
    
    return this.scentPositions.some((scentPosition) => { 
      return scentPosition.x === position.x && scentPosition.y === position.y 
    })
  }
  moveRobot(instructions: Instruction[]): Robot {
    const robot = this.robots[this.robots.length - 1]
    let moveCount = 0
    for (let instruction of instructions) {
      const previousPosition = new Position(robot.position.x, robot.position.y);
      log(`\nMove ${moveCount + 1}`)
      moveCount++
      const newPosition = robot.handleInstruction(instruction)    
      // If out of world bounds, the previous position stinks
      if ( newPosition ) {
        // Does new position have the scent of death
        if ( this.hasScentOfDeath(newPosition) ) {
          log(`Not moving! ${newPosition} has scent of death`)
        } else {
          if ( this.isOnPlanet(newPosition) ) {
            // Position is safe
            log(`Robot is moving to ${newPosition} facing ${orientationNames[robot.orientation]}`);  
            robot.position = newPosition
          } else {
            // Position is off planet
            log(`Robot has fallen off the world at ${newPosition}`)
            robot.isAlive = false
            log(`Saving scent at ${robot.position}`)
            this.scentPositions.push(robot.position)
            break;
          } 
        }        
      }
    };
    
    log(`Robots final position is ${robot.position} ${robot.orientation}`)
    return robot
  }
}
