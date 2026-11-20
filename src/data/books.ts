export type ArcStage = {
  phase: string
  title: string
  text: string
}

export type CharacterNode = {
  name: string
  relation: string
  role: string
  x: number
  y: number
}

export type ThemeSpectrum = {
  label: string
  left: string
  right: string
  value: number
  note: string
}

export type Book = {
  id: string
  number: number
  title: string
  shortTitle: string
  year: number
  cover: string
  accent: string
  background: string
  logline: string
  synopsis: string
  readingQuestion: string
  arc: {
    title: string
    introduction: string
    stages: ArcStage[]
    insight: string
  }
  characters: {
    title: string
    introduction: string
    centerRole: string
    nodes: CharacterNode[]
    insight: string
  }
  themes: {
    title: string
    introduction: string
    spectra: ThemeSpectrum[]
    takeaway: string
    discussion: string
  }
}

export const lessonMeta = [
  { id: 'arc', label: 'Story arc', shortLabel: 'The journey', description: 'See how the plot turns.' },
  { id: 'characters', label: 'Character map', shortLabel: 'The people', description: 'Trace the relationships.' },
  { id: 'themes', label: 'Big ideas', shortLabel: 'The meaning', description: 'Read beneath the surface.' },
] as const

export type LessonId = (typeof lessonMeta)[number]['id']

