# New Tab Productivity - Chrome Extension

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

New Tab is a simple chrome extension, built with the focus of centering all in one place, a place where you set your goals, your tasks and with a bit of existencialism. Due to allowing the user have a timer, this timer, will give you an approximation of how much time you have left in this earth.

And how much time you have left of being productive, just to feel a bit the pressure.

## Installation

Before we can initialize this project, make sure to download the dependencies after cloning this repository in your local machine.

```bash
  git clone https://github.com/EmilioBlacksmith/newTab-Productivity.git
```

then:

```bash
  cd /newTab-Productivity
```

## Deployment

**!!! - TO BE ABLE TO USE THIS PROJECT YOU WILL NEED TO GET AN ACCOUNT FOR [UNSPLASH API.](https://unsplash.com/developers)**

Once you do have a [unsplash account to get the unplash api access key](https://unsplash.com/developers), all you have to do, to build this project, is to:

```bash
  npm run build
```

When you run that, the terminal is going to ask you for an access key:

```bash
No existing Unsplash API access key found. Please provide one.

Please enter your Unsplash API access key:

```

You neet to input your Unsplash API Access Key. Once you copy and paste that api key in the terminal, you will build the project, in a folder named `/dist`.

Now everytime you call the npm run build, if you make any changes, it will get the .env, and you will not need to re-enter your api keys.

## Enabling the Custom Extension in Chrome

To use it, inside chrome, you need to enable developer mode, in the extensions section.

![developer mode toggle](https://github.com/user-attachments/assets/b3b52494-68db-420f-9b67-cde9ecfcf205)

and then click on Load unpacked:

![load unpacked](https://github.com/user-attachments/assets/a4e88770-700e-4ce7-98e2-4d97087cae42)

there we will just select and upload the `/dist` folder:

![Set dist folder](https://github.com/user-attachments/assets/893a87d7-45ac-44a1-8fd5-81c37c0678c1)

## Screenshots

![SS-1](https://github.com/user-attachments/assets/0a2f443b-f73d-48c3-9423-c4747ccb58aa)

![SS-2](https://github.com/user-attachments/assets/0997c1e7-e26e-4434-b926-9e2ba120957f)

![SS-3](https://github.com/user-attachments/assets/7c56d170-f78b-47fa-b004-5634c5e4513c)

## Author

- [@emilioblacksmith](https://github.com/EmilioBlacksmith)
