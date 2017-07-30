#Demo 21 - Introduction to Git and Pulling codebase from github

#load in browser:

https://github.com/sharepoint

#Consider the following PnP repo

https://github.com/SharePoint/PnP

#Git

download and install git
https://git-scm.com/

#git version installed

git --version

#clone the codebase into dev working folder - takes a while

git clone https://github.com/OfficeDev/PnP.git PnP

#ensure you have the latest working codebase

git pull

#create and checkout (switch) new branch "my-branch" based on "master" branch

git checkout -b my-branch master

#create and checkout (switch) new branch "my-branch-dev" based on "dev" branch

git checkout dev
git checkout -b my-branch-dev dev

#Committing changed via git command line

#stage file(s) for commit - such as README.md

git add README.md

#commit, opens editor for commit message

git commit
:write
:quit