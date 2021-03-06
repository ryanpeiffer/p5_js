//inputs for gameplay
let balance = 200
let betsize = 5
let n_decks = 6


//variable definitions
let card
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
let suits = ['d', 'h', 'c', 's']
let deck = []

let player_hand = []
let player_count = 0
let dealer_hand = []
let dealer_count = 0
let running_count

let player_turn = false
let player_blackjack = false
let winloss = ' '
let winloss_color = 0
let payout 

let hit_button
let stand_button
let dd_button
let deal_button
let bet_up_button
let bet_down_button


function setup() {
  var myCanvas = createCanvas(400, 400)
  myCanvas.parent('sketchHolder')

  hit_button = createButton('Hit')
  hit_button.parent('sketchHolder')
  buttonStyle(hit_button, '#4CAF50')
  hit_button.position(12, 178)
  hit_button.mousePressed(hit)
  hit_button.hide()

  stand_button = createButton('Stand')
  stand_button.parent('sketchHolder')
  buttonStyle(stand_button, '#4CAF50')
  stand_button.position(hit_button.x, hit_button.y + 30)
  stand_button.mousePressed(stand)
  stand_button.hide()
  
  dd_button = createButton('Double Down')
  dd_button.parent('sketchHolder')
  buttonStyle(dd_button, '#4CAF50')
  dd_button.position(hit_button.x, hit_button.y + 60)
  dd_button.mousePressed(double_down)
  dd_button.hide()

  deal_button = createButton('Deal')
  deal_button.parent('sketchHolder')
  deal_button.position(hit_button.x + 20, hit_button.y - 55)
  deal_button.mousePressed(deal)

  bet_up_button = createButton('+')
  bet_up_button.parent('sketchHolder')
  bet_up_button.position(320, 215)
  bet_up_button.mousePressed(bet_up)
  bet_up_button.style('border', '2px solid #4CAF50')

  bet_down_button = createButton('-')
  bet_down_button.parent('sketchHolder')
  bet_down_button.position(bet_up_button.x - 170, bet_up_button.y)
  bet_down_button.mousePressed(bet_down)
  bet_down_button.style('border', '2px solid #f54242')


  shuffle_deck()
}



function draw() {
  background([1, 67, 30])

  //show player hand
  for (i = 0; i < player_hand.length; i++) {
    player_hand[i].show(10 + 50 * i, height - 95)
  }

  //show dealer hand
  for (i = 0; i < dealer_hand.length; i++) {
    dealer_hand[i].show(10 + 50 * i, 20)
  }

  //cover dealer's first card until player turn is finished
  if (player_turn) {
    push()
    stroke(0)
    strokeWeight(1)
    fill([0, 126, 255])
    rectMode(CORNER)
    rect(dealer_hand[0].x, dealer_hand[0].y, dealer_hand[0].w, dealer_hand[0].h, dealer_hand[0].corner)
    pop()
  }

  //write hand totals
  push()
  textSize(20)
  stroke(40)
  strokeWeight(1)
  fill(240)
  textAlign(LEFT, TOP)
  text("Player count: " + player_count, 250, height - 50)
  text("Dealer count: " + dealer_count, 250, 50)
  pop()

  //box displaying balance, win/loss, etc
  push()
  translate(0.6 * width + 5, 0.5 * height)
  rectMode(CENTER)
  fill(230)
  stroke(0)
  strokeWeight(2)
  rect(0, 0, 0.7 * width, 0.4 * height)

  //translate to top middle of box
  translate(0, -0.4 * height / 2)
  textAlign(CENTER, TOP)

  //print current balance
  textSize(16)
  noStroke()
  fill(0)
  text('Current Balance: $' + balance, 0, 75)

  //print current betsize
  text('Selected Bet: $' + betsize, 0, 100)

  //print win/loss status
  textSize(28)
  fill(winloss_color)
  text(winloss, 0, 25)

  //print cards remaining in shoe
  textSize(10)
  fill(0)
  text("Cards remaining in shoe: " + deck.length, -70, 0.4 * height - 15)
  pop()

  //print hidden text showing the count of the deck
  if(mouseX > 300 & mouseX < 380 & mouseY > 265 & mouseY < 275) {
		showCount()
	}

  //easter egg for when balance is at 420
  if(balance == 420) {
    push()
    textSize(9)
    fill([255,0,0])
    translate(325,195)
    rotate(.4)
    text("Nice", 0, 0)
    pop()
  }

}

function hit() {
  card = deck[deck.length - 1]
  player_hand.push(card)
  player_count += card.value
  running_count += card.countval
  //logic to allow aces to be 1 or 11
  for (i = 0; i < player_hand.length; i++) {
    if (player_hand[i].value == 11 & player_count > 21) {
      player_hand[i].value = 1
      //need to recalculate player count after change
      player_count = 0
      for (j = 0; j < player_hand.length; j++) {
        player_count += player_hand[j].value
      }
    }
  }
  deck.pop()

  if (player_count > 21) {
    dealer_count += dealer_hand[0].value
    running_count += dealer_hand[0].countval
    score()
  }
  
  dd_button.hide()
}

