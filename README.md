<div id="top"></div>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://github.com/chaofan-w/MatchBox">
    <img src="./frontend/public/screenshots/MatchBox-Logo-white.png" alt="Project MatchBox Logo" width="266" height="57">
  </a>

<br />
<h2 align="center">Project MatchBox</h2>
<br />

  <p align="center">
    An emergency management application which can be quickly deployed during or after emergency incidents, to facilitate the community and individual stakeholders working together to prevent, protect against, mitigate, respond to, and recover from incidents.
    <br />
    <a href="https://github.com/chaofan-w/MatchBox"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/chaofan-w/MatchBox">View Demo</a>
    ·
    <a href="https://github.com/chaofan-w/MatchBox/issues">Report Bug</a>
    ·
    <a href="https://github.com/chaofan-w/MatchBox/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <li><a href="#the-main-features">The Main Features</a></li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Homepage screen shot][hompepage-screenshot]
The initial idea of this project was inspired by one of my backcountry camping expiernce.
I with a group of 4 hikers got lost in the deep woods, and ran into a heavy thunderstorm.
Luckily, each member contributed a surving skill (e.g., shelter building, first-aid treatment) and in combination, we could make through the long night in the extreme condition.
Nowadays, people are with incresingly chances confront some sort of emergency situations caused by natrual disasters, climate change, local conflict or even regional wars.
It is crucial for people to support each other and cooperate so as to succeed in the disaster recovery.
The goal of the project MatchBox, is to facilate such community building, before, during or after emergency events, so people can survive and recover by help each other in a more organized, efficient and well planned way.
I believe that together, people shine brightest in the darkest moment.

<!-- Main Features -->

## The Main Features

During the scenario of extreme conditions like: flood, wildfire, war and large-scale evacuations,
this application can quickly deployed by the local emergency center or recovery entities. So people can fully connected and leverage on on-site resources to manage the rescue and rebuilding tasks.
![deployement ecosystem][ecosystem-screenshot]

#1: re-organize surviors into diffrent shelter camp and talent group, with unique camperId

#2: the emergency center, through the application, collect and distribute needed tasks and recruit voluteers onsite

#3: campers can visit help centers listings to ask for help or offer help to others

![Userpage screen shot][user-page-screenshot]
#4: timely push message system can push task assignment and status to individual camper

#5: in some extreme scenario e.g., now power or telecome connections, leverage voice message + satellite connection device to connect people in the wild to the helping center, for later rescue so no one will be left alone.

![Vociemessage page screen shot][voicemsg-screenshot]

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Styled-Components](https://styled-components.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/chaofan-w/MatchBox.git
   ```
2. Install packages for beckend server
   ```sh
   yarn install
   ```
3. start beckend dev environment
   ```sh
   yarn dev:backend
   ```
4. Install packages for frontend server
   ```sh
   yarn install
   ```
5. start frontend dev environment

   ```sh
   yarn dev:frontend
   ```

6. dual terminal dev environment
   ![dual terminal](./frontend/public/screenshots/dual-terminal.png)

7. AssemblyAI Authentication
   ```js
    const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: <YOUR-API-TOKEN>,
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
   });
   ```
8. MongoDB Connection URI in .env file
   ```sh
    MONGO_URI=mongodb+srv://user:pass@sample.host.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```
   ![MongoDB connection string][mongodb-screenshot]

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Chaofan Wu - chaofan.w@gmail.com

Project Link: [https://github.com/chaofan-w/MatchBox](https://github.com/chaofan-w/MatchBox)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<!-- ## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/chaofan-w/MatchBox.svg?style=for-the-badge
[contributors-url]: https://github.com/chaofan-w/MatchBox/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chaofan-w/MatchBox.svg?style=for-the-badge
[forks-url]: https://github.com/chaofan-w/MatchBox/network/members
[stars-shield]: https://img.shields.io/github/stars/chaofan-w/MatchBox.svg?style=for-the-badge
[stars-url]: https://github.com/chaofan-w/MatchBox/stargazers
[issues-shield]: https://img.shields.io/github/issues/chaofan-w/MatchBox.svg?style=for-the-badge
[issues-url]: https://github.com/chaofan-w/MatchBox/issues
[license-shield]: https://img.shields.io/github/license/chaofan-w/MatchBox.svg?style=for-the-badge
[license-url]: https://github.com/chaofan-w/MatchBox/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/chaofanwu
[hompepage-screenshot]: ./frontend/public/screenshots/home-page.png
[user-page-screenshot]: ./frontend/public/screenshots/camper_page_inbox.png
[voicemsg-screenshot]: ./frontend/public/screenshots/vo-message-listing.png
[ecosystem-screenshot]: ./frontend/public/screenshots/deployment-ecosystem.png
[mongodb-screenshot]: ./frontend/public/screenshots/connection-string-parts.png
