import boiling_water from "../assets/Boiling_Water.jpg"
import Reverse_Osmosis from "../assets/Reverse_Osmosis.jpg"
import Clay_Vessel_Filtration from '../assets/Clay_Vessel_Filtration.jpg'
import Water_Purifier from '../assets/Water_Purifier.jpg'
import chloritab_bucket from '../assets/chloritab-bucket-jpg.webp'
import water_distiller from '../assets/Electric-heating-water-distiller.jpg'
import Iodine_Addition from '../assets/Iodine_Addition.png'
import Solar_Purification from '../assets/Solar_Purification.jpg'


const Methods = [
    {
        id: 1, method: "Boiling Water", image: boiling_water, description: `Boiling water is a simple way to purify it.
High temperatures kill bacteria and viruses, removing impurities.
Chemical additives are eliminated during boiling.
Some impurities settle at the bottom of the boiled water.
Use a microporous sieve to completely remove all impurities.`},

    {
        id: 2, method: "Water Purifier", image: Water_Purifier, description: `Electric water purifiers are widely trusted for home use.
They use multiple filtration stages, including UV(Ultraviolet), UF(Ultrafiltration), carbon blocks, and modern technology.
This process effectively removes various impurities and chemicals, providing pure drinking water.`},

    {
        id: 3, method: "Reverse Osmosis", image:Reverse_Osmosis, description: `RO Purifiers are excellent for water purification.
They use reverse osmosis to remove contaminants.
Some systems, like A. O. Smith RO UV Water Purifiers, preserve essential nutrients while eliminating harmful impurities.`},

    {
        id: 4, method: "Water Chlorination", image: chloritab_bucket, description: `In emergency situations, a method involves adding approximately 5% chlorine bleach per liter.
The bleach serves as an oxidant, swiftly eradicating microorganisms and ensuring safe drinking water.`},

    {
        id: 5, method: "Distillation", image: water_distiller, description: `Distillation purifies water by collecting condensed vapor, removing contaminants.
It's less efficient than an RO filter, takes time, and removes minerals.`},

    {
        id: 6, method: "Iodine Addition", image: Iodine_Addition, description: `Iodine is a red chemical available in tablet or liquid form.
It is a potent disinfectant, effective against bacteria and viruses.
Iodine can introduce an unpleasant taste and be harmful in high doses.
It should be used as a last resort if no better purification method, such as an electric water purifier, is available.`},

    {
        id: 7, method: "Solar Purification", image: Solar_Purification, description: `RO Purifiers are great for water purification.
They use reverse osmosis to remove contaminants and maintain essential nutrients.`},

    {
        id: 8, method: "Clay Vessel Filtration", image: Clay_Vessel_Filtration, description: `Before RO or UV purifiers were available, clay pots were used for purifying muddy water.
The clay pots blocked out the mud and allowed clean, drinkable water to pass through.
This traditional method is still employed in some rural areas.`},
]

export default Methods