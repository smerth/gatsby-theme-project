The idea of a theme in GatsbyJS is to take all the configuraiton of a site out into one or more NPM modules that can then be installed, updated and developed independantly of the site and deployed across multiple sites for greater efficiency.

A theme could contain cofiguration for an entire site or some specific functionality such as porcessing markdown or processing images or fetching a processing some data.

GatsbyJS already has a plugin architecture and so a theme is simply a specific use case for a plugin.

In order to understand how this works its best to just start building so we will dive in.

First we'll create a folder for the plugin, which from now on we'll refer to as a theme. Second we'll create folder to hold out GatsbyJS site. That way we can import the theme into the GatsbyJS site while we develope locally. This mimics the set-up of developing the theme separately as an NPM module andimporting it into the site.

When the theme is ready it can be hoisted up onto npm and then imported into the site just like any other module.

Lets make a folder to hold the project work

@ desktop

```bash
mkdir theme-project
```

Inside that lets make a folder to hold the theme

@gatsby-theme-project

```bash
mkdir gatsby-theme-mdx
```

We're calling this theme `gatsby-theme-mdx` because, for demonstration purposes we are going to have it contain the configuration for implementing MDX processing of markdown files in a GatsbyJS site.

After you finish this build come back and check out these MDX related links.

-

Now lets scaffold out the theme.

@ gatsby-theme-mdx

```bash
npm init
```

Fillout the details as you normally would, something like...

```bash
package name: (gatsby-theme-mdx)
version: (1.0.0)
description: A theme to implement mdx processing of markdown files in a gatsbyjs site.
entry point: (index.js)
test command:
git repository:
keywords: gatsbyjs theme mdx markdown
license: (MIT)
```

in addition I am going to add `"private": "true",` into the `package.json` for now.

Now here's a bit you may not be familiar with...

We want this folder to install in our site just as if we were pulling it from NPM but, right now we don't want to put it up on NPM. Luckily npm has the notion of "workspaces" which allows us the link this local folder to the porject we want to import it into such that when we run install on the project it will add this folder, as an npm module and install this folders dependancies just as it would with any module it was pulling from npm directly.

So, we are going to define another key in the `package.json` file for "workspaces"

```json
"workspaces": [
    "gatsby-site",
    "packages/*"
]
```

If you have experience with GatsbyJS plugins you will know that many contain an index.js file which does not appear to have any function.

We will not be exporting anything from the theme however, however, npm requires an entry point to catalog the module and allow it to be registered in npm based applications. By default that entry point is `index.js` so we list that entry point when we `init` the project and provide that file

```bash
touch index.js
```

@ index.js

```javascript

```

---

# 1) Setup for theme development

---

