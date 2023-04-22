import math
from pylab import *

# Constants
gamma = 0.25
omega = 1

# starting conditions
function_value = 0.5
function_derivated = 0
time = 0

# Step length and end time
step_length = 0.001
time_end = 20

# Lister
function_y_values = [function_value]
function_y_derivated_values = [function_derivated]
function_x_values = [time]

# Eulers metode

while time < time_end:

    function_value += function_derivated*step_length
    function_double_derivated = (-2*gamma*function_derivated - (omega**2) *function_value)
    function_derivated += function_double_derivated*step_length

    time += step_length

    function_y_values.append(function_value)
    function_y_derivated_values.append(function_derivated)
    function_x_values.append(time)

# Plotting 

plot(function_x_values, function_y_values)
plot(function_x_values, function_y_derivated_values)
xlabel("Tid (Sekunder)")
ylabel("Utslag")

show()