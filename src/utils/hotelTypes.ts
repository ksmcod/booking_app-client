interface HotelType {
  type: string;
  description: string;
}

export const hotelTypes: HotelType[] = [
  {
    type: "Budget",
    description: "Affordable hotels with basic accommodations.",
  },
  {
    type: "Boutique",
    description:
      "Smaller, unique, and often design-focused hotels offering personalized services.",
  },
  {
    type: "Luxury",
    description:
      "High-end hotels offering premium services, amenities, and accommodations.",
  },
  {
    type: "Resort",
    description:
      "Hotels with extensive recreational facilities, often located in vacation destinations.",
  },
  {
    type: "Business",
    description:
      "Hotels designed for business travelers, often located near business districts.",
  },
  {
    type: "Hostel",
    description:
      "Low-cost accommodations with shared facilities, usually catering to backpackers and budget travelers.",
  },
  {
    type: "Motel",
    description:
      "Low-cost accommodations with shared facilities, usually catering to backpackers and budget travelers.",
  },
  {
    type: "Apartment",
    description:
      "Long-term accommodations offering apartment-style living with hotel services.",
  },
  {
    type: "Extended Stay",
    description:
      "Hotels catering to guests who need to stay for longer periods, offering kitchen facilities and more home-like amenities.",
  },
  {
    type: "Pet Friendly",
    description: "Hotels which allows for pets.",
  },
];
