from openai import OpenAI
import os
from dotenv import load_dotenv
import json
from mongo import save_course_info, get_course_info
class CourseSearch:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('PERPLEXITY_KEY')

        self.client = OpenAI(api_key=self.api_key, base_url="https://api.perplexity.ai")

    def get_eligible_universities(self, university, countries = ["all"]):
        universities = ['University of Waterloo', 'University of Toronto', 'McGill University', 'University of British Columbia', 'University of Alberta', 'University of Calgary', 'University of Manitoba', 'University of Saskatchewan', 'University of Victoria', 'University of Winnipeg']

        for country in countries:
            messages = [
                {
                    "role": "system",
                    "content": (
                        "You are an artificial intelligence assistant and you should only answer in JSON format."
                        "The JSON should be a list of objects, each object should have the following properties:"
                        "- university: the university"
                        "It should not include anything else but the university"
                    ),  
                },
                {
                    "role": "user",
                    "content": (
                        f"Only return 2 or 3 universities that offer exchange programs to students from {university} in {country} that you are absolutely certain has a exchange program with {university}. Use this for reference: https://uwaterloo-horizons.symplicity.com/?s=programs."
                    ),
                },  
            ]

            response = self.client.chat.completions.create(
                model="sonar-pro",
                messages=messages,
            )
            universities.extend(eval(response.choices[0].message.content))
        print(universities)
        return universities

    def courseDesc(self, course_code, university):
        course_info = get_course_info(course_code, university)
        if course_info:
            return course_info
        
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an artificial intelligence assistant and you should only answer in JSON format."
                    "The JSON should be a single object, with the following properties:"
                    "- course_code: the code of the course"
                    "- course_name: the name of the course"
                    "- university: the university the course is from"
                    "- course_desc: a quick description of the course's content, taken from the syllabus"
                ),  
            },
            {
                "role": "user",
                "content": (
                    f"Return a description of all the important topics in {course_code} from the {university} that would be relevant for finding equivalences at other universities."
                ),
            },
        ]

        response = self.client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )

        content = response.choices[0].message.content
        print(content)

        try:
            course_info = json.loads(content)
        
        except json.JSONDecodeError:
            raise ValueError("Failed to parse response as JSON")
        
        save_course_info(course_info)
        return course_info


    def courseFinder(self, course_code, university, num = 1, target_school = "all universities"):
        course_info = self.courseDesc(course_code, university)
        course_desc = course_info["course_desc"]

        messages = [
            {
                "role": "system",
                "content": (
                    "You are an artificial intelligence assistant and you should only answer in JSON format."
                    "The JSON should be a list of objects, each object should have the following properties:"
                    "- course_code: the code of the course"
                    "- course_name: the name of the course"
                    "- university: the university the course is from"
                    "- course_desc: a quick description of the course"
                ),
            },
            {   
                "role": "user",
                "content": (
                    f"I want a course similar to {course_code} from {university}, here is a description: {course_desc}."
                    f"Return {num} similar courses to {course_code} from {university} that are offered at {target_school}."
                ),
            },
        ]

        response = self.client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )

        output = response.choices[0].message.content
        
        try:
            return json.loads(output)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse response as JSON")

if __name__ == "__main__":
    # Example usage
    courseSearch = CourseSearch()
    courseSearch.courseFinder("ECE358", "University of Waterloo", 5)
    # courseSearch.get_eligible_universities("University of waterloo", ["China", "Japan", "Netherlands"])