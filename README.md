# Routini
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/ummjhall)
> Our team is developing a web application inspired by Habitica.com, focused on fostering positive routines and healthy habits. Users can create personalized avatars, manage their tasks (habits, dailies, todos) through creation, editing, and deletion. Additionally, a reward system allows users to earn and manage rewards, further enhancing their motivational journey. The application also features an inventory system for earned items, with the ability to equip and manage them. Bonus features include drag-and-drop functionality and a leveling system with a shop, encouraging user engagement and progress visualization.
> Live demo [_here_](https://routini.onrender.com/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Routini is aimed at helping users build and maintain positive habits by gamifying their routine activities. It offers a fun and interactive platform where users can track their progress, earn rewards, and level up their avatars.


## Technologies Used
- Python
- Flask
- Javascript
- React.js
- SQLAlchemy


## Features
- Personalized avatars creation
- Task management (habits, dailies, todos)
- Reward system
- Inventory management
- Drag-and-drop functionality
- Leveling system with a shop



## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
1. Clone this repository from [GitHub](https://github.com/ummjhall/Routini)

2. Navigate to the project directory.

3. Install the dependencies:

   ```bash
   pipenv install -r requirements.txt
   ```

4. Get into your pipenv:
   ```bash
   pipenv shell
   ```

5. Migrate your database:
   ```bash
   flask db upgrade
   ```

6. Seed your database:
   ```bash
   flask seed all
   ```

7. Run your Flask app:
   ```bash
   flask run
   ```


## Usage
Routini can be used for various purposes such as:

- Creating and managing daily habits
- Setting and tracking tasks
- Earning rewards and managing inventory

Example code snippet:

```python
# Your code here
```


## Project Status
Project is: _in progress_


## Room for Improvement
Areas for improvement:

- Enhance user interface for better user experience
- Integrate with third-party APIs for additional features
- Optimize performance for scalability

To do:

- Implement social sharing features
- Introduce a community forum for user interaction



## Acknowledgements
- This project was inspired by [Habitica](https://habitica.com/) and was based on various online tutorials and resources. Many thanks to the contributors and supporters that made this possible.



## Contact
Created by:
#### [Justin Hall](https://github.com/ummjhall)
#### [Nikola Milinovich](https://github.com/nmilinovich)
#### [Ramon Barros](https://github.com/ramonpbarros)

Feel free to contact us!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
