## Setup

_At any step if you get stuck, explain to ChatGPT or Claude that you want to install `nodejs` using `asdf` and `brew` and give it your errors._

Our goal is to install `node.js`. We will use `asdf`, a tool for managing programming language installations, to do this.

`brew` is a common package manager for Mac that will allow us to install `asdf`.

Install `brew` by running this command: <b>Make sure that you run the follow-up actions recommended by the installer.</b>

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, run

```
brew install asdf
```

Add this to your `.bash_profile`, or `.zshrc` file:

```
. /opt/homebrew/opt/asdf/libexec/asdf.sh
```

Then, open a new terminal window so the changes will take effect.

Now, we can get `asdf` ready to install `node` with this command:

```
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

Finally, from the root of this repo, run

```
asdf install
```

Verify that node is installed by running

```
node -v
```

This command should run without errors. If by now node isn't working, consult ChatGPT. If you're really stuck, feel free to email charlie@pickode.io

## Running the dev server

Before we run the server, we need to install a bunch of dependencies and set up the server. The easiest way to do this is by running a script we made. Simply run

```
npm run setup-dev
```

And hopefully everything should go smoothly. \*\*If you start getting weird errors on the website after `git pull`-ing, re-running this script is a great way to start debugging.

Assuming this script ran to completion, you can now run

```
npm run dev
```

This will get you a dev server running at `http://localhost:3000`! **Be warned**
that this **not** the home page for the lessons site, it's just the root of the server.

To access the site, navigate to `http://localhost:3000/interactive-lessons`

## Adding a lesson

For this example, let's say you want to add a lesson about physics.

First, make a git branch for your lesson

`git checkout -b charlie-new-physics-lesson`

You can check out all of the existing lessons we've added in `/src/app`.

You can check out the `example-lesson` to see how to use the components we've made.

Let's say you want to add a lesson about phsyics. The pattern we follow is:

- Add a folder for your lesson in `/src/app`, for example, in this case we could say `physics-simulation`.
- Add a file called `page.tsx`. It's easiest to copy this from another example and modify from there
- Add a file for the react component that your actual lesson content will contain, you could call yours `PhysicsSimulation.tsx`.

Again, it's probably easiest from here to copy paste from an existing example.

You should be able to go to `http://localhost:3000/interactive-lessons/physics-simulation` and every time you save your code, the app will recompile and you can see the changes!

## Configuring VSCode

VSCode can automatically format your react code. Insall the `Prettier` plugin as well as `ESLint`. Press `cmd+shift+P` and open "Settings (JSON)".

Add the following block to the file and hit save

```
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

Do `cmd+shift+p` again and do "Developer (Reload window)"

Now, every time you save your file, it will be formatted.

## Git stuff

When you want to actually add your lesson to the real site, you need to commit it to our git repo.

Add all your new files to be commited

```
git add .
```

Check that everything will be added

```
git status
```

(all of your new files should be green)

```
git commit -m "added new physics lesson"
```

```
git push
```

Then, go on the github repo page and there will be a green button for making a new pull request. Click that and fill out the fields, you'll be good to go!
