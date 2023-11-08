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
        id: 1, method: "Boiling Water", image: boiling_water, description: (
      <ul>
        <li>Boiling water is a simple way to purify it.</li>
        <li>High temperatures kill bacteria and viruses, removing impurities.</li>
        <li>Chemical additives are eliminated during boiling.</li>
        <li>Some impurities settle at the bottom of the boiled water.</li>
        <li>Use a microporous sieve to completely remove all impurities.</li>
      </ul>
    ),},

    {
        id: 2, method: "Water Purifier", image: Water_Purifier, description: ( 
        <ul>
            <li>Electric water purifiers are widely trusted for home use. </li>
            <li>They use multiple filtration stages, including UV(Ultraviolet), UF(Ultrafiltration), carbon blocks, and modern technology. </li>
            <li>This process effectively removes various impurities and chemicals, providing pure drinking water. </li>
        </ul>
        ),
    },

    {
        id: 3, method: "Reverse Osmosis", image:Reverse_Osmosis, description: (
        <ul>
            <li>RO Purifiers are excellent for water purification. </li>
            <li>They use reverse osmosis to remove contaminants. </li>
            <li>Some systems, like A. O. Smith RO UV Water Purifiers, preserve essential nutrients while eliminating harmful impurities. </li>
        </ul>
        ),
    },

    {
        id: 4, method: "Water Chlorination", image: chloritab_bucket, description: (
            <ul>
            <li>Older technique used in emergency situations, a method involves adding approximately 5% of mild chlorine bleach per liter. </li>
            <li>The bleach serves as an oxidant, swiftly eradicating microorganisms and ensuring safe drinking water. </li>
            </ul>
        ),
    },

    {
        id: 5, method: "Distillation", image: water_distiller, description: (
            <ul>
            <li>Distillation purifies water by collecting condensed vapor, removing contaminants. </li>
            <li>It's less efficient than an RO filter, takes time, and removes minerals. </li>
            </ul>
        ),
    },

    {
        id: 6, method: "Iodine Addition", image: Iodine_Addition, description: (
            <ul>
                <li>Iodine is a red chemical available in tablet or liquid form. </li>
                <li>It is a potent disinfectant, effective against bacteria and viruses. </li>
                <li>Iodine can introduce an unpleasant taste and be harmful in high doses. </li>
                <li>It should be used as a last resort if no better purification method, such as an electric water purifier, is available. </li>
            </ul>
            ), 
    },

    {
        id: 7, method: "Solar Purification", image: Solar_Purification, description: (
            <ul>
            <li>RO Purifiers are great for water purification. </li>
            <li>They use reverse osmosis to remove contaminants and maintain essential nutrients. </li>
            </ul>
        ), 
    },

    {
        id: 8, method: "Clay Vessel Filtration", image: Clay_Vessel_Filtration, description: (
            <ul>
                <li>Before RO or UV purifiers were available, clay pots were used for purifying muddy water. </li>
                <li>The clay pots blocked out the mud and allowed clean, drinkable water to pass through. </li>
                <li>This traditional method is still employed in some rural areas. </li>
            </ul>
            ), 
    },
]

export default Methods