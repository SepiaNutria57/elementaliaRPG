# elementaliaRPG

Ok, so... what is Elementalia?

Initially a fan-made Avatar RPG, this is a TTRPG that prides itself in the variety of options that the player can have. The combat system is the grand focus, with all 9 Elements, 12 Classes and multiple unlockable abilities that you can mix and match to make a simple attack into anything you can think of.

*...at least it's what I want to eventually do...*

This code is a tool that I want to make, kinda like a D&D Beyond but especially for this system. Most complex tests can have multiple dices, with formulas just to calculate the Stamina (Mana) cost. It might sound daunting, but it's a intended mechanic and I really want to make this accesible for any player.

## Ability modifiers

The main combat mechanic is the **Modifiers**. Any ability can be modified based on it's compatibility:

*Ability: Fireball*

Type: Ranged

Damage: 1d6

Stamina Cost: 2

*Modifier: Charged*

Type: Ranged, Melee

Effect: charges the attack for a turn to deal double damage

Damage: 2x(total dice)

Stamina Cost: 2x(total cost)

Balance Cost: 3

*Modifier: Dual Shot*

Type: Ranged

Effect: double projectiles

Damage: -1dice

Stamina Cost: +2

Balance Cost: 1

*Modifier: Lethal*

Type: Melee

Effect: +10 to Fighting

Damage: 0

Stamina Cost: +8

Balance Cost: 1

You can use both Charged and Dual Shot on a Fireball at the same type, but not Lethal. It's not initially complicated, but on higher levels it's common to have 4+ Modifiers, making formulas like this:

Damage: (1dice-1dice+2dice)*2
Stamina: ((2+4+6)*2)*2

Which, again, not that complicated, but kinda dauting to most new players and is a major pacing issue.

## The Site

Main idea of this project is to make a custom calculator that has every single modifier into a database. The player puts which ability type he wants to use, how much it deals and costs, than a list with every compatible modifier is pulled up. He choses how many he wants to apply, then roll. Quite simple, using the dice-roller library with some modifications (negative dice decreasing categories, for example), just the compatibility part that may be tiring due to how many modifiers there are.

Whenever this part is done, I'll focus on the nexts steps such as character sheets, turn-based intergration, DM/Player interactions, ability list with tooltips and probably way more.

I also need to finish the game, of course, and translate the Player's and DM's Combat Guide to English.

*And then maybe something else might be on the horizon...*

But yeah, that's it for now.

## How to support

Honestly, I never thought of actually making this into a full game. It always was just a way to be crative and have fun with some friends. But seeing more people interacting with the game, and liking it just as much if not more than me... it means something.

So if you want to support this project, I'm eventually going to put some links down here for contact and funding, if it ever makes that far. Any kind of (respectful) criticism and/or help is welcomed and appreciated.

