<script>
export default {
    name: 'AppMain',
    data: () => ({
        heroes: [
            {
                id: 1,
                hName: "Kaen, the Flame",
                color: "#e81010",
                stats: {
                    stmn: 9,
                    str: 2,
                    abi: 0,
                    arc: 1,
                },
                currentStmn: 9,
                currentRpt: 0,
                rollResult: "???",
                actions: ["attack", "spell"]
            },
            {
                id: 2,
                hName: "Shiva, the Blizzard",
                color: "#b0c9ff",
                stats: {
                    stmn: 6,
                    str: 0,
                    abi: 2,
                    arc: 1,
                },
                currentStmn: 6,
                currentRpt: 0,
                rollResult: "???",
                actions: ["attack", "spell"]
            },
            {
                id: 3,
                hName: "Ray, the Thunder",
                color: "#f8c52a",
                stats: {
                    stmn: 8,
                    str: 1,
                    abi: 0,
                    arc: 2,
                },
                currentStmn: 8,
                currentRpt: 0,
                rollResult: "???",
                actions: ["defend", "sorcery"]
            },
            {
                id: 4,
                hName: "Seiya, the Moonlight",
                color: "#35177f",
                stats: {
                    stmn: 7,
                    str: 0,
                    abi: 1,
                    arc: 2,
                },
                currentStmn: 7,
                currentRpt: 0,
                rollResult: "???",
                actions: ["spell", "sorcery"]
            }
        ],
        disabledButtons: [],
        activeShield: [],
        activeSqr: [],
        activeSqrEnemy: [],
        enemyGrid: ["Name", "HP", "CD", "1L", "2L", "FY", "Hd", "Assist", "Remove"],
        enemies: [{ nome: "Dargh", hp: "5", cd: "6" }],
        newEnemyName: "",
        newEnemyHP: "",
        newEnemyCD: "",
        isHidden: true
    }),
    methods: {

        createImagePath(img_name) {
            const url = new URL(`../assets/${img_name}`, import.meta.url);
            return url.href;
        },
        firstLetterToCapital(word) {
            const newWord = word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
            return newWord;
        },
        updateStmnRpt(word, ope, i) {
            if (word == "stmn") {
                if (ope == "incr" && this.heroes[i].currentStmn < this.heroes[i].stats.stmn) {
                    this.heroes[i].currentStmn++;
                } else if (ope == "decr" && this.heroes[i].currentStmn > 0) {
                    this.heroes[i].currentStmn--;
                }
            } else {
                if (ope == "incr") {
                    this.heroes[i].currentRpt++;
                } else if (ope == "decr" && this.heroes[i].currentRpt > 0) {
                    this.heroes[i].currentRpt--;
                }
            }
        },
        rollD10(i) {
            let count = 0;
            this.disabledButtons.push(i);
            const interval = setInterval(() => {
                if (count === 0) this.heroes[i].rollResult = "";
                if (count < 3) {
                    this.heroes[i].rollResult += "?";
                    count++;
                } else {
                    clearInterval(interval);
                    const rollResult = Math.floor(Math.random() * 10) + 1;
                    this.heroes[i].rollResult = rollResult.toString();
                    this.disabledButtons.splice(this.disabledButtons.indexOf(i), 1);
                }
            }, 500);
        },
        resetRoll(i) {
            if (!this.disabledButtons.includes(i))
                this.heroes[i].rollResult = "???";
        },
        toggleActiveShield(shield) {
            if (this.activeShield.includes(shield)) {
                this.activeShield.splice(this.activeShield.indexOf(shield), 1);
            } else {
                this.activeShield.push(shield);
            }
        },
        toggleActiveSqr(sqr) {
            if (this.activeSqr.includes(sqr)) {
                this.activeSqr.splice(this.activeSqr.indexOf(sqr), 1);
            } else {
                this.activeSqr.push(sqr);
            }
        },
        toggleActiveSqrEnemy(sqr) {
            if (this.activeSqrEnemy.includes(sqr)) {
                this.activeSqrEnemy.splice(this.activeSqrEnemy.indexOf(sqr), 1);
            } else {
                this.activeSqrEnemy.push(sqr);
            }
        },
        incrEnemyHP(i) {
            this.enemies[i].hp++;
        },
        decrEnemyHP(i) {
            this.enemies[i].hp--;
        },
        addEnemy() {
            const newEnemy = { nome: this.newEnemyName, hp: this.newEnemyHP, cd: this.newEnemyCD };
            this.enemies.push(newEnemy);
            this.newEnemyName = "";
            this.newEnemyHP = "";
            this.newEnemyCD = "";
        },
        removeEnemy(i) {
            this.enemies.splice(i, 1);
        },
        goToNewRound() {
            this.activeShield = this.activeShield.filter((shield) => shield.includes("e"));
            this.activeSqr = [];
            this.emptyRolls();
        },
        makeVisible() {
            this.isHidden = !this.isHidden;
        },
        emptyRolls() {
            this.heroes.forEach((hero) => hero.rollResult = "???")
        }
    }
}
</script>

