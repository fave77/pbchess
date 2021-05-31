# **Chess Engines 101: Looking through the Machine’s Lens**

## Chess engine
The chess engine is a program for playing and analyzing the abstract strategy game, chess. The term "engine" simply refers to a powerful program that performs many searches and processing (such as search engines). It analyzes the changes in the chess variant’s position and produces moves that it considers stronger. 

![chess engine](https://user-images.githubusercontent.com/60272753/119963738-131c8c80-bfc6-11eb-8710-1e7a2de0836a.png)

> People back in the earlier days, who have set up a record of the longest chess game which consisted of 269 moves and lasted for 20 hours (in 1989) would’ve never dreamt that one day a machine would be able to play and think on their behalf.

## So how does this intelligent engine work?
As it's obvious that every chessboard brings boundless possibilities. In theory, two players can play chess using 5949 moves, which will take as long as possible. The engine has to pick the best one out of those moves. 

These engines use decision trees. The root of the tree is the current position, and there is a child node for each position that can be created by effective movement. Each of these nodes has a child node that has the location, which can be reached from that node. The machine pushes the tree to a depth determined by the tree's abilities. It simply crosses out the extra paths that can be used to reach the same position, in order to not consider multiple elements. After the tree is created, the computer will use a set of weighting rules to examine the final position in the tree and begin to eliminate those that are not needed or that the opponent may not reach. The tree is taken down to the point where there is only one action left and the engine can complete it.

![chess engine working](https://user-images.githubusercontent.com/60272753/119963729-10ba3280-bfc6-11eb-8111-5e9858fd16a6.png)

## Basic idea that goes into making chess engines

The following steps are used to make an engine algorithm

**Move generation**: The engine visualizes the chessboard. After implementing all chess rules (using the library), the engine calculates all allowed moves in a given board state. Then, all possible supports will be pulled randomly. Now it's time to use the points assigned to each piece to determine which side is stronger at a given location. Using the scoring function, an algorithm is built that selects the action that gives the highest score.

**Board evaluation**: When the min-max algorithm reaches the end of its search, it must somehow determine whether and to what extent a certain board position is suitable for it. Now a search tree is created from which the algorithm can choose the best move. The algorithm tries to minimize the opponent's score and maximize its own. It checks all the possible movements and uses the static board scoring function to determine the score on the search tree leaf.

**Alpha-beta pruning**: This general pruning function is used to greatly reduce the minimum and maximum search space. It can immediately track the worst and best actions of each player, and using them can completely avoid looking for branches that can guarantee the worst results.
 
## Stockfish
Stockfish is a free and open-source chess engine that can be used on various desktop and mobile platforms. It can be used on many platforms, including Windows, Mac OS X, Linux, iOS, and Android. 

![stockfish](https://user-images.githubusercontent.com/60272753/119963763-19126d80-bfc6-11eb-9497-d469181f6234.jpeg)

> By 2020, Stockfish has won eight Chess Engine Grand Slams (TCEC). Since 2018, Stockfish has also dominated the Chess.com computer chess tournament, winning the first six or more tournaments. As of October 2020, Stockfish has the highest score at 3,514. 

## AlphaZero
AlphaZero is a computer program developed by DeepMind, an artificial intelligence research company that is used to master chess, shogi, and go, and was released at the end of 2017. 

![alphazero](https://user-images.githubusercontent.com/60272753/119963726-10219c00-bfc6-11eb-8dc1-54c8925bf06f.jpeg)

### Inner Working
It is based on the concept of reinforcement learning. In order to learn each game, an untrained neural network played millions of games on itself through trial and error. At first, the game was played completely randomly, but as time passed, the system would learn from victory, defeat, and lessons. To learn the parameters of neural networks, Which increases its chances of choosing profitable moves. The network needed around 9 hours of training for chess. When Stockfish, the world's most powerful chess machine, was defeated in a long game, AlphaZero caused a worldwide sensation.

## Dichotomy of AlphaZero Stockfish
In 2019, these two most powerful and distinct chess engines in the world fought a 100 game battle for the future of computer chess. 

![faceoff](https://user-images.githubusercontent.com/60272753/119963751-16b01380-bfc6-11eb-9f81-1b0aca1104af.png)

On the one hand, traditional Stockfish has 8 million potential movements per second. This program approaches the game churning through millions of potential moves per second and chooses the best move using its complex manual adjustment algorithm. 
On the other hand, the relatively new and completely different program, AlphaZero, is much weaker than Stockfish in some respects because it is only 1/100 faster than Stockfish per second. 

> AlphaZero won 28 of 100 games and Stockfish? None. The rest of the games were a tie. Out of 100 games, AlphaZero never lost.
### Data for Comparison

<img src="https://user-images.githubusercontent.com/60272753/119963744-144db980-bfc6-11eb-9e1d-c45131390a72.jpg" height="400"/><br>

![compare2](https://user-images.githubusercontent.com/60272753/119964919-50cde500-bfc7-11eb-8dac-b246f18892ea.jpg)

What a fascinating and modern age we live in. Over the years, the art of computer programming has come a long way. From the old-fashioned chess engines of the 70s and 80s, whose original algorithm sometimes misjudged the position and played such bad games, to the period when computers are rarely lose-this is quite a miracle.

![last](https://user-images.githubusercontent.com/60272753/119963755-1748aa00-bfc6-11eb-8408-b04b63268c58.jpg)

Although it's equally interesting and daunting to find out what lies ahead. In the name of improving our skills, we are just trying to simulate a computer. These computers will eventually make us look forward to more. Do you want to make the best decision in life, and can the best decision in life be predictable? All we do is expanding our capabilities and disrupting eons-old human activities.  Will we eventually become obsolete or domesticated by our machines? Well, who knows.