function stand() {
  //add the dealer's first card to their count
  dealer_count += dealer_hand[0].value
  running_count += dealer_hand[0].countval

  while (dealer_count < 17) {
    card = deck[deck.length - 1]
    dealer_hand.push(card)
    dealer_count += card.value
    running_count += card.countval
    //logic to allow aces to be 1 or 11
    for (i = 0; i < dealer_hand.length; i++) {
      if (dealer_hand[i].value == 11 & dealer_count > 21) {
        dealer_hand[i].value = 1
        //need to recalculate dealer count after change
        dealer_count = 0
        for (j = 0; j < dealer_hand.length; j++) {
          dealer_count += dealer_hand[j].value
        }
      }
    }
    deck.pop()
  }

  score()
}

function double_down() {
  payout = betsize * 2
  hit()
  stand()
}

function shuffle_deck() {
  //reset deck
  deck.length = 0
  running_count = 0

  //build the deck 
  //we have to use this disgusting triple loop to avoid shallow copies,
  //as that mucks up the logic for aces being 1 or 11
  for(k = 0; k < n_decks; k++) {
	  for (i = 0; i < suits.length; i++) {
	    for (j = 0; j < values.length; j++) {
	      card = new Card(suits[i], values[j])
	      deck.push(card)
	    }
	  }
	}

  shuffle(deck, true) //true modifies referenced array

}

function deal() {
  //clear out existing hands
  player_count = 0
  dealer_count = 0
  player_hand.length = 0
  dealer_hand.length = 0

  //if deck < 10 cards, reshuffle before dealing
  if (deck.length < 10) {
    shuffle_deck()
  }

  //deal new starting hands
  player_hand.push(deck[deck.length - 1])
  deck.pop()
  dealer_hand.push(deck[deck.length - 1])
  deck.pop()
  player_hand.push(deck[deck.length - 1])
  deck.pop()
  dealer_hand.push(deck[deck.length - 1])
  deck.pop()

  //fix AA hands to not show up as 22
  if(dealer_hand[0].value == 11 & dealer_hand[1].value == 11) {
  	dealer_hand[0].value = 1
  }
  if(player_hand[0].value == 11 & player_hand[1].value == 11) {
  	player_hand[0].value = 1
  }

  //calculate count for newly dealt hands
  player_count = player_hand[0].value + player_hand[1].value
  dealer_count = dealer_hand[1].value //only show value of dealer's second card until player turn ends

  //update running count
  running_count += player_hand[0].countval
  running_count += player_hand[1].countval
  running_count += dealer_hand[1].countval

  //check if player was dealt a blackjack
  if (player_count == 21) {
    player_blackjack = true
    dealer_count += dealer_hand[0].value
    running_count += dealer_hand[0].countval
    score()
  } else {
    //set things up for the player to take their turn
    hit_button.show()
    stand_button.show()
    if(balance >= betsize*2){
    	dd_button.show()
    }
    deal_button.hide()
    bet_up_button.hide()
    bet_down_button.hide()
    player_turn = true
    winloss = ' '
    payout = betsize
  }

}

function score() {
  player_turn = false

  if (player_blackjack) {
    winloss = 'BLACKJACK!'
    winloss_color = [255, 0, 255]
    payout = payout * 1.5
  } else if (player_count > 21) {
    winloss = 'You busted!'
    winloss_color = [255, 0, 0]
    payout = -payout
  } else if (dealer_count > 21) {
    winloss = 'Dealer busted!'
    winloss_color = [50, 168, 82]
    payout = payout
  } else if (player_count < dealer_count) {
    winloss = 'You lost!'
    winloss_color = [255, 0, 0]
    payout = -payout
  } else if (player_count == dealer_count) {
    winloss = 'Push'
    winloss_color = [0, 0, 0]
    payout = 0
  } else {
    winloss = 'You win!'
    winloss_color = [50, 168, 82]
    payout = payout
  }
  
  balance += payout

  //reset
  player_blackjack = false
  hit_button.hide()
  stand_button.hide()
  dd_button.hide()
  deal_button.show()
  bet_up_button.show()
  bet_down_button.show()
  betsize = min(betsize, balance)
}

function bet_up() {
  betsize += 5
  if (betsize > balance) {
    betsize = balance
  }
}

function bet_down() {
  betsize -= 5
  if (betsize < 5) {
    betsize = min(balance, 5)
  }
}

function showCount() {
		push()
		fill([0,0,255])
		rectMode(CORNER)
		textAlign(LEFT, TOP)
		textSize(10)
		text("Running count: " + running_count, 300, 265)
		pop()
}

//series of styling functions that I will
//be calling on multiple buttons
function buttonStyle(button, color) {
  button.style('width: 80px')
  button.style('text-align: center')
  button.style('border-radius: 0px')
  button.style('border: 1px solid green')
  button.style('background-color', color)
  button.style('color: white')
  button.style('display: block')
  button.style('padding: 5px 5px')

}
