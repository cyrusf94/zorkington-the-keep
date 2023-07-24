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

    use(item) {
        if (this.inventory.includes(itemLookup[item])) {
            console.log(itemLookup[item].useItem);   
        } else if (locationLookup[this.location].immutable.includes(itemLookup[item])) {
            console.log(itemLookup[item].useItem);
                //key puzzles/finding
                //might change so items can have a hidden inventory because you can cheat with this
                if (item == "painting" || "strange painting" || "guards bag" || "jewlery box" ) {
                    locationLookup[this.location].roomInventory.push(key);
                }
        } else if (!item) {
            console.log("\nuse what?");
        } else {
            console.log(`\n${item} is not in your inventory.`);
        }
    }

    unlock(door) {
        if (!door) {
            console.log("\nunlock what?");
        } else if (this.inventory.includes(itemLookup["key"]) && locationLookup[this.location].immutable.includes(itemLookup[door])) {
            this.inventory = this.inventory.filter(items => items != itemLookup["key"]);
            itemLookup[door].unlockDoor();
        } else {
            console.log("\nI can't do that")
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
            console.log(`\n${item} doesn't appear to be in your inventory.`);
        }
    }

    take(item) {
        if (locationLookup[this.location].roomInventory.includes(itemLookup[item])) {
            console.log(`\nYou picked up the ${item}`);
            this.inventory.push(itemLookup[item]);
            locationLookup[this.location].roomInventory = locationLookup[this.location].roomInventory.filter(items => items != itemLookup[item]);
        } else if (locationLookup[this.location].immutable.includes(itemLookup[item])) {
            console.log(`\nYou can't take the ${item}`);
        } else if (!item) {
            console.log("\ntake what?");
        } else {
            console.log(`\n${item} doesn't appear to be in this room`)
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
        let validLocations = ["cell", "dungeon hallway", "stairs", "castle corridor",
        "left room", "dining hall", "right room", "bedroom", "roof ledge"];
        if (!newLocation || !validLocations.includes(newLocation)) {
            console.log("\nmove where?")
        } else if (locationLookup[newLocation].immutable[0].locked == true && locationStates[titlize(this.location)].includes(newLocation)) {
            console.log("\nThe door is locked");
        } else if (locationStates[titlize(this.location)].includes(newLocation)){
            console.log(`\nYou move into the ${locationLookup[newLocation].name}`);
            console.log(locationLookup[newLocation].description);
            this.location = newLocation;
            if (newLocation == "roof ledge") {
                process.exit();
            }
        } else {
            console.log(`\nYou cannot go from ${this.location} to ${newLocation}`);
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
            give_up: "give up - only use if must be to exit the game"
        }
        console.table(help);
    }

    giveup() {
        console.log("\nYou collapse with frustration and accept your fate. The caslte has claimed another")
        process.exit();
    }
}

class Item {
    constructor(name, description, useItem) {
        this.name = name;
        this.description = description;
        this.useItem = useItem;
    }
}

class Door extends Item {
    constructor(name, description, useItem, locked) {
        super(name, description, useItem)
        this.locked = locked;
    }

    unlockDoor() {
        console.log(`\nYou use the key in the ${this.name} and it unlocks,\nbut in the proccess the key broke`);
        this.useItem = `\nThe ${this.name} opens`
        return this.locked = false;
    }
}

// ? ITEMS -------------------------------------------------------
let note = new Item("note", "\nI see you are in quite the prediciment my friend.\nI dont think you belong here\nbut I think you already know that.\nyou should [take key].\nIf you need further instructions just ask for [help].",
"you pull the note out maybe I should [Look] at it", );

let key = new Item("key", "\nA small iron key",
"\nMaybe I should try to [unlock  specific door] with it");

let cellDoor = new Door("cell door", "\nA barred door locking you in your cell. maybe there is a [key]",
"\nIt appears to be locked", true);

let dungeonDoor = new Door("dungeon door", "\nA wooden door that seems to be blocking the way to the [stairs]",
"\nIt seems to be locked. I need to find a way to unlock it", true);

let gaurdsBag = new Item("guards bag", "\nA small bag hanging on a hook maybe I should try [use]ing it",
"\nThere is a key inside I should take it\nMaybe it unlocks the [dungeon door]");

let leftDoor = new Door("left door", "\nI'm not sure whats behind that door",
"\nyou open the door", false);

let rightDoor = new Door("right door", "\nI'm not sure whats behind that door",
"\nThe door is locked", true)

let window = new Item("window", "\nSmall window with a little light coming through",
"\nThe window is to high to look out");

let torch = new Item("torch", "\nThe torch glows with firery embers",
"\nYou wave the torch out in front of you");

let strangePainting = new Item("painting", "\nIts a strange painting of a man... maybe the owner of the castle?\nIt doesnt seem very secure on the wall",
"\nyou wiggle the painting and a key falls out from behind it");

let bigWindow = new Door("big window", "\nA big window overlooking a [roof ledge] maybe you can get out there",
"\nThe window is locked and must need a key", true);

