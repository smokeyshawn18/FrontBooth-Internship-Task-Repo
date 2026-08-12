Collection of tasks completed during my internship at FrontBooth INC.

To clone the specific folders in this repo use:

# 1. Clone without checking out any files
git clone --no-checkout https://github.com/smokeyshawn18/FrontBooth-Internship-Task-Repo.git
cd FrontBooth-Internship-Task-Repo

# 2. Enable sparse checkout
git sparse-checkout init --cone

# 3. Specify the folder you want
git sparse-checkout set folder_you_wanna_use

# 4. Checkout the files
git checkout main

# This will put only the folder you wanna use
