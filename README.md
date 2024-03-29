# Profileschool cli

~~Last tested on 27/08/2022, works fine~~

Seems like devs reworked auth+sec so now it's broken :(

## Table of Contents

- [About](#about)
- [Examples](#examples)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [DOWNLOAD](https://github.com/SanariSan/profile-school-cli/releases/latest)


## About <a name = "about"></a>

Cli tool to access and download cources' video lessons purchased on your [Profileschool ©](https://www.profileschool.ru) account.

All video content of the resource provided in an HLS (HTTP Live Streaming) format and could not be manually downloaded. To resolve such problem, project have been created.

Tool uses service's public api with the account credentials to only access content available for particular user. 

<b>Not a bypass, hack or anything related.

The software is provided "AS IS", without warranty of any kind.</b>


## Examples <a name = "examples"></a>

You can launch up to 4-5 concurrent download processes. Starting more causing fragments drops in every instance.

<b>Download video using navigation mode</b>

<img src="https://github.com/SanariSan/profile-school-cli/blob/master/etc/n1.gif" width="800" height="450" />


<b>Download video using direct mode</b>

<img src="https://github.com/SanariSan/profile-school-cli/blob/master/etc/n2.gif" width="800" height="450" />


## Getting Started <a name = "getting_started"></a>

Clone repository with 

```git clone https://github.com/SanariSan/profile-school-cli```

Or download archive with pre-compiled binary for your system (windows, linux) from latest release.


### Prerequisites

<b>In case of using binary:</b>

Fill in `.env` file with your login and password. Example:

```
LOG=my_email@mail.com
PASS=my_password
NODE_ENV=production
```

`NODE_ENV` field is for light debug purpose if set to `development`, leave it as is.

<b>In case of launching from bare code:</b>

All from above, plus install modules with

```
yarn install
```

<b>Create your own binaries:</b>

```
yarn exe-win
```
```
yarn exe-lin
```

## Usage <a name = "usage"></a>

<b>In case of using binary:</b>

- Launch binary you downloaded from releases page.
- Choose `renew cookies` step to sign in and get session cookies
- Enter `download` section 

<b>In case of launching from bare code:</b>

Run with

- `yarn start`
- Choose `renew cookies` step to sign in and get session cookies
- Enter `download` section

You don't need to renew cookies every time, but do not hesitate to do so once a week at least.
