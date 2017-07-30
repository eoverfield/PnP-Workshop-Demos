#Demo 22 - Contribute to PnP With a Pull Request

#Helpful video

https://www.youtube.com/watch?v=ELeGFILRFfQ

#Documentation

https://github.com/SharePoint/PnP/wiki/Preparing-a-contribution-and-letting-the-PnP-core-team-know-via-a-pull-request

#fork codebase to your github account

such as:
https://github.com/SharePoint/sp-dev-fx-webparts

then "fork" in browser
    

#clone the forked repo, get clone url from https://github.com/"your-id"/sp-dev-fx-webparts

> git clone https://github.com/"your-id"/sp-dev-fx-webparts.git PnPWebparts

> cd PnPWebparts

#show current remote branchs, verbose

> git remote -v

#add the upstream remote location back to original

> git remote add upstream https://github.com/SharePoint/sp-dev-fx-webparts

#go and fetch the latest code from upsteam. Should do this one a month or so to get latest bits

> git fetch upstream

#switch to local master

> git checkout master
    
#merge to keep up to data
> git merge upstream/master
    
#checkout to dev branch from upstream dev

> git checkout –b dev upstream/dev

#make sure all up to date

> git pull


#create a new branch to dev on, based on upstream/dev branch

> git checkout -b my-submission dev


#make changes and commit


#now push it up into personal git account

> git push --set-upstream origin my-submission


#load in github:

https://github.com/"your-id"/sp-dev-fx-webparts

#switch to new branch in browser

#create pull request in browser

Fill out form to provide detail on submission

##ensure you base to dev branch!