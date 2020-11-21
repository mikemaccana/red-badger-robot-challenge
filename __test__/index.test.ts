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
    test(`A robot that moves in a square returns to the same place`, () => {
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
      const firstRobot = planet.robots[0]
      expect(firstRobot.position.x).toEqual(1)
      expect(firstRobot.position.y).toEqual(1)
    })
  })
  
});
