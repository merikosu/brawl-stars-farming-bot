// see the docs http://robotjs.io/docs/syntax
import robot from 'robotjs'

export function startBattle() {
  // not so fast delay
  robot.setMouseDelay(2000)

  // click on «READY» button
  robot.moveMouse(1500, 960)
  robot.mouseClick()

  // clicking on first brawler icon in brawler choosing menu
  robot.moveMouse(270, 360)
  for (let i = 0; i < 9; i++) {
    robot.mouseClick()
  }

  setTimeout(startGame, 26000)
}

function startGame() {
  // fast delay for brawler moving
  robot.setKeyboardDelay(40)

  // move 6 times to the right
  for (let i = 0; i < 6; i++) {
    robot.keyTap('d')
  }

  // move 70 times up
  for (let i = 0; i < 70; i++) {
    robot.keyTap('w')
  }

  // not fast delay for brawler attack
  robot.setKeyboardDelay(1500)

  // brawler's attack
  for (let i = 0; i < 5; i++) {
    robot.keyTap('space')
  }

  const interval = setInterval(() => {
    // enemy's percentage (top right corner)
    const color = robot.getPixelColor(1765, 105)

    // «QUIT» button color (appears after battle is end)
    const color2 = robot.getPixelColor(1715, 960)

    if (color === 'e8152f') {
      console.log('Next stage')
      clearInterval(interval)

      // restart logic for one stage
      startGame()
    } else if (color2 === '2270ff') {
      console.log('End battle')
      robot.setMouseDelay(2000)

      // click on QUIT button
      robot.moveMouse(1715, 960)
      robot.mouseClick()

      clearInterval(interval)

      // restart logic for whole battle
      setTimeout(startBattle, 4000)
    } else {
      // take damage on heist
      robot.keyTap('space')
    }
  }, 2000)
}