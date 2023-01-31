
n = 4 #antall rektangler

def f(x):
    return x**2


areal = 0
bredde = (4) / n


for i in range(n):
    høyde = f(1 + i*bredde)
    areal = areal + høyde*bredde


print(areal)