<template>
    <main class="d-flex">
        <!-- sidebar -->
        <section id="sidebar">
            <div class="sb-h-quick d-flex" v-for="(hero, i) in heroes" :key="hero.id">
                <!-- hero name -->
                <div class="name d-flex justify-content-center align-items-center" :class="`name${i}`"
                    @click="makeVisible()">
                    <h2>{{ hero.hName.split(',')[0] }}</h2>
                </div>
                <div class="actions d-flex justify-content-center align-items-center flex-column px-2">
                    <!-- stamina -->
                    <div class="staminaq">
                        <h4>Stmn: </h4>
                        <div class="d-flex justify-content-center align-items-center gap-1">
                            <button class="ehp" @click="updateStmnRpt('stmn', 'incr', i)">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                            <p class="m-0 fs-4">{{ hero.currentStmn }}</p>
                            <button class="ehp" @click="updateStmnRpt('stmn', 'decr', i)">
                                <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                        </div>
                    </div>
                    <!-- reputation -->
                    <div class="reputationq">
                        <h4>Rpt:</h4>
                        <div class="d-flex justify-content-center align-items-center gap-1">
                            <button class="ehp" @click="updateStmnRpt('rpt', 'incr', i)">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                            <p class="m-0 fs-4">{{ hero.currentRpt }}</p>
                            <button class="ehp" @click="updateStmnRpt('rpt', 'decr', i)">
                                <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                        </div>
                    </div>
                    <!-- roll d10 button -->
                    <button class="text-black" @click="rollD10(i)" :disabled="disabledButtons.includes(i)">
                        Roll
                    </button>
                </div>
            </div>
        </section>
        <!-- wrapper -->
        <div class="wrapper">
            <div class="container my-4">
                <!-- sezione eroi -->
                <section id="heroes" class="h-row row row-cols-2 text-center" :class="{ 'd-none': isHidden }">
                    <!-- singolo eroe -->
                    <div class="h-col col-3" v-for="(hero, i) in heroes" :key="hero.id">
                        <div class="h-card px-3">
                            <!-- nome -->
                            <h3 class="h-name">{{ hero.hName }}</h3>
                            <!-- colore -->
                            <div class="h-color" :style="{ backgroundColor: hero.color }"></div>
                            <!-- statistiche -->
                            <h4>Stats</h4>
                            <ul class="stats row row-cols-2 list-unstyled w-75 mx-auto">
                                <li v-for="(value, key, i) in hero.stats" :key="i">
                                    <b>{{ firstLetterToCapital(key) }}</b>: {{ value }}
                                </li>
                            </ul>
                            <!-- bonus -->
                            <h4>Bonus</h4>
                            <ul class="stats row row-cols-2 list-unstyled w-75 mx-auto">
                                <li v-for="(action, i) in hero.actions" :key="i" class="">
                                    <b>{{ firstLetterToCapital(action) }}</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <!-- risultato dadi -->
                <div id="roll-area" :class="{ 'd-none': !isHidden }">
                    <div class="h-square">
                        <h4 class="results" role="button" v-for="(hero, i) in heroes" @click="resetRoll(i)"
                            :style="{ borderColor: hero.color, borderStyle: 'solid', borderWidth: '2px' }">
                            {{ hero.rollResult }}
                        </h4>
                        <button @click="emptyRolls()">Reset Rolls</button>
                    </div>
                </div>
                <!-- griglie combattimento -->
                <section id="battlefield" :class="{ 'd-none': !isHidden }">
                    <!-- hero grid -->
                    <div id="h-grid" class="d-flex">
                        <!-- table header -->
                        <div class="td">Nome</div>
                        <div v-for="n in 4" class="td">{{ (-5 + n) * -1 }}</div>
                        <div class="td">Dif</div>
                        <!-- table body -->
                        <div class="tr d-flex" v-for="n in 4">
                            <div class="td">
                                {{ heroes[n - 1].hName.split(',')[0] }}
                            </div>
                            <div v-for="m in 4" class="td"
                                :class="`td${n}${m}`, { 'active': activeSqr.includes(`td${n}${m}`) }"
                                @click="toggleActiveSqr(`td${n}${m}`)">
                            </div>
                            <div class="td gap-1">
                                <font-awesome-icon icon="fa-solid fa-shield" class="shield shield-r"
                                    :class="`r${n}`, { 'active': activeShield.includes(`r${n}`) }"
                                    @click="toggleActiveShield(`r${n}`)" />
                                <font-awesome-icon icon="fa-solid fa-shield" class="shield shield-w"
                                    :class="`w${n}`, { 'active': activeShield.includes(`w${n}`) }"
                                    @click="toggleActiveShield(`w${n}`)" />
                                <font-awesome-icon icon="fa-solid fa-shield" class="shield shield-y"
                                    :class="`y${n}`, { 'active': activeShield.includes(`y${n}`) }"
                                    @click="toggleActiveShield(`y${n}`)" />
                                <font-awesome-icon icon="fa-solid fa-shield" class="shield shield-b"
                                    :class="`b${n}`, { 'active': activeShield.includes(`b${n}`) }"
                                    @click="toggleActiveShield(`b${n}`)" />
                            </div>
                        </div>
                    </div>
                    <!-- enemy grid -->
                    <div id="e-grid" class="d-flex">
                        <!-- table header -->
                        <div v-for="enemyCell in enemyGrid" class="td">{{ enemyCell }}</div>
                        <!-- table body -->
                        <div class="tr d-flex" v-for="(e, i) in enemies">
                            <div class="td">{{ firstLetterToCapital(e.nome) }}</div>
                            <div class="td gap-1">
                                <button class="ehp" @click="incrEnemyHP(i)"><font-awesome-icon
                                        icon="fa-solid fa-plus" /></button>
                                <span>{{ e.hp }}</span>
                                <button class="ehp" @click="decrEnemyHP(i)"><font-awesome-icon
                                        icon="fa-solid fa-minus" /></button>
                            </div>
                            <div class="td">{{ (e.cd) }}</div>
                            <div v-for="n in 4" class="td"
                                :class="`tde${n}${i}`, { 'active': activeSqrEnemy.includes(`tde${n}${i}`) }"
                                @click="toggleActiveSqrEnemy(`tde${n}${i}`)"></div>
                            <div class="td gap-1">
                                <font-awesome-icon icon="fa-solid fa-khanda" class="shield shield-r"
                                    :class="`er${i}`, { 'active': activeShield.includes(`er${i}`) }"
                                    @click="toggleActiveShield(`er${i}`)" />
                                <font-awesome-icon icon="fa-solid fa-khanda" class="shield shield-w"
                                    :class="`ew${i}`, { 'active': activeShield.includes(`ew${i}`) }"
                                    @click="toggleActiveShield(`ew${i}`)" />
                                <font-awesome-icon icon="fa-solid fa-khanda" class="shield shield-y"
                                    :class="`ey${i}`, { 'active': activeShield.includes(`ey${i}`) }"
                                    @click="toggleActiveShield(`ey${i}`)" />
                                <font-awesome-icon icon="fa-solid fa-khanda" class="shield shield-b"
                                    :class="`eb${i}`, { 'active': activeShield.includes(`eb${i}`) }"
                                    @click="toggleActiveShield(`eb${i}`)" />
                            </div>
                            <div class="td remove-enemy" @click="removeEnemy(i)">
                                <font-awesome-icon icon="fa-solid fa-skull" class="me-1" />
                                <font-awesome-icon icon="fa-solid fa-x" />
                            </div>
                        </div>
                    </div>
                </section>
                <!-- add enemies -->
                <section id="new-enemies" class="mt-4 d-flex justify-content-center" :class="{ 'd-none': !isHidden }">
                    <input type="text" placeholder="Nome nemico" v-model="newEnemyName">
                    <input type="number" placeholder="HP nemico" v-model="newEnemyHP">
                    <input type="number" placeholder="CD nemico" v-model="newEnemyCD">
                    <button @click="addEnemy()" @submit.self.prevent>Aggiungi</button>
                </section>
                <!-- refresh shields and positions -->
                <section id="new-round" class="mt-4 d-flex justify-content-center" :class="{ 'd-none': !isHidden }">
                    <button @click="goToNewRound()">Nuovo Round</button>
                </section>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* hero grid */
