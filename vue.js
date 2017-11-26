new Vue({
  el: '#app',
  data: {
    attacks: [],
    totalScore: 0,
    playerColor: 'green',
    enemyColor: 'red',
    players: [
      {
        name: 'Player',
        health: 100
      },
      {
        name: 'Enemy',
        health: 100
      }
    ]
  },
  methods: {
    generateDamage: function(additionalDamage) {
      let max = 15 + additionalDamage;
      let min = 1;

      return Math.floor(Math.random() * (max - min) + min);
    },
    playerAttack: function(attackType, extraDamage) {
      let damageDone = this.generateDamage(extraDamage);
      let healingDone = this.generateDamage(extraDamage);
      if (attackType == 'damage') {
        this.players[1].health -= damageDone;
        this.attacks.push({
          name: 'player',
          damage: damageDone,
          color: 'green',
          type: 'damage'
        });
      } else if (attackType == 'healing') {
        this.players[0].health += healingDone;
        this.attacks.push({
          name: 'player',
          damage: healingDone,
          color: 'blue',
          type: 'healing'
        });
      }
    },
    enemyAttack: function() {
      let damageDone = this.generateDamage(0);
      this.players[0].health -= damageDone;
      this.attacks.push({
        name: 'enemy',
        damage: damageDone,
        color: 'red',
        type: 'damage'
      });
    },
    castAttack: function() {
      let playerTurn = false;
      this.players.forEach(player => {
        playerTurn = !playerTurn;
        if (playerTurn) {
          this.playerAttack('damage', 0);
        } else {
          this.enemyAttack();
        }
      });
    },
    castHeal: function() {
      let playerTurn = false;
      this.players.forEach(player => {
        playerTurn = !playerTurn;
        if (playerTurn) {
          this.playerAttack('healing', 0);
        } else {
          this.enemyAttack();
        }
      });
    },
    castSpecial: function() {
      let playerTurn = false;
      this.players.forEach(player => {
        playerTurn = !playerTurn;
        if (playerTurn) {
          this.playerAttack('damage', 10);
        } else {
          this.enemyAttack();
        }
      });
    },
    reset: function() {
      this.attacks = [];
      this.players.forEach(player => {
        player.health = 100;
      });
    },
    forfeit: function() {
      this.reset();
      alert('You lose!');
    },
    checkHealth: function() {
      if (this.players[0].health <= 0) {
        alert('You Lose!');
        this.reset();
      } else if (this.players[1].health <= 0) {
        alert('You Win!');
        this.reset();
      }
    }
  }
});
