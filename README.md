# 163 Computing Topics 2017/18 - Group 25

## Development
There are a number of steps you should take before modifying the site in order
to be able to generate the website files.

### Step 0: Clone the git repo
If you your SSH key set up in GitLab, run:
```
$ git clone git@gitlab.doc.ic.ac.uk:ftm17/163ComputingTopics1718-Group25.git
```
If not, run:
```
$ git clone https://gitlab.doc.ic.ac.uk/ftm17/163ComputingTopics1718-Group25.git
```

Set your name and email address so your commits associate with the right user:
```
$ git config user.name <shortcode> # e.g. ftm17
$ git config user.email <full email> # e.g. fraser.may17@imperial.ac.uk
```

You should then switch onto your own branch so you don't conflict with other people's work.
If you have already created a branch, switch onto it using:
```
$ git checkout <branch name> # e.g. fraser
```
If not, simply add the `-b` flag:
```
$ git checkout -b <branch name>
```

### Step 1: Install Node.js
I recommend installing Node using NVM (Node Version Manager), it makes it easier
to install and uninstall versions of Node and maintain multiple versions of it
without conflicting.

On macOS and Linux, install NVM by running:
```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
You should then close and re-open your Terminal to load NVM. If you have any issues using NVM in the following steps, follow the instructions [here](https://github.com/creationix/nvm#install-script) for NVM's installation instructions.

Install the latest LTS version of Node.js by running
```
$ nvm install --lts
```

### Step 2: Install global Node packages
Install `gulp-cli` and `http-server` by running:
```
$ npm install -g gulp-cli http-server
```
### Step 3: Install dependencies
To install the packages needed to build the website, `cd` into the website directory and run `npm install`:
```
$ cd 163ComputingTopics1718-Group25
$ npm install
```

### Step 4: Initial Build
Build the website by running Gulp in the website directory.
```
$ gulp
[10:30:00] Using gulpfile ~/163ComputingTopics1718-Group25/Gulpfile.js
[10:30:00] Starting 'sass'...
[10:30:00] Finished 'sass' after 5.83 ms
[10:30:00] Starting 'js:app'...
[10:30:00] Finished 'js:app' after 806 μs
[10:30:00] Starting 'js:vendor'...
[10:30:01] Finished 'js:vendor' after 1.61 ms
[10:30:01] Starting 'nunjucks'...
[10:30:01] Finished 'nunjucks' after 3.37 ms
[10:30:01] Starting 'images'...
[10:30:01] Finished 'images' after 360 μs
[10:30:01] Starting 'default'...
[10:30:01] Finished 'default' after 17 μs

```

The website will be generated in the `build` folder

### Step 5: Development
In one terminal window/tab, run `gulp watch`. This will listen for any changes to the files and will rebuild the website on any changes. **Please note:** if you add any additional files it will not see them and you will have to stop Gulp by hitting `CTRL-C` and running `gulp watch` again.

In a second terminal window/tab, run `http-server build` to serve the built website files, the output should look like this:
```
$ http-server build
Starting up http-server, serving build
Available on:
  http://127.0.0.1:8080
  http://146.169.164.157:8080
Hit CTRL-C to stop the server
```
Visit either of the URLs (the one beginning with `127.0.0.1` is the best one to use) to see the built website.
I would advise using Incognito mode or Private Browsing so your history doesn't get filled up with a bunch of `127.0.0.1` addresses and so your cache doesn't stop you from seeing changes.

#### File Structure
![Merge Request Page 1](https://www.doc.ic.ac.uk/~ftm17/misc/file-structure-information.png)

Most of the changes you will need to make will be in the relevant Nunjucks files.

If you need to change the styles, this is done in `src/sass/app.scss`. This stylesheet is included on every single page so if you are making any custom styles please use a unique class or ID (just prefix it with your name or something e.g. `<div class="fraser-image-container">`)

If you change any of the files, Gulp should rebuild the relevant part and if you refresh/reload the page the new page should appear.

**Note:** If you make changes to the SCSS file, if you cause a syntax error, `gulp watch` will exit and you'll have to run the command again.

### Step 6: Committing and pushing changes
Once you've made your changes you should commit your changes as usual, e.g.:
```
$ git commit -a -m "My commit message"
```
Then push the commits to **your own branch** using:
```
$ git push origin <branch name>
```

### Step 7: Merging your changes
![Merge Request Animation](https://www.doc.ic.ac.uk/~ftm17/misc/making-a-merge-request.gif)

#### Create Merge Request
Create a merge request [here](https://gitlab.doc.ic.ac.uk/ftm17/163ComputingTopics1718-Group25/merge_requests/new), select your branch as the source branch, make sure master is the target branch, and click *Compare branches and continue*

#### Fill in information
Then, on the following page fill in the form giving your request a descriptive title and description.

Prefix your title with `WIP: ` to prevent it being merged until you've finished. You can still push commits to your branch before the request is merged and it will include them in the request.

Set the assignee to ftm17, leave the Milestone and Labels fields blank, make sure the source branch and target are correct, and make sure you **don't** tick the box to remove your branch.

#### Submit merge request
Click *Submit merge request* at the bottom of the page.

I'll then take a look at it, make sure it's not going to break anything, then merge it into the master branch.

#### After your request has been merged
After your request has been merged, you will need to bring your branch up to date to the changes on master.

```
$ git checkout master
$ git pull
$ git checkout <your branch>
$ git merge master
```

If master has changed since you made your changes, this *might* create a new commit on your branch and open `nano` or `vim` or something to specify a commit message.
Just leave it at its default and save and exit. In Nano this is `CTRL-O, Enter` then `CTRL-X`, in Vim, type `:wq` and press `Enter`
