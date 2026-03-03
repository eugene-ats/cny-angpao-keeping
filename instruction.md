# Main instruction
I want to build a simple illustrative web app that tracks angpao money received during Chinese New Year (CNY). Plan the details and execution plan in a separate file called plan.md. 

# context
## Web interface
use "gemini angpao and notebook on desk.png" as the background image of the web app. This image should cover the entire web space. The angpao and pen is clickable. The note will reflect the angpao list real time. 

## functionality
- user can add an angpao item by clicking on the angpao image area. A dialog will pop up to ask for the angpao details, namely "From" and "Amount". User then tap "Add" and the new item will be ammended to the next line in the notebook.
- show the angpao list overlay on top of the notebook, as if the details ("from" and "amount" are actually handwritten on the notebook)
- user can edit the list by clicking on the pen image area. User can change angpao details or delete individual angpao item. A confirmation dialog will pop up to confirm the deletion. The same input dialog will be used for editing.

# Requirements
- the web app is themed around CNY, so design the UI with CNY theme in mind.
- Later on, I want to make the individual elements (angpao and pen) interactive (animation on hover), so I will provide the extracted images. 
- Keep the image provided as it is, if you think there needs a change, ask me first.
- I will host the website on free platforms such as github page.
- user do not need to sign in. individual user data will be stored in local storage.

# Technical
for now, focus on desktop application. make sure it can run on most modern browsers. Identify a suitable framework to use based on the requirements and justify your choice in plan.md. Keep in mind to make the code clean and modular, so that it can be easily extended in the future.