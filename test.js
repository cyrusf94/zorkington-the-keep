const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
    });
}

let titlize = function(string) {
    let arr = string.split(' ');
        if (arr.length == 2){
            let joined = arr[0] + (arr[1][0].toUpperCase() + arr[1].slice(1));
            return joined;
        } else {
        return arr.toString();
}

}

// ? CLASESS ------------------------------------------------------------
class Location {
    constructor(name, roomInventory, immutable, description) {
        this.name = name;
        this.roomInventory = roomInventory;
        this.immutable = immutable;
        this.description = description;
    }
}

class Player {
    constructor (name, inventory, location) {
        this.name = name;
        this.inventory = inventory;
        this.location = location;
    }

    command(input) {
        let commandKeywords = ["use", "drop", "take", "look", "move", "inventory", "help", "unlock"];
        let inputKeywords = ["key", "cell door", "hallway door", "left door", "right door", "strange painting", "window", "torch"];
        let inputFilter = input.filter(items => items != input[0]).join(' ');
        let methodLookup = [this.use(inputFilter), this.drop(inputFilter), this.look(inputFilter), this.move(inputFilter), this.inventoryCheck(inputFilter), this.help(inputFilter), this.unlock(inputFilter)];

        if (!input) {
            console.log(`\nI dont know what you want me to do`)
        } else if (input.length == 1 && commandKeywords.includes(input[0])) {
            let i = commandKeywords.indexOf(input[0]);
            methodLookup[0];
        } else if (commandKeywords.includes(input[0]) && inputKeywords.includes(inputFilter)) {
            let i = commandKeywords.indexOf(input[0]);
            methodLookup[0];
        } else {
            console.log(`\nI dont know how to ${input.join(' ')}`)
        }
    }

    use(item) {
        if (this.inventory.includes(itemLookup[item])) {
            console.log(itemLookup[item].useItem);   
        } else if (locationLookup[this.location].immutable.includes(itemLookup[item])) {
            console.log(itemLookup[item].useItem);
        } else if (!item) {
            console.log("\nuse what?");
        } else {
            console.log(`\n${item} doesn't appear to be available`);
        }
    }

    unlock(door) {
        if (this.inventory.includes("key")) {
            itemLookup[door].unlockDoor();
        } else {
            console.log("\nI need a key to do that")
        }
    }

    drop(item) {
        if (this.inventory.includes(itemLookup[item])){
            console.log(`\nYou dropped the ${item} in the ${this.location}`);
            locationLookup[this.location].roomInventory.push(itemLookup[item]);
            this.inventory = this.inventory.filter(items => items != itemLookup[item]);
        } else if (!item) {
            console.log("\ndrop what?");
        } else {
            console.log("\nThat item doesn't appear to be in your inventory.");
        }
    }

    take(item) {
        if (locationLookup[this.location].roomInventory.includes(itemLookup[item])) {
            console.log(`\nyou picked up the ${item}`);
            this.inventory.push(itemLookup[item]);
            locationLookup[this.location].roomInventory = locationLookup[this.location].roomInventory.filter(items => items != itemLookup[item]);
        } else if (locationLookup[this.location].immutable.includes(itemLookup[item])) {
            console.log("\nyou can't take that item");
        } else if (!item) {
            console.log("\npick up what?");
        } else {
            console.log("\nThat item doesn't appear to be in this room")
        }
    }

    look(item){
        if (locationLookup[this.location].immutable.includes(itemLookup[item])) {
            console.log(itemLookup[item].description)
        } else if (this.inventory.includes(itemLookup[item])) {
            console.log(itemLookup[item].description);
        } else if (!item) {
            console.log(locationLookup[this.location].description);
        } else {
            console.log("\nwhat are you looking for?")
    }
    }
    // made a door lock check
    move(newLocation) {
        if (!newLocation) {
            console.log("\nmove where?")
        } else if (locationLookup[newLocation].immutable[0].locked == true) {
            console.log("\nthe door is locked");
        } else if (locationStates[titlize(this.location)].includes(newLocation)){
            console.log(`\nyou move into the ${locationLookup[newLocation].name}`);
            console.log(locationLookup[newLocation].description);
            this.location = newLocation;
        } else {
            console.log(`\nyou cannot go from ${this.location} to ${newLocation}`);
        }
    }

    inventoryCheck() {
        let itemName = [];
        this.inventory.forEach(item => {
        itemName.push(item.name)
        });
        console.log("\nmy inventory:\n")
        console.log(itemName);
        console.log(`\ncurrent location: ${this.location}`);
    }

    help() {
        let help = {
            take: " take [item] - picks up item and gives description", 
            drop: " drop [item] - leaves item in that rooms inventory",
            inventory: " inventory - shows your invenotry and gives current location",
            look: " look - gives description of current location, 'look [item]' - gives items description",
            use: " use [item] - uses that item if can be",
            unlock: " unlock [specific door] - uses key to unlock door",
            move: " move [location] - moves to that location if possible",
        }
        console.table(help);
    }
}


class Item {
    constructor(name, description, useItem, specialUse) {
        this.name = name;
        this.description = description;
        this.useItem = useItem;
        this.specialUse = specialUse;
    }
}

