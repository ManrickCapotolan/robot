import { DIRECTIONS } from "../types";
import { isMoveValid, moveForward, placeRobot, turnLeft, turnRight } from "./commands";

const defaultRobot = {
  xPosition: 0,
  yPosition: 0,
  direction: DIRECTIONS.North,
  isPlaced: false,
}

const sampleSurface = {
  width: 5,
  height: 5
};

describe('commands.isMoveValid', () => {
  it('returns false if xPosition is a negative integer', () => {
    expect(isMoveValid(sampleSurface, -1, 0)).toBe(false);
  });
  it('returns false if yPosition is a negative integer', () => {
    expect(isMoveValid(sampleSurface, 0, -1)).toBe(false);
  });
  it('returns false if xPosition is out of the surface', () => {
    expect(isMoveValid(sampleSurface, 10, 4)).toBe(false);
  });
  it('returns false if yPosition is out of the surface', () => {
    expect(isMoveValid(sampleSurface, 4, 10)).toBe(false);
  });
  it('returns true if coordinates are within the surface', () => {
    expect(isMoveValid(sampleSurface, 3, 3)).toBe(true);
    expect(isMoveValid(sampleSurface, 0, 0)).toBe(true);
    expect(isMoveValid(sampleSurface, 4, 4)).toBe(true);
  });
});

describe('commands.turnLeft', () => {
  describe('when robot is not yet placed', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const response = turnLeft(defaultRobot);
    it('shows an error', () => expect(errorSpy).toHaveBeenCalledWith('Robot is not yet placed.'));
    it('returns the same robot object', () => expect(response).toEqual(defaultRobot));
  });

  describe('when robot is already placed', () => {
    const placedRobot = { ...defaultRobot, isPlaced: true };
    it('faces the robot to WEST when initial is NORTH',
      () => expect(
        turnLeft({ ...placedRobot, direction: DIRECTIONS.North }).direction
      ).toBe(DIRECTIONS.West)
    );
    it('faces the robot to SOUTH when initial is WEST',
      () => expect(
        turnLeft({ ...placedRobot, direction: DIRECTIONS.West }).direction
      ).toBe(DIRECTIONS.South)
    );
    it('faces the robot to EAST when initial is SOUTH',
      () => expect(
        turnLeft({ ...placedRobot, direction: DIRECTIONS.South }).direction
      ).toBe(DIRECTIONS.East)
    );
    it('faces the robot to NORTH when initial is EAST',
      () => expect(
        turnLeft({ ...placedRobot, direction: DIRECTIONS.East }).direction
      ).toBe(DIRECTIONS.North)
    );
  });
});

describe('commands.turnRight', () => {
  describe('when robot is not yet placed', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const response = turnRight(defaultRobot);
    it('shows an error', () => expect(errorSpy).toHaveBeenCalledWith('Robot is not yet placed.'));
    it('returns the same robot object', () => expect(response).toEqual(defaultRobot));
  });

  describe('when robot is already placed', () => {
    const placedRobot = { ...defaultRobot, isPlaced: true };
    it('faces the robot to WEST when initial is SOUTH',
      () => expect(
        turnRight({ ...placedRobot, direction: DIRECTIONS.South }).direction
      ).toBe(DIRECTIONS.West)
    );
    it('faces the robot to SOUTH when initial is EAST',
      () => expect(
        turnRight({ ...placedRobot, direction: DIRECTIONS.East }).direction
      ).toBe(DIRECTIONS.South)
    );
    it('faces the robot to EAST when initial is NORTH',
      () => expect(
        turnRight({ ...placedRobot, direction: DIRECTIONS.North }).direction
      ).toBe(DIRECTIONS.East)
    );
    it('faces the robot to NORTH when initial is WEST',
      () => expect(
        turnRight({ ...placedRobot, direction: DIRECTIONS.West }).direction
      ).toBe(DIRECTIONS.North)
    );
  });
});

