const t = [1, -1, 3]

t.push(5)

const t2 = t.concat(6) // new array is created

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})

console.log(t2)
console.log('vs')
console.log(t)

const m1 = t.map(value => value * 2)
console.log('m1 is ' + m1)

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  