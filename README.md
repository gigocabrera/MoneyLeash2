
# Money Leash

Don't let your money run wild. Keep it on a leash!

# What is Money Leash?

Money Leash is a Personal Expense App developed in Ionic 2/Angular 2 with a Firebase backend. This project is a complete rewrite from the ground up of the original [MoneyLeash repo](https://github.com/gigocabrera/moneyleash) developed in ionic 1. 

![Money Leash Transactions](https://github.com/gigocabrera/moneyleash/blob/master/moneyleash_iphone.png)

I discovered the Ionic Framework back in April 2015 and I became addicted almost immediately. This app is a work in 
progress and the result of the itch I had to get out of my comfort zone and experiment with new technologies. Money Leash 
will stay as an **open source** project. Your feedback/help would be greatly appreciated!

## Quick Start

- Clone this repository.
- Run `npm install` from the project root.
- Install the ionic CLI (`npm install -g ionic@beta`)
- Run `ionic serve` in a terminal from the project root

## Firebase Data Structure

The database structure gets built automatically from the app when you register a user for the first time. No need to manually buld the schema. 
But here it is to give you an idea of how the data is organized.

![Money Leash Transactions](https://github.com/gigocabrera/moneyleash/blob/master/Firebase_data_structure.png)

## Firebase Security and Rules

The Firebase Security Rules for MoneyLeash can be found in the Gist below. 
A user is granted access (read/write) by house_id and the security rules have been tested to guarantee no unauthorized access is allowed. 
However, the rules need to be enhanced to: (1) prevent users from modifying a house_id, 
(2) for a newly created account, the user needs to logout and log back in for the rules to work

- [Security Rules Gist](https://gist.github.com/gigocabrera/fcfbe03b5636aad91302)

## Live Demo

 - [Money Leash Demo](http://www.moneyleash.com/)


## Contribute

This is a work inprogress and **your feedback/help would be greatly appreciated!**

- Have a feature request or find a bug?
  * [Submit on GitHub](https://github.com/gigocabrera/moneyleash/issues)


## Connect

- Follow [@gigocabrera] on Twitter(https://twitter.com/gigocabrera)
- Follow on [LinkedIn](https://www.linkedin.com/in/luiscabrerame)
- Contact me on my [website](http://www.gigocabrera.com)


# License

    The MIT License (MIT)
    
    Copyright (c) 2015 - Luis Cabrera (gigocabrera.com)
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this 
	software and associated documentation files (the "Software"), to deal in the Software 
	without restriction, including without limitation the rights to use, copy, modify, 
	merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
	permit persons to whom the Software is furnished to do so, subject to the following 
	conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or 
	substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
	PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
	OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	DEALINGS IN THE SOFTWARE.
