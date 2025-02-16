from openai import OpenAI
import os
from dotenv import load_dotenv
import json
from mongo import save_course_info, get_course_info, save_equivalences, get_equivalences
from utils import format_equivalences, package_equivalences

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

    def get_course_desc(self, course_code, university):
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

        try:
            course_info = json.loads(content)
        
        except json.JSONDecodeError:
            raise ValueError("Failed to parse response as JSON")
        
        save_course_info(course_info)
        return course_info

    def get_similar(self, course_code, university, num, target_school):
        equivalences = get_equivalences(course_code, university, target_school)
        if equivalences:
            # Repackage the data to remove MongoDB ObjectId
            return {
                'from_code': equivalences['from_code'],
                'from_university': equivalences['from_university'],
                'to_university': equivalences['to_university'],
                'equivalences': equivalences['equivalences']
            }

        course_info = self.get_course_desc(course_code, university)
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
                    "- similarity_score: how similar the course is to the given course from 1 - 20 and no decimals"
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

        content = response.choices[0].message.content

        try:
            equivalences = json.loads(content)
            equivalences = format_equivalences(equivalences)
            packaged_equivalences = package_equivalences(course_code, university, target_school, equivalences)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse response as JSON")

        save_equivalences(packaged_equivalences)
        # Again, remove the MongoDB ObjectId, because i guess the adding it retroactively updates the objcet and adds an ID
        return {
            'from_code': packaged_equivalences['from_code'],
            'from_university': packaged_equivalences['from_university'],
            'to_university': packaged_equivalences['to_university'],
            'equivalences': packaged_equivalences['equivalences']
        }
        
    def course_finder(self, course_code, university, num = 1, target_school = "all universities"):
        res = self.get_similar(course_code, university, num, target_school)
        return res
    
    def email_generator(self, from_university, to_university, equivalences):
        
        #break down input JSON

        messages = [
            {
                "role": "system",
                "content": (
                    "You are an artificial intelligence assistant and you should only answer in an JSON format."
                    "The email should take the course info from the input and generate an email that details how your planned courseload matches with your"
                    "domestic school courseload. This email should be going to a academic advisor and should convince them that your planned courseload is a 1:1 subsitute."
                    "The JSON should be a list of objects, each object should have the following properties:"
                    "- subject: the subject line of the email"
                    "- body: the body of the email"
                ),
            },
            {   
                "role": "user",
                "content": (
                    "Craft me the email based off this info: "
                    f"Current university: {from_university}"
                    f"Potential abroad university: {to_university}"
                    f"Courses you're interested in: {equivalences}"
                ),
            },
        ]

        response = self.client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )

        content = response.choices[0].message.content
        return content

if __name__ == "__main__":
    # Example usage
    course_search = CourseSearch()
    course_search.course_finder("ECE358", "University of Waterloo", 5)
    # course_search.get_eligible_universities("University of waterloo", ["China", "Japan", "Netherlands"])
    