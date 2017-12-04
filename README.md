# Power Play
My first attempt at a Ludum Dare
for Ludum Dare #40 - The more you have, the worse it is.


## The Idea
You start as a slave, hoping to work your way up in the world, maybe even become king. But what will you do to get there? Will you work hard and honestly claw your way to the top or will you let your power and influence corrupt you on the way? What lines would you cross to get to the top?

The game's goal was to test if the more power you have, the worse your morals would be.

## What's In The Game
- Day Progression
- Work Level and Impacts for Slave and Workers
- Extra Actions 'Engine'
  - Pick a Name when not a Slave
  - Get offered a Promotion to Worker
  - Offer to Bribe a Manager for a Promotion
- Simple AI
  - Complete Work Level each Day based on Laziness
  - Can die
- Map Generation
  - Visible Buildings
  - Visible People
  - Zoom out from Plot level, to Town, to Kingdom
  - 256 possible Plots
  - 4096 squares
- Working Status Bar
- Ability to Die
- Hand Drawn Art

## What's Not In The Game
- Proper Gameplay
  - Needs more (read BASICALLY ALL) extra actions to test use of power
  - Needs implementation of Manager, Owner, Lord and King
  - Needs ability to progress between, or be kicked back in Jobs
- Complete AI
  - Need to be able to complete their own extra actions
- Build Mechanic
  - Part of the extra actions plan was to have a build mechanic to open up more options
  - Ideas included:
    - Other Buildings
    - Slave Quarters
    - Prison
    - Torture Chamber
    - Public Whipping Square
    - Public Execution
    - Day Spa
    - Lava Lamp Factory
- CSS for Portrait Views
  - Currently looks horrible if screen height is greater than width
- Better Input/Info Panels
  - Needs custom dialog box
  - Needs ability to see influence and power over AI's
  - Needs ability to check status logs (For now can be viewed in a dev console using `status_log`)
- Any Audio Whatsoever (This was very low on my priorities list)