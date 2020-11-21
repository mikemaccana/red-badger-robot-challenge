import { Robot, Orientation, Mars } from ".."


describe(`Mars`, () => {
  test(`Can make Mars`, () => {
    const steve = new Robot('Steve', 1, 1, Orientation.east)
    const mars = new Mars(5, 3, [steve])
  })
})