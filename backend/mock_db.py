# e:\ProtoType\backend\mock_db.py

MOCK_FOOD_PROFILES = {
    "tomato": {
        "food_name": "Tomato",
        "category": "Fresh Produce",
        "form": "Whole",
        "moisture_content": "94%",
        "ph": "4.3",
        "water_activity": "0.98",
        "oxygen_sensitivity": "Medium",
        "moisture_sensitivity": "High",
        "respiration_rate": "High",
        "recommended_storage_temperature": "10-15°C",
        "typical_shelf_life": "5-10 days"
    },
    "potato chips": {
        "food_name": "Potato Chips",
        "category": "Snacks",
        "form": "Whole/Sliced",
        "moisture_content": "<2%",
        "ph": "Neutral",
        "water_activity": "0.2",
        "oxygen_sensitivity": "High",
        "moisture_sensitivity": "High",
        "respiration_rate": "None",
        "recommended_storage_temperature": "Ambient",
        "typical_shelf_life": "6 months"
    },
    "paneer": {
        "food_name": "Paneer",
        "category": "Dairy",
        "form": "Block",
        "moisture_content": "50-60%",
        "ph": "5.5-6.0",
        "water_activity": "0.95",
        "oxygen_sensitivity": "High",
        "moisture_sensitivity": "High",
        "respiration_rate": "Low",
        "recommended_storage_temperature": "1-4°C",
        "typical_shelf_life": "14-21 days"
    }
}

MOCK_RECOMMENDATIONS = {
    "tomato": {
        "ranked_materials": [
            {
                "material": "Macro-perforated LDPE",
                "score": 95,
                "reason": "Allows high respiration rate of tomatoes to prevent condensation and decay.",
                "eco_score": "Medium",
                "cost_per_unit": "₹1.50",
                "is_best": True
            },
            {
                "material": "Compostable PLA clamshell",
                "score": 88,
                "reason": "Eco-friendly option, good physical protection, but requires specific ventilation.",
                "eco_score": "High",
                "cost_per_unit": "₹4.00",
                "is_best": False
            }
        ],
        "packing_guide": [
            "Step 1: Inspect tomatoes for blemishes or damage.",
            "Step 2: Ensure tomatoes are dry before packing to prevent mold.",
            "Step 3: Place gently into the macro-perforated LDPE bag or PLA clamshell.",
            "Step 4: Do NOT vacuum seal. Tomatoes need to breathe.",
            "Step 5: Store in cool, well-ventilated area (10-15°C)."
        ],
        "final_recommendation": {
            "material": "Macro-perforated LDPE",
            "otr": "High (Permeable)",
            "wvtr": "Medium",
            "predicted_shelf_life": "10 days (Chilled)",
            "supplier": "EcoPack India, Mumbai"
        },
        "weather_impact": {
            "origin_weather": "Pune: 28°C, 65% Humidity",
            "destination_weather": "Delhi: 40°C, 30% Humidity (Dry & Hot)",
            "impact": "High heat in transit requires strict adherence to cold chain. The selected perforated LDPE prevents moisture buildup inside the bag during temperature fluctuations."
        }
    },
    "potato chips": {
        "ranked_materials": [
            {
                "material": "Metallized PET/PE",
                "score": 98,
                "reason": "Excellent barrier against oxygen and moisture. Essential for crispness and preventing rancidity.",
                "eco_score": "Low (Hard to recycle)",
                "cost_per_unit": "₹2.00",
                "is_best": True
            },
            {
                "material": "High-Barrier Monomaterial PP",
                "score": 85,
                "reason": "Recyclable alternative, slightly lower oxygen barrier but much better eco profile.",
                "eco_score": "Medium (Recyclable)",
                "cost_per_unit": "₹3.50",
                "is_best": False
            }
        ],
        "packing_guide": [
            "Step 1: Prepare product (fry and cool).",
            "Step 2: Select recommended film (Metallized PET/PE).",
            "Step 3: Fill required product quantity.",
            "Step 4: Apply recommended gas/MAP condition (Nitrogen flush).",
            "Step 5: Remove/seal headspace appropriately.",
            "Step 6: Heat-seal package.",
            "Step 7: Quality-check package (seal integrity)."
        ],
         "final_recommendation": {
            "material": "Metallized PET/PE with Nitrogen Flush",
            "otr": "< 1 cc/m2/day",
            "wvtr": "< 1 g/m2/day",
            "predicted_shelf_life": "6 months",
            "supplier": "FlexiPack Solutions, Delhi"
        },
        "weather_impact": {
            "origin_weather": "Pune: 28°C, 65% Humidity",
            "destination_weather": "Mumbai: 32°C, 85% Humidity (High Moisture)",
            "impact": "High ambient humidity at destination mandates a material with an extremely low WVTR (Water Vapor Transmission Rate) to maintain crispness."
        }
    }
}
