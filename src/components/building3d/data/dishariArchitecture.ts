import { FloorId } from '../utils/geometryHelpers';

export type FloorDocumentationStatus = 'confirmed' | 'placeholder';

export interface RoomSpec {
  id: string;
  number: string;
  name: string;
  category:
    | 'circulation'
    | 'admin'
    | 'medical'
    | 'accommodation'
    | 'therapy'
    | 'dining'
    | 'service';
  dimensions?: string;
  notes?: string;
  /** 3D position [x, y, z] in local floor space for label anchor & camera focus */
  labelPosition: [number, number, number];
  /** Optional annotation from reference slides (e.g., red/green outline box) */
  referenceMarkup?: string;
}

export interface FloorSpec {
  id: FloorId;
  shortLabel: string;
  name: string;
  subtitle: string;
  areaSft: string | null;
  targetPhase: string;
  status: FloorDocumentationStatus;
  summaryPoints: string[];
  /** Reference image path inside /public/assets/building3d/... if available */
  referenceImage?: string;
  rooms: RoomSpec[];
  missingNotes?: string[];
}

export interface ArchitecturalAuditEntry {
  category: 'Confirmed' | 'Assumed / Estimated' | 'Missing Information & Assets';
  title: string;
  detail: string;
}

export const DISHARI_PROJECT_META = {
  title: 'DISHARI',
  organization: "AHQ AG's Br · W&R Dte",
  buildingType: 'G+6 Initial Build (Master-planned up to G+13)',
  capacityNote: 'Initial residential capacity up to 44 special adults (4 × 11 rooms)',
  totalLevels: 7,
};