#battlefield {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

#h-grid {
    width: 600px;
    flex-wrap: wrap;
}

#e-grid {
    width: 900px;
    align-self: flex-end;
    flex-wrap: wrap;
}

.tr {
    flex-wrap: wrap;
}

.td {
    width: 100px;
    height: 30px;
    border: #2f3132 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s ease;
}

[class*="td1"]:hover {
    background-color: #e81010;
    filter: opacity(0.4);
}

[class*="td1"].active {
    background-color: #e81010;
}

[class*="td2"]:hover {
    background-color: #b0c9ff;
    filter: opacity(0.4);
}

[class*="td2"].active {
    background-color: #b0c9ff;
}

[class*="td3"]:hover {
    background-color: #f8c52a;
    filter: opacity(0.4);
}

[class*="td3"].active {
    background-color: #f8c52a;
}

[class*="td4"]:hover {
    background-color: #35177f;
    filter: opacity(0.4);
}

[class*="td4"].active {
    background-color: #35177f;
}

[class*="tde"]:hover {
    background-color: #3f3f3f;
    filter: opacity(0.4);
}

[class*="tde"].active {
    background-color: #3f3f3f;
}

.shield {
    color: #3f3f3f;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.shield:hover,
.shield.active {
    transform: scale(1.2);
}

.shield-r:hover,
.shield-r.active {
    color: #e81010;
}

.shield-w:hover,
.shield-w.active {
    color: #b0c9ff;
}

.shield-y:hover,
.shield-y.active {
    color: #f8c52a;
}

.shield-b:hover,
.shield-b.active {
    color: #35177f;
}

.ehp {
    border-radius: 50%;
    padding: 0%;
    height: 1.2rem;
    width: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.fa-plus,
.fa-minus {
    font-size: 0.8rem;
}

/* hero col */
.h-card {
    border: 2px solid gray;
    border-radius: 10px;
}

.h-card>* {
    margin: 0.5rem 0;
}

.h-color {
    width: 100%;
    height: 1rem;
    border-radius: 5px;
}

.stamina button,
.reputation button {
    width: 15%;
    max-width: 40px;
    padding: 0px 4px;
}

.roll-button {
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    transition: transform 0.5s ease;
}

.roll-button:hover {
    transform: scale(1.2);
}

.roll-button:disabled {
    cursor: wait;
}

.roll-button:disabled:hover {
    transform: scale(1);
}

.name {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    height: calc((100vh - 100px)/4);
    cursor: pointer;
}

.name0 {
    background-color: #e81010;
}

.name1 {
    background-color: #b0c9ff;
}

.name2 {
    background-color: #f8c52a;
}

.name3 {
    background-color: #35177f;
}

.sb-h-quick>* {
    border: 2px solid #3f3f3f;
}

.actions * {
    font-size: 1rem;
    margin: 0;
    text-align: center;
}

.h-square {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.h-square .results {
    border: 2px solid;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.wrapper {
    height: calc(100vh - 100px);
    overflow: auto;
    width: calc(100vw - 180px);
}

#sidebar {
    width: 180px;
}

#sidebar .name {
    width: 55%;
}

#sidebar .actions {
    width: 45%;
}

.heroes {
    position: absolute;
    top: 0;
    left: 180px;
    right: 0;
    bottom: 0;
}
</style>
