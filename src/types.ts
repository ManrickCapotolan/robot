export enum DIRECTIONS {
  North = 'NORTH',
  East = 'EAST',
  West = 'WEST',
  South = 'SOUTH'
}

export enum COMMANDS {
  Place = 'PLACE',
  Move = 'MOVE',
  TurnLeft = 'LEFT',
  TurnRight = 'RIGHT',
  Report = 'REPORT'
}

export interface Surface {
  width: number;
  height: number;
}

export interface Robot {
  xPosition: number;
  yPosition: number;
  direction: DIRECTIONS;
  isPlaced: boolean;
}