export const FLOORS_DATA: FloorSpec[] = [
  {
    id: 'G',
    shortLabel: 'G',
    name: 'Ground Floor',
    subtitle: 'Reception, Admin & Security',
    areaSft: '6,175 SFT',
    targetPhase: 'Dec 26',
    status: 'confirmed',
    referenceImage:
      '/assets/building3d/ground-floor.png',
    summaryPoints: [
      'Reception & Information',
      'Waiting Lounge & Entries',
      'First Aid & Isolation Room',
      'Principal, Accounts & CCTV Control',
    ],
    rooms: [
      {
        id: 'g-01',
        number: '01',
        name: 'Reception',
        category: 'admin',
        labelPosition: [7.4, 2.1, -0.5],
        notes: 'Curved reception counter facing Main Entry (12) and Fire Stair (10).',
      },
      {
        id: 'g-02',
        number: '02',
        name: 'Information',
        category: 'admin',
        labelPosition: [1.2, 1.9, 7.4],
        notes: 'Linear front counter along the street-facing glazed colonnade.',
      },
      {
        id: 'g-03',
        number: '03',
        name: 'Waiting Lounge',
        category: 'circulation',
        labelPosition: [-7.6, 1.9, 6.4],
        notes: 'Soft lounge seating clusters with circular coffee tables near Secondary Entry.',
      },
      {
        id: 'g-04',
        number: '04',
        name: 'Fast-Aid & Isolation Room',
        category: 'medical',
        labelPosition: [-9.2, 2.1, -3.5],
        notes: 'Medical desk + two separated isolation/first-aid beds.',
      },
      {
        id: 'g-05',
        number: '05',
        name: 'Principal Room',
        category: 'admin',
        labelPosition: [-3.2, 2.1, -4.6],
        notes: 'Executive office suite with private anteroom.',
      },
      {
        id: 'g-06',
        number: '06',
        name: 'Accounts Section',
        category: 'admin',
        labelPosition: [2.4, 2.2, -5.6],
        referenceMarkup: 'Outlined in red on Ground Floor reference sheet',
      },
      {
        id: 'g-07',
        number: '07',
        name: 'CCTV & Security Control Room',
        category: 'admin',
        labelPosition: [10.0, 2.1, -7.2],
        notes: 'Curved monitoring console overlooking rear garden; adjacent room outlined in green.',
        referenceMarkup: 'Adjacent office bay outlined in green on reference sheet',
      },
      {
        id: 'g-08',
        number: '08',
        name: 'Toilet Zone',
        category: 'service',
        labelPosition: [14.3, 2.1, -9.1],
        notes: 'Multi-cubicle restroom tucked inside the curved north-east brick corner.',
      },
      {
        id: 'g-09',
        number: '09',
        name: 'Lift (4 Nos)',
        category: 'circulation',
        labelPosition: [7.4, 2.4, 5.1],
        notes: 'Dual lift cores: front-right brick-clad core and rear-left core.',
      },
      {
        id: 'g-10',
        number: '10',
        name: 'Fire Stair',
        category: 'circulation',
        labelPosition: [11.1, 2.3, -2.0],
      },
      {
        id: 'g-11',
        number: '11',
        name: 'Stair',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
        notes: 'Central double-flight feature staircase.',
      },
      {
        id: 'g-12',
        number: '12',
        name: 'Main Entry',
        category: 'circulation',
        labelPosition: [12.0, 1.4, 7.6],
        notes: 'Stepped main entrance plaza off the front street.',
      },
      {
        id: 'g-13',
        number: '13',
        name: 'Secondary Entry',
        category: 'circulation',
        labelPosition: [-13.6, 1.4, 7.4],
      },
      {
        id: 'g-14',
        number: '14',
        name: 'Vehicular Ramp Entry 01',
        category: 'circulation',
        labelPosition: [18.4, 1.4, 4.5],
        notes: 'Curved driveway along the east flank flanked by trees.',
      },
      {
        id: 'g-15',
        number: '15',
        name: 'Pedestrian Ramp Entry 02',
        category: 'circulation',
        labelPosition: [-16.6, 1.6, 5.4],
        notes: 'Accessible ramp along the west flank (labeled "Padestrian Ramp" on ref).',
      },
    ],
  },
  {
    id: '1',
    shortLabel: '1',
    name: '1st Floor',
    subtitle: 'Medical Support & Counseling',
    areaSft: '5,960 SFT',
    targetPhase: 'Jun 27',
    status: 'confirmed',
    referenceImage:
      '/assets/building3d/first-floor.png',
    summaryPoints: [
      'Daylong Activity Facilities',
      'Therapy & Counseling Rooms',
      'Dental, EEG & Minor Procedure',
      'Nurse Station & Pharmacy',
    ],
    rooms: [
      {
        id: '1-01',
        number: '01',
        name: 'Nurse Station',
        category: 'medical',
        labelPosition: [7.4, 2.1, -0.5],
      },
      {
        id: '1-02',
        number: '02',
        name: 'Pharmacy',
        category: 'medical',
        labelPosition: [2.0, 2.3, -5.2],
        notes: 'Dispensary room with front counter & seating; secondary alcove right of Fire Stair.',
        referenceMarkup: 'Main dispensary bay outlined in red on 1st Floor reference sheet',
      },
      {
        id: '1-03',
        number: '03',
        name: 'Waiting Lounge',
        category: 'circulation',
        labelPosition: [1.4, 1.6, -1.6],
      },
      {
        id: '1-04',
        number: '04',
        name: 'Emergency First-Aid & Patient Monitoring',
        category: 'medical',
        labelPosition: [-8.6, 2.1, 6.2],
        notes: 'Glazed clinical bay with monitoring bed and doctor consultation desk.',
        referenceMarkup: 'Outlined in red on 1st Floor reference sheet',
      },
      {
        id: '1-05',
        number: '05',
        name: 'Individual Counseling Room',
        category: 'therapy',
        labelPosition: [-0.3, 2.1, 6.2],
        notes: 'Private glazed counseling room with daybed and consultation chairs.',
      },
      {
        id: '1-06',
        number: '06',
        name: 'Dental Care Room',
        category: 'medical',
        labelPosition: [-10.0, 1.9, -3.4],
        notes: 'Equipped with dental treatment chair and side cabinet.',
      },
      {
        id: '1-07',
        number: '07',
        name: 'EEG Room',
        category: 'medical',
        labelPosition: [-6.1, 2.8, -4.1],
        notes: 'Two examination beds and EEG diagnostic seating.',
      },
      {
        id: '1-08',
        number: '08',
        name: 'Minor Procedure Room',
        category: 'medical',
        labelPosition: [-2.2, 1.9, -4.7],
      },
      {
        id: '1-09',
        number: '09',
        name: 'Therapy Room',
        category: 'therapy',
        labelPosition: [7.0, 2.2, -6.4],
        notes: 'Large sensory/counseling lounge with beanbags, zigzag therapy table & planted balcony.',
      },
      {
        id: '1-10',
        number: '10',
        name: 'Storage Area',
        category: 'service',
        labelPosition: [11.6, 2.1, -7.8],
      },
      {
        id: '1-11',
        number: '11',
        name: 'Toilet Zone',
        category: 'service',
        labelPosition: [14.3, 2.4, -9.1],
      },
      {
        id: '1-12',
        number: '12',
        name: 'Lift (4 Nos)',
        category: 'circulation',
        labelPosition: [7.4, 2.4, 5.1],
      },
      {
        id: '1-13',
        number: '13',
        name: 'Fire Stair',
        category: 'circulation',
        labelPosition: [11.1, 2.3, -2.0],
      },
      {
        id: '1-14',
        number: '14',
        name: 'Stair',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
      },
      {
        id: '1-15',
        number: '15',
        name: 'Typical Floor Ramp',
        category: 'circulation',
        labelPosition: [-16.6, 1.6, 5.4],
      },
    ],
  },
  {
    id: '2',
    shortLabel: '2',
    name: '2nd Floor',
    subtitle: 'Accommodation Floor (11× Indl Female Accn)',
    areaSft: '8,100 SFT',
    targetPhase: 'Jan 27',
    status: 'confirmed',
    referenceImage:
      '/assets/building3d/second-floor.png',
    summaryPoints: [
      '11× Individual Studio Beds',
      '2× Staff Beds with Ensuite Toilets',
      "Play Zone (28'-8\" × 20'-0\")",
      'Private Verandas & Planter Strip',
    ],
    rooms: [
      {
        id: '2-01',
        number: '01',
        name: 'Studio Bed (11 Nos)',
        category: 'accommodation',
        dimensions: "12'-1\" to 13'-4\" × 15'-0\"",
        labelPosition: [-8.5, 2.2, 5.2],
        notes: '5 studios along the front wing, 3 rear-left, and 3 rear-right, each with veranda & toilet.',
      },
      {
        id: '2-02',
        number: '02',
        name: 'Veranda',
        category: 'accommodation',
        labelPosition: [-12.2, 1.8, 7.8],
        notes: 'Private balcony with planter box and glazed sliding door for each studio.',
      },
      {
        id: '2-03',
        number: '03',
        name: 'Staff Bed (2 Nos)',
        category: 'accommodation',
        dimensions: "14'-6\" × 20'-10\" & 11'-8\" × 11'-3\"",
        labelPosition: [14.8, 2.2, -5.8],
        notes: 'Two dedicated staff quarters along the eastern perimeter.',
      },
      {
        id: '2-04',
        number: '04',
        name: 'Nurse Station',
        category: 'medical',
        labelPosition: [7.4, 2.1, -0.5],
      },
      {
        id: '2-05',
        number: '05',
        name: 'Play Zone',
        category: 'therapy',
        dimensions: "28'-8\" × 20'-0\"",
        labelPosition: [1.4, 1.9, -4.6],
        notes: 'Open central-north recreation terrace with circular rug, lounge seating & railing.',
      },
      {
        id: '2-06',
        number: '06',
        name: 'AC Outdoor',
        category: 'service',
        dimensions: "11'-8\" × 17'-11\"",
        labelPosition: [7.4, 1.8, 7.4],
      },
      {
        id: '2-07',
        number: '07',
        name: 'Toilet (Ensuite)',
        category: 'service',
        labelPosition: [-3.8, 2.0, 7.2],
      },
      {
        id: '2-08',
        number: '08',
        name: 'Lift (4 Nos)',
        category: 'circulation',
        labelPosition: [7.4, 2.4, 5.1],
      },
      {
        id: '2-09',
        number: '09',
        name: 'Fire Stair',
        category: 'circulation',
        labelPosition: [11.1, 2.3, -2.0],
      },
      {
        id: '2-10',
        number: '10',
        name: 'Stair',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
      },
      {
        id: '2-11',
        number: '11',
        name: 'Typical Floor Ramp',
        category: 'circulation',
        labelPosition: [-16.6, 1.6, 5.4],
      },
    ],
  },
  {
    id: '3',
    shortLabel: '3',
    name: '3rd Floor',
    subtitle: '11× Ty Accommodation Room',
    areaSft: null,
    targetPhase: 'Jan 27',
    status: 'placeholder',
    summaryPoints: [
      '11× Ty Accn Room (Program Confirmed)',
      'Interior Floor Plan Not Supplied',
      'Structural Cores & Envelope Only',
    ],
    rooms: [
      {
        id: '3-core-lift',
        number: 'L',
        name: 'Lift Cores (Vertical Continuity)',
        category: 'circulation',
        labelPosition: [7.4, 2.3, 5.1],
      },
      {
        id: '3-core-fire',
        number: 'F',
        name: 'Fire Stair (Vertical Continuity)',
        category: 'circulation',
        labelPosition: [10.6, 2.3, -2.0],
      },
      {
        id: '3-core-stair',
        number: 'S',
        name: 'Central Stair Void',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
      },
    ],
    missingNotes: [
      'No axonometric or CAD floor plan was provided for the 3rd Floor.',
      'Only the overview program ("11x Ty Accn Room") and shared vertical circulation cores are confirmed.',
      'Placeholder shows the structural envelope without inventing unverified interior partitions.',
    ],
  },
  {
    id: '4',
    shortLabel: '4',
    name: '4th Floor',
    subtitle: '11× Indl Male Accommodation',
    areaSft: null,
    targetPhase: 'Jan 27',
    status: 'placeholder',
    summaryPoints: [
      '11× Indl Male Accn Room (Confirmed)',
      'Interior Floor Plan Not Supplied',
      'Structural Cores & Envelope Only',
    ],
    rooms: [
      {
        id: '4-core-lift',
        number: 'L',
        name: 'Lift Cores (Vertical Continuity)',
        category: 'circulation',
        labelPosition: [7.4, 2.3, 5.1],
      },
      {
        id: '4-core-fire',
        number: 'F',
        name: 'Fire Stair (Vertical Continuity)',
        category: 'circulation',
        labelPosition: [10.6, 2.3, -2.0],
      },
      {
        id: '4-core-stair',
        number: 'S',
        name: 'Central Stair Void',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
      },
    ],
    missingNotes: [
      'No axonometric or CAD floor plan was provided for the 4th Floor.',
      'Overview specifies "11x Indl Male Accn Room", likely sharing structural bays with the 2nd Floor, but exact room variation is unconfirmed.',
      'Placeholder shows the structural envelope without inventing unverified interior partitions.',
    ],
  },
  {
    id: '5',
    shortLabel: '5',
    name: '5th Floor',
    subtitle: '11× Indl Male Accommodation',
    areaSft: null,
    targetPhase: 'Jan 27',
    status: 'placeholder',
    summaryPoints: [
      '11× Indl Male Accn Room (Confirmed)',
      'Interior Floor Plan Not Supplied',
      'Structural Cores & Envelope Only',
    ],
    rooms: [
      {
        id: '5-core-lift',
        number: 'L',
        name: 'Lift Cores (Vertical Continuity)',
        category: 'circulation',
        labelPosition: [7.4, 2.3, 5.1],
      },
      {
        id: '5-core-fire',
        number: 'F',
        name: 'Fire Stair (Vertical Continuity)',
        category: 'circulation',
        labelPosition: [10.6, 2.3, -2.0],
      },
      {
        id: '5-core-stair',
        number: 'S',
        name: 'Central Stair Void',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
      },
    ],
    missingNotes: [
      'No axonometric or CAD floor plan was provided for the 5th Floor.',
      'Overview specifies "11x Indl Male Accn Room".',
      'Placeholder shows the structural envelope without inventing unverified interior partitions.',
    ],
  },
  {
    id: '6',
    shortLabel: '6',
    name: '6th Floor',
    subtitle: 'Therapeutic & Recreation Floor',
    areaSft: '8,100 SFT',
    targetPhase: 'Jan 27',
    status: 'confirmed',
    referenceImage:
      '/assets/building3d/sixth-floor.png',
    summaryPoints: [
      'Dining Space (120 P · Male & Female)',
      'Kitchen + Pantry & Service Area',
      'Sensory & Occupational Therapy',
      'Physiotherapy / Modern Gym Zone',
    ],
    rooms: [
      {
        id: '6-01',
        number: '01',
        name: 'Dining Space (120 P)',
        category: 'dining',
        labelPosition: [-3.5, 2.1, -4.4],
        notes: 'Long communal dining tables and glazed corridor bays along the north wing.',
      },
      {
        id: '6-02',
        number: '02',
        name: 'Kitchen + Pantry',
        category: 'dining',
        labelPosition: [9.8, 2.1, -7.2],
        notes: 'Commercial kitchen counters, prep islands & pass-through counter to Dining.',
      },
      {
        id: '6-03',
        number: '03',
        name: 'Sensory Integration Therapy',
        category: 'therapy',
        labelPosition: [-9.8, 2.1, 6.2],
        notes: 'Colorful alphanumeric tactile floor grid (1, 2, C, B, A, 0) & therapy balls.',
      },
      {
        id: '6-04',
        number: '04',
        name: 'Occupational Therapy',
        category: 'therapy',
        labelPosition: [-0.8, 2.1, 6.2],
        notes: 'Four octagonal activity tables on blue central rug with timber storage shelving.',
      },
      {
        id: '6-05',
        number: '05',
        name: 'Physiotherapy / Gym Zone',
        category: 'therapy',
        labelPosition: [10.4, 2.1, 6.4],
        notes: 'Rubber-floored gym with treadmills, bikes, strength racks & rehab mats.',
      },
      {
        id: '6-06',
        number: '06',
        name: 'AC Outdoor',
        category: 'service',
        labelPosition: [14.7, 2.0, -1.8],
        referenceMarkup: 'Outlined in red on 6th Floor reference sheet',
      },
      {
        id: '6-07',
        number: '07',
        name: 'Service Area',
        category: 'service',
        labelPosition: [14.7, 2.0, -5.2],
      },
      {
        id: '6-08',
        number: '08',
        name: 'Toilet',
        category: 'service',
        labelPosition: [14.3, 2.1, -9.1],
      },
      {
        id: '6-09',
        number: '09',
        name: 'Fire Stair',
        category: 'circulation',
        labelPosition: [11.1, 2.3, -2.0],
      },
      {
        id: '6-10',
        number: '10',
        name: 'Lift (4 Nos)',
        category: 'circulation',
        labelPosition: [7.4, 2.4, 5.1],
      },
      {
        id: '6-11',
        number: '11',
        name: 'Stair',
        category: 'circulation',
        labelPosition: [-0.6, 2.2, 1.1],
      },
      {
        id: '6-12',
        number: '12',
        name: 'Typical Floor Ramp',
        category: 'circulation',
        labelPosition: [-16.6, 1.6, 5.4],
      },
      {
        id: '6-13',
        number: '13',
        name: 'Reception',
        category: 'admin',
        labelPosition: [7.4, 2.1, -0.5],
      },
      {
        id: '6-14',
        number: '14',
        name: 'Circulation',
        category: 'circulation',
        labelPosition: [-8.5, 1.8, 1.2],
      },
    ],
  },
];

