import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import background from "../../../assets/gameScreens/gameStatsBackground.jpg";
import slideUp from "../../../assets/gameScreens/slideUp.png";
import correct from "../../../assets/gameScreens/correct.png";
import incorrect from "../../../assets/gameScreens/incorrect.png";
import unanswered from "../../../assets/gameScreens/unanswered.png";
import profilePic from "../../../assets/profile2.jpg";

const YOU_WIN_LOGO = require("../../../assets/gameScreens/win.png");

class GameStatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // If we are the winner, isClientWinner is true
      isClientWinner: true,
      // Client match results
      correctAnswerNumber: 0,
      incorrectAnswerNumber: 0,
      unansweredAnswerNumber: 0,
      // Opponent match results
      opponentCorrectAnswerNumber: 0,
      opponentInorrectAnswerNumber: 0,
      opponentUnansweredAnswerNumber: 0,
      // Opponent username
      clientUsername: "",
      opponentUsername: "",
      // Match point variables
      finishedGamePoint: 20,
      correctAnswerPoint: 60,
      winOrLosePoint: 100,
      // Match win or lose text
      winOrLoseText: "Kazandın",
      // Total earned points
      totalEarnedPoints: 180,
      // Player profile pictures
      clientProfilePicture: "",
      opponentProfilePicture: ""
    };
  }

  componentDidMount() {
    // TODO logic for filling the screen with results
  }

  render() {
    return (
      <ScrollView pagingEnabled={true} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={background} style={styles.background} />
          <View style={styles.resultTextContainer}>
            <Image source={YOU_WIN_LOGO} style={styles.resultTextImg} />
          </View>
          <View style={styles.resultsContainer}>
            <View style={styles.results1Container}>
              <View style={styles.user1Container}>
                <Image source={profilePic} style={styles.profilePic} />
                <Text style={styles.usernameText}>
                  {this.state.clientUsername}
                </Text>
              </View>
              <View style={styles.answersContainer}>
                <View style={styles.dividedAnswer}>
                  <Text style={styles.numbers}>
                    {this.state.correctAnswerNumber}
                  </Text>
                  <Image source={correct} style={styles.answerImg} />
                  <Text style={styles.numbers}>
                    {this.state.opponentCorrectAnswerNumber}
                  </Text>
                </View>
                <View style={styles.dividedAnswer}>
                  <Text style={styles.numbers}>
                    {this.state.incorrectAnswerNumber}
                  </Text>
                  <Image source={incorrect} style={styles.answerImg} />
                  <Text style={styles.numbers}>
                    {this.state.opponentInorrectAnswerNumber}
                  </Text>
                </View>
                <View style={styles.dividedAnswer}>
                  <Text style={styles.numbers}>
                    {this.state.unansweredAnswerNumber}
                  </Text>
                  <Image source={unanswered} style={styles.answerImg} />
                  <Text style={styles.numbers}>
                    {this.state.opponentUnansweredAnswerNumber}
                  </Text>
                </View>
              </View>
              <View style={styles.user2Container}>
                <Image source={profilePic} style={styles.profilePic} />
                <Text style={styles.usernameText}>
                  {this.state.opponentUsername}
                </Text>
              </View>
            </View>
            <View style={styles.results2Container}>
              <View style={styles.allScoresContainer}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoresText}>Oyunu Bitirdin</Text>
                  <Text style={styles.scoresText}>
                    {this.state.finishedGamePoint}
                  </Text>
                </View>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoresText}>
                    Doğru Cevap x {this.state.correctAnswerNumber}
                  </Text>
                  <Text style={styles.scoresText}>
                    {this.state.correctAnswerPoint}
                  </Text>
                </View>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoresText}>
                    {this.state.winOrLoseText}
                  </Text>
                  <Text style={styles.scoresText}>
                    {this.state.winOrLosePoint}
                  </Text>
                </View>
              </View>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
              </View>
              <View style={styles.sinaviaScoreContainer}>
                <Text style={styles.sinaviaScoreText}>Sınavia Puanı</Text>
                <Text style={styles.sinaviaScoreText}>
                  {this.state.totalEarnedPoints}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <View style={styles.replayButton}>
                <Text style={styles.buttonText}>Yeniden</Text>
                <Text style={styles.buttonText}>Oyna</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.newOpponentButton}>
                <Text style={styles.buttonText}>Yeni</Text>
                <Text style={styles.buttonText}>Rakip</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.mainScreenButton}>
                <Text style={styles.buttonText}>Ana</Text>
                <Text style={styles.buttonText}>Menü</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.slideView}>
            <View style={styles.slideUpContainer}>
              <Image source={slideUp} style={styles.slideUpImg} />
              <Text style={styles.slideViewText}>
                {" "}
                SORULARI GÖRMEK İÇİN KAYDIR{" "}
              </Text>
              <Image source={slideUp} style={styles.slideUpImg} />
            </View>
          </View>
        </View>
        <View style={styles.secondScreenView} />
      </ScrollView>
    );
  }
}

export default GameStatsScreen;
