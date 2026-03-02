import os
import math
import requests
import json
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
API_TOKEN = os.getenv("airnav")

API_URL = "https://api.airnavradar.com/v2/flights/live"


def get_bounding_box(lat, lon, radius_km):
    earth_radius = 6371.0  # km

    delta_lat = (radius_km / earth_radius) * (180 / math.pi)
    delta_lon = (radius_km / earth_radius) * (180 / math.pi) / math.cos(lat * math.pi / 180)

    min_lat = lat - delta_lat
    max_lat = lat + delta_lat
    min_lon = lon - delta_lon
    max_lon = lon + delta_lon

    return min_lat, max_lat, min_lon, max_lon


def get_live_planes_full_json(lat, lon, radius_km):
    min_lat, max_lat, min_lon, max_lon = get_bounding_box(lat, lon, radius_km)

    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "minLatitude": min_lat,
        "maxLatitude": max_lat,
        "minLongitude": min_lon,
        "maxLongitude": max_lon,
        "incLastKnownPos": False
    }

    response = requests.post(API_URL, json=payload, headers=headers)

    if response.status_code != 200:
        print("Error:", response.status_code, response.text)
        return None

    return response.json()


if __name__ == "__main__":
    center_lat = 51.5074
    center_lon = -0.1278
    radius_km = 50

    data = get_live_planes_full_json(center_lat, center_lon, radius_km)

    if data:
        # Pretty-print entire JSON response
        print(json.dumps(data, indent=2))