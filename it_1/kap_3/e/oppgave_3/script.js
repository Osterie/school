let tall = [2, 4, 6, 8];

tall.shift()
tall.pop()

console.log({tall})


tall.splice(1, 0, 5)


console.log({tall})


tall.push(7)
tall.splice(0, 0, 3)

console.log({tall})


tall.splice(0, 1, "tre")
tall.splice(2, 1, "fem")
tall.splice(4, 1, "syv")

console.log({tall})
