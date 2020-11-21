import { Robot, Orientation,Instruction, Mars, inRange } from "..";

describe(`Helper functions`, () => {
  describe(`inRange`, () => {
    test(`handles numbers out of range`, () => {
      const result = inRange(3, 4, 6)
      expect(result).toBeFalsy()
    });
  
    test(`handles number in range`, () => {
      const result = inRange(5, 4, 6)
      expect(result).toBeTruthy()
    });
  })
  
  describe(`basic robot behavior`, () => {
    const planet = new Mars(5, 3);

    test(`spinning 360 returns to the original position`, () => {
      planet.addRobot(new Robot(0, 0, Orientation.south))
      let robot = planet.moveRobot([
        Instruction.turnLeft,
        Instruction.turnLeft,
        Instruction.turnLeft,
        Instruction.turnLeft,
      ])
      expect(robot.position.x).toEqual(0)
      expect(robot.position.y).toEqual(0)
      expect(robot.orientation).toEqual(Orientation.south)
      expect(robot.isAlive).toBeTruthy()
    })

    test(`spawn at 0 0 facing south, falls of edge immediately`, () => {
      planet.addRobot(new Robot(0, 0, Orientation.south))
      let robot = planet.moveRobot([
        Instruction.forward
      ])
      expect(robot.position.x).toEqual(0)
      expect(robot.position.y).toEqual(0)
      expect(robot.orientation).toEqual(Orientation.south)
      expect(robot.isAlive).toBeFalsy()
    })

    test(`spawn at 0 1 facing south, won't move forward due to scent of dead robot`, () => {
      planet.addRobot(new Robot(0, 1, Orientation.south))
      let robot = planet.moveRobot([
        Instruction.forward
      ])
      expect(robot.position.x).toEqual(0)
      expect(robot.position.y).toEqual(1)
      expect(robot.orientation).toEqual(Orientation.south)
      expect(robot.isAlive).toBeTruthy()
    })

    test(`spawn at 0 3, heads facing south, won't move forward due to scent of dead robot, keeps going east`, () => {
      planet.addRobot(new Robot(0, 1, Orientation.south))
      let robot = planet.moveRobot([
        Instruction.forward,
        Instruction.turnLeft,
        Instruction.forward,
        Instruction.forward,
        Instruction.forward,
      ])
      expect(robot.position.x).toEqual(3)
      expect(robot.position.y).toEqual(1)
      expect(robot.orientation).toEqual(Orientation.east)
      expect(robot.isAlive).toBeTruthy()
    })
  })

  describe(`passes the challenge`, () => {
    const planet = new Mars(5, 3);
    
    test(`A robot that moves in a square returns to the same place`, () => {
      planet.addRobot(new Robot(1, 1, Orientation.east))
      let robot = planet.moveRobot([
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.forward,
      ])
      expect(robot.position.x).toEqual(1)
      expect(robot.position.y).toEqual(1)
      expect(robot.orientation).toEqual(Orientation.east)
      expect(robot.isAlive).toBeTruthy()
    })

    test(`A second robot is lost`, () => {
      planet.addRobot(new Robot(3, 2, Orientation.north))
      let robot = planet.moveRobot([
        Instruction.forward,
        Instruction.turnRight,
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnLeft,
        Instruction.turnLeft,
        Instruction.forward,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnLeft,
        Instruction.turnLeft,
      ])
      expect(robot.position.x).toEqual(3)
      expect(robot.position.y).toEqual(3)
      expect(robot.orientation).toEqual(Orientation.north)
      expect(robot.isAlive).toBeFalsy()
    })

    test(`A third robot is OK`, () => {
      planet.addRobot(new Robot(0, 3, Orientation.west))
      let robot = planet.moveRobot([
        Instruction.turnLeft,
        Instruction.turnLeft,
        Instruction.forward,
        Instruction.forward,
        // This movement won't go ahead because of the bad scent
        Instruction.forward,
        Instruction.turnLeft,
        // Issue: https://... 
        // Redbadger expects the robot not to have died at this point
        // This movement will kill this robot as it is now facing north and heading off the northern edge
        // of the map
        Instruction.forward,
        Instruction.turnLeft,
        Instruction.forward,
        Instruction.turnLeft,
      ])
      expect(robot.position.x).toEqual(2)
      expect(robot.position.y).toEqual(3)
      expect(robot.orientation).toEqual(Orientation.south)
      expect(robot.isAlive).toBeTruthy()
    })

  })
  
});
