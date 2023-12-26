//#region Basics
function max(a, b) {
	if (a > b) return a;
	return b;
}

function min(a, b) {
	if (a < b) return a;
	return b;
}

function euclideanDivide(a, b) {
	return (a - a % b) / b
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const StateEnum = {};
StateEnum.Disabled = -1;
StateEnum.Switchable = 0;
StateEnum.CanBeEnabled = 1;

const PANELPARENT = document.body.getElementsByClassName("screenpart").item(0)
const NOTIFICATIONPARENT = document.body.getElementsByClassName("otherscreenpart").item(0)

//#endregion

//#region GameData
class HighNumber {
	constructor(Q = 0, R = 0, Y = 0, Z = 0, E = 0, P = 0, T = 0, G = 0, M = 0, K = 0, units = 0) {
		if (units > 999) {
			K += euclideanDivide(units, 1000)
			units %= 1000
		}
		if (K > 999) {
			M += euclideanDivide(K, 1000)
			K %= 1000
		}
		if (M > 999) {
			G += euclideanDivide(M, 1000)
			M %= 1000
		}
		if (G > 999) {
			T += euclideanDivide(G, 1000)
			G %= 1000
		}
		if (T > 999) {
			P += euclideanDivide(T, 1000)
			T %= 1000
		}
		if (P > 999) {
			E += euclideanDivide(P, 1000)
			P %= 1000
		}
		if (E > 999) {
			Z += euclideanDivide(E, 1000)
			E %= 1000
		}
		if (Z > 999) {
			Y += euclideanDivide(Z, 1000)
			Z %= 1000
		}
		if (Y > 999) {
			R += euclideanDivide(Y, 1000)
			Y %= 1000
		}
		if (R > 999) {
			Q += euclideanDivide(R, 1000)
			R %= 1000
		}
		if (Q < 0) Q = 0;
		if (R < 0) R = 0;
		if (Y < 0) Y = 0;
		if (Z < 0) Z = 0;
		if (E < 0) E = 0;
		if (P < 0) P = 0;
		if (T < 0) T = 0;
		if (G < 0) G = 0;
		if (M < 0) M = 0;
		if (K < 0) K = 0;
		if (units < 0) units = 0;
		this.units = units
		this.K = K
		this.M = M
		this.G = G
		this.T = T
		this.P = P
		this.E = E
		this.Z = Z
		this.Y = Y
		this.R = R
		this.Q = Q
	}

	toString() {
		if (this.Q > 0) {
			if (this.R > 99) return `${this.Q}.${this.R.toString()[0]} Q`
			else return `${this.Q} Q`
		}
		if (this.R > 0) {
			if (this.Y > 99) return `${this.R}.${this.Y.toString()[0]} R`
			else return `${this.R} R`
		}
		if (this.Y > 0) {
			if (this.Z > 99) return `${this.Y}.${this.Z.toString()[0]} Y`
			else return `${this.Y} Y`
		}
		if (this.Z > 0) {
			if (this.E > 99) return `${this.Z}.${this.E.toString()[0]} Z`
			else return `${this.Z} Z`
		}
		if (this.E > 0) {
			if (this.P > 99) return `${this.E}.${this.P.toString()[0]} E`
			else return `${this.E} E`
		}
		if (this.P > 0) {
			if (this.T > 99) return `${this.P}.${this.T.toString()[0]} P`
			else return `${this.P} P`
		}
		if (this.T > 0) {
			if (this.G > 99) return `${this.T}.${this.G.toString()[0]} T`
			else return `${this.T} T`
		}
		if (this.G > 0) {
			if (this.M > 99) return `${this.G}.${this.M.toString()[0]} G`
			else return `${this.G} G`
		}
		if (this.M > 0) {
			if (this.K > 99) return `${this.M}.${this.K.toString()[0]} M`
			else return `${this.M} M`
		}
		if (this.K > 0) {
			if (this.units > 99) return `${this.K}.${this.units.toString()[0]} k`
			else return `${this.K} K`
		}
		return `${this.units} `
	}

	add(otherHighNumber) {
		return new HighNumber(this.Q + otherHighNumber.Q, this.R + otherHighNumber.R, this.Y + otherHighNumber.Y, this.Z + otherHighNumber.Z, this.E + otherHighNumber.E, this.P + otherHighNumber.P, this.T + otherHighNumber.T, this.G + otherHighNumber.G, this.M + otherHighNumber.M, this.K + otherHighNumber.K, this.units + otherHighNumber.units)
	}

	iAdd(otherHighNumber) {
		let tmp = this.add(otherHighNumber)
		this.transferValue(tmp)
	}

	increment() {
		this.iAdd(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1))
	}

	decrement() {
		this.units--
		if (this.units < 0) {
			this.units = 999
			this.K--
			if (this.K < 0) {
				this.K = 999
				this.M--
				if (this.M < 0) {
					this.M = 999
					this.G--
					if (this.G < 0) {
						this.G = 999
						this.T--
						if (this.T < 0) {
							this.T = 999
							this.P--
							if (this.P < 0) {
								this.P = 999
								this.E--
								if (this.E < 0) {
									this.E = 999
									this.Z--
									if (this.Z < 0) {
										this.Z = 999
										this.Y--
										if (this.Y < 0) {
											this.Y = 999
											this.R--
											if (this.R < 0) {
												this.R = 999
												this.Q--
												if (this.Q < 0) {
													this.units = 0
													this.K = 0
													this.M = 0
													this.G = 0
													this.T = 0
													this.P = 0
													this.E = 0
													this.Z = 0
													this.Y = 0
													this.R = 0
													this.Q = 0
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	substract(otherHighNumber) {
		if (this.lesserEquals(otherHighNumber)) return new HighNumber()
		let tmp = this.copy()
		if (otherHighNumber.equals(ZERO_HighNumber)) return tmp
		if (otherHighNumber.equals(ONE_HighNumber)) {
			tmp.decrement()
			return tmp
		}
		let substractor = otherHighNumber.copy()

		// Units
		if (tmp.units == substractor.units) tmp.units = 0
		else if (tmp.units < substractor.units) {
			tmp.K--
			tmp.units += 1000
			tmp.units -= substractor.units
		}
		else tmp.units -= substractor.units
		// K
		if (tmp.K == substractor.K) tmp.K = 0
		else if (tmp.K < substractor.K) {
			tmp.M--
			tmp.K += 1000
			tmp.K -= substractor.K
		}
		else tmp.K -= substractor.K
		// M
		if (tmp.M == substractor.M) tmp.M = 0
		else if (tmp.M < substractor.M) {
			tmp.G--
			tmp.M += 1000
			tmp.M -= substractor.M
		}
		else tmp.M -= substractor.M
		// G
		if (tmp.G == substractor.G) tmp.G = 0
		else if (tmp.G < substractor.G) {
			tmp.T--
			tmp.G += 1000
			tmp.G -= substractor.G
		}
		else tmp.G -= substractor.G
		// T
		if (tmp.T == substractor.T) tmp.T = 0
		else if (tmp.T < substractor.T) {
			tmp.P--
			tmp.T += 1000
			tmp.T -= substractor.T
		}
		else tmp.T -= substractor.T
		// P
		if (tmp.P == substractor.P) tmp.P = 0
		else if (tmp.P < substractor.P) {
			tmp.E--
			tmp.P += 1000
			tmp.P -= substractor.P
		}
		else tmp.P -= substractor.P
		// E
		if (tmp.E == substractor.E) tmp.E = 0
		else if (tmp.E < substractor.E) {
			tmp.Z--
			tmp.E += 1000
			tmp.E -= substractor.E
		}
		else tmp.E -= substractor.E
		// Z
		if (tmp.Z == substractor.Z) tmp.Z = 0
		else if (tmp.Z < substractor.Z) {
			tmp.Y--
			tmp.Z += 1000
			tmp.Z -= substractor.Z
		}
		else tmp.Z -= substractor.Z
		// Y
		if (tmp.Y == substractor.Y) tmp.Y = 0
		else if (tmp.Y < substractor.Y) {
			tmp.R--
			tmp.Y += 1000
			tmp.Y -= substractor.Y
		}
		else tmp.Y -= substractor.Y
		// R
		if (tmp.R == substractor.R) tmp.R = 0
		else if (tmp.R < substractor.R) {
			tmp.Q--
			tmp.R += 1000
			tmp.R -= substractor.R
		}
		else tmp.R -= substractor.R
		// Q
		if (tmp.Q == substractor.Q) tmp.Q = 0
		else if (tmp.Q < substractor.Q) {
			return new HighNumber()
		}
		else tmp.Q -= substractor.Q

		return tmp.copy()
	}

	iSubstract(otherHighNumber) {
		let tmp = this.substract(otherHighNumber)
		this.transferValue(tmp)
	}

	equals(otherHighNumber) {
		return otherHighNumber.Q == this.Q && otherHighNumber.R == this.R && otherHighNumber.Y == this.Y && otherHighNumber.Z == this.Z && otherHighNumber.E == this.E && otherHighNumber.P == this.P && otherHighNumber.T == this.T && otherHighNumber.G == this.G && otherHighNumber.M == this.M && otherHighNumber.K == this.K && otherHighNumber.units == this.units
	}

	multiply(otherHighNumber) {
		let multiplier = otherHighNumber.copy()
		let tmp = new HighNumber()
		while (!multiplier.equals(ZERO_HighNumber)) {
			tmp.iAdd(this)
			multiplier.decrement()
		}
		return tmp
	}

	iMultiply(otherHighNumber) {
		let tmp = this.multiply(otherHighNumber)
		this.transferValue(tmp)
	}

	lesser(otherHighNumber) {
		if (this.Q < otherHighNumber.Q) return true;
		if (this.Q == otherHighNumber.Q) {
			if (this.R < otherHighNumber.R) return true;
			if (this.R == otherHighNumber.R) {
				if (this.Y < otherHighNumber.Y) return true;
				if (this.Y == otherHighNumber.Y) {
					if (this.Z < otherHighNumber.Z) return true;
					if (this.Z == otherHighNumber.Z) {
						if (this.E < otherHighNumber.E) return true;
						if (this.E == otherHighNumber.E) {
							if (this.P < otherHighNumber.P) return true;
							if (this.P == otherHighNumber.P) {
								if (this.T < otherHighNumber.T) return true;
								if (this.T == otherHighNumber.T) {
									if (this.G < otherHighNumber.G) return true;
									if (this.G == otherHighNumber.G) {
										if (this.M < otherHighNumber.M) return true;
										if (this.M == otherHighNumber.M) {
											if (this.K < otherHighNumber.K) return true;
											if (this.K == otherHighNumber.K) if (this.units < otherHighNumber.units) return true;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return false;
	}

	greater(otherHighNumber) {
		if (this.Q > otherHighNumber.Q) return true;
		if (this.Q == otherHighNumber.Q) {
			if (this.R > otherHighNumber.R) return true;
			if (this.R == otherHighNumber.R) {
				if (this.Y > otherHighNumber.Y) return true;
				if (this.Y == otherHighNumber.Y) {
					if (this.Z > otherHighNumber.Z) return true;
					if (this.Z == otherHighNumber.Z) {
						if (this.E > otherHighNumber.E) return true;
						if (this.E == otherHighNumber.E) {
							if (this.P > otherHighNumber.P) return true;
							if (this.P == otherHighNumber.P) {
								if (this.T > otherHighNumber.T) return true;
								if (this.T == otherHighNumber.T) {
									if (this.G > otherHighNumber.G) return true;
									if (this.G == otherHighNumber.G) {
										if (this.M > otherHighNumber.M) return true;
										if (this.M == otherHighNumber.M) {
											if (this.K > otherHighNumber.K) return true;
											if (this.K == otherHighNumber.K) if (this.units > otherHighNumber.units) return true;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return false;
	}

	greaterEquals(otherHighNumber) {
		return this.greater(otherHighNumber) || this.equals(otherHighNumber)
	}

	lesserEquals(otherHighNumber) {
		return this.lesser(otherHighNumber) || this.equals(otherHighNumber)
	}

	modulo(otherHighNumber) {
		if (this.equals(otherHighNumber)) return new HighNumber()
		let result = this.copy()
		while(result.greater(otherHighNumber)) result.iSubstract(otherHighNumber);
		return result
	}

	iModulo(otherHighNumber) {
		let tmp = this.modulo(otherHighNumber)
		this.transferValue(tmp)
	}

	euclideanDivide(otherHighNumber) {
		if (this.equals(otherHighNumber)) return new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)
		if (this.lesser(otherHighNumber)) return new HighNumber()
		let result = new HighNumber()
		let prep = this.substract(this.modulo(otherHighNumber))
		while (!prep.equals(ZERO_HighNumber)) {
			prep.iSubstract(otherHighNumber)
			result.increment()
		}
		return result
	}

	iEuclideanDivide(otherHighNumber) {
		let tmp = this.euclideanDivide(otherHighNumber)
		this.transferValue(tmp)
	}

	copy() {
		return new HighNumber(this.Q, this.R, this.Y, this.Z, this.E, this.P, this.T, this.G, this.M, this.K, this.units)
	}

	transferValue(tmp) {
		this.Q = tmp.Q
		this.R = tmp.R
		this.Y = tmp.Y
		this.Z = tmp.Z
		this.E = tmp.E
		this.P = tmp.P
		this.T = tmp.T
		this.G = tmp.G
		this.M = tmp.M
		this.K = tmp.K
		this.units = tmp.units
	}
}

const ZERO_HighNumber = new HighNumber()
const ONE_HighNumber = new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)

var GameData = {
	sourceVersion: {
		major: 0,
		minor: 0,
		patch: 1,
		sequence: "inDev"
	},
	matter: new HighNumber(),
	matterPerClick: new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
	autoGetters: 0,
	tickDuration: 4995,
	condenser: new HighNumber(),
	Panels: [
		StateEnum.CanBeEnabled,
		StateEnum.Disabled,
		StateEnum.CanBeEnabled
	],
	BasicUpgrades: {
		StandardUpgrades: {
			Upgrades: {
				matterProductionLevel: 0,
				matterProductionCost: 10,
				autoGetterLevel: 0,
				autoGetterCost: 125,
				matterGridLevel: 0,
				matterGridCost: 15
			},
			BoostingUpgrades: {
				primalCondenserLevel: 0,
				primalCondenserCost: 1024,
				timeRefactoringLevel: 0,
				timeRefactoringCost: 8765
			}
		},
		VirtualizingProcess: {
			Modules: {
				pentagonModuleLevel: 0,
				pentagonModuleCost: 25000,
				matterGridBreakerLevel: 0,
				matterGridBreakerCost: 32768
			},
			Mixing: {
				mixingMatrixLevel: 0,
				mixingMatrixCost: 64000,
				overcondensedRefactoringMixerLevel: 0,
				overcondensedRefactoringMixerCost: 131072
			}
		}
	},
	Automata: {
		FormulaeInjector: {
			Clicker: {
				autoClickerLevel: 0,
				autoClickerCost: 2147483
			},
			BoostingUpgrades: {
				autoClickerBoosterLevel: 0,
				autoClickerBoosterCost: 4284866
			}
		}
	}
}

//#endregion

//#region Loops
function gameLoopMain() {
	for (let i = -1; i < GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerLevel * GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleLevel * GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixLevel; i++) subGameLoopAutoGettersPart();
}

function subGameLoopAutoGettersPart() {
	if (GameData.autoGetters > 0) {
		if (GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleLevel > 0 && GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel > 4) for (let i = 0; i < GameData.autoGetters + (GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel - GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel % 5) / 5 * GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleLevel; i++) getMatter(false)
		else for (let i = 0; i < GameData.autoGetters; i++) getMatter(false);
	}
}

const TWO_HighNumber = new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2)

function matterGridBreakerLoop() {
	let matterToAdd = GameData.matterPerClick.copy()
	if (matterToAdd.modulo(TWO_HighNumber).equals(ONE_HighNumber)) {
		matterToAdd.iEuclideanDivide(TWO_HighNumber)
		matterToAdd.increment()
	}
	else matterToAdd.iEuclideanDivide(TWO_HighNumber)
	for (let i = 0; i < GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerLevel + GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixLevel; i++) {
		GameData.matter.iAdd(matterToAdd);
		condenseMatter();
		for (let j = 0; j < GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridLevel; j++) condenseMatter();
	}
}

var mainGameLoop = window.setInterval(function() {
	gameLoopMain()
}, max(GameData.tickDuration, 10))

var loopMatterGridBreaker = window.setInterval(function() {
	matterGridBreakerLoop()
}, Math.ceil(max(GameData.tickDuration, 10) * 0.9))

function updateLoopTime() {
	window.clearInterval(mainGameLoop)
	window.clearInterval(loopMatterGridBreaker)
	mainGameLoop = window.setInterval(function() {
		gameLoopMain()
	}, max(GameData.tickDuration, 10))
	loopMatterGridBreaker = window.setInterval(function() {
		matterGridBreakerLoop()
	}, Math.ceil(max(GameData.tickDuration, 10) * 0.9))
}

function ms200Loop() {
	getMatterButtonState = true
	document.getElementsByClassName("toggleGetMatter")[0].classList.replace("disabled", "enabled")
	if (GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel > 0) {
		getMatter(true);
		for (let i = 1; i < GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel; i++) {
			getMatter(false)
		}
		if (GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterLevel > 0) {
			for (let i = 0; i < GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel * GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterLevel; i++) {
				getMatter(false)
			}
		}
	}
}

window.setInterval(function() {
	ms200Loop()
}, 200)
window.setInterval(function() {
	updateComponents()
}, 28)

function save(fromButton) {
	if (fromButton) {
		switchPanelAction(2)
		updateComponents()
	}
	localStorage.setItem("141517c683ff5e4876dcfb67af0ce03a30243c94dd1cd1efd78275d824e1d08b-incrementalBetter_matterMinerGetterGameSave_save_0xffdd00/4f19737a1600963a370d9cd617152cc54691d75e8376e2facf9403ec323e1b81", JSON.stringify(GameData))
	if (fromButton) {
		switchPanelAction(2)
		updateComponents()
	}
}

var saveGameLoop = window.setInterval(function() {
    save(false)
}, 60000)

//#endregion

//#region Start
function init() {
	GameData = {
		sourceVersion: {
			major: 0,
			minor: 0,
			patch: 1,
			sequence: "inDev"
		},
		matter: new HighNumber(),
		matterPerClick: new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
		autoGetters: 0,
		tickDuration: 4995,
		condenser: new HighNumber(),
		Panels: [
			StateEnum.CanBeEnabled,
			StateEnum.Disabled,
			StateEnum.CanBeEnabled
		],
		BasicUpgrades: {
			StandardUpgrades: {
				Upgrades: {
					matterProductionLevel: 0,
					matterProductionCost: 10,
					autoGetterLevel: 0,
					autoGetterCost: 125,
					matterGridLevel: 0,
					matterGridCost: 15
				},
				BoostingUpgrades: {
					primalCondenserLevel: 0,
					primalCondenserCost: 1024,
					timeRefactoringLevel: 0,
					timeRefactoringCost: 8765
				}
			},
			VirtualizingProcess: {
				Modules: {
					pentagonModuleLevel: 0,
					pentagonModuleCost: 25000,
					matterGridBreakerLevel: 0,
					matterGridBreakerCost: 32768
				},
				Mixing: {
					mixingMatrixLevel: 0,
					mixingMatrixCost: 64000,
					overcondensedRefactoringMixerLevel: 0,
					overcondensedRefactoringMixerCost: 131072
				}
			}
		},
		Automata: {
			FormulaeInjector: {
				Clicker: {
					autoClickerLevel: 0,
					autoClickerCost: 2147483
				},
				BoostingUpgrades: {
					autoClickerBoosterLevel: 0,
					autoClickerBoosterCost: 4284866
				}
			}
		}
	}
	
	localStorage.setItem("141517c683ff5e4876dcfb67af0ce03a30243c94dd1cd1efd78275d824e1d08b-incrementalBetter_matterMinerGetterGameSave_save_0xffdd00/4f19737a1600963a370d9cd617152cc54691d75e8376e2facf9403ec323e1b81", JSON.stringify(GameData))
	
}

function startGame() {
	let savegame = JSON.parse(localStorage.getItem("141517c683ff5e4876dcfb67af0ce03a30243c94dd1cd1efd78275d824e1d08b-incrementalBetter_matterMinerGetterGameSave_save_0xffdd00/4f19737a1600963a370d9cd617152cc54691d75e8376e2facf9403ec323e1b81"));
	if (savegame !== null) {
		GameData = savegame;
		GameData.matter = new HighNumber(savegame.matter.Q, savegame.matter.R, savegame.matter.Y, savegame.matter.Z, savegame.matter.E, savegame.matter.P, savegame.matter.T, savegame.matter.G, savegame.matter.M, savegame.matter.K, savegame.matter.units)
		GameData.matterPerClick = new HighNumber(savegame.matterPerClick.Q, savegame.matterPerClick.R, savegame.matterPerClick.Y, savegame.matterPerClick.Z, savegame.matterPerClick.E, savegame.matterPerClick.P, savegame.matterPerClick.T, savegame.matterPerClick.G, savegame.matterPerClick.M, savegame.matterPerClick.K, savegame.matterPerClick.units)
		GameData.condenser = new HighNumber(savegame.condenser.Q, savegame.condenser.R, savegame.condenser.Y, savegame.condenser.Z, savegame.condenser.E, savegame.condenser.P, savegame.condenser.T, savegame.condenser.G, savegame.condenser.M, savegame.condenser.K, savegame.condenser.units)
	}
	else {
		init();
	}
}

function checkSourceVersion() {
	let curver = {
		major: 0,
		minor: 0,
		patch: 1,
		sequence: "inDev"
	}
	if (GameData.sourceVersion.major != curver.major || GameData.sourceVersion.minor != curver.minor || GameData.sourceVersion.patch != curver.patch || GameData.sourceVersion.sequence != curver.sequence) {
		GameData.Panels.push(StateEnum.CanBeEnabled)
		GameData.sourceVersion = curver
		save()
	}
}

startGame();
checkSourceVersion();

//#endregion

//#region Components
function getComponents(domObject, componentsTypes) {
	let output = {}
	let outinclude = []
	let tmp = null
	let localCache = domObject.getElementsByClassName("isComponent")
	componentsTypes.forEach(componentType => {
		outinclude = []
		for (let i = 0; i < localCache.length; i++) {
			tmp = localCache[i]
			if (tmp.localName == componentType && tmp.id != "noUpdate") {
				outinclude.push(tmp)
			}
		}
		output[componentType] = outinclude
	});
	return output
}

class Notification {
	constructor(title, body) {
		this.notificationToast = document.createElement("div")
		this.notificationToast.classList.add("notification")

		let ltitle = document.createElement("p")
		ltitle.classList.add("title")
		ltitle.id = "notificationtext"
		ltitle.innerText = title
		this.notificationToast.appendChild(ltitle)

		let lbody = document.createElement("p")
		lbody.classList.add("body")
		lbody.id = "notificationbody"
		lbody.innerText = body
		this.notificationToast.appendChild(lbody)
	}

	async show() {
		NOTIFICATIONPARENT.appendChild(this.notificationToast)
		await sleep(14)
		NOTIFICATIONPARENT.getElementsByClassName("notification").item(NOTIFICATIONPARENT.getElementsByClassName("notification").length - 1).classList.add("notificationshow")
		await sleep(7)
	}
}

class ButtonInPanel {
	constructor(domObject) {
		this.domObject = domObject
		this.costSource = domObject.attributes.getNamedItem("costSource").value
		this.levelSource = domObject.attributes.getNamedItem("levelSource").value
		this.header = domObject.attributes.getNamedItem("header").value
		this.parentInGameData = domObject.id

		if (domObject.classList.contains("tooltip")) {
			let tooltipText = domObject.attributes.getNamedItem("tooltipText").value
			this.tooltipSpan = document.createElement('span')
			this.tooltipSpan.classList.add('tooltiptext')
			this.tooltipSpan.innerText = tooltipText
		}
		else {
			this.tooltipSpan = 0
		}
	}

	async update() {
		let tmp = new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, eval(this.parentInGameData)[this.costSource])
		this.domObject.innerText = this.header + " (Level " + eval(this.parentInGameData)[this.levelSource] + "): " + tmp.toString() + " Matter"
		switchState(this.domObject, tmp)
	}

	async tooltip() {
		if (this.tooltipSpan === 0) return;
		this.domObject.appendChild(this.tooltipSpan)
	}
}

class Panel {
	constructor(domObject) {
		this.domObject = domObject;
		let tmp = getComponents(this.domObject, ["button"])
		this.components = []
		tmp.button.forEach(button => this.components.push(new ButtonInPanel(button)))
		this.enabled = false;
	}

	async enable() {
		PANELPARENT.appendChild(this.domObject)
		this.enabled = true;
		await sleep(28)
		this.domObject.classList.replace("panelhidden", "panelvisible")
	}

	async disable() {
		this.domObject.classList.replace("panelvisible", "panelhidden")
		await sleep(28)
		PANELPARENT.removeChild(this.domObject)
		this.enabled = false;
	}

	switch() {
		if (this.enabled) this.disable();
		else this.enable();
	}

	async update() {
		if (this.domObject.classList.contains("noUpdate")) return
		this.components.forEach(toUpdate => {
			toUpdate.update()
		});
		putTooltip(this.components)
	}
}

class Tab {
	constructor(panel, button) {
		this.state = StateEnum.Disabled
		this.panel = panel
		this.button = button
	}

	async update() {
		if (this.state != StateEnum.Disabled) {
			if (this.state === StateEnum.Switchable) {
				this.button.classList.replace("penabled", "pswitchable")
				if (!this.panel.enabled) this.panel.switch();
				this.panel.update()
			}
			if (this.state === StateEnum.CanBeEnabled) {
				if (!this.button.classList.replace("pswitchable", "penabled")) this.button.classList.replace("pdisabled", "penabled")
			}
		}
		else {
			if (this.panel.enabled) this.panel.switch();
			if (!this.button.classList.replace("pswitchable", "pdisabled")) this.button.classList.replace("penabled", "pdisabled")
		}
	}

	setState(localstate) {
		if (localstate === StateEnum.Switchable) {
			this.state = StateEnum.Switchable
			this.button.classList.replace("pdisabled", "pswitchable")
			this.button.classList.replace("penabled", "pswitchable")
		}
		else if (localstate === StateEnum.CanBeEnabled) {
			this.state = StateEnum.CanBeEnabled
			if (this.panel.enabled) this.panel.switch();
			this.button.classList.replace("pdisabled", "penabled")
			this.button.classList.replace("pswitchable", "penabled")
		}
		else if (localstate === StateEnum.Disabled) {
			this.state = StateEnum.Disabled
			if (this.panel.enabled) this.panel.switch();
			this.button.classList.replace("pswitchable", "pdisabled")
			this.button.classList.replace("penabled", "pdisabled")
		}
	}
}

function getPanels() {
	let output = []
	let tmp = PANELPARENT.getElementsByClassName("panel")
	for (let i = 0; i < tmp.length; i++) output.push(new Panel(tmp[i]));
	output.forEach(panel => panel.disable())
	return output
}

function getTabs() {
	let out = []
	let buttons = getComponents(document.getElementsByClassName("panelselector")[0], ["button"]).button
	let panels = getPanels()
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute("onclick", `switchPanelAction(${i});`)
		let tmp = new Tab(panels[i], buttons[i])
		tmp.setState(GameData.Panels[i])
		out.push(tmp)
	}
	return out
}

const Components = {
	texts: getComponents(document, ["p"]).p,
	tabs: getTabs()
}

//#endregion

//#region Components Update
var getMatterButtonState = true

function switchPanelAction(panelID) {
	for (let i = 0; i < Components.tabs.length; i++) {
		if (Components.tabs[i].state != StateEnum.Disabled) {
			if (i == panelID) {
				if (Components.tabs[i].state === StateEnum.Switchable) Components.tabs[i].setState(StateEnum.CanBeEnabled);
				else Components.tabs[i].setState(StateEnum.Switchable);
			}
			else {
				Components.tabs[i].setState(StateEnum.CanBeEnabled)
			}
		}
		GameData.Panels[i] = Components.tabs[i].state;
	}
}

const FOURMILLION = new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0)

function updateComponents() {
	Components.texts.forEach(txt => {
		if (txt.id == "oneleft") {
			txt.innerText = GameData[txt.attributes.getNamedItem("source").value].toString() + txt.attributes.getNamedItem("defaultText").value
		}
	});
	GameData.Panels = []
	Components.tabs.forEach(tab => {
		if (tab.state == StateEnum.Disabled) {
			if (tab.panel.domObject.id == "panel1") if (GameData.matter.greaterEquals(FOURMILLION)) tab.setState(StateEnum.CanBeEnabled)
		}
		tab.update()
		GameData.Panels.push(tab.state)
	});
}

function putTooltip(buttonCollectionObject) {
	buttonCollectionObject.forEach(toUpdate => {
		toUpdate.tooltip()
	})
}

function switchState(cTU, val) {
	if (GameData.matter.greaterEquals(val)) cTU.classList.replace("disabled", "enabled");
	else cTU.classList.replace("enabled", "disabled");
}

//#endregion

//#region Matter Condensing Logic
function condenseMatter() {
	for (let i = -1; i < GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerLevel; i++) subCondenseMatter();
}

const NINETYNINE_HighNumber = new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99)
const ONEHUNDRED_HighNumber = new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100)

function subCondenseMatter() {
	if (GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserLevel > 0) {
		GameData.condenser.iAdd(GameData.matterPerClick)
		if (GameData.condenser.greater(NINETYNINE_HighNumber)) {
			GameData.matter.iAdd(GameData.condenser.euclideanDivide(ONEHUNDRED_HighNumber).multiply(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserLevel)).add(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerLevel)))
			GameData.condenser = GameData.condenser.modulo(ONEHUNDRED_HighNumber).add(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserLevel))
			GameData.condenser.decrement()
		}
	}
}

//#endregion

//#region onClick
function getMatter(button_source) {
	if (button_source) {
		if (getMatterButtonState) {
			GameData.matter.iAdd(GameData.matterPerClick)
			document.getElementsByClassName("toggleGetMatter")[0].classList.replace("enabled", "disabled")
			getMatterButtonState = false
			condenseMatter()
		}
	}
	else {
		GameData.matter.iAdd(GameData.matterPerClick)
		condenseMatter()
	}
}

function upgradeMatterProduction() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost))) {
		let Cost = GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Cost))
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionLevel++
		let Level = GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionLevel
		GameData.matterPerClick.increment()
		//Special Levels
		if (Level == 8) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 1800
			return
		}
		else if (Level == 19) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 3480000
			return
		}
		else if (Level == 22) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 27800513
			return
		}
		else if (Level == 31) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 13001281024
			return
		}
		else if (Level == 32) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 25000765432
			return
		}
		else if (Level == 40) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 5200042100113
			return
		}
		else if (Level == 43) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 30300000400216
			return
		}
		else if (Level == 46) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 192800001600649
			return
		}
		else if (Level == 51) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 5810200025541112
			return
		}
		else if (Level == 52) {
			GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = 2**53-1
			return
		}
		//Normal Cost Formula
		Cost *= 2
		Cost -= 2 * Level - 1
		//Normal Multiplier Management
		if (Level % 5 == 0 && Level % 10 != 0) {
			Cost += 2 * Level - 1
			GameData.matterPerClick.iAdd(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4))
		}
		else if (Level % 10 == 0) {
			Cost += 2 * Level - 6
			GameData.matterPerClick.iAdd(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6))
		}
		else if (Level % 12 == 0) {
			Cost -= 946 * (Level - Level % 12) / 12 - 2
			GameData.matterPerClick.iAdd(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2))
		}
		else if (Level % 17 == 0) {
			Cost -= 13128 * (Level - Level % 17) / 17 - 3
			GameData.matterPerClick.iAdd(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8))
		}
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterProductionCost = Cost
	}
}