export const ARCHITECTURAL_AUDIT: ArchitecturalAuditEntry[] = [
  {
    category: 'Confirmed',
    title: 'Building Height & Program Stack (G+6)',
    detail:
      '7 levels total (Ground through 6th Floor) with phase milestones Dec 26 (GF), Jan 27 (2F–6F), Jun 27 (1F), and future master-plan capacity up to G+13.',
  },
  {
    category: 'Confirmed',
    title: 'Red Brick Facade & Recessed Green Balconies',
    detail:
      'Exposed warm red brick piers, 3 wide front recessed balcony bays with glass balustrades and hanging greenery, glazed ground colonnade, and stepped right flank windows.',
  },
  {
    category: 'Confirmed',
    title: 'Shared Vertical Cores & Asymmetric Footprint',
    detail:
      'Two 2-car lift shafts (4 Nos total), enclosed right-side fire stair, central double-flight sculptural stair, curved north-east corner, and west-side pedestrian ramp align vertically across Ground, 1st, 2nd, and 6th floors.',
  },
  {
    category: 'Confirmed',
    title: 'Documented Floor Plans (G, 1st, 2nd, 6th)',
    detail:
      'Complete room numbering, functional zoning, and furniture groupings are directly derived from the 4 axonometric sheets (6,175 SFT GF; 5,960 SFT 1F; 8,100 SFT 2F; 8,100 SFT 6F).',
  },
  {
    category: 'Assumed / Estimated',
    title: 'Exact Structural Grid & Floor-to-Floor Heights',
    detail:
      'Estimated from 2nd Floor room dimensions (12\'-1" to 13\'-4" × 15\'-0") as ~34m × 16.2–20.4m main slab, 4.6m Ground Floor height, 3.45m typical upper floor height, and 1.25m rooftop parapet (26.55m total).',
  },
  {
    category: 'Assumed / Estimated',
    title: 'Rear & West Exterior Elevations',
    detail:
      'Extrapolated from the window openings, veranda planters, and brick corner returns visible in the axonometric plans since only the front-right exterior perspective was supplied.',
  },
  {
    category: 'Missing Information & Assets',
    title: '3rd, 4th & 5th Floor Interior Plans',
    detail:
      'No axonometric or CAD drawings were supplied for 3F (11× Ty Accn), 4F (11× Indl Male Accn), or 5F (11× Indl Male Accn). Modeled strictly as structural placeholder envelopes.',
  },
  {
    category: 'Missing Information & Assets',
    title: 'Roof Plan, MEP & Custom 3D Equipment GLBs',
    detail:
      'Rooftop MEP/overruns, rear elevation drawings, CAD survey coordinates, and high-poly medical/gym GLB assets are not included in the reference packet.',
  },
];

export function getFloorById(id: FloorId): FloorSpec {
  return FLOORS_DATA.find((f) => f.id === id) ?? FLOORS_DATA[0];
}
