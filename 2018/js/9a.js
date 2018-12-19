marbleCount = 70950;
marbles = [0];
players = [];
for (let i = 0; i < 431; ++i) {
	players.push({id: i, score: 0});
}

pI = 0;
mI = 0;
currentMarble = 1;
marbleCounter = 1;
do {
	if (!(marbleCounter % 23)) {
		mI-=7;
		if (mI < 0) {
			mI = marbles.length + mI
        }
		players[pI].score += marbleCounter+(marbles[mI]);
		marbles.splice(mI, 1);
		currentMarble = marbles[mI];
		console.log(marbleCounter+"/"+marbleCount)
	}
	else {
		if (++mI >= marbles.length) {
			mI = 1;
		}
		else {
			++mI;
		}
		marbles.splice(mI, 0, marbleCounter)
    	currentMarble = marbles[mI];
	}
    marbleCounter++;
	if (++pI == players.length) {
		pI = 0;
    };
} while(marbleCounter <= marbleCount)
players.sort((a,b) => b.score - a.score);
console.log(players[0].score)
