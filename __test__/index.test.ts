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

  describe(`movement`, () => {
    const planet = new Mars(5, 3);
    
    test(`A robot that moves in a square returns to the same place`, () => {
      const robot = new Robot(1, 1, Orientation.east)
      planet.addRobot(robot)
      planet.moveRobot(0, [
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.forward,
        Instruction.turnRight,
        Instruction.forward,
      ])
      const lastRobot = planet.robots[planet.robots.length - 1]
      expect(lastRobot.position.x).toEqual(1)
      expect(lastRobot.position.y).toEqual(1)
      expect(lastRobot.orientation).toEqual(Orientation.east)
      expect(lastRobot.isAlive).toBeTruthy()
    })

    test(`A second robot is lost`, () => {
      const robot = new Robot(3, 2, Orientation.north)
      planet.addRobot(robot)
      planet.moveRobot(1, [
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
      const lastRobot = planet.robots[planet.robots.length - 1]
      expect(lastRobot.position.x).toEqual(3)
      expect(lastRobot.position.y).toEqual(3)
      expect(lastRobot.orientation).toEqual(Orientation.north)
      expect(lastRobot.isAlive).toBeFalsy()
    })
  })
  
});
