/* CASTLE */
/* 
    ! CODE LIST
    ? CLASSES
        * Location: "RoomName" "roomInventory[[mutable],[immutable]](mutable)", "descriptiom"
            * METHODS:
                * look() - gives description of room
                * move(newLocation) - moves to valid location
        * player: "name" "inventory[]"
            * METHODS:
            * look(item) - gives description of item 
            * use(item) - unlock door/wave torch
        * item : "itemName", "description"
    ? STATE MACHINES
        * valid location movement
    ? Switch 
        * operates the entire game

*/

/* 
    ? FIRST ROOM: castle dungeon cell
    Description: You wake up in a dimly lit dungeon cell. the room is damp and has 
    only some old hay on the ground to sleep on.  a little bit of light peeks through 
    the cell window bars.  the window is too high to see out of. 

    event: a shadowy figure rushes by the cell door and tosses something into your cell. 
    it looks like a rolled up note. maybe I should [take] the [note].
    
*/

/* 
    ! Note 
    I see you are in quite the prediciment my friend.  I dont think you belong here
    and I think you know that as well.
    There is a [key] burried in back right corner of your cell. you should [take] [key].
    If you need further instructions just type [help]. 
    Good luck and im sure we will meet soon enough.
*/

/* 
    ! Commands "help"
    take "item": picks up item and gives description
    drop "item": leaves item in that rooms inventory
    inventory : opens your array of items
    use "item" : opens up options of what you can use it for 
    ex. use "key" returns "use key on hallway door? [yes] [no]
    look : gives description of current room
    look "item": gives description of item 
    move "location" : moves you to a VALID location 
    
*/

/*  
    ? Dungeon hallway 
    Description: you step out of the cell and stepped into the dungeon hallway.
    The cell door slams shut behind you...weird
    there are only a few other cells and they seem to be empty. 
    there is a torch on the wall illuminating a small portion of the hallway.
    you notice another locked door down at the end.
    maybe the key works there too?

    ! want to add other cells need to figure out multiple key solution
*/

/* 
    ? Stairs
    Description: Stone spiral stairs that seem to lead up to another part of the castle,
    perhaps a [castle corridor]

    ! might add secret room here
*/

/* 
    ? Castle Corridor
    Description: A castle corridor with a stange painting of a man on the wall
    maybe its the owner of this castle?
    There is a [left door] and a [right door]
    you shoudld check the [left room] and [right room]")

*/

/* 
    ? Left Room (dining hall)
*/

/* 
    ? Right Room (bedroom)
    Description: 
    ! might make this into a puzzle where door shuts behind you and you need to solve a puzzle to get key.
*/