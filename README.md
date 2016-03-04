# Countdown-Numbers
2 from the top, rest is up to your Rachel...

This is a node/js based simple app to calculate the requested solution with the given numbers.
Tries to find all available solutions, so it might give 2x50 and 50x2 at the same solution as different answers :)

Usage (node app [SOLUTION] [NUMBERS...]):

    node app 692 100 75 4 3 6 7

Returns:

    Working for solution 692
    ((((100 + 4) * 6) - 7) + 75)
    (((((100 + 75) - 3) - 6) + 7) * 4)

You can give as much (or less) numbers as you like.