export const books: Book[] = [
  {
    id: 'philosophers-stone',
    number: 1,
    title: "Harry Potter and the Philosopher's Stone",
    shortTitle: "Philosopher's Stone",
    year: 1997,
    cover: './covers/book-1.webp',
    accent: '#DFC78E',
    background: '#201819',
    logline: 'Every world begins with a door.',
    synopsis:
      'An orphaned boy who has been taught to make himself small discovers an entire world where he belongs. His first year at Hogwarts becomes a lesson in friendship, courage, and the difference between wanting something and needing it.',
    readingQuestion: 'Is Harry heroic because of his destiny—or because of the choices he makes?',
    arc: {
      title: 'The architecture of belonging',
      introduction:
        'The first book moves through a classic threshold narrative: exclusion, invitation, initiation, and a test that turns a newcomer into a moral agent.',
      stages: [
        {
          phase: 'Before',
          title: 'A life without a place',
          text: 'Harry’s cupboard is more than a setting. It establishes invisibility as his normal state.',
        },
        {
          phase: 'Threshold',
          title: 'The invitation arrives',
          text: 'Hagrid does not merely deliver a letter; he restores a history the Dursleys tried to erase.',
        },
        {
          phase: 'Belonging',
          title: 'A found family forms',
          text: 'Ron offers loyalty, Hermione offers rigour, and Hogwarts gives Harry a social identity.',
        },
        {
          phase: 'Test',
          title: 'Desire becomes a choice',
          text: 'The Mirror and the Stone test motive. Harry succeeds because he seeks protection, not possession.',
        },
      ],
      insight:
        'The magical plot and the emotional plot solve the same problem: Harry moves from being defined by neglect to defining himself through attachment and choice.',
    },
    characters: {
      title: 'A hero assembled by relationships',
      introduction:
        'Harry is not self-sufficient. Each central relationship supplies something his childhood denied him: knowledge, loyalty, guidance, belonging, or opposition.',
      centerRole: 'The newcomer learning who to become',
      nodes: [
        { name: 'Ron', relation: 'Loyalty', role: 'Makes belonging ordinary', x: 16, y: 27 },
        { name: 'Hermione', relation: 'Reason', role: 'Turns curiosity into method', x: 82, y: 25 },
        { name: 'Hagrid', relation: 'Initiation', role: 'Opens the hidden world', x: 13, y: 74 },
        { name: 'Dumbledore', relation: 'Guidance', role: 'Names the moral lesson', x: 84, y: 74 },
        { name: 'Voldemort', relation: 'Opposition', role: 'Power without attachment', x: 50, y: 91 },
      ],
      insight:
        'Voldemort is Harry’s structural opposite: both are marked by the past, but one moves toward relationships while the other treats others as instruments.',
    },
    themes: {
      title: 'What makes a person who they are?',
      introduction:
        'The book repeatedly places inherited identity beside chosen behaviour. The further the marker sits to the right, the more strongly the story privileges that side.',
      spectra: [
        { label: 'Identity', left: 'Bloodline', right: 'Choice', value: 84, note: 'Harry’s heritage explains his past, not his character.' },
        { label: 'Strength', left: 'Isolation', right: 'Friendship', value: 90, note: 'The final obstacle is overcome through complementary strengths.' },
        { label: 'Desire', left: 'Possession', right: 'Purpose', value: 78, note: 'The Stone rewards a motive rather than raw ability.' },
      ],
      takeaway:
        'The first novel’s deepest spell is redefinition: the child who was told he was nobody learns that worth is built through love, courage, and deliberate action.',
      discussion: 'Which moment changes Harry more: learning that he is a wizard, or choosing to protect the Stone?',
    },
  },
  {
    id: 'chamber-of-secrets',
    number: 2,
    title: 'Harry Potter and the Chamber of Secrets',
    shortTitle: 'Chamber of Secrets',
    year: 1998,
    cover: './covers/book-2.webp',
    accent: '#EBADCB',
    background: '#4D1A28',
    logline: 'The past speaks through the walls.',
    synopsis:
      'A hidden chamber, a voice only Harry can hear, and a school turning against itself. The second adventure asks whether identity is inherited—and how easily fear becomes prejudice.',
    readingQuestion: 'When a community is afraid, who gets treated as the enemy?',
    arc: {
      title: 'A mystery built from misdirection',
      introduction:
        'The plot repeatedly converts incomplete evidence into public certainty. Harry’s private discoveries must overturn the school’s collective story.',
      stages: [
        { phase: 'Signal', title: 'Warnings without context', text: 'Dobby’s interference and the whispering wall create danger before Harry can interpret it.' },
        { phase: 'Suspicion', title: 'Evidence becomes accusation', text: 'Parseltongue makes Harry legible to others as the heir, whatever his intentions.' },
        { phase: 'Descent', title: 'The hidden story surfaces', text: 'The diary reveals a manufactured memory, while Ginny’s absence exposes its human cost.' },
        { phase: 'Proof', title: 'Loyalty answers identity', text: 'The sword and Fawkes arrive through allegiance; Tom Riddle’s claimed superiority collapses.' },
      ],
      insight:
        'The Chamber is both a literal buried space and a model of prejudice: an old ideology survives by hiding inside institutions, objects, and inherited stories.',
    },
    characters: {
      title: 'The battle over Harry’s identity',
      introduction:
        'This network is organised around interpretation. Some characters see Harry as a friend, others as a suspect, and Tom Riddle tries to turn similarity into destiny.',
      centerRole: 'The suspect who must define himself',
      nodes: [
        { name: 'Ginny', relation: 'Vulnerability', role: 'The hidden victim', x: 16, y: 25 },
        { name: 'Tom Riddle', relation: 'False mirror', role: 'Claims likeness means fate', x: 82, y: 23 },
        { name: 'Dobby', relation: 'Warning', role: 'Protection without freedom', x: 13, y: 73 },
        { name: 'Hermione', relation: 'Evidence', role: 'Solves the creature puzzle', x: 84, y: 73 },
        { name: 'Dumbledore', relation: 'Trust', role: 'Separates choice from origin', x: 50, y: 91 },
      ],
      insight:
        'Riddle’s diary weaponises trust. The book pairs that manipulation with its antidote: Hermione’s patient research and Harry’s freely given loyalty.',
    },
    themes: {
      title: 'The politics of purity',
      introduction:
        'The mystery exposes how a community sorts people into pure and impure, native and outsider, credible and suspicious.',
      spectra: [
        { label: 'Belonging', left: 'Ancestry', right: 'Conduct', value: 88, note: 'The heir’s ideology is answered by chosen loyalty.' },
        { label: 'Fear', left: 'Inquiry', right: 'Scapegoating', value: 78, note: 'Petrifaction makes the school eager for a simple culprit.' },
        { label: 'Memory', left: 'Testimony', right: 'Manipulation', value: 82, note: 'The diary is evidence designed to control its reader.' },
      ],
      takeaway:
        'The story separates resemblance from allegiance. Harry may share a gift with Riddle, but his institutions of meaning—friends, school, promises—are entirely different.',
      discussion: 'Why is the diary such an effective villain: because it lies, or because it first earns trust?',
    },
  },
  {
    id: 'prisoner-of-azkaban',
    number: 3,
    title: 'Harry Potter and the Prisoner of Azkaban',
    shortTitle: 'Prisoner of Azkaban',
    year: 1999,
    cover: './covers/book-3.webp',
    accent: '#D0D1D4',
    background: '#0d121f',
    logline: 'Fear changes shape when the truth appears.',
    synopsis:
      'An escaped prisoner, creatures that feed on despair, and a friendship shattered years earlier. Harry’s third year turns a pursuit story into an investigation of fear, justice, and unreliable appearances.',
    readingQuestion: 'What changes when we respond to fear with understanding instead of force?',
    arc: {
      title: 'The story that turns around',
      introduction:
        'Azkaban first teaches the reader a simple arrangement of hunter and hunted, then rotates every major element until the apparent threat becomes the person most wronged.',
      stages: [
        { phase: 'Threat', title: 'The escaped prisoner', text: 'Sirius Black enters the story as a ready-made explanation for public fear.' },
        { phase: 'Pressure', title: 'The past closes in', text: 'Dementors make terror bodily, while fragments about Harry’s parents make it personal.' },
        { phase: 'Reversal', title: 'The shack reframes everything', text: 'A rat, a map, and conflicting testimonies replace legend with evidence.' },
        { phase: 'Release', title: 'Time creates a second chance', text: 'The rescue does not erase injustice, but it prevents despair from having the final word.' },
      ],
      insight:
        'The Time-Turner is a narrative device with an ethical limit: Hermione and Harry can alter events, but only by acting with discipline inside responsibilities they already carry.',
    },
    characters: {
      title: 'A network of mistaken appearances',
      introduction:
        'Almost every relationship changes when more context arrives. The map rewards the reader who revises judgement without abandoning discernment.',
      centerRole: 'The son searching for a truthful past',
      nodes: [
        { name: 'Sirius', relation: 'Recognition', role: 'From monster to godfather', x: 15, y: 25 },
        { name: 'Lupin', relation: 'Mentorship', role: 'Teaches courage as practice', x: 82, y: 24 },
        { name: 'Pettigrew', relation: 'Betrayal', role: 'The threat inside the familiar', x: 14, y: 74 },
        { name: 'Hermione', relation: 'Method', role: 'Time, logic, and restraint', x: 84, y: 73 },
        { name: 'Snape', relation: 'Grievance', role: 'History distorts judgement', x: 50, y: 91 },
      ],
      insight:
        'The Patronus turns the emotional structure into magic: protection comes not from denying pain, but from holding a sustaining memory firmly enough to act.',
    },
    themes: {
      title: 'Learning to meet the darkness',
      introduction:
        'The novel distinguishes enemies from fears and punishment from justice. Its most important victories happen when a character sees more accurately.',
      spectra: [
        { label: 'Fear', left: 'Avoidance', right: 'Understanding', value: 91, note: 'The Boggart and Patronus lessons make inner life workable.' },
        { label: 'Justice', left: 'Revenge', right: 'Mercy', value: 73, note: 'Harry refuses to make Sirius and Lupin killers for his sake.' },
        { label: 'Appearance', left: 'Certainty', right: 'Revision', value: 87, note: 'The plot’s central skill is changing one’s mind with evidence.' },
      ],
      takeaway:
        'Maturity here is not fearlessness. It is the capacity to name fear, seek context, and still choose an action that does not reproduce the original harm.',
      discussion: 'Which is harder in this book: discovering the truth, or accepting that truth will not immediately repair everything?',
    },
  },
  {
    id: 'goblet-of-fire',
    number: 4,
    title: 'Harry Potter and the Goblet of Fire',
    shortTitle: 'Goblet of Fire',
    year: 2000,
    cover: './covers/book-4.webp',
    accent: '#E5ECFF',
    background: '#033399',
    logline: 'The spectacle ends. The war begins.',
    synopsis:
      'A tournament promises glory but conceals a trap. As the wizarding world widens, Harry confronts manipulation, public scrutiny, and a return that the authorities will struggle to accept.',
    readingQuestion: 'What does courage look like when the challenge has been rigged?',
    arc: {
      title: 'The competition that conceals a machine',
      introduction:
        'The three tasks provide a visible structure of fair contest while an invisible structure moves Harry toward a predetermined destination.',
      stages: [
        { phase: 'Frame', title: 'The rules are announced', text: 'Age limits, impartial selection, and inter-school ritual promise a controlled game.' },
        { phase: 'Ordeal', title: 'Three tests of nerve', text: 'Dragon, lake, and maze test different forms of courage while straining friendship.' },
        { phase: 'Trap', title: 'The maze becomes a graveyard', text: 'The Cup’s transformation reveals that the entire spectacle was an instrument.' },
        { phase: 'Aftermath', title: 'Truth meets denial', text: 'Harry returns with Cedric and a warning, but official comfort resists both.' },
      ],
      insight:
        'Cedric’s death changes the genre contract. School adventure does not simply become darker; the cost of being watched, managed, and disbelieved becomes permanent.',
    },
    characters: {
      title: 'Trust inside a rigged contest',
      introduction:
        'The character map is organised by what each person does to Harry’s agency: some enlarge it, some doubt it, and one covertly directs it.',
      centerRole: 'The unwilling champion',
      nodes: [
        { name: 'Cedric', relation: 'Fairness', role: 'Rivalry without dehumanisation', x: 15, y: 25 },
        { name: '“Moody”', relation: 'Manipulation', role: 'Help that conceals control', x: 82, y: 24 },
        { name: 'Ron', relation: 'Friction', role: 'Friendship under comparison', x: 14, y: 74 },
        { name: 'Hermione', relation: 'Investigation', role: 'Sees systems behind gossip', x: 84, y: 73 },
        { name: 'Voldemort', relation: 'Instrument', role: 'Turns Harry into a means', x: 50, y: 91 },
      ],
      insight:
        'Harry and Cedric’s decision to share the Cup is the tournament’s last free act. Its corruption into a portkey makes generosity the doorway into horror.',
    },
    themes: {
      title: 'When institutions fail the truth',
      introduction:
        'The book examines spectacle, fairness, and denial. The issue is no longer simply defeating a villain but being believed afterward.',
      spectra: [
        { label: 'Competition', left: 'Fair play', right: 'Hidden control', value: 84, note: 'The apparent rules mask a single orchestrated outcome.' },
        { label: 'Courage', left: 'Glory', right: 'Responsibility', value: 89, note: 'Bringing Cedric home matters more than winning.' },
        { label: 'Authority', left: 'Comfort', right: 'Reality', value: 76, note: 'The first institutional response is to contain the story.' },
      ],
      takeaway:
        'The climax turns witness into a moral duty. Harry cannot prevent the return, but he can refuse to let Cedric’s death or Voldemort’s return be made meaningless.',
      discussion: 'Why is bringing Cedric’s body back one of Harry’s most important acts in the entire series?',
    },
  },
  {
    id: 'order-of-the-phoenix',
    number: 5,
    title: 'Harry Potter and the Order of the Phoenix',
    shortTitle: 'Order of the Phoenix',
    year: 2003,
    cover: './covers/book-5.webp',
    accent: '#DFC78E',
    background: '#201819',
    logline: 'When truth is managed, learning becomes resistance.',
    synopsis:
      'The Ministry denies Voldemort’s return, Hogwarts falls under authoritarian control, and Harry’s anger isolates him. In response, students build a community capable of learning what power refuses to teach.',
    readingQuestion: 'How can people resist a system that controls both information and education?',
    arc: {
      title: 'From isolation to collective action',
      introduction:
        'The book’s emotional movement runs opposite to its political movement: official control tightens while students quietly build a counter-institution.',
      stages: [
        { phase: 'Silence', title: 'A summer without information', text: 'Harry’s anger grows in the gap between what he knows and what others will acknowledge.' },
        { phase: 'Control', title: 'Education becomes compliance', text: 'Umbridge removes practice, punishes testimony, and turns rules into domination.' },
        { phase: 'Solidarity', title: 'Dumbledore’s Army forms', text: 'Shared practice converts frightened individuals into a capable learning community.' },
        { phase: 'Rupture', title: 'The battle leaves a wound', text: 'The Ministry sees the truth, but Sirius’s death prevents vindication from becoming relief.' },
      ],
      insight:
        'Dumbledore’s Army succeeds because learning is distributed. Harry teaches, but the members become agents rather than an audience for a gifted hero.',
    },
    characters: {
      title: 'Connection against control',
      introduction:
        'Harry’s central conflict is relational: isolation makes him governable by grief and manipulation, while honest connection restores perspective.',
      centerRole: 'The witness struggling with anger',
      nodes: [
        { name: 'Hermione', relation: 'Organisation', role: 'Turns dissent into structure', x: 15, y: 25 },
        { name: 'Umbridge', relation: 'Control', role: 'Order without justice', x: 82, y: 24 },
        { name: 'Luna', relation: 'Perspective', role: 'Names grief without fear', x: 14, y: 74 },
        { name: 'Sirius', relation: 'Attachment', role: 'Family shadowed by confinement', x: 84, y: 73 },
        { name: 'Snape', relation: 'Exposure', role: 'Lessons poisoned by old wounds', x: 50, y: 91 },
      ],
      insight:
        'Luna and Umbridge offer opposite responses to difference. Luna makes room for experience; Umbridge makes difference punishable.',
    },
    themes: {
      title: 'Power decides what counts as real',
      introduction:
        'Propaganda, disciplinary rules, and classroom control all target the same capacity: people’s ability to trust their own experience and act together.',
      spectra: [
        { label: 'Truth', left: 'Official narrative', right: 'Lived evidence', value: 86, note: 'The paper and Ministry define credibility against Harry.' },
        { label: 'Learning', left: 'Compliance', right: 'Practice', value: 93, note: 'Real defence requires participation and shared risk.' },
        { label: 'Anger', left: 'Isolation', right: 'Connection', value: 69, note: 'Grief becomes more dangerous when it cannot be spoken.' },
      ],
      takeaway:
        'Resistance begins as pedagogy. Students reclaim agency by practising together, sharing knowledge, and refusing the idea that authority is the same as truth.',
      discussion: 'Why is Umbridge often more disturbing than Voldemort: her cruelty, her methods, or her official legitimacy?',
    },
  },
  {
    id: 'half-blood-prince',
    number: 6,
    title: 'Harry Potter and the Half-Blood Prince',
    shortTitle: 'Half-Blood Prince',
    year: 2005,
    cover: './covers/book-6.webp',
    accent: '#EBADCB',
    background: '#4D1A28',
    logline: 'Every secret has a cost.',
    synopsis:
      'Harry studies Voldemort’s past through memories while relying on a textbook filled with another person’s brilliance. The sixth book is an investigation into hidden histories—and the danger of partial trust.',
    readingQuestion: 'When does keeping a secret protect someone, and when does it merely remove their ability to choose?',
    arc: {
      title: 'An investigation inside a tragedy',
      introduction:
        'Two hidden identities structure the book: the unknown Prince and the fragmented history of Tom Riddle. One seduces; the other must be reconstructed.',
      stages: [
        { phase: 'Inheritance', title: 'The annotated textbook', text: 'The Prince offers borrowed mastery before Harry knows whose judgement he trusts.' },
        { phase: 'Reconstruction', title: 'Memories become evidence', text: 'Dumbledore and Harry assemble objects, places, and attachments into a pattern.' },
        { phase: 'Descent', title: 'The cave reveals the price', text: 'Retrieving the locket requires voluntary suffering rather than superior force.' },
        { phase: 'Loss', title: 'The tower removes the guide', text: 'Dumbledore’s death leaves Harry with knowledge, responsibility, and no safety net.' },
      ],
      insight:
        'Dumbledore’s lessons are not background exposition. They transfer the work of interpretation to Harry, preparing him to continue without Dumbledore.',
    },
    characters: {
      title: 'The ethics of concealed selves',
      introduction:
        'The map is full of divided identities and incomplete information. The reader must distinguish secrecy used for care from secrecy used for control.',
      centerRole: 'The apprentice learning to interpret',
      nodes: [
        { name: 'Dumbledore', relation: 'Inquiry', role: 'Teacher and hidden strategist', x: 15, y: 25 },
        { name: 'Snape', relation: 'Ambiguity', role: 'The Prince behind the margin notes', x: 82, y: 24 },
        { name: 'Draco', relation: 'Pressure', role: 'A mission masking desperation', x: 14, y: 74 },
        { name: 'Slughorn', relation: 'Memory', role: 'Shame withholds the key evidence', x: 84, y: 73 },
        { name: 'Voldemort', relation: 'Pattern', role: 'A past constructed to avoid love', x: 50, y: 91 },
      ],
      insight:
        'Harry’s compassion for Draco and Voldemort’s refusal of connection matter together: understanding a person’s history need not excuse what they choose.',
    },
    themes: {
      title: 'Love, secrecy, and the hunger for invulnerability',
      introduction:
        'The book’s magical objects preserve pieces of life, but its moral question is whether escaping vulnerability is worth destroying the self.',
      spectra: [
        { label: 'Knowledge', left: 'Borrowed trust', right: 'Tested evidence', value: 74, note: 'The textbook is useful before its guidance becomes suspect.' },
        { label: 'Power', left: 'Attachment', right: 'Invulnerability', value: 88, note: 'Horcruxes trade wholeness for continued existence.' },
        { label: 'Protection', left: 'Transparency', right: 'Secrecy', value: 70, note: 'Dumbledore’s restraint protects a plan but burdens others.' },
      ],
      takeaway:
        'Voldemort’s deepest weakness is not missing information but a model of life in which dependence is intolerable. Harry survives through precisely the attachments he rejects.',
      discussion: 'Does Dumbledore’s secrecy make his mentorship more effective, or does it deny Harry necessary agency?',
    },
  },
  {
    id: 'deathly-hallows',
    number: 7,
    title: 'Harry Potter and the Deathly Hallows',
    shortTitle: 'Deathly Hallows',
    year: 2007,
    cover: './covers/book-7.webp',
    accent: '#D0D1D4',
    background: '#0d121f',
    logline: 'The final power is knowing what to let go.',
    synopsis:
      'Beyond Hogwarts, Harry, Ron, and Hermione hunt the fragments of Voldemort’s power while a second path—the Deathly Hallows—offers mastery over death itself. The finale turns victory into a problem of attention, trust, and renunciation.',
    readingQuestion: 'What is the difference between defeating death and accepting mortality?',
    arc: {
      title: 'Two quests compete for the hero',
      introduction:
        'The finale is built around a choice of frameworks: destroy Voldemort’s anchors through patient solidarity, or pursue objects that promise personal mastery.',
      stages: [
        { phase: 'Exile', title: 'The familiar structure disappears', text: 'Without school or a safe home, the trio must sustain purpose without an institution.' },
        { phase: 'Strain', title: 'The mission tests attachment', text: 'Fear, scarcity, and the locket magnify doubt until loyalty itself becomes difficult.' },
        { phase: 'Temptation', title: 'The Hallows offer another answer', text: 'The Elder Wand, Resurrection Stone, and Cloak redirect grief into a dream of mastery.' },
        { phase: 'Release', title: 'The hero walks into the forest', text: 'Harry accepts mortality, then rejects the wand’s logic rather than inheriting it.' },
      ],
      insight:
        'The Horcrux hunt and the Hallows quest are opposite technologies: one requires shared sacrifice to end domination; the other tempts an individual to rise above every limit.',
    },
    characters: {
      title: 'What remains when certainty disappears',
      introduction:
        'With Dumbledore dead and the Ministry captured, relationships carry the moral structure. Doubt becomes unavoidable; returning and repairing become decisive.',
      centerRole: 'The leader who must accept limits',
      nodes: [
        { name: 'Hermione', relation: 'Continuity', role: 'Preparation becomes survival', x: 15, y: 25 },
        { name: 'Ron', relation: 'Return', role: 'Doubt answered by renewed loyalty', x: 82, y: 24 },
        { name: 'Snape', relation: 'Revelation', role: 'A life reinterpreted through love', x: 14, y: 74 },
        { name: 'Dumbledore', relation: 'Reckoning', role: 'The guide becomes fallible', x: 84, y: 73 },
        { name: 'Voldemort', relation: 'Refusal', role: 'Power used to deny mortality', x: 50, y: 91 },
      ],
      insight:
        'Harry’s maturity is visible in what he can hold together: Dumbledore’s love and failures, Snape’s harm and courage, his own fear and responsibility.',
    },
    themes: {
      title: 'Mastery or acceptance?',
      introduction:
        'The last book does not romanticise death. It distinguishes love’s willingness to face loss from power’s attempt to make loss impossible.',
      spectra: [
        { label: 'Mortality', left: 'Mastery', right: 'Acceptance', value: 94, note: 'The Hallows promise control; Harry chooses a finite human life.' },
        { label: 'Loyalty', left: 'Certainty', right: 'Return', value: 81, note: 'Ron’s return makes loyalty a practice rather than perfection.' },
        { label: 'Power', left: 'Domination', right: 'Renunciation', value: 92, note: 'The Elder Wand is defeated when its inheritance is refused.' },
      ],
      takeaway:
        'The series closes by rejecting the desire that created its villain. Harry remains vulnerable, mortal, and connected—and therefore capable of a peace Voldemort cannot imagine.',
      discussion: 'Why is Harry’s decision about the Elder Wand as important as his confrontation with Voldemort?',
    },
  },
]

export const getBook = (id: string) => books.find((book) => book.id === id)
