# canopy
Chrome devtool for Svelte

STEP 1:
RUN FOLLOWING IN ROOT DIRECTORY TERMINAL TO INITIALIZE

cd extension/src && npm i && npm run tsc && cd ../sidebar-bundle-generator && npm i && npm run build && cd ../panel-bundle-generator && npm i && npm run build && cd ../../

STEP 2:
Unpack ./extension/src/built to Chrome

STEP 3:
RUN CLIENT IN DEV MODE







ORDER OF OPERATIONS FOR USAGE (as of Sat at 12noon):
a. Be sure that all DevTools windows are closed.
b. Reload the extension in chrome://extensions/.
c. Refresh the page containing the Svelte app.
d. Now, Canopy should be available in the DevTools panel.








All projects should have an interesting README
For the love of whatever matters to you please, please add a description to your projects. It sounds obvious but I cannot tell you how many time I've seen repos with no readme or the default readme created by whatever skeleton tool was used.

Here's the minimum you should have in your readme:

A description
You need to make it very easy for someone who has 60 seconds to understand what the hell this is about and why that makes you a good programmer.

Make sure you answer at least the following questions:

What does it do? Write a short sentence and list the working functionalities.

What is it? Clearly, indicate what that code is supposed to produce. Is it a web, desktop, mobile app or a library?

What technologies are used? List all the important framework and libraries that contribute to this project. It's useful for a recruiter who is not necessarily familiar with every single framework on earth to know if this is Laravel and Vue or React and Expressjs.

What is the ambition of the project? Are you just test-driving a technology or is it something that is or will go live somewhere?

What is the stage of the project? Clearly, indicate where you are with it. Whether it is complete or a work in progress? If it's a work in progress indicate what is done and what is pending.

Are there some known issues or things that are not properly done? If yes list them because I'll be much more tolerant when/if I find shortcomings that have been highlighted than if I just discover them myself.

Tell me what to look at
If you're insisting on showcasing a large project there is a probably a lot of boilerplate or "plumbing" that is absolutely uninteresting so do not hesitate to indicate where are the juiciest bits.

If it's a fork in which you're contributing, make clear what you've been working on and if it's too hard to pinpoint then don't showcase that project.

How to run it
You should absolutely have a clear and precise explanation of how to run it (or how to use it if it is a library).

Running a demo version of your project must one-liner activity such as npm run, graddle serve, docker run .. or whatever is used by your framework.

There's very little reason in this day and age to have a long list of manual dependencies and pre-setup to run anything.

This is what you should strive for:

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# regenerate Element component styles in theme/ from element-variables.css
npm run theme
A demo
If you can have a live accessible demo link it directly in the description. If you can not have a live demo use a screen recorder; and if that's too much to ask; have at least a few screenshots.

https://asciinema.org/ seems cool for console recording but I have not tried it.
