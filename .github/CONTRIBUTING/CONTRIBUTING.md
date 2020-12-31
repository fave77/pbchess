# Contribution Guidelines :green_heart:

With your contribution, we can make this project... awesome :tada:. Now, to make a hassle-free workflow, I implore you all to follow these guidelines!

Please note we have a [code of conduct][1], please follow it in all your interactions with the project.

## :ballot_box_with_check: Prerequisites
- Node.js (version 12+)
- npm (version 6+)
- MongoDB (version 4+)
- Redis (version 6+)

... and probably a lot of coffee (:coffee:)

## :arrow_down: Clone and Install

- First, fork this repository :fork_and_knife: and follow the given instructions:

```bash
# clone the forked repository to your local machine
$ git clone https://github.com/<YOUR-GITHUB-USERNAME>/pbchess.git

# navigate to the project's directory
$ cd pbchess

# install client dependencies
$ cd client && npm install

# install server dependencies
$ cd server && npm install
```
## :heavy_plus_sign: Include Remote Repo

- Make sure :mag: you are in the root of the repository:

```bash
# setup the remote repository
$ git remote add upstream https://github.com/fave77/pbchess.git

# always include the latest changes before working on a new issue
$ git checkout develop
$ git pull upstream develop --rebase
```

## :construction: Setup Local Environment

For running this project locally :truck:, you need to setup and define the environment variables for both the client as well as the server.

Create `.env` files in both `client` and `server` folder with the following variables:
- Client:
	- `NODE_ENV=development`
	- `CI=false`
	- `REACT_APP_DEV_API_URL=http://localhost:8000/api/`

- Server:
	- `NODE_ENV=development`
	- `DEV_DATABASE_URI=mongodb://127.0.0.1:27017/<YOUR-DB-NAME>`
	-  `DEV_STORAGE_URI=127.0.0.1:6379`
	- `DEV_STORAGE_PSWD=<YOUR-REDIS-INSTANCE-PSWD>`

**Default Ports:**
- React (or Client) - 3000
- Node.js (or Server) - 8000
- MongoDB (or Database) - 27017
- Redis (or In-memory DS) - 6379

**Note:** In order to run the client (properly), you need to have the server running at port 8000. Similarly, to run the server (propely), you need both MongoDB and Redis running at default ports 27017 and 6379 respectively.

## :cyclone: Run the Project

- Client:

```bash
# running locally
$ npm start

# testing locally
$ npm test

# building locally
$ npm run build
```

- Server

```bash
# running locally
$ npm run dev

# testing locally
$ npm test
```

## :page_with_curl: Workflow

- Always raise or claim an issue before making a pull request.

- While raising an issue, please follow the [ISSUE_TEMPLATE.md][4] guidelines.

- To claim an issue, just leave a comment and you'll be assigned on first come, first serve basis.

- Follow [Airbnb style guide][5] as much as possible.

- Your editor must support the preferences from the `.editorconfig` file.

- Make sure to squash your commits for cleaner commit history.

- While making a pull request, please follow the [PULL_REQUEST_TEMPLATE.md][6] guidelines.

- In your pull request, never forget to mention the issue you are solving, like so - Fixed #2 (issue number).

- In this project, we will try to adhere to [Gitflow][2] :recycle:. So, make sure to create a new feature branch from `develop` not from `master`, and also create a pull request to `develop` not to `master`, like so:

```bash
# include the latest changes (as mentioned before)
$ git checkout develop
$ git pull upstream develop --rebase

# create a feature branch
$ git checkout -b <NEW-BRANCH-NAME>

# make your changes to the codebase
# add your changes
$ git add .

# make your commit
$ git commit -m "<YOUR-COMMIT-MESSAGE>"

# pull any new changes from the “staging” branch (staging branch here is the develop branch) and resolve any conflicts.
# finally, push the branch
$ git push origin <YOUR-GITHUB-USERNAME>/<FEATURE-BRANCH>
```

#### Submit a pull request :rocket: from your forked repo (feature branch) to [this repo][3] (develop branch) and you are done :tada:

<div align="center">

  [![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)
  [![forthebadge](https://forthebadge.com/images/badges/fo-real.svg)](https://forthebadge.com)

</div>


[1]: https://github.com/fave77/pbchess/blob/develop/.github/CODE_OF_CONDUCT/CODE_OF_CONDUCT.md
[2]: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
[3]: https://github.com/fave77/pbchess
[4]: https://github.com/fave77/pbchess/blob/develop/.github/ISSUE_TEMPLATE/ISSUE_TEMPLATE.md
[5]: https://github.com/airbnb/javascript
[6]: https://github.com/fave77/pbchess/blob/develop/.github/PULL_REQUEST_TEMPLATE/PULL_REQUEST_TEMPLATE.md
