import { moveForward, placeRobot, turnLeft, turnRight } from './lib/commands';
import { askCommand } from './lib/reader';
import { COMMANDS, DIRECTIONS, Robot, Surface } from './types';

const COMMAND_REGEX = {
  PLACE: /(PLACE)\s(\d+),(\d+),(NORTH|EAST|WEST|SOUTH)/g,
  REGULAR: /(MOVE|LEFT|RIGHT|REPORT)/g
}

const init = async () => {
  let robot: Robot = {
    xPosition: 0,
    yPosition: 0,
    direction: DIRECTIONS.North,
    isPlaced: false,
  };

  const surface: Surface = {
    width: 5,
    height: 5,
  };

  while (true) {
    const answer = await askCommand();

    const command = new RegExp(COMMAND_REGEX.REGULAR).exec(answer) || 
      new RegExp(COMMAND_REGEX.PLACE).exec(answer);

    if (command) {
      switch(command[1]) {
        case COMMANDS.Place:
          const [,, xPosition, yPosition, direction] = command;
          robot = placeRobot(
            robot,
            surface,
            parseInt(xPosition, 10),
            parseInt(yPosition, 10),
            direction as DIRECTIONS
          );
          break;
        case COMMANDS.TurnLeft:
          robot = turnLeft(robot);
          break;
        case COMMANDS.TurnRight:
          robot = turnRight(robot);
          break;
        case COMMANDS.Move:
          robot = moveForward(robot, surface);
          break;
        case COMMANDS.Report:
          console.log(`Output: ${robot.xPosition},${robot.yPosition},${robot.direction}`);
      }
    } else {
      console.log('Command is invalid. Skipping');
    }
  }
};

init();