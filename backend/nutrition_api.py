import requests

APP_ID = "2f6f4895"
API_KEY = "cd40eb0aa38abe6e36931da97d409901"

def make_nutrition_api_call(query:str) -> dict:
    """Make a call to nutritionix api using a query (food name)
        Return a dict containing he info about the food"""
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": APP_ID,
        "x-app-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "query": query
    }
    response = requests.post(url, headers=headers, json=data)
    response_dict =  response.json()
    result = {}
    # We are interested in the fields: food_name, nf_calories, serving_weight_grams, nf_protein, nf_total_carbohydrate
    result["calories"] = response_dict["foods"][0]["nf_calories"]
    result["proteins"] = response_dict["foods"][0]["nf_protein"]
    result["carbs"] = response_dict["foods"][0]["nf_total_carbohydrate"]
    result["fats"] = response_dict["foods"][0]["nf_total_fat"]
    return result
