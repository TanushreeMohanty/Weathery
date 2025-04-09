# Weathery
This is a Clean and Responsive Weather Dashboard created using React.js and OpenWeatherMap API.

## Step 1: Initial Project setup
- commands to run
```
npm create vite@latest weather-app --template react
cd weather-app
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install framer-motion
npm run dev

```

- connecting with github repo
```
git init
git remote add origin https://github.com/TanushreeMohanty/Weathery.git
git remote -v
git pull origin main
git branch
git branch -m main
git add .
git commit -m "msg"
git push origin main
```
## Features added till now
1. **City Search Bar** – Allows users to enter the name of a city.  
2. **Search Trigger** – Users can initiate a search by clicking the **Submit** button or pressing **Enter**.
3. **Weather Card** – Displays current weather details including:
   - City Name  
   - Temperature (°C)  
   - Weather Condition (e.g., Sunny, Rainy, Snowy)  
   - Humidity (%)  
   - Wind Speed (km/h)  
   - Weather Icon (provided by the API)
4. **Loading State** – A visual indicator is shown while weather data is being fetched.  
