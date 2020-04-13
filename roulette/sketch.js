/*
Project: Roulette Simulator
Author: Ryan Peiffer
Date: April 2020
*/

//initialize variables
let spin_button
let rolling_checkbox

let rand
var ball = ""
let ball_col
let winner
var win_text = ""

var betspots = []

//inputs for gameplay 
var balance = 200
var betsize = 5
var payout = 0


//array of numbers in order for the wheel
var nums = ['0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2']
//manually building array of colors 
// 1 = red, 2 = black, 3 = green
var cols = [3, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var my_colors = [[255,0,0],[0,0,0],[0,255,0]] 

//variables for formatting/display
wheel_x = 200
wheel_y = 200
wheel_rad = 190


function setup() {
  var canvas = createCanvas(width = 550, height = 400)
  canvas.parent('sketch-holder')
  background([1, 67, 30])

  //Button to spin the wheel
  spin_button = createButton('Spin!')
  spin_button.parent('sketch-holder')
  spin_button.position(wheel_x + wheel_rad + 50, 10)
  spin_button.mousePressed(wheelspin)
  
  //checkbox to keep bets rolling
  rolling_checkbox = createCheckbox('Keep bets rolling?', false)
  rolling_checkbox.parent('sketch-holder')
  rolling_checkbox.position(spin_button.x - 45, spin_button.y + 25)
  rolling_checkbox.style('color', '#ffffff')
  
  
  //drawing the roulette wheel
  //static so we don't need it in draw loop
  push()
  translate(wheel_x, wheel_y)
  textAlign(CENTER)
  var arc_len = TWO_PI/nums.length
  
  for (var i = 0; i < nums.length; i++) {
    //determine color of segment
    fill(my_colors[cols[i]-1])
    //arcs to create the wheel panels
    arc(0, 0, wheel_rad*2, wheel_rad*2,
        -HALF_PI + (arc_len*i) - (arc_len/2),
        -HALF_PI + (arc_len*i) + (arc_len/2))
    
    //write numbers on the wheel
    push()
    stroke(150)
    textSize(16)
    fill(255)
    var r = wheel_rad - 15
    text(nums[i],
         cos(-HALF_PI + (arc_len*i)) * r,
         sin(-HALF_PI + (arc_len*i)) * r)
    pop()
  }
  pop()
  
  ////  CREATING THE BETTING TABLE ////
  //numbered section
  var bet_col = 0
  var bet_row = 0
  var bet_w = 25
  var bet_h = 25
  var table_x = wheel_x + wheel_rad + 25
  var table_y = 80
  var bet_value = 0
  var bet_color = 0
  var payout = 35
  var bet_type = 'number'
  
  for(var i = 0; i < 36; i++) {
    //determine color of betting spot
    bet_color =             my_colors[cols[nums.indexOf(str(i+1))]-1]
    bet_value = i+1
    //initialize betting spot
    betspots[i] = new Betspot(table_x + bet_col*bet_w, table_y + bet_row*bet_h, bet_w, bet_h, bet_value, bet_color, payout, bet_type)
    
    //logic for placement of next number
    if((i+1) % 3 == 0) {
      bet_row++
      bet_col = 0
    } else {
      bet_col++
    } 
  }
  
  //thirds
  table_x = table_x + 3*bet_w
  table_y = table_y + 1.5*bet_h
  bet_h = 4 * bet_h
  bet_color = [1, 67, 30]
  bet_type = 'third'
  payout = 2
  
  for(i = 1; i <= 3; i++) {
    bet_value = 12*i
    betspot = new Betspot(table_x, table_y + (i-1)* bet_h, bet_w, bet_h, bet_value, bet_color, payout, bet_type)
    append(betspots, betspot)
  }
  
  //halves
  table_x = table_x + bet_w
  bet_h = bet_h / 2
  table_y = table_y - (bet_h/2)
  bet_type = 'half'
  payout = 1
  
  betspot = new Betspot(table_x, table_y, bet_w, bet_h, 18, bet_color, payout, bet_type)
  append(betspots, betspot)
  betspot = new Betspot(table_x, table_y + 5*bet_h, bet_w, bet_h, 36, bet_color, payout, bet_type)
  append(betspots, betspot)
  
  //even or odd
  table_y = table_y + bet_h
  bet_type = 'evenodd'
  payout = 1
  
  betspot = new Betspot(table_x, table_y, bet_w, bet_h, 'Even', bet_color, payout, bet_type)
  append(betspots, betspot)
  betspot = new Betspot(table_x, table_y + 3*bet_h, bet_w, bet_h, 'Odd', bet_color, payout, bet_type)
  append(betspots, betspot)
  
  //red or black
  table_y = table_y + bet_h
  bet_type = 'redblack'
  payout = 1
  
  betspot = new Betspot(table_x, table_y, bet_w, bet_h, 'Red', [255,0,0], payout, bet_type)
  append(betspots, betspot)
  betspot = new Betspot(table_x, table_y + bet_h, bet_w, bet_h, 'Black', [0,0,0], payout, bet_type)
  append(betspots, betspot)
}


function draw() {
  
  //draw betting board
  for(var i = 0; i < betspots.length; i++) {
    betspots[i].show()
  }
  
  //clear out center of wheel
  fill(255)
  ellipse(wheel_x, wheel_y, wheel_rad)
  
  //writing text in center of wheel
  push()
  translate(wheel_x, wheel_y)
  textAlign(CENTER)
  strokeWeight(20)
  
  //write the ball that was rolled
  textSize(36)
  //use this if statement so we don't get errors before the first spin
  if(ball_col == 3) {
    fill(color(0,255,0))
  } else if (ball_col == 2) {
    fill(0)
  } else {
    fill(color(255,0,0))
  }
  text(ball, 0, -25)
  
  //write if user won
  textSize(20)
  if(payout > 0) {
    fill(0)
  } else {
    fill(color(255,0,0))
  }
  text(win_text, 0, 10)
  
  //write current balance
  textSize(16)
  fill(0)
  text("Current Balance: $" + balance, 0, 35)
  pop()
  
}


function wheelspin() {
  //reset payout
  payout = 0
  
  //select a random number for ball to land on
  rand = round(random(0, nums.length-1))
  ball = nums[rand]
  ball_col = cols[rand]
  
  //go through all bet spots
  for(var i = 0; i < betspots.length; i++) {
    betspot = betspots[i]
    
    //only need to do calculations if a bet was set
    if(betspot.bet) {
      betwin = betspot.checkwin(int(ball)) 
      if(betwin) {
        payout = payout + (betsize * betspot.payout)
      } else {
        payout = payout - betsize
      }
      
      if(!rolling_checkbox.checked()) {
        betspot.bet = false //reset all bets
      }
    }
  }

  //generate text for payout
  if(payout > 0) {
    win_text = "You won $" + payout
  } else {
    win_text = "You lost $" + abs(payout)
  }
  
  //update balance
  balance = balance + payout
  
  
}


function mousePressed() {
  for(var i = 0; i < betspots.length; i++) {
    betspots[i].placebet()
  }
  
  
}
