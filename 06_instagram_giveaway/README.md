# Task 6: INSTAGRAM GIVEAWAY

## To run app

`npm start` &mdash; wakes up the bot.

## Task requirements

The goal of this task is to learn methods of sorting and selecting values. All you need to implement it is vanilla JavaScript without any external dependencies.

What makes the task interesting is that at one time we used a similar algorithm to find the likes of users in 10 posts in a client-side giveaway. It was necessary to find out who actually liked all ten posts.

### Overview

You have 20 text files (download), each with 100,000 word combinations. The total is 2 million word combinations. They were generated from two batches of 400 random words each, so they are repeatedly repeated in all or some of the files.

You need:

- Determine how many unique usernames there are in all the specified files (occurring at least once in any of the files);
- Determine how many usernames occur in all 20 files;
- Find out how many usernames occur in at least 10 files.

### Requirements

Your program should have 3 different functions that return an integer. For example:

uniqueValues(); // returns 1234
existInAllFiles(); // returns 42
existInAtleastTen(); // returns 50

⚠️ NOTE: Make sure you measure the performance of your program.

If it takes more than a few seconds to process, you are doing something wrong. Also, report the elapsed time in the program’s output.