let jewleryBox = new Item("jewlery box", "\nA small jewlery box",
"\nYou open the box and see a key inside it");

//allows Items to be found using string
let itemLookup = {
    "note": note,
    "key": key,
    "cell door": cellDoor,
    "window": window,
    "torch": torch,
    "gaurds bag": gaurdsBag,
    "dungeon door": dungeonDoor,
    "strange painting": strangePainting,
    "painting": strangePainting,
    "left door": leftDoor,
    "right door": rightDoor,
    "big window": bigWindow,
    "jewlery box": jewleryBox
}

// ? LOCATIONS -------------------------------------------------
let cell = new Location("cell", [note, key], [cellDoor, window], 
'\nA dimly lit dungeon cell with a [cell door].\nI think the [dungeon hallway] is on the other side.\nThe floor is cold and made of dust covered stone\nThere is also a small barred window with a little light peaking through');

let dungeonHallway = new Location("dungeon hallway", [torch], [cellDoor, dungeonDoor, gaurdsBag],
"\nA small hallway with 3 other cell doors\nThey dont appear to open the same.\nYou also notice your cell has vanished\nThere is a [torch] on the wall and a [dungeon door] down at the end.\nI also see a [gaurds bag] hanging on the wall.");

let stairs = new Location("stairs", [], [dungeonDoor],
"\nStone spiral stairs that seem to lead up to another part of the castle,\nperhaps a [castle corridor]\n");

let castleCorridor = new Location("castle corridor", [], [leftDoor, rightDoor, strangePainting],
"\nA castle corridor with a stange painting of a man on the wall\nmaybe its the owner of this castle?\nThere is a [left door] and a [right door]\nyou should check the [left room] and [right room]")

let leftRoom = new Location("dining hall", [], [leftDoor],
"\nA large dining hall that doesn't seem like its hosted anyone in ages.\nI can still smell food\nthis place is strange");

let rightRoom = new Location("bedroom", [], [rightDoor, bigWindow, jewleryBox],
"\nA large master bedroom with a grand bed\nthere is a big window with a roof ledge outside\nI can tell no one has been here in a long time\nthere is a jewlery box on the table");

let roofLedge = new Location("roof ledge", [], [bigWindow],
"\nthe ledge is very high up and you can see other parts of the castle.\nthis place is massive but shows no signs of life\nhow did I end up here\n...to be continued");

// ? STATE MACHINE ---------------------------------------------
let locationStates = {
    cell: ["dungeon hallway"],
    dungeonHallway: ["stairs"],
    stairs: ["dungeon hallway", "castle corridor"],
    castleCorridor: ["stairs", "left room", "right room","dining hall", "bedroom"],
    rightRoom: ["castle corridor", "roof ledge"],
    leftRoom: ["castle corridor"],
    roofLedge: ["bedroom", "right room"]

}

let locationLookup = {
    "cell": cell,
    "dungeon hallway": dungeonHallway,
    "stairs": stairs,
    "castle corridor": castleCorridor,
    "left room": leftRoom,
    "right room": rightRoom,
    "dining hall": leftRoom,
    "bedroom": rightRoom,
    "roof ledge": roofLedge
}

start();

async function start() {
    const welcomeMessage = `\n
    You wake up in a dimly lit dungeon cell. 
    The floors are cold and made of dust covered stone.
    The air is heavy and damp.
    You have no idea how you ended up here.
    A little bit of light peeks through the cell window bars.\n
    A shadowy figure rushes by the cell door.
    they toss something through the bars.\n
    it looks like a rolled up note. maybe you should [take note].`;
    console.log(welcomeMessage);
    console.log("\n--------------------------------------------------------------")

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
        console.log("Maybe you should [take note]");
        continue;
    }
}
// Game take inputs and puts them into an array then runs them through a switch using different class methods
let alive = true;
while(alive) {
    console.log("\n--------------------------------------------------------------")
    console.log(`location: ${player.location}`)
    let command = await ask(`\nwhat should I do?\n`);
    let answ = command.trim().split(' ');
    let input = answ.filter(items => items != answ[0]).join(' ');
    
    switch(alive) {
        case answ[0] === "drop" :
            player.drop(input);
            break;
        case answ[0] === "take" :
            player.take(input);
            break;
        case answ[0] === "use" :
            player.use(input);
            break;
        case answ[0] === "unlock" :
            player.unlock(input);
            break;
        case answ[0] === "look" :
            player.look(input);
            break;
        case answ[0] === "move" :
            player.move(input)
            break;
        case answ[0] === "inventory" :
            player.inventoryCheck();
            break;
        case answ[0] === "help" :
            player.help();
            break;
        case answ.join(' ') === "give up" :
            player.giveup();
            break;
        default :
                if (answ[0] === "") { 
                    console.log(`\nI dont know what to do`)
                } else {
                    console.log(`\nI dont know how to ${answ[0]}`)
                }
        }
    }
}

