
//shop
var shopItems = ["Multipliere", "MoreClicks", "Rush", "AutoClicker DON'T", "Increase Rent"]
var shopItemscost = [1, 5, 20, 1000000, 0]
var priceFactor = [1.15, 1.05, 1.25, 10, 1]
var shopItemColor = [(255, 0, 0, 255), (0, 255, 0, 255), (0, 0, 255, 255), (0, 255, 255, 255), (255, 0, 255, 0 )]
var currentUpgrades = [0, 0, 0, 0, 0]

var points = 0

var rushActive = false
var rushTime = 0
var rushCooldown = 300

var rentActive = false
var rentAmount = 5
var rentGrow = 1.05
var rentMaxTimer = 100
var rentTimer = 100


var lastButtonPressed = 2

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

window.addEventListener("keypress", function(event){
    switch(event.key){
        // Shop Buttons

        case "w":
            buyItem(0)
            break
        case "a":
            buyItem(1)
            break
        case "s":
            buyItem(2)
            break
        case "d":
            buyItem(3)
            break
        case "e":
            buyItem(4)
            break
        case "f":
            buyItem(5)
            break
        case "g":
            buyItem(6)
            break
    }
})

window.addEventListener("keydown", function(event){
    switch(event.key){
        case "ArrowLeft":
            givePoints(0)
            break
        case "ArrowRight":
            givePoints(1)
            break
    }
})

function newprice(index){
    var currentPriceFactor = priceFactor[index]
    shopItemscost[index] = (shopItemscost[index]*currentPriceFactor)
}

function givePoints(Button){
    if (Button != lastButtonPressed) {

        if (rushActive == true){
            //                                  Multiplier          Moreclicks              Rush                    More Rent
            points += 1*(Math.pow(1.1, currentUpgrades[0]))*(currentUpgrades[1]+1)*(currentUpgrades[2]*10)*(currentUpgrades[4]+1)
        }
        else
        {
            //                                  Multiplier          Moreclicks           More Rent
            points += 1*(Math.pow(1.1, currentUpgrades[0]))*(currentUpgrades[1]+1)*(currentUpgrades[4]+1)
        }


        lastButtonPressed = Button
        //temp
        console.log(points)
    }
}

function setRush(){
    rushTime = 150
    rushActive = true
    
    //temp
    console.log("Rush Activated")
}

function buyItem(index) {
    if (points >= shopItemscost[index]){
        points -= shopItemscost[index]
        currentUpgrades[index] += 1
        newprice(index)

        if(index == 2  && currentUpgrades[2] == 1){
            setRush()
        }
        //temp
        console.log(currentUpgrades)
        console.log(shopItemscost)
    }
}

function update(){

    if(rushTime > 0){
        rushTime -= 1
    }
    else if(currentUpgrades[2] >= 1){

        //temp
        if(rushActive == true){
            console.log("Rush Deactivated")
        }

        rushActive = false
        if(rushCooldown <= 0){
            setRush()
            rushCooldown = getRandomInt(300,600)
        }
        else{
            rushCooldown -= 1
        }
    }
}

setInterval(update, 100)
