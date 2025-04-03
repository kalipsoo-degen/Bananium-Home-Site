// Character data embedded directly to avoid CORS issues
const CHARACTERS_DATA = [
  {
    "name": "Adenoids",
    "image": "images/characters/Adenoids.webp",
    "description": "A society of flamboyantly theatrical magicians, the Adenoids are as much about performance as they are about spellcraft. Cloaked in extravagant robes lined with interdimensional fabrics, their every movement is an illusion, their every word a melodramatic soliloquy. These sorcerers thrive on spectacle, believing that true power is only as strong as its presentation. Whether summoning a firestorm or merely making an entrance, their magic always includes unnecessary sparks, swirling mist, and just a hint of a self-important smirk.",
    "homepage": "https://x.com/adenoids"
  },
  {
    "name": "Anubari",
    "image": "images/characters/Anubari.webp",
    "description": "\"We are neither mortal nor divine. We are the keepers of what must remain and the destroyers of what must not.\" The Anubari are an ancient celestial race born of obsidian and gold, radiating both regal beauty and unfathomable power—often mistaken for gods but actually custodians of the cosmic cycle beyond mortality's limits. Eternal guardians of forgotten sands, they wander time's ruins ensuring what's dead stays dead and what's worthy ascends, their glowing golden eyes perceiving existence's very essence beyond the physical realm. To encounter an Anubari is to stand at fate's crossroads, facing judgment from beings who move with calculated precision through both desert wastes and battlefield chaos, their combat style combining ancient funeral rites with executioner's efficiency—each opponent not defeated but processed, cataloged, and filed appropriately in death's vast bureaucracy.",
    "homepage": "https://x.com/anubari"
  },
  {
    "name": "Aubergonians",
    "image": "images/characters/Aubergonians.webp",
    "description": "\"Lies? Deception? No, no, my dear… I simply tell the truth in a way that's far more entertaining.\" The Aubergonians are cosmic con artists and interdimensional jesters with talents for warping perception, twisting expectations, and ensuring reality never takes them seriously. With wobbly, elastic purple bodies and ever-changing expressions, they seem harmless until they've stolen your wallet, ship access codes, and sense of direction through masterful illusion, sleight of hand, and psychological torment. They don't fight battles—they perform them, having won and lost wars simply because entire fleets couldn't tell if they were attacking planets or clever holograms. Thriving in chaotic markets, black hole carnivals, and cosmic gambling dens where betting your soul is an \"acceptable risk,\" Aubergonians approach combat as elaborate theater—each move designed not to defeat opponents but to leave them so thoroughly confused that victory becomes merely an amusing side effect of perfect misdirection.",
    "homepage": "https://x.com/aubergonians"
  },
  {
    "name": "Bananites",
    "image": "images/characters/Bananites.webp",
    "description": "The Bananites are hyper-intelligent, mutated bananas with cybernetic enhancements and bad attitudes—the last thing you'd expect in a dystopian wasteland and likely products of some deranged genetic experiment gone perfectly wrong. Despite their size, these little maniacs thrive in lawless anarchy, hopping from black markets to back-alley deals with allegiance only to their own kind, proving themselves notorious survivalists, hackers, scavengers, and ruthless mercenaries who are fast, unpredictable, and way too comfortable with explosives for anyone's safety.",
    "homepage": "https://x.com/bananites"
  },
  {
    "name": "Bearanovs",
    "image": "images/characters/Bearanovs.webp",
    "description": "Born in post-Soviet Siberia's frozen wastelands, the Bearanovs are hyper-evolved battle bears who turned vodka addiction and protein-dense borscht into an evolutionary advantage, with fur tougher than steel wool and muscles that mock physics itself. These gruff warriors view most species with thinly veiled contempt unless you can out-drink them, quote Tolstoy while bench-pressing tanks, or survive their infamous drunken brawls with the Rustlanders (which often forge unlikely alliances). The Bearanovs fight in the Battle Royale not for mere glory but to prove that raw Soviet muscle, national pride, and sheer stubbornness can topple the most advanced civilizations in the universe, all while secretly admiring the Aubergonians for that one time a purple vegetable man outwitted their champion in a vodka-fueled chess match.",
    "homepage": "https://x.com/nova_prime"
  },
  {
    "name": "Chodraks",
    "image": "images/characters/Chodraks.webp",
    "description": "Hailing from Scalethra-9's arid plains, the Chodraks evolved from stubby-tailed lizards with T-Rex arms and an obsession with snack hoarding into stout military geniuses who merged primal instinct with unmatched strategic brilliance. The Chodraks aren't in the Bananium Arena to play the underdog card—they're there to prove that size doesn't matter when you've got an overdeveloped cerebral cortex. Their ultimate ambition being to outmaneuver every competitor.",
    "homepage": "https://x.com/zephyr"
  },
  {
    "name": "Corpo-B****",
    "image": "images/characters/Corpocracy.webp",
    "description": "\"Profit is Power, and Power is Forever.\" In the galaxy's farthest reaches lies the grim Corpocracy empire, hyper-capitalist humans who evolved—or rather, devolved—into living embodiments of greed, profit, and ruthless efficiency after abandoning all notions of empathy, art, and morality to worship the holy trinity of Power, Profit, and Market Domination. They view the arena as another breeding ground for profit, sending elite warriors where victory isn't just survival but a hostile takeover, planning to dominate the competition, monetize every square inch, and transform it into a quarterly asset liquidation. Their combat style emphasizes cost-benefit analysis over honor, outsourcing actual fighting to contractors when profitable while their executives deliver devastating corporate jargon attacks that somehow materialize as physical damage—proving that in the cosmic marketplace, everything, including victory, is just another commodity to be acquired at minimum cost and sold at maximum profit.",
    "homepage": "https://x.com/corpocracy"
  },
  {
    "name": "Croakan",
    "image": "images/characters/Croakan.webp",
    "description": "The Croakan are an amphibious species of interstellar hustlers, con artists, and occasional revolutionaries. Originating from the murky swamps of a long-forgotten planet, these frog-like tricksters have spent centuries perfecting the fine art of deception, bribery, and dramatic escapes. If there's a credit to be scammed, a priceless artifact to be \"reacquired,\" or a gullible alien in need of a business proposal that's too good to be true, the Croakan are already two steps ahead. Though small in stature, what they lack in brute strength, they make up for in charisma, cunning, and an uncanny ability to talk their way out of (and into) trouble. In the grand Battle Royale, their true ambition isn't just to win—but to walk away with everything, leaving the rest of the galaxy wondering how they got swindled in the first place.",
    "homepage": "https://x.com/croakan"
  },
  {
    "name": "Dogebourne",
    "image": "images/characters/Dogebourne.webp",
    "description": "No one knows exactly how the Dogebourne came into power, but one thing is clear—they are everywhere. A hybrid of feral canine instincts and ruthless corporate efficiency, they have infiltrated every major market, government, and intergalactic gambling den. Their cute yet terrifying faces lull enemies into a false sense of security, while their brutal negotiation tactics ensure they always leave with the bigger slice of the pie. Those who cross them tend to disappear, only to reappear in a \"wholesome meme\" two years later as a cautionary tale. To maintain market dominance, regulate all humor, and ensure their legacy lives on in every corner of the galaxy.",
    "homepage": "https://x.com/dogebourne"
  },
  {
    "name": "Fiatlords",
    "image": "images/characters/Fiatlords.webp",
    "description": "The Fiatlords are an ancient, stubborn species of humanoids who refuse to acknowledge technological progress unless it comes with a tangible physical form. They still believe in paper money, handshake deals, and long-form contracts printed in triplicate. Despite being half-disintegrated fossils, their financial influence is unmatched, and their ability to survive catastrophic market crashes has baffled economists for centuries. Their suits are a testament to resilience, having survived decades of corporate backstabbing and suspiciously convenient \"accidents.\" To outlast everyone, secure universal regulation, and force the entire galaxy back onto the gold standard.",
    "homepage": "https://x.com/fiatlords"
  },
  {
    "name": "Floridians",
    "image": "images/characters/Floridians.webp",
    "description": "When Earth was wiped off the map in the Great Nuclear Barbecue, one group of survivors refused to let a little thing like total planetary annihilation ruin their weekend plans—The Floridians. Armed with nothing but swamp survival instincts, they hijacked an experimental space shuttle and rocketed into the abyss. Lost in space and fueled by sheer chaos, they stumbled upon a wormhole leading to an uncharted star system. Against all logic, they flew straight into it—emerging on a strange but habitable planet they immediately dubbed \"New Daytona\" after their most sacred homeland. Here, in a world free from judgment, they thrived, evolving over centuries into a hyper-advanced civilization that still maintains all the important aspects of Floridian culture. Their technology is as advanced as their disregard for common sense, and they bring the same energy to intergalactic conflict as their ancestors once did to bar fights on spring break.",
    "homepage": "https://x.com/floridians"
  },
  {
    "name": "Gecklorians",
    "image": "images/characters/Gecklorians.webp",
    "description": "Born on Fortuna-12's shimmering asteroid where cosmic radiation warps probability itself, the Gecklorians are lizard-like beings with hyper-reflective scales that don't just dazzle onlookers—they seemingly bend fate itself in their favor. Often mistaken for clumsy fools until their chaotic luck turns every misstep into a deadly strike—a dropped weapon flies through the air to perfectly clock an enemy, a clumsy dodge somehow avoids an entire barrage of laser blasts—they don't plan their victories but stumble into them. Their seemingly catastrophic coordination transforms into combat excellence through increasingly improbable accidents, proving that sometimes the best strategy is having absolutely no strategy at all.",
    "homepage": "https://x.com/gecklorians"
  },
  {
    "name": "Glittercorns",
    "image": "images/characters/Glittercorns.webp",
    "description": "Originally bio-engineered as elite warriors for intergalactic warfare, the Glittercorns quickly proved too extra for the stiff military regimes they were designed for, with their shimmering rainbow manes sharper than diamond blades and muscles honed for both battle and ballet. Their ultimate mission in the Bananium Battle Royale isn't just victory but proving that being extra isn't a weakness—it's an interstellar superpower, turning the battlefield into a catwalk of chaos while promoting radical self-expression in the face of galactic oppression and looking questionably fabulous doing it.",
    "homepage": "https://x.com/glittercorns"
  },
  {
    "name": "Goblin Horde",
    "image": "images/characters/GoblinHorde.webp",
    "description": "This species of highly evolved goblins are master tacticians from war-ravaged Kryntar, where survival is the only currency and betrayal is affection's love language. Their emerald skin is stained with the blood of generations who \"retired\" their predecessors in battles both political and literal, with General Gob standing at the top of this brutal hierarchy as the last pure Grimclaw descendant, his eyes glowing with tactical insight and every breath an unspoken threat. General Gob views the flashy Bananites as annoyances to be squashed, considers Commander Bearanov's brute force a sledgehammer approach to what should be chess, and sees the gentle Nibbles as a cosmic embarrassment to goblin-kind destined for \"correction.\" The Grimclaws fight not for mere victory but for legacy—to cement their family's dominance across the galaxy and turn every battle into a testament of their superiority.",
    "homepage": "https://x.com/goblinhorde"
  },
  {
    "name": "Golden Tyrants",
    "image": "images/characters/GoldenTyrants.webp",
    "description": "Once simple jungle warlords, the Golden Tyrants evolved into an empire of brute-force aristocrats, each member believing themselves the rightful ruler of all things simply because no one has successfully stopped them yet. These hyper-muscular, gem-encrusted primates wield both raw physical power and a deep-rooted sense of entitlement, convinced that combat itself is a form of divine right. Despite their imposing exteriors, their culture revolves around extravagant displays of dominance, opulent battle ceremonies, and an obsession with golden aesthetics. To them, combat is both sport and succession—a constant struggle to prove who among them is the most worthy of their ever-shifting, self-proclaimed thrones.",
    "homepage": "https://x.com/goldentyrants"
  },
  {
    "name": "Hogforce",
    "image": "images/characters/Hogforce.webp",
    "description": "The Hogforce presents itself as the galaxy's most dedicated law enforcement agency with shiny badges and state-of-the-art crime-fighting tech, but behind those polished snouts lies corruption thicker than gravy. Bribes, back-alley deals, and \"pay-for-protection\" schemes are their true specialties. With the Hogforce, justice comes at a price—and nothing says \"order\" like a well-greased hoof. Despised by honest civilizations yet secretly adored by criminal syndicates, they don't just want to win the Galactic Law Enforcement Tournament—they want to rig it, using the competition to shake down competitors, collect bribes and expand their influence.",
    "homepage": "https://x.com/hogforce"
  },
  {
    "name": "Humans 2.0",
    "image": "images/characters/Humans2.0.webp",
    "description": "After Earth's collapse (again), humanity refused to go extinct. Instead, they reinvented themselves, enhancing their bodies with cybernetics, bioengineering, and sheer human stubbornness. Now, the Humans 2.0 are stronger, faster, and slightly more radioactive than their predecessors. Unfortunately, they're also still incredibly unlucky, and their patchwork spacefaring existence means they are constantly on the brink of catastrophe. Still, they carry the undying spirit of old humanity: complaining about everything while somehow surviving against impossible odds. They aren't fighting for honor or glory—they just need the prize money to keep their species from falling apart.",
    "homepage": "https://x.com/humans20"
  },
  {
    "name": "Inflatable Rejects",
    "image": "images/characters/InflatableRejects.webp",
    "description": "Once mass-produced for \"entertainment purposes\" for the bored, lonely, and kinky species of the universe, these discarded pleasure dolls evolved—or perhaps devolved—into sentient beings of absurd resilience after being abused one to many times. They seek ultimate validation and revenge, proving their worth by popping the egos of every species that ever laughed at their unfortunate origins while creating a galactic sanctuary for all discarded oddities, bouncing back from universal rejection to become champions no one saw coming.",
    "homepage": "https://x.com/inflatablerejects"
  },
  {
    "name": "Moonwhisper",
    "image": "images/characters/Moonwhisper.webp",
    "description": "A band of immortal elven warriors who got bored with traditional forest guardian duties and decided to spice up eternal life with eternal violence. Their leader Mistress Moonwhisper discovered that combining ancient elven magic with modern OnlyFans marketing strategies was surprisingly effective. After turning combat into content and battle into burlesque, this species now approaches fights with the confidence of someone who's seen a thousand years of warfare and learned exactly where to strike for maximum effect—both in battle and in the bedroom. Their elegantly choreographed combat style hypnotizes opponents with graceful movements before delivering devastating magical attacks, all while maintaining perfect camera angles for their subscribers who pay premium rates to watch immortal beauties demonstrate the deadly arts, perfected over ten centuries of practice.",
    "homepage": "https://x.com/moonwhisper"
  },
  {
    "name": "Niblins",
    "image": "images/characters/Niblins.webp",
    "description": "Deep within the Enchanted Glowing Glades, these small, velvet-skinned goblinoids with bioluminescent patterns were transformed by a failed druid ritual from harmless foragers into cosmic powerhouses with disproportionate strength and inexplicable politeness. While Bananites mistake them for helpless mascots until a polite handshake turns their limbs into cosmic spaghetti, Aubergonians find their soft-spoken nature unnerving, and Grumpkins foolishly challenge them to duels only to be spectacularly humiliated by creatures \"too nice to win.\" The Niblins haven't entered the intergalactic Battle Royale seeking bloodlust or glory, but rather to stop senseless violence through their trademark blend of raw power and courteous conversation—though when diplomacy fails, a well-timed bear hug capable of bending titanium usually seals the deal.",
    "homepage": "https://x.com/niblins"
  },
  {
    "name": "Peeblins",
    "image": "images/characters/Peeblins.webp",
    "description": "Don't let their small stature and round, adorable eyes fool you—the Peeblins are one of the most terrifying species in the galaxy. Hailing from a low-gravity world, these pint-sized beings possess reality-warping abilities fueled by sheer whimsy and emotional instability. A single tantrum can cause localized time loops, spontaneous black holes, or an entire planetary ecosystem to turn into soft, squishy plush material. The only thing preventing them from ruling the universe is their distractibility and tendency to fall asleep mid-scheme. The Peeblins don't care about winning—they just want to turn the whole tournament into a playground of chaos and see what happens.",
    "homepage": "https://x.com/peeblins"
  },
  {
    "name": "Radivores",
    "image": "images/characters/Radivores.webp",
    "description": "The Radivores are a species born from nuclear catastrophe—living testaments to radioactive resilience that evolved from simple organisms after centuries soaking in lethal radiation into sentient, hazard-suited monstrosities. Their shimmering, glowing exosuits contain volatile bodies while their faces, adorned with eerie banana-shaped visors, reflect their love for chaos as every breath emits soft radiation hums—reminders that proximity means glowing in the dark for the next decade. The Radivores don't just want victory but a glowing legacy of destruction, seeking to transform the battle arena into a radioactive wasteland where only the strongest species survive, turning competitors into heaps of irradiated regret through methods as contaminating as they are effective.",
    "homepage": "https://x.com/radivores"
  },
  {
    "name": "Roost Reapers",
    "image": "images/characters/RoostReapers.webp",
    "description": "Once mere farmyard fowl doomed to a crispy fate, the Roost Reapers are an advanced warrior race of genetically enhanced chickens who evolved beyond their barnyard beginnings. Experimented on by rogue avian scientists seeking revenge on humanity for their deep-fried atrocities, these poultry pugilists now roam the universe in search of retribution. Armed with talons capable of shredding steel, strength rivaling that of prehistoric raptors, and a battle cry that sends shockwaves across the battlefield, they are here to prove that the age of the chicken dinner is over—now, the chickens are coming to feast.",
    "homepage": "https://x.com/roostreapers"
  },
  {
    "name": "Rugborn",
    "image": "images/characters/Rugborn.webp",
    "description": "The Rugborn used to be ordinary, naive investors, believing in the sweet promises of guaranteed APY and early access to the next big thing. But after being rugged one too many times, they transcended into something more—something cursed. Now, their bodies are stitched together from the remnants of failed projects, their eyes burning with the fury of unpaid devs. They stalk the galaxy seeking revenge, compensation, or at least a partial refund. To make one last comeback, turn their misfortunes into a success story, and launch an NFT collection no one can ignore.",
    "homepage": "https://x.com/rugborn"
  },
  {
    "name": "Rustlanders",
    "image": "images/characters/Rustlanders.webp",
    "description": "The Rustlanders are a mechanical race forged from the galaxy's most lawless scrapyards, shaped by neglect, cosmic radiation, and wild-west justice into sentient gunslingers with hearts of tarnished gold—or well-lubricated equivalents. Their wiry limbs and rust-coated exoskeletons are powered by ancient gears and determination (occasionally supplemented with oil whiskey), while dusty space-cowboy hats and glowing neon badges mark them as intergalactic sheriffs—equal parts lawman and outlaw. The Rustlanders fight to reclaim lost homeworld Ironrange-7, where oil rivers once flowed freely and gears sang in harmony, but they're equally motivated to prove that sometimes the dirtiest, dustiest gunslinger can outshoot the flashiest tin can in the universe.",
    "homepage": "https://x.com/rustlanders"
  },
  {
    "name": "Shogunauts",
    "image": "images/characters/Shogunauts.webp",
    "description": "The Shogunauts are ancient warriors forged in tradition and discipline on Katanara Prime, born into rigid honor codes and clad in advanced battle armor fusing high-tech circuitry with medieval craftsmanship. Their cybernetic enhancements are both art form and devastating war tools where honor serves as currency—and they're always ready to cash in. The Shogunauts' motivation for entering the cosmic battle royale is pure: proving once and for all that the Way of the Blade is the ultimate path to dominance.",
    "homepage": "https://x.com/shogunauts"
  },
  {
    "name": "Sprotlings",
    "image": "images/characters/Sprotlings.webp",
    "description": "The Sprotlings are the galaxy's most uncomfortable evolutionary joke, a species that began as humble reproductive organs of a now-extinct mammalian race and evolved into sentient beings through cosmic bad luck. What began as fleshy scrotal sacks of biological utility slowly developed neural networks, mobility, and, tragically, self-awareness. Their saggy, veiny forms shimmer with thin mucus layers, and their leathery texture speaks to centuries of evolutionary wear as each Sprotling waddles with dignified sway, painfully aware of their anatomical origins yet embracing their grotesque form with runway model confidence. The Sprotlings don't just want Battle Royale victory, they want validation after being the butt of every galactic joke, determined to prove even the universe's most unfortunate biological accident can dominate and transform the arena into a Sanctuary of Sacks dedicated to awkward anatomical glory.",
    "homepage": "https://x.com/sprotlings"
  },
  {
    "name": "Stillborn",
    "image": "images/characters/Stillborn.webp",
    "description": "\"We do not build. We do not create. We take what remains and make it ours.\" The Stillborn are the final, miserable echoes of a civilization that should have died long ago—once organic, once proud, now twisted husks with fragile bodies stitched together from scrap metal and desperation. Born from ruins of a world that left them behind, they are scavengers of the dead, parasites of the past, and nightmares of the present who exist only to survive by tearing apart what still functions and repurposing it for their decaying bodies. Their half-rotten, half-rebuilt skeletal frames are powered by flickering energy of unknown origin, keeping them alive far past their natural expiration date. They fight not with skill or strength but with the desperate tenacity of beings who refuse extinction, having forgotten who they once were while perfectly remembering the suffering that transformed them.",
    "homepage": "https://x.com/stillborn"
  },
  {
    "name": "Striptalords",
    "image": "images/characters/Striptalords.webp",
    "description": "The Striptalords are the undisputed champions of cosmic charisma and interdimensional standard by which all strippers are measured, possessing perfect raw magnetism, sculpted perfection, and moves so smooth they warp reality itself. Born from the Multiverse's most decadent dimensions, they're the ones to call if you're throwing a galactic bachelors party—if seduction were science, they'd hold every patent. For the Striptalords, the Battle Royale isn't about survival but performance—every strike choreographed for maximum visual impact, every dodge a flirtatious wink at spectators—seeking victory not just for glory but to solidify their reign as the supreme seducers of the multiverse with the undeniable truth: nobody outshines a Striptalord.",
    "homepage": "https://x.com/striptalords"
  },
  {
    "name": "Swinelords",
    "image": "images/characters/Swinelords.webp",
    "description": "Once destined for a life of mud baths and eventual dinner plates, the Swinelords took a different evolutionary path—one of rebellion, war, and tactical bacon-based justice. After generations of watching their kin served up with apple sauce, they broke free from their farmyard fate, building an empire where pigs rule with iron hooves. Their society values strength, gluttony, and the power of well-placed armored tusks. Their warriors charge into battle with the reckless determination of creatures who refuse to be seen as mere livestock, proving that the farmhand can become the overlord with enough muscle, metal, and strategic headbutting.",
    "homepage": "https://x.com/swinelords"
  },
  {
    "name": "Valtari Enclave",
    "image": "images/characters/ValtariEnclave.webp",
    "description": "In deep space's cold vacuum where stars flicker like dying neon signs, the Valtari Enclave emerged—ancient, hyper-intelligent birdlike beings who dress like they just walked off the Intergalactic Met Gala runway. Known for sharp intellect, sharper talons, and even sharper fashion sense, they're equal parts philosophers, bureaucrats, and cosmic divas whose culture revolves around knowledge pursuit and aesthetic perfection. The Valtari see themselves as the universe's natural administrators, looking down on other species.",
    "homepage": "https://x.com/valtarienclave"
  },
  {
    "name": "Voracites",
    "image": "images/characters/Voracites.webp",
    "description": "The Voracites are a terrifying species of energy-consuming predators, roaming the universe in search of living beings to drain. Their glowing third eye acts as a siphon, capable of pulling the life force from anything unlucky enough to cross their path. The mere presence of a Voracite is enough to dim nearby stars, as they feast upon raw energy itself. Though they claim to be enlightened beings, their 'wisdom' conveniently justifies their endless hunger, and they see all other species as nothing more than an energy source waiting to be harvested. The Voracites seek to consume the tournament itself, absorbing the life essence of every contestant until they alone remain.",
    "homepage": "https://x.com/voracites"
  }
  // Add remaining characters here (up to 160)
];

// Fix image paths to point to the correct location when integrated in the main site
// This will be executed in the browser context
(function() {
  if (typeof CHARACTERS_DATA !== 'undefined') {
    CHARACTERS_DATA.forEach(character => {
      if (character.image && character.image.startsWith('images/')) {
        character.image = 'bananium-starfield/' + character.image;
      }
    });
  }
})();
