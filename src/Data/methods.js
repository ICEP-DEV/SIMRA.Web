import boiling_water from "../assets/boiling_water1.jpg";
import clay_Filtration from '../assets/clay-filtration.jpg';
import bleach from '../assets/bleach.jpg';
import sodis from '../assets/SODIS.jpg';



const Methods = [
    {
        id: 1, method: "Boiling Water", image: boiling_water, description: `Bring the water to a rolling boil and maintain it for at least one minute. Allow the water to cool before use.`},

    {
        id: 2, method: "SODIS (Solar Water Disinfection)", image: sodis, description: `Fill clear, plastic bottles with water and leave them in direct sunlight for at least six hours (or longer if it cloudy). disinfect the water.`},

    {
        id: 3, method: "Chemical Disinfection", image:bleach, description: `Add a cap full of bleach in 25L of water. Allow the treated water to sit for a specific contact time before consuming.`},

    {
        id: 4, method: "Filtration", image: clay_Filtration, description: `Choose a water filter certified for the removal of specific contaminants (e.g., use a cloth folded 8 times/ clay pots/ceramic filters).`}

    
]

export default Methods