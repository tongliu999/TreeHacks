# Poof!

Find equivalent courses at exchange host universities by entering your course codes from home.

[![Demo](https://github.com/user-attachments/assets/e5450dab-6b46-4bae-84f9-cbe4ab671f88)](https://youtu.be/Fk0n4rqkcy8)

[Demo video: https://youtu.be/Fk0n4rqkcy8](https://youtu.be/Fk0n4rqkcy8)

Devpost: https://devpost.com/software/poof-3qshno

## Setup

Change the database URL in `server/mongo.py` to your own MongoDB URL.

Add `server/.env` and populate it with your perplexity API key and MongoDB password:

```
PERPLEXITY_KEY=pplx-
MONGO_PASSWORD=ABC
```

Install Python dependencies and start the server:

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Run the frontend in `frontend`:

```
yarn
yarn dev
```

(if you're using npm, you may have to force install)

Other README can be found in the frontend and server folders.

## Usage

1. Select your host university under "Your School"
2. Enter a course code that is a degree requirement you need to fulfill over exchange
3. Press "Search"
4. Check that the fetched course matches and press the bookmark
   a. Repeat with any required courses
5. Select your exchange university under "Schools Abroad"
6. Press "Find Courses"
7. Review the matched courses
   - The number indicates the confidence in the odds that the target course can substitute for the original course (0-10)
   - Press the bookmark to save it for later
8. Add any number
9. Go to "My Courses" to plan courses
10. Select a university under "Compare School"
11. Review the auto-populated course selection, adjusting them with the course dropdown as necessary
12. Continue adding schools to compare them with the "+" button

## Gallery

![image](https://github.com/user-attachments/assets/8b2361eb-d9ec-45d2-a8cb-b5c4f1ad14c3)
![image](https://github.com/user-attachments/assets/6d232453-6df1-4069-b621-50eb20923ed1)
![image](https://github.com/user-attachments/assets/94153902-8767-4686-9ea1-2a4e46969b37)