function upgradeAutoGetter() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterCost))) {
		let Cost = GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterCost
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Cost))
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel++
		GameData.autoGetters++
		Cost *= 3.75
		Cost += 253 - Math.floor(1.51 * GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel)
		GameData.tickDuration += 5
		if (GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel % 5 == 0) Cost += 127 *(GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterLevel - 2)
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.autoGetterCost = Math.floor(Cost)
		updateLoopTime()
	}
}

function upgradeMatterGrid() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridCost))
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridLevel++
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridCost = Math.floor(GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridCost * 9.8)
		GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridCost -= Math.ceil(6.2 * GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridLevel + 1)
		GameData.tickDuration -= 2
		GameData.matterPerClick.increment()
		GameData.condenser.iAdd(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.Upgrades.matterGridLevel))
		getMatter(false)
		updateLoopTime()
	}
}

function upgradePrimalCondenser() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserCost))
		GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserLevel++
		GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserCost *= 17
		GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserCost -= 25 * GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.primalCondenserLevel + 27
	}
}

function upgradeTimeRefactoring() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.timeRefactoringCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.timeRefactoringCost))
		GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.timeRefactoringLevel++
		GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.timeRefactoringCost *= 15
		GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.timeRefactoringCost -= 262 + 4 * GameData.BasicUpgrades.StandardUpgrades.BoostingUpgrades.timeRefactoringLevel
		GameData.tickDuration -= 13
		updateLoopTime()
	}
}

