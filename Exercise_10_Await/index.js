const playersArray = ["Tina", "Jorge", "Julien"];

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const getResults = async (newPlayer) => {
  try {
    const result = await luckyDraw(newPlayer);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

playersArray.forEach((person) => getResults(person));
