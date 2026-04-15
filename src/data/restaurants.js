// ============================================================
// restaurants.js — All restaurant + dish data lives here.
// Add new restaurants by copying the shape below.
// Tier keys: S | A | B | C | D
// Each dish needs: id, name, emoji (placeholder for real image),
//   imageSrc (optional real img path), and description.
// ============================================================

export const TIER_LABELS = {
  S: { label: "S", color: "#FF4D4D", bg: "#2a0000" },
  A: { label: "A", color: "#FF9F0A", bg: "#2a1500" },
  B: { label: "B", color: "#FFD60A", bg: "#2a2000" },
  C: { label: "C", color: "#30D158", bg: "#002a0a" },
  D: { label: "D", color: "#636366", bg: "#1a1a1a" },
};

const restaurants = [
  {
    id: 1,
    name: "Sushi Masaki Saito",
    cuisine: "Japanese · Omakase",
    address: "88 Avenue Rd, Toronto, ON",
    visited: "March 2024",
    rating: 5,
    lat: 43.6761,
    lng: -79.3954,
    coverEmoji: "🍣",
    notes: "Best omakase in the city. Chef Saito is a true artist. Reserve 2 months ahead.",
    tierList: {
      S: [
        {
          id: "d1",
          name: "Otoro Nigiri",
          emoji: "🐟",
          description: "The pinnacle of the meal. A single slice of bluefin tuna belly draped over hand-pressed rice. Impossibly fatty, melts before you even close your mouth. The rice temperature was perfect — just above body heat. I've thought about this bite weekly since.",
        },
        {
          id: "d2",
          name: "Uni Hand Roll",
          emoji: "🌊",
          description: "Fresh Santa Barbara uni wrapped in crispy nori with a whisper of yuzu. The seaweed crackled audibly. Pure ocean sweetness with zero bitterness — the mark of truly fresh uni. One of maybe three times I've had uni this good in my life.",
        },
      ],
      A: [
        {
          id: "d3",
          name: "Wagyu Tataki",
          emoji: "🥩",
          description: "Lightly torched A5 wagyu with ponzu and microgreens. The sear added a subtle smokiness without cooking away the incredible marbling. Could have eaten four portions.",
        },
        {
          id: "d4",
          name: "Hamachi Carpaccio",
          emoji: "🍋",
          description: "Paper-thin yellowtail with jalapeño oil and citrus. Classic Nobu-esque preparation but executed with more restraint and better fish quality. Bright, clean, refreshing.",
        },
      ],
      B: [
        {
          id: "d5",
          name: "Miso Soup",
          emoji: "🍵",
          description: "White shiro miso with tiny clams and wakame. Delicate and deeply savory. A perfect palate cleanser between courses, though not a standout on its own.",
        },
      ],
      C: [],
      D: [],
    },
  },
  {
    id: 2,
    name: "Alo Restaurant",
    cuisine: "French · Tasting Menu",
    address: "163 Spadina Ave, Toronto, ON",
    visited: "January 2024",
    rating: 5,
    lat: 43.6489,
    lng: -79.3962,
    coverEmoji: "🥂",
    notes: "Breathtaking tasting menu. The sommelier pairing was worth every penny.",
    tierList: {
      S: [
        {
          id: "d6",
          name: "Foie Gras Torchon",
          emoji: "🫙",
          description: "Served with brioche and a tart cherry jam. Silky, unctuous, perfectly seasoned. The brioche was warm and cloud-like. This course alone justified the price of the whole meal. Classic technique executed with zero compromise.",
        },
      ],
      A: [
        {
          id: "d7",
          name: "Lobster Bisque",
          emoji: "🦞",
          description: "Poured tableside over a tiny mountain of lobster claw meat and tarragon cream. Intensely reduced, coral-colored, aromatic. The butter content was probably criminal. Absolutely delicious.",
        },
        {
          id: "d8",
          name: "Duck Confit",
          emoji: "🦆",
          description: "Crispy-skinned duck leg with lentils du Puy and a red wine reduction. Rich and deeply savory. The skin was lacquered and shattered. The lentils were earthy and perfectly al dente.",
        },
      ],
      B: [
        {
          id: "d9",
          name: "Cheese Course",
          emoji: "🧀",
          description: "Selection of four Quebec cheeses with honeycomb and walnut bread. Well-curated but overshadowed by the savory courses. The aged cheddar was the standout.",
        },
        {
          id: "d10",
          name: "Amuse Bouche",
          emoji: "🌿",
          description: "A single bite of beet gel sphere with goat cheese mousse. Technically impressive but didn't quite sing flavor-wise. More art than food.",
        },
      ],
      C: [
        {
          id: "d11",
          name: "Sorbet Intermezzo",
          emoji: "🍧",
          description: "Cucumber and gin sorbet. Refreshing but a bit watery. Felt like a placeholder course.",
        },
      ],
      D: [],
    },
  },
  {
    id: 3,
    name: "Bar Isabel",
    cuisine: "Spanish · Tapas",
    address: "797 College St, Toronto, ON",
    visited: "November 2023",
    rating: 4,
    lat: 43.6547,
    lng: -79.4245,
    coverEmoji: "🥘",
    notes: "Vibrant atmosphere, incredible natural wine list. Go with 4+ people to try everything.",
    tierList: {
      S: [
        {
          id: "d12",
          name: "Grilled Octopus",
          emoji: "🐙",
          description: "Charred to perfection with smoked paprika oil, crispy capers, and a bed of silky potato purée. The tentacles had that ideal combination — charred exterior giving way to a tender, almost creamy interior. I've ordered this every single time I've been here. My benchmark for octopus everywhere else.",
        },
      ],
      A: [
        {
          id: "d13",
          name: "Jamon Iberico",
          emoji: "🍖",
          description: "Hand-carved Joselito Gran Reserva. Nutty, sweet, with that characteristic long finish. Served with pan con tomate. Let the fat melt on your tongue — don't chew immediately.",
        },
        {
          id: "d14",
          name: "Patatas Bravas",
          emoji: "🥔",
          description: "Double-fried potato cubes with a house bravas sauce that has real heat and a smoky aioli. Sounds simple, tastes transcendent. Better than versions I've had in Madrid.",
        },
      ],
      B: [
        {
          id: "d15",
          name: "Tortilla Española",
          emoji: "🥚",
          description: "Dense, eggy, onion-sweet. Served at room temp which divided the table. Authentic but not exciting.",
        },
      ],
      C: [
        {
          id: "d16",
          name: "Gazpacho",
          emoji: "🍅",
          description: "Too acidic. The balance was off — needed more olive oil and less vinegar. Missed the mark compared to everything else on the menu.",
        },
      ],
      D: [],
    },
  },
  {
    id: 4,
    name: "Edulis",
    cuisine: "European · Seafood",
    address: "169 Niagara St, Toronto, ON",
    visited: "September 2023",
    rating: 4,
    lat: 43.6398,
    lng: -79.4043,
    coverEmoji: "🦪",
    notes: "Tiny room, huge flavors. Book weekend brunch — the value is incredible.",
    tierList: {
      S: [
        {
          id: "d17",
          name: "Dungeness Crab Toast",
          emoji: "🦀",
          description: "Thick sourdough toast heaped with fresh crab, preserved lemon, chive crème fraîche, and a dusting of espelette. Every element perfect in proportion. The bread had structural integrity to support all that crab without going soggy. A masterclass in the open-faced sandwich.",
        },
      ],
      A: [
        {
          id: "d18",
          name: "Chanterelle Omelette",
          emoji: "🍄",
          description: "Soft French-style omelette folded around wild chanterelles in a tarragon cream. The eggs were cooked to exactly that silky, barely-set French style. Earthy and elegant.",
        },
      ],
      B: [
        {
          id: "d19",
          name: "Bouillabaisse",
          emoji: "🫕",
          description: "Hearty and warming but slightly too salty on the day I visited. The rouille was excellent — deeply garlicky with real saffron presence. The fish was fresh. Overall a solid rendition.",
        },
      ],
      C: [],
      D: [],
    },
  },
];

export default restaurants;