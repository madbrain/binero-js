
const tailleE = document.getElementById("taille");
const tableE = document.getElementById("table");

// page 1 => Force 1
let page1 = [
 [ 2, 1, 2, 2, 2, 1, 1, 2, 0, 2],
 [ 2, 2, 0, 2, 2, 1, 1, 2, 1, 2],
 [ 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
 [ 2, 2, 2, 2, 2, 1, 0, 2, 2, 1],
 [ 0, 0, 2, 1, 2, 2, 2, 2, 0, 1],
 [ 2, 2, 2, 2, 2, 0, 2, 2, 2, 2],
 [ 2, 2, 2, 2, 1, 2, 2, 0, 2, 0],
 [ 2, 2, 2, 2, 2, 2, 2, 1, 2, 2],
 [ 2, 0, 2, 1, 1, 2, 2, 2, 0, 2],
 [ 0, 1, 2, 1, 2, 2, 0, 2, 2, 2],
];

// page 19 => Force 2
let page19 = [
 [ 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
 [ 0, 2, 2, 2, 2, 0, 2, 1, 2, 2],
 [ 2, 2, 1, 2, 1, 2, 2, 2, 2, 1],
 [ 2, 2, 2, 0, 2, 2, 2, 0, 2, 1],
 [ 1, 2, 2, 2, 2, 2, 2, 0, 2, 2],
 [ 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
 [ 2, 2, 2, 2, 2, 0, 2, 2, 2, 2],
 [ 0, 2, 2, 2, 2, 2, 1, 2, 2, 2],
 [ 0, 2, 2, 2, 2, 0, 2, 2, 2, 2],
 [ 2, 2, 0, 2, 2, 2, 2, 0, 2, 2],
];


function oppose(x) {
  return x == 0 ? 1 : 0;
}

function Grille(content) {
  this.content = content;
  this.size = content.length;
}

Grille.prototype.isFinished = function() {
  let emptyCount = 0;
  this.forEach((c) => { if (c == 2) emptyCount++; });
  return emptyCount == 0;
};

Grille.prototype.forEach = function(func) {
  for (let i = 0; i < this.size; ++i) {
    for (let j = 0; j < this.size; ++j) {
      if(func(this.content[i][j], i, j, this.content)) {
        return true;
      }
    }
  }
  return false;
};

Grille.prototype.isSet = function (i, j) {
  return this.content[i][j] == 0 || this.content[i][j] == 1;
}

Grille.prototype.at = function (i, j) {
  return this.content[i][j];
}

Grille.prototype.set = function (i, j, v) {
  this.content[i][j] = v;
}

Grille.prototype.inspecterRegles = function(i, j) {
  let changed = false;
  // Régle du double
  if (j + 2 < this.size) {
    if (this.isSet(i, j+1) && this.at(i, j+1) === this.at(i, j+2)) {
      this.set(i, j, oppose(this.at(i, j+1)));
      changed = true;
    }
  }
  if (j >= 2) {
    if (this.isSet(i, j-1) && this.at(i, j-1) === this.at(i, j-2)) {
      this.set(i, j, oppose(this.at(i, j-1)));
      changed = true;
    }
  }
  if (i + 2 < this.size) {
    if (this.isSet(i+1, j) && this.at(i+1, j) === this.at(i+2, j)) {
      this.set(i, j, oppose(this.at(i+1, j)));
      changed = true;
    }
  }
  if (i >= 2) {
    if (this.isSet(i-1, j) && this.at(i-1, j) === this.at(i-2, j)) {
      this.set(i, j, oppose(this.at(i-1, j)));
      changed = true;
    }
  }
  // Régle de la séparation
  if (j >= 1 && j + 1 < this.size) {
    if (this.isSet(i, j+1) && this.at(i, j+1) === this.at(i, j-1)) {
      this.set(i, j, oppose(this.at(i, j+1)));
      changed = true;
    }
  }
  if (i >= 1 && i + 1 < this.size) {
    if (this.isSet(i+1, j) && this.at(i+1, j) === this.at(i-1, j)) {
      this.set(i, j, oppose(this.at(i+1, j)));
      changed = true;
    }
  }
  return changed;
}

Grille.prototype.getLine = function(i) {
  let count0 = 0;
  let count1 = 0;
  for (let j = 0; j < this.size; ++j) {
    if (this.at(i, j) == 0) {
      count0++;
    } else if (this.at(i, j) == 1) {
      count1++;
    }
  }
  return { count0, count1 };
};

Grille.prototype.getColumn = function(j) {
  let count0 = 0;
  let count1 = 0;
  for (let i = 0; i < this.size; ++i) {
    if (this.at(i, j) == 0) {
      count0++;
    } else if (this.at(i, j) == 1) {
      count1++;
    }
  }
  return { count0, count1 };
};

Grille.prototype.completeLine = function(i, c) {
  let changed = false;
  for (let j = 0; j < this.size; ++j) {
    if (this.at(i, j) == 2) {
      this.set(i, j, c);
      changed = true;
    }
  }
  return changed;
};

Grille.prototype.completeColumn = function(j, c) {
  let changed = false;
  for (let i = 0; i < this.size; ++i) {
    if (this.at(i, j) == 2) {
      this.set(i, j, c);
      changed = true;
    }
  }
  return changed;
};

Grille.prototype.inspecterLignes = function() {
  let changed = false;
  for (let i = 0; i < this.size; ++i) {
    const result = this.getLine(i);
    if (result.count0 == this.size / 2) {
      changed |= this.completeLine(i, 1);
    }
    if (result.count1 == this.size / 2) {
      changed |= this.completeLine(i, 0);
    }
  }
  return changed;
}

Grille.prototype.inspecterColonnes = function() {
  let changed = false;
  for (let j = 0; j < this.size; ++j) {
    const result = this.getColumn(j);
    if (result.count0 == this.size / 2) {
      changed |= this.completeColumn(j, 1);
    }
    if (result.count1 == this.size / 2) {
      changed |= this.completeColumn(j, 0);
    }
  }
  return changed;
}

Grille.prototype.check = function() {
  for (let i = 0; i < this.size; ++i) {
    const result = this.getLine(i);
    if (result.count0 > this.size / 2 || result.count1 > this.size / 2) {
      return false;
    }
  }
  for (let j = 0; j < this.size; ++j) {
    const result = this.getColumn(j);
    if (result.count0 > this.size / 2 || result.count1 > this.size / 2) {
      return false;
    }
  }
  return true;
}

Grille.prototype.around = function(i, j) {
  if (j == 0 || i == 0 || i == this.size - 1 || j == this.size - 1) {
    return { count0: 0, count1: 0, count2: 0 };
  }
  let count0 = 0;
  let count1 = 0;
  let count2 = 0;
  if (this.at(i, j-1) == 0) {
    count0++
  } else if (this.at(i, j-1) == 1) {
    count1++
  } else {
    count2++
  }
  if (this.at(i, j+1) == 0) {
    count0++
  } else if (this.at(i, j+1) == 1) {
    count1++
  } else {
    count2++
  }
  if (this.at(i-1, j) == 0) {
    count0++
  } else if (this.at(i-1, j) == 1) {
    count1++
  } else {
    count2++
  }
  if (this.at(i+1, j) == 0) {
    count0++
  } else if (this.at(i+1, j) == 1) {
    count1++
  } else {
    count2++
  }
  return { count0, count1, count2 };
};

Grille.prototype.copy = function() {
  const newContent = this.content.map(x => Array.from(x));
  return new Grille(newContent);
};

let modele = new Grille(page19);
const stack = [];

function ajuster(e) {
  const taille = tailleE.value;
  if (taille !== modele.size) {
    const table = [];
    for (let i = 0; i < taille; ++i) {
      const row = [];
      for (let j = 0; j < taille; ++j) {
        row.push(2);
      }
      table.push(row);
    }
    modele = new Grille(table);
    afficherTable();
  }
}

function afficherTable() {
  const values = ["0", "1", " "];
  tableE.innerHTML = "";
  for (let i = 0; i < modele.size; ++i) {
    const row = modele.content[i];
    const newRow = document.createElement("tr");
    tableE.appendChild(newRow);
    for (let j = 0; j < row.length; ++j) {
      const newCell = document.createElement("td");
      const newText = document.createTextNode(values[row[j]]);

      newCell.addEventListener("click", function (e) {
        modele.set(i, j, (modele.at(i, j) + 1) % 3);
        newText.nodeValue = values[modele.at(i, j)];
      });

      newCell.appendChild(newText);
      newRow.appendChild(newCell);
    }
  }
}

function iterer() {
  compute();
}

function auto() {
  const timer = setInterval(() => {
    if (!compute()) {
      clearInterval(timer);
    }
  }, 100);
}

let makeChoiceCount = 0;

function compute() {
  if (modele.isFinished()) {
    console.log("finished", makeChoiceCount);
    return false;
  }
  // application règles
  if (modele.forEach(function (c, i, j) {
	 return c == 2 && modele.inspecterRegles(i, j);
  })) {
    if (!modele.check()) {
      console.log("not valid");
      modele = stack.pop();
    }
    afficherTable();
    return true;
  }
  if (modele.inspecterLignes() || modele.inspecterColonnes()) {
    if (!modele.check()) {
      console.log("not Valid");
      modele = stack.pop();
    }
    afficherTable();
    return true;
  }
  console.log("make choice");
  makeChoiceCount++;
  let candidate = null;
  while (candidate == null) {
    const i = Math.floor(Math.random() * modele.size);
    const j = Math.floor(Math.random() * modele.size);
    if (!modele.isSet(i, j)) {
        candidate = { i, j };
    }
  }
//  modele.forEach(function (c, i, j, content) {
//    if (c == 2) {
//      // TODO degenrated case => around does't check borders
//      const result = modele.around(i, j);
//      const isOk = result.count0 + result.count1 != 0 && result.count2 != 0;
//      if (isOk) {
//        candidate = { i, j };
//      }
//      return isOk;
//    }
//    return false;
//  });
  if (candidate) {
    console.log(candidate);
    const other = modele.copy();
    stack.push(other);
    const v = Math.random() < 0.5 ? 0 : 1;
    other.set(candidate.i, candidate.j, v);
    modele.set(candidate.i, candidate.j, oppose(v));
    afficherTable();
    return true;
  } else {
    console.log("??");
    return false;
  }
}

afficherTable();
