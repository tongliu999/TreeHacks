from openai import OpenAI
import requests
from bs4 import BeautifulSoup

class CourseSearch:
    def __init__(self):
        with open('api_key.txt', 'r') as file:
            self.api_key = file.read().strip()

    def get_eligible_universities(self, university):
        """
        Get all eligible universities for exchange students from a given university
        Args:
            university (str): The university to get eligible universities for (e.g., 'University of Waterloo')
        """

        if university == "lUniversity of Waterloo":
            url = "https://uwaterloo-horizons.symplicity.com/index.php?s=programs&_so_list_sort5ad5a89179cb63f89c2de5a1bb7ce758=provider%3Aasc"
            response = requests.get(url)
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            universities = []
            table = soup.find('table', {'class': 'list_items'})
            if table:
                rows = table.find_all('tr')[1:]
                for row in rows:
                    cols = row.find_all('td')
                    if cols:
                        university_name = cols[0].get_text(strip=True)
                        universities.append(university_name)            
            return str(universities)

        messages = [
            {
                "role": "system",
                "content": (
                    "You are an artificial intelligence assistant and you should only answer in JSON format."
                    "The JSON should be a list of objects, each object should have the following properties:"
                    "- university: the university that offers exchange programs to students from the given university"
                    "- you need to have all universities that offer exchange programs to students from the given university listed in the JSON"
                ),  
            },
            {
                "role": "user",
                "content": (
                    f"Return all the universities that offer exchange programs to students from {university}."
                ),
            },  
        ]

        client = OpenAI(api_key=self.api_key, base_url="https://api.perplexity.ai")

        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        print(response.choices[0].message.content)
        return response.choices[0].message.content


    def courseFinder(self,course_code, university):
        """
        Find similar courses to a given course from other universities
        
        Args:
            course_code (str): The course code to find similar courses for (e.g., 'CS246')
            university (str): The university the course is from (e.g., 'University of Waterloo')
        """

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
                ),
            },
            {   
                "role": "user",
                "content": (
                    f"Return similar courses to {course_code} from {university} "
                    f"that are offered at all universities in the list of eligible universities: {eligible_universities} excluding {university}."
                ),
            },
        ]

        client = OpenAI(api_key=self.api_key, base_url="https://api.perplexity.ai")

        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        
        print(response.choices[0].message.content)

if __name__ == "__main__":
    # Example usage
    courseSearch = CourseSearch()
    courseSearch.courseFinder("CS241", "University of Waterloo")