describe('commands.moveForward', () => {
  describe('when robot is not yet placed', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const response = moveForward(defaultRobot, sampleSurface);
    it('shows an error', () => expect(errorSpy).toHaveBeenCalledWith('Robot is not yet placed.'));
    it('returns the same robot object', () => expect(response).toEqual(defaultRobot));
  });

  const placedRobot = { ...defaultRobot, isPlaced: true };
  describe('when robot is about to fall of the surface', () => {
    const testDirection = (direction: DIRECTIONS, xPosition: number, yPosition: number) => {
      const errorSpy = jest.spyOn(console, 'error');
      const testRobot = {
        ...placedRobot,
        direction,
        xPosition,
        yPosition,
      };
      const response = moveForward(testRobot, sampleSurface);
      it('shows an error', () => expect(errorSpy).toHaveBeenCalledWith('Invalid move'));
      it('returns the same robot object', () => expect(response).toEqual(testRobot));
    };

    describe('when robot is facing NORTH', () => {
      testDirection(DIRECTIONS.North, 0, sampleSurface.height - 1);
    });

    describe('when robot is facing EAST', () => {
      testDirection(DIRECTIONS.East, sampleSurface.width - 1, 0);
    });

    describe('when robot is facing SOUTH', () => {
      testDirection(DIRECTIONS.South, 0, 0);
    });

    describe('when robot is facing WEST', () => {
      testDirection(DIRECTIONS.West, 0, 0);
    });
  });

  describe('when robot is moving to an available space', () => {
    const testDirection = (
      direction: DIRECTIONS, xPosition: number, yPosition: number, newXPosition: number, newYPosition: number
    ) => {
      const testRobot = {
        ...placedRobot,
        direction,
        xPosition,
        yPosition,
      };
      const response = moveForward(testRobot, sampleSurface);
      it('returns the moved robot object', () => expect(response).toEqual({
        ...testRobot,
        xPosition: newXPosition,
        yPosition: newYPosition,
      }));
    };

    describe('when robot is facing NORTH', () => {
      testDirection(DIRECTIONS.North, 0, 0, 0, 1);
      testDirection(DIRECTIONS.North, 1, 1, 1, 2);
      testDirection(DIRECTIONS.North, 4, 3, 4, 4);
    });

    describe('when robot is facing EAST', () => {
      testDirection(DIRECTIONS.East, 0, 0, 1, 0);
      testDirection(DIRECTIONS.East, 1, 1, 2, 1);
      testDirection(DIRECTIONS.East, 3, 4, 4, 4);
    });

    describe('when robot is facing SOUTH', () => {
      testDirection(DIRECTIONS.South, 1, 1, 1, 0);
      testDirection(DIRECTIONS.South, 3, 3, 3, 2);
      testDirection(DIRECTIONS.South, 4, 2, 4, 1);
    });

    describe('when robot is facing WEST', () => {
      testDirection(DIRECTIONS.West, 1, 1, 0, 1);
      testDirection(DIRECTIONS.West, 3, 3, 2, 3);
      testDirection(DIRECTIONS.West, 4, 4, 3, 4);
    });
  });
});

describe('commands.placeRobot', () => {
  describe('when placing to an invalid space', () => {
    const testPlacement = (xPosition: number, yPosition: number) => {
      const errorSpy = jest.spyOn(console, 'error');
      const response = placeRobot(defaultRobot, sampleSurface, xPosition, yPosition, DIRECTIONS.North);  
      it('shows an error', () => expect(errorSpy).toHaveBeenCalledWith('Invalid move'));
    it('returns the same robot object', () => expect(response).toEqual(defaultRobot));
    }
    
    testPlacement(0, sampleSurface.height);
    testPlacement(0, sampleSurface.height + 1);
    testPlacement(sampleSurface.width, 0);
    testPlacement(sampleSurface.width + 1, 0);
    testPlacement(-1, 0);
    testPlacement(0, -1);
  });

  describe('when placing to a valid space', () => {
    const response = placeRobot(defaultRobot, sampleSurface, 2, 3, DIRECTIONS.East);

    it('sets isPlaced to true', () => expect(response.isPlaced).toBe(true));
    it('sets xPosition to given value', () => expect(response.xPosition).toBe(2));
    it('sets yPosition to given value', () => expect(response.yPosition).toBe(3));
    it('sets direction to given value', () => expect(response.direction).toBe(DIRECTIONS.East));
  });
});