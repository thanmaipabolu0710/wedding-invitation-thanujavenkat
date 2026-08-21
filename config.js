/**
 * ROYAL INDIAN WEDDING INVITATION - CONFIGURATION
 * 
 * Customize all placeholder details for the wedding here.
 * Any changes made in this file will automatically update across the entire website.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    bride: {
      firstName: "Thanuja",
      lastName: "Adhirala",
      fullName: "Thanuja",
      parents: "D/o Shri Adhirala Naga Venkateswararao & Smt. Kanakadurga",
      bio: "Radiant and graceful, stepping into a sacred new beginning of love and joy.",
      photo: "assets/images/bride.png"
    },
    groom: {
      firstName: "Venkata Sai Krishna",
      lastName: "Podili",
      fullName: "Venkata Sai Krishna",
      parents: "S/o Shri Podili Venkatanarayana & Smt. Vijaya",
      bio: "Gentle and spirited, embarking on a timeless journey of togetherness.",
      photo: "assets/images/groom.png"
    },
    hashtag: "#ThanujaWedsVenkat",
    monogram: "T & V"
  },

  // Main Auspicious Muhurtham / Wedding Date & Time
  weddingDate: {
    targetISO: "2026-08-30T22:00:00+05:30",
    displayDate: "Sunday, August 30, 2026",
    muhurthamTime: "10:00 PM IST (Shubhalagnam)"
  },

  // Auspicious Mantra / Shloka
  shloka: {
    sanskrit: "॥ వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ ।\nనిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ॥",
    translation: "O Lord Ganesha, of huge body and the radiance of a million suns, please remove all obstacles from our auspicious endeavors always."
  },

  // Family Invitation Message
  invitationMessage: {
    title: "The Celebration of Eternal Love",
    salutation: "Dear Family & Friends,",
    body: "With the divine blessings of Lord Ganesha and our beloved elders, we, the Adhirala & Podili families, cordially invite you to grace the auspicious wedding ceremony of Thanuja & Venkata Sai Krishna and bless the new couple.",
    closing: "Your gracious presence and warm blessings will make our celebrations truly memorable."
  },

  // Ceremony Schedule (Dinner & Shubhalagnam)
  events: [
    {
      id: "dinner",
      title: "విందు (Dinner / Bhojanam)",
      subtitle: "Pre-Muhurtham Wedding Feast",
      dateStr: "Sunday, August 30, 2026",
      timeStr: "08:00 PM IST onwards",
      startISO: "2026-08-30T20:00:00+05:30",
      endISO: "2026-08-30T22:00:00+05:30",
      venueName: "Srinivasam Function Hall, NRT Center",
      badgeColor: "#F59E0B",
      icon: "dinner"
    },
    {
      id: "wedding",
      title: "శుభలగ్నం",
      subtitle: "Subhalagnam (Auspicious Wedding Muhurtham)",
      dateStr: "Sunday, August 30, 2026",
      timeStr: "10:00 PM IST (Shubhalagnam)",
      startISO: "2026-08-30T22:00:00+05:30",
      endISO: "2026-08-31T02:00:00+05:30",
      venueName: "Srinivasam Function Hall, NRT Center",
      badgeColor: "#831627",
      icon: "wedding"
    }
  ],

  // Venue Logistics
  venue: {
    name: "Srinivasam Function Hall",
    tagline: "NRT Center, Chilakaluripet, Palnadu",
    address: "NRT Center, Chilakaluripet, Palnadu District, Andhra Pradesh, India",
    city: "Chilakaluripet, Palnadu",
    googleMapsSearchQuery: "Srinivasam Function Hall NRT center Chilakaluripet Palnadu",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.0163351271297!2d80.16508937583685!3d16.08809493922896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7541b2c45fbb%3A0x6b7724892c554238!2sChilakaluripet%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Srinivasam+Function+Hall+NRT+center+Chilakaluripet+Palnadu"
  },

  // Romantic Story Milestones
  story: [
    {
      year: "August 2024",
      title: "When Two Families Met",
      description: "A meeting filled with warmth, smiles, and mutual respect that laid the foundation for a lifetime of togetherness.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "January 2026",
      title: "The Auspicious Engagement",
      description: "With rings exchanged and hearts united, our families came together to celebrate our joyful promise.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "August 2026",
      title: "The Sacred Beginning",
      description: "Surrounded by our loved ones, we take the sacred steps together at Srinivasam Function Hall.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // Photo Gallery
  gallery: [
    {
      url: "assets/images/gallery1.png"
    },
    {
      url: "assets/images/gallery2.png"
    },
    {
      url: "assets/images/gallery3.png"
    },
    {
      url: "assets/images/gallery4.png"
    },
    {
      url: "assets/images/gallery5.png"
    },
    {
      url: "assets/images/gallery6.png"
    }
  ],

  // Host Details
  hosts: {
    brideParents: "Shri Adhirala Naga Venkateswararao & Smt. Kanakadurga",
    groomParents: "Shri Podili Venkatanarayana & Smt. Vijaya",
    families: "The Adhirala & Podili Families"
  },

  // WhatsApp Share Template
  share: {
    title: "Wedding Invitation: Thanuja & Venkata Sai Krishna",
    text: "✨ Auspicious Wedding Invitation ✨\n\nWith joyous hearts, the Aadhirala & Podhili families cordially invite you to the wedding ceremony of Thanuja & Venkata Sai Krishna.\n\n📅 Date: Sunday, August 30, 2026\n🍽️ Dinner (విందు): 8:00 PM IST\n🪷 Muhurtham (శుభలగ్నం): 10:00 PM IST\n📍 Venue: Srinivasam Function Hall, NRT Center, Chilakaluripet, Palnadu\n\nPlease view our digital invitation card and directions here:\n"
  }
};
