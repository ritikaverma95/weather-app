from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os # type: ignore
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

API_KEY = os.getenv("WEATHER_API_KEY")

@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City is required"}), 400

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}"
    response = requests.get(url)
    return jsonify(response.json())

# Serve React build
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "weather.html") # type: ignore

# For React Router (catch-all)
@app.errorhandler(404)
def not_found(e): # type: ignore
    return send_from_directory(app.static_folder, "weather.html") # type: ignore

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