function upgradePentagonModule() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleCost))
		GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleLevel++
		GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleCost = Math.ceil(9.66 * GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleCost)
		GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleCost -= 129 * GameData.BasicUpgrades.VirtualizingProcess.Modules.pentagonModuleLevel - 96
		GameData.tickDuration -= 4
		updateLoopTime()
	}
}

function upgradeMatterGridBreaker() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerCost))
		GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerLevel++
		GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerCost = Math.ceil(12.9 * GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerCost)
		GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerCost -= 124 * GameData.BasicUpgrades.VirtualizingProcess.Modules.matterGridBreakerLevel - 71
		GameData.tickDuration--
		updateLoopTime()
	}
}

function upgradeMixingMatrix() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixCost))
		GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixLevel++
		GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixCost *= min(1 + GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixLevel, 5)
		GameData.BasicUpgrades.VirtualizingProcess.Mixing.mixingMatrixCost -= 255
		GameData.tickDuration -= 4
		updateLoopTime()
	}
}

function upgradeOvercondensedRefactoringMixer() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerCost))
		GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerLevel++
		GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerCost = Math.ceil(GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerCost * 2.25)
		GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerCost -= Math.floor(3.75 * GameData.BasicUpgrades.VirtualizingProcess.Mixing.overcondensedRefactoringMixerLevel)
		GameData.tickDuration -= 15
		GameData.matterPerClick.increment()
	}
}

function upgradeAutoClicker() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.Automata.FormulaeInjector.Clicker.autoClickerCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.Automata.FormulaeInjector.Clicker.autoClickerCost))
		GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel++
		GameData.Automata.FormulaeInjector.Clicker.autoClickerCost *= min(GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel, 5)
		if (GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel > 3) GameData.Automata.FormulaeInjector.Clicker.autoClickerCost += 6500 * Math.ceil(max(GameData.Automata.FormulaeInjector.Clicker.autoClickerLevel, 6) / 1.8)
	}
}

function upgradeAutoClickerBooster() {
	if (GameData.matter.greaterEquals(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterCost))) {
		GameData.matter.iSubstract(new HighNumber(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterCost))
		GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterLevel++
		GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterCost *= min(GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterLevel, 6)
		if (GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterLevel > 3) GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterCost += 6755 * Math.ceil(max(GameData.Automata.FormulaeInjector.BoostingUpgrades.autoClickerBoosterLevel, 7) / 1.8)
	}
}

//#endregion

updateComponents();
updateLoopTime();

// async function hoho() {
// 	await sleep(3000)
// 	await new Notification("test1", "premier").show()
// 	await new Notification("test2", "second").show()
// }

// hoho()
