from openai import OpenAI
import requests
from bs4 import BeautifulSoup

class CourseSearch:
    def __init__(self):
        with open('api_key.txt', 'r') as file:
            self.api_key = file.read().strip()

        self.client = OpenAI(api_key=self.api_key, base_url="https://api.perplexity.ai")

    def get_eligible_universities(self, university, countries = ["all"]):
        """
        Get all eligible universities for exchange students from a given university
        Args:
            university (str): The university to get eligible universities for (e.g., 'University of Waterloo')
        """
        universities = []
        if university == "University of Waterloo":
            url = "https://uwaterloo-horizons.symplicity.com/index.php?s=programs&_so_list_sort5ad5a89179cb63f89c2de5a1bb7ce758=provider%3Aasc=250"
            response = requests.get(url)
            
            soup = BeautifulSoup(response.content, 'html.parser')
            for university in soup.find_all('td', class_="cspList_main lst-cl-inst_name"):
                universities.append(university.text.strip())

            return str(universities)


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
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an artificial intelligence assistant and you should only answer in text format"
                ),  
            },
            {
                "role": "user",
                "content": (
                    f"Return a description of {course_code} from the {university}"
                ),
            },
        ]

        response = self.client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        return response.choices[0].message.content

    def courseFinder(self, course_code, university, num = 1, target_school = "all universities"):
        """
        Find similar courses to a given course from other universities
        
        Args:
            course_code (str): The course code to find similar courses for (e.g., 'CS246')
            university (str): The university the course is from (e.g., 'University of Waterloo')
        """

        course_desc = self.courseDesc(course_code, university)

        eligible_universities = self.get_eligible_universities(university)

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
                    f"Return {num} similar courses to {course_code} from {university}"
                    f"that are offered at {target_school} in the list of eligible universities: {eligible_universities} excluding {university}."
                ),
            },
        ]

        response = self.client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        
        print(response.choices[0].message.content)

if __name__ == "__main__":
    # Example usage
    courseSearch = CourseSearch()
    # courseSearch.courseFinder("ECE358", "University of Waterloo", 30)
    courseSearch.get_eligible_universities("University of waterloo", ["China", "Japan", "Netherlands"])