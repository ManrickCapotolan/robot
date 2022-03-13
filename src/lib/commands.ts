import { DIRECTIONS, Robot, Surface } from "../types";

export const isMoveValid = (surface: Surface, xPosition: number, yPosition: number): boolean => {
  return !(
    xPosition < 0 ||
    yPosition < 0 ||
    xPosition >= surface.width ||
    yPosition >= surface.height
  );
}

export const turnRight = (robot: Robot): Robot => {
  if (!robot.isPlaced) {
    console.error('Robot is not yet placed.');
    return robot;
  };

  const rightConfig = {
    [DIRECTIONS.North]: DIRECTIONS.East,
    [DIRECTIONS.East]: DIRECTIONS.South,
    [DIRECTIONS.South]: DIRECTIONS.West,
    [DIRECTIONS.West]: DIRECTIONS.North,
  };

  return {
    ...robot,
    direction: rightConfig[robot.direction],
  };
}

export const turnLeft = (robot: Robot): Robot => {
  if (!robot.isPlaced) {
    console.error('Robot is not yet placed.');
    return robot;
  };

  const leftConfig = {
    [DIRECTIONS.North]: DIRECTIONS.West,
    [DIRECTIONS.East]: DIRECTIONS.North,
    [DIRECTIONS.South]: DIRECTIONS.East,
    [DIRECTIONS.West]: DIRECTIONS.South,
  };

  return {
    ...robot,
    direction: leftConfig[robot.direction],
  };
}

export const moveForward = (robot: Robot, surface: Surface): Robot => {
  if (!robot.isPlaced) {
    console.error('Robot is not yet placed.');
    return robot;
  };

  let x = robot.xPosition,
      y = robot.yPosition;
  
  switch(robot.direction) {
    case DIRECTIONS.North:
      y++; break;
    case DIRECTIONS.East:
      x++; break;
    case DIRECTIONS.South:
      y--; break;
    case DIRECTIONS.West:
      x--; break;
  }

  if (isMoveValid(surface, x, y)) {
    return {
      ...robot,
      xPosition: x,
      yPosition: y,
    }
  } else {
    console.error('Invalid move');
    return robot;
  }
};

export const placeRobot = (
  robot: Robot, surface: Surface, xPosition: number, yPosition: number, direction: DIRECTIONS
) => {
  if (isMoveValid(surface, xPosition, yPosition)) {
    return {
      xPosition,
      yPosition,
      direction,
      isPlaced: true,
    }
  } else {
    console.error('Invalid move');
    return robot;
  }
}