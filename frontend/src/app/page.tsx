"use client";

import { useState, useRef } from "react";
import { Camera, Search, CheckCircle, ArrowRight, Leaf, Box, Truck, ShieldAlert, BadgeIndianRupee, CloudLightning, Thermometer, X } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [foodQuery, setFoodQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [recommendation, setRecommendation] = useState<any>(null);
  
  // Image Upload State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [requirements, setRequirements] = useState({
    quantity: "500g",
    shelfLife: "15 days",
    budget: "Medium",
    sustainability: "High"
  });
  
  const [transport, setTransport] = useState({
    origin: "Pune",
    destination: "Delhi",
    mode: "Truck",
    coldChain: "Yes"
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = async (queryToUse: string = foodQuery) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/analyze-food`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food_query: queryToUse || "Tomato" })
      });
      const data = await res.json();
      setProfile(data);
      // Simulate AI processing time for image
      setTimeout(() => {
        setStep(2);
        setLoading(false);
      }, 800);
    } catch (e) {
      console.error(e);
      alert("Failed to connect to backend. Make sure FastAPI is running on port 8000.");
      setLoading(false);
    }
  };

  const analyzeImage = () => {
    // Mocking AI Image detection -> detects Tomato
    setFoodQuery("Tomato");
    analyzeFood("Tomato");
  };

  const getRecommendation = async () => {
    setLoading(true);
    setStep(5); // Loading step
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          food_name: profile.food_name,
          food_profile: profile,
          user_requirements: requirements,
          transportation: transport
        })
      });
      const data = await res.json();
      setRecommendation(data);
      // Simulate AI thinking time
      setTimeout(() => {
        setLoading(false);
        setStep(6);
      }, 1500);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden min-h-[600px] border border-gray-100">
        
        {/* Header */}
        <div className="bg-green-600 text-white p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="w-6 h-6" /> EcoPack AI
            </h1>
            <p className="text-green-100 text-sm mt-1">Intelligent Food Packaging Recommendation</p>
          </div>
          <div className="text-sm font-medium bg-green-700 px-3 py-1 rounded-full">
            Step {step} of 6
          </div>
        </div>

        <div className="p-8">
          
          {/* STEP 1: INPUT */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-light mb-2">What are you packing today?</h2>
                <p className="text-gray-500">Upload an image or type the food name to start the AI analysis.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Upload Image Box */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition cursor-pointer relative overflow-hidden ${selectedImage ? 'border-green-500' : 'border-gray-300 hover:border-green-500 hover:bg-green-50'}`}
                  onClick={() => !selectedImage && fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  
                  {selectedImage ? (
                    <div className="w-full h-full flex flex-col items-center">
                      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border">
                        <img src={selectedImage} alt="Uploaded food" className="w-full h-full object-cover" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                          className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); analyzeImage(); }}
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50"
                      >
                        {loading ? "Analyzing Image..." : <><Camera className="w-5 h-5"/> Analyze Image</>}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-green-100 p-4 rounded-full mb-4">
                        <Camera className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Option A: Upload Image</h3>
                      <p className="text-sm text-gray-500 mt-2">Take a photo of your food commodity</p>
                    </>
                  )}
                </div>

                {/* Enter Name Box */}
                <div className="border-2 border-gray-200 rounded-xl p-8 flex flex-col justify-center">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400" /> Option B: Enter Name
                  </h3>
                  <input 
                    type="text" 
                    value={foodQuery}
                    onChange={(e) => setFoodQuery(e.target.value)}
                    placeholder="e.g. Tomato, Potato Chips, Paneer"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <button 
                    onClick={() => analyzeFood(foodQuery)}
                    disabled={loading || !foodQuery}
                    className="mt-4 w-full bg-gray-900 text-white p-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {loading ? "Analyzing..." : "Analyze Text"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI PROFILE */}
          {step === 2 && profile && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
                <CheckCircle className="text-green-600" /> AI Food Profile Extracted
              </h2>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 grid md:grid-cols-2 gap-4 relative overflow-hidden">
                {/* Visual Flair for Image Detection if image was uploaded */}
                {selectedImage && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    <Camera className="w-3 h-3"/> Image Analyzed
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Detected Food</p>
                  <p className="text-xl font-bold text-blue-900">{profile.food_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category / Form</p>
                  <p className="text-lg font-semibold text-blue-800">{profile.category} • {profile.form}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries({
                  "Moisture Content": profile.moisture_content,
                  "pH Level": profile.ph,
                  "Water Activity": profile.water_activity,
                  "Oxygen Sensitivity": profile.oxygen_sensitivity,
                  "Moisture Sensitivity": profile.moisture_sensitivity,
                  "Respiration Rate": profile.respiration_rate
                }).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">{key}</p>
                    <p className="font-medium">{value as string}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setStep(3)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800"
                >
                  Confirm & Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 & 4: REQS & TRANSPORT */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="text-2xl font-semibold border-b pb-2">Your Requirements</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Req */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2"><Box className="w-5 h-5 text-gray-700" /> Product details</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Target Shelf Life</label>
                    <input type="text" value={requirements.shelfLife} onChange={e => setRequirements({...requirements, shelfLife: e.target.value})} className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Sustainability Priority</label>
                    <select value={requirements.sustainability} onChange={e => setRequirements({...requirements, sustainability: e.target.value})} className="w-full p-3 border rounded-lg bg-white">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                {/* Transport */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2"><Truck className="w-5 h-5 text-gray-700" /> Transportation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Origin</label>
                      <input type="text" value={transport.origin} onChange={e => setTransport({...transport, origin: e.target.value})} className="w-full p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Destination</label>
                      <input type="text" value={transport.destination} onChange={e => setTransport({...transport, destination: e.target.value})} className="w-full p-3 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Cold Chain Available?</label>
                    <select value={transport.coldChain} onChange={e => setTransport({...transport, coldChain: e.target.value})} className="w-full p-3 border rounded-lg bg-white">
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(2)} className="text-gray-500 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg">Back</button>
                <button 
                  onClick={getRecommendation}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700"
                >
                  Generate Recommendation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: LOADING */}
          {step === 5 && (
            <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-light">Calculating Packaging Needs...</h2>
              <p className="text-gray-500 mt-2 text-center max-w-md">
                Analyzing weather patterns between {transport.origin} and {transport.destination}, transport duration, and {profile.food_name} barrier requirements.
              </p>
            </div>
          )}

          {/* STEP 6: RESULTS */}
          {step === 6 && recommendation && (
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
              
              {/* Final Rec Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl font-medium text-sm shadow-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4"/> AI Recommended
                </div>
                <h2 className="text-sm font-bold text-green-700 tracking-wider uppercase mb-1">Best Overall Packaging</h2>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{recommendation.final_recommendation.material}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/60 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Oxygen Barrier (OTR)</p>
                    <p className="font-semibold">{recommendation.final_recommendation.otr}</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Moisture Barrier (WVTR)</p>
                    <p className="font-semibold">{recommendation.final_recommendation.wvtr}</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Predicted Shelf Life</p>
                    <p className="font-semibold text-green-700">{recommendation.final_recommendation.predicted_shelf_life}</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Nearby Supplier</p>
                    <p className="font-semibold truncate" title={recommendation.final_recommendation.supplier}>{recommendation.final_recommendation.supplier}</p>
                  </div>
                </div>
              </div>

              {/* Weather Impact Section */}
              {recommendation.weather_impact && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-3">
                    <CloudLightning className="w-5 h-5"/> Climate & Transport Intelligence
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-full"><Thermometer className="w-4 h-4 text-orange-600"/></div>
                      <div>
                        <p className="text-xs text-gray-500">Origin: {transport.origin}</p>
                        <p className="font-semibold text-sm">{recommendation.weather_impact.origin_weather}</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-full"><Thermometer className="w-4 h-4 text-orange-600"/></div>
                      <div>
                        <p className="text-xs text-gray-500">Destination: {transport.destination}</p>
                        <p className="font-semibold text-sm">{recommendation.weather_impact.destination_weather}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg text-sm text-gray-800">
                    <span className="font-bold">AI Insight:</span> {recommendation.weather_impact.impact}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Packing Guide */}
                <div>
                  <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-blue-600"/> Smart Packing Guide
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <ul className="space-y-4">
                      {recommendation.packing_guide.map((step: string, idx: number) => {
                        const [stepNum, desc] = step.split(": ");
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded min-w-[50px] text-center mt-0.5">{stepNum}</span>
                            <span className="text-gray-700">{desc || step}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                {/* Alternatives */}
                <div>
                  <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
                    <BadgeIndianRupee className="w-5 h-5 text-gray-600"/> Alternatives & Cost
                  </h3>
                  <div className="space-y-4">
                    {recommendation.ranked_materials.map((mat: any, idx: number) => (
                      <div key={idx} className={`p-4 rounded-xl border ${mat.is_best ? 'border-green-300 bg-green-50/30' : 'border-gray-200 bg-white'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{mat.material}</h4>
                          <span className="font-mono font-medium text-gray-600">{mat.cost_per_unit} / unit</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{mat.reason}</p>
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <span className={`px-2 py-1 rounded-full ${mat.eco_score.includes('High') || mat.eco_score.includes('Recyclable') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            Eco: {mat.eco_score}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Score: {mat.score}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8 border-t">
                <button onClick={() => {
                  setStep(1); 
                  setFoodQuery("");
                  setSelectedImage(null);
                }} className="text-gray-500 font-medium px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Analyze Another Food
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
