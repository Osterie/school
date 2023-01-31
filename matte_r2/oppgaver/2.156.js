var a = 1
var b = 2

var n = 100
var dx = (b-a)/n 

function f(x){
    return x
}

var sum = 0

function running()
{
    for (let i = 0; i < n; i++) {

        sum += (f(a + (i*dx))*dx)
}

console.log(sum, 'what')

}

running()




// # a = 1
// # b = 2

// # n = 10000
// # dx = (b-a)/n 

// # def f(x):
// #     return x

// # sum = 0
// # for i in range(1, n):

// #     sum += f(a + i*dx)*dx

// # print(sum)


