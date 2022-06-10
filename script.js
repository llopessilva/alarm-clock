// Add more options in these select tags

const currentTime = document.querySelector('h1')
const content = document.querySelector('.content')
const selectMenu = document.querySelectorAll('select')
const setAlarmBtn = document.querySelector('button')

let alarmTime, isAlarmSet = false
let ringtone = new Audio("./assets/ringtone.mp3")

// adiciona as horas
for (let i = 12; i > 0; i--) {
  i = i < 10 ? '0' + i : i
  let option = `<option value="${i}">${i}</option>`
  selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option)
}

// adiociona os minutos
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? '0' + i : i
  let option = `<option value="${i}">${i}</option>`
  selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option)
}

//adiciona AM/PM
for (let i = 2; i > 0; i--) {
  let ampm = ''
  if (i == 1) {
    ampm = 'AM'
  } else {
    ampm = 'PM'
  }
  let option = `<option value ="${ampm}">${ampm}</option>`
  selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option)
}

// This callback function will call after every 1000 miliseconds
setInterval(() => {
  // getting hours, minutes, seconds
  let date = new Date()
  h = date.getHours()
  m = date.getMinutes()
  s = date.getSeconds()
  ampm = 'AM'

  // If hour is less than 12 ampm = PM
  if (h >= 12) {
    h = h - 12
    ampm = 'PM'
  }
  // if hour value ir 0, set this value to 12
  h = h == 0 ? (h = 12) : h
  // adding 0 before hr, min, sec if this value is less than 10
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play()
    ringtone.loop = true
  }
}, 1000)

function setAlarm() {
  if(isAlarmSet) { // if isAlarmSet is true
    alarmTime = "" // clear the value of alarmTime
    ringtone.pause() // pause the ringtone
    content.classList.remove('disable')
    setAlarmBtn.innerText = 'Set Alarm'
    return isAlarmSet = false // return isAlarmSet value to false
  }

  // getting hour, minute, ampm select tag value
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
  // show alert, if user hasn't select any time for alarm
  if (
    time.includes('Hour') ||
    time.includes('Minute') ||
    time.includes('AM/PM')
  ) {
    return alert('Please, select a valid time to set Alarm!')
  }
  isAlarmSet = true
  alarmTime = time

  // disable select menu, if alarm is set
  content.classList.add('disable')
  setAlarmBtn.innerText = 'Clear Alarm'

  console.log(time)
}

setAlarmBtn.addEventListener('click', setAlarm)
