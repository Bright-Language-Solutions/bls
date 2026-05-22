const locations = [
  // North India
  { city: 'New Delhi',    state: 'Delhi',             slug: 'new-delhi',    region: 'North', headquarters: true, servicesAvailable: ['translation', 'interpretation', 'voice-over', 'dubbing', 'subtitling-captioning', 'localization', 'transcription', 'desktop-publishing', 'editing-proofreading', 'typesetting'] },
  { city: 'Delhi',        state: 'Delhi',             slug: 'delhi',        region: 'North', servicesAvailable: ['translation', 'interpretation', 'subtitling-captioning', 'transcription', 'localization', 'editing-proofreading'] },
  { city: 'Noida',        state: 'Uttar Pradesh',     slug: 'noida',        region: 'North', servicesAvailable: ['translation', 'localization', 'desktop-publishing', 'editing-proofreading'] },
  { city: 'Gurugram',     state: 'Haryana',           slug: 'gurugram',     region: 'North', servicesAvailable: ['translation', 'interpretation', 'localization', 'transcription'] },
  { city: 'Jaipur',       state: 'Rajasthan',         slug: 'jaipur',       region: 'North', servicesAvailable: ['translation', 'interpretation', 'transcription', 'desktop-publishing'] },
  { city: 'Lucknow',      state: 'Uttar Pradesh',     slug: 'lucknow',      region: 'North', servicesAvailable: ['translation', 'interpretation', 'transcription', 'editing-proofreading'] },
  { city: 'Chandigarh',   state: 'Punjab/Haryana',    slug: 'chandigarh',   region: 'North', servicesAvailable: ['translation', 'interpretation', 'transcription'] },
  { city: 'Amritsar',     state: 'Punjab',            slug: 'amritsar',     region: 'North', servicesAvailable: ['translation', 'interpretation', 'transcription'] },
  { city: 'Dehradun',     state: 'Uttarakhand',       slug: 'dehradun',     region: 'North', servicesAvailable: ['translation', 'transcription', 'editing-proofreading'] },

  // West India
  { city: 'Mumbai',       state: 'Maharashtra',       slug: 'mumbai',       region: 'West',  servicesAvailable: ['translation', 'interpretation', 'voice-over', 'dubbing', 'subtitling-captioning', 'localization', 'transcription', 'desktop-publishing', 'editing-proofreading', 'typesetting'] },
  { city: 'Pune',         state: 'Maharashtra',       slug: 'pune',         region: 'West',  servicesAvailable: ['translation', 'interpretation', 'localization', 'transcription', 'editing-proofreading'] },
  { city: 'Ahmedabad',    state: 'Gujarat',           slug: 'ahmedabad',    region: 'West',  servicesAvailable: ['translation', 'interpretation', 'localization', 'desktop-publishing'] },
  { city: 'Surat',        state: 'Gujarat',           slug: 'surat',        region: 'West',  servicesAvailable: ['translation', 'interpretation', 'transcription'] },
  { city: 'Nagpur',       state: 'Maharashtra',       slug: 'nagpur',       region: 'West',  servicesAvailable: ['translation', 'transcription', 'editing-proofreading'] },

  // South India
  { city: 'Bengaluru',    state: 'Karnataka',         slug: 'bengaluru',    region: 'South', servicesAvailable: ['translation', 'interpretation', 'localization', 'voice-over', 'subtitling-captioning', 'transcription', 'desktop-publishing', 'editing-proofreading'] },
  { city: 'Chennai',      state: 'Tamil Nadu',        slug: 'chennai',      region: 'South', servicesAvailable: ['translation', 'interpretation', 'voice-over', 'dubbing', 'subtitling-captioning', 'transcription', 'typesetting'] },
  { city: 'Hyderabad',    state: 'Telangana',         slug: 'hyderabad',    region: 'South', servicesAvailable: ['translation', 'interpretation', 'localization', 'transcription', 'editing-proofreading'] },
  { city: 'Kochi',        state: 'Kerala',            slug: 'kochi',        region: 'South', servicesAvailable: ['translation', 'interpretation', 'transcription', 'desktop-publishing'] },
  { city: 'Coimbatore',   state: 'Tamil Nadu',        slug: 'coimbatore',   region: 'South', servicesAvailable: ['translation', 'transcription', 'editing-proofreading'] },
  { city: 'Mysuru',       state: 'Karnataka',         slug: 'mysuru',       region: 'South', servicesAvailable: ['translation', 'transcription'] },
  { city: 'Thiruvananthapuram', state: 'Kerala',      slug: 'thiruvananthapuram', region: 'South', servicesAvailable: ['translation', 'interpretation', 'transcription'] },

  // East India
  { city: 'Kolkata',      state: 'West Bengal',       slug: 'kolkata',      region: 'East',  servicesAvailable: ['translation', 'interpretation', 'subtitling-captioning', 'transcription', 'desktop-publishing', 'typesetting', 'editing-proofreading'] },
  { city: 'Bhubaneswar',  state: 'Odisha',            slug: 'bhubaneswar',  region: 'East',  servicesAvailable: ['translation', 'transcription', 'editing-proofreading'] },
  { city: 'Patna',        state: 'Bihar',             slug: 'patna',        region: 'East',  servicesAvailable: ['translation', 'interpretation', 'transcription'] },
  { city: 'Guwahati',     state: 'Assam',             slug: 'guwahati',     region: 'East',  servicesAvailable: ['translation', 'transcription', 'editing-proofreading'] },

  // Central India
  { city: 'Bhopal',       state: 'Madhya Pradesh',    slug: 'bhopal',       region: 'Central', servicesAvailable: ['translation', 'interpretation', 'transcription'] },
  { city: 'Indore',       state: 'Madhya Pradesh',    slug: 'indore',       region: 'Central', servicesAvailable: ['translation', 'transcription', 'desktop-publishing'] },
  { city: 'Raipur',       state: 'Chhattisgarh',      slug: 'raipur',       region: 'Central', servicesAvailable: ['translation', 'transcription'] },
];

export default locations;
