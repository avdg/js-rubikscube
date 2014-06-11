= Cube notation spec =

Note: spec and implementation may differ and each may have their own features
      or lacking features described/implemented elsewhere

== Structure of a cube ==

We assume that a cube has 6 faces, we call each of them
- (f) The front side
- (b) The back side
- (l) The left side
- (r) The right side
- (t) The top side
- (d) And the down side

We also assume a cube has the same number of rows as there are columns
This means that the state can hold 3x3x3 cubes, as 4x4x4 cubes and bigger

A normal cube has 6 faces, implemented as a hash table
Each face state is a 2 dimensional array

We declare a face state as following:
- Orientation of a face of the cube:
  - If the face is at the edge of the top face, we put the top face on top
  - In case of the top edge and top face, we use the front face at top as reference point
- A face is a 2 dimensional array
  - The first group is the row from the left top to the right top
  - The second group is the row from the left middle to the right middle
  - The third and final group is the row from the left bottom to the right bottom

Or represented differently* (for a 3x3x3 cube):
[
  [top left sticker   (corner), middle left sticker (edge),     down left sticker (corner)],
  [top middle sticker (edge),   middle middle sticker (middle), bottom middle sticker (edge)],
  [top right sticker  (corner), middle right sticker (edge),    bottom right sticker (corner)]
]
(*terminology added for clarity)

== Middle piece (or the center sitcker) ==

We use the numbers 0 to 3 to give each middle piece their orientation
Where 0 is normal, while the other 3 are given to the states in clockwise direction

The middle pieces have their own hash table.
If the cube is larger than the 3x3x3 cube we use the same representation style as the cube,
but without the edge or corner pieces.

== Name of the colors and color constrains ==

We allow the user to define their own set of colors.

However, we do have contrains a cube can have:
- For now, we only allow 6 sets of colors
- The number of colors is limited to the number of stickers a side has

== Rotation ==
For now use a custom representation that is scalable for each cube.
The syntax is as following:
[f|b|l|r|t|d => face][v|h => vertical top or horizontal left][0-... => steps to the right or bottom]

Additional rules:
- If the face is represented with a small letter, the move is clockwise
- If the face is represented with a capitalized letter, the move is anti-clockwise
- A 2 can be added in front of the notation to indicate the rotation has to be done twice
  (the rotating piece moves 180 degrees)

== Refacing the cube ==

Can be done using following syntax:
[l,r,t,d => direction of rotation][0-3 => side rotations]

Additional rules
- If the face is represented with a small letter, the side rotation is done clockwise
- If the face is represented with a capitalized letter, the side rotation is done anti-clockwise
