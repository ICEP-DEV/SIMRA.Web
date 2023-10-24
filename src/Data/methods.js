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
        id: 1, method: "Boiling Water", image: boiling_water, description: `The simplest method to purify water is to boil it for a good time.
    High temperatures cause the bacteria and virus to dissipate, removing all impurities from the water.
    In doing so, chemical additions cease to exist in the water. However, the dead micro-organisms and impurities settle at the bottom of the water,
    and boiling does not help eliminate all the impurities.
    You must strain the water through a microporous sieve to completely remove the impurities.`},

    {
        id: 2, method: "Water Purifier", image: Water_Purifier, description: `An electric water purifier is the most trusted form of water purification found in most houses today.
    A water purifier uses a multi-stage process involving UV and UF filtration, carbon block,
    and modern water filtration technology that eliminates most of the chemicals and impurities, making it the purest drinking water.`},

    {
        id: 3, method: "Reverse Osmosis", image:Reverse_Osmosis, description: `An RO Purifier proves to be one of the best methods of purifying water.
    Reverse Osmosis forces water through a semipermeable membrane and removes contaminants.
    The TDS Controller and Mineraliser Technology, like the one found in an A. O. Smith RO UV Water Purifier,
    help retain the necessary nutrients while doing away with harmful impurities.`},

    {
        id: 4, method: "Water Chlorination", image: chloritab_bucket, description: `It is an older technique used usually during an emergency, wherein a mild bleach with approximately 5% chlorine is added to the water.
    This mixture works as an oxidant and quickly kills microorganisms, making water safe for consumption.`},

    {
        id: 5, method: "Distillation", image: water_distiller, description: `Distillation is a water purification process involving collecting the condensed water after evaporation,
    ensuring that water is free of contaminants. However, this isn’t as effective as an RO filter because it is time-consuming and eliminates minerals`},

    {
        id: 6, method: "Iodine Addition", image: Iodine_Addition, description: `Iodine is a red chemical that is easily available as a tablet or a liquid. It is extremely powerful as it kills bacteria and viruses.
    However, it adds an unpleasant taste and can be fatal if taken in high doses.
    Therefore, it should only be used if you don’t have access to a better method of purification like an electric water purifier.`},

    {
        id: 7, method: "Solar Purification", image: Solar_Purification, description: `An RO Purifier proves to be one of the best methods of purifying water.
    Reverse Osmosis forces water through a semipermeable membrane and removes contaminants.
    The TDS Controller and Mineraliser Technology, like the one found in an A. O. Smith RO UV Water Purifier,
    help retain the necessary nutrients while doing away with harmful impurities.`},

    {
        id: 8, method: "Clay Vessel Filtration", image: Clay_Vessel_Filtration, description: `Way before people had access to an RO or UV Purifier, they used clay pots which purified muddy water,
    by blocking out the mud and allowing pure, potable water to pass through. This method is still used in some rural regions.`},
]

export default Methods