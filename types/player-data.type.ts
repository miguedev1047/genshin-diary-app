export type PlayerDataProps = {
    infoUser: InfoUser;
}

export type InfoUser = {
    nickname:       Name;
    playerUid:      number;
    level:          number;
    worldlevel:     number;
    profilePicture: string;
    signature:      string;
    achievements:   number;
    profileAvatar:  string;
    spiralAbyss:    SpiralAbyss;
    characters:     Character[];
}

export type Character = {
    playerName:     Name;
    playerUid:      number;
    name:           string;
    id:             number;
    elementType:    string;
    elementText:    string;
    splashImageUrl: string;
    sideIcon:       string;
    icon:           string;
    level:          number;
    friendship:     number;
    maxLevel:       number;
    currentCostume: CurrentCostume;
    stars:          number;
    statsList:      StatsList[];
    artifacts:      Artifact[];
    weapon:         Weapon;
    constellations: Constellation[];
    skillLevels:    SkillLevel[];
    passives:       Passive[];
}

export type Artifact = {
    name:          string;
    id:            number;
    stars:         number;
    level:         number;
    artifactSet:   string;
    equipTypeName: EquipTypeName;
    imageUrl:      string;
    mainstat:      Mainstat;
    itemType:      string;
    mainstatValue: string;
    substats:      StatsList[];
}

export enum EquipTypeName {
    ArenasDelEón = "Arenas del Eón",
    CálizDeEonothem = "Cáliz de Eonothem",
    FlorDeLaVida = "Flor de la Vida",
    PlumaDeLaMuerte = "Pluma de la Muerte",
    TiaraDeLogos = "Tiara de Logos",
}

export enum Mainstat {
    ATQBase = "ATQ Base",
    Atq = "ATQ",
    BonoDeCuración = "Bono de Curación",
    BonoDeDañoAnemo = "Bono de Daño Anemo",
    BonoDeDañoDendro = "Bono de Daño Dendro",
    BonoDeDañoElectro = "Bono de Daño Electro",
    BonoDeDañoGeo = "Bono de Daño Geo",
    BonoDeDañoHydro = "Bono de Daño Hydro",
    BonoDeDañoPyro = "Bono de Daño Pyro",
    DEFBase = "DEF Base",
    DañoCRIT = "Daño CRIT",
    Def = "DEF",
    MaestríaElemental = "Maestría Elemental",
    ProbCRIT = "Prob. CRIT",
    RecargaDeEnergía = "Recarga de Energía",
    Vida = "Vida",
    VidaBase = "Vida Base",
    VidaMáx = "Vida Máx.",
}

export type StatsList = {
    name:         Mainstat;
    id:           number;
    value:        string;
    itemType:     string;
    numberValue?: number;
}

export type Constellation = {
    name:        string;
    id:          number;
    iconUrl:     string;
    description: string;
    isUnlocked:  boolean;
}

export type CurrentCostume = {
    icon:           string;
    splashImageUrl: string;
}

export type Passive = {
    id:          number;
    name:        string;
    description: string;
    icon:        string;
}

export enum Name {
    Drakker = "Drakker",
}

export type SkillLevel = {
    id:    number;
    level: Level;
    skill: Skill;
}

export type Level = {
    level: number;
    base:  number;
    extra: number;
}

export type Skill = {
    name:    string;
    iconUrl: string;
}

export type Weapon = {
    name:       string;
    id:         number;
    iconUrl:    string;
    level:      number;
    maxLevel:   number;
    refinement: number;
    stars:      number;
    attack:     StatsList[];
}

export type SpiralAbyss = {
    chamber: number;
    floor:   number;
    stars:   number;
}
