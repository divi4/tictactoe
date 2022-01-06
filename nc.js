const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

let start_state = [[0,0,0], [0,0,0], [0,0,0]]
let spot = []
let gui = '*********'.split('')

let win_states = {
  0: [[1,1,1], [0,0,0], [0,0,0]],
  1: [[0,0,0], [1,1,1], [0,0,0]],
  2: [[0,0,0], [0,0,0], [1,1,1]],
  3: [[1,0,0], [1,0,0], [1,0,0]],
  4: [[0,1,0], [0,1,0], [0,1,0]],
  5: [[0,0,1], [0,0,1], [0,0,1]],
  6: [[1,0,0], [0,1,0], [0,0,1]],
  7: [[0,0,1], [0,1,0], [1,0,0]],
}

let start_state_gui = ' * * *\n * * *\n * * *'
console.log(start_state_gui)

readline.question('Enter input: ', input => {
  console.log(update_state_gui(input.split('')))
  readline.close()
})

function update_state_gui(inputArr) {
  if(typeof update_state(inputArr) === 'string') {
    return update_state(inputArr)
  } else {
    return graphics_db_logic(update_state(inputArr))
  }
}

function update_state(inputArr) {
  if(Array.isArray(inputArr) && inputArr.length === 2 && inputArr[0] <= 3 && inputArr[1] <= 3) {
    // May be more elegant to restrict to number range using unicode range
    start_state[inputArr[0]-1][inputArr[1]-1] = 1
    return start_state
  } else {
    return 'Please input a coordinate between 1 and 3 in this format: **'
  }
}

function graphics_db_logic(start_state) {
  // if there's a 1 in the start_state db then put a X in that spot in the gui
  start_state.forEach((arr, i) => {
    arr.forEach((item, j) => {
      if(item > 0) {
        spot.push([i,j])
      }
    })
  })
  // [0] * 3 + [1] is the relationship between the db and graphics
  for (var i = 0; i < spot.length; i++) {
    gui[spot[i][0]*3 + spot[i][1]] = "X"
    spot.splice(i,1)
  }
  return ` ${gui[0]} ${gui[1]} ${gui[2]}\n ${gui[3]} ${gui[4]} ${gui[5]} \n ${gui[6]} ${gui[7]} ${gui[8]}`
}
