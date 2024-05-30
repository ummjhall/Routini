# QuestLog
<!-- [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/ummjhall) -->
> Our team is developing a web application focused on fostering positive routines and healthy habits. Users can create personalized avatars, manage their tasks (habits, dailies, todos) through creation, editing, and deletion. Additionally, a reward system allows users to earn and manage rewards, further enhancing their motivational journey. The application also features an inventory system for earned items, with the ability to equip and manage them. Bonus features include drag-and-drop functionality and a leveling system with a shop, encouraging user engagement and progress visualization.
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
- QuestLog is aimed at helping users build and maintain positive habits by gamifying their routine activities. It offers a fun and interactive platform where users can track their progress, earn rewards, and level up their avatars.


## Technologies Used
- Javascript
- React.js
- Python
- Flask
- SQLAlchemy


## Features
- Task management (habits, dailies, todos)
- Reward system
- Inventory management
- Leveling system with a shop



## Screenshots
![Signup page screenshot](https://res.cloudinary.com/drv1e8rjp/image/upload/v1714537906/Screenshot_2024-04-30_at_9.30.27_PM_vsucng.png)

![Tasks page screenshot](https://res.cloudinary.com/drv1e8rjp/image/upload/v1714537842/Screenshot_2024-04-30_at_9.30.11_PM_vdav7s.png)


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
QuestLog can be used for various purposes such as:

- Creating and managing daily habits
- Setting and tracking tasks
- Earning rewards and managing inventory


## Project Status
Project is: _in progress_
> Currently, we are actively developing and refining QuestLog to ensure a seamless user experience and robust functionality.


## Room for Improvement
Areas for improvement:

- Enhance user interface for better user experience
- Integrate with third-party APIs for additional features
- Optimize performance for scalability

To do:

- Implement social sharing features
- Introduce a community forum for user interaction
- Drag-and-drop functionality
- Personalized avatars creation



## Acknowledgements
- We extend our heartfelt gratitude to the dedicated instructors and supportive community members who have contributed to our journey. Together, we strive to create a positive and impactful application aimed at fostering personal growth and habit formation.



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
