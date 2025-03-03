import uuid

# Has side effects but that's fine because it's the goal
def format_equivalences(equivalences):
    for eq in equivalences:
        eq['eq_id'] = f"eq_{uuid.uuid4()}"
        eq['similarity_score'] = eq['similarity_score'] / 2
        
    return equivalences

def package_equivalences(from_code, from_university, to_university, equivalences):
    return {
        "from_code": from_code,
        "from_university": from_university,
        "to_university": to_university,
        "equivalences": equivalences
    }