class Door extends Item {
    constructor(name, description, useItem, locked) {
        super(name, description, useItem)
        this.locked = locked;
    }

    unlockDoor() {
        console.log(`you use the key in the ${this.name} and it unlocks`);
        this.useItem = `\nthe ${this.name} opens`
        return this.locked = false;
    }
}


// ? ITEMS -------------------------------------------------------
let note = new Item("note", "\nI see you are in quite the prediciment my friend.\nI dont think you belong here\n"+
"and I think you know that as well.\nyou should [take key].\n"+
"If you need further instructions just type [help].\n"+
"Good luck and im sure we will meet soon enough.",
"you pull the note out maybe I should [Look] at it", );

let key = new Item("key", "\nA small iron key", "\nmaybe I should try to [unlock door] with it");

let cellDoor = new Door("cell door", "\nA barred door locking you in your cell. maybe there is a [key]",
"\nit appears to be locked", true);

let hallWayDoor = new Door("door to the stairs", "\nA wooden door that seems to be blocking the way to the [stairs]",
"\nit seems to be locked. maybe the key will work there too", true);

let leftDoor = new Door("A door on the left side of the corridor", "\nI'm not sure whats behind that door", "\nyou open the door", false);

let rightDoor = new Door("A door on the right side of the corridor", "\nI'm not sure whats behind that door", "\nthe door is locked", true)

let window = new Item("window", "\nsmall window with a little light coming through", "\nthe window is to high to look out");

let torch = new Item("torch", "\nthe torch glows with firery embers", "\nyou wave the torch out in front of you");

let strangePainting = new Item("painting", "\nits a strange painting of a man... maybe the owner of the castle?", "\nyou check the painting but it doesnt do anthing");

//allows Items to be found using string
let itemLookup = {
    "note": note,
    "key": key,
    "cell door": cellDoor,
    "window": window,
    "torch": torch,
    "hallway door": hallWayDoor,
    "strange painting": strangePainting,
    "painting": strangePainting,
    "left door": leftDoor,
    "right door": rightDoor
}

// ? LOCATIONS -------------------------------------------------
let cell = new Location("cell", [note, key], [cellDoor, window], 
'\nA dimly lit dungeon cell with a [cell door].\nI think the [dungeon hallway] is on the other side.\nThere is a dirty pile of hay for sleeping\nThere is also a small barred window with a little light peaking through');

let dungeonHallway = new Location("dungeon hallway", [torch], [hallWayDoor],
"\nA small hallway with 3 other cell doors\nthey dont appear to open the same.\nThere is a [torch] on the wall and a [hallway door] down at the end.");

let stairs = new Location("stairs", [], [hallWayDoor],
"\nStone spiral stairs that seem to lead up to another part of the castle, perhaps a [castle corridor]\n");

let castleCorridor = new Location("castle corridor", [], [leftDoor, rightDoor, strangePainting],
"\nA long castle corridor with a stange painting of a man on the wall\nmaybe its the owner of this castle?\nThere is a [left door] and a [right door]\n you shoudld check the [left room] and [right room]")

let leftRoom = new Location("dining hall", [], [leftDoor], "");

let rightRoom = new Location("bedroom", [], [rightDoor], "beds and sleep stuff");

// ? STATE MACHINE ---------------------------------------------
let locationStates = {
    cell: ["dungeon hallway"],
    dungeonHallway: ["stairs"],
    stairs: ["dungeon hallway", "castle corridor"],
    castleCorridor: ["stairs", "left room", "right room","dining hall", "bedroom"],
    rightRoom: ["castle coridor"],
    leftRoom: ["castle coridor"]

}

let locationLookup = {
    "cell": cell,
    "dungeon hallway": dungeonHallway,
    "stairs": stairs,
    "castle corridor": castleCorridor,
    "left room": leftRoom,
    "right room": rightRoom,
    "dining hall": leftRoom,
    "bedroom": rightRoom
}

    start();

async function start() {
    const welcomeMessage = `\n  You wake up in a dimly lit dungeon cell. 
    The room is damp and has only some old hay on the ground to sleep on.
    A little bit of light peeks through the cell window bars.\n
    A shadowy figure rushes by the cell door and tosses something into your cell.\n
    it looks like a rolled up note. maybe I should [take note].`;
    console.log(welcomeMessage);

// ? PLAYER ----------------------------------------------------
let player = new Player("prisoner", [], "cell" );
    

let opening = true;
while(opening){
    let answer = await ask(`\n`);
    if(answer.trim() == "take note") {
        player.take("note");
        console.log("\nA key falls out of the rolled up note onto the floor.");
        player.look("note");
        opening = false;
    } else {
        console.log("Maybe I should [take note]");
        continue;
    }
}
// Game take inputs and puts them into an array then runs them through a switch using different class methods
let alive = true;
while(alive) {
    console.log("\n-------------------------------------------")
    let command = await ask(`\nwhat should I do?\n`);
    let answ = command.trim().split(' ');
    console.log(answ.indexOf('take'));
    player.command(answ);
}

}