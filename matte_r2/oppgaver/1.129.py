import math
# 1, 1, 2, 3, 5, 8, 13
#FIBONACCI
t1 = 1
t2 = 1

print(t1)

for i in range(0, 100):
    # print(t1, t2)
    print(t1/t2)
    tmp = t2
    t2 = t1
    t1 += tmp

print((1+math.sqrt(5))/2, 'går mot dette tallet')
print('done')