We are going to create two folders. One will hold the gatsby site and one will hold the theme we are going to build. We know that eventually the theme will end up being a package on [NPM](https://www.npmjs.com/) which anyone can install in their GatsbyJS site. Whatever functionality the theme defines will then be available in their site.

However, we are in catch-22 situation. We want to install the theme as we would an NPM module but we haven't written it yet and haven't posted it to NPM so how do we pull it into the site while we are building it?

The answer is "yarn workspaces".

## Setup yarn workspace

First make a directory to hold everything.

@ desktop

```bash
mkdir theme-project
```

Cd into it.

```bash
cd theme-project
```

Intiate the workspace.

```bash
npm init
```

Run through whatever your standard responses to `init` are:

```bash
package name: (theme-project)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
license: (MIT)
```

Edit `package.json`. Delete everything but name and version, add a private key and a workspaces key.

```json
{
  "private": "true",
  "name": "theme-project",
  "version": "1.0.0",
  "workspaces": ["gatsby-site", "packages/*"]
}
```

We have defined two different workspaces so lets create both of them.

```bash
mkdir gatsby-site && mkdir packages
```

Workspaces are named locations that yarn is aware of.

## Setup our theme folder

We need somewhere to put our future node modules as we develop them. Since they will end up being node packages lets put them in a folder called packages.

```bash
cd packages
```

Make a folder for the theme we will develop.

```bash
mkdir gatsby-theme-mdx
```

We'll call it `gatsby-theme-mdx` because it will add basic `mdx` processing of markdown files to a GatsbyJS site.

> Important!
>
> The word "theme" makes me thing of "css" and layout and design assets.
>
> However, a gatsby theme adds functionality to a Gatsby site. It might be a set of design tokens and assets and components that define the look and feel of a site, but you should think of it as a packaging up of any functionality you might want to add to more than one site.

```bash
cd gatsby-theme-mdx
```

Our theme is a NPM module so we need to init

```bash
npm init
```

Respond as usual to the prompts

```json
{
  "name": "gatsby-theme-mdx",
  "version": "1.0.0",
  "description": "A GatsbyJS theme to implement MDX processing of markdown files.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stephen Merth <stephen.merth@gmail.com> (https://smerth.github.io/)",
  "license": "MIT"
}
```

Note that we are declaring the main entry point to be `index.js`. There are two reasons for this. First, NPM/Node recognizes a module by its entry point. The default is `index.js`.

GatsbyJS instead looks for `gatsby-config.js` in a plugin module or a theme module and so doesn't require an `index.js` .

So, to satisfy NPM/Node many GatsbyJS plugins contain an `index.js` file with the comment `// no-ops` to indicate that the file serves no useful purpose to GatsbyJS.

The second reason to have `index.js` is to allow us to export something from the theme at some point in the future. We will cover that later.

```bash
touch index.js
```

@ index.js

```javascript
// no-op
```

## Setup our site folder

Now lets set up the GatsbyJS site folder

```bash
cd ../../gatsby-site/
```

This folder will contain our GatsbyJS site so we need to init to begin.

```bash
npm init
```

> Important:
>
> Name of the site should match the name in the workspace we set up earlier: "gatsby-site".

Since this is a GatsbyJS site set entry point as: `"main": "gatsby-config.js",`

```json
{
  "private": "true",
  "name": "gatsby-site",
  "version": "1.0.0",
  "description": "A GatsbyJS site using a gatsby theme.",
  "main": "gatsby-config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stephen Merth <stephen.merth@gmail.com> (https://smerth.github.io/)",
  "license": "MIT"
}
```

So, now we have this tree:

```bash
├── package.json
├── gatsby-site
│   └── package.json
└── packages
    └── gatsby-theme-mdx
        ├── index.js
        └── package.json
```

Lets install GatsbyJS

```bash
cd gatsby-site/
```

Here is where we begin to use workspaces. We have three different places containing a `package.json` file. Yarn will be aware of each of these:

- Our `theme-project` folder. This is where we define our workspaces.
- Our `gatsby-site` folder.
- Our `gatsby-theme-mdx` folder where we will build a theme.

It would be painful to have to `cd` into these folders or specify their path everytime we wanted to execute a `yarn` command relative to each of those folders. But since we defined the workspaces we can execute `yarn` commands in any workspace using a simple referencing the workspace. Like this:

```bash
yarn workspace gatsby-site add gatsby
```

Now lets add the theme to the Gatsby site. We can add it as a dependancy:

@ `gatsby-site/package.json`

```json
{
  "name": "gatsby-site",
...
  "dependencies": {
    "gatsby": "^2.1.31",
    "gatsby-theme-mdx": "*"
  }
}
```

We add this as a dependancy to the `package.json ` file because the module is stored locally in our "packages" folder. If we try `yarn add gatsby-theme-mdx` yarn will try first to find the module on npm. If your package in develpment has the same name as a package on npm the wrong one will be loaded into your project…

Obviously, our theme is not on npm but it is in the `packages` folder and it does have a valid entry point so yarn will find it when we add it as a dependancy.

We will want to work with our Gatsby site so lets add the standard Gatsby commands.

@ `gatsby-site/package.json`

```json
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Add some dependancies

Lets add GatsbyJS as a dev dependancy to the theme.

@ theme-project

```bash
yarn workspace gatsby-theme-mdx add gatsby -D
```

Now lets edit the theme package.json to add gatsby as a peer dependancy also, just copy the `devDependancy` block and rename it peer

@ gatsby-theme-mdx/package.json

```json
{
  "name": "gatsby-theme-mdx",
  "version": "1.0.0",
  "description": "A GatsbyJS theme to implement MDX processing of markdown files.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stephen Merth <stephen.merth@gmail.com> (https://smerth.github.io/)",
  "license": "MIT",
  "devDependencies": {
    "gatsby": "^2.1.31"
  },
  "peerDependencies": {
    "gatsby": "^2.1.31"
  }
}
```

Also our theme will need `react` and `react-dom`

```bash
yarn workspace gatsby-theme-mdx add react react-dom -D
```

And they should also be declared as `dev` and `peer` dependancies

@ gatsby-theme-mdx/package.json

```json
{
  "name": "gatsby-theme-mdx",
  "version": "1.0.0",
  "description": "A GatsbyJS theme to implement MDX processing of markdown files.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stephen Merth <stephen.merth@gmail.com> (https://smerth.github.io/)",
  "license": "MIT",
  "devDependencies": {
    "gatsby": "^2.1.31",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "peerDependencies": {
    "gatsby": "^2.1.31",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  }
}
```

Lets add the dependancies we need to the gatsby site as well.

```bash
yarn workspace gatsby-site add react react-dom
```

## Develop the theme

Our first goal is have a theme that will add MDX processing of markdown files to a GatsbyJS site. So in the theme lets add an `.mdx` file that needs processing.

In the theme create `src/pages/index.mdx`

@ src/pages/index.mdx

```markdown
# Hello World
```

Now lets add MDX modules to the theme

```bash
yarn workspace gatsby-theme-mdx add gatsby-mdx
```

And we also need to add these dependancies

```bash
yarn workspace gatsby-theme-mdx add @mdx-js/mdx @mdx-js/tag
```

This is because `gatsby-mdx` is designed to allow for swapping out various processing modules for greater flexibility. We are going to process `.mdx` files, for which `gatsby-mdx` will use `@mdx-js/mdx` and we are going to replace HTML tags in markdown (like `h1`) with react components we get to define, and for that `gatsby-mdx` will use `@mdx-js/tag`.

Next we need to make Gatsby aware of the module we just added.

Add `gatsby-config.js` to the theme

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {},
    },
  ],
};
```

Now, by default a Gatsby site looks in `src/pages` to find and process `.md` or `.mdx` files.

We need to tell Gatsby to look in another location for files to process (specfically, it should look in our theme.) That is what `gatsby-plugin-page-creator` is designed to do.

Lets install that in our theme.

```bash
yarn workspace gatsby-theme-mdx add gatsby-plugin-page-creator
```

After we install any Gatsby plugin we need to make Gatsby aware of it,... so lets do that

@ `gatsby-theme-mdx/gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {},
    },
    // You can have multiple instances of this plugin
    // to create pages from React components in different directories.
    //
    // The following sets up the pattern of having multiple
    // "pages" directories in your project
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
```

This path://

```javascript
path: `${__dirname}/src/pages`;
```

is relative to the theme folder so MDX in Gatbsy will now be looking for files in the theme pages folder.

Lastly, if you recall we added the theme to the Gatsby site as a dependancy. The theme is a plugin, and like any plugin we need to tell Gatsby of its existance so create a `gatsby-config.js` file in the gatsby-site folder:

@ `gatsby-site`

```bash
touch gatsby-config.js
```

and add the theme...

```javascript
module.exports = {
  plugins: ["gatsby-theme-mdx"],
};
```

This is the special syntax for declaring theme plugins.

Its time to run the gatsby-site and see if everything is working!

First lets run yarn in the root of the project to make sure everything is linked

@ theme-project

```bash
yarn
```

We check the workspace sestup with

```bash
yarn workspaces info
```

@ theme-project

```bash
yarn workspace gatsby-site develop
```

Success!

You should now be able to go to `localhost:8000` and see the page generated from the `.mdx` file in the theme folder.

## What have we done?

- we have a working environment to develop a Gatsby theme
- we have a model for how a theme can add functionality (such as processing MDX files,) to a gatsby site
- we have a model for a how a theme can add content (a folder of MDX files in the theme,) thanks to `gatsby-plugin-page-creator`

Thats really fantastic, because you can now compartmentalize the development of complex apps. You can write a different module for commerce, podcasting, documentation, etc and pull these into a blank gatsby site, instantally adding that functionality.

# 2) Leveraging MDX

Lets continue on and see what we get by adding MDX to our gatsby site using our theme.

### Add a layout

Lets add a layout for the site to the theme. Your site may have a layout. It probably should, and that layout will govern all the output throughout some section or perhaps all pages on the site. However MDX allows you to add a layout for the output of the mdx files it processes. If you site only contains mdx files mapped to pages on the site, this layout may be all you need to build the site out.

Add a layout component

@ gatsby-theme-mdx/src/components/layout.js

```jsx
import React from "react";

export default ({ children }) => (
  <section
    style={{
      display: "block",
      maxWidth: "650px",
      margin: "2rem auto",
    }}
  >
    {children}
  </section>
);
```

Tell MDX about the layout

@ gatsby-config.js

```javascript
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js")
        }
      }
    },
```

Reboot the site so it can find the layout

```bash
yarn workspace gatsby-site develop
```

There you go all MDX processed pages are now wrapped in the layout component

### Import MDX files into MDX files

6:00

copyright

https://www.youtube.com/watch?v=d2sQiI5NFAM&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u

### Use a react component your mdx file

Ok, so you are happily writing markdown and you want to add some object right there in the middle of the text, maybe slideshow, maybe a graph of some data. Wouldn't it be great if you could build that thing as a react component and drop it into the text.

Lets do that, lets make a box to hold some special content.

Add a box component to the theme

@ `gatsby-theme-mdx/src/components/alert-box.js`

```jsx
import React from "react";

export default ({ children }) => (
  <div
    style={{
      display: "block",
      maxWidth: "550px",
      margin: "2rem",
      background: "red",
    }}
  >
    {children}
  </div>
);
```

Now you can use the box component in `index.mdx`. To use it, all you need to do is import it first.

```markdown
import Box from "../components/alert-box.js";

# Hello World!

This is some content that doesn't need to be in a box.

<Box>This content does need to be in a box.</Box>

This is some content that doesn't need to be in a box.
```

### Export a component from the theme

That's great but having made that component in the theme, wouldn't it be good if we could use it in a markdown document in the gatsby-site (or, anywhere else in the site where we need the same box). How to do that?

First you can export the component from the theme. For that NPM needs our package to have an index.js file… so lets edit that.

@ gatsby-theme-mdx/index.js

```javascript
export { default as Box } from "./src/components/alert-box";
```

Now lets create a new page in the gatsby-site

@ `gatsby-site`

create `src/pages/about.mdx`. Now we can import the component from the theme and use it directly in an mdx file in the site!!!

```markdown
import { Box } from "gatsby-theme-mdx";

# This is my about page

This is some content that doesn't need to be in a box.

<Box>Super duper.</Box>

This is some content that doesn't need to be in a box.
```

Note that here we are importing the component from our theme.

### Access .mdx metadata in the Gatsby site

Add some metadata to `about.mdx`

```markdown
---
title: The Amazing About Page
---

import { Box } from "gatsby-theme-mdx";

# This is my about page

This is some content that doesn't need to be in a box.

<Box>Super duper.</Box>

This is some content that doesn't need to be in a box.
```

You can query for that data in the Gatsby site

```json
{
  sitePage(path: {regex: "/about/"}) {
    context {
      frontmatter {
        title
      }
    }
  }
}
```

returns...

```json
{
  "data": {
    "sitePage": {
      "context": {
        "frontmatter": {
          "title": "The Amazing About Page"
        }
      }
    }
  }
}
```

or

```json
{
  sitePage( path: {eq: "/"}) {
    context {
      frontmatter {
        title
      }
    }
  }
}
```

returns

```json
{
  "data": {
    "sitePage": {
      "context": {
        "frontmatter": {
          "title": "The Hello World Page"
        }
      }
    }
  }
}
```

### Using design tokens in components

A simple approach to using design tokens in components could be to add an object to the theme which contains various tokens

@ `gatsby-theme-mdx/tokens/colors.js`

```javascript
export default {
  primary: "tomato",
  secondary: "aqua",
};
```

now we can use this in the Box component directly

```jsx
import React from "react";
import colors from "../tokens/colors";

export default ({ children }) => (
  <div
    style={{
      padding: "2rem",
      background: colors.primary,
    }}
  >
    {children}
  </div>
);
```

# 3) Shadowing Everything

It is easy to imagine a situation where the publisher of a theme would want a the user of the theme in a Gatsby site to be able to over-ride what the theme provides.

There are many cases of mulitple sites employing the same functionality and differing from each other in only small details of implementation.

How can a user take advantage of a Gatsby theme and only over-ride specific bits of functionality.

## What is shadowing?

Shadowing is the concept of over-riding a file or component in the theme with one in the site. This is accomplished by placing an identically named item in the site at the same path an the file already in the theme.

An example will make this clearer:

## Shadow a file

@ gatsby-site create `src/pages/index.mdx` and edit it to contain `# Holy Jellybeans!`

Its as simple as that, the site now displays the content of the `index.js` file in the `site/src/pages` folder which overrides the `theme/src/pages` file.

Now delete the file from `site/src/pages`...

> Note that: If you have over-ridden something and remove the over-ride file of component you need to delete the cache and reboot the site to see the change take place.
>
> ```bash
> rm -rf gatsby-site/.cache/
> ```

Another expample would be to override the colors tokens

@ `gatsby-site/src` create `gatsby-theme-mdx` folder

anything placed in this new folder will override the file found in the `theme/src` folder.

So lets override `gatsby-theme-mdx/src/tokens/color.js` by placing a `colors.js` file at `gatsby-site/src/gatsby-theme-mdx/tokens/`

In this new `colors.js` file we can change the colors.

```javascript
export default {
  primary: "#fb6d8c", // Green
  secondary: "#1069c9", // Denim
  alert: "#ed7d30",
};
```

reboot..

Now all components that were pulling in color tokens from the theme colors.js file will be instead pulling in their colors from the site `colors.js` file

This strategy applies to **everything** in `src` in the theme...

## Component Shadowing

OK we can override a file in the theme by placing another file in the site at the same path. We can also do this with components. Say we want to use all the components in the theme, as is, but we want to change one, how would we do that?

By shadowing the path to a component in the theme with the path to a component with the same name in the site we can override the theme component

First lets export colors from the theme so we can use those color tokens not just in the theme but also in components in the site

@ `gatsby-theme-mdx/index.js`

```javascript
// Components
export { default as Box } from "./src/components/alert-box";

// Design tokens
export { default as colors } from "./src/tokens/colors";
```

Now lets create a new alert-box.js component in the site to "shadow" the component in the theme.

@ `gatsby-site/src/gatsby-theme-mdx/components/` create `alert-box.js`

```jsx
import React from "react";
import { colors } from "gatsby-theme-mdx";

export default ({ children }) => (
  <div
    style={{
      padding: "2rem",
      background: colors.secondary,
    }}
  >
    <h2>Hey! This is important.</h2>
    {children}
  </div>
);
```

Note we're pulling the colors in from the theme where we exported them.

> Important!
>
> SM - Note this new component we have defined in the site completely overrides the file it shadows (Gatsby doesn't doesn't merge the files… it overrides,... although that may be a future goal of the theming strategy.)

# 4) Replace HTML tags with react components in mdx files

Next lets work with MDXProvider to over-ride elements in the markdown of `.mdx` files.

Say we want to override all the h1 elements in all of our .mdx files and replace that element with a react component, we could make some changes to the layout component since it wraps all .mdx files.

Aha, that layout component comes in useful after all!

@ layout

```jsx
import { MDXProvider } from "@mdx-js/tag";
```

`@mdx-js/tag` takes over the rendering of tags from mdx core so this is how we can swap a component for an HTML element in our markdown

First we can define the components we want to use:

@ `layout`

```jsx
const components = {
  h1: (props) => (
    <h1 style={{ fontFamily: "System", fontSize: "4rem" }} {...props} />
  ),
};
```

Then we wrap our layout with MDXProvider and pass in the map which tells `'@mdx-js/tag'` which component to swap for which element

```jsx
export default ({ children }) => (
  <MDXProvider components={components}>
    <section
      style={{
        display: "block",
        maxWidth: "650px",
        margin: "2rem auto",
      }}
    >
      {children}
    </section>
  </MDXProvider>
);
```

So all together `layout.js` looks like this

@ layout.js

```jsx
import React from "react";
import { MDXProvider } from "@mdx-js/tag";

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const components = {
  h1: (props) => (
    <h1 style={{ fontFamily: systemFont, fontSize: "4rem" }}>
      {props.children}
    </h1>
  ),
  p: (props) => (
    <p style={{ fontFamily: systemFont, fontSize: "22px" }} {...props} />
  ),
};

export default ({ children }) => (
  <MDXProvider components={components}>
    <section
      style={{
        display: "block",
        maxWidth: "650px",
        margin: "2rem auto",
      }}
    >
      {children}
    </section>
  </MDXProvider>
);
```

When you reboot the site you'll see the H1 tags are now rendered as our H1 component.

> Note!
>
> The mapping doesn't effect the contents of the Box component we use in our markdown. If the box contains an `<h1>` tag it doesn't get swapped out for our newly defined H1 component. Whatever components you use in your markdown are injected "as is".

## Move components to their own files

Of course you can put the components in their own file. If you do this you can then shadow them in the site code and modify the base appearance defined in the theme.

Make a stand-alone H1 component

@ `gatsby-theme-mdx/src/components/H1.js`

```jsx
import React from "react";
import colors from "../tokens/colors";

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default ({ children }) => (
  <h1
    style={{
      fontFamily: systemFont,
      fontSize: "4rem",
      color: colors.primary,
    }}
  >
    {children}
  </h1>
);
```

Now we can import the component into `layout.js` and map to the imported component for MDX to use.

@ layout.js

```jsx
import React from "react";
import { MDXProvider } from "@mdx-js/tag";
import H1 from "./H1";

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const components = {
  h1: H1,
  p: (props) => (
    <p style={{ fontFamily: systemFont, fontSize: "22px" }} {...props} />
  ),
};

export default ({ children }) => (
  <MDXProvider components={components}>
    <section
      style={{
        display: "block",
        maxWidth: "650px",
        margin: "2rem auto",
      }}
    >
      {children}
    </section>
  </MDXProvider>
);
```

## Over-ride the tag component in the theme

Now that the H1 component is a stand-alone component at `gatsby-theme-mdx/src/components/H1.js` you, or someone using your theme, can over-ride it in the site by placing a component called `H1.js` at `gatsby-site/src/gatsby-theme-mdx/components/H1.js`

# 5) Child themes

Lets say we want to build several sites. We want to add a theme to each of those sites so that they each get the same functionality. However for a few of the sites we wish we could modify just some portion of the theme.

It would be useful if we could make a child theme that would either override something from the first theme or maybe augment it.

## Create child theme

Lets make a child theme. In the `packages` folder create new child theme folder

```bash
mkdir gatsby-theme-mdx-child
```

Go into the child theme folder

```bash
cd gatsby-theme-mdx-child
```

Intialize it for npm

```bash
npm init
```

Add the dev and peer dependancies we are using in our site.

@ package.json

```json
{
  "name": "gatsby-theme-mdx-child",
  "version": "1.0.0",
  "description": "A child theme of gatsby-theme-mdx",
  "main": "index.js",
  "devDependencies": {
    "gatsby": "^2.1.31",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "peerDependencies": {
    "gatsby": "^2.1.31",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stephen Merth <stephen.merth@gmail.com> (https://smerth.github.io/)",
  "license": "MIT"
}
```

Add the main theme as a dependancy so it gets installed if the child is installed

```json
"dependancies": {
    "gatsby-theme-mdx": "*"
}
```

Add `index.js` or the package won't resolved by yarn.

Add `gatsby-config.js`

```javascript
module.exports = {
  plugins: ["gatsby-theme-mdx"],
};
```

Here we have installed the first theme in the child theme

You can add any number of other themes or plugins, etc...

Just to see if everything is working lets set the gatsby-site to pull in the child theme

@ `gatsby-site/gatsby-config.js`

```javascript
module.exports = {
  plugins: ["gatsby-theme-mdx-child"],
};
```

Run yarn from the root to make sure everything in the workspaces is linked properly

@ `theme-project`

```bash
yarn
```

Check the workspace dependancies

```bash
yarn workspaces info
```

Returns

```bash
{
  "gatsby-site": {
    "location": "gatsby-site",
    "workspaceDependencies": [
      "gatsby-theme-mdx-child"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "gatsby-theme-mdx-child": {
    "location": "packages/gatsby-theme-mdx-child",
    "workspaceDependencies": [
      "gatsby-theme-mdx"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "gatsby-theme-mdx": {
    "location": "packages/gatsby-theme-mdx",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }
}
```

`gatsby-theme-mdx` not depending on anything

`gatsby-theme-mdx-child` depends on `gatsby-theme-mdx`

`gatsby-site` is pulling in `gatsby-theme-mdx-child`

Everything looks good...

So from the root:

```bash
yarn workspace gatsby-site develop
```

And the site is running fine.

## Add mdx processing to the child theme

First let's get the child theme processing `.mdx` files.

Add page creator to the child theme

```bash
yarn workspace gatsby-theme-mdx-child add gatsby-plugin-page-creator
```

In the child theme, add the page creator and configure to source to the local pages folder

@ gatsby-config.js

```javascript
module.exports = {
  plugins: [
    ["gatsby-theme-mdx"],
    // You can have multiple instances of this plugin
    // to create pages from React components in different directories.
    //
    // The following sets up the pattern of having multiple
    // "pages" directories in your project
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
```

Test by adding a page

@ `gatsby-theme-mdx-child/src/pages/test.mdx`

```markdown
---
title: A truely amazing test page
---

import { Box } from "gatsby-theme-mdx";

# This test page is truely amazing

This is some content that doesn't need to be in a box.

<Box>Yeah the test page is live!!!</Box>

This is some content that doesn't need to be in a box.
```

So we have the child theme processing MDX files from the `src/pages/` directory within itself.

## Add a basic documentation setup to the child theme

Now, lets say we want this child theme to add functionality to the gatsby-site so that the user of gatsby-site can just add the theme and add a docs folder to the site and then start writing `.mdx` files in the `docs` folder and have those mdx files in `docs` processed to pages.

Lets set up the child theme to process a folder of `.mdx` files in the site.

@ gatsby-site add `docs/home.mdx`

```markdown
# Documentation Homepage

Some meaningful writing!
```

To generate pages programatically we need to add `gatsby-source-filesystem` to the child theme so that the designated `.mdx` files will be added to the GatsbyJS data graph

add `gatsby-source-filesystem` to child theme

```bash
yarn workspace gatsby-theme-mdx-child add gatsby-source-filesystem
```

Next configure it to point to the docs folder

@ `gatsby-theme-mdx-child/gatsby-config.js`

```javascript
    // source files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "docs",
        // this path is relative to the gatsby site running the child theme
        path: `docs`
      }
    }
```

Even though we are placing this config in the child theme the path here is relative to the gatsby site in which the theme is installed. So we are saying site for these files.

Now the `.mdx` files @ `gatsby-site/docs` in the site should be added as nodes to Gatsby's GraphQL.

We can find them with this query. GraphQL query:

```json
{
  allFile(filter: {sourceInstanceName: {eq: "docs"}}) {
    edges {
      node {
        name
        relativePath
        childMdx {
          code {
            body
          }
        }
      }
    }
  }
}
```

returns

```json
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "name": "home",
            "relativePath": "home.mdx",
            "childMdx": {
              "code": {
                "body": "function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ...
              }
            }
          }
        }
      ]
    }
  }
}
```

The key to understanding this GraphQL query is `sourceInstanceName`.

`sourceInstanceName` is in fact the name we asigned to the path where `gatsby-source-filesystem` is looking for files, namely: "docs"

So we can filter on "docs" to get all the files in that folder: `(filter: {sourceInstanceName: {eq: "docs"}})`

So moving on...

Before we add a template for the mdx files in docs, let's export our `Layout` component from `gatbsy-theme-mdx` so we can use it in our template.

@ `gatsby-theme-mdx/index.js`

```javascript
// Components
export { default as Box } from "./src/components/alert-box";
export { default as Layout } from "./src/components/layout";
// Design Tokens
export { default as colors } from "./src/tokens/colors";
```

Next we create a template to process the content of our mdx files.

@ `gatsby-theme-mdx-child/src/templates/doc.js`

```jsx
import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { Layout } from "gatsby-theme-mdx";

export default ({ pageContext }) => (
  <Layout>
    <MDXRenderer>{pageContext.body}</MDXRenderer>
  </Layout>
);
```

The thing to note here is the use of `MDXRenderer` .

Now all that remains is to create pages.

## Programmatically create pages

Add `gatsby-node.js` file at the root of the child theme

@ `gatsby-theme-mdx-child/gatsby-config.js`

```jsx
exports.createPages = async ({ graphql, actions }) => {
  const results = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "docs" } }) {
        edges {
          node {
            name
            relativePath
            childMdx {
              code {
                body
              }
            }
          }
        }
      }
    }
  `);

  // console.log(Object.keys(results));

  const pages = results.data.allFile.edges.map(({ node }) => node);

  pages.forEach((page) => {
    actions.createPage({
      path: `documentation/${page.name}`,
      component: require.resolve("./src/templates/doc.js"),
      context: {
        body: page.childMdx.code.body,
      },
    });
  });
};
```

# Conclusion

And there we have it!

OK, so that was alot of stuff... Exactly what stuff have we accomplished?

- We have a `gatsby-theme-mdx`.
  - It adds MDX processing to a gatsby site
  - It adds and exports some design tokens that can be consumed in the site
  - It adds components to be used in a markdown document
  - it adds components to override HTML tags in a markdown document
- We have a `gatsby-theme-mdx-child` theme which adds MDX processing based of a `docs` file in the site
- We have a gatsby site that contains 3 files: `gatsby-config.js`, `gatsby-node.js` and a docs folder

The main point here was not to build a useful and functional website or app. The point was to show the way in which Gatsby themes can be used to build sites with remarkably flexible and useful architecture.

And in addition to show how MDX is a very powerful tool for turning markdown into an accessible source of textual data.

That's the tip of the iceberg, watch this